import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "HydroAlert API is running" });
  });

  // Risk Assessment API
  app.get("/api/risk-assessment", (req, res) => {
    const { level, warning, critical } = req.query;
    const currentLevel = parseFloat(level as string) || 0;
    const warningLevel = parseFloat(warning as string) || 3.0;
    const criticalLevel = parseFloat(critical as string) || 4.5;

    let risk = "Low";
    let recommendation = "Continue routine monitoring.";
    let color = "blue";

    if (currentLevel >= criticalLevel) {
      risk = "Critical";
      recommendation = "Immediate evacuation of low-lying areas required.";
      color = "red";
    } else if (currentLevel >= warningLevel) {
      risk = "High";
      recommendation = "Prepare for potential evacuation. Secure valuables.";
      color = "yellow";
    } else if (currentLevel >= warningLevel * 0.8) {
      risk = "Moderate";
      recommendation = "Stay alert. Monitor local news and weather reports.";
      color = "orange";
    }

    res.json({ risk, recommendation, color, timestamp: new Date().toISOString() });
  });

  // Simulation state (in-memory for now)
  let isSimulating = false;
  let simulationInterval: NodeJS.Timeout | null = null;

  app.post("/api/simulation/start", (req, res) => {
    isSimulating = true;
    if (!simulationInterval) {
      simulationInterval = setInterval(() => {
        const telemetry = {
          nodeId: "node-yenagoa",
          waterLevel: (Math.random() * 5).toFixed(2),
          time: new Date().toISOString(),
          batteryVoltage: (3.5 + Math.random() * 0.5).toFixed(1),
          signalStrength: Math.floor(-80 + Math.random() * 20),
        };
        // Stream live data via WebSocket
        io.emit("telemetry_update", telemetry);

        // Automated Alert Check
        if (parseFloat(telemetry.waterLevel) >= 4.5) {
          io.emit("alert", {
            level: "critical",
            message: `CRITICAL: Water level at Yenagoa reached ${telemetry.waterLevel}m.`,
            timestamp: new Date().toISOString(),
          });
        }
      }, 3000);
    }
    res.json({ status: "started" });
  });

  app.post("/api/simulation/stop", (req, res) => {
    isSimulating = false;
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
    }
    res.json({ status: "stopped" });
  });

  // User Roles API (Mock for now, will use Firestore in production)
  app.get("/api/user/role", (req, res) => {
    const email = req.query.email as string;
    // Default admin for the user email provided in runtime context
    if (email === "ayaogesamuel@gmail.com") {
      res.json({ role: "admin" });
    } else {
      res.json({ role: "user" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
