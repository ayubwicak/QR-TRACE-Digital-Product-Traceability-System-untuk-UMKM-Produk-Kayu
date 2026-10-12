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
  const footerCopy = t.footer;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="min-h-16 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2">
          
          {/* Brand & Navigation */}
          <div className="flex items-center gap-3 shrink-0">
            <div 
              className="relative group cursor-pointer shrink-0" 
              onClick={onGoToLanding}
              title="QR Trace"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm shadow-blue-700/15 group-hover:bg-blue-700 transition-colors duration-200">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
            </div>

            <div className="flex flex-col justify-center select-none">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <h1 
                  className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-none cursor-pointer"
                  onClick={onGoToLanding}
                >
                  QR Trace
                </h1>
              </div>
              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300 sm:block">
                {footerCopy.digitalPassport}
              </span>
            </div>
          </div>

          <nav aria-label={t.mainNavigation} className="hidden items-center gap-1 xl:flex">
            <button
              onClick={onGoToLanding}
              aria-current={viewMode === 'landing' ? 'page' : undefined}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${viewMode === 'landing' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`}
            >
              {t.navHome}
            </button>
            <button
              onClick={onGoToDashboard}
              aria-current={viewMode === 'catalog' || viewMode === 'detail' ? 'page' : undefined}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${viewMode === 'catalog' || viewMode === 'detail' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`}
            >
              {t.navDashboard}
            </button>
          </nav>

          {/* Right Action Tools & Controls */}
          <div className="ml-auto flex max-w-full flex-wrap items-center justify-end gap-1.5 sm:gap-2">
            
            {/* Quick Action Buttons Group (Only visible on dashboard / catalog / detail) */}
            {viewMode !== 'landing' && (
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                {/* QR Camera Scanner */}
                <button
                  onClick={onOpenQrScanner}
                  className="min-h-9 min-w-9 text-xs px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition flex items-center gap-1.5 whitespace-nowrap"
                  title={t.scanCameraPrompt}
                >
                  <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="hidden lg:inline whitespace-nowrap">{t.scannerMode}</span>
                </button>

                {/* Quality & Governance Rules */}
                <button
                  onClick={onOpenGovernance}
                  className="min-h-9 min-w-9 text-xs px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition flex items-center gap-1.5 whitespace-nowrap"
                  title={t.qualityRules}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="hidden lg:inline whitespace-nowrap">{t.aiRules}</span>
                </button>

                {/* Audit Ledger */}
                <button
                  onClick={onOpenAuditLogs}
                  className="text-xs px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white font-medium transition flex items-center gap-1.5 relative whitespace-nowrap"
                  title={t.auditTrail}
                >
                  <History className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span className="hidden lg:inline whitespace-nowrap">{t.auditLedger}</span>
                  {auditLogCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 rounded-full font-mono text-[10px] font-bold">
                      {auditLogCount}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Auth Section: User Badge or Login/Register Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/90 pl-2.5 pr-1.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex flex-col text-right hidden sm:flex leading-tight">
                  <span className="font-bold text-slate-800 dark:text-slate-100 text-[11px] truncate max-w-[100px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-400 font-medium">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900 transition cursor-pointer"
                  title={t.logout}
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
                  <LogIn className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{t.loginBtn}</span>
                </button>
                <button
                  onClick={onOpenRegister}
                  className="bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition cursor-pointer whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{t.registerBtn}</span>
                </button>
              </div>
            )}

            {/* Language Switcher */}
            <div className="flex min-h-9 items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200/80 dark:border-slate-700 text-xs shrink-0">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1 shrink-0" />
              {['id', 'ms', 'en'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase transition whitespace-nowrap cursor-pointer ${
                    lang === l
                      ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs'
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
              className="min-h-9 min-w-9 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition shrink-0 cursor-pointer"
              title={theme === 'dark' ? t.lightMode : t.darkMode}
              aria-label={t.toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Primary CTA: New Batch (Only visible on dashboard / catalog / detail) */}
            {viewMode === 'detail' && (
              <button
                onClick={onOpenNewBatch}
                className="min-h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm shadow-blue-700/15 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                title={t.newBatch}
              >
                <Plus className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">{t.newBatch}</span>
                <span className="sm:hidden whitespace-nowrap">{t.newBatch}</span>
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
