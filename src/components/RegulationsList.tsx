import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';
import { Regulation } from '../types';

interface RegulationsListProps {
  regulations: Regulation[];
}

export const RegulationsList: React.FC<RegulationsListProps> = ({ regulations }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
        <FileText className="w-5 h-5 text-blue-600" />
        Local Drainage Regulations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regulations.map(reg => (
          <div key={reg.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group">
            <h3 className="font-bold text-blue-800 mb-1 group-hover:text-blue-600">{reg.title}</h3>
            <p className="text-sm text-slate-600 mb-2 leading-relaxed">{reg.description}</p>
            <div className="flex items-start gap-2 text-xs font-semibold text-red-600 bg-red-50 p-2 rounded-lg">
              <AlertTriangle className="w-3 h-3 mt-0.5" />
              <span>{reg.penaltyClause}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
