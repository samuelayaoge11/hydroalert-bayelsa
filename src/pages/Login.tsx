import React from 'react';
import { Droplets, LogIn, Shield, Zap, Globe } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

export const Login: React.FC = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Side: Branding & Info */}
      <div className="lg:w-1/2 bg-blue-600 p-12 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full -mr-48 -mt-48 opacity-50 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full -ml-48 -mb-48 opacity-50 blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white p-2 rounded-xl shadow-xl">
              <Droplets className="text-blue-600 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">HydroAlert</h1>
              <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Bayelsa State</p>
            </div>
          </div>

          <h2 className="text-5xl font-black leading-tight mb-6 tracking-tighter">
            Real-time Flood <br />
            Monitoring for <br />
            <span className="text-blue-200 italic font-serif">Bayelsa State.</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-md leading-relaxed">
            Advanced early warning system protecting communities through real-time telemetry and predictive analytics.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <p className="font-bold text-sm">Community Safety</p>
              <p className="text-xs text-blue-200">Early alerts for low-lying areas.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <p className="font-bold text-sm">Live Telemetry</p>
              <p className="text-xs text-blue-200">Millimeter-precise water levels.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <div className="mb-12 text-center lg:text-left">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Sign In</h3>
            <p className="text-slate-500">Access the monitoring dashboard and alerts.</p>
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleLogin}
              className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl flex items-center justify-center gap-4 hover:border-blue-200 hover:bg-blue-50 transition-all group shadow-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span className="font-bold text-slate-700 group-hover:text-blue-700">Continue with Google</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Authorized Access Only</span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-slate-400" />
                <h4 className="text-sm font-bold text-slate-900">Regional Coverage</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Monitoring active in all 8 LGAs: Yenagoa, Sagbama, Ekeremor, Southern Ijaw, Ogbia, Kolokuma/Opokuma, Nembe, and Brass.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-slate-400 font-medium">
              &copy; 2026 Bayelsa State Ministry of Environment. <br />
              Flood Monitoring & Early Warning System.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
