import { PatientRecord } from './types';

export const INITIAL_PATIENT_RECORDS: PatientRecord[] = [
  {
    id: "PA-8821",
    patientName: "John Doe",
    age: 42,
    gender: "Male",
    analyzedAt: "2h ago",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoPDsUJZuI18XKNti5LxkSHAnuvpYWFLFL3puK859gRXFmDEXZCjkYhUmj4s3GMtqQxvhBcyY0p3tKyvr8ne7dC4WyD_nJ-zWNIJPHTHC8RbUtQH6VYjFRsGDIsTFMbNEb-QvPuqBXsesH1l13fXM0hDMv0E5Ggu6-Bgp5Lho2HS8JDuGwVi79qrvucFWnOy12aY0wbY4rWrYe50P8PHltla601F39OSvEI_VVmuF61sTKv79GFZIYnhiC0s4kxA8zqhMT191k-8o",
    diagnosis: "Pneumonia",
    confidence: 98,
    symptoms: ["High Fever", "Productive Cough", "Shortness of Breath", "Chest Pain"],
    heartRate: 110,
    oxygenSaturation: 91,
    notes: `### Clinical Analysis Report
**Patient ID:** PA-8821 | **Diagnostic Category:** Pneumonia Detected
**Confidence Index:** 98.2% AI Confidence

#### Radiological Findings:
1. **Lobar Consolidation:** Marked opacity in the right middle and lower lobes, indicating alveolar consolidation consistent with bacterial lobar pneumonia.
2. **Interstitial Infiltrates:** Diffuse patchy interstitial clouding noticed bilaterally.
3. **Pleural Reaction:** Minor fluid collection in the right costophrenic angle suggesting early pleural effusion response.
4. **Mediastinum:** Trachea is midline, hila are normal in size, and cardiac silhouette remains within acceptable anatomical limits.

#### AI Assessment & Insights:
The deep neural networks have highlighted key density concentrations in the right sub-pleural regions. High-contrast indicators point strongly towards streptococcus-induced acute pneumonia. Immediate fluid replacement, antibiotics initiation, and close monitoring of oxygen saturation levels are strongly suggested.

#### Clinical Recommendations:
- Empirical broad-spectrum antibiotic treatment (e.g., Amoxicillin-Clavulanate or Levofloxacin).
- Supplementary low-flow oxygen if SpO2 drops below 92%.
- Repeat single-view posterior-anterior (PA) chest radiograph in 48-72 hours to assess therapeutic progress.`
  },
  {
    id: "PA-7712",
    patientName: "Sarah Jenkins",
    age: 29,
    gender: "Female",
    analyzedAt: "5h ago",
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTI-q7PpD7ar1xRLsljM4zbEswBfy1_Sx5SUZnn2ax1wY7SGnAl8Oy5K7WSP2xLjEw34QCSHnTwm_cHhNFxsJL3pe1vIgEBIUAg_Y-uHInrd-znCiskzsFq6G2KRLPGFT_Hw3M5oghXpq8TBG4Mwh-SegaPClnl3vaYA6SQj2G9fnMLwIydAdERFmAlN2kY-ezbqgkRZZvDJOKERf36ivow5ofkBAj22FoUoqhOquAQwyVoT9vdtW8_gLGkE3UWm36fO0UBs1pzLo",
    diagnosis: "Healthy / Normal",
    confidence: 94,
    symptoms: ["Routine Physical Exam", "No cardiopulmonary complaints"],
    heartRate: 72,
    oxygenSaturation: 99,
    notes: `### Clinical Analysis Report
**Patient ID:** PA-7712 | **Diagnostic Category:** Clear / Normal Lung Scan
**Confidence Index:** 94.5% AI Confidence

#### Radiological Findings:
1. **Lung Fields:** Entirely clear bilaterally. No focal consolidated blocks, mass lesions, patchy opacities, or nodular configurations observed.
2. **Pleural Spaces:** Costophrenic and cardiophrenic angles are sharp and well-defined. No pleural thickenings or fluid accumulations detected.
3. **Hilar & Mediastinal Structures:** Symmetrical hilums. Normal mediastinal contour and caliber.
4. **Bony Thorax:** Normal rib Cage, clavicles, and thoracic spine alignment. Soft tissues are unremarkable.

#### AI Assessment & Insights:
The automated scan classifier confirms standard health indicators across all tested visual nodes. There are zero radiological indications of parenchymal lung disease, pleural anomalies, or active thoracic pathology.

#### Clinical Recommendations:
- Standard clinical follow-ups. No immediate active medical intervention requested.
- Maintain wellness routine.`
  },
  {
    id: "PA-9003",
    patientName: "Robert Vance",
    age: 56,
    gender: "Male",
    analyzedAt: "1d ago",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQUkp_qkOFYHLZe2LF2d0OaCD7fvN9AAb2ytBhtZ_NiEiJDsrqX5K9aOEZhTB0ovcg8lOjbrLCJrzwZOMkos04IaLfrY9H3AN2kk6a9kn65UIeXxigfpE8VJLG6DWJLujlt6niw-ZqnE1hjSWHdQl0T182OtsgQO-IX95RFrsFMznk9DKLGvWO74r_6hnbmaHBpOVo4nXbGyZVojec-BYtXUw3pxyWfQbfItv1VjoNN-r1Gc2sV8F-FjAeFlNqG0EZSIrdhxu2hs0",
    diagnosis: "Tuberculosis",
    confidence: 87,
    symptoms: ["Chronic Cough (> 3 weeks)", "Night Sweats", "Hemoptysis", "Weight Loss"],
    heartRate: 94,
    oxygenSaturation: 94,
    notes: `### Clinical Analysis Report
**Patient ID:** PA-9003 | **Diagnostic Category:** Suspected Tuberculosis
**Confidence Index:** 87.0% AI Confidence

#### Radiological Findings:
1. **Cavitary Lesions:** Evident cavitary structures in the left lung apex measuring roughly 2.4 cm, heavily correlated with mycobacterium-induced necrosis.
2. **Fibronodular Infiltrates:** Sizable nodular thickening and fibrous strands in upper lung zones bilateral.
3. **Lymphadenopathy:** Symmetrical widening of the hilum consistent with reactive mediastinal lymph node enlargement.
4. **Pleural Membrane:** Mild localized thickening of the apical pleura.

#### AI Assessment & Insights:
Diagnostic overlays have triggered elevated alerts in apical zones. The distribution pattern (focused apically with thin-walled cavity formation) remains classic for active Post-Primary Pulmonary Tuberculosis. Isolation protocols and direct clinical confirmation are strongly recommended.

#### Clinical Recommendations:
- Arrange immediate sputum collection for Acid-Fast Bacilli (AFB) smear, Culture, and GeneXpert PCR analysis.
- Place patient in a negative-pressure infection isolation room to avoid nosocomial transmission.
- Report case to public epidemiologic nodes if laboratory confirmation returns positive.
- Initiate standard Rifampin, Isoniazid, Pyrazinamide, and Ethambutol (RIPE) therapy regimen pending microbiologic outcomes.`
  }
];
