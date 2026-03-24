import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Search,
  ChevronLeft,
  ExternalLink,
  FileText,
  Gavel,
} from "lucide-react";
import { Regulation } from "../types";

interface RegulationsProps {
  regulations: Regulation[];
}

export const Regulations: React.FC<RegulationsProps> = ({ regulations }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = regulations.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-500"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Official Environmental Laws
          </h1>
          <p className="text-slate-500">
            Searchable database of gazetted Bayelsa State flood management
            regulations
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by law or agency (e.g., NESREA)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-3xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((law) => (
          <div
            key={law.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
          >
            <div className="p-8 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-xl">
                  <Gavel className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {law.title}
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                {law.description}
              </p>
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-3 h-3 text-red-700" />
                  <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest">
                    Statutory Penalty
                  </p>
                </div>
                <p className="text-xs text-red-600 font-medium leading-tight">
                  {law.penaltyClause}
                </p>
              </div>
            </div>

            {law.sourceUrl && (
              <a
                href={law.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between hover:bg-slate-800 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-white uppercase tracking-widest">
                    View Official Gazetted Document
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
