import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, Info, MapPin, ChevronLeft } from 'lucide-react';
import { Regulation } from '../types';

interface RegulationsProps {
  regulations: Regulation[];
}

export const Regulations: React.FC<RegulationsProps> = ({ regulations }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = regulations.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.description.toLowerCase().includes(search.toLowerCase())
  );

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
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Drainage Regulations</h1>
            <p className="text-slate-500">Searchable knowledge base of local drainage and waste disposal laws</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="bg-blue-600 w-2 h-2 rounded-full" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Legal Database</span>
        </div>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text"
          placeholder="Search laws, penalties, or LGA-specific regulations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-3xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length > 0 ? filtered.map((law) => (
          <div key={law.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-2 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">{law.title}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">{law.description}</p>
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
              <p className="text-xs font-bold text-red-700 mb-1 uppercase tracking-widest">Penalty Clause</p>
              <p className="text-sm text-red-600">{law.penaltyClause}</p>
            </div>
          </div>
        )) : (
          <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 font-bold">No regulations found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
