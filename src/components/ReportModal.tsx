import Markdown from 'react-markdown';
import { X, Heart, Wind, Calendar, Award, User, Printer, ShieldAlert } from 'lucide-react';
import { PatientRecord } from '../types';

interface ReportModalProps {
  record: PatientRecord | null;
  onClose: () => void;
}

export default function ReportModal({ record, onClose }: ReportModalProps) {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  const getOverlayColor = (diagnosis: string) => {
    switch (diagnosis) {
      case 'Pneumonia':
        return 'border-l-4 border-red-500';
      case 'Tuberculosis':
        return 'border-l-4 border-pink-500';
      case 'Lung Opacity':
        return 'border-l-4 border-slate-500';
      case 'Healthy / Normal':
      default:
        return 'border-l-4 border-teal-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-all overflow-y-auto">
      <div 
        id="report-modal-container"
        className="bg-white dark:bg-[#0f172a] rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#eceef0] dark:border-[#1e293b]"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#eceef0] dark:border-[#1e293b] bg-slate-50 dark:bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#006a61]/10 rounded-xl flex items-center justify-center text-[#006a61] dark:text-[#86f2e4]">
              <Award size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#131b2e] dark:text-white">Patient Diagnostic Review</h3>
              <p className="text-xs text-slate-500">Record ID: #{record.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all font-bold text-xs flex items-center gap-1.5 cursor-pointer bg-white dark:bg-[#0000] hover:bg-slate-50"
            >
              <Printer size={15} />
              <span className="hidden sm:inline">Print Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 px-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Info Grid - Patient Profile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Core Patient Metadata */}
            <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 relative flex flex-col justify-between ${getOverlayColor(record.diagnosis)}`}>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PATIENT INFORMATION</span>
                <div className="flex items-center gap-2 mt-1">
                  <User size={16} className="text-[#006a61]" />
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{record.patientName || "Anonymous Patient"}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs mt-3 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[9px]">AGE</span>
                    <span className="font-bold text-[#131b2e] dark:text-slate-200">{record.age || "N/A"} Years</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">GENDER</span>
                    <span className="font-bold text-[#131b2e] dark:text-slate-200">{record.gender || "N/A"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-800 pt-2">
                <Calendar size={12} />
                <span>Analyzed: {record.analyzedAt}</span>
              </div>
            </div>

            {/* Column 2: Vitals / Biometrics */}
            <div className="grid grid-cols-2 gap-4">
              {/* Vital SpO2 */}
              <div className="p-4 rounded-xl bg-teal-50/40 dark:bg-teal-950/15 border border-teal-100/40 dark:border-teal-950/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-teal-600 dark:text-[#86f2e4]">
                    <span className="text-[10px] font-bold uppercase tracking-wider">OXYGEN SAT.</span>
                    <Wind size={15} />
                  </div>
                  <span className="text-2xl font-black text-teal-700 dark:text-[#86f2e4] mt-2 block">
                    {record.oxygenSaturation ? `${record.oxygenSaturation}%` : "98%"}
                  </span>
                </div>
                <span className="text-[9px] text-teal-500/70 dark:text-teal-400 font-bold block mt-2 border-t border-teal-100/30 pt-1.5">
                  SpO2 Level {record.oxygenSaturation && record.oxygenSaturation < 95 ? "⚠️ Borderline Low" : "✓ Normal Saturated"}
                </span>
              </div>

              {/* Vital HeartRate */}
              <div className="p-4 rounded-xl bg-red-50/40 dark:bg-red-950/10 border border-red-100/40 dark:border-red-950/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-red-500 dark:text-[#ffb3b6]">
                    <span className="text-[10px] font-bold uppercase tracking-wider">HEART RATE</span>
                    <Heart size={15} />
                  </div>
                  <span className="text-2xl font-black text-red-600 dark:text-[#ffb3b6] mt-2 block">
                    {record.heartRate ? `${record.heartRate} bpm` : "82 bpm"}
                  </span>
                </div>
                <span className="text-[9px] text-red-500/70 dark:text-red-400 font-bold block mt-2 border-t border-red-100/30 pt-1.5">
                  Pulse Frequency {record.heartRate && record.heartRate > 100 ? "⚠️ Elevated Tach" : "✓ Standard Rhythm"}
                </span>
              </div>
            </div>

            {/* Column 3: Diagnosis Metric */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DIAGNOSTIC VERDICT</span>
                <span className="h-2 w-2 rounded-full inline-block bg-current ml-2 animate-pulse text-[#006a61]"></span>
                
                <h4 className="text-base font-black text-slate-800 dark:text-white mt-1.5">
                  {record.diagnosis === 'Healthy / Normal' ? 'Clear / Normal' : record.diagnosis}
                </h4>
                <div className="flex items-center gap-1.5 mt-2 bg-indigo-50/30 dark:bg-slate-900 border border-indigo-100/30 dark:border-slate-800 rounded-lg p-2">
                  <span className="text-[10px] font-bold text-indigo-500">AI CONFIDENCE INDEX:</span>
                  <span className="text-xs font-black text-[#006a61] dark:text-[#86f2e4]">{record.confidence}%</span>
                </div>
              </div>
              {record.symptoms && record.symptoms.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {record.symptoms.slice(0, 3).map((sym) => (
                    <span key={sym} className="text-[9px] bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold px-1.5 py-0.5 rounded">
                      {sym}
                    </span>
                  ))}
                  {record.symptoms.length > 3 && (
                    <span className="text-[9px] text-slate-400">+{record.symptoms.length - 3}</span>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Diagnostic Image Display and Report notes Layout Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Diagnostic Image Projection - 4 Cols */}
            <div className="md:col-span-5 bg-black rounded-xl overflow-hidden relative shadow-inner aspect-square flex flex-col justify-center">
              <img src={record.imageUrl} alt="Chest Scan X-ray" className="max-h-full max-w-full object-contain mx-auto" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-white text-center">
                <span className="text-[10px] font-semibold text-slate-400">THORACIC COMPRESSION SCAN VIEW</span>
              </div>
            </div>

            {/* Markdown diagnostic text - 7 Cols */}
            <div className="md:col-span-7 bg-slate-50/50 dark:bg-[#111827]/40 p-5 rounded-xl border border-slate-100 dark:border-slate-800 text-sm overflow-y-auto">
              {/* Embedded Markdown Area */}
              <div className="markdown-body dark:prose-invert prose prose-slate max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
                <Markdown>{record.notes}</Markdown>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 italic flex items-center gap-1.5">
                <ShieldAlert size={12} className="text-amber-500" />
                <span>Generated by diagnostic engine model gemini-3.5-flash. Verify clinically before patient release.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#eceef0] dark:border-[#1e293b] flex justify-end gap-2 shrink-0 bg-slate-50 dark:bg-slate-900/40">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#131b2e] dark:bg-[#006a61] hover:bg-[#1e293b] dark:hover:bg-[#005049] text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
