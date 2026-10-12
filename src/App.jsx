import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingView from './components/LandingView';
import AuthModal from './components/AuthModal';
import StatsOverview from './components/StatsOverview';
import ProductCatalogView from './components/ProductCatalogView';
import BatchDetail from './components/BatchDetail';
import ConsumerView from './components/ConsumerView';
import NewBatchModal from './components/NewBatchModal';
import EditBatchModal from './components/EditBatchModal';
import AiGovernanceModal from './components/AiGovernanceModal';
import AuditTrailModal from './components/AuditTrailModal';
import LabelPrintModal from './components/LabelPrintModal';
import QrScannerModal from './components/QrScannerModal';
import EcoCalculatorModal from './components/EcoCalculatorModal';
import CertificateModal from './components/CertificateModal';
import Toast from './components/Toast';
import { INITIAL_BATCHES, INITIAL_AUDIT_LOGS } from './data/mockData';
import { TRANSLATIONS } from './data/i18n';
import { api } from './api';
import confetti from 'canvas-confetti';
import { ShieldCheck, Database, ArrowLeft, QrCode, ArrowRight, Globe2 } from 'lucide-react';

export default function App() {
  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('qrtrace_batches');
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('qrtrace_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Current authenticated user (null if guest/visitor)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('qrtrace_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [selectedBatch, setSelectedBatch] = useState(INITIAL_BATCHES[0]);
  // Initial View Mode: 'landing' (Informasi Sistem Pertama kali saat buka aplikasi)
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'catalog' | 'detail' | 'consumer'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [lang, setLang] = useState('id'); // 'id' | 'ms' | 'en'
  const [dbStatus, setDbStatus] = useState('CHECKING'); // 'CONNECTED' | 'OFFLINE'
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved : 'light';
  });

  // Auth Modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Modals state
  const [isNewBatchOpen, setIsNewBatchOpen] = useState(false);
  const [isEditBatchOpen, setIsEditBatchOpen] = useState(false);
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);
  const [isAuditLogsOpen, setIsAuditLogsOpen] = useState(false);
  const [isLabelPrintOpen, setIsLabelPrintOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isEcoCalcOpen, setIsEcoCalcOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  
  const [activeModalBatch, setActiveModalBatch] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  // Auth Handlers
  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthMode('register');
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('qrtrace_user', JSON.stringify(userData));
    showToast('Selamat Datang!', `Berhasil masuk sebagai ${userData.name} (${userData.role}).`);
    setViewMode('catalog'); // Navigate straight into Dashboard after login
  };

  const handleRegisterSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('qrtrace_user', JSON.stringify(userData));
    showToast('Pendaftaran Berhasil', `Selamat bergabung ${userData.name}! Akun Anda telah siap.`);
    setViewMode('catalog'); // Navigate straight into Dashboard after register
  };

  const handleGoToDashboard = () => {
    if (!currentUser) {
      showToast('Akses Terbatas', 'Silakan masuk terlebih dahulu untuk mengakses Dashboard.', 'info');
      handleOpenLogin();
    } else {
      setViewMode('catalog');
    }
  };

  const handleOpenNewBatchGuarded = () => {
    if (!currentUser) {
      showToast('Akses Terbatas', 'Silakan masuk terlebih dahulu untuk mendaftarkan batch baru.', 'info');
      handleOpenLogin();
    } else {
      setIsNewBatchOpen(true);
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    localStorage.removeItem('qrtrace_user');
    setViewMode('landing');
    showToast('Keluar dari Akun', 'Anda telah keluar dari akun.', 'info');
  };

  // Initial Database Sync from PostgreSQL
  useEffect(() => {
    async function loadDbData() {
      const health = await api.checkHealth();
      if (health.status === 'OK') {
        setDbStatus('CONNECTED');
        // Validasi sesi token user jika tersimpan
        if (api.getToken()) {
          const profile = await api.getMe();
          if (!profile) {
            // Token expired or invalid
            api.logout();
            setCurrentUser(null);
            localStorage.removeItem('qrtrace_user');
          }
        }
        const dbBatches = await api.getBatches();
        if (dbBatches && dbBatches.length > 0) {
          setBatches(dbBatches);
          setSelectedBatch(dbBatches[0]);
        }
        const dbLogs = await api.getAuditLogs();
        if (dbLogs && dbLogs.length > 0) {
          setAuditLogs(dbLogs);
        }
      } else {
        setDbStatus('OFFLINE');
      }
    }
    loadDbData();
  }, []);

  // Sync to localStorage as backup
  useEffect(() => {
    localStorage.setItem('qrtrace_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('qrtrace_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Handler: Select Batch to view Detail
  const handleSelectBatch = (batch) => {
    setSelectedBatch(batch);
    setViewMode('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Add New Batch
  const handleAddBatch = async (newBatch) => {
    setBatches([newBatch, ...batches]);
    setSelectedBatch(newBatch);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const newLog = {
      id: `LOG-${1000 + auditLogs.length + 1}`,
      timestamp: new Date().toLocaleString('id-ID'),
      actor: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Ahmad Faiz (Petugas QC)',
      action: 'REGISTRASI_PRODUK_BARU',
      batchNumber: newBatch.batchNumber,
      details: `Registrasi batch baru ${newBatch.productName} (${newBatch.materials.length} komponen bahan baku diverifikasi).`,
      status: 'TERCATAT',
      hash: newBatch.verificationHash.substring(0, 14) + '...'
    };
    setAuditLogs([newLog, ...auditLogs]);

    showToast('Produk Baru Didaftarkan', `Batch ${newBatch.batchNumber} berhasil disimpan ke basis data.`);

    await api.createBatch(newBatch);
    await api.createAuditLog(newLog);
  };

  // Handler: Save / Edit Batch
  const handleSaveBatch = async (updatedBatch) => {
    setBatches(batches.map(b => b.batchNumber === updatedBatch.batchNumber ? updatedBatch : b));
    setSelectedBatch(updatedBatch);

    const newLog = {
      id: `LOG-${1000 + auditLogs.length + 1}`,
      timestamp: new Date().toLocaleString('id-ID'),
      actor: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Petugas Kontrol Mutu',
      action: 'PEMBARUAN_DATA_PRODUK',
      batchNumber: updatedBatch.batchNumber,
      details: `Pembaruan rincian batch & rantai pasok (${updatedBatch.materials.length} bahan, ${updatedBatch.timeline.length} milestone).`,
      status: 'TERVERIFIKASI',
      hash: updatedBatch.verificationHash.substring(0, 14) + '...'
    };
    setAuditLogs([newLog, ...auditLogs]);

    showToast('Perubahan Disimpan', `Data batch ${updatedBatch.batchNumber} berhasil diperbarui.`);

    await api.updateBatch(updatedBatch.batchNumber, updatedBatch);
    await api.createAuditLog(newLog);
  };

  // Handler: Delete Batch
  const handleDeleteBatch = async (batchNumber) => {
    if (window.confirm(`Konfirmasi: Apakah Anda yakin ingin menghapus ${batchNumber}? Tindakan ini akan dicatat di buku audit ledger.`)) {
      const remaining = batches.filter(b => b.batchNumber !== batchNumber);
      setBatches(remaining);
      if (selectedBatch?.batchNumber === batchNumber && remaining.length > 0) {
        setSelectedBatch(remaining[0]);
      }
      setViewMode('catalog');

      const newLog = {
        id: `LOG-${1000 + auditLogs.length + 1}`,
        timestamp: new Date().toLocaleString('id-ID'),
        actor: currentUser ? currentUser.name : 'Admin Mutu',
        action: 'PENGARSIPAN_BATCH',
        batchNumber: batchNumber,
        details: `Batch ${batchNumber} dihapus/diarsipkan dari daftar aktif.`,
        status: 'TERARSIP',
        hash: `0x${Math.random().toString(16).substring(2, 10)}...`
      };
      setAuditLogs([newLog, ...auditLogs]);

      showToast('Batch Dihapus', `Batch ${batchNumber} telah diarsipkan dari sistem.`, 'info');

      await api.deleteBatch(batchNumber);
      await api.createAuditLog(newLog);
    }
  };

  // Handler: Update Eco Data
  const handleUpdateEcoData = async (batchNumber, ecoData) => {
    let updatedBatchObj = null;
    const updatedList = batches.map(b => {
      if (b.batchNumber === batchNumber) {
        updatedBatchObj = {
          ...b,
          carbonFootprint: ecoData.carbonFootprint,
          carbonRating: ecoData.carbonRating
        };
        return updatedBatchObj;
      }
      return b;
    });

    setBatches(updatedList);
    if (selectedBatch?.batchNumber === batchNumber && updatedBatchObj) {
      setSelectedBatch(updatedBatchObj);
    }

    const newLog = {
      id: `LOG-${1000 + auditLogs.length + 1}`,
      timestamp: new Date().toLocaleString('id-ID'),
      actor: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Auditor Lingkungan (ESG)',
      action: 'UPDATE_JEJAK_KARBON',
      batchNumber: batchNumber,
      details: `Pembaruan data jejak karbon: ${ecoData.carbonFootprint} (Rating ${ecoData.carbonRating}).`,
      status: 'TERVERIFIKASI',
      hash: `0x${Math.random().toString(16).substring(2, 10)}...`
    };
    setAuditLogs([newLog, ...auditLogs]);

    showToast('Rating Karbon Diperbarui', `Estimasi emisi baru diterapkan ke paspor produk.`);

    if (updatedBatchObj) {
      await api.updateBatch(batchNumber, updatedBatchObj);
    }
    await api.createAuditLog(newLog);
  };

  // Handler: Approve AI Suggestion
  const handleApproveAiSuggestion = async (batchNumber, recommendationText) => {
    let updatedBatchObj = null;
    const updatedList = batches.map(b => {
      if (b.batchNumber === batchNumber) {
        updatedBatchObj = {
          ...b,
          story: `${b.story} [Eco-Verified: ${recommendationText}]`
        };
        return updatedBatchObj;
      }
      return b;
    });

    setBatches(updatedList);
    if (selectedBatch?.batchNumber === batchNumber && updatedBatchObj) {
      setSelectedBatch(updatedBatchObj);
    }

    const newLog = {
      id: `LOG-${1000 + auditLogs.length + 1}`,
      timestamp: new Date().toLocaleString('id-ID'),
      actor: currentUser ? `${currentUser.name}` : 'Petugas QC Lapangan',
      action: 'PERSETUJUAN_DRAF_NARASI',
      batchNumber: batchNumber,
      details: `Rekomendasi narasi disetujui & dimasukkan ke paspor digital: "${recommendationText}".`,
      status: 'TERVERIFIKASI',
      hash: `0x${Math.random().toString(16).substring(2, 10)}...`
    };
    setAuditLogs([newLog, ...auditLogs]);

    showToast('Rekomendasi Disetujui', 'Narasi transparansi telah dimasukkan ke paspor produk.');

    if (updatedBatchObj) {
      await api.updateBatch(batchNumber, updatedBatchObj);
    }
    await api.createAuditLog(newLog);
  };

  // Handler: Reject AI Suggestion
  const handleRejectAiSuggestion = async (batchNumber) => {
    const newLog = {
      id: `LOG-${1000 + auditLogs.length + 1}`,
      timestamp: new Date().toLocaleString('id-ID'),
      actor: currentUser ? `${currentUser.name}` : 'Petugas QC Lapangan',
      action: 'PENOLAKAN_DRAF_NARASI',
      batchNumber: batchNumber,
      details: `Rekomendasi narasi untuk batch ${batchNumber} ditolak oleh operator dan dibatalkan.`,
      status: 'DITOLAK',
      hash: `0x${Math.random().toString(16).substring(2, 10)}...`
    };
    setAuditLogs([newLog, ...auditLogs]);
    showToast('Rekomendasi Ditolak', 'Draf saran dibatalkan dari sistem.', 'info');
    await api.createAuditLog(newLog);
  };

  // Handler: Simulate Consumer Scan
  const handleSimulateScan = (batch) => {
    setSelectedBatch(batch);
    setViewMode('consumer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Modal Openers
  const handleOpenLabelPrint = (batch) => {
    setActiveModalBatch(batch);
    setIsLabelPrintOpen(true);
  };

  const handleOpenEditBatch = (batch) => {
    setActiveModalBatch(batch);
    setIsEditBatchOpen(true);
  };

  const handleOpenCertificate = (batch) => {
    setActiveModalBatch(batch);
    setIsCertificateOpen(true);
  };

  const handleOpenEcoCalc = (batch) => {
    setActiveModalBatch(batch);
    setIsEcoCalcOpen(true);
  };

  const handleBatchScannedFromCamera = (batch) => {
    setSelectedBatch(batch);
    setViewMode('consumer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;
  const footerCopy = t.footer;

  // VIEW MODE: STANDALONE DEDICATED CONSUMER MOBILE PASSPORT
  if (viewMode === 'consumer') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-teal-500 selection:text-white">
        {/* Top Control Bar for Simulator / Return to Admin */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <button
              onClick={() => setViewMode('catalog')}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-teal-700 border border-slate-200 flex items-center gap-2 transition active:scale-95 shadow-xs whitespace-nowrap cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToAdmin}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-800">{t.consumerPassportPreview}</span>
            </div>

            {/* Quick Batch Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden md:inline">{t.chooseProduct}</span>
              <select
                value={selectedBatch?.batchNumber}
                onChange={(e) => {
                  const b = batches.find(item => item.batchNumber === e.target.value);
                  if (b) setSelectedBatch(b);
                }}
                className="text-xs bg-white border border-slate-200 text-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-teal-500 font-mono"
              >
                {batches.map(b => (
                  <option key={b.batchNumber} value={b.batchNumber}>
                    {b.productName} ({b.batchNumber})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Full Desktop Consumer Passport View */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl w-full mx-auto">
          <ConsumerView 
            batch={selectedBatch} 
            onBackToAdmin={() => setViewMode('catalog')} 
          />
        </main>

        <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200">
          QR Trace © {footerCopy.digitalPassport} • {t.consumerMode}
        </footer>

        {toast && (
          <Toast toast={toast} onClose={() => setToast(null)} />
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-ambient-dark' : 'bg-ambient-light'} text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300`}>
      
      <div>
        {/* Navbar */}
        <Navbar 
          viewMode={viewMode}
          onGoToLanding={() => setViewMode('landing')}
          onGoToDashboard={handleGoToDashboard}
          onOpenNewBatch={handleOpenNewBatchGuarded}
          onOpenGovernance={() => setIsGovernanceOpen(true)}
          onOpenAuditLogs={() => setIsAuditLogsOpen(true)}
          onOpenQrScanner={() => setIsQrScannerOpen(true)}
          onOpenLogin={handleOpenLogin}
          onOpenRegister={handleOpenRegister}
          currentUser={currentUser}
          onLogout={handleLogout}
          lang={lang}
          setLang={setLang}
          dbStatus={dbStatus}
          theme={theme}
          setTheme={setTheme}
          auditLogCount={auditLogs.length}
        />

        {/* Main Content Area */}
        <main className="mx-auto max-w-[1600px] space-y-8 px-4 py-8 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          
          {/* VIEW MODE 0: INFORMASI LENGKAP SISTEM (PERTAMA KALI) */}
          {viewMode === 'landing' && (
            <LandingView 
              batches={batches}
              auditLogs={auditLogs}
              onOpenLogin={handleOpenLogin}
              onOpenRegister={handleOpenRegister}
              onGoToDashboard={handleGoToDashboard}
              onOpenScanner={() => setIsQrScannerOpen(true)}
              onSelectBatch={handleSelectBatch}
              onSimulateScan={handleSimulateScan}
              dbStatus={dbStatus}
              lang={lang}
            />
          )}

          {/* DASHBOARD VIEWS (CATALOG & DETAIL) */}
          {(viewMode === 'catalog' || viewMode === 'detail') && (
            <>
              <section className="flex flex-col gap-3 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">
                    QR Trace / {t.workspace}
                  </p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    {viewMode === 'catalog' ? t.dashboardTitle : t.detailTitle}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {t.dashboardDescription}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-semibold sm:self-auto ${dbStatus === 'CONNECTED' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : dbStatus === 'OFFLINE' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                  <span className={`h-2 w-2 rounded-full ${dbStatus === 'CONNECTED' ? 'bg-emerald-500' : dbStatus === 'OFFLINE' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                  {dbStatus === 'CONNECTED' ? t.databaseConnected : dbStatus === 'OFFLINE' ? t.databaseOffline : t.databaseChecking}
                </span>
              </section>

              {/* Top Stats Overview */}
              <StatsOverview batches={batches} auditLogs={auditLogs} lang={lang} />

              {/* VIEW MODE 1: PRODUCT CATALOG DASHBOARD */}
              {viewMode === 'catalog' && (
                <ProductCatalogView 
                  batches={batches}
                  onSelectBatch={handleSelectBatch}
                  onOpenNewBatch={handleOpenNewBatchGuarded}
                  onOpenLabelPrint={handleOpenLabelPrint}
                  onOpenEditBatch={handleOpenEditBatch}
                  onDeleteBatch={handleDeleteBatch}
                  onSimulateScan={handleSimulateScan}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  lang={lang}
                />
              )}

              {/* VIEW MODE 2: BATCH DETAIL & TRACE */}
              {viewMode === 'detail' && (
                <BatchDetail 
                  batch={selectedBatch}
                  onBackToCatalog={() => setViewMode('catalog')}
                  onSimulateScan={handleSimulateScan}
                  onOpenLabelPrint={handleOpenLabelPrint}
                  onOpenEditBatch={handleOpenEditBatch}
                  onDeleteBatch={handleDeleteBatch}
                  onOpenCertificate={handleOpenCertificate}
                  onOpenEcoCalc={handleOpenEcoCalc}
                  onApproveAiSuggestion={handleApproveAiSuggestion}
                  onRejectAiSuggestion={handleRejectAiSuggestion}
                />
              )}
            </>
          )}

        </main>
      </div>

      {/* Global Modals */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
      />

      <NewBatchModal 
        isOpen={isNewBatchOpen}
        onClose={() => setIsNewBatchOpen(false)}
        onAddBatch={handleAddBatch}
        currentBatchCount={batches.length}
      />

      <EditBatchModal 
        isOpen={isEditBatchOpen}
        onClose={() => setIsEditBatchOpen(false)}
        batch={activeModalBatch || selectedBatch}
        onSaveBatch={handleSaveBatch}
      />

      <AiGovernanceModal 
        isOpen={isGovernanceOpen}
        onClose={() => setIsGovernanceOpen(false)}
      />

      <AuditTrailModal 
        isOpen={isAuditLogsOpen}
        onClose={() => setIsAuditLogsOpen(false)}
        auditLogs={auditLogs}
      />

      <LabelPrintModal 
        isOpen={isLabelPrintOpen}
        onClose={() => setIsLabelPrintOpen(false)}
        batch={activeModalBatch || selectedBatch}
      />

      <QrScannerModal 
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        batches={batches}
        onBatchScanned={handleBatchScannedFromCamera}
      />

      <EcoCalculatorModal 
        isOpen={isEcoCalcOpen}
        onClose={() => setIsEcoCalcOpen(false)}
        batch={activeModalBatch || selectedBatch}
        onUpdateEcoData={handleUpdateEcoData}
      />

      <CertificateModal 
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        batch={activeModalBatch || selectedBatch}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      <section className="mx-auto mt-14 w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex flex-col gap-5 rounded-3xl bg-blue-50 p-5 dark:bg-blue-950/40 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-sm">
              <QrCode className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">{footerCopy.helpTitle}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{footerCopy.helpDescription}</p>
            </div>
          </div>
          <button
            onClick={() => setIsQrScannerOpen(true)}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100 dark:border-blue-900 dark:bg-slate-900 dark:text-blue-300 dark:hover:bg-slate-800 sm:w-auto"
          >
            <QrCode className="h-4 w-4" />
            {footerCopy.openScanner}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <footer className="mt-10 w-full border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-[1600px] px-4 pb-8 pt-10 sm:px-6 sm:pt-12 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid grid-cols-1 gap-8 border-b border-slate-200 pb-8 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
            <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">QR Trace</h2>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">{footerCopy.digitalPassport}</p>
                </div>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
                {footerCopy.brandDescription}
              </p>
              <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <span className={`h-2 w-2 rounded-full ${dbStatus === 'CONNECTED' ? 'bg-emerald-500' : dbStatus === 'OFFLINE' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                {dbStatus === 'CONNECTED' ? footerCopy.systemConnected : dbStatus === 'OFFLINE' ? footerCopy.systemOffline : footerCopy.systemChecking}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">{footerCopy.quickLinks}</h3>
              <button onClick={() => setViewMode('landing')} className="w-fit text-left text-sm text-slate-600 transition hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300">{t.navHome}</button>
              <button onClick={handleGoToDashboard} className="w-fit text-left text-sm text-slate-600 transition hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300">{t.navDashboard}</button>
              <a href="#features" onClick={() => setViewMode('landing')} className="text-sm text-slate-600 transition hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300">{footerCopy.features}</a>
              <a href="#public-products" onClick={() => setViewMode('landing')} className="text-sm text-slate-600 transition hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300">{t.dashboard}</a>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">{footerCopy.features}</h3>
              <span className="text-sm text-slate-600 dark:text-slate-400">{footerCopy.productPassport}</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{footerCopy.supplyChain}</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{footerCopy.audit}</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{footerCopy.qualityCarbon}</span>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">{footerCopy.aboutProject}</h3>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">iPEC '26</p>
              <p className="text-sm leading-5 text-slate-600 dark:text-slate-400">
                {footerCopy.projectDescription}
              </p>
              <p className="text-xs leading-5 text-slate-500 dark:text-slate-500">
                Kolej Komuniti Temerloh & Universitas Teknologi Digital Indonesia
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-xs text-slate-500 dark:bg-slate-800/70 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p>© {new Date().getFullYear()} QR Trace. {footerCopy.copyright}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-1.5"><Database className="h-3.5 w-3.5" /> {footerCopy.secureData}</span>
              <span className="inline-flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5" /> {footerCopy.digitalPassport}</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
