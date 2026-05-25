import { MoreVertical, ArrowRight } from 'lucide-react';
import { PatientRecord, DiagnosisType } from '../types';

interface StatsWidgetProps {
  records: PatientRecord[];
  onViewReportClick: () => void;
}

export default function StatsWidget({ records, onViewReportClick }: StatsWidgetProps) {
  // Dynamically calculate diagnosis distributions based on the loaded patient set
  const total = records.length;
  
  const counts: Record<DiagnosisType, number> = {
    'Pneumonia': 0,
    'Tuberculosis': 0,
    'Lung Opacity': 0,
    'Healthy / Normal': 0,
  };

  records.forEach((r) => {
    if (counts[r.diagnosis] !== undefined) {
      counts[r.diagnosis]++;
    } else {
      counts['Healthy / Normal']++;
    }
  });

  const getPercentage = (count: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const statItems = [
    {
      name: 'Pneumonia' as DiagnosisType,
      percentage: getPercentage(counts['Pneumonia']),
      colorClass: 'text-[#006a61] dark:text-[#86f2e4]',
      bgClass: 'bg-[#006a61] dark:bg-[#86f2e4]',
    },
    {
      name: 'Tuberculosis' as DiagnosisType,
      percentage: getPercentage(counts['Tuberculosis']),
      colorClass: 'text-[#f83256] dark:text-[#ffb3b6]',
      bgClass: 'bg-[#f83256] dark:bg-[#ffb3b6]',
    },
    {
      name: 'Lung Opacity' as DiagnosisType,
      percentage: getPercentage(counts['Lung Opacity']),
      colorClass: 'text-[#7c839b] dark:text-[#bec6e0]',
      bgClass: 'bg-[#7c839b] dark:bg-[#bec6e0]',
    },
    {
      name: 'Healthy / Normal' as DiagnosisType,
      percentage: getPercentage(counts['Healthy / Normal']),
      colorClass: 'text-[#0d9488] dark:text-[#6bd8cb]',
      bgClass: 'bg-[#0d9488] dark:bg-[#6bd8cb]',
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col h-full bg-white dark:bg-[#0f172a] border border-[#eceef0] dark:border-[#1e293b] shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg text-[#131b2e] dark:text-white tracking-tight">Disease Statistics</h3>
          <p className="text-xs text-[#45464d] dark:text-[#94a3b8] opacity-75">Relative diagnosis distribution</p>
        </div>
        <button className="p-1 rounded-lg hover:bg-[#f2f4f6] dark:hover:bg-[#1e293b] text-[#45464d] dark:text-[#94a3b8] transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-5">
        {statItems.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#131b2e] dark:text-[#e2e8f0]">{item.name}</span>
              <span className={`${item.colorClass} font-bold`}>{item.percentage}%</span>
            </div>
            <div className="w-full bg-[#f2f4f6] dark:bg-[#1e293b] rounded-full h-2 overflow-hidden">
              <div
                className={`${item.bgClass} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onViewReportClick}
        className="mt-6 text-xs font-bold text-[#006a61] dark:text-[#86f2e4] flex items-center gap-1 hover:underline group self-start transition-all"
      >
        <span>View Detailed Report</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
