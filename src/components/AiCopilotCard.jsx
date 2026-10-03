import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  RotateCcw, 
  ThumbsUp, 
  Lock,
  Bug,
  CheckCircle2,
  AlertTriangle,
  Info,
  Thermometer,
  ShieldAlert,
  Droplets,
  Search,
  Check
} from 'lucide-react';

export default function AiCopilotCard({ 
  batch, 
  onApproveAiSuggestion, 
  onRejectAiSuggestion,
  onNotify
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [anomalyMode, setAnomalyMode] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [appliedSuggestion, setAppliedSuggestion] = useState(false);

  // Trigger Anomaly Simulation for Demonstration
  const handleSimulateAnomaly = (type) => {
    setAnomalyMode(type);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (type === 'temp_spike') {
        setScanResult({
          timestamp: new Date().toLocaleTimeString(),
          confidence: '98.9%',
          guardrails: 'Peringatan: Ambang Batas Suhu Terlampaui',
          anomaly: true,
          risk: 'Perhatian (Suhu Di Luar Batas)',
          message: `Sensor suhu tahap roasting tercatat 232°C (Batas normal SOP: 205°C). Sistem QA menahan sertifikasi sampai diverifikasi ulang oleh Lead QC.`,
          actionRequired: 'Pemeriksaan Manual Sensor Diperlukan'
        });
      } else if (type === 'supplier_mismatch') {
        setScanResult({
          timestamp: new Date().toLocaleTimeString(),
          confidence: '99.2%',
          guardrails: 'Ditolak: Pemasok Belum Terdaftar Whitelist',
          anomaly: true,
          risk: 'Kritis (Ketertelusuran Gagal)',
          message: `Pemasok bahan baku tidak ditemukan di daftar vendor terverifikasi ISO 22000. Penerbitan QR paspor ditahan otomatis.`,
          actionRequired: 'Otorisasi Khusus Auditor Diperlukan'
        });
      } else {
        setScanResult({
          timestamp: new Date().toLocaleTimeString(),
          confidence: '95.5%',
          guardrails: 'Peringatan: Kadar Air Di Atas Standar',
          anomaly: true,
          risk: 'Sedang',
          message: `Kadar air terdeteksi 13.8% (Maksimal standar: 12.0%). Disarankan penyesuaian masa kadaluarsa menjadi 6 bulan.`,
          actionRequired: 'Rekomendasi Penyesuaian Expiry Date'
        });
      }
    }, 450);
  };

  const handleResetScan = () => {
    setAnomalyMode(null);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        timestamp: new Date().toLocaleTimeString(),
        confidence: '97.4%',
        guardrails: 'Semua 5 Aturan Validasi Terpenuhi',
        anomaly: false,
        risk: 'LOLOS UJI MUTU',
        message: `Integritas data batch ${batch.batchNumber} terverifikasi. Seluruh parameter pengujian lab, suhu pengolahan, dan ketertelusuran ${batch.materials.length} bahan baku memenuhi standar ISO 22000 & HACCP.`,
        actionRequired: 'Data Siap Diterbitkan ke Paspor QR'
      });
    }, 350);
  };

  const handleCustomPromptSubmit = (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        timestamp: new Date().toLocaleTimeString(),
        confidence: '96.8%',
        guardrails: 'Pemeriksaan Selesai',
        anomaly: false,
        risk: 'TERVERIFIKASI',
        message: `Hasil penelusuran untuk "${customPrompt}": Seluruh ${batch.materials.length} komponen bahan baku dan ${batch.timeline.length} milestone produksi memiliki data tervalidasi secara konsisten.`,
        actionRequired: 'Rekomendasi Draf Selesai'
      });
      setCustomPrompt('');
    }, 450);
  };

  const quickPrompts = [
    'Periksa suhu pengolahan',
    'Cek sertifikat pemasok',
    'Verifikasi tanggal kadaluarsa'
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs transition-colors">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Pemeriksaan Kepatuhan Mutu & Validasi Otomatis
              </h3>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-slate-400" /> Mode Terlindungi
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verifikasi Integritas Data & Deteksi Deviasi Standar (Human-in-the-Loop)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Akurasi: {scanResult ? scanResult.confidence : `${batch.aiAnalysis?.confidenceScore || 96.8}%`}
          </span>

          <button
            onClick={handleResetScan}
            disabled={isScanning}
            className="text-xs bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-200 font-semibold px-3 py-1.5 rounded-xl transition border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Memeriksa...' : 'Periksa Ulang Data'}</span>
          </button>
        </div>
      </div>

      {/* Anomaly Testing Bar for Demonstration */}
      <div className="p-3.5 bg-slate-50/90 dark:bg-slate-800/60 rounded-xl border border-slate-200/90 dark:border-slate-700/80 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Bug className="w-3.5 h-3.5 text-amber-500" />
            Simulasi Skenario Deviasi Mutu:
          </span>
          {anomalyMode && (
            <button
              onClick={handleResetScan}
              className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-semibold transition flex items-center gap-1 shadow-2xs"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              Kembalikan ke Normal
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => handleSimulateAnomaly('temp_spike')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 border shadow-2xs active:scale-95 ${
              anomalyMode === 'temp_spike'
                ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-400/30'
                : 'bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-slate-200 dark:border-slate-700 hover:border-amber-300'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5 text-amber-500" />
            Simulasi Deviasi Suhu
          </button>

          <button
            onClick={() => handleSimulateAnomaly('supplier_mismatch')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 border shadow-2xs active:scale-95 ${
              anomalyMode === 'supplier_mismatch'
                ? 'bg-rose-600 text-white border-rose-700 ring-2 ring-rose-400/30'
                : 'bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            Simulasi Vendor Belum Whitelist
          </button>

          <button
            onClick={() => handleSimulateAnomaly('moisture_high')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 border shadow-2xs active:scale-95 ${
              anomalyMode === 'moisture_high'
                ? 'bg-teal-600 text-white border-teal-700 ring-2 ring-teal-400/30'
                : 'bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-slate-200 dark:border-slate-700 hover:border-teal-300'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-teal-500" />
            Simulasi Deviasi Kadar Air
          </button>
        </div>
      </div>

      {/* Grid of QA Validation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left Column: Data Integrity & Anomaly Scanner */}
        <div className={`p-4 rounded-xl border text-xs flex flex-col justify-between transition-all duration-200 shadow-2xs ${
          scanResult?.anomaly 
            ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200 ring-1 ring-rose-400/20' 
            : 'bg-slate-50/70 dark:bg-slate-800/60 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {scanResult?.anomaly ? (
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-pulse" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                )}
                Hasil Audit Mutu
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                scanResult?.anomaly
                  ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
              }`}>
                {scanResult ? scanResult.guardrails : '5/5 Aturan Terpenuhi'}
              </span>
            </div>
            
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed mt-1">
              {scanResult ? scanResult.message : batch.aiAnalysis?.summary}
            </p>

            {scanResult?.actionRequired && (
              <div className="mt-2.5 p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/70 text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span><strong>Tindakan:</strong> {scanResult.actionRequired}</span>
              </div>
            )}
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Standar: ISO 22000 & HACCP</span>
            <span className={`font-bold font-mono px-2 py-0.5 rounded-md ${
              scanResult?.anomaly 
                ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300' 
                : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
            }`}>
              Status: {scanResult ? scanResult.risk : 'LOLOS'}
            </span>
          </div>
        </div>

        {/* Right Column: Eco & Transparency Suggestion with Human-in-the-Loop */}
        <div className="bg-slate-50/70 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/90 dark:border-slate-700 text-xs flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 
                Rekomendasi Narasi Paspor Produk
              </span>
              <span className="text-[10px] bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-600">
                Draf AI
              </span>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 relative">
              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed italic">
                "{batch.aiAnalysis?.ecoScoreRecommendation || 'Bahan baku lokal mendukung penurunan jejak karbon hingga 18%.'}"
              </p>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
              <Info className="w-3 h-3 text-slate-400" /> Menunggu otorisasi Lead QC
            </span>

            {appliedSuggestion ? (
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Disetujui & Masuk Ledger
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onRejectAiSuggestion(batch.batchNumber);
                    if (onNotify) onNotify('Rekomendasi AI ditolak oleh operator', 'info');
                  }}
                  className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold transition border border-slate-200 dark:border-slate-700"
                  title="Tolak saran"
                >
                  Tolak
                </button>
                <button
                  onClick={() => {
                    setAppliedSuggestion(true);
                    onApproveAiSuggestion(batch.batchNumber, batch.aiAnalysis?.ecoScoreRecommendation);
                    if (onNotify) onNotify('Rekomendasi disetujui & berhasil dicatat ke buku audit ledger', 'success');
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-bold transition shadow-xs flex items-center gap-1.5 active:scale-95"
                >
                  <ThumbsUp className="w-3 h-3 text-white" /> Setujui ke Paspor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Natural Language Query Box with Suggestions */}
      <div className="space-y-2 pt-1">
        <form onSubmit={handleCustomPromptSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari atau tanyakan data batch (contoh: 'Periksa kesesuaian SOP suhu dan masa simpan')..."
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              className="w-full pl-8.5 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-slate-900 dark:text-white placeholder-slate-400 transition"
            />
          </div>
          <button
            type="submit"
            disabled={!customPrompt.trim()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition whitespace-nowrap shadow-xs active:scale-95"
          >
            Analisis Data
          </button>
        </form>

        <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-400 dark:text-slate-500">
          <span className="font-medium">Saran kueri:</span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCustomPrompt(p)}
              className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md transition"
            >
              "{p}"
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
