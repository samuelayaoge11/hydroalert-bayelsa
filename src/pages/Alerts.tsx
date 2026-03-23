import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { AlertLog } from '../types';

interface AlertsProps {
  alerts: AlertLog[];
}

export const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
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
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Alert History</h1>
            <p className="text-slate-500">Historical log of system warnings and critical evacuation events</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="bg-red-600 w-2 h-2 rounded-full" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Incident Log</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent Events</h3>
          <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full uppercase">Last 30 Days</span>
        </div>
        <div className="divide-y divide-slate-100">
          {alerts.length > 0 ? alerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-slate-50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${alert.alertLevel === 'critical' ? 'bg-red-50' : 'bg-yellow-50'}`}>
                  <AlertTriangle className={`w-6 h-6 ${alert.alertLevel === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 mb-1">{alert.message}</p>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.timestamp}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.nodeId}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          )) : (
            <div className="p-12 text-center">
              <p className="text-slate-500 font-bold">No recent alerts recorded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
