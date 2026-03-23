import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Play, Square, RefreshCcw, Settings as SettingsIcon, ChevronLeft, Zap } from 'lucide-react';

interface SimulationProps {
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onResetSimulation: () => void;
  isSeeding: boolean;
  onSeedData: () => void;
  nodesCount: number;
}

export const Simulation: React.FC<SimulationProps> = ({ 
  isSimulating, 
  onToggleSimulation, 
  onResetSimulation, 
  isSeeding, 
  onSeedData,
  nodesCount
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-500"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Administrative Control</h1>
            <p className="text-slate-500">Trigger synthetic flash flood data for system testing</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Admin Access</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-100 p-2 rounded-xl">
              <SettingsIcon className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Simulation Engine</h2>
              <p className="text-sm text-slate-500">Manage monitoring nodes and simulation parameters</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-blue-600 rounded-2xl border border-blue-500 shadow-xl shadow-blue-100 text-white">
              <h3 className="text-lg font-bold mb-2 tracking-tight">One-Click Demo Mode</h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-6">
                Instantly seed all 32 stations and start the live telemetry simulation. 
                Perfect for quick system demonstrations.
              </p>
              <button 
                onClick={async () => {
                  if (!isSeeding) {
                    await onSeedData();
                    if (!isSimulating) {
                      onToggleSimulation();
                    }
                  }
                }}
                disabled={isSeeding}
                className="w-full flex items-center justify-center gap-3 p-4 bg-white text-blue-600 rounded-2xl font-black hover:bg-blue-50 transition-all disabled:opacity-50"
              >
                <Zap className={`w-5 h-5 ${isSeeding ? 'animate-spin' : ''}`} />
                {isSeeding ? 'Initializing Demo...' : 'Launch Full Demo'}
              </button>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">Flash Flood Scenario</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Use the simulation engine to test the system's response to rising water levels. 
                This will write simulated telemetry data to the active monitoring station.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={onToggleSimulation}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl font-bold transition-all shadow-lg ${isSimulating ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-100' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'}`}
                >
                  {isSimulating ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
                </button>
                <button 
                  onClick={onResetSimulation}
                  className="flex-1 flex items-center justify-center gap-3 p-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Reset System
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2 rounded-xl">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Data Initialization</h2>
              <p className="text-sm text-slate-500">Populate the database with regional monitoring nodes</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <RefreshCcw className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-green-900">System Initialized</p>
                <p className="text-xs text-green-700">{nodesCount} regions are currently active.</p>
              </div>
            </div>
            
            <button 
              onClick={onSeedData}
              disabled={isSeeding}
              className="w-full flex items-center justify-center gap-3 p-4 bg-white border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:text-blue-600 hover:border-blue-300 transition-all disabled:opacity-50"
            >
              <Database className={`w-5 h-5 ${isSeeding ? 'animate-spin' : ''}`} />
              {isSeeding ? 'Initializing...' : 'Re-seed Bayelsa Regions'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
