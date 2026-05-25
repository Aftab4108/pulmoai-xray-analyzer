import { useState } from 'react';
import { ExternalLink, Filter, Grid, List, Search, Trash2 } from 'lucide-react';
import { PatientRecord, DiagnosisType } from '../types';

interface RecentAnalysesProps {
  records: PatientRecord[];
  onSelectRecord: (record: PatientRecord) => void;
  onDeleteRecord?: (id: string) => void;
}

export default function RecentAnalyses({ records, onSelectRecord, onDeleteRecord }: RecentAnalysesProps) {
  const [filterType, setFilterType] = useState<DiagnosisType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListView, setIsListView] = useState(false);

  const filteredRecords = records.filter((r) => {
    const matchesFilter = filterType === 'All' || r.diagnosis === filterType;
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.patientName && r.patientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSeverityStyles = (diagnosis: DiagnosisType) => {
    switch (diagnosis) {
      case 'Pneumonia':
        return {
          bgBadge: 'bg-[#ba1a1a] text-white',
          bgContainer: 'bg-[#ffdad6]/40 dark:bg-red-950/20 border-[#ba1a1a]/20',
          textClass: 'text-[#ba1a1a] dark:text-[#ffb3b6]',
          label: 'Pneumonia Detected',
        };
      case 'Tuberculosis':
        return {
          bgBadge: 'bg-[#f83256] text-white',
          bgContainer: 'bg-[#ffdada]/30 dark:bg-pink-950/20 border-[#f83256]/20',
          textClass: 'text-[#f83256] dark:text-[#ffb3b6]',
          label: 'Suspected Tuberculosis',
        };
      case 'Lung Opacity':
        return {
          bgBadge: 'bg-[#565e74] text-white',
          bgContainer: 'bg-[#dae2fd]/30 dark:bg-slate-900/40 border-[#7c839b]/20',
          textClass: 'text-[#3f465c] dark:text-[#bec6e0]',
          label: 'Lung Opacity Identified',
        };
      case 'Healthy / Normal':
      default:
        return {
          bgBadge: 'bg-[#006a61] text-white',
          bgContainer: 'bg-[#86f2e4]/15 dark:bg-teal-950/25 border-[#006a61]/20',
          textClass: 'text-[#006a61] dark:text-[#86f2e4]',
          label: 'Clear / Normal',
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="font-bold text-lg text-[#131b2e] dark:text-white tracking-tight">Recent Analyses</h3>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Filter Pill Selectors */}
          <div className="flex bg-[#f2f4f6] dark:bg-[#1e293b] rounded-lg p-1 text-xs">
            {(['All', 'Pneumonia', 'Tuberculosis', 'Lung Opacity', 'Healthy / Normal'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  filterType === type
                    ? 'bg-white dark:bg-[#0f172a] text-[#006a61] dark:text-cyan-400 shadow-xs'
                    : 'text-[#45464d] dark:text-[#94a3b8] hover:text-[#131b2e] dark:hover:text-white'
                }`}
              >
                {type === 'Healthy / Normal' ? 'Normal' : type}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setIsListView(false)}
              className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                !isListView
                  ? 'border-[#006a61] text-[#006a61] bg-teal-50/40 dark:bg-teal-950/20'
                  : 'border-[#c6c6cd] dark:border-slate-850 text-slate-500 hover:bg-slate-50 dark:hover:bg-[#1e293b]'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setIsListView(true)}
              className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                isListView
                  ? 'border-[#006a61] text-[#006a61] bg-teal-50/40 dark:bg-teal-950/20'
                  : 'border-[#c6c6cd] dark:border-slate-850 text-slate-500 hover:bg-slate-50 dark:hover:bg-[#1e293b]'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Internal Text Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d]">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search by Patient ID, Name, or diagnosis findings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#0f172a] border border-[#c6c6cd] dark:border-[#1e293b] text-sm rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#006a61]"
        />
      </div>

      {filteredRecords.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center border border-dashed border-[#c6c6cd] dark:border-[#1e293b] text-[#76777d]">
          <p className="text-sm font-semibold">No recent patient records match your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('All');
            }}
            className="text-xs font-bold text-[#006a61] hover:underline mt-2"
          >
            Clear Search Filters
          </button>
        </div>
      ) : isListView ? (
        /* ListView Layout */
        <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-[#eceef0] dark:border-[#1e293b] overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-[#eceef0] dark:border-[#1e293b] text-slate-500 font-bold">
                <th className="p-4">SCAN</th>
                <th className="p-4">PATIENT ID</th>
                <th className="p-4">MEMBER</th>
                <th className="p-4">DIAGNOSIS</th>
                <th className="p-4">CONFIDENCE</th>
                <th className="p-4">DATE</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0] dark:divide-[#1e293b]">
              {filteredRecords.map((r) => {
                const style = getSeverityStyles(r.diagnosis);
                return (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-[#1e293b]/30 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="h-10 w-10 rounded overflow-hidden bg-black shrink-0 border border-slate-200 dark:border-slate-800">
                        <img src={r.imageUrl} alt={r.id} className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">#{r.id}</td>
                    <td className="p-4 font-semibold text-slate-600 dark:text-slate-300">{r.patientName || "Anonymous Patient"}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded border font-bold ${style.bgContainer} ${style.textClass}`}>
                        {style.label}
                      </span>
                    </td>
                    <td className="p-4 font-black text-[#006a61] dark:text-cyan-400">{r.confidence}%</td>
                    <td className="p-4 text-slate-500">{r.analyzedAt}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectRecord(r)}
                          className="p-1 px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-[#006a61] hover:text-white text-slate-600 dark:text-slate-300 rounded font-bold transition-all text-[11px] cursor-pointer"
                        >
                          View Report
                        </button>
                        {onDeleteRecord && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteRecord(r.id);
                            }}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                            title="Delete analysis record"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* GridView Layout exactly representing the mock screens */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRecords.map((r) => {
            const style = getSeverityStyles(r.diagnosis);
            return (
              <div
                key={r.id}
                role="button"
                onClick={() => onSelectRecord(r)}
                className="glass-card rounded-2xl overflow-hidden bg-white dark:bg-[#0f172a] border border-[#eceef0] dark:border-[#1e293b] group cursor-pointer hover:shadow-md transition-all duration-350"
              >
                <div className="relative h-48 bg-black overflow-hidden select-none">
                  <img
                    alt={`Chest X-ray photo of ${r.patientName}`}
                    src={r.imageUrl}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* Dynamic Confidence tag with styles depending on clinical severity */}
                  <div className={`absolute top-3 right-3 text-[10px] px-2 py-1 rounded-sm font-black ${style.bgBadge}`}>
                    {r.confidence}% CONFIDENCE
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-[#131b2e] dark:text-white">Patient #{r.id}</h4>
                      <p className="text-[10px] text-[#45464d] dark:text-[#94a3b8] mt-0.5">Analyzed: {r.analyzedAt}</p>
                    </div>
                    <span className="text-[#45464d] dark:text-[#94a3b8] hover:text-[#006a61] p-1 rounded-lg transition-colors">
                      <ExternalLink size={15} />
                    </span>
                  </div>

                  {/* Diagnosis tag block */}
                  <div className={`border p-2.5 rounded-xl flex items-center justify-between ${style.bgContainer}`}>
                    <span className={`font-bold text-xs ${style.textClass}`}>
                      {style.label}
                    </span>
                    {onDeleteRecord && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRecord(r.id);
                        }}
                        className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded text-[#76777d] hover:text-red-500 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                        title="Delete patient scan record"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
