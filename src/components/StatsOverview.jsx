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
import { TRANSLATIONS } from '../data/i18n';

export default function StatsOverview({ batches, auditLogs, lang = 'id' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;
  const totalBatches = batches.length;
  const passedQcCount = batches.filter(b => (b.qcScore && b.qcScore >= 90) || (b.qcStatus && (b.qcStatus.includes('Lolos') || b.qcStatus.includes('Passed')))).length;
  const avgQcScore = totalBatches > 0
    ? (batches.reduce((acc, b) => acc + (parseFloat(b.qcScore) || 98), 0) / totalBatches).toFixed(1)
    : '100';
  const totalLogs = auditLogs.length;
  const stats = [
    {
      label: t.registeredBatches || 'Batch Terdaftar',
      value: totalBatches,
      caption: t.allActiveWithQr || 'Semua aktif dengan QR',
      badge: <><TrendingUp className="h-3 w-3" /> 100%</>,
      icon: <Package className="h-4 w-4" />,
      iconColor: 'text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/50'
    },
    {
      label: t.qcCompliance || 'Kepatuhan Uji Mutu',
      value: `${avgQcScore}%`,
      caption: <><CheckCircle2 className="h-3 w-3 text-emerald-600" /> {passedQcCount} {t.passedStandard || 'batch lolos standar'}</>,
      badge: 'Grade A',
      icon: <ShieldCheck className="h-4 w-4" />,
      iconColor: 'text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/50'
    },
    {
      label: t.qaAutomation || 'Validasi Otomatis (QA)',
      value: '100%',
      caption: <><Lock className="h-3 w-3" /> {t.humanInTheLoopReady}</>,
      badge: 'Asal Kayu Tercatat',
      icon: <FileCheck2 className="h-4 w-4" />,
      iconColor: 'text-indigo-600 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-950/50'
    },
    {
      label: t.auditRecordsCount || 'Catatan Log Audit',
      value: totalLogs,
      caption: t.immutableLedger || 'Buku besar permanen',
      badge: 'SHA-256',
      icon: <Layers className="h-4 w-4" />,
      iconColor: 'text-violet-600 bg-violet-50 dark:text-violet-300 dark:bg-violet-950/50'
    }
  ];

  return (
    <section aria-label={t.statsLabel} className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      {stats.map(stat => (
        <article
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.label}</h2>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${stat.iconColor}`}>
              {stat.icon}
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">{stat.caption}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {stat.badge}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
