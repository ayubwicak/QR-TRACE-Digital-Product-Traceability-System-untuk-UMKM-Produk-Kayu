import React, { useState } from 'react';
import { 
  QrCode, 
  ShieldCheck, 
  Leaf, 
  Search, 
  ArrowRight, 
  LogIn, 
  UserPlus, 
  Camera, 
  CheckCircle2, 
  Layers, 
  ChevronRight,
  Database,
  ExternalLink
} from 'lucide-react';

export default function LandingView({ 
  batches = [], 
  auditLogs = [],
  onOpenLogin, 
  onOpenRegister, 
  onGoToDashboard,
  onOpenScanner,
  onSelectBatch,
  onSimulateScan
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered preview batches
  const filteredBatches = batches.filter(b => {
    const matchQuery = b.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       b.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       b.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'all') return matchQuery;
    return matchQuery && b.category.toLowerCase().includes(activeTab.toLowerCase());
  });

  // Calculate summary stats
  const totalBatches = batches.length;
  const avgQcScore = batches.length > 0
    ? (batches.reduce((acc, b) => acc + (b.qcScore || 0), 0) / batches.length).toFixed(1)
    : '98.5';
  
  const totalEcoCount = batches.filter(b => b.carbonRating === 'A' || b.carbonRating === 'B').length;

  return (
    <div className="space-y-12 pb-12">
      
      {/* SECTION 1: CLEAN HERO SECTION */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xs">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400"></span>
            <span>Sistem Ketertelusuran Produk Rantai Pasok & Paspor Digital</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
            Transparansi Mutu Produk & Verifikasi Paspor Digital QR Trace
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Platform verifikasi keaslian produk, pengujian mutu rantai pasok dari asal ladang/pemasok, 
            pencatatan audit ledger, serta transparansi jejak karbon ESG.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenLogin}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-slate-500" />
              <span>Daftar Akun Baru</span>
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Database PostgreSQL</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Audit Kriptografi SHA-256</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-teal-600" />
              <span>Sertifikasi ESG & Karbon</span>
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 2: STATS SUMMARY BAR */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
            <QrCode className="w-5 h-5 text-teal-700 dark:text-teal-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{totalBatches}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Total Batch Didaftarkan</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{avgQcScore}%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Rata-Rata Mutu (QC)</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-teal-700 dark:text-teal-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{totalEcoCount} Produk</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Rating Karbon Eco A/B</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5 text-teal-700 dark:text-teal-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{auditLogs.length} Log</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Ledger Audit Rantai Pasok</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SYSTEM CAPABILITIES & FEATURES */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Fitur Utama Sistem QR Trace
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Modul pengawasan mutu, ketertelusuran bahan baku, dan paspor digital konsumen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs mb-3">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Paspor Produk Digital & QR Code
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Generasi stiker kemasan QR yang dapat dipindai oleh konsumen untuk melihat asal bahan, tanggal panen, dan sertifikat keaslian.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs mb-3">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Ketertelusuran Bahan Baku
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pelacakan bahan baku dari pemasok awal, lokasi ladang panen, pengujian laboratorium, hingga tahap pengemasan akhir.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs mb-3">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Jejak Karbon & Rating ESG
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Estimasi emisi gas rumah kaca per unit produk dengan sistem pemeringkatan ekologis untuk standar industri keberlanjutan.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs mb-3">
              04
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Catatan Ledger Audit
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Buku log permanen yang mencatat setiap aktivitas pendaftaran dan pembaruan batch dengan verifikasi hash SHA-256.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs mb-3">
              05
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Validasi Kepatuhan Mutu HACCP
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Aturan otorisasi otomatis yang memeriksa batas suhu, masa kadaluarsa, dan dokumen mutu sebelum batch diterbitkan.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs mb-3">
              06
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Pemindai QR Kamera Browser
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Kemudahan melakukan scan stiker produk secara langsung dari webcam laptop atau kamera smartphone tanpa perlu aplikasi tambahan.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: WORKFLOW STEPS */}
      <section className="bg-slate-100 dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Alur Kerja Sistem
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Proses pengelolaan paspor digital produk dalam 4 tahap
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-1">Langkah 1</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Registrasi Batch</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Input data produk, komposisi bahan baku, dan riwayat panen.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-1">Langkah 2</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Verifikasi Mutu & Hash</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Pemeriksaan batas mutu QC dan pembentukan hash unik.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-1">Langkah 3</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Cetak Stiker QR</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Label stiker QR dicetak dan Ditempelkan pada Kemasan fisik.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-1">Langkah 4</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Pemindaian Paspor</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Konsumen memindai QR untuk memverifikasi keaslian produk.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: PUBLIC PRODUCT CATALOG PREVIEW */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Pratinjau Produk Terdaftar
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Daftar sampel batch produk yang aktif dalam basis data sistem
            </p>
          </div>

          <button
            onClick={onGoToDashboard}
            className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 flex items-center gap-1 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <span>Katalog Lengkap</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari produk atau batch..."
              className="w-full pl-9 pr-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
            {['all', 'F&B', 'Personal Care', 'Nutraceutical'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  activeTab === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat === 'all' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBatches.map((b) => (
            <div
              key={b.batchNumber}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                      {b.batchNumber}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5 line-clamp-1">
                      {b.productName}
                    </h3>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Rating {b.carbonRating || 'A'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {b.story || 'Produk terverifikasi mutunya dengan sertifikasi lengkap.'}
                </p>

                <div className="flex items-center justify-between text-[11px] bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                  <span className="text-slate-500">QC Score: <strong className="text-teal-700 dark:text-teal-400">{b.qcScore || 98}%</strong></span>
                  <span className="text-slate-500 truncate max-w-[140px]">{b.producerName || 'KKT AgroFarm'}</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectBatch(b)}
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-400 flex items-center gap-1 cursor-pointer"
                >
                  <span>Rincian</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSimulateScan(b)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-1 transition cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Uji Paspor</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: SIMPLE FOOTER CTA */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center space-y-3">
        <h2 className="text-xl font-bold tracking-tight">
          Kelola Ketertelusuran Produk Anda Sekarang
        </h2>
        <p className="text-slate-300 text-xs max-w-md mx-auto">
          Masuk ke akun Anda untuk menginput batch baru, mencetak stiker QR kemasan, dan mengunduh sertifikat mutu.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenLogin}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Sekarang</span>
          </button>

          <button
            onClick={onOpenRegister}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Akun</span>
          </button>
        </div>
      </section>

    </div>
  );
}
