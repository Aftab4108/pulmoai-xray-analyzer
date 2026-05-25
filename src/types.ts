export type DiagnosisType = 'Pneumonia' | 'Tuberculosis' | 'Lung Opacity' | 'Healthy / Normal';

export interface PatientRecord {
  id: string; // e.g. "PA-8821"
  patientName: string; // e.g. "Anonymous Clinician"
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  analyzedAt: string; // e.g. "2h ago" or ISO string
  timestamp: number;
  imageUrl: string;
  diagnosis: DiagnosisType;
  confidence: number; // percentage, e.g. 98
  notes: string; // Detailed findings written by AI clinician
  symptoms?: string[];
  heartRate?: number;
  oxygenSaturation?: number; // e.g. 96
}

export interface DiseaseStat {
  name: DiagnosisType;
  percentage: number;
}
