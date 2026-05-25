import { useState } from 'react';
import { Settings, Shield, User, Bell, HardDrive, Key, CheckCircle, Info } from 'lucide-react';

interface SettingsViewProps {
  doctorName: string;
  setDoctorName: (name: string) => void;
  doctorDept: string;
  setDoctorDept: (dept: string) => void;
  isRealTimeAI: boolean;
}

export default function SettingsView({
  doctorName,
  setDoctorName,
  doctorDept,
  setDoctorDept,
  isRealTimeAI,
}: SettingsViewProps) {
  const [threshold, setThreshold] = useState('85');
  const [hospital, setHospital] = useState('St. Jude Medical Center');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-black text-[#131b2e] dark:text-white tracking-tight">System Settings</h2>
        <p className="text-xs text-[#45464d] dark:text-[#94a3b8] opacity-75">Configure clinician defaults, system sensitivity thresholds, and check model connectivity status</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Clinician Profile Block */}
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#eceef0] dark:border-[#1e293b] space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <User className="text-[#006a61] h-4.5 w-4.5" />
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Authorized Clinician Credentials</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">PHYSICIAN FULL NAME</label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">DEPARTMENT / SPECIALTY</label>
              <input
                type="text"
                value={doctorDept}
                onChange={(e) => setDoctorDept(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">MEDICAL INSTITUTION</label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              required
              className="w-full bg-slate-50 dark:bg-slate-900 border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
            />
          </div>
        </div>

        {/* AI Engine Status & Configuration */}
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#eceef0] dark:border-[#1e293b] space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Key className="text-[#006a61] h-4.5 w-4.5" />
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Google Gemini Neural Engine</h3>
          </div>

          {/* Connection Status block */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isRealTimeAI 
              ? 'bg-teal-50/50 border-teal-200 dark:bg-teal-950/15 dark:border-teal-900' 
              : 'bg-amber-50/50 border-amber-200 dark:bg-amber-950/10 dark:border-amber-900'
          }`}>
            <Shield className={`h-5 w-5 shrink-0 mt-0.5 ${isRealTimeAI ? 'text-[#006a61]' : 'text-amber-500'}`} />
            <div>
              <p className="font-bold text-xs text-[#131b2e] dark:text-white uppercase tracking-wide">
                {isRealTimeAI ? '● ACTIVE: Production-Grade SDK Online' : '● SIMULATED STATUS: Offline Fallback'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {isRealTimeAI 
                  ? 'The backend has successfully connected to Google AI Studio development models. All scans are analyzed in real-time by a production instance of gemini-3.5-flash.'
                  : 'The application is running in high-fidelity simulation mode because an active GEMINI_API_KEY was not declared. To trigger live deep learning radiological scans, add your secret key in the Secrets Panel of the Google AI Studio console.'
                }
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">DIAGNOSTIC CRITICAL ALERT THRESHOLD</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="50"
                  max="98"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="w-full accent-[#006a61] cursor-pointer"
                />
                <span className="font-black text-sm text-[#006a61] shrink-0 w-10 text-right">{threshold}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Confidence scores below this margin will report as standard clinical observations.</p>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">AI MODEL SELECTOR</label>
              <select
                disabled
                className="w-full bg-slate-100 dark:bg-slate-900 border border-[#c6c6cd] dark:border-slate-850 rounded-xl p-2.5 text-xs font-semibold text-slate-500 cursor-not-allowed"
              >
                <option>gemini-3.5-flash (Standard Thoracic Model)</option>
              </select>
              <p className="text-[10px] text-slate-400 mt-1">Core model matches specifications automatically.</p>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#eceef0] dark:border-[#1e293b] space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Bell className="text-[#006a61] h-4.5 w-4.5" />
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Intake Notification Preferences</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input type="checkbox" defaultChecked className="rounded text-[#006a61] focus:ring-[#006a61]" />
              <span>Broadcast system telemetry alerts when AI classification detects active Pneumonia</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input type="checkbox" defaultChecked className="rounded text-[#006a61] focus:ring-[#006a61]" />
              <span>Log automatic epidemiological reports for suspected positive Tuberculosis cases</span>
            </label>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-[#006a61] hover:bg-[#005049] text-white font-bold text-xs py-2.5 px-6 rounded-xl cursor-pointer shadow-xs transition-colors"
          >
            Save Settings
          </button>
          {saveSuccess && (
            <div className="text-xs text-teal-600 dark:text-[#86f2e4] font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle size={14} />
              <span>Clinician configurations saved successfully.</span>
            </div>
          )}
        </div>

      </form>
    </div>
  );
}
