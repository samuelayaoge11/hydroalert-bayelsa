import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, Smartphone, Trash2, LogOut, ChevronRight } from 'lucide-react';
import { auth } from '../firebase';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500">Manage your account and notification preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Account</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <button className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-all text-left group">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-2.5 rounded-2xl group-hover:bg-blue-600 transition-colors">
                  <User className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Profile Information</p>
                  <p className="text-xs text-slate-500">Update your name and email address</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-all" />
            </button>
            <button className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-all text-left group">
              <div className="flex items-center gap-4">
                <div className="bg-purple-50 p-2.5 rounded-2xl group-hover:bg-purple-600 transition-colors">
                  <Shield className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Security & Privacy</p>
                  <p className="text-xs text-slate-500">Manage passwords and authentication</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-all" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Notifications</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="bg-orange-50 p-2.5 rounded-2xl">
                  <Bell className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Push Notifications</p>
                  <p className="text-xs text-slate-500">Receive alerts on your device</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-2.5 rounded-2xl">
                  <Smartphone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">SMS Alerts</p>
                  <p className="text-xs text-slate-500">Emergency alerts via text message</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Danger Zone</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <button 
              onClick={() => auth.signOut()}
              className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-slate-50 p-2.5 rounded-2xl group-hover:bg-red-600 transition-colors">
                  <LogOut className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Sign Out</p>
                  <p className="text-xs text-slate-500">Log out of your account</p>
                </div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-all text-left group">
              <div className="flex items-center gap-4">
                <div className="bg-red-50 p-2.5 rounded-2xl group-hover:bg-red-600 transition-colors">
                  <Trash2 className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-red-600">Delete Account</p>
                  <p className="text-xs text-red-400">Permanently remove your account and data</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
