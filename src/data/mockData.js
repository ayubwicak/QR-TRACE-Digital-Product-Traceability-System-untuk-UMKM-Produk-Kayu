export const INITIAL_BATCHES = [
  {
    batchNumber: 'BATCH-2026-X01',
    productName: 'Meja Kopi Kayu Jati Solid',
    category: 'Furnitur Kayu',
    brand: 'Temerloh Kayu Lestari',
    sku: 'TKL-MKJ-001',
    image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&w=600&q=80',
    manufactureDate: '2026-10-01',
    expiryDate: '2028-10-01',
    qcStatus: 'Lolos Pemeriksaan Mutu (Grade A)',
    qcInspector: 'Ahmad Faiz, S.T. (Petugas Kontrol Mutu)',
    qcScore: 98.4,
    carbonFootprint: '18.4 kg CO₂e / unit',
    carbonRating: 'Kategori Hijau (Rendah Emisi)',
    verificationHash: '0x8f7a9d2c1e4b3a6f8810e927c44d18fa',
    story: 'Meja kopi dibuat oleh pengrajin UMKM Temerloh menggunakan kayu jati dari pemasok dengan dokumen asal-usul yang tercatat. Paspor ini merangkum perjalanan kayu, proses pengerjaan, pemeriksaan mutu, dan informasi perawatan produk.',
    materials: [
      { name: 'Papan kayu jati oven-kering', origin: 'Temerloh, Pahang', supplier: 'Penggergajian Kayu Lestari', batchRef: 'KAY-JATI-881', verified: true },
      { name: 'Minyak pelapis berbasis air', origin: 'Pemasok bahan finishing lokal', supplier: 'Finishing Aman Nusantara', batchRef: 'FIN-WTR-102', verified: true },
      { name: 'Sekrup dan sambungan logam', origin: 'Pusat komponen furnitur', supplier: 'Komponen Perabot Temerloh', batchRef: 'KMP-SS-204', verified: true }
    ],
    timeline: [
      { step: 'Penerimaan kayu dan verifikasi dokumen', date: '25 Sep 2026', operator: 'Petugas Penerimaan Bahan', desc: 'Jenis kayu, volume, pemasok, dan dokumen asal-usul dicocokkan dengan catatan pembelian.', done: true },
      { step: 'Pengeringan dan pemotongan', date: '28 Sep 2026', operator: 'Operator Produksi', desc: 'Kayu dikeringkan dan dipotong sesuai ukuran kerja; kadar air dicatat sebelum proses perakitan.', done: true },
      { step: 'Perakitan, pengamplasan, dan finishing', date: '29 Sep 2026', operator: 'Tim Pengrajin', desc: 'Komponen dirakit, sambungan diperiksa, lalu permukaan diamplas dan diberi lapisan finishing.', done: true },
      { step: 'Pemeriksaan akhir dan penerbitan QR', date: '01 Okt 2026', operator: 'Petugas Kontrol Mutu', desc: 'Dimensi, kestabilan, kualitas permukaan, dan identitas batch diperiksa sebelum label QR dipasang.', done: true }
    ],
    aiAnalysis: {
      confidenceScore: 98.5,
      riskLevel: 'AMAN',
      ruleChecked: 'Semua Standar Mutu Terpenuhi',
      anomalyDetected: false,
      summary: 'Data asal kayu, pemasok, tahapan pengerjaan, dan hasil pemeriksaan produk tercatat konsisten.',
      ecoScoreRecommendation: 'Catat spesies, volume, jarak angkut, dan dokumen legalitas bahan untuk memperkuat informasi dampak lingkungan.'
    }
  },
  {
    batchNumber: 'BATCH-2026-B02',
    productName: 'Kursi Makan Kayu Mahoni',
    category: 'Furnitur Kayu',
    brand: 'Bengkel Perabot Mahoni',
    sku: 'BPM-KMM-002',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    manufactureDate: '2026-10-02',
    expiryDate: '2028-10-02',
    qcStatus: 'Lolos Pemeriksaan Mutu (Grade A+)',
    qcInspector: 'Siti Nurhaliza (Inspektur Produk)',
    qcScore: 99.1,
    carbonFootprint: '12.7 kg CO₂e / unit',
    carbonRating: 'Kategori Hijau (Rendah Emisi)',
    verificationHash: '0x3c91e847a102b55f9a2e6178cd92b450',
    story: 'Kursi makan mahoni diproduksi dalam skala UMKM dengan sambungan kayu yang diperiksa sebelum finishing. Catatan batch menghubungkan bahan dari pemasok hingga produk siap kirim.',
    materials: [
      { name: 'Kayu mahoni gergajian', origin: 'Kilang kayu berdaftar, Pahang', supplier: 'Pembekal Kayu Mahoni Setempat', batchRef: 'KAY-MHN-909', verified: true },
      { name: 'Perekat sambungan kayu', origin: 'Pemasok bahan pertukangan', supplier: 'Bahan Bina Pilihan', batchRef: 'PRK-WD-334', verified: true },
      { name: 'Bantalan kaki pelindung lantai', origin: 'Pemasok komponen furnitur', supplier: 'Aksesori Perabot Lestari', batchRef: 'AKS-FTR-115', verified: true }
    ],
    timeline: [
      { step: 'Verifikasi kayu dan pemotongan komponen', date: '27 Sep 2026', operator: 'Operator Pemotongan', desc: 'Ukuran komponen dicocokkan dengan lembar kerja dan sisa potongan dicatat untuk mengurangi limbah.', done: true },
      { step: 'Pembentukan sambungan dan perakitan', date: '30 Sep 2026', operator: 'Tim Perakitan', desc: 'Sambungan diperiksa kesikuannya dan kursi diuji kestabilannya sebelum permukaan dirapikan.', done: true },
      { step: 'Pengamplasan dan pelapisan akhir', date: '01 Okt 2026', operator: 'Tim Finishing', desc: 'Permukaan diamplas bertahap dan lapisan akhir diperiksa agar rata serta bebas cacat visual.', done: true },
      { step: 'Pemeriksaan beban dan pelabelan QR', date: '02 Okt 2026', operator: 'Petugas Kontrol Mutu', desc: 'Konstruksi, sambungan, dan identitas produk diperiksa sebelum label paspor QR dipasang.', done: true }
    ],
    aiAnalysis: {
      confidenceScore: 99.2,
      riskLevel: 'AMAN',
      ruleChecked: 'Semua Standar Mutu Terpenuhi',
      anomalyDetected: false,
      summary: 'Dokumen pemasok, urutan proses, dan hasil pemeriksaan sambungan kursi tercatat tanpa perbedaan.',
      ecoScoreRecommendation: 'Catat pemanfaatan kembali potongan kayu dan jenis finishing untuk melengkapi data keberlanjutan.'
    }
  },
  {
    batchNumber: 'BATCH-2026-F03',
    productName: 'Talenan Kayu Akasia',
    category: 'Kerajinan Kayu',
    brand: 'Karya Kayu Komuniti',
    sku: 'KKK-TKA-003',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
    manufactureDate: '2026-10-03',
    expiryDate: '2028-10-03',
    qcStatus: 'Lolos Pemeriksaan Mutu (Grade A)',
    qcInspector: 'Hendra Wijaya (Petugas Kontrol Mutu)',
    qcScore: 97.5,
    carbonFootprint: '1.8 kg CO₂e / unit',
    carbonRating: 'Kategori Hijau (Rendah Emisi)',
    verificationHash: '0x7e29b451fa80c12e93d8b24168ee3a01',
    story: 'Talenan akasia dibuat dari potongan kayu yang dipilih dan dibentuk oleh pengrajin lokal. Paspor mencatat asal bahan, proses pengamplasan, lapisan pelindung, dan petunjuk perawatan.',
    materials: [
      { name: 'Papan kayu akasia', origin: 'Temerloh, Pahang', supplier: 'Pemasok Kayu Akasia Lokal', batchRef: 'KAY-AKS-404', verified: true },
      { name: 'Minyak pelindung permukaan', origin: 'Pemasok finishing berbasis air', supplier: 'Finishing Aman Nusantara', batchRef: 'FIN-ACA-088', verified: true }
    ],
    timeline: [
      { step: 'Pemeriksaan bahan dan pemilihan serat', date: '28 Sep 2026', operator: 'Pengrajin Kayu', desc: 'Papan akasia diperiksa dari retak, mata kayu, dan cacat permukaan sebelum dipotong.', done: true },
      { step: 'Pemotongan bentuk dan pembulatan tepi', date: '30 Sep 2026', operator: 'Operator Produksi', desc: 'Bentuk talenan dipotong sesuai pola, lalu tepi dibulatkan untuk kenyamanan penggunaan.', done: true },
      { step: 'Pengamplasan dan aplikasi minyak pelindung', date: '02 Okt 2026', operator: 'Tim Finishing', desc: 'Permukaan diamplas halus dan diberi lapisan pelindung sesuai spesifikasi bahan.', done: true },
      { step: 'Pemeriksaan permukaan dan penerbitan QR', date: '03 Okt 2026', operator: 'Petugas Kontrol Mutu', desc: 'Kerataan permukaan, ukuran, dan identitas batch diperiksa sebelum produk dikemas.', done: true }
    ],
    aiAnalysis: {
      confidenceScore: 97.8,
      riskLevel: 'AMAN',
      ruleChecked: 'Semua Standar Mutu Terpenuhi',
      anomalyDetected: false,
      summary: 'Asal papan, pemasok finishing, tahapan pengerjaan, dan pemeriksaan akhir tercatat dalam paspor produk.',
      ecoScoreRecommendation: 'Catat persentase pemanfaatan potongan kayu serta instruksi perawatan untuk mendukung umur pakai produk.'
    }
  }
];

