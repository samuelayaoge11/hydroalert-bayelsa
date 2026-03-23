import React from 'react';
import { Droplets, Activity, MapPin, Info } from 'lucide-react';
import { TelemetryData, SensorNode } from '../types';
import { TelemetryChart } from './TelemetryChart';
import { MapPlaceholder } from './MapPlaceholder';
import { StatusCard } from './StatusCard';
import { getStatusColor, getStatusText } from '../lib/utils';

interface WaterLevelViewProps {
  telemetry: TelemetryData[];
  selectedNode?: SensorNode;
  currentLevel: number;
}

export const WaterLevelView: React.FC<WaterLevelViewProps> = ({ telemetry, selectedNode, currentLevel }) => {
  if (!selectedNode) return null;

  const statusColor = getStatusColor(currentLevel, selectedNode.warningThreshold, selectedNode.criticalThreshold);
  const statusText = getStatusText(currentLevel, selectedNode.warningThreshold, selectedNode.criticalThreshold);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TelemetryChart data={telemetry} />
          <MapPlaceholder node={selectedNode} />
        </div>

        <div className="space-y-6">
          <StatusCard 
            level={currentLevel} 
            node={selectedNode} 
            statusColor={statusColor} 
            statusText={statusText} 
          />

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Node Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-slate-700">Signal Strength</span>
                </div>
                <span className="text-sm font-bold text-slate-900">-72 dBm</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">Battery Level</span>
                </div>
                <span className="text-sm font-bold text-slate-900">3.8V (82%)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-slate-700">Last Report</span>
                </div>
                <span className="text-sm font-bold text-slate-900">2 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
