import React from 'react';
import { 
  LayoutDashboard, 
  Droplets, 
  AlertTriangle, 
  CloudRain, 
  ShieldCheck, 
  LogOut,
  ChevronRight,
  Settings,
  Map as MapIcon,
  Activity,
  Waves,
  RefreshCcw
} from 'lucide-react';
import { auth } from '../firebase';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

export type ViewType = 'dashboard' | 'water-level' | 'flood-alerts' | 'drainage' | 'rainfall' | 'settings';

interface SidebarProps {
  userEmail?: string | null;
  role?: string;
  isMobile?: boolean;
  onSelect?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ userEmail, role, isMobile, onSelect }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-600', bg: 'bg-blue-50', path: '/' },
    { id: 'water-levels', label: 'Water Levels', icon: Waves, color: 'text-cyan-600', bg: 'bg-cyan-50', path: '/water-levels' },
    { id: 'flood-map', label: 'Flood Map', icon: MapIcon, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/flood-map' },
    { id: 'rainfall', label: 'Rainfall', icon: CloudRain, color: 'text-sky-600', bg: 'bg-sky-50', path: '/rainfall' },
    { id: 'drainage', label: 'Drainage', icon: Droplets, color: 'text-teal-600', bg: 'bg-teal-50', path: '/drainage' },
    { id: 'regulations', label: 'Regulations', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50', path: '/regulations' },
    { id: 'node-health', label: 'Node Health', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50', path: '/node-health' },
    { id: 'simulation', label: 'Simulation', icon: RefreshCcw, color: 'text-red-600', bg: 'bg-red-50', path: '/simulation' },
    { id: 'alerts', label: 'Alert History', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50', path: '/alerts' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50', path: '/settings' },
  ];

  return (
    <aside className={cn(
      "h-screen bg-white border-r border-slate-200 z-[60] flex flex-col shadow-sm transition-all duration-300",
      isMobile ? "w-full" : "fixed left-0 top-0 w-64 hidden lg:flex"
    )}>
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
            <Droplets className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">HydroAlert</h1>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Bayelsa State</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={onSelect}
            className={({ isActive }) => cn(
              "w-full flex items-center justify-between p-3 rounded-xl transition-all group",
              isActive 
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                : "text-slate-500 hover:bg-slate-50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-1.5 rounded-lg transition-colors",
                "bg-slate-50 group-[.active]:bg-white/10",
                item.bg
              )}>
                <item.icon className={cn("w-4 h-4", item.color, "group-[.active]:text-white")} />
              </div>
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
            <ChevronRight className={cn(
              "w-4 h-4 transition-transform",
              "opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-[.active]:opacity-100 group-[.active]:translate-x-0"
            )} />
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Signed in as</p>
          <p className="text-xs font-bold text-slate-900 truncate">{userEmail || 'User'}</p>
        </div>
        <button 
          onClick={() => auth.signOut()}
          className="w-full flex items-center gap-3 p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-semibold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
