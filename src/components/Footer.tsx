import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto p-8 text-center text-slate-400 text-xs">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span>System Online</span>
        </div>
        <div className="w-px h-3 bg-slate-200 hidden md:block" />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Simulation Ready</span>
        </div>
        <div className="w-px h-3 bg-slate-200 hidden md:block" />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span>Last Sync: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      <p>© 2026 HydroAlert Bayelsa. Developed for Environmental Resilience.</p>
      <p className="mt-1">Data provided by Simulated IoT Edge Nodes.</p>
    </footer>
  );
};
