import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, FileImage, ShieldAlert, CheckCircle, Activity, Play } from 'lucide-react';

interface UploadZoneProps {
  onAnalyzeImage: (imageBase64: string, filename: string, mimeType: string) => void;
  isAnalyzing: boolean;
  onShowRecentClick: () => void;
}

export default function UploadZone({ onAnalyzeImage, isAnalyzing, onShowRecentClick }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hotlink URLs from the user specification
  const samples = [
    {
      id: "Sample #PA-8821",
      label: "Pneumonia Scan",
      badge: "Pneumonia",
      badgeColor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoPDsUJZuI18XKNti5LxkSHAnuvpYWFLFL3puK859gRXFmDEXZCjkYhUmj4s3GMtqQxvhBcyY0p3tKyvr8ne7dC4WyD_nJ-zWNIJPHTHC8RbUtQH6VYjFRsGDIsTFMbNEb-QvPuqBXsesH1l13fXM0hDMv0E5Ggu6-Bgp5Lho2HS8JDuGwVi79qrvucFWnOy12aY0wbY4rWrYe50P8PHltla601F39OSvEI_VVmuF61sTKv79GFZIYnhiC0s4kxA8zqhMT191k-8o",
    },
    {
      id: "Sample #PA-7712",
      label: "Healthy Scan",
      badge: "Healthy / Normal",
      badgeColor: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border-teal-200",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTI-q7PpD7ar1xRLsljM4zbEswBfy1_Sx5SUZnn2ax1wY7SGnAl8Oy5K7WSP2xLjEw34QCSHnTwm_cHhNFxsJL3pe1vIgEBIUAg_Y-uHInrd-znCiskzsFq6G2KRLPGFT_Hw3M5oghXpq8TBG4Mwh-SegaPClnl3vaYA6SQj2G9fnMLwIydAdERFmAlN2kY-ezbqgkRZZvDJOKERf36ivow5ofkBAj22FoUoqhOquAQwyVoT9vdtW8_gLGkE3UWm36fO0UBs1pzLo",
    },
    {
      id: "Sample #PA-9003",
      label: "Tuberculosis CT",
      badge: "Tuberculosis",
      badgeColor: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border-pink-200",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQUkp_qkOFYHLZe2LF2d0OaCD7fvN9AAb2ytBhtZ_NiEiJDsrqX5K9aOEZhTB0ovcg8lOjbrLCJrzwZOMkos04IaLfrY9H3AN2kk6a9kn65UIeXxigfpE8VJLG6DWJLujlt6niw-ZqnE1hjSWHdQl0T182OtsgQO-IX95RFrsFMznk9DKLGvWO74r_6hnbmaHBpOVo4nXbGyZVojec-BYtXUw3pxyWfQbfItv1VjoNN-r1Gc2sV8F-FjAeFlNqG0EZSIrdhxu2hs0",
    }
  ];

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const browseFiles = () => {
    fileInputRef.current?.click();
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onAnalyzeImage(reader.result, file.name, file.type);
      }
    };
    reader.readAsDataURL(file);
  };

  // Turn image URLs to Base64 to analyze when they select standard samples
  const handleSampleClick = async (sample: typeof samples[0]) => {
    try {
      if (isAnalyzing) return;
      // Fetch the sample image and transform it into Base64 so it can go to Gemini backend
      const response = await fetch(sample.imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onAnalyzeImage(reader.result, `${sample.badge.toLowerCase()}_sample.jpg`, 'image/jpeg');
        }
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error("Failed to load sample scan binary, triggering simulation callback with parameters:", err);
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Box container */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`glass-card rounded-2xl p-6 border-2 border-dashed transition-all duration-300 min-h-[320px] text-center flex flex-col justify-center items-center relative ${
          isDragActive
            ? 'border-[#006a61] bg-[#86f2e4]/10 dark:bg-[#006a61]/10'
            : 'border-[#eceef0] dark:border-[#1e293b] hover:border-[#006a61] dark:hover:border-[#86f2e4]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isAnalyzing}
        />

        {isAnalyzing ? (
          <div className="space-y-4 animate-pulse">
            <div className="mx-auto h-16 w-16 bg-[#006a61]/15 rounded-full flex items-center justify-center">
              <Activity className="h-8 w-8 text-[#006a61] dark:text-[#86f2e4] animate-spin" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#131b2e] dark:text-white">Analyzing Lung Scan...</h3>
              <p className="text-xs text-[#45464d] dark:text-[#94a3b8] max-w-xs mx-auto mt-2">
                Scanning density levels, segmenting pleural structures, and executing clinical assessment models.
              </p>
            </div>
            <div className="h-2 w-48 bg-[#f2f4f6] dark:bg-[#1e293b] rounded-full mx-auto overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-[#006a61] to-[#6bd8cb] animate-[loading_1.5s_infinite] rounded-full"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-[#86f2e4]/15 p-5 rounded-full mb-4">
              <Upload className="h-10 w-10 text-[#006a61] dark:text-[#86f2e4]" />
            </div>
            <h3 className="font-bold text-lg text-[#131b2e] dark:text-white mb-1">Upload Lung Scans</h3>
            <p className="text-xs text-[#45464d] dark:text-[#94a3b8] max-w-sm mb-6 leading-relaxed">
              Drag and drop DICOM or JPEG lung images here for instant AI-assisted diagnostic analysis.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={browseFiles}
                className="bg-[#131b2e] dark:bg-white text-white dark:text-[#131b2e] font-bold text-xs py-2.5 px-6 rounded-xl hover:scale-95 transition-transform duration-200 cursor-pointer shadow-sm"
              >
                Browse Files
              </button>
              <button
                onClick={onShowRecentClick}
                className="border border-[#76777d]/30 dark:border-slate-700 bg-white/70 dark:bg-[#1e293b]/50 text-[#191c1e] dark:text-white font-bold text-xs py-2.5 px-5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Recent Uploads
              </button>
            </div>
          </>
        )}
      </div>

      {/* Recommended sample scans */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#45464d] dark:text-[#94a3b8]">Ready-to-Test Sample Scans</h4>
          <span className="text-[10px] bg-slate-100 text-[#45464d] dark:bg-[#1e293b] dark:text-[#94a3b8] px-2 py-0.5 rounded-full">1-Click Diagnostics</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {samples.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSampleClick(sample)}
              disabled={isAnalyzing}
              className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] hover:bg-[#f2f4f6] dark:hover:bg-[#1e293b] transition-all text-left group cursor-pointer"
            >
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-black shrink-0 relative">
                <img src={sample.imageUrl} alt={sample.label} className="h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                  <Play size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#131b2e] dark:text-white truncate">{sample.label}</p>
                <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded border mt-1 ${sample.badgeColor}`}>
                  {sample.badge}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
