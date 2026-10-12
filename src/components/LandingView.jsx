import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/i18n';
import { matchesWoodCategory } from '../data/mockData';
import { 
  QrCode, 
  ShieldCheck, 
  Leaf, 
  Search, 
  ArrowRight, 
  LogIn, 
  UserPlus, 
  CheckCircle2, 
  Database,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock,
  Globe2,
  Box,
  Award,
  Smartphone
} from 'lucide-react';

export default function LandingView({ 
  batches = [], 
  auditLogs = [],
  onOpenLogin, 
  onOpenRegister, 
  onGoToDashboard,
  onOpenScanner,
  onSelectBatch,
  onSimulateScan,
  lang = 'id'
}) {
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;
  const copy = t.landing;
  const categoriesList = copy.categoryKeys.map((key, index) => ({ key, label: copy.categories[index] }));

  const filteredBatches = batches.filter(b => {
    const matchQuery = b.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       b.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       b.brand.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeCategoryTab === 'all') return matchQuery;
    return matchQuery && matchesWoodCategory(b.category, activeCategoryTab);
  });

  const totalBatches = batches.length;
  const avgQcScore = batches.length > 0
    ? (batches.reduce((acc, b) => acc + (b.qcScore || 0), 0) / batches.length).toFixed(1)
    : '98.5';
  
  const totalEcoCount = batches.filter(b => b.carbonRating === 'A' || b.carbonRating === 'B').length;

  const faqs = copy.faqs.map(([q, a]) => ({ q, a }));

  return (
    <div className="space-y-12 pb-12 sm:space-y-16">

      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-blue-50/80 px-5 py-10 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-900/20" />
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col items-start gap-5 lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              {copy.heroTag}
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[54px]">
                {copy.heroTitleFirst}
                <br />
                <span className="text-blue-700 dark:text-blue-400">{copy.heroTitleSecond}</span>
              </h1>
              <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-7">
                {copy.heroDescription}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row">
              <button
                onClick={onGoToDashboard}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                {copy.start}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#public-products"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {copy.exploreProducts}
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </a>
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              {copy.publicAccess}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-5">
            <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_24px_60px_-28px_rgba(37,99,235,0.3)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{copy.verifiedPassport}</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{copy.digitalIdentity}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">{copy.active}</span>
              </div>
              <div className="flex items-center gap-5 py-6">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 sm:h-32 sm:w-32">
                  <QrCode className="h-20 w-20 sm:h-24 sm:w-24" strokeWidth={1.3} />
                </div>
                <div className="min-w-0 space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{copy.traceability}</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{copy.upstreamDownstream}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {copy.qualityVerified}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Lock className="h-4 w-4 text-blue-600" />
                    {copy.historySecured}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-slate-200 rounded-xl bg-slate-50 py-3 text-center dark:divide-slate-700 dark:bg-slate-800/70">
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{totalBatches}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{copy.batch}</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{avgQcScore}%</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{copy.qcScore}</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{auditLogs.length}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{copy.auditLog}</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:flex">
              <Leaf className="h-4 w-4 text-emerald-600" />
              {totalEcoCount} {copy.ecoRated}
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION PILLARS */}
      <section id="capabilities" className="space-y-6">
        <div className="mx-auto max-w-2xl space-y-2 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">{copy.featureEyebrow}</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {copy.featureTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {copy.featureDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[Database, Globe2, Sparkles, Leaf].map((Icon, index) => (
            <article key={copy.benefits[index][0]} className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-blue-50/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white dark:bg-blue-950/60 dark:text-blue-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{copy.benefits[index][0]}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{copy.benefits[index][1]}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. STEP-BY-STEP PROCESS SECTION (Labamu numbered steps) */}
      <section className="bg-slate-100/70 dark:bg-slate-900/40 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-blue-700 dark:text-blue-300">
            {copy.processEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {copy.processTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {copy.steps.map(([title, description], index) => (
            <article key={title} className="space-y-2">
              <div className="font-mono text-3xl font-extrabold text-blue-600/50">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. MODULAR SOLUTIONS DIRECTORY (Labamu grid directory style) */}
      <section id="features" className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-blue-700 dark:text-blue-300">
            {copy.modulesEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {copy.modulesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[QrCode, Box, Leaf, Lock, Award, Smartphone].map((Icon, index) => {
            const [category, title, description] = copy.modules[index];
            return (
              <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-blue-50/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300">{category}</span>
                  <Icon className="h-4 w-4 text-slate-400" />
                </div>
                <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. LIVE PUBLIC SAMPLE CATALOG (Category Tab Filtered) */}
      <section id="public-products" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">{copy.catalogEyebrow}</p>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">{copy.catalogTitle}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {copy.catalogDescription}
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder={copy.searchSamples}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categoriesList.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategoryTab(cat.key)}
              className={`text-xs px-3.5 py-1.5 rounded-xl transition whitespace-nowrap font-medium cursor-pointer ${
                activeCategoryTab === cat.key
                  ? 'border-blue-700 bg-blue-700 font-semibold text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredBatches.map(b => (
            <div 
              key={b.batchNumber}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
            >
              <div>
                <div className="relative h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img 
                    src={b.image || '/images/wood-batches/coffee-table.svg'}
                    alt={b.productName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {b.batchNumber}
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {copy.qcScore} {b.qcScore}%
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-300">
                      {b.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {b.productName}
                    </h3>
                    <p className="text-[11px] text-slate-500">{b.brand}</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic whitespace-normal break-words">
                      {`“${b.story}”`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>{copy.emissions}: {b.carbonFootprint}</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">{b.carbonRating}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onSelectBatch(b)}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-700 transition hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300"
                >
                  <span>{copy.details}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSimulateScan(b)}
                  className="flex min-h-9 items-center gap-1 rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-800"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{copy.digitalPassport}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-5 lg:col-span-7">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">{copy.activityEyebrow}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{copy.activityTitle}</h2>
          </div>
          <div className="space-y-3">
            {auditLogs.length > 0 ? auditLogs.slice(0, 2).map((log, index) => (
              <article key={log.id || `${log.action}-${index}`} className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 sm:items-center">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    <Database className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">{copy.auditRecorded}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{log.timestamp}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                      {log.action?.replaceAll('_', ' ') || copy.activityDefault}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {log.details || copy.activityBatchFallback.replace('{batch}', log.batchNumber || '-')}
                    </p>
                  </div>
                </div>
                <span aria-hidden="true" className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-blue-700 group-hover:text-white dark:bg-slate-800">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </article>
            )) : (
              <article className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                {copy.activityFallback}
              </article>
            )}
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:col-span-5">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400" />
          <p className="pt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">{copy.aboutEyebrow}</p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
            {copy.aboutTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {copy.aboutDescription}
          </p>
          <ul className="mt-5 space-y-3">
            <li className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              {copy.aboutPoints[0]}
            </li>
            <li className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              {copy.aboutPoints[1]}
            </li>
            <li className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              {copy.aboutPoints[2]}
            </li>
          </ul>
          <button
            onClick={onOpenScanner}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <QrCode className="h-4 w-4" />
            {copy.tryScanner}
            <ArrowRight className="h-4 w-4" />
          </button>
        </aside>
      </section>

      {/* FAQ */}
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:p-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {copy.faqTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {copy.faqDescription}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen                   ? 'rotate-90 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION (Labamu Ready to Connect CTA) */}
      <section className="space-y-4 rounded-3xl bg-gradient-to-r from-blue-800 via-blue-900 to-slate-950 p-6 text-center text-white shadow-md sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {copy.ctaTitle}
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          {copy.ctaDescription}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={onOpenLogin}
            className="flex min-h-11 items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-xs font-extrabold text-white shadow-md transition hover:bg-blue-400 sm:text-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>{copy.ctaStart}</span>
          </button>

          <button
            onClick={onOpenRegister}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{copy.ctaRegister}</span>
          </button>
        </div>
      </section>

    </div>
  );
}
