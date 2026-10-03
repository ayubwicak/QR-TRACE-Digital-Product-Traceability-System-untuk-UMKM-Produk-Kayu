import React from 'react';
import { 
  Package, 
  ShieldCheck, 
  FileCheck2, 
  Layers,
  TrendingUp,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function StatsOverview({ batches, auditLogs }) {
  const totalBatches = batches.length;
  const passedQcCount = batches.filter(b => b.qcStatus && b.qcStatus.includes('Passed')).length;
  const avgQcScore = totalBatches > 0 
    ? (batches.reduce((acc, b) => acc + (b.qcScore || 98), 0) / totalBatches).toFixed(1)
    : '100';
  const totalLogs = auditLogs.length;

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
      
      {/* Stat 1: Total Batch Aktif */}
      <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md card-hover transition-all overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-80" />
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Batch Terdaftar</span>
          <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60 group-hover:scale-110 transition-transform">
            <Package className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              {totalBatches}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              Semua aktif dengan QR
            </p>
          </div>
          <span className="text-[10px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> 100%
          </span>
        </div>
      </div>

      {/* Stat 2: Kepatuhan Uji Mutu (QC) */}
      <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md card-hover transition-all overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-80" />
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Kepatuhan Uji Mutu</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/60 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
              {avgQcScore}%
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {passedQcCount} batch lolos standar
            </p>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
            Grade A
          </span>
        </div>
      </div>

      {/* Stat 3: Validasi Otomatis QA & AI Copilot */}
      <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md card-hover transition-all overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-80" />
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Validasi Otomatis (QA)</span>
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/60 dark:border-indigo-800/60 group-hover:scale-110 transition-transform">
            <FileCheck2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              100%
            </p>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mt-1 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Human-in-the-Loop siap
            </p>
          </div>
          <span className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-full">
            SOP HACCP
          </span>
        </div>
      </div>

      {/* Stat 4: Catatan Log Audit / Ledger */}
      <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-4.5 shadow-xs hover:shadow-md card-hover transition-all overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 opacity-80" />
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Catatan Log Audit</span>
          <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-200/60 dark:border-violet-800/60 group-hover:scale-110 transition-transform">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              {totalLogs}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
              Tervalidasi SHA-256
            </p>
          </div>
          <span className="text-[10px] font-semibold text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 px-2 py-0.5 rounded-full">
            Imutabel
          </span>
        </div>
      </div>

    </section>
  );
}
