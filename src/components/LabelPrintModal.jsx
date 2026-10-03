import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, X, ShieldCheck } from 'lucide-react';

export default function LabelPrintModal({ isOpen, onClose, batch }) {
  if (!isOpen || !batch) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-xl space-y-5 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Pratinjau Label Kemasan Produk</h3>
              <p className="text-[11px] text-slate-500">Format Cetak Stiker Kemasan Konsumen</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Printable Label Container */}
        <div className="bg-white text-slate-900 p-5 rounded-xl border-2 border-dashed border-slate-300 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                PASPOR DIGITAL PRODUK
              </span>
              <h4 className="text-base font-bold text-slate-900 leading-tight mt-0.5">
                {batch.productName}
              </h4>
              <p className="text-xs text-slate-600 font-medium">{batch.brand}</p>
            </div>
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> QC PASSED
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 text-xs text-slate-700 font-mono">
              <p><strong>BATCH:</strong> {batch.batchNumber}</p>
              <p><strong>SKU:</strong> {batch.sku}</p>
              <p><strong>MFG:</strong> {batch.manufactureDate}</p>
              <p><strong>EXP:</strong> {batch.expiryDate}</p>
              <p className="text-[10px] text-slate-500 mt-2 font-sans italic">
                Pindai QR untuk verifikasi asal bahan & riwayat produksi.
              </p>
            </div>

            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col items-center">
              <QRCodeSVG 
                value={`https://qrtrace.app/verify/${batch.batchNumber}`}
                size={80}
                bgColor="#f8fafc"
                fgColor="#000000"
                level="M"
              />
              <span className="text-[9px] font-mono font-bold mt-1 text-slate-600">SCAN TRACE</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-center text-[9px] text-slate-400 font-mono">
            SECURED BY QR TRACE DIGITAL • ID: {batch.verificationHash.substring(0, 16)}
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
            onClick={handlePrint}
            className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4 text-white" /> Cetak Label Kemasan
          </button>
        </div>

      </div>
    </div>
  );
}
