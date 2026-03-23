import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CloudRain, Wind, Thermometer, Droplets, Calendar, Sun, CloudLightning } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const rainfallData = [
  { day: 'Mon', amount: 12.4, color: '#3b82f6' },
  { day: 'Tue', amount: 8.2, color: '#3b82f6' },
  { day: 'Wed', amount: 24.5, color: '#2563eb' },
  { day: 'Thu', amount: 15.1, color: '#3b82f6' },
  { day: 'Fri', amount: 5.4, color: '#60a5fa' },
  { day: 'Sat', amount: 0.0, color: '#93c5fd' },
  { day: 'Sun', amount: 32.1, color: '#1d4ed8' },
];

export const Rainfall: React.FC = () => {
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Rainfall Data</h1>
          <p className="text-slate-500">Meteorological monitoring and precipitation forecasts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-50 p-2 rounded-xl">
              <CloudRain className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Precipitation</p>
          </div>
          <p className="text-3xl font-black text-slate-900">12.4mm</p>
          <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">Last 24 Hours</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-50 p-2 rounded-xl">
              <Thermometer className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Temperature</p>
          </div>
          <p className="text-3xl font-black text-slate-900">28°C</p>
          <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">Feels like 31°C</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-50 p-2 rounded-xl">
              <Droplets className="w-5 h-5 text-cyan-600" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Humidity</p>
          </div>
          <p className="text-3xl font-black text-slate-900">84%</p>
          <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">High saturation</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-50 p-2 rounded-xl">
              <Wind className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Wind Speed</p>
          </div>
          <p className="text-3xl font-black text-slate-900">14km/h</p>
          <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">South-Westerly</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-xl">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-black text-slate-900">Weekly Precipitation</h3>
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total: 97.7mm</div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  dx={-10}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {rainfallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden flex flex-col">
          <div className="p-8 border-b border-white/10">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">7-Day Forecast</h3>
            <div className="space-y-6">
              {[
                { day: 'Mon', icon: Sun, temp: '32°C', desc: 'Sunny' },
                { day: 'Tue', icon: CloudRain, temp: '28°C', desc: 'Light Rain' },
                { day: 'Wed', icon: CloudLightning, temp: '26°C', desc: 'Storms' },
                { day: 'Thu', icon: CloudRain, temp: '27°C', desc: 'Heavy Rain' },
                { day: 'Fri', icon: Sun, temp: '31°C', desc: 'Partly Cloudy' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400 w-8 uppercase">{item.day}</span>
                    <item.icon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold text-white">{item.desc}</span>
                  </div>
                  <span className="text-sm font-black text-white">{item.temp}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 bg-blue-600 mt-auto">
            <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-2">Weather Advisory</p>
            <p className="text-sm font-bold text-white leading-relaxed">Heavy thunderstorms expected on Wednesday. Flash flood warnings may be issued for low-lying areas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
