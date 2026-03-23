import React from 'react';
import { MapPin, Info } from 'lucide-react';
import { SensorNode } from '../types';

interface MapPlaceholderProps {
  node: SensorNode;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ node }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
        <MapPin className="w-5 h-5 text-blue-600" />
        Geographic Monitoring Map
      </h2>
      <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover bg-center grayscale" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Node Marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg animate-bounce">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="mt-2 bg-white px-3 py-1 rounded-lg shadow-md border border-slate-200 text-xs font-bold">
            {node.locationName}
          </div>
        </div>

        {/* Info Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3 max-w-[200px]">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">Coordinates</p>
            <p className="text-xs font-medium text-slate-700">{node.latitude}°N, {node.longitude}°E</p>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 mt-3 italic">
        * Map visualization shows the precise geographic location of the monitoring node.
      </p>
    </section>
  );
};
