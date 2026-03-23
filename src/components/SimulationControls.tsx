import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

interface SimulationControlsProps {
  isSimulating: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({ isSimulating, onToggle, onReset }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
        <Play className="w-5 h-5 text-blue-600" />
        Simulation Controls
      </h2>
      <div className="space-y-3">
        <button 
          onClick={onToggle}
          className={cn(
            "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95",
            isSimulating 
              ? "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200" 
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
          )}
        >
          {isSimulating ? (
            <><RotateCcw className="w-5 h-5" /> Pause Simulation</>
          ) : (
            <><Play className="w-5 h-5" /> Start Heavy Rain Simulation</>
          )}
        </button>
        <button 
          onClick={onReset}
          className="w-full py-3 rounded-xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Reset System
        </button>
      </div>
      <p className="text-[10px] text-slate-400 mt-4 text-center italic">
        * Simulation mode uses synthetic data to demonstrate flood alert logic.
      </p>
    </section>
  );
};
