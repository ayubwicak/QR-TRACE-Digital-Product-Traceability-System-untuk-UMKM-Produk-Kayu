import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-medium ${
        isSuccess 
          ? 'bg-emerald-900 text-white border-emerald-700 shadow-emerald-950/20'
          : isError
          ? 'bg-rose-900 text-white border-rose-700 shadow-rose-950/20'
          : 'bg-slate-900 text-white border-slate-700 shadow-slate-950/20'
      }`}>
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}

        <div className="pr-2">
          <p className="text-xs sm:text-sm font-semibold">{toast.title || 'Notifikasi'}</p>
          {toast.message && <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5">{toast.message}</p>}
        </div>

        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
