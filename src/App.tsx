import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  setDoc,
  serverTimestamp,
  getDocFromServer,
  doc,
} from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { db, auth, handleFirestoreError, OperationType } from "./firebase";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Regulations } from "./pages/Regulations";
import { Simulation } from "./pages/Simulation";
import { Alerts } from "./pages/Alerts";
import { WaterLevels } from "./pages/WaterLevels";
import { FloodMap } from "./pages/FloodMap";
import { NodeHealth } from "./pages/NodeHealth";
import { Rainfall } from "./pages/Rainfall";
import { Settings } from "./pages/Settings";
import { Drainage } from "./pages/Drainage";
import {
  TelemetryData,
  Regulation,
  AlertLog as AlertLogType,
  SensorNode,
} from "./types";
import { AlertTriangle, Menu, X, Droplets } from "lucide-react";

const BAYELSA_STATIONS = [
  { lga: "Yenagoa", community: "Epie Creek", lat: 4.9333, lng: 6.2667 },
  { lga: "Sagbama", community: "Toru-Orua", lat: 5.0667, lng: 6.1333 },
  { lga: "Ekeremor", community: "Ekeremor Town", lat: 5.0167, lng: 5.8333 },
  { lga: "Southern Ijaw", community: "Oporoma", lat: 4.8167, lng: 6.0833 },
  { lga: "Ogbia", community: "Otuoke", lat: 4.8, lng: 6.3167 },
  { lga: "Kolokuma/Opokuma", community: "Kaiama", lat: 5.1167, lng: 6.3667 },
  { lga: "Nembe", community: "Nembe City", lat: 4.5333, lng: 6.4 },
  { lga: "Brass", community: "Twon-Brass", lat: 4.3167, lng: 6.2333 },
];

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [nodes, setNodes] = useState<SensorNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("");
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [alerts, setAlerts] = useState<AlertLogType[]>([]);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1.2);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const handleManualLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  useEffect(() => {
    if (!isAuthReady || !user) return;

    // Nodes Listener
    const unsubNodes = onSnapshot(
      collection(db, "sensor_nodes"),
      (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as SensorNode,
        );
        setNodes(data);
        if (data.length > 0 && !selectedNodeId) setSelectedNodeId(data[0].id);
      },
    );

    // Regulations Listener (CRITICAL: RESTORED THIS)
    const unsubRegs = onSnapshot(collection(db, "regulations"), (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Regulation,
      );
      setRegulations(data);
    });

    return () => {
      unsubNodes();
      unsubRegs();
    };
  }, [isAuthReady, user]);

  useEffect(() => {
    if (!user || !selectedNodeId) return;
    const tQuery = query(
      collection(db, `sensor_nodes/${selectedNodeId}/telemetry`),
      orderBy("time", "desc"),
      limit(20),
    );
    const unsubT = onSnapshot(tQuery, (snap) => {
      const data = snap.docs
        .map(
          (doc) =>
            ({
              ...doc.data(),
              time: doc.data().time?.toDate?.()?.toLocaleTimeString() || "N/A",
            }) as TelemetryData,
        )
        .reverse();
      setTelemetry(data);
      if (data.length > 0) setCurrentLevel(data[data.length - 1].waterLevel);
    });
    const aQuery = query(
      collection(db, "alert_logs"),
      orderBy("timestamp", "desc"),
      limit(10),
    );
    const unsubA = onSnapshot(aQuery, (snap) => {
      const data = snap.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            timestamp:
              doc.data().timestamp?.toDate?.()?.toLocaleTimeString() || "N/A",
          }) as AlertLogType,
      );
      setAlerts(data);
    });
    return () => {
      unsubT();
      unsubA();
    };
  }, [user, selectedNodeId]);

  const seedData = async () => {
    if (!user) return;
    setIsSeeding(true);
    try {
      // 1. Seed Nodes (Overwrites existing nodes with same ID)
      for (const station of BAYELSA_STATIONS) {
        const nodeId = `node-${station.lga.toLowerCase().replace(/[\s/]/g, "-")}-${station.community.toLowerCase().replace(/[\s/]/g, "-")}`;
        await setDoc(doc(db, "sensor_nodes", nodeId), {
          locationName: `${station.community} Monitoring Station`,
          lga: station.lga,
          community: station.community,
          latitude: station.lat,
          longitude: station.lng,
          elevationBaseline: 1.2,
          warningThreshold: 3.0,
          criticalThreshold: 4.5,
          status: "active",
        });
      }

      // 2. Official Government Regulations (Using fixed IDs to prevent duplicates)
      const officialRegs = [
        {
          id: "reg-nesrea",
          title: "S.I. No. 26: Wetland Protection",
          description:
            "NESREA Regulation establishes a mandatory 30m non-development buffer from the high-water mark of all rivers to prevent hydrological displacement.",
          penaltyClause:
            "Violation punishable by site forfeiture under Section 24.",
          sourceUrl:
            "https://www.nesrea.gov.ng/wp-content/uploads/2022/10/National-Environmental-Wetlands-River-Banks-and-Lake-Shores-Protection-Regulations-2009.pdf",
        },
        {
          id: "reg-bsppdb",
          title: "BSPPDB Section 42: High-Risk Zones",
          description:
            "The Bayelsa State Physical Planning Board mandates specialized Flood Risk Assessments (FRA) for all riverine developments.",
          penaltyClause:
            "Immediate demolition of non-compliant structures under Section 49.",
          sourceUrl: "https://bsppdb.by.gov.ng/",
        },
        {
          id: "reg-nihsa",
          title: "NIHSA Hydrological Directive",
          description:
            "Direct mandate for the clearance of primary watercourses and floodplains during the annual hydrological peak window.",
          penaltyClause:
            "Prosecution for public endangerment under Environmental Sanitation Law.",
          sourceUrl: "https://nihsa.gov.ng/",
        },
      ];

      for (const reg of officialRegs) {
        // Using setDoc ensures that clicking "Seed" multiple times updates the existing docs
        await setDoc(doc(db, "regulations", reg.id), {
          title: reg.title,
          description: reg.description,
          penaltyClause: reg.penaltyClause,
          sourceUrl: reg.sourceUrl,
        });
      }

      alert("System Seeded with Official Data! Duplicates prevented.");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSeeding(false);
    }
  };

  if (!isAuthReady)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-blue-600 font-bold">
        Initializing...
      </div>
    );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center">
          <Droplets className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-3xl font-black mb-8 tracking-tight">
            HydroAlert
          </h1>
          <button
            onClick={handleManualLogin}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <img
              src="https://www.google.com/favicon.ico"
              className="w-5 h-5"
              alt="google"
            />
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar userEmail={user.email} role="user" />
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          {selectedNode && <Header node={selectedNode} />}
          <main className="flex-1 p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    nodes={nodes}
                    selectedNodeId={selectedNodeId}
                    onSelectNode={setSelectedNodeId}
                    selectedNode={selectedNode}
                    telemetry={telemetry}
                    currentLevel={currentLevel}
                  />
                }
              />
              <Route
                path="/flood-map"
                element={
                  <FloodMap
                    nodes={nodes}
                    selectedNodeId={selectedNodeId}
                    onSelectNode={setSelectedNodeId}
                    selectedNode={selectedNode}
                  />
                }
              />
              <Route
                path="/water-levels"
                element={
                  <WaterLevels
                    telemetry={telemetry}
                    nodes={nodes}
                    selectedNodeId={selectedNodeId}
                    onSelectNode={setSelectedNodeId}
                    selectedNode={selectedNode}
                  />
                }
              />
              <Route
                path="/regulations"
                element={<Regulations regulations={regulations} />}
              />
              <Route
                path="/simulation"
                element={
                  <Simulation
                    isSimulating={isSimulating}
                    onToggleSimulation={() => setIsSimulating(!isSimulating)}
                    onResetSimulation={() => setIsSimulating(false)}
                    isSeeding={isSeeding}
                    onSeedData={seedData}
                    nodesCount={nodes.length}
                  />
                }
              />
              <Route path="/alerts" element={<Alerts alerts={alerts} />} />

              {/* ADD THESE REMAINING ROUTES HERE */}
              <Route path="/settings" element={<Settings />} />
              <Route
                path="/node-health"
                element={
                  <NodeHealth
                    nodes={nodes}
                    selectedNodeId={selectedNodeId}
                    onSelectNode={setSelectedNodeId}
                    selectedNode={selectedNode}
                  />
                }
              />
              <Route path="/rainfall" element={<Rainfall />} />
              <Route path="/drainage" element={<Drainage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
