import React from 'react';
import { 
  History, 
  X, 
  Clock, 
  User, 
  Cpu, 
  Hash
} from 'lucide-react';

export default function AuditTrailModal({ isOpen, onClose, auditLogs }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-xl max-h-[90vh] overflow-y-auto space-y-5 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Buku Catatan Log Audit & Ketertelusuran
              </h3>
              <p className="text-xs text-slate-500">Rekam Jejak Tervalidasi Kriptografi Setiap Aksi Operator</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ledger Items */}
        <div className="space-y-3">
          {auditLogs.map(log => {
            const isAi = log.actor.includes('AI') || log.actor.includes('Agent');
            return (
              <div 
                key={log.id} 
                className="bg-slate-50 border border-slate-200/90 p-3.5 rounded-xl space-y-2 hover:border-slate-300 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{log.id}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                      isAi 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 flex items-center gap-1' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1'
                    }`}>
                      {isAi ? <Cpu className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
                      {log.actor}
                    </span>
                    <span className="text-xs font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {log.batchNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed pl-0.5">
                  {log.details}
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-[10px]">
                    <Hash className="w-3 h-3 text-slate-400" /> Block Hash: {log.hash}
                  </span>
                  <span className={`text-[10px] font-bold ${
                    log.status === 'COMMITTED' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    • {log.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
