import React from 'react';
import { cn } from '../lib/utils';
import { SensorNode } from '../types';

interface StatusCardProps {
  level: number;
  node: SensorNode;
  statusColor: string;
  statusText: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({ level, node, statusColor, statusText }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-hidden relative">
      <div className={cn("absolute top-0 left-0 w-full h-2", statusColor)} />
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Current System Status</h2>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">{node.lga} LGA</p>
          <p className="text-xs font-semibold text-slate-600">{node.community}</p>
        </div>
      </div>
      <div className="flex flex-col items-center py-4">
        <div className={cn("text-5xl font-black mb-2", statusColor.replace('bg-', 'text-'))}>
          {level.toFixed(2)}m
        </div>
        <div className={cn("px-4 py-1 rounded-full text-white text-sm font-bold shadow-sm", statusColor)}>
          {statusText}
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-slate-500">Warning Threshold</span>
          <span className="text-yellow-600">{node.warningThreshold}m</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-yellow-500 h-full" style={{ width: `${(node.warningThreshold / 6) * 100}%` }} />
        </div>
        
        <div className="flex justify-between text-xs font-medium">
          <span className="text-slate-500">Critical Threshold</span>
          <span className="text-red-600">{node.criticalThreshold}m</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full" style={{ width: `${(node.criticalThreshold / 6) * 100}%` }} />
        </div>
      </div>
    </section>
  );
};
