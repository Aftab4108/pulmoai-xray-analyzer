import { useState, useEffect } from 'react';
import { Sun, Moon, Bell, Search, Info, ShieldAlert } from 'lucide-react';

// Subcomponents
import Sidebar from './components/Sidebar';
import StatsWidget from './components/StatsWidget';
import UploadZone from './components/UploadZone';
import RecentAnalyses from './components/RecentAnalyses';
import ReportModal from './components/ReportModal';
import PatientRecordsView from './components/PatientRecordsView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';

// Data types and presets
import { INITIAL_PATIENT_RECORDS } from './data';
import { PatientRecord } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  // Custom states for clinician name matching user context
  const [doctorName, setDoctorName] = useState('Dr. Aftab Altaf Patel');
  const [doctorDept, setDoctorDept] = useState('Thoracic Radiology');

  // Search in primary top bar header
  const [globalSearch, setGlobalSearch] = useState('');

  // Active records state loaded from LocalStorage or pre-populated clinical patterns
  const [records, setRecords] = useState<PatientRecord[]>(() => {
    const local = localStorage.getItem('PULMO_AI_PATIENT_RECORDS_M1');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        console.error("Local storage decoding failure, restoring mock defaults:", err);
      }
    }
    return INITIAL_PATIENT_RECORDS;
  });

  // Keep records synced in LocalStorage
  useEffect(() => {
    localStorage.setItem('PULMO_AI_PATIENT_RECORDS_M1', JSON.stringify(records));
  }, [records]);

  // Selected patient case for full Markdown report overlay
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);

  // Initialize and check dark mode state
  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    setIsDark(isCurrentlyDark);
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  // Dynamic status to determine whether we connected to real Gemini orfallback
  const [isRealTimeAI, setIsRealTimeAI] = useState(false);

  // Trigger server-side lung scan analysis via POST `/api/analyze`
  const handleAnalyzeImage = async (
    imageBase64: string,
    filename: string,
    mimeType: string
  ) => {
    try {
      setIsAnalyzing(true);
      setAnalysisError(null);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          filename,
          mimeType,
        }),
      });

      let payload: any;
      try {
        payload = await response.json();
      } catch (jsonErr) {
        throw new Error('Failed to parse diagnostic server response.');
      }

      if (!response.ok) {
        throw new Error(payload?.error || 'Server analysis pathway returned a clinical or network exception.');
      }
      
      if (payload.success && payload.data) {
        const payloadData = payload.data;
        setIsRealTimeAI(payload.mode === 'real-time-ai');

        const newIdSuffix = Math.floor(1000 + Math.random() * 9000);
        const newRecord: PatientRecord = {
          id: `PA-${newIdSuffix}`,
          patientName: `Case #${newIdSuffix}`, // Anonymous clinical nomenclature
          age: Math.floor(25 + Math.random() * 55),
          gender: Math.random() > 0.5 ? 'Male' : 'Female',
          analyzedAt: 'Just Now',
          timestamp: Date.now(),
          imageUrl: imageBase64,
          diagnosis: payloadData.diagnosis,
          confidence: payloadData.confidence,
          notes: payloadData.notes,
          symptoms: payloadData.symptoms || ['Cough', 'Fatigue'],
          heartRate: payloadData.heartRate || 76,
          oxygenSaturation: payloadData.oxygenSaturation || 97,
        };

        // Prepend new assessment to records lists
        setRecords((prev) => [newRecord, ...prev]);
        
        // Open report immediately to review
        setSelectedRecord(newRecord);
      }
    } catch (error: any) {
      console.error("Clinical image processing failed:", error);
      setAnalysisError(error.message || 'Error conducting image scans');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddPatientRecord = (newRec: PatientRecord) => {
    setRecords((prev) => [newRec, ...prev]);
  };

  const handleDeletePatientRecord = (id: string) => {
    if (confirm(`Confirm permanent removal of patient scan record #${id}?`)) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord(null);
      }
    }
  };

  // Perform searching when clinician presses Enter in the header search input
  const handleHeaderSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && globalSearch.trim()) {
      // Look for a matching patient block
      const term = globalSearch.trim().toLowerCase();
      const match = records.find(
        (r) => r.id.toLowerCase().includes(term) || (r.patientName && r.patientName.toLowerCase().includes(term))
      );
      if (match) {
        setSelectedRecord(match);
        setGlobalSearch('');
      } else {
        alert(`No patient files matching search term "${globalSearch}" were resolved.`);
      }
    }
  };

  const handleNewAnalysisTrigger = () => {
    setActiveTab('dashboard');
    // Scroll smoothly to diagnostic uploader zone
    const dropZone = document.getElementById('drop-zone-top');
    if (dropZone) {
      dropZone.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowHelp = () => {
    alert("PulmoAI Radiological Assistant \n\n1. Use the main Dashboard to drag/drop or select DICOM or JPEG lung images. \n2. Alternatively, test the analytical pipeline by clicking one of the sample presets. \n3. Dynamic analysis uses a server-side Gemini 3.5-flash model when an API key is configured. \n4. Explore records database to manage demographics, view trends, or print out physical clinical reports.");
  };

  const handleLogout = () => {
    if (confirm("Sign out from PulmoAI secure workspace?")) {
      alert("Clinician successfully authorized out of the diagnostic frame.");
    }
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'records':
        return (
          <PatientRecordsView
            records={records}
            onSelectRecord={setSelectedRecord}
            onAddRecord={handleAddPatientRecord}
            onDeleteRecord={handleDeletePatientRecord}
          />
        );
      case 'analytics':
        return <AnalyticsView records={records} />;
      case 'settings':
        return (
          <SettingsView
            doctorName={doctorName}
            setDoctorName={setDoctorName}
            doctorDept={doctorDept}
            setDoctorDept={setDoctorDept}
            isRealTimeAI={isRealTimeAI}
          />
        );
      case 'dashboard':
      default:
        return (
          <div className="space-y-8">
            {/* Top diagnostic dashboard area - Upload & stats widgets split */}
            <section id="drop-zone-top" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <UploadZone
                  onAnalyzeImage={handleAnalyzeImage}
                  isAnalyzing={isAnalyzing}
                  onShowRecentClick={() => {
                    const el = document.getElementById('recent-analyses-title');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
              <div className="lg:col-span-1">
                <StatsWidget
                  records={records}
                  onViewReportClick={() => setActiveTab('analytics')}
                />
              </div>
            </section>

            {/* Past cases segment */}
            <div id="recent-analyses-title" className="border-t border-[#eceef0] dark:border-[#1e293b] pt-8">
              <RecentAnalyses
                records={records}
                onSelectRecord={setSelectedRecord}
                onDeleteRecord={handleDeletePatientRecord}
              />
            </div>
          </div>
        );
    }
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'records':
        return 'Patient Records';
      case 'analytics':
        return 'Analytics Center';
      case 'settings':
        return 'Settings';
      case 'dashboard':
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] dark:bg-[#020617] text-[#191c1e] dark:text-slate-100 transition-colors duration-300">
      
      {/* Sidebar - Positioned fixed */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewAnalysisClick={handleNewAnalysisTrigger}
        onShowHelpClick={handleShowHelp}
        onLogoutClick={handleLogout}
      />

      {/* Main workspace container wrapper */}
      <div className="ml-64 flex flex-col min-h-screen">
        
        {/* Top App Header */}
        <header className="flex justify-between items-center w-full px-8 py-4 bg-white dark:bg-[#0f172a] border-b border-[#eceef0] dark:border-[#1e293b] sticky top-0 z-40 transition-colors duration-300 shadow-xs">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-[#131b2e] dark:text-white tracking-tight">
              {getSectionTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Input Filter bar */}
            <div className="relative hidden md:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search patient ID (Press Enter)..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                onKeyDown={handleHeaderSearchKeyDown}
                className="pl-9 pr-4 py-2 bg-[#f2f4f6] dark:bg-[#1e293b] border-none rounded-xl text-xs w-64 text-[#191c1e] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#006a61] placeholder-slate-400 font-semibold"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] hover:bg-slate-100 dark:hover:bg-slate-800 text-[#45464d] dark:text-[#94a3b8] transition-colors cursor-pointer border border-[#eceef0]/30 dark:border-slate-800"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Notification icon */}
              <button className="p-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] hover:bg-slate-100 dark:hover:bg-slate-800 text-[#45464d] dark:text-[#94a3b8] transition-colors relative cursor-pointer border border-[#eceef0]/30 dark:border-slate-800">
                <Bell size={16} />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
              </button>

              {/* Clinic Physician profile card display (dynamically formatted for user context) */}
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="hidden lg:block text-right">
                  <span className="text-xs font-bold text-[#1a202c] dark:text-slate-100 block">
                    {doctorName}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
                    {doctorDept}
                  </span>
                </div>
                <div className="h-9 w-9 rounded-full overflow-hidden border border-[#0d9488]/30 shrink-0">
                  <img
                    alt="Authorized Radiologist Clinician photograph"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWR0Al7SDwW_yMgBuoaGjFcvIcuPOFDNHD9SWi-n_zGHIlhRwJdE2B4AWI7LCxbrD7FgQGsZJSmeKL3lgVNiAh5Qcz-0P7EP2vFy5117MPdvXvsz9rJS7kCXHsgoy4gcocyVLABZjrU96U2E1CAnCwyppCGcvtT_UYeZCpTHu_wJwzcmzoXcdTdED9HOPdQ7l3AWxshM8WMvnF1PKl6Uz-DsU0_dUf6JFxZCzVk7CsbM6LbH2ZecF0QbmEvW6V1wClUciOz8UI60U"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Core application body container */}
        <main className="p-8 flex-1 max-w-[1440px] mx-auto w-full transition-all duration-300">
          {renderActiveContent()}
        </main>
      </div>

      {/* Case report details Modal */}
      <ReportModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />

      {/* Custom Image Validation Error Dialog */}
      {analysisError && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl w-full max-w-md shadow-2xl p-6 border border-[#eceef0] dark:border-[#1e293b]">
            <div className="flex items-center gap-3 mb-4 text-[#ba1a1a]">
              <div className="h-10 w-10 bg-red-50 dark:bg-red-950/40 rounded-xl flex items-center justify-center text-red-600">
                <ShieldAlert size={22} />
              </div>
              <h3 className="font-bold text-[#131b2e] dark:text-white text-base">Radiological Scan Error</h3>
            </div>
            <p className="text-xs text-[#45464d] dark:text-[#94a3b8] leading-relaxed mb-6">
              {analysisError}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setAnalysisError(null)}
                className="bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold py-2 px-5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
