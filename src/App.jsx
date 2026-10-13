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
import {
  ADDITIONAL_WOOD_BATCHES,
  INITIAL_BATCHES,
  INITIAL_AUDIT_LOGS,
  migrateLegacyWoodBatches,
  withWoodSampleImages
} from './data/mockData';
import { TRANSLATIONS } from './data/i18n';
import { api } from './api';
import { getBatchNumberFromPassportPath } from './utils/passport';
import confetti from 'canvas-confetti';
import { ShieldCheck, Database, ArrowLeft, QrCode, ArrowRight, Globe2 } from 'lucide-react';

const LEGACY_SAMPLE_AUDIT_DETAILS = new Set([
  'Menyetujui rilis batch kopi setelah verifikasi hasil lab kadar air 11.2% dan uji aroma.',
  'Pemeriksaan 4 tahapan produksi selesai. Parameter suhu dan kebersihan memenuhi standar ISO 22000.',
  'Konfirmasi sertifikat analisis bahan VCO murni dari Koperasi Tani Makmur.',
  'Perhitungan jejak karbon 0.28 kg CO₂e diverifikasi memenuhi standar kampus ramah lingkungan.'
]);

const loadBatches = () => {
  const saved = localStorage.getItem('qrtrace_batches');
  if (!saved) {
    localStorage.setItem('qrtrace_wood_samples_v1_migrated', 'true');
    return INITIAL_BATCHES;
  }

  const savedBatches = JSON.parse(saved);
  const batches = withWoodSampleImages(migrateLegacyWoodBatches(savedBatches));

  if (localStorage.getItem('qrtrace_wood_samples_v2_migrated') !== 'true') {
    const existingBatchNumbers = new Set(batches.map(batch => batch.batchNumber));
    batches.push(...ADDITIONAL_WOOD_BATCHES.filter(batch => !existingBatchNumbers.has(batch.batchNumber)));
    localStorage.setItem('qrtrace_wood_samples_v2_migrated', 'true');
  }

  return batches;
};

const loadAuditLogs = () => {
  const saved = localStorage.getItem('qrtrace_audit_logs');
  if (!saved) return INITIAL_AUDIT_LOGS;

  const savedLogs = JSON.parse(saved);
  return savedLogs.map(log => {
    if (!LEGACY_SAMPLE_AUDIT_DETAILS.has(log.details)) return log;
    return INITIAL_AUDIT_LOGS.find(sample => sample.id === log.id) || log;
  });
};

const loadCurrentUser = () => {
  const saved = localStorage.getItem('qrtrace_user');
  if (!saved) return null;

  const user = JSON.parse(saved);
  return user.organization === 'KKT AgroFarm' || user.email === 'faiz@kktagrofarm.id'
    ? {
        ...user,
        organization: 'UMKM Produk Kayu',
        email: user.email === 'faiz@kktagrofarm.id' ? 'faiz@qrtrace.id' : user.email
      }
    : user;
};

