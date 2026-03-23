import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Map as MapIcon, Layers, Maximize2, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { SensorNode } from '../types';
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

import { LocationSelector } from '../components/LocationSelector';

// Helper component to update map view when selected node changes
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, 10);
  }, [center, map]);
  return null;
};

interface FloodMapProps {
  nodes: SensorNode[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  selectedNode?: SensorNode;
}

export const FloodMap: React.FC<FloodMapProps> = ({ nodes, selectedNodeId, onSelectNode, selectedNode }) => {
  const navigate = useNavigate();
  const center: [number, number] = selectedNode 
    ? [selectedNode.latitude, selectedNode.longitude] 
    : [4.9333, 6.2667]; // Default to Yenagoa

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 h-screen flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Flood Map</h1>
            <p className="text-slate-500">Interactive geographic visualization of sensor nodes</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-full md:w-72">
            <LocationSelector 
              nodes={nodes} 
              selectedNodeId={selectedNodeId} 
              onSelectNode={onSelectNode} 
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">
              <Layers className="w-4 h-4" />
              <span>Layers</span>
            </button>
            <button className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl text-white shadow-xl font-bold text-sm hover:bg-slate-800 transition-all">
              <Maximize2 className="w-4 h-4" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative z-0">
        <MapContainer 
          center={center} 
          zoom={10} 
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
                <div className="p-4 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${node.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <h3 className="font-bold text-slate-900">{node.locationName}</h3>
                  </div>
                  <div className="space-y-1 text-xs text-slate-500 mb-3">
                    <p>LGA: {node.lga}</p>
                    <p>Community: {node.community}</p>
                    <p>Elevation: {node.elevationBaseline}m</p>
                  </div>
                  <button 
                    onClick={() => navigate(`/water-levels?node=${node.id}`)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="absolute top-6 right-6 z-[400] space-y-3">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl w-48">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-slate-600">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-xs font-semibold text-slate-600">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs font-semibold text-slate-600">Critical</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
