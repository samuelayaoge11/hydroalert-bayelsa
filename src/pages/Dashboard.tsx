import React, { useEffect } from 'react';
import { LayoutDashboard, MapPin, Activity, AlertTriangle, Droplets, Battery, Signal, Database, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { SensorNode, TelemetryData } from '../types';
import { LocationSelector } from '../components/LocationSelector';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface DashboardProps {
  nodes: SensorNode[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  selectedNode?: SensorNode;
  telemetry: TelemetryData[];
  currentLevel: number;
}

// Helper component to update map view when selected node changes
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

export const Dashboard: React.FC<DashboardProps> = ({ nodes, selectedNodeId, onSelectNode, selectedNode, telemetry, currentLevel }) => {
  const navigate = useNavigate();
  const [riskData, setRiskData] = React.useState<{ risk: string; recommendation: string; color: string } | null>(null);

  useEffect(() => {
    if (selectedNode) {
      fetch(`/api/risk-assessment?level=${currentLevel}&warning=${selectedNode.warningThreshold}&critical=${selectedNode.criticalThreshold}`)
        .then(res => res.json())
        .then(data => setRiskData(data))
        .catch(err => console.error('Failed to fetch risk assessment:', err));
    }
  }, [currentLevel, selectedNode]);

  const center: [number, number] = selectedNode 
    ? [selectedNode.latitude, selectedNode.longitude] 
    : [4.9333, 6.2667]; // Default to Yenagoa

  const getStatusColor = (color?: string) => {
    if (color === 'red') return 'text-red-600 bg-red-50';
    if (color === 'yellow') return 'text-yellow-600 bg-yellow-50';
    if (color === 'orange') return 'text-orange-600 bg-orange-50';
    return 'text-blue-600 bg-blue-50';
  };

  const statusText = riskData?.risk || 'N/A';

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Telemetry Dashboard</h1>
          <p className="text-slate-500">Live monitoring of Bayelsa State water levels</p>
        </div>
        <div className="w-full md:w-72">
          <LocationSelector 
            nodes={nodes} 
            selectedNodeId={selectedNodeId} 
            onSelectNode={onSelectNode} 
          />
        </div>
      </div>

      {/* Data Expansion Alert */}
      {nodes.length < 32 && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-2xl">
              <Database className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-black text-amber-900 tracking-tight">Data Expansion Available</p>
              <p className="text-sm text-amber-700">Expand monitoring to all 8 LGAs (32 stations). Current: {nodes.length} stations.</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/simulation')}
            className="w-full sm:w-auto bg-amber-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-100 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Go to Simulation to Re-seed
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => navigate('/water-levels')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-50 p-2 rounded-xl group-hover:bg-blue-600 transition-colors">
              <Activity className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Level</p>
          </div>
          <p className="text-4xl font-black text-slate-900">{currentLevel.toFixed(2)}m</p>
          <p className="text-sm text-slate-500 mt-2">Elevation Baseline: {selectedNode?.elevationBaseline || 0}m</p>
        </button>

        <button 
          onClick={() => navigate('/flood-map')}
          className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-50 p-2 rounded-xl group-hover:bg-green-600 transition-colors">
              <MapPin className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Station</p>
          </div>
          <p className="text-2xl font-black text-slate-900 truncate">{selectedNode?.locationName || 'Select Station'}</p>
          <p className="text-sm text-slate-500 mt-2">{selectedNode?.lga || 'N/A'} LGA, Bayelsa</p>
        </button>

        <button 
          onClick={() => navigate('/alerts')}
          className={`p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left group ${getStatusColor(riskData?.color)}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-white/50 group-hover:bg-white transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">Alert Status</p>
          </div>
          <p className="text-2xl font-black">{statusText}</p>
          <p className="text-sm mt-2 opacity-80">
            {riskData?.recommendation || 'No active warnings'}
          </p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-[500px] relative z-0 group">
            <MapContainer 
              center={center} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <ChangeView center={center} />
              {nodes.map((node) => (
                <Marker key={node.id} position={[node.latitude, node.longitude]}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-slate-900">{node.locationName}</h3>
                      <p className="text-xs text-slate-500">{node.community}, {node.lga}</p>
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-blue-600 uppercase">Status: {node.status}</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            <button 
              onClick={() => navigate('/flood-map')}
              className="absolute bottom-6 right-6 z-[400] bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            >
              View Full Map
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Regional Coverage</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">32 Monitoring Zones</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                'Yenagoa', 'Sagbama', 'Ekeremor', 'Southern Ijaw',
                'Ogbia', 'Kolokuma/Opokuma', 'Nembe', 'Brass'
              ].map((lga) => (
                <div key={lga} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-blue-50 hover:border-blue-100 transition-all cursor-default">
                  <MapPin className="w-5 h-5 text-slate-400 mb-2 group-hover:text-blue-600 transition-colors" />
                  <span className="text-xs font-bold text-slate-700">{lga}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <button 
            onClick={() => navigate('/node-health')}
            className="w-full bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Node Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Battery className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-slate-600">Battery Voltage</span>
                </div>
                <span className="text-sm font-bold text-slate-900">3.8V</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Signal className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-slate-600">Signal Strength</span>
                </div>
                <span className="text-sm font-bold text-slate-900">-72 dBm</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-slate-600">Last Update</span>
                </div>
                <span className="text-sm font-bold text-slate-900">Just Now</span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/regulations')}
            className="w-full bg-slate-900 text-white p-6 rounded-3xl shadow-xl hover:bg-slate-800 transition-all text-left group"
          >
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Emergency Contact</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">In case of critical water levels, contact the Bayelsa State Emergency Management Agency (BYSEMA) immediately.</p>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 group-hover:bg-white/20 transition-all">
              <p className="text-lg font-black tracking-tight">0800-FLOOD-HELP</p>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">24/7 Hotline</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
