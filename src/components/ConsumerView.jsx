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

export default function ConsumerView({ batch, onBackToAdmin }) {
  const [activeTab, setActiveTab] = useState('materials');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (batch?.batchNumber) {
      api.logScan(batch.batchNumber, {
        deviceType: navigator.userAgent.includes('Mobile') ? 'Mobile Browser' : 'Desktop Browser'
      });
    }
  }, [batch?.batchNumber]);

  if (!batch) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full mx-auto select-none">
      
      {/* Smartphone Hardware Frame */}
      <div className="bg-slate-900 border-[6px] border-slate-800 rounded-[44px] overflow-hidden shadow-2xl shadow-teal-500/10 relative text-slate-800 ring-1 ring-slate-700/50">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="bg-slate-950 pt-3 pb-2 px-5 flex items-center justify-between text-white">
          <span className="text-[11px] font-semibold font-mono text-slate-400">9:41</span>
          
          <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-1.5 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
            <span className="w-2.5 h-2 rounded-2xs border border-slate-400"></span>
            <span className="text-[10px]">5G</span>
          </div>
        </div>

        {/* Top App Header */}
        <div className="bg-slate-900 text-white py-2.5 px-4 flex items-center justify-between border-b border-slate-800">
          <button 
            onClick={onBackToAdmin}
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition active:scale-95 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-teal-400" />
            <span>Kembali</span>
          </button>
          
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/80 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Paspor Resmi
          </span>
        </div>

        {/* Product Hero Banner with Image */}
        <div className="relative h-48 bg-slate-100 overflow-hidden">
          <img 
            src={batch.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80'} 
            alt={batch.productName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Skor Mutu: {batch.qcScore}%
          </div>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-600/90 text-white px-2 py-0.5 rounded">
              {batch.category}
            </span>
            <h2 className="text-lg font-extrabold leading-snug mt-1 text-white drop-shadow-md">
              {batch.productName}
            </h2>
            <p className="text-xs text-slate-200 mt-0.5 font-medium">{batch.brand}</p>
          </div>
        </div>

        {/* Verified Badge Bar */}
        <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Terjamin 100% Produk Asli</span>
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
            {batch.batchNumber}
          </span>
        </div>

        {/* Product Story Card */}
        <div className="p-3.5 bg-amber-50/60 border-b border-amber-100/80 text-xs text-slate-700 leading-relaxed">
          <p className="font-bold text-amber-950 mb-0.5 flex items-center gap-1 text-[11px]">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Cerita Produk & Petani:
          </p>
          <p className="italic text-slate-600 text-[11px]">"{batch.story}"</p>
        </div>

        {/* 3 Tab Navigation */}
        <div className="grid grid-cols-3 p-1 bg-slate-100 border-b border-slate-200 text-xs font-semibold text-center">
          <button
            onClick={() => setActiveTab('materials')}
            className={`py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'materials' 
                ? 'bg-white text-emerald-900 shadow-xs font-extrabold border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌾 Bahan
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'timeline' 
                ? 'bg-white text-emerald-900 shadow-xs font-extrabold border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏭 Proses
          </button>
          <button
            onClick={() => setActiveTab('eco')}
            className={`py-2 rounded-xl transition-all duration-200 ${
              activeTab === 'eco' 
                ? 'bg-white text-emerald-900 shadow-xs font-extrabold border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌿 Emisi
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-3.5 min-h-[220px] text-xs space-y-3 bg-white">
          
          {/* TAB 1: BAHAN BAKU */}
          {activeTab === 'materials' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                <span>Daftar Komposisi & Sumber Bahan</span>
                <span className="text-emerald-700 font-bold">100% Teruji</span>
              </div>

              {batch.materials.map((m, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 text-xs">{m.name}</h4>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      {m.batchRef}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span><strong>Asal:</strong> {m.origin}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 pl-4">
                    <strong>Pemasok:</strong> {m.supplier}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: TAHAPAN PEMBUATAN */}
          {activeTab === 'timeline' && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                <span>Kronologi Pengolahan & Pengujian Mutu</span>
                <span className="text-emerald-700 font-bold">{batch.timeline.length} Tahap Lolos</span>
              </div>

              <div className="space-y-2 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200 pl-6">
                {batch.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-emerald-800">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-slate-900 text-xs">{step.step}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{step.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DAMPAK LINGKUNGAN */}
          {activeTab === 'eco' && (
            <div className="space-y-2.5">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Ramah Lingkungan
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    {batch.carbonRating}
                  </span>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  Estimasi jejak karbon: <strong>{batch.carbonFootprint}</strong>. Diproduksi secara lokal dengan kemasan ramah lingkungan.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl space-y-1">
                <span className="font-bold text-slate-800 text-[11px]">Catatan QA & AI:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {batch.aiAnalysis?.summary}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Share & QR Code Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1">
              <QRCodeSVG value={batch.batchNumber} size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-mono">Kode Keaslian SHA-256</p>
              <p className="text-[10px] font-mono text-slate-700 font-semibold">{batch.verificationHash.substring(0, 16)}...</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-600 flex items-center gap-1 font-semibold shadow-2xs transition"
          >
            <Share2 className="w-3 h-3" />
            <span>{copied ? 'Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>

        {/* Official Verifier Footer */}
        <div className="p-3 bg-slate-900 text-center text-white space-y-0.5">
          <div className="flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-bold text-slate-200">Diverifikasi oleh {batch.qcInspector}</span>
          </div>
          <p className="text-[9px] text-slate-400 font-mono">
            Platform QR Trace • KKT AgroFarm & UTDI Lab
          </p>
        </div>

      </div>

    </div>
  );
}
