import React from 'react';
import { CloudRain, Wind, Thermometer, Droplets, MapPin, Info } from 'lucide-react';
import { SensorNode } from '../types';

interface RainfallViewProps {
  selectedNode?: SensorNode;
}

export const RainfallView: React.FC<RainfallViewProps> = ({ selectedNode }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Current Rainfall', value: '12.4 mm', icon: CloudRain, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Wind Speed', value: '18 km/h', icon: Wind, color: 'text-slate-600', bg: 'bg-slate-50' },
          { label: 'Temperature', value: '28°C', icon: Thermometer, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Humidity', value: '84%', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2 rounded-lg">
              <CloudRain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Precipitation Forecast</h2>
              <p className="text-sm text-slate-500">Bayelsa State Meteorological Service</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { day: 'Mon', rain: '12mm', temp: '28°C', status: 'Heavy Rain' },
              { day: 'Tue', rain: '4mm', temp: '30°C', status: 'Light Rain' },
              { day: 'Wed', rain: '0mm', temp: '32°C', status: 'Sunny' },
              { day: 'Thu', rain: '18mm', temp: '27°C', status: 'Thunderstorm' },
            ].map((day, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-sm font-bold text-slate-900 mb-1">{day.day}</p>
                <div className="flex justify-center my-2">
                  <CloudRain className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs font-bold text-blue-600 mb-1">{day.rain}</p>
                <p className="text-[10px] text-slate-500">{day.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-50 p-2 rounded-lg">
              <Info className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Soil Saturation</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-500 uppercase">Saturation Level</span>
                <span className="text-orange-600">72%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full" style={{ width: '72%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 italic">High saturation increases flood risk from surface runoff.</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs font-bold text-blue-700 mb-1">Met Office Advisory</p>
              <p className="text-[10px] text-blue-600">Expect heavy rainfall in {selectedNode?.lga || 'Bayelsa'} over the next 48 hours. Drainage systems should be monitored closely.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
