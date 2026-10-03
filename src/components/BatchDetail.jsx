import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Leaf, 
  Box, 
  Factory, 
  CheckCircle2, 
  Printer, 
  Hash, 
  Edit3, 
  Trash2, 
  Award, 
  Download, 
  QrCode,
  ArrowLeft,
  MapPin,
  FileCheck2,
  Share2
} from 'lucide-react';
import AiCopilotCard from './AiCopilotCard';

export default function BatchDetail({ 
  batch, 
  onBackToCatalog,
  onSimulateScan, 
  onOpenLabelPrint, 
  onOpenEditBatch, 
  onDeleteBatch, 
  onOpenCertificate, 
  onOpenEcoCalc, 
  onApproveAiSuggestion, 
  onRejectAiSuggestion 
}) {
  if (!batch) return null;

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(batch, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${batch.batchNumber}_digital_passport.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <button
          onClick={onBackToCatalog}
          className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-800 flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>Kembali ke Katalog Produk</span>
        </button>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => onOpenCertificate(batch)}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100/80 text-amber-900 rounded-xl transition text-xs font-semibold flex items-center gap-1.5 border border-amber-200 shadow-2xs"
            title="Sertifikat Analisis Lab"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" /> Sertifikat COA
          </button>
          <button
            onClick={() => onOpenEcoCalc(batch)}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 rounded-xl transition text-xs font-semibold flex items-center gap-1.5 border border-emerald-200 shadow-2xs"
            title="Kalkulator Emisi ESG"
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Kalkulator Emisi
          </button>
          <button
            onClick={handleExportJson}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition text-xs font-medium flex items-center gap-1.5 border border-slate-200 shadow-2xs"
            title="Unduh Paspor JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" /> JSON
          </button>
          <button
            onClick={() => onOpenEditBatch(batch)}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl transition text-xs font-semibold flex items-center gap-1.5 border border-slate-200 shadow-2xs"
            title="Edit Data Produk"
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-700" /> Edit
          </button>
          <button
            onClick={() => onDeleteBatch(batch.batchNumber)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition border border-slate-200"
            title="Hapus Produk"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Product Hero Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Product Image & Badges (5 Col) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-slate-100 h-56 sm:h-64 border border-slate-200">
            <img 
              src={batch.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80'} 
              alt={batch.productName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-white/95 text-slate-900 text-xs font-bold font-mono px-3 py-1 rounded-xl shadow-xs border border-slate-200">
              {batch.batchNumber}
            </div>
            <div className="absolute bottom-3 left-3 bg-emerald-800 text-white text-xs font-semibold px-3 py-1 rounded-xl shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> QC Passed ({batch.qcScore}%)
            </div>
          </div>

          {/* Product Details & QR Action Box (7 Col) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-lg border border-slate-200">
                  {batch.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">SKU: {batch.sku}</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {batch.productName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Diproduksi oleh: <strong className="text-slate-800">{batch.brand}</strong>
              </p>

              <p className="text-xs sm:text-sm text-slate-600 italic bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed mt-2">
                "{batch.story}"
              </p>
            </div>

            {/* QR Card Box */}
            <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="bg-white p-2 rounded-xl border border-emerald-200 shadow-2xs">
                  <QRCodeSVG 
                    value={`https://qrtrace.app/verify/${batch.batchNumber}`}
                    size={72}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="M"
                  />
                </div>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-emerald-950">Paspor Digital Kemasan</p>
                  <p className="text-[11px] text-emerald-800">Siap dipindai kamera HP pembeli</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onOpenLabelPrint(batch)}
                  className="flex-1 sm:flex-none px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" /> Cetak Label
                </button>
                <button
                  onClick={() => onSimulateScan(batch)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl transition text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <QrCode className="w-3.5 h-3.5 text-white" /> Buka Paspor HP
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2 border-t border-slate-100">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Tgl Manufaktur
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1 font-mono">{batch.manufactureDate}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Masa Kadaluarsa
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1 font-mono">{batch.expiryDate}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Pengujian QC
            </p>
            <p className="text-xs sm:text-sm font-bold text-emerald-800 mt-1 flex items-center gap-1">
              {batch.qcStatus} ({batch.qcScore}%)
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Rating Karbon
            </p>
            <p className="text-xs sm:text-sm font-bold text-emerald-800 mt-1">
              {batch.carbonRating}
            </p>
          </div>
        </div>

      </div>

      {/* Quality Check & Compliance Card */}
      <AiCopilotCard 
        batch={batch} 
        onApproveAiSuggestion={onApproveAiSuggestion} 
        onRejectAiSuggestion={onRejectAiSuggestion} 
      />

      {/* Raw Materials Sourcing */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Box className="w-4 h-4 text-emerald-700" /> Asal Usul Bahan Baku (Raw Material Traceability)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Seluruh komponen terverifikasi dari petani & pemasok resmi</p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-semibold border border-emerald-200">
            {batch.materials.length} Komponen Terdaftar
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {batch.materials.map((mat, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 border border-slate-200/90 p-4 rounded-2xl space-y-2 hover:border-slate-300 transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-200">
                    {mat.batchRef}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1.5">{mat.name}</h4>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] bg-white text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold shadow-2xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Teruji Asli
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-600 pt-2 border-t border-slate-200/70">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>Asal:</strong> {mat.origin}</span>
                </p>
                <p className="pl-5 text-slate-500">
                  <strong>Pemasok:</strong> {mat.supplier}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manufacturing SOP Journey */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Factory className="w-4 h-4 text-emerald-700" /> Riwayat Tahapan Pengolahan & SOP
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Kronologi proses dari panen hingga pengemasan siap edar</p>
          </div>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {batch.timeline.length} Tahapan Lengkap
          </span>
        </div>

        <div className="space-y-3.5 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 pl-9">
          {batch.timeline.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-9 top-1 w-7 h-7 rounded-full bg-white border-2 border-emerald-700 flex items-center justify-center text-emerald-800 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 space-y-1 hover:bg-white hover:border-slate-300 transition">
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm">
                  <h4 className="font-bold text-slate-900">{step.step}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span className="text-emerald-800 font-semibold">{step.operator}</span>
                    <span>•</span>
                    <span>{step.date}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
