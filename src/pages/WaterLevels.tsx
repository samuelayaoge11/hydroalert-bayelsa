import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Waves, TrendingUp, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { LocationSelector } from "../components/LocationSelector";
import { TelemetryData, SensorNode } from "../types";

interface WaterLevelsProps {
  telemetry: TelemetryData[];
  nodes: SensorNode[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  selectedNode?: SensorNode;
}

export const WaterLevels: React.FC<WaterLevelsProps> = ({
  telemetry,
  nodes,
  selectedNodeId,
  onSelectNode,
  selectedNode,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Water Levels
            </h1>
            <p className="text-slate-500">
              Historical trends and real-time elevation data
            </p>
          </div>
        </div>
        <div className="w-full md:w-72">
          <LocationSelector
            nodes={nodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-xl">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900">
                Elevation Trend (24h)
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-bold bg-white text-slate-900 rounded-md shadow-sm">
                24h
              </button>
              <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                7d
              </button>
              <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                30d
              </button>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry}>
                <defs>
                  <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="time" /* Changed from "timestamp" to "time" */
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="waterLevel" /* Changed from "level" to "waterLevel" */
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorLevel)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Max Level (24h)
                </p>
                <p className="text-xl font-black text-slate-900">4.82m</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Min Level (24h)
                </p>
                <p className="text-xl font-black text-slate-900">3.15m</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Average Level
                </p>
                <p className="text-xl font-black text-slate-900">3.98m</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-3xl shadow-xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-200" />
              <h3 className="font-bold">Forecast</h3>
            </div>
            <p className="text-sm text-blue-100 mb-4">
              Predicted water levels for the next 48 hours based on current
              rainfall data.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Tomorrow</span>
                <span>+0.15m</span>
              </div>
              <div className="w-full bg-blue-500 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[60%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
