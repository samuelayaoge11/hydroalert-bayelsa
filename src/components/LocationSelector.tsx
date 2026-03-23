import React from 'react';
import { MapPin, ChevronRight, Search } from 'lucide-react';
import { SensorNode } from '../types';

interface LocationSelectorProps {
  nodes: SensorNode[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ nodes, selectedNodeId, onSelectNode }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Group nodes by LGA
  const groupedNodes = nodes.reduce((acc, node) => {
    if (!acc[node.lga]) {
      acc[node.lga] = [];
    }
    acc[node.lga].push(node);
    return acc;
  }, {} as Record<string, SensorNode[]>);

  const filteredLGAs = Object.keys(groupedNodes).filter(lga => 
    lga.toLowerCase().includes(searchTerm.toLowerCase()) ||
    groupedNodes[lga].some(node => node.locationName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
          <MapPin className="w-5 h-5 text-blue-600" />
          Bayelsa State Regions
        </h2>
        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full uppercase">
          {nodes.length} Active Nodes
        </span>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Search LGA or Community..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredLGAs.map(lga => (
          <div key={lga} className="space-y-2">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              {lga} LGA
            </h3>
            <div className="grid gap-2">
              {groupedNodes[lga].map(node => (
                <button
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                    selectedNodeId === node.id 
                      ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' 
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${node.status === 'active' ? 'bg-green-500' : 'bg-slate-300'}`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{node.locationName}</p>
                      <p className="text-[10px] text-slate-500">{node.community}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${selectedNodeId === node.id ? 'text-blue-600' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>
        ))}
        
        {filteredLGAs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-slate-400">No locations found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};
