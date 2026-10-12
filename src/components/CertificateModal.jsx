import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getBatchPassportUrl } from '../utils/passport';
import { Award, Printer, X, CheckCircle2 } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, batch }) {
  if (!isOpen || !batch) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-xl max-h-[92vh] overflow-y-auto space-y-5 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Laporan Pemeriksaan Produk Kayu</h3>
              <p className="text-[11px] text-amber-700">Pratinjau data contoh; bukan sertifikat atau pengesahan resmi</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Certificate Page */}
        <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-slate-300 shadow-xs relative overflow-hidden space-y-6">
          
          {/* Top Banner */}
          <div className="text-center space-y-1 pb-4 border-b border-slate-200">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">
              LAPORAN PEMERIKSAAN MUTU PRODUK KAYU
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              WOOD PRODUCT INSPECTION & TRACEABILITY
            </h2>
            <p className="text-xs text-slate-500">Standar IPEC'26 • Kolej Komuniti Temerloh & Universitas Teknologi Digital Indonesia</p>
          </div>

          {/* Certificate Content Body */}
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <p className="text-slate-500 text-[11px]">Nama Produk:</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{batch.productName}</p>
                <p className="text-slate-500 text-[11px] mt-2">Brand / Afiliasi:</p>
                <p className="font-medium text-slate-800">{batch.brand}</p>
              </div>
              <div className="font-mono text-[11px] space-y-1 text-slate-700">
                <p><span className="text-slate-500">Batch No:</span> <strong className="text-teal-800">{batch.batchNumber}</strong></p>
                <p><span className="text-slate-500">SKU Code:</span> {batch.sku}</p>
                <p><span className="text-slate-500">Tgl Rilis:</span> {batch.manufactureDate}</p>
                <p><span className="text-slate-500">Masa garansi/layanan:</span> {batch.expiryDate}</p>
              </div>
            </div>

            {/* QC Parameters Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 text-[11px] font-bold text-slate-700 flex justify-between">
                <span>Parameter Pengujian Mutu</span>
                <span>Hasil Verifikasi</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="px-4 py-2.5 flex justify-between items-center">
                  <span className="text-slate-700">Skor Kepatuhan QC Keseluruhan</span>
                  <span className="font-mono font-bold text-emerald-700">{batch.qcScore}% ({batch.qcStatus})</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between items-center">
                  <span className="text-slate-700">Asal dan lot bahan kayu</span>
                  <span className="font-mono font-bold text-teal-800">{batch.materials.length} komponen tercatat</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between items-center">
                  <span className="text-slate-700">Kepatuhan Standar ESG & Emisi</span>
                  <span className="font-mono font-bold text-slate-900">{batch.carbonRating}</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between items-center">
                  <span className="text-slate-700">Catatan audit dan perubahan data</span>
                  <span className="font-mono font-bold text-indigo-700">Tersedia di sistem</span>
                </div>
              </div>
            </div>

            {/* QR Code and Signatures */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                  <QRCodeSVG 
                    value={getBatchPassportUrl(batch.batchNumber)}
                    size={64}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="Q"
                  />
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  <p className="font-bold text-slate-800">Tanda Tangan Hash</p>
                  <p className="text-slate-600">{batch.verificationHash.substring(0, 18)}...</p>
                </div>
              </div>

              <div className="text-center sm:text-right text-xs">
                <p className="text-slate-500 text-[10px]">Petugas pemeriksa mutu:</p>
                <p className="font-bold text-slate-900 mt-1 underline decoration-teal-600 underline-offset-4">{batch.qcInspector}</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 mt-1 font-mono font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Data contoh
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition"
          >
            Tutup
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4 text-white" /> Cetak Laporan Pemeriksaan
          </button>
        </div>

      </div>
    </div>
  );
}
