import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Battery, Signal, RefreshCw, Download, ShieldAlert, Cpu } from 'lucide-react';
import { SensorNode } from '../types';

import { LocationSelector } from '../components/LocationSelector';

interface NodeHealthProps {
  nodes: SensorNode[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  selectedNode?: SensorNode;
}

export const NodeHealth: React.FC<NodeHealthProps> = ({ nodes, selectedNodeId, onSelectNode, selectedNode }) => {
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
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Node Health</h1>
            <p className="text-slate-500">Sensor diagnostics and system maintenance</p>
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
          <button className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-2xl text-white shadow-xl font-bold text-sm hover:bg-blue-700 transition-all shrink-0">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh All</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {nodes.map((node) => (
            <div key={node.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <Cpu className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">{node.locationName}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{node.id}</p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  node.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {node.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="w-4 h-4 text-green-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Battery</span>
                  </div>
                  <p className="text-lg font-black text-slate-900">3.8V <span className="text-xs font-bold text-slate-400">(92%)</span></p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Signal className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signal</span>
                  </div>
                  <p className="text-lg font-black text-slate-900">-72 dBm <span className="text-xs font-bold text-slate-400">(Good)</span></p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-purple-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uptime</span>
                  </div>
                  <p className="text-lg font-black text-slate-900">14d 6h <span className="text-xs font-bold text-slate-400">(99.9%)</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all">
                  <Download className="w-4 h-4" />
                  <span>Update Firmware</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-600 border border-slate-200 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
                  <RefreshCw className="w-4 h-4" />
                  <span>Recalibrate</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">System Alerts</h3>
            <div className="space-y-4">
              <div className="flex gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-orange-900">Firmware Update Available</p>
                  <p className="text-[10px] text-orange-700 mt-1 leading-relaxed">Version 2.4.1 includes critical security patches and improved battery management.</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <Activity className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-blue-900">Network Optimization</p>
                  <p className="text-[10px] text-blue-700 mt-1 leading-relaxed">Scheduled maintenance for the Yenagoa gateway on March 25th, 02:00 AM.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Maintenance Log</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between text-xs pb-3 border-b border-white/10 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold">Node Calibrated</p>
                    <p className="text-slate-400">Yenagoa Station A</p>
                  </div>
                  <p className="text-slate-500">2d ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
