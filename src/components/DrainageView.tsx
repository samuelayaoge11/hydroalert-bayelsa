import React from 'react';
import { Droplets, ShieldCheck, AlertTriangle, Info, MapPin } from 'lucide-react';
import { Regulation, SensorNode } from '../types';
import { RegulationsList } from './RegulationsList';

interface DrainageViewProps {
  regulations: Regulation[];
  selectedNode?: SensorNode;
}

export const DrainageView: React.FC<DrainageViewProps> = ({ regulations, selectedNode }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-50 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">System Integrity</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">Monitoring of primary drainage outfalls and secondary channels in {selectedNode?.lga || 'Bayelsa'}.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-sm font-medium text-slate-700">Outfall Status</span>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase">Clear</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-sm font-medium text-slate-700">Flow Rate</span>
              <span className="text-xs font-bold text-slate-900">1.2 m³/s</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-sm font-medium text-slate-700">Debris Level</span>
              <span className="text-xs font-bold text-slate-900">Low (12%)</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-50 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Maintenance Schedule</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { task: 'Primary Outfall Desilting', date: 'March 25, 2026', status: 'Scheduled', lga: 'Yenagoa' },
              { task: 'Secondary Channel Clearing', date: 'March 28, 2026', status: 'Pending', lga: 'Sagbama' },
              { task: 'Culvert Inspection', date: 'April 02, 2026', status: 'Scheduled', lga: 'Ogbia' },
              { task: 'Flood Plain Survey', date: 'April 10, 2026', status: 'Planned', lga: 'Nembe' },
            ].map((task, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-bold text-slate-900">{task.task}</p>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase">{task.status}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" />
                  <span>{task.lga} LGA</span>
                  <span className="mx-1">•</span>
                  <span>{task.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Drainage Regulations & Penalties</h2>
        </div>
        <RegulationsList regulations={regulations} />
      </div>
    </div>
  );
};
