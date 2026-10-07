import React from 'react';
import { 
  QrCode, 
  ShieldCheck, 
  History, 
  Plus, 
  Camera, 
  Globe, 
  Database, 
  Sun, 
  Moon,
  LogIn,
  UserPlus,
  LogOut,
  Info,
  LayoutDashboard
} from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function Navbar({ 
  viewMode,
  onGoToLanding,
  onGoToDashboard,
  onOpenNewBatch, 
  onOpenGovernance, 
  onOpenAuditLogs,
  onOpenQrScanner,
  onOpenLogin,
  onOpenRegister,
  currentUser,
  onLogout,
  lang,
  setLang,
  dbStatus,
  theme,
  setTheme,
  auditLogCount = 0
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-3">
          
          {/* Brand & Navigation */}
          <div className="flex items-center gap-3 shrink-0">
            <div 
              className="relative group cursor-pointer shrink-0" 
              onClick={onGoToLanding}
              title="Informasi Beranda Utama System"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-500 text-white flex items-center justify-center font-bold shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
            </div>

            <div className="flex flex-col justify-center select-none">
              {/* Line 1: Title + Badges */}
              <div className="flex items-center gap-2 whitespace-nowrap">
                <h1 
                  className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-none cursor-pointer"
                  onClick={onGoToLanding}
                >
                  QR Trace
                </h1>
                <span className="text-[10px] font-semibold font-mono text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/80 px-2 py-0.5 rounded-full leading-none">
                  Paspor Digital
                </span>

                {/* Database Connection Pill */}
                <div className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full border leading-none transition-colors ${
                  dbStatus === 'CONNECTED'
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dbStatus === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <Database className="w-2.5 h-2.5" />
                  <span>{dbStatus === 'CONNECTED' ? 'PostgreSQL' : 'Lokal'}</span>
                </div>
              </div>

              {/* Line 2: Navigation Switcher */}
              <div className="flex items-center gap-2 text-[11px] whitespace-nowrap mt-1 leading-none">
                <button
                  onClick={onGoToLanding}
                  className={`font-semibold flex items-center gap-1 transition ${
                    viewMode === 'landing' 
                      ? 'text-teal-700 dark:text-teal-400 underline decoration-2' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  <Info className="w-3 h-3" />
                  <span>Info Sistem</span>
                </button>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <button
                  onClick={onGoToDashboard}
                  className={`font-semibold flex items-center gap-1 transition ${
                    viewMode === 'catalog' || viewMode === 'detail'
                      ? 'text-teal-700 dark:text-teal-400 underline decoration-2' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  <LayoutDashboard className="w-3 h-3" />
                  <span>Dashboard</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Action Tools & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Quick Action Buttons Group */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              {/* QR Camera Scanner */}
              <button
                onClick={onOpenQrScanner}
                className="text-xs px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition flex items-center gap-1.5 whitespace-nowrap"
                title="Buka Kamera Pemindai QR"
              >
                <Camera className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span className="hidden lg:inline whitespace-nowrap">{t.scannerMode}</span>
              </button>

              {/* Quality & Governance Rules */}
              <button
                onClick={onOpenGovernance}
                className="text-xs px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition flex items-center gap-1.5 whitespace-nowrap"
                title="Aturan Validasi Mutu & HACCP"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="hidden lg:inline whitespace-nowrap">{t.aiRules}</span>
              </button>

              {/* Audit Ledger */}
              <button
                onClick={onOpenAuditLogs}
                className="text-xs px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white font-medium transition flex items-center gap-1.5 relative whitespace-nowrap"
                title="Catatan Audit Rantai Pasok"
              >
                <History className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                <span className="hidden lg:inline whitespace-nowrap">{t.auditLedger}</span>
                {auditLogCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 rounded-full font-mono text-[10px] font-bold">
                    {auditLogCount}
                  </span>
                )}
              </button>
            </div>

            {/* Auth Section: User Badge or Login/Register Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/90 pl-2.5 pr-1.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex flex-col text-right hidden sm:flex leading-tight">
                  <span className="font-bold text-slate-800 dark:text-slate-100 text-[11px] truncate max-w-[100px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-teal-700 dark:text-teal-400 font-medium">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900 transition"
                  title="Keluar dari akun (Logout)"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenLogin}
                  className="bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition cursor-pointer whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Masuk</span>
                </button>
                <button
                  onClick={onOpenRegister}
                  className="bg-teal-50 dark:bg-teal-950/80 hover:bg-teal-100 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold px-3 py-1.5 rounded-xl hidden md:flex items-center gap-1 transition cursor-pointer whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Daftar</span>
                </button>
              </div>
            )}

            {/* Language Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200/80 dark:border-slate-700 text-xs shrink-0">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1 shrink-0" />
              {['id', 'ms', 'en'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase transition whitespace-nowrap ${
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
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition shrink-0"
              title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Primary CTA: New Batch */}
            <button
              onClick={onOpenNewBatch}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm shadow-teal-700/20 hover:shadow-md hover:shadow-teal-700/30 transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
              title="Tambah Batch Produk Baru"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">{t.newBatch}</span>
              <span className="sm:hidden whitespace-nowrap">Batch</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
