import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  Camera, 
  X, 
  Sparkles, 
  AlertCircle, 
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QrScannerModal({ isOpen, onClose, batches, onBatchScanned }) {
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const qrRegionId = "qr-reader-target";
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCameraError(null);
      const timer = setTimeout(() => {
        startScanner();
      }, 300);

      return () => {
        clearTimeout(timer);
        stopScanner();
      };
    }
  }, [isOpen]);

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode(qrRegionId);
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 220, height: 220 }
        },
        (decodedText) => {
          handleSuccessScan(decodedText);
        },
        (errorMessage) => {
          // ignore frame errors
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.warn("Camera access failed or unavailable:", err);
      setCameraError("Kamera fisik tidak aktif atau izin ditolak di browser. Gunakan simulasi pemindaian cepat di bawah.");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.warn("Error stopping scanner:", err);
      }
    }
  };

  const handleSuccessScan = (text) => {
    stopScanner();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const found = batches.find(b => text.includes(b.batchNumber)) || batches[0];
    onBatchScanned(found);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-xl space-y-5 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Pindai / Scan QR Paspor Produk</h3>
              <p className="text-[11px] text-slate-500">Verifikasi Langsung dari Kemasan Konsumen</p>
            </div>
          </div>
          <button 
            onClick={() => {
              stopScanner();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Camera View Box */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex flex-col items-center justify-center min-h-[220px]">
          <div id={qrRegionId} className="w-full h-full max-w-[280px]"></div>

          {cameraError && (
            <div className="p-5 text-center space-y-2">
              <AlertCircle className="w-7 h-7 text-amber-600 mx-auto" />
              <p className="text-xs text-slate-600 max-w-xs">{cameraError}</p>
            </div>
          )}
        </div>

        {/* Quick Simulator Picker for Presentation */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-medium text-slate-800 flex items-center gap-1">
              Pilih Batch untuk Simulasi Pindai Cepat:
            </span>
            <span className="text-[10px] text-teal-700 font-mono">1-Klik Buka</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
            {batches.map(b => (
              <button
                key={b.batchNumber}
                onClick={() => handleSuccessScan(b.batchNumber)}
                className="bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 p-2.5 rounded-xl text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{b.batchNumber}</span>
                    <span className="text-[10px] text-emerald-700 font-medium">QC {b.qcScore}%</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-1 group-hover:text-teal-900">{b.productName}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <button
            onClick={() => {
              stopScanner();
              onClose();
            }}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
