import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplets, Activity, ShieldCheck, AlertTriangle, Settings, Info, MapPin } from 'lucide-react';

export const Drainage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Drainage Systems</h1>
          <p className="text-slate-500">Infrastructure status and flow capacity monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-teal-50 p-2 rounded-xl">
                  <Droplets className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-black text-slate-900">System Capacity</h3>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl">
                <button className="px-4 py-1.5 text-xs font-bold bg-white text-slate-900 rounded-lg shadow-sm">Overview</button>
                <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Detailed</button>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { name: 'Yenagoa Central Drain', lga: 'Yenagoa', capacity: 78, status: 'Normal', color: 'bg-teal-500' },
                { name: 'Amarata Main Canal', lga: 'Yenagoa', capacity: 92, status: 'Critical', color: 'bg-red-500' },
                { name: 'Igbogene Outflow', lga: 'Yenagoa', capacity: 45, status: 'Normal', color: 'bg-teal-500' },
                { name: 'Sagbama Toru-Orua Canal', lga: 'Sagbama', capacity: 92, status: 'Critical', color: 'bg-red-500' },
                { name: 'Sagbama Town Drain', lga: 'Sagbama', capacity: 60, status: 'Normal', color: 'bg-teal-500' },
                { name: 'Ekeremor Town Outflow', lga: 'Ekeremor', capacity: 45, status: 'Normal', color: 'bg-teal-500' },
                { name: 'Aleibiri Channel', lga: 'Ekeremor', capacity: 70, status: 'Warning', color: 'bg-orange-500' },
                { name: 'Oporoma Main Channel', lga: 'Southern Ijaw', capacity: 62, status: 'Warning', color: 'bg-orange-500' },
                { name: 'Amassoma Drainage', lga: 'Southern Ijaw', capacity: 50, status: 'Normal', color: 'bg-teal-500' },
                { name: 'Otuoke Drainage Network', lga: 'Ogbia', capacity: 35, status: 'Normal', color: 'bg-teal-500' },
                { name: 'Ogbia Town Canal', lga: 'Ogbia', capacity: 80, status: 'Warning', color: 'bg-orange-500' },
                { name: 'Kaiama Bridge Culvert', lga: 'Kolokuma/Opokuma', capacity: 88, status: 'Critical', color: 'bg-red-500' },
                { name: 'Opokuma Drain', lga: 'Kolokuma/Opokuma', capacity: 40, status: 'Normal', color: 'bg-teal-500' },
                { name: 'Nembe City Sea Wall', lga: 'Nembe', capacity: 55, status: 'Normal', color: 'bg-teal-500' },
                { name: 'Bassambiri Canal', lga: 'Nembe', capacity: 65, status: 'Warning', color: 'bg-orange-500' },
                { name: 'Twon-Brass Coastal Drain', lga: 'Brass', capacity: 25, status: 'Normal', color: 'bg-teal-500' },
                { name: 'Okpoama Outfall', lga: 'Brass', capacity: 30, status: 'Normal', color: 'bg-teal-500' },
              ].map((drain, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{drain.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{drain.lga} LGA</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        drain.status === 'Normal' ? 'bg-teal-50 text-teal-600' : 
                        drain.status === 'Warning' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {drain.status}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{drain.capacity}% Capacity</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className={`${drain.color} h-full transition-all duration-1000`} style={{ width: `${drain.capacity}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded-xl">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900">Flow Rate</h3>
              </div>
              <p className="text-2xl font-black text-slate-900">1,240 m³/s</p>
              <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">Average across network</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-50 p-2 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900">Pump Status</h3>
              </div>
              <p className="text-2xl font-black text-slate-900">12 / 14 Active</p>
              <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">2 in maintenance</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <h3 className="font-black tracking-tight">Maintenance Alerts</h3>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-orange-400 mb-1">Blockage Detected</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">Debris accumulation reported at Amarata Main Canal. Maintenance crew dispatched.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-blue-400 mb-1">Pump Service Due</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">Pump #04 at Onopa Station requires routine lubrication and filter replacement.</p>
              </div>
            </div>
            <button className="w-full mt-6 bg-white text-slate-900 py-3 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">
              Schedule Maintenance
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Network Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-600">Total Length: 142km</span>
              </div>
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-600">Outlets: 24 Primary</span>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-600">Last Inspection: 4d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
