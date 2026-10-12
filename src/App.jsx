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
import { api } from './api';
import confetti from 'canvas-confetti';
import { ShieldCheck, Database, ArrowLeft } from 'lucide-react';

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
  const [categoryFilter, setCategoryFilter] = useState('Semua');
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
              <span>Kembali ke Dashboard Utama</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-800">Pratinjau Paspor Digital (Tampilan HP)</span>
            </div>

            {/* Quick Batch Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden md:inline">Pilih Produk:</span>
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
          QR Trace © Paspor Digital Transparansi Produk • Mode Pemindaian Konsumen
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          
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

      {/* Professional Structured Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md text-slate-600 dark:text-slate-400 mt-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
            
            {/* Brand & Abstract (Col 1-5) */}
            <div className="md:col-span-5 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-none">
                    QR TRACE
                  </h3>
                  <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono font-semibold">
                    Digital Product Passport & Traceability
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Platform Paspor Produk Digital terintegrasi untuk ketertelusuran rantai pasok multi-tier, penjaminan mutu berbasis SOP, audit kriptografi SHA-256 terdesentralisasi, serta penghitungan jejak karbon ESG.
              </p>

              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>PostgreSQL System Ready</span>
              </div>
            </div>

            {/* Core Features / Pillars (Col 6-8) */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Fitur Utama
              </h4>
              <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>Paspor Digital & QR Dinamis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>Buku Besar Audit SHA-256</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>Pemeriksaan Mutu & SOP QC</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>Kalkulasi Emisi Karbon ESG</span>
                </li>
              </ul>
            </div>

            {/* Academic & Innovation Context (Col 9-12) */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Konteks Inovasi
              </h4>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-1.5 text-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  iPEC '26 (Innovative Product Exhibition & Competition)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Kolej Komuniti Temerloh & Universitas Teknologi Digital Indonesia
                </div>
                <div className="text-[10px] text-teal-700 dark:text-teal-400 font-mono font-medium pt-1">
                  Kategori: Teknologi, Digital & Kelestarian
                </div>
              </div>
            </div>

          </div>

          {/* Sub-footer / Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 dark:text-slate-500">
            <div>
              © {new Date().getFullYear()} QR Trace. Hak Cipta Terpelihara.
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px]">
              <span>ISO 22000</span>
              <span>•</span>
              <span>HACCP</span>
              <span>•</span>
              <span>EU DPP Standards</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
