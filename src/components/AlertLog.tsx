import React from 'react';
import { History, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { AlertLog as AlertLogType } from '../types';

interface AlertLogProps {
  alerts: AlertLogType[];
}

export const AlertLog: React.FC<AlertLogProps> = ({ alerts }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
        <History className="w-5 h-5 text-blue-600" />
        Alert Log
      </h2>
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <ShieldCheck className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No active alerts. System secure.</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div 
              key={alert.id} 
              className={cn(
                "p-3 rounded-xl border text-sm animate-in slide-in-from-right-4 duration-300",
                alert.alertLevel === 'critical' ? "bg-red-50 border-red-100 text-red-700" : "bg-yellow-50 border-yellow-100 text-yellow-700"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold uppercase text-[10px] tracking-widest">{alert.alertLevel}</span>
                <span className="text-[10px] opacity-70">{alert.timestamp}</span>
              </div>
              <p className="font-medium leading-tight">{alert.message}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
