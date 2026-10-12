import React, { useState } from 'react';
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
  Layers,
  Sparkles,
  BarChart3,
  FileCheck2,
  Lock,
  Globe2,
  Box,
  Truck,
  Building2,
  HelpCircle,
  Award,
  Clock,
  Smartphone
} from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function LandingView({ 
  batches = [], 
  auditLogs = [],
  onOpenLogin, 
  onOpenRegister, 
  onGoToDashboard,
  onSelectBatch,
  onSimulateScan,
  lang = 'id'
}) {
  const [activeCategoryTab, setActiveCategoryTab] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;

  const categoriesList = ['Semua', 'F&B / Agrikultur', 'Personal Care & Herbal', 'Nutraceutical / Superfood', 'Teknologi & Elektronik'];

  const filteredBatches = batches.filter(b => {
    const matchQuery = b.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       b.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       b.brand.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeCategoryTab === 'Semua') return matchQuery;
    return matchQuery && b.category.toLowerCase().includes(activeCategoryTab.toLowerCase());
  });

  const totalBatches = batches.length;
  const avgQcScore = batches.length > 0
    ? (batches.reduce((acc, b) => acc + (b.qcScore || 0), 0) / batches.length).toFixed(1)
    : '98.5';
  
  const totalEcoCount = batches.filter(b => b.carbonRating === 'A' || b.carbonRating === 'B').length;

  const faqs = [
    {
      q: 'Apa itu Paspor Produk Digital (Digital Product Passport - DPP)?',
      a: 'Paspor Produk Digital adalah identitas digital berbasis web yang merekam seluruh siklus hidup produk, mulai dari asal bahan mentah di ladang/pemasok, pengujian laboratorium mutu (QC), hingga jejak karbon ESG yang dapat diakses konsumen lewat satu kode QR.'
    },
    {
      q: 'Bagaimana sistem menjamin keaslian data dan anti-pemalsuan?',
      a: 'Setiap batch produk diberi cincangan kriptografi unik (SHA-256) yang tersimpan permanen dalam basis data PostgreSQL. Perubahan data dicatat dalam buku besar audit log yang tidak dapat dimanipulasi.'
    },
    {
      q: 'Apakah konsumen membutuhkan aplikasi khusus untuk memindai kode QR?',
      a: 'Tidak perlu. Konsumen cukup mengarahkan kamera smartphone atau browser standar ke kode QR pada kemasan produk untuk langsung membuka halaman paspor digital terverifikasi.'
    },
    {
      q: 'Bagaimana penjaminan mutu dan kepatuhan SOP diterapkan?',
      a: 'Sistem dilengkapi aturan validasi kepatuhan mutu (QC/QA SOP) berbasis Human-in-the-Loop yang memeriksa ambang batas suhu, masa kadaluarsa, serta sertifikasi lab sebelum produk dipublikasikan.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION (Clean & Modern SaaS Style) */}
      <section className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-14 lg:p-16 shadow-xs overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
            <span>Platform Paspor Produk Digital & Ketertelusuran Rantai Pasok Terpadu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Sistem Paspor Produk Digital yang Terhubung ke Seluruh Rantai Pasok
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Catat asal bahan baku, pantau hasil uji mutu laboratorium, dan terbitkan kode QR paspor digital dari satu sistem berbasis PostgreSQL. Setiap verifikasi langsung memperbarui data transparansi produk secara waktu nyata.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenLogin}
              className="px-7 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-teal-700/20 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk ke Sistem</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="px-7 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-slate-500" />
              <span>Daftar Akun Baru</span>
            </button>
          </div>

          {/* Quick Metrics Badges */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-100 dark:border-slate-800 text-left">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{totalBatches}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Batch Produk Terverifikasi</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{avgQcScore}%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Kepatuhan Mutu SOP (QC)</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-teal-600 dark:text-teal-400 font-mono">{totalEcoCount} Unit</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Rating Emisi Karbon Gred A/B</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/70 dark:border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{auditLogs.length} Entri</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Audit Ledger Kriptografi SHA-256</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. VALUE PROPOSITION PILLARS (Labamu-style 4 Core Cards) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Satu Platform untuk Seluruh Kebutuhan Ketertelusuran
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Integrasi alur bahan baku dari ladang, kepatuhan inspeksi mutu, hingga transparansi paspor produk untuk konsumen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3 hover:border-teal-500/50 transition">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Satu data untuk setiap laporan
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Komposisi bahan, riwayat pengolahan, dan hasil uji mutu bersumber dari transaksi database PostgreSQL yang sama sehingga seluruh tim bekerja selaras.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3 hover:border-teal-500/50 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Pantau rantai pasok dari mana saja
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Data tersimpan aman di sistem awan dan tersinkronisasi, memudahkan pemantauan batch produk dari perkebunan hingga pabrik pengemasan secara real-time.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3 hover:border-teal-500/50 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Mudah dipelajari sejak hari pertama
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Antarmuka intuitif dirancang sesuai alur kerja staf QC dan operator lapangan. Pembuatan batch dan pencetakan label QR dapat diselesaikan dalam hitungan detik.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3 hover:border-teal-500/50 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Kepatuhan ESG & Pasar Ekspor
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Memenuhi standar Digital Product Passport (DPP) Uni Eropa, ISO 22000, serta panduan keberlanjutan jejak karbon untuk memperluas jangkauan pasar internasional.
            </p>
          </div>

        </div>
      </section>

      {/* 3. STEP-BY-STEP PROCESS SECTION (Labamu numbered steps) */}
      <section className="bg-slate-100/70 dark:bg-slate-900/40 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-teal-700 dark:text-teal-400">
            Alur Terstruktur
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Sistem Ketertelusuran yang Bekerja dari Hulu ke Hilir
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="space-y-2">
            <div className="text-3xl font-extrabold text-teal-600/40 font-mono">01</div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Catat Asal Bahan Baku & Ladang
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Daftarkan bahan mentah dari mitra petani lokal, nomor referensi lot supplier, dan lokasi koordinat panen.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-extrabold text-teal-600/40 font-mono">02</div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Validasi SOP & Pengujian Laboratorium
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pemeriksaan skor mutu QC, batas toleransi suhu pengolahan, dan kalkulasi jejak karbon otomatis.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-extrabold text-teal-600/40 font-mono">03</div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Kunci Data dengan Hash SHA-256
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Setiap batch disahkan dengan stempel digital dan hash kriptografi yang tersimpan dalam ledger audit PostgreSQL.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-extrabold text-teal-600/40 font-mono">04</div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Terbitkan Paspor Digital & Cetak Label
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Cetak stiker kode QR untuk kemasan produk yang dapat dipindai langsung oleh konsumen di pasaran.
            </p>
          </div>

        </div>
      </section>

      {/* 4. MODULAR SOLUTIONS DIRECTORY (Labamu grid directory style) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-teal-700 dark:text-teal-400">
            Fitur Lengkap
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Semua Kebutuhan Paspor Digital dalam Satu Sistem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Paspor Produk</span>
              <QrCode className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Dynamic QR Digital Passport
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Halaman web responsif yang memuat seluruh transparansi produk tanpa perlu mengunduh aplikasi tambahan.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Rantai Pasok</span>
              <Box className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Multi-Tier Traceability
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Merekam daftar bahan mentah, nomor referensi lot petani, dan status verifikasi laboratorium pemasok.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Kelestarian</span>
              <Leaf className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Kalkulator Karbon & ESG
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pengukuran emisi transportasi, efisiensi energi terbarukan, dan pemberian rating ekologis ilmiah.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Keamanan Data</span>
              <Lock className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Ledger Audit Imutabel
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pencatatan riwayat perubahan data yang terkunci dengan tanda tangan hash SHA-256 tahan manipulasi.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Kepatuhan</span>
              <Award className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Sertifikat Digital (COA)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Penerbitan Sijil / Certificate of Analysis berstempel resmi yang dapat diunduh untuk audit regulasi.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Perangkat Lunak</span>
              <Smartphone className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Pemindai Kamera Terintegrasi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Memindai barcode/QR langsung melalui peramban laptop maupun ponsel untuk validasi instan di lapangan.
            </p>
          </div>

        </div>
      </section>

      {/* 5. LIVE PUBLIC SAMPLE CATALOG (Category Tab Filtered) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Sesuai untuk Berbagai Jenis Industri
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Contoh sampel produk yang telah terdaftar dalam sistem paspor digital
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder="Cari sampel produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategoryTab(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-xl transition whitespace-nowrap font-medium cursor-pointer ${
                activeCategoryTab === cat
                  ? 'bg-teal-700 text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredBatches.map(b => (
            <div 
              key={b.batchNumber}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:border-teal-500/50 transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img 
                    src={b.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80'} 
                    alt={b.productName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {b.batchNumber}
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Skor {b.qcScore}%
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-400">
                      {b.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {b.productName}
                    </h3>
                    <p className="text-[11px] text-slate-500">{b.brand}</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic whitespace-normal break-words">
                      "{b.story}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Emisi: {b.carbonFootprint}</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">{b.carbonRating}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onSelectBatch(b)}
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Lihat Rincian</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSimulateScan(b)}
                  className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer transition"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Paspor Digital</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION (Labamu FAQ Structure) */}
      <section className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pelajari lebih lanjut mengenai cara kerja dan standar sistem paspor digital QR Trace
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
                  <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-90 text-teal-600' : ''}`} />
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
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Siap Meningkatkan Nilai & Transparansi Produk Anda?
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Hubungkan rantai pasok produk Anda ke sistem paspor digital terpadu berbasis PostgreSQL. Verifikasi keaslian, penuhi standar ekspor, dan bangun kepercayaan konsumen.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={onOpenLogin}
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm transition shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Mulai Sekarang</span>
          </button>

          <button
            onClick={onOpenRegister}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Akun Baru</span>
          </button>
        </div>
      </section>

    </div>
  );
}
