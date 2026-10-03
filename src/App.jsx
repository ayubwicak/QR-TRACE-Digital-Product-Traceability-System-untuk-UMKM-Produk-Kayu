import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
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
import { ShieldCheck, Database, Heart, ArrowLeft } from 'lucide-react';

export default function App() {
  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('qrtrace_batches');
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('qrtrace_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [selectedBatch, setSelectedBatch] = useState(INITIAL_BATCHES[0]);
  const [viewMode, setViewMode] = useState('catalog'); // 'catalog' | 'detail' | 'consumer'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [lang, setLang] = useState('id'); // 'id' | 'ms' | 'en'
  const [dbStatus, setDbStatus] = useState('CHECKING'); // 'CONNECTED' | 'OFFLINE'
  const [toast, setToast] = useState(null);

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

  // Initial Database Sync from PostgreSQL
  useEffect(() => {
    async function loadDbData() {
      const health = await api.checkHealth();
      if (health.status === 'OK') {
        setDbStatus('CONNECTED');
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
      actor: 'Ahmad Faiz (Petugas QC)',
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
      actor: 'Petugas Kontrol Mutu',
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
        actor: 'Admin Mutu',
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
      actor: 'Auditor Lingkungan (ESG)',
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
      actor: 'Petugas QC Lapangan',
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
      actor: 'Petugas QC Lapangan',
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      
      <div>
        {/* Navbar */}
        <Navbar 
          viewMode={viewMode}
          setViewMode={setViewMode}
          onOpenNewBatch={() => setIsNewBatchOpen(true)}
          onOpenGovernance={() => setIsGovernanceOpen(true)}
          onOpenAuditLogs={() => setIsAuditLogsOpen(true)}
          onOpenQrScanner={() => setIsQrScannerOpen(true)}
          lang={lang}
          setLang={setLang}
          dbStatus={dbStatus}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          
          {/* Top Stats Overview */}
          <StatsOverview batches={batches} auditLogs={auditLogs} />

          {/* VIEW MODE 1: PRODUCT CATALOG */}
          {viewMode === 'catalog' && (
            <ProductCatalogView 
              batches={batches}
              onSelectBatch={handleSelectBatch}
              onOpenNewBatch={() => setIsNewBatchOpen(true)}
              onOpenLabelPrint={handleOpenLabelPrint}
              onOpenEditBatch={handleOpenEditBatch}
              onDeleteBatch={handleDeleteBatch}
              onSimulateScan={handleSimulateScan}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
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

          {/* VIEW MODE 3: CONSUMER MOBILE PASSPORT */}
          {viewMode === 'consumer' && (
            <div className="max-w-md mx-auto">
              <ConsumerView 
                batch={selectedBatch} 
                onBackToAdmin={() => setViewMode('catalog')} 
              />
            </div>
          )}

        </main>
      </div>

      {/* Global Modals */}
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

      {/* Clean Human-Centered Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>QR Trace • Sistem Paspor Produk & Ketertelusuran Rantai Pasok</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <Database className="w-3.5 h-3.5 text-slate-400" />
            <span>Terhubung ke Database <strong>PostgreSQL Live</strong></span>
          </div>
        </div>
      </footer>

    </div>
  );
}
