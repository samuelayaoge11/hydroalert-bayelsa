import React from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  LogOut,
  Database,
  Ruler,
  ChevronRight,
} from "lucide-react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          System Settings
        </h1>
        <p className="text-slate-500">
          Manage your profile, alerts, and system configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {user?.displayName || "Authorized Engineer"}
                </h3>
                <p className="text-slate-500 text-sm">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Account Role
                </p>
                <p className="text-sm font-bold text-slate-700">
                  System Administrator
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Project Access
                </p>
                <p className="text-sm font-bold text-slate-700">
                  Bayelsa State Portal
                </p>
              </div>
            </div>
          </div>

          {/* System Preferences */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              System Configuration
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                    <Ruler className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Measurement Units
                    </p>
                    <p className="text-xs text-slate-500">
                      Display water levels in Meters (m)
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                    <Bell className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Notification Channels
                    </p>
                    <p className="text-xs text-slate-500">
                      Email and Browser Push enabled
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
            <Shield className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Security Audit</h3>
            <p className="text-slate-400 text-sm mb-6">
              Your session is protected by Firebase Identity Platform with
              256-bit encryption.
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500/10 border border-red-500/20 text-red-400 py-3 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out from Portal
            </button>
          </div>

          <div className="bg-blue-600 p-8 rounded-3xl shadow-xl text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Engineering Support</h3>
              <p className="text-blue-100 text-sm mb-4">
                Contact the technical team for node maintenance or sensor
                calibration.
              </p>
              <a
                href="mailto:support@hydroalert.gov"
                className="text-xs font-black uppercase tracking-widest bg-white text-blue-600 px-4 py-2 rounded-lg inline-block"
              >
                Open Ticket
              </a>
            </div>
            <SettingsIcon className="absolute -bottom-8 -right-8 w-32 h-32 text-blue-500 opacity-20 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