export default function App() {
  const [batches, setBatches] = useState(loadBatches);
  const [passportBatchNumber] = useState(() => getBatchNumberFromPassportPath(window.location.pathname));
  const [publicPassportStatus, setPublicPassportStatus] = useState(passportBatchNumber ? 'loading' : 'idle');

  const [auditLogs, setAuditLogs] = useState(loadAuditLogs);

  // Current authenticated user (null if guest/visitor)
  const [currentUser, setCurrentUser] = useState(loadCurrentUser);

  const [selectedBatch, setSelectedBatch] = useState(INITIAL_BATCHES[0]);
  // Initial View Mode: 'landing' (Informasi Sistem Pertama kali saat buka aplikasi)
  const [viewMode, setViewMode] = useState(passportBatchNumber ? 'consumer' : 'landing'); // 'landing' | 'catalog' | 'detail' | 'consumer'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [lang, setLang] = useState('id'); // 'id' | 'ms' | 'en'
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
    setToast(null);
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
    setToast(null);
  };

  // Initial Database Sync from PostgreSQL
  useEffect(() => {
    async function loadDbData() {
      const health = await api.checkHealth();
      if (health.status === 'OK') {
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
          const batchesWithImages = withWoodSampleImages(dbBatches);
          setBatches(batchesWithImages);
          setSelectedBatch(passportBatchNumber
            ? batchesWithImages.find(batch => batch.batchNumber === passportBatchNumber) || batchesWithImages[0]
            : batchesWithImages[0]);
        }
        const dbLogs = await api.getAuditLogs();
        if (dbLogs && dbLogs.length > 0) {
          setAuditLogs(dbLogs);
        }
      }

      if (passportBatchNumber) {
        const verification = await api.verifyBatch(passportBatchNumber);
        const localBatch = loadBatches().find(batch => batch.batchNumber === passportBatchNumber);
        const passportBatch = verification.verified
          ? withWoodSampleImages([verification.batch])[0]
          : localBatch;

        if (passportBatch) {
          setSelectedBatch(passportBatch);
          setViewMode('consumer');
          setPublicPassportStatus('ready');
        } else {
          setPublicPassportStatus('not-found');
        }
      }
    }
    loadDbData();
  }, [passportBatchNumber]);

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

    showToast('Produk Baru Didaftarkan', `Batch ${newBatch.batchNumber} berhasil disimpan ke basis data.`);

    // Server otomatis mencatat audit log saat createBatch dipanggil
    const savedBatch = await api.createBatch(newBatch);

    // Sync state dengan data dari server (termasuk verificationHash yang dihitung server)
    if (savedBatch && savedBatch.batchNumber) {
      setBatches(prev => [savedBatch, ...prev.filter(b => b.batchNumber !== savedBatch.batchNumber)]);
    }

    // Refresh audit logs dari server
    const dbLogs = await api.getAuditLogs();
    if (dbLogs && dbLogs.length > 0) setAuditLogs(dbLogs);
  };

  // Handler: Save / Edit Batch
  const handleSaveBatch = async (updatedBatch) => {
    setBatches(batches.map(b => b.batchNumber === updatedBatch.batchNumber ? updatedBatch : b));
    setSelectedBatch(updatedBatch);

    showToast('Perubahan Disimpan', `Data batch ${updatedBatch.batchNumber} berhasil diperbarui.`);

    // Server otomatis mencatat audit log saat updateBatch dipanggil
    await api.updateBatch(updatedBatch.batchNumber, updatedBatch);

    // Refresh audit logs dari server
    const dbLogs = await api.getAuditLogs();
    if (dbLogs && dbLogs.length > 0) setAuditLogs(dbLogs);
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

      showToast('Batch Dihapus', `Batch ${batchNumber} telah diarsipkan dari sistem.`, 'info');

      // Server otomatis mencatat audit log saat deleteBatch dipanggil
      await api.deleteBatch(batchNumber);

      // Refresh audit logs dari server
      const dbLogs = await api.getAuditLogs();
      if (dbLogs && dbLogs.length > 0) setAuditLogs(dbLogs);
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

    showToast('Rating Karbon Diperbarui', `Estimasi emisi baru diterapkan ke paspor produk.`);

    if (updatedBatchObj) {
      await api.updateBatch(batchNumber, updatedBatchObj);
    }

    // Refresh audit logs dari server
    const dbLogs = await api.getAuditLogs();
    if (dbLogs && dbLogs.length > 0) setAuditLogs(dbLogs);
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

    showToast('Rekomendasi Disetujui', 'Narasi transparansi telah dimasukkan ke paspor produk.');

    if (updatedBatchObj) {
      await api.updateBatch(batchNumber, updatedBatchObj);
    }

    // Refresh audit logs dari server
    const dbLogs = await api.getAuditLogs();
    if (dbLogs && dbLogs.length > 0) setAuditLogs(dbLogs);
  };

  // Handler: Reject AI Suggestion
  const handleRejectAiSuggestion = async (batchNumber) => {
    showToast('Rekomendasi Ditolak', 'Draf saran dibatalkan dari sistem.', 'info');

    // Refresh audit logs dari server (server otomatis log saat reject)
    const dbLogs = await api.getAuditLogs();
    if (dbLogs && dbLogs.length > 0) setAuditLogs(dbLogs);
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
            {passportBatchNumber ? (
              <span className="text-sm font-bold text-slate-800">QR Trace · Paspor Produk Kayu</span>
            ) : (
              <button
                onClick={() => setViewMode('catalog')}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-teal-700 border border-slate-200 flex items-center gap-2 transition active:scale-95 shadow-xs whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.backToAdmin}</span>
              </button>
            )}

            {!passportBatchNumber && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-slate-800">{t.consumerPassportPreview}</span>
              </div>
            )}

            {/* Quick Batch Selector */}
            {!passportBatchNumber && (
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
            )}
          </div>
        </header>

        {/* Full Desktop Consumer Passport View */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl w-full mx-auto">
          {publicPassportStatus === 'loading' ? (
            <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">Memverifikasi paspor produk...</p>
          ) : publicPassportStatus === 'not-found' ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
              <h1 className="font-bold text-amber-950">Produk tidak ditemukan</h1>
              <p className="mt-2 text-sm text-amber-800">Nomor batch {passportBatchNumber} tidak terdaftar pada sistem QR Trace.</p>
            </div>
          ) : (
            <ConsumerView
              batch={selectedBatch}
              compactPreview={Boolean(passportBatchNumber)}
              onBackToAdmin={passportBatchNumber ? undefined : () => setViewMode('catalog')}
              passportBatchNumber={passportBatchNumber}
            />
          )}
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
              </section>

              {/* Top Stats Overview */}
              {viewMode === 'catalog' && (
                <StatsOverview batches={batches} auditLogs={auditLogs} lang={lang} />
              )}

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
