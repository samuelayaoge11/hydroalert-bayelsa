import React from 'react';
import { Droplets, MapPin, Activity } from 'lucide-react';
import { SensorNode } from '../types';

interface HeaderProps {
  node: SensorNode;
}

export const Header: React.FC<HeaderProps> = ({ node }) => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg">
            <Droplets className="text-blue-700 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">HydroAlert Bayelsa</h1>
            <p className="text-xs text-blue-100 opacity-80">Hydrological Monitoring & Flood Alert System</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm bg-blue-800/50 px-4 py-2 rounded-full border border-blue-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-300" />
            <div className="flex flex-col">
              <span className="font-bold">{node.locationName}</span>
              <span className="text-[10px] text-blue-200 opacity-80">{node.lga} LGA • {node.community}</span>
            </div>
          </div>
          <div className="w-px h-4 bg-blue-600" />
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span>Node: {node.id}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
