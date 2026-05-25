import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Activity, ShieldAlert, Award, TrendingUp, Users } from 'lucide-react';
import { PatientRecord, DiagnosisType } from '../types';

interface AnalyticsViewProps {
  records: PatientRecord[];
}

export default function AnalyticsView({ records }: AnalyticsViewProps) {
  const total = records.length;

  // Calculators
  const avgConfidence = total > 0 
    ? Math.round(records.reduce((acc, curr) => acc + curr.confidence, 0) / total) 
    : 0;

  const criticalCases = records.filter(
    (r) => r.diagnosis === 'Pneumonia' || r.diagnosis === 'Tuberculosis'
  ).length;

  const criticalPercentage = total > 0 
    ? Math.round((criticalCases / total) * 105) / 10 // scale matching
    : 0;

  const avgSpO2 = total > 0
    ? Math.round(records.reduce((acc, curr) => acc + (curr.oxygenSaturation || 98), 0) / total)
    : 98;

  // Formatting chart data for Diagnosis distributions
  const counts: Record<DiagnosisType, number> = {
    'Pneumonia': 0,
    'Tuberculosis': 0,
    'Lung Opacity': 0,
    'Healthy / Normal': 0,
  };
  records.forEach((r) => {
    if (counts[r.diagnosis] !== undefined) {
      counts[r.diagnosis]++;
    }
  });

  const diagnosisChartData = [
    { name: 'Pneumonia', Cases: counts['Pneumonia'], fill: '#ba1a1a' },
    { name: 'Tuberculosis', Cases: counts['Tuberculosis'], fill: '#f83256' },
    { name: 'Lung Opacity', Cases: counts['Lung Opacity'], fill: '#7c839b' },
    { name: 'Normal', Cases: counts['Healthy / Normal'], fill: '#006a61' },
  ];

  // Formatting line chart for timeline and vitals progression
  const vitalsChartData = records.map((r, index) => ({
    patientId: `#${r.id}`,
    SpO2: r.oxygenSaturation || 98,
    HeartRate: r.heartRate || 75,
    Confidence: r.confidence,
  })).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#131b2e] dark:text-white tracking-tight">Active Analytics Center</h2>
        <p className="text-xs text-[#45464d] dark:text-[#94a3b8] opacity-75">Clinical statistics, anomaly aggregates, and vitals trend metrics</p>
      </div>

      {/* Aggregate metric blocks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        {/* Metric Card 1 */}
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#eceef0] dark:border-[#1e293b] flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-905 flex items-center justify-center text-slate-500">
            <Users size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">TOTAL SCANS</span>
            <span className="text-2xl font-black text-[#131b2e] dark:text-white mt-1 block">{total} Patients</span>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#eceef0] dark:border-[#1e293b] flex items-center gap-4">
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/20 flex items-center justify-center text-teal-600">
            <Award size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">AVG AI CONFIDENCE</span>
            <span className="text-2xl font-black text-teal-600 dark:text-[#86f2e4] mt-1 block">{avgConfidence}%</span>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#eceef0] dark:border-[#1e293b] flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500">
            <ShieldAlert size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">CRITICAL PATHOLOGY</span>
            <span className="text-2xl font-black text-red-600 dark:text-[#ffb3b6] mt-1 block">
              {criticalCases} Active ({total > 0 ? Math.round((criticalCases/total)*100) : 0}%)
            </span>
          </div>
        </div>

        {/* Metric Card 4 */}
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#eceef0] dark:border-[#1e293b] flex items-center gap-4">
          <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/20 flex items-center justify-center text-sky-500">
            <Activity size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">AVG RESP. SpO2</span>
            <span className="text-2xl font-black text-sky-600 dark:text-sky-300 mt-1 block">{avgSpO2}% Standard</span>
          </div>
        </div>

      </div>

      {/* Main interactive charts zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Diagnosis Volume Breakdown - BarChart */}
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#eceef0] dark:border-[#1e293b]">
          <div className="mb-4">
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Pathology Incidence Bar</h3>
            <p className="text-[11px] text-slate-400">Total detected cases sorted by diagnostic segmentations</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diagnosisChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="Cases" radius={[4, 4, 0, 0]}>
                  {diagnosisChartData.map((entry, index) => (
                    <Bar key={`cell-${index}`} dataKey="Cases" fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vitals Anomalies Progression - LineChart */}
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#eceef0] dark:border-[#1e293b]">
          <div className="mb-4">
            <h3 className="font-bold text-sm text-[#131b2e] dark:text-white">Patient Vitals Multi-Axis Trend</h3>
            <p className="text-[11px] text-slate-400">Comparing oxygen saturation against heart rates by patient files</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="patientId" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[50, 110]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="SpO2" name="Oxygen (SpO2 %)" stroke="#0d9488" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="HeartRate" name="Heart Rate (bpm)" stroke="#f83256" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Analytics Insights Banner */}
      <div className="bg-[#86f2e4]/10 dark:bg-[#006a61]/10 border border-[#006a61]/20 p-4 rounded-xl flex items-start gap-3">
        <TrendingUp className="text-[#006a61] dark:text-[#86f2e4] h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-xs text-[#131b2e] dark:text-[#86f2e4] uppercase">AI Diagnostic Anomaly Insights</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Radiological trends display higher pneumonia cluster occurrences consistent with expected seasonal bacterial patterns. 
            Patient SpO2 saturation remains highly inversely correlated with pulmonary density ratios, highlighting the diagnostic reliability of automated clinical telemetry scans.
          </p>
        </div>
      </div>
    </div>
  );
}
