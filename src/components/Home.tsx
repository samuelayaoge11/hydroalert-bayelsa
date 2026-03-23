import React from 'react';
import { 
  Droplets, 
  AlertTriangle, 
  ShieldCheck, 
  CloudRain, 
  ChevronRight,
  Activity,
  LayoutDashboard,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SensorNode } from '../types';

interface HomeProps {
  nodes: SensorNode[];
  activeNodes: number;
}

export const Home: React.FC<HomeProps> = ({ nodes, activeNodes }) => {
  const navCards = [
    { 
      id: 'water-level', 
      label: 'Water Level Monitoring', 
      description: 'Real-time telemetry, historical trends, and geographic mapping of water levels across Bayelsa.',
      icon: Droplets, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      path: '/water-level'
    },
    { 
      id: 'flood-alerts', 
      label: 'Flood Alerts & Safety', 
      description: 'Critical alerts, emergency protocols, and contact information for disaster management.',
      icon: AlertTriangle, 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      path: '/flood-alerts'
    },
    { 
      id: 'drainage', 
      label: 'Drainage System', 
      description: 'System integrity monitoring, maintenance schedules, and drainage regulations.',
      icon: ShieldCheck, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      path: '/drainage'
    },
    { 
      id: 'rainfall', 
      label: 'Rainfall Analysis', 
      description: 'Precipitation forecasts, soil saturation analysis, and meteorological data.',
      icon: CloudRain, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50',
      path: '/rainfall'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-50 p-2 rounded-xl">
              <LayoutDashboard className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">State Overview</p>
          </div>
          <p className="text-3xl font-black text-slate-900">Bayelsa State</p>
          <p className="text-sm text-slate-500 mt-1">8 LGAs under active monitoring</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-50 p-2 rounded-xl">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Stations</p>
          </div>
          <p className="text-3xl font-black text-green-600">{activeNodes}</p>
          <p className="text-sm text-slate-500 mt-1">Nodes reporting real-time data</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-50 p-2 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Status</p>
          </div>
          <p className="text-3xl font-black text-blue-600">Optimal</p>
          <p className="text-sm text-slate-500 mt-1">No critical state-wide alerts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {navCards.map((card) => (
          <Link 
            key={card.id} 
            to={card.path}
            className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-8 h-8 ${card.color}`} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{card.label}</h3>
              <p className="text-slate-500 leading-relaxed mb-8">{card.description}</p>
            </div>
            <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
              <span>Open Module</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Regional Monitoring Network</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md">Our network of sensors across Bayelsa provides the most accurate flood monitoring data in the region.</p>
          <div className="flex flex-wrap gap-2">
            {nodes.slice(0, 5).map((node) => (
              <div key={node.id} className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2">
                <MapPin className="w-3 h-3 text-blue-400" />
                {node.community}
              </div>
            ))}
            {nodes.length > 5 && (
              <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold italic">
                +{nodes.length - 5} more regions
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </div>
    </div>
  );
};