export const WOOD_CATEGORY_ALIASES = {
  materials: ['kayu olahan', 'komponen kayu', 'processed wood', 'wood components'],
  furniture: ['furnitur', 'perabot', 'furniture'],
  crafts: ['kerajinan', 'kraf', 'craft']
};

export const matchesWoodCategory = (category, filter) => {
  if (filter === 'all') return true;
  const normalizedCategory = category.toLowerCase();
  return (WOOD_CATEGORY_ALIASES[filter] || []).some(alias => normalizedCategory.includes(alias));
};

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-1001',
    timestamp: '2026-10-01 08:30:12',
    actor: 'Ahmad Faiz (Petugas QC)',
    action: 'PERSETUJUAN_RILIS_BATCH',
    batchNumber: 'BATCH-2026-X01',
    details: 'Menyetujui rilis batch meja jati setelah verifikasi dokumen asal kayu dan hasil pemeriksaan mutu.',
    status: 'TERVERIFIKASI',
    hash: '0xa19f...44b1'
  },
  {
    id: 'LOG-1002',
    timestamp: '2026-10-01 08:31:05',
    actor: 'Sistem Validasi Otomatis',
    action: 'PEMERIKSAAN_SOP',
    batchNumber: 'BATCH-2026-X01',
    details: 'Pemeriksaan empat tahapan pembuatan meja jati selesai; pemasok, dimensi, dan pemeriksaan akhir tercatat.',
    status: 'TERCATAT',
    hash: '0x882c...91e0'
  },
  {
    id: 'LOG-1003',
    timestamp: '2026-10-02 14:15:40',
    actor: 'Siti Nurhaliza (Inspektur Produk)',
    action: 'VERIFIKASI_BAHAN_BAKU',
    batchNumber: 'BATCH-2026-B02',
    details: 'Konfirmasi dokumen asal kayu mahoni dan identitas lot dari pemasok terdaftar.',
    status: 'TERVERIFIKASI',
    hash: '0x32cf...e871'
  },
  {
    id: 'LOG-1004',
    timestamp: '2026-10-03 09:10:22',
    actor: 'Hendra Wijaya (Petugas Kontrol Mutu)',
    action: 'ESTIMASI_JEJAK_KARBON',
    batchNumber: 'BATCH-2026-F03',
    details: 'Data bahan dan estimasi jejak karbon talenan akasia ditinjau sebelum paspor produk diterbitkan.',
    status: 'TERVERIFIKASI',
    hash: '0xd410...56f2'
  }
];

