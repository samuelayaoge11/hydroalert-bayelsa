import React from 'react';
import { Database, Play, Square, RefreshCcw, Settings as SettingsIcon } from 'lucide-react';
import { SimulationControls } from './SimulationControls';

interface SettingsViewProps {
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onResetSimulation: () => void;
  isSeeding: boolean;
  onSeedData: () => void;
  nodesCount: number;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  isSimulating, 
  onToggleSimulation, 
  onResetSimulation, 
  isSeeding, 
  onSeedData,
  nodesCount
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-slate-100 p-2 rounded-xl">
            <SettingsIcon className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Administration</h2>
            <p className="text-sm text-slate-500">Manage monitoring nodes and simulation parameters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Simulation Engine</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Use the simulation engine to test the system's response to rising water levels. 
              This will write simulated telemetry data to the active monitoring station.
            </p>
            <SimulationControls 
              isSimulating={isSimulating} 
              onToggle={onToggleSimulation} 
              onReset={onResetSimulation} 
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Data Initialization</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              If the system is empty, use this tool to populate the database with the 8 primary monitoring regions of Bayelsa State.
            </p>
            
            {nodesCount === 0 ? (
              <button 
                onClick={onSeedData}
                disabled={isSeeding}
                className="w-full flex items-center justify-center gap-3 p-6 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
              >
                <Database className={`w-6 h-6 ${isSeeding ? 'animate-spin' : ''}`} />
                {isSeeding ? 'Initializing Regions...' : 'Seed Bayelsa Regions'}
              </button>
            ) : (
              <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <RefreshCcw className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-900">System Initialized</p>
                  <p className="text-xs text-green-700">{nodesCount} regions are currently active.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl border border-dashed border-slate-300">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Security Notice</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Administrative functions are restricted to authorized personnel. All simulation and seeding activities are logged for audit purposes. 
          Ensure you are monitoring the correct community before starting a simulation.
        </p>
      </div>
    </div>
  );
};
