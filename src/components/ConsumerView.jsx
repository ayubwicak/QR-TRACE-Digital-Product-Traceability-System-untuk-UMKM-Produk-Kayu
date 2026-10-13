import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Leaf, 
  ArrowLeft,
  ShieldCheck,
  Award,
  MapPin,
  Heart,
  Share2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../api';
import { getBatchPassportUrl } from '../utils/passport';

export default function ConsumerView({ batch, compactPreview = false, onBackToAdmin, passportBatchNumber }) {
  const [activeTab, setActiveTab] = useState('materials');
  const [copied, setCopied] = useState(false);

  // Hanya log scan jika diakses via passport publik (passportBatchNumber ada),
  // BUKAN saat mode admin simulator (passportBatchNumber tidak ada)
  useEffect(() => {
    if (batch?.batchNumber && passportBatchNumber) {
      api.logScan(batch.batchNumber, {
        deviceType: navigator.userAgent.includes('Mobile') ? 'Mobile Browser' : 'Desktop Browser'
      });
    }
  }, [batch?.batchNumber, passportBatchNumber]);

  if (!batch) return null;

  const checkedMaterialCount = batch.materials.filter(material => material.verified).length;

  const handleShare = () => {
    const url = window.location.href;
    const copyToClipboard = (text) => {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      }
      // Fallback untuk HTTP / non-secure context
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      } finally {
        document.body.removeChild(textarea);
      }
    };

    copyToClipboard(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      alert('Gagal menyalin tautan. Silakan salin manual: ' + url);
    });
  };

  if (compactPreview) {
    const mainMaterial = batch.materials?.find(material => /kayu|wood/i.test(material.name));

    return (
      <section className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div className="relative h-56 bg-slate-100 sm:h-72">
          <img
            src={batch.image || '/images/wood-batches/coffee-table.svg'}
            alt={batch.productName}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm">
            <CheckCircle2 className="h-4 w-4" />
            Produk terverifikasi
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">{batch.category}</p>
            <h1 className="mt-1 text-2xl font-extrabold leading-tight text-slate-900">{batch.productName}</h1>
            <p className="mt-1 text-sm font-medium text-slate-500">{batch.brand}</p>
          </div>

          {batch.story && (
            <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{batch.story}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Bahan utama</p>
              <p className="mt-1 text-sm font-bold text-slate-800">{mainMaterial?.name || 'Kayu'}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs text-emerald-700">Pemeriksaan mutu</p>
              <p className="mt-1 text-sm font-bold text-emerald-800">Lolos · {batch.qcScore}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div>
              <p className="text-xs text-slate-500">Nomor batch</p>
              <p className="mt-0.5 font-mono text-sm font-bold text-slate-800">{batch.batchNumber}</p>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Share2 className="h-4 w-4" />
              {copied ? 'Tersalin!' : 'Bagikan'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-800 dark:text-slate-100">
      
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white py-3.5 px-6 flex items-center justify-between border-b border-slate-800">
        {onBackToAdmin ? (
          <button
            onClick={onBackToAdmin}
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition active:scale-95 bg-slate-800/90 hover:bg-slate-700 px-3.5 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-teal-400" />
            <span>Kembali ke Katalog</span>
          </button>
        ) : <span className="text-sm font-bold tracking-wide text-white">QR Trace · Paspor Produk Kayu</span>}
        
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Paspor Digital Terverifikasi
          </span>
          <button
            onClick={handleShare}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-teal-400 flex items-center gap-1.5 font-semibold transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* Product Hero Banner */}
      <div className="relative h-64 sm:h-72 bg-slate-900 overflow-hidden">
        <img 
          src={batch.image || '/images/wood-batches/coffee-table.svg'}
          alt={batch.productName}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
        
        <div className="absolute top-4 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-emerald-800 dark:text-emerald-400 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Skor Mutu QC: {batch.qcScore}%
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider bg-teal-600/90 text-white px-2.5 py-1 rounded">
              {batch.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mt-2 text-white drop-shadow-md">
              {batch.productName}
            </h1>
            <p className="text-sm text-slate-300 mt-1 font-medium">{batch.brand}</p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
              <QRCodeSVG value={getBatchPassportUrl(batch.batchNumber)} size={40} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-mono">Nomor Batch / SHA-256</p>
              <p className="text-xs font-mono text-teal-300 font-bold">{batch.batchNumber}</p>
              <p className="text-[10px] font-mono text-slate-400 truncate max-w-[160px]">{batch.verificationHash}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Bar & Story */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 dark:border-slate-800 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 bg-slate-50 dark:bg-slate-950/50">
        <div className="p-4 flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Jaminan 100% Produk Asli</p>
            <p className="text-[11px] text-slate-500">Tersertifikasi sistem rantai pasok digital</p>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="p-2 bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-lg">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Rating Karbon: {batch.carbonRating}</p>
            <p className="text-[11px] text-slate-500">Emisi: {batch.carbonFootprint}</p>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-lg">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Inspektur QC</p>
            <p className="text-[11px] text-slate-500">{batch.qcInspector || 'Lead Auditor'}</p>
          </div>
        </div>
      </div>

      {/* Product Story */}
      {batch.story && (
        <div className="p-4 sm:p-5 bg-amber-50/70 dark:bg-amber-950/20 border-b border-amber-200/60 dark:border-amber-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <p className="font-bold text-amber-950 dark:text-amber-300 mb-1 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Cerita Produk & Pengrajin:
          </p>
          <p className="italic text-slate-700 dark:text-slate-300 leading-relaxed">"{batch.story}"</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/40 p-1.5 gap-2 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('materials')}
          className={`flex-1 py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'materials' 
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-xs font-extrabold border border-slate-200 dark:border-slate-700' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🌾 Asal Usul Bahan Baku</span>
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'timeline' 
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-xs font-extrabold border border-slate-200 dark:border-slate-700' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🏭 Kronologi Pengolahan</span>
        </button>
        <button
          onClick={() => setActiveTab('eco')}
          className={`flex-1 py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'eco' 
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-xs font-extrabold border border-slate-200 dark:border-slate-700' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🌿 Analisis ESG & Mutu</span>
        </button>
      </div>

      {/* Tab Body Content */}
      <div className="p-6 text-sm bg-white dark:bg-slate-900 min-h-[300px]">
        
        {/* TAB 1: BAHAN BAKU */}
        {activeTab === 'materials' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
              <span>Asal Kayu dan Bahan Pendukung</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                {checkedMaterialCount}/{batch.materials.length} dokumen ditinjau petugas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batch.materials.map((m, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{m.name}</h4>
                    <span className="text-xs font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                      Lot / dokumen: {m.batchRef}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span><strong>Lokasi Asal:</strong> {m.origin}</span>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pl-5.5">
                    <strong>Pemasok Terdaftar:</strong> {m.supplier}
                  </p>
                  <p className={`text-[11px] font-semibold ${m.verified ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                    {m.verified ? 'Dokumen ditandai telah ditinjau petugas' : 'Dokumen belum ditinjau petugas'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: TAHAPAN PEMBUATAN */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
              <span>Kronologi Pengerjaan & Pemeriksaan Mutu (SOP)</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">{batch.timeline.length} Tahap Lolos</span>
            </div>

            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-300 dark:before:bg-emerald-800 pl-8">
              {batch.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-600 flex items-center justify-center text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-900 dark:text-white text-sm">{step.step}</span>
                      <span className="text-xs text-slate-500 font-mono">{step.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DAMPAK LINGKUNGAN */}
        {activeTab === 'eco' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 text-sm">
                    <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Penilaian Ramah Lingkungan
                  </span>
                  <span className="text-sm font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-emerald-300 dark:border-emerald-700">
                    {batch.carbonRating}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                  Estimasi jejak karbon: <strong>{batch.carbonFootprint}</strong>. Diproduksi menggunakan rantai pasok rendah emisi dan kemasan berdaya urai tinggi.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Catatan Validasi Mutu & Analisis:</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {batch.aiAnalysis?.summary || 'Seluruh parameter pengujian mutu dan kesesuaian SOP berada dalam ambang toleransi standar.'}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Official Verifier Footer */}
      <div className="py-4 px-6 bg-slate-900 text-center text-white flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-200">Diverifikasi oleh: {batch.qcInspector}</span>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          QR Trace • Paspor Digital Produk Kayu UMKM
        </p>
      </div>

    </div>
  );
}
