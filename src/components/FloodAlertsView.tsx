import React from 'react';
import { AlertTriangle, Phone, ShieldAlert, MapPin } from 'lucide-react';
import { AlertLog as AlertLogType, SensorNode } from '../types';
import { AlertLog } from './AlertLog';

interface FloodAlertsViewProps {
  alerts: AlertLogType[];
  selectedNode?: SensorNode;
}

export const FloodAlertsView: React.FC<FloodAlertsViewProps> = ({ alerts, selectedNode }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-50 p-2 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Emergency Protocols</h2>
              <p className="text-sm text-slate-500">Active evacuation and safety procedures</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm font-bold text-red-700 mb-1">Critical Evacuation (4.5m+)</p>
              <p className="text-xs text-red-600">Immediate relocation to designated high-ground shelters in {selectedNode?.lga || 'the region'}.</p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
              <p className="text-sm font-bold text-yellow-700 mb-1">Warning Advisory (3.0m+)</p>
              <p className="text-xs text-yellow-600">Secure valuables and prepare for potential relocation. Monitor local radio frequencies.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-sm font-bold text-blue-700 mb-1">Normal Monitoring</p>
              <p className="text-xs text-blue-600">Standard vigilance. Ensure drainage channels near your property are clear.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Emergency Contacts</h2>
              <p className="text-sm text-slate-500">Bayelsa State Emergency Management Agency</p>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              { label: 'SEMA Hotline', value: '0800-BAYELSA-SAFE', icon: Phone },
              { label: 'Fire Service', value: '0703-123-4567', icon: Phone },
              { label: 'Police Command', value: '0803-987-6543', icon: ShieldAlert },
              { label: 'Medical Emergency', value: '0812-345-6789', icon: AlertTriangle },
            ].map((contact, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <contact.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">{contact.label}</span>
                </div>
                <span className="text-sm font-bold text-blue-600">{contact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Alert Logs</h2>
        <AlertLog alerts={alerts} />
      </div>
    </div>
  );
};