export const AI_GOVERNANCE_RULES = [
  {
    id: 'ATURAN-01',
    name: 'Wajib Persetujuan Petugas Manusia (Human-in-the-Loop)',
    desc: 'Sistem otomatis hanya boleh memberikan saran pemeriksaan. Setiap perubahan status produk wajib dikonfirmasi langsung oleh Petugas QC.',
    enforcement: 'Pemeriksaan Ganda & Tanda Tangan Digital Petugas',
    status: 'AKTIF'
  },
  {
    id: 'ATURAN-02',
    name: 'Pencocokan Pemasok Terpercaya (Whitelist Verified)',
    desc: 'Data pemasok kayu, spesies, volume, lot, dan dokumen asal-usul harus dicatat agar perjalanan bahan dapat ditelusuri.',
    enforcement: 'Pengecekan Otomatis Daftar Pemasok Resmi',
    status: 'AKTIF'
  },
  {
    id: 'ATURAN-03',
    name: 'Standar Akurasi Pemeriksaan Minimal 85%',
    desc: 'Jika data hasil pengujian belum lengkap atau meragukan, sistem otomatis memberi peringatan untuk dilakukan uji laboratorium ulang.',
    enforcement: 'Peringatan Otomatis Uji Laboratorium Ulang',
    status: 'AKTIF'
  },
  {
    id: 'ATURAN-04',
    name: 'Perlindungan Data dari Pengubahan Liar',
    desc: 'Sistem tidak mengizinkan pengubahan data secara otomatis tanpa pencatatan waktu dan nama petugas penanggung jawab.',
    enforcement: 'Kunci Keamanan Sistem (Read-Only Mode)',
    status: 'AKTIF'
  },
  {
    id: 'ATURAN-05',
    name: 'Buku Catatan Digital yang Transparan (Audit Trail)',
    desc: 'Setiap aksi penerbitan batch, perbaikan data, atau persetujuan dicatat secara permanen dengan nomor tanda tangan digital.',
    enforcement: 'Buku Besar Log Terkunci Kriptografi',
    status: 'AKTIF'
  }
];
