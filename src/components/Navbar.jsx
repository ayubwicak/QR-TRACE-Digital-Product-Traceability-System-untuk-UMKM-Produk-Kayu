import React from 'react';
import { 
  QrCode, 
  ShieldCheck, 
  History, 
  Smartphone, 
  Plus, 
  Camera,
  Globe,
  Database,
  LayoutDashboard,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  onOpenNewBatch, 
  onOpenGovernance, 
  onOpenAuditLogs,
  onOpenQrScanner,
  lang,
  setLang,
  dbStatus,
  theme,
  setTheme,
  auditLogCount = 0
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-3">
          
          {/* Brand & System Information */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative group cursor-pointer" onClick={() => setViewMode('admin')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-500 text-white flex items-center justify-center font-bold shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight flex items-center gap-1.5">
                  QR Trace
                  <span className="text-[11px] font-semibold font-mono text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-2 py-0.5 rounded-full">
                    Paspor Digital
                  </span>
                </h1>

                {/* Database Connection Pill */}
                <div className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                  dbStatus === 'CONNECTED'
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dbStatus === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <Database className="w-2.5 h-2.5" />
                  <span>{dbStatus === 'CONNECTED' ? 'PostgreSQL Aktif' : 'Penyimpanan Lokal'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 truncate">
                <span className="hidden md:inline font-medium">Platform Transparansi & Kepatuhan Mutu</span>
                <span className="hidden md:inline text-slate-300 dark:text-slate-600">•</span>
                <span className="text-[11px] text-teal-700 dark:text-teal-400 font-medium truncate">
                  KKT AgroFarm & UTDI Lab
                </span>
              </div>
            </div>
          </div>

          {/* Central Segmented View Mode Toggle */}
          <div className="hidden lg:flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setViewMode('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                viewMode === 'admin'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t.dashboard}</span>
            </button>
            <button
              onClick={() => setViewMode('consumer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                viewMode === 'consumer'
                  ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.consumerMode}</span>
            </button>
          </div>

          {/* Right Action Tools & Controls */}
          <div className="flex items-center gap-2">
            
            {/* Quick Action Buttons Group */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              {/* QR Camera Scanner */}
              <button
                onClick={onOpenQrScanner}
                className="text-xs px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition flex items-center gap-1.5"
                title={t.scannerMode}
              >
                <Camera className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="hidden xl:inline">{t.scannerMode}</span>
              </button>

              {/* Quality & Governance Rules */}
              <button
                onClick={onOpenGovernance}
                className="text-xs px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition flex items-center gap-1.5"
                title="Aturan Validasi Mutu & HACCP"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden xl:inline">Aturan Validasi</span>
              </button>

              {/* Audit Ledger */}
              <button
                onClick={onOpenAuditLogs}
                className="text-xs px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white font-medium transition flex items-center gap-1.5 relative"
                title="Buku Catatan Audit Rantai Pasok"
              >
                <History className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="hidden xl:inline">Log Audit</span>
                {auditLogCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 rounded-full font-mono text-[10px] font-bold">
                    {auditLogCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Mode Switcher Icon Button */}
            <button
              onClick={() => setViewMode(viewMode === 'admin' ? 'consumer' : 'admin')}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              title={viewMode === 'admin' ? t.consumerMode : t.dashboard}
            >
              {viewMode === 'admin' ? (
                <Smartphone className="w-4 h-4 text-amber-500" />
              ) : (
                <LayoutDashboard className="w-4 h-4 text-teal-600" />
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200/80 dark:border-slate-700 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
              {['id', 'ms', 'en'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase transition ${
                    lang === l
                      ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Primary CTA: New Batch */}
            {viewMode === 'admin' && (
              <button
                onClick={onOpenNewBatch}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shadow-teal-700/20 hover:shadow-md hover:shadow-teal-700/30 transition-all duration-200 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">{t.newBatch}</span>
                <span className="sm:hidden">Batch</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
