import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Leaf, 
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Building2,
  Clock,
  ExternalLink,
  Award,
  MapPin,
  Sparkles,
  Heart,
  Share2,
  PackageCheck
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function ConsumerView({ batch, onBackToAdmin }) {
  const [activeTab, setActiveTab] = useState('materials');

  if (!batch) return null;

  return (
    <div className="max-w-md mx-auto min-h-screen py-4 px-3 sm:px-0">
      
      {/* Phone Mockup Frame */}
      <div className="bg-white border-4 border-slate-800/90 rounded-[38px] overflow-hidden shadow-2xl relative text-slate-800">
        
        {/* Top App Bar with Notch */}
        <div className="bg-slate-900 text-white py-3 px-4 flex items-center justify-between">
          <button 
            onClick={onBackToAdmin}
            className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard
          </button>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
            ✓ Paspor Resmi
          </span>
        </div>

        {/* Product Hero Banner with Real Photo */}
        <div className="relative h-48 bg-slate-100 overflow-hidden">
          <img 
            src={batch.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80'} 
            alt={batch.productName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Lolos Uji Mutu {batch.qcScore}%
          </div>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-600/90 px-2 py-0.5 rounded">
              {batch.category}
            </span>
            <h2 className="text-lg font-bold leading-snug mt-1 text-white drop-shadow-sm">
              {batch.productName}
            </h2>
            <p className="text-xs text-slate-200 mt-0.5">{batch.brand}</p>
          </div>
        </div>

        {/* Verified Badge Bar */}
        <div className="bg-emerald-50/80 px-4 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Terjamin 100% Produk Asli</span>
          </div>
          <span className="font-mono text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-emerald-200">
            {batch.batchNumber}
          </span>
        </div>

        {/* Product Story Card */}
        <div className="p-4 bg-amber-50/40 border-b border-amber-100/80 text-xs text-slate-700 leading-relaxed">
          <p className="font-semibold text-amber-900 mb-1 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-amber-600" /> Cerita Produk & Petani:
          </p>
          <p className="italic text-slate-600">"{batch.story}"</p>
        </div>

        {/* 3 Friendly Tab Navigation */}
        <div className="grid grid-cols-3 p-1.5 bg-slate-100/80 border-b border-slate-200 text-xs font-medium text-center">
          <button
            onClick={() => setActiveTab('materials')}
            className={`py-2 rounded-xl transition ${
              activeTab === 'materials' 
                ? 'bg-white text-emerald-900 shadow-xs font-bold border border-slate-200/80' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌾 Asal Bahan
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-2 rounded-xl transition ${
              activeTab === 'timeline' 
                ? 'bg-white text-emerald-900 shadow-xs font-bold border border-slate-200/80' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏭 Pembuatan
          </button>
          <button
            onClick={() => setActiveTab('eco')}
            className={`py-2 rounded-xl transition ${
              activeTab === 'eco' 
                ? 'bg-white text-emerald-900 shadow-xs font-bold border border-slate-200/80' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌿 Lingkungan
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-4 min-h-[220px] text-xs space-y-3">
          
          {/* TAB 1: BAHAN BAKU */}
          {activeTab === 'materials' && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                <span>Daftar Komposisi & Sumber Bahan</span>
                <span className="text-emerald-700 font-semibold">100% Teruji Asli</span>
              </div>

              {batch.materials.map((m, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 text-xs">{m.name}</h4>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {m.batchRef}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span><strong>Lokasi:</strong> {m.origin}</span>
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
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                <span>Kronologi Pengolahan & Pengujian Mutu</span>
                <span className="text-emerald-700 font-semibold">{batch.timeline.length} Tahapan Selesai</span>
              </div>

              <div className="space-y-2 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200 pl-7">
                {batch.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-7 top-1 w-5 h-5 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-emerald-800 shadow-2xs">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center font-semibold">
                        <span className="text-slate-900">{step.step}</span>
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
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs">
                    <Leaf className="w-4 h-4 text-emerald-600" /> Kategori Ramah Lingkungan
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    {batch.carbonRating}
                  </span>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  Estimasi jejak karbon: <strong>{batch.carbonFootprint}</strong>. Diproduksi secara lokal dengan kemasan ramah lingkungan untuk mendukung inisiatif bebas sampah.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-1">
                <span className="font-semibold text-slate-800 text-xs">Catatan Pemeriksa Kualitas:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {batch.aiAnalysis?.summary}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Official Verifier Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-slate-800">Diverifikasi & Diuji oleh {batch.qcInspector}</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono">
            Kode Keaslian: {batch.verificationHash.substring(0, 22)}...
          </p>
        </div>

      </div>

    </div>
  );
}
