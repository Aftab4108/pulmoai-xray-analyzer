import { useState } from 'react';
import { Search, Plus, Trash2, Eye, User, FileText, Calendar } from 'lucide-react';
import { PatientRecord, DiagnosisType } from '../types';

interface PatientRecordsViewProps {
  records: PatientRecord[];
  onSelectRecord: (record: PatientRecord) => void;
  onAddRecord: (newRecord: PatientRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export default function PatientRecordsView({
  records,
  onSelectRecord,
  onAddRecord,
  onDeleteRecord,
}: PatientRecordsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [newPatientId, setNewPatientId] = useState(() => `PA-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('35');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newDiagnosis, setNewDiagnosis] = useState<DiagnosisType>('Healthy / Normal');
  const [newConfidence, setNewConfidence] = useState('95');
  const [newSymptoms, setNewSymptoms] = useState('Cough, No active complaints');
  const [newHeartRate, setNewHeartRate] = useState('72');
  const [newSpO2, setNewSpO2] = useState('98');

  const genders = ['All', 'Male', 'Female', 'Other'];
  const diagnoses = ['All', 'Pneumonia', 'Tuberculosis', 'Lung Opacity', 'Healthy / Normal'];

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.patientName && r.patientName.toLowerCase().includes(searchTerm.toLowerCase()));
    const rGender = r.gender || 'Unknown';
    const matchesGender = selectedGender === 'All' || rGender === selectedGender;
    const matchesDiagnosis = selectedDiagnosis === 'All' || r.diagnosis === selectedDiagnosis;
    return matchesSearch && matchesGender && matchesDiagnosis;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const record: PatientRecord = {
      id: newPatientId,
      patientName: newName,
      age: parseInt(newAge) || 35,
      gender: newGender,
      analyzedAt: 'Just Now',
      timestamp: Date.now(),
      // Use standard default medical image matching the diagnosis
      imageUrl:
        newDiagnosis === 'Pneumonia'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoPDsUJZuI18XKNti5LxkSHAnuvpYWFLFL3puK859gRXFmDEXZCjkYhUmj4s3GMtqQxvhBcyY0p3tKyvr8ne7dC4WyD_nJ-zWNIJPHTHC8RbUtQH6VYjFRsGDIsTFMbNEb-QvPuqBXsesH1l13fXM0hDMv0E5Ggu6-Bgp5Lho2HS8JDuGwVi79qrvucFWnOy12aY0wbY4rWrYe50P8PHltla601F39OSvEI_VVmuF61sTKv79GFZIYnhiC0s4kxA8zqhMT191k-8o'
          : newDiagnosis === 'Tuberculosis'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQUkp_qkOFYHLZe2LF2d0OaCD7fvN9AAb2ytBhtZ_NiEiJDsrqX5K9aOEZhTB0ovcg8lOjbrLCJrzwZOMkos04IaLfrY9H3AN2kk6a9kn65UIeXxigfpE8VJLG6DWJLujlt6niw-ZqnE1hjSWHdQl0T182OtsgQO-IX95RFrsFMznk9DKLGvWO74r_6hnbmaHBpOVo4nXbGyZVojec-BYtXUw3pxyWfQbfItv1VjoNN-r1Gc2sV8F-FjAeFlNqG0EZSIrdhxu2hs0'
          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTI-q7PpD7ar1xRLsljM4zbEswBfy1_Sx5SUZnn2ax1wY7SGnAl8Oy5K7WSP2xLjEw34QCSHnTwm_cHhNFxsJL3pe1vIgEBIUAg_Y-uHInrd-znCiskzsFq6G2KRLPGFT_Hw3M5oghXpq8TBG4Mwh-SegaPClnl3vaYA6SQj2G9fnMLwIydAdERFmAlN2kY-ezbqgkRZZvDJOKERf36ivow5ofkBAj22FoUoqhOquAQwyVoT9vdtW8_gLGkE3UWm36fO0UBs1pzLo',
      diagnosis: newDiagnosis,
      confidence: parseInt(newConfidence) || 92,
      heartRate: parseInt(newHeartRate) || 72,
      oxygenSaturation: parseInt(newSpO2) || 98,
      symptoms: newSymptoms.split(',').map((s) => s.trim()),
      notes: `### Manual Care Report
**Authorized Logging Date:** ${new Date().toLocaleString()} | **Physiological Diagnosis:** ${newDiagnosis}
**AI Model Assessment Level:** ${newConfidence}% Confidence Index

#### Radiological Findings & Notes:
This record was loaded manually by of our active radiological department with a standard baseline template for ${newDiagnosis}. Lung volumes remain stable.

#### Symptoms Detailed:
${newSymptoms}

#### Clinical Recommendations:
- Follow standard clinical procedures based on ${newDiagnosis} indicators.
- Monitor vitals closely (SpO2 currently at ${newSpO2}%, HR at ${newHeartRate} bpm).`,
    };

    onAddRecord(record);
    setShowAddForm(false);
    
    // Reset Form
    setNewPatientId(`PA-${Math.floor(1000 + Math.random() * 9000)}`);
    setNewName('');
    setNewSymptoms('Cough, No active complaints');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#131b2e] dark:text-white tracking-tight">Patient Records Database</h2>
          <p className="text-xs text-[#45464d] dark:text-[#94a3b8] opacity-75">Clinical files and historical radiological reports</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#006a61] hover:bg-[#005049] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 self-start transition-all cursor-pointer shadow-sm"
        >
          <Plus size={16} />
          <span>{showAddForm ? 'Close Intake Form' : 'Manual Intake Log'}</span>
        </button>
      </div>

      {/* Intake form panel */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-dashed border-[#006a61]/30 dark:border-slate-800 space-y-4 animate-fadeIn"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">PATIENT ID</label>
              <input
                type="text"
                value={newPatientId}
                onChange={(e) => setNewPatientId(e.target.value)}
                required
                className="w-full bg-white dark:bg-[#0f172a] text-[#131b2e] dark:text-white border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">FULL NAME</label>
              <input
                type="text"
                placeholder="Enter patient name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full bg-white dark:bg-[#0f172a] text-[#131b2e] dark:text-white border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">AGE</label>
              <input
                type="number"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                required
                min="1"
                max="120"
                className="w-full bg-white dark:bg-[#0f172a] text-[#131b2e] dark:text-white border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">GENDER</label>
              <select
                value={newGender}
                onChange={(e) => setNewGender(e.target.value as any)}
                className="w-full bg-white dark:bg-[#0f172a] text-[#131b2e] dark:text-white border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">DIAGNOSIS CATEGORY</label>
              <select
                value={newDiagnosis}
                onChange={(e) => setNewDiagnosis(e.target.value as any)}
                className="w-full bg-white dark:bg-[#0f172a] text-[#131b2e] dark:text-white border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              >
                <option value="Healthy / Normal">Healthy / Normal</option>
                <option value="Pneumonia">Pneumonia</option>
                <option value="Tuberculosis">Tuberculosis</option>
                <option value="Lung Opacity">Lung Opacity</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">CONFIDENCE (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={newConfidence}
                onChange={(e) => setNewConfidence(e.target.value)}
                required
                className="w-full bg-white dark:bg-[#0f172a] text-[#131b2e] dark:text-white border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">HEART RATE (BPM)</label>
              <input
                type="number"
                min="40"
                max="180"
                value={newHeartRate}
                onChange={(e) => setNewHeartRate(e.target.value)}
                required
                className="w-full bg-white dark:bg-[#0f172a] text-[#131b2e] dark:text-white border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">OXYGEN LEVEL (SPO2 %)</label>
              <input
                type="number"
                min="50"
                max="100"
                value={newSpO2}
                onChange={(e) => setNewSpO2(e.target.value)}
                required
                className="w-full bg-white dark:bg-[#0f172a] text-[#131b2e] dark:text-white border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">SYMPTOMS (COMMA-SEPARATED)</label>
            <input
              type="text"
              placeholder="e.g. Sharp pain, Wet cough, Chills"
              value={newSymptoms}
              onChange={(e) => setNewSymptoms(e.target.value)}
              className="w-full bg-white dark:bg-[#0f172a] text-[#131b2e] dark:text-white border border-[#c6c6cd] dark:border-slate-800 rounded-xl p-2.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-transparent hover:bg-slate-200 dark:hover:bg-slate-800 text-[#45464d] dark:text-[#94a3b8] font-bold text-xs py-2 px-4 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#006a61] hover:bg-[#005049] text-white font-bold text-xs py-2 px-5 rounded-xl cursor-pointer shadow-xs"
            >
              Log Intake Record
            </button>
          </div>
        </form>
      )}

      {/* Filters Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-[#eceef0] dark:border-[#1e293b]">
        {/* Text Search input */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search patient database by ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900/60 border border-[#c6c6cd] dark:border-slate-800 text-xs rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#006a61]"
          />
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Gender:</span>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="p-2 border border-[#c6c6cd] dark:border-slate-800 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-900"
            >
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Diagnosis:</span>
            <select
              value={selectedDiagnosis}
              onChange={(e) => setSelectedDiagnosis(e.target.value)}
              className="p-2 border border-[#c6c6cd] dark:border-slate-800 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-900"
            >
              {diagnoses.map((d) => (
                <option key={d} value={d}>
                  {d === 'Healthy / Normal' ? 'Normal' : d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Database Table layout */}
      <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-[#eceef0] dark:border-[#1e293b] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-[#eceef0] dark:border-[#1e293b] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Demographics</th>
                <th className="p-4">Patient ID</th>
                <th className="p-4 cursor-pointer">Age / sex</th>
                <th className="p-4">Clinical status</th>
                <th className="p-4">AI Index</th>
                <th className="p-4">vitals (SpO2 / HR)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0] dark:divide-[#1e293b]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#76777d] font-semibold">
                    No clinical records found matching filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const getDiagnosticsBadge = (diag: DiagnosisType) => {
                    switch (diag) {
                      case 'Pneumonia':
                        return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-950/20 dark:text-red-300';
                      case 'Tuberculosis':
                        return 'bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-950/20 dark:text-pink-300';
                      case 'Lung Opacity':
                        return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
                      case 'Healthy / Normal':
                      default:
                        return 'bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-950/20 dark:text-teal-300';
                    }
                  };

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-[#1e293b]/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#006a61]">
                            <User size={15} />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                              {r.patientName || 'Anonymous Clinical Case'}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Calendar size={11} /> {r.analyzedAt}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-[#006a61] select-all">#{r.id}</td>
                      <td className="p-4 font-semibold text-slate-600 dark:text-slate-300">
                        {r.age ? `${r.age} yrs` : 'N/A'} • {r.gender || 'Other'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold inline-block ${getDiagnosticsBadge(r.diagnosis)}`}>
                          {r.diagnosis}
                        </span>
                      </td>
                      <td className="p-4 font-black text-indigo-600 dark:text-cyan-400">{r.confidence}%</td>
                      <td className="p-4 font-medium text-slate-650">
                        <div className="flex items-center gap-2">
                          <span className={`${r.oxygenSaturation && r.oxygenSaturation < 95 ? 'text-amber-500 font-bold' : 'text-teal-600 dark:text-teal-400'}`}>
                            SpO2: {r.oxygenSaturation || '98'}%
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">|</span>
                          <span className="text-slate-500">
                            HR: {r.heartRate || '76'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onSelectRecord(r)}
                            className="p-1.5 hover:bg-[#006a61]/15 text-[#006a61] dark:text-[#86f2e4] rounded-lg transition-colors cursor-pointer"
                            title="Open review sheet"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => onDeleteRecord(r.id)}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                            title="Delete file permanently"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
