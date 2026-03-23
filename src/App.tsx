import React, { Component, useState, useEffect } from 'react';
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
  getDoc,
  doc
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Regulations } from './pages/Regulations';
import { Simulation } from './pages/Simulation';
import { Alerts } from './pages/Alerts';
import { WaterLevels } from './pages/WaterLevels';
import { FloodMap } from './pages/FloodMap';
import { NodeHealth } from './pages/NodeHealth';
import { Rainfall } from './pages/Rainfall';
import { Settings } from './pages/Settings';
import { Drainage } from './pages/Drainage';
import { Login } from './pages/Login';
import { LocationSelector } from './components/LocationSelector';
import { TelemetryData, Regulation, AlertLog as AlertLogType, SensorNode } from './types';
import { AlertTriangle, Droplets, LogIn, MapPin, Menu, X } from 'lucide-react';

const BAYELSA_STATIONS = [
  // Yenagoa LGA
  { lga: 'Yenagoa', community: 'Epie Creek', lat: 4.9333, lng: 6.2667 },
  { lga: 'Yenagoa', community: 'Amarata', lat: 4.9250, lng: 6.2750 },
  { lga: 'Yenagoa', community: 'Igbogene', lat: 4.9833, lng: 6.3167 },
  { lga: 'Yenagoa', community: 'Onopa', lat: 4.9167, lng: 6.2500 },
  
  // Sagbama LGA
  { lga: 'Sagbama', community: 'Toru-Orua', lat: 5.0667, lng: 6.1333 },
  { lga: 'Sagbama', community: 'Sagbama Town', lat: 5.1500, lng: 6.2167 },
  { lga: 'Sagbama', community: 'Agbere', lat: 5.1000, lng: 6.1667 },
  { lga: 'Sagbama', community: 'Adagbabiri', lat: 5.1833, lng: 6.2500 },

  // Ekeremor LGA
  { lga: 'Ekeremor', community: 'Ekeremor Town', lat: 5.0167, lng: 5.8333 },
  { lga: 'Ekeremor', community: 'Aleibiri', lat: 5.0833, lng: 5.9167 },
  { lga: 'Ekeremor', community: 'Peretorugbene', lat: 5.1333, lng: 5.9667 },
  { lga: 'Ekeremor', community: 'Ndoro', lat: 5.0500, lng: 5.8667 },

  // Southern Ijaw LGA
  { lga: 'Southern Ijaw', community: 'Oporoma', lat: 4.8167, lng: 6.0833 },
  { lga: 'Southern Ijaw', community: 'Amassoma', lat: 4.9667, lng: 6.1167 },
  { lga: 'Southern Ijaw', community: 'Anyama', lat: 4.8667, lng: 6.1500 },
  { lga: 'Southern Ijaw', community: 'Otuan', lat: 4.9000, lng: 6.0500 },

  // Ogbia LGA
  { lga: 'Ogbia', community: 'Otuoke', lat: 4.8000, lng: 6.3167 },
  { lga: 'Ogbia', community: 'Ogbia Town', lat: 4.7500, lng: 6.3500 },
  { lga: 'Ogbia', community: 'Anyama-Ogbia', lat: 4.7833, lng: 6.2833 },
  { lga: 'Ogbia', community: 'Emeyal', lat: 4.8333, lng: 6.3667 },

  // Kolokuma/Opokuma LGA
  { lga: 'Kolokuma/Opokuma', community: 'Kaiama', lat: 5.1167, lng: 6.3667 },
  { lga: 'Kolokuma/Opokuma', community: 'Opokuma', lat: 5.1500, lng: 6.4000 },
  { lga: 'Kolokuma/Opokuma', community: 'Sabagreia', lat: 5.0833, lng: 6.3333 },
  { lga: 'Kolokuma/Opokuma', community: 'Sampou', lat: 5.1333, lng: 6.3833 },

  // Nembe LGA
  { lga: 'Nembe', community: 'Nembe City', lat: 4.5333, lng: 6.4000 },
  { lga: 'Nembe', community: 'Bassambiri', lat: 4.5500, lng: 6.4167 },
  { lga: 'Nembe', community: 'Ogbolomabiri', lat: 4.5167, lng: 6.3833 },
  { lga: 'Nembe', community: 'Okoroba', lat: 4.6000, lng: 6.4500 },

  // Brass LGA
  { lga: 'Brass', community: 'Twon-Brass', lat: 4.3167, lng: 6.2333 },
  { lga: 'Brass', community: 'Okpoama', lat: 4.3500, lng: 6.2667 },
  { lga: 'Brass', community: 'Akassa', lat: 4.3000, lng: 6.0000 },
  { lga: 'Brass', community: 'Sangana', lat: 4.2500, lng: 5.9500 },
];

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      if (this.state.error && this.state.error.message) {
        try {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error) errorMessage = parsed.error;
        } catch (e) {
          errorMessage = this.state.error.message || errorMessage;
        }
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 max-w-md w-full text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">System Error</h2>
            <p className="text-slate-600 mb-6">{errorMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

import { io } from 'socket.io-client';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<string>('user');
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [nodes, setNodes] = useState<SensorNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [alerts, setAlerts] = useState<AlertLogType[]>([]);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1.2);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const baseUrl = window.location.origin;
          const res = await fetch(`${baseUrl}/api/user/role?email=${encodeURIComponent(user.email || '')}`);
          if (!res.ok) {
            throw new Error(`Server responded with status: ${res.status}`);
          }
          const data = await res.json();
          setRole(data.role || 'user');
        } catch (error) {
          console.error("Failed to fetch user role from API:", error);
          // Fallback to Firestore if API fails
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              setRole(userDoc.data().role || 'user');
            } else {
              setRole('user');
            }
          } catch (fsError) {
            console.error("Firestore fallback also failed:", fsError);
            setRole('user');
          }
        }
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Socket.io for Live Data Streaming
  useEffect(() => {
    if (!user) return;

    const socket = io();

    socket.on('telemetry_update', (data) => {
      if (data.nodeId === selectedNodeId) {
        setTelemetry(prev => {
          const newTelemetry = [...prev, {
            ...data,
            time: new Date(data.time).toLocaleTimeString()
          }];
          return newTelemetry.slice(-20); // Keep last 20
        });
        setCurrentLevel(parseFloat(data.waterLevel));
      }
    });

    socket.on('alert', (alert) => {
      setAlerts(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        ...alert,
        timestamp: new Date(alert.timestamp).toLocaleTimeString()
      }, ...prev].slice(0, 10));
    });

    return () => {
      socket.disconnect();
    };
  }, [user, selectedNodeId]);

  // Connection Test
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
        console.log("Firestore connection successful.");
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('the client is offline')) {
            console.error("Firestore is offline. Check your Firebase configuration or network.");
          } else {
            console.error("Firestore connection error:", error.message);
          }
        }
      }
    }
    testConnection();
  }, []);

  // Nodes Listener
  useEffect(() => {
    if (!isAuthReady || !user) return;

    const unsubscribeNodes = onSnapshot(collection(db, 'sensor_nodes'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SensorNode));
      setNodes(data);
      if (data.length > 0 && !selectedNodeId) {
        setSelectedNodeId(data[0].id);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'sensor_nodes');
    });

    return () => unsubscribeNodes();
  }, [isAuthReady, user, selectedNodeId]);

  // Data Listeners for Selected Node
  useEffect(() => {
    if (!isAuthReady || !user || !selectedNodeId) return;

    // Telemetry Listener
    const telemetryQuery = query(
      collection(db, `sensor_nodes/${selectedNodeId}/telemetry`),
      orderBy('time', 'desc'),
      limit(20)
    );
    const unsubscribeTelemetry = onSnapshot(telemetryQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          ...d,
          time: d.time?.toDate?.()?.toLocaleTimeString() || 'N/A'
        } as TelemetryData;
      }).reverse();
      setTelemetry(data);
      if (data.length > 0) {
        setCurrentLevel(data[data.length - 1].waterLevel);
      } else {
        setCurrentLevel(selectedNode?.elevationBaseline || 1.2);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `sensor_nodes/${selectedNodeId}/telemetry`);
    });

    // Alerts Listener (Global for now, or filter by nodeId)
    const alertsQuery = query(
      collection(db, 'alert_logs'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
    const unsubscribeAlerts = onSnapshot(alertsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          ...d,
          timestamp: d.timestamp?.toDate?.()?.toLocaleTimeString() || 'N/A'
        } as AlertLogType;
      });
      setAlerts(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'alert_logs');
    });

    // Regulations Listener
    const unsubscribeRegulations = onSnapshot(collection(db, 'regulations'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Regulation));
      setRegulations(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'regulations');
    });

    return () => {
      unsubscribeTelemetry();
      unsubscribeAlerts();
      unsubscribeRegulations();
    };
  }, [isAuthReady, user, selectedNodeId, selectedNode]);

  // Simulation Logic (Writes to Firestore)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating && user && selectedNodeId && selectedNode) {
      interval = setInterval(async () => {
        const surge = Math.random() * 0.4;
        const next = Math.min(currentLevel + surge, 6.0);
        
        try {
          // Add Telemetry
          await addDoc(collection(db, `sensor_nodes/${selectedNodeId}/telemetry`), {
            time: serverTimestamp(),
            nodeId: selectedNodeId,
            waterLevel: Number(next.toFixed(2)),
            batteryVoltage: 3.8,
            signalStrength: -70,
            isSimulated: true
          });

          // Check for alerts
          if (next >= selectedNode.criticalThreshold && currentLevel < selectedNode.criticalThreshold) {
            await addDoc(collection(db, 'alert_logs'), {
              nodeId: selectedNodeId,
              alertLevel: 'critical',
              message: `CRITICAL: Water level at ${selectedNode.locationName} reached ${next.toFixed(2)}m.`,
              isSimulated: true,
              timestamp: serverTimestamp()
            });
          } else if (next >= selectedNode.warningThreshold && currentLevel < selectedNode.warningThreshold) {
            await addDoc(collection(db, 'alert_logs'), {
              nodeId: selectedNodeId,
              alertLevel: 'warning',
              message: `WARNING: Water level at ${selectedNode.locationName} at ${next.toFixed(2)}m.`,
              isSimulated: true,
              timestamp: serverTimestamp()
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, 'telemetry/alerts');
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, user, currentLevel, selectedNodeId, selectedNode]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const seedData = async () => {
    if (!user) return;
    setIsSeeding(true);
    try {
      // Seed Nodes
      for (const station of BAYELSA_STATIONS) {
        const nodeId = `node-${station.lga.toLowerCase().replace(/[\s/]/g, '-')}-${station.community.toLowerCase().replace(/[\s/]/g, '-')}`;
        await setDoc(doc(db, 'sensor_nodes', nodeId), {
          locationName: `${station.community} Monitoring Station`,
          lga: station.lga,
          community: station.community,
          latitude: station.lat,
          longitude: station.lng,
          elevationBaseline: 1.2,
          warningThreshold: 3.0,
          criticalThreshold: 4.5,
          status: 'active'
        });
      }

      // Seed some initial regulations
      const regs = [
        { title: 'Drainage Clearance', description: 'Maintain 2-meter clearance around primary drainage outfalls.', penaltyClause: 'Fine of ₦50,000 or community service.' },
        { title: 'Waste Disposal', description: 'Dumping of solid waste in designated flood plains is strictly prohibited.', penaltyClause: 'Code 4A: Immediate prosecution.' },
        { title: 'Evacuation Protocol', description: 'Mandatory evacuation protocols trigger at 4.5m sustained water levels.', penaltyClause: 'Non-compliance may result in forced relocation for safety.' },
      ];

      for (const reg of regs) {
        await addDoc(collection(db, 'regulations'), reg);
      }

      alert('Bayelsa State Monitoring Regions Seeded Successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'seed-data');
    } finally {
      setIsSeeding(false);
    }
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const activeNodes = nodes.filter(n => n.status === 'active').length;

  const toggleSimulation = async () => {
    const nextState = !isSimulating;
    try {
      const endpoint = nextState ? '/api/simulation/start' : '/api/simulation/stop';
      await fetch(endpoint, { method: 'POST' });
      setIsSimulating(nextState);
    } catch (error) {
      console.error('Failed to toggle simulation:', error);
    }
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 flex">
          <Sidebar userEmail={user.email} role={role} />
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-[100] bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all active:scale-95"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Sidebar Overlay */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-[90] bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="w-64 h-full animate-in slide-in-from-left duration-300">
                <Sidebar userEmail={user.email} role={role} isMobile onSelect={() => setIsMobileMenuOpen(false)} />
              </div>
              <div className="flex-1 h-full" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          )}

          <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
            {selectedNode && <Header node={selectedNode} />}
            <main className="flex-1 overflow-x-hidden">
              <Routes>
                <Route path="/" element={
                  <Dashboard 
                    nodes={nodes} 
                    selectedNodeId={selectedNodeId}
                    onSelectNode={setSelectedNodeId}
                    selectedNode={selectedNode} 
                    telemetry={telemetry} 
                    currentLevel={currentLevel} 
                  />
                } />
                <Route path="/regulations" element={<Regulations regulations={regulations} />} />
                <Route path="/water-levels" element={
                  <WaterLevels 
                    telemetry={telemetry} 
                    nodes={nodes} 
                    selectedNodeId={selectedNodeId} 
                    onSelectNode={setSelectedNodeId} 
                    selectedNode={selectedNode} 
                  />
                } />
                <Route path="/flood-map" element={
                  <FloodMap 
                    nodes={nodes} 
                    selectedNodeId={selectedNodeId} 
                    onSelectNode={setSelectedNodeId} 
                    selectedNode={selectedNode} 
                  />
                } />
                <Route path="/node-health" element={
                  <NodeHealth 
                    nodes={nodes} 
                    selectedNodeId={selectedNodeId} 
                    onSelectNode={setSelectedNodeId} 
                    selectedNode={selectedNode} 
                  />
                } />
                <Route path="/rainfall" element={<Rainfall />} />
                <Route path="/drainage" element={<Drainage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/simulation" element={
                  <Simulation 
                    isSimulating={isSimulating} 
                    onToggleSimulation={toggleSimulation} 
                    onResetSimulation={async () => {
                      await fetch('/api/simulation/stop', { method: 'POST' });
                      setIsSimulating(false);
                      setCurrentLevel(selectedNode?.elevationBaseline || 1.2);
                    }} 
                    isSeeding={isSeeding}
                    onSeedData={seedData}
                    nodesCount={nodes.length}
                  />
                } />
                <Route path="/alerts" element={<Alerts alerts={alerts} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
