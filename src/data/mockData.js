const ORIGINAL_WOOD_BATCHES = [
  {
    batchNumber: 'BATCH-2026-X01',
    productName: 'Meja Kopi Kayu Jati Solid',
    category: 'Furnitur Kayu',
    brand: 'Temerloh Kayu Lestari',
    sku: 'TKL-MKJ-001',
    image: '/images/wood-batches/coffee-table.svg',
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
    image: '/images/wood-batches/dining-chair.svg',
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
    image: '/images/wood-batches/acacia-cutting-board.svg',
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

const createWoodSampleBatch = ({
  batchNumber,
  productName,
  category,
  brand,
  sku,
  image,
  manufactureDate,
  warrantyEndDate,
  qcStatus,
  qcInspector,
  qcScore,
  carbonFootprint,
  verificationHash,
  story,
  mainMaterial,
  supportingMaterials,
  process,
  inspection,
  recommendation
}) => ({
  batchNumber,
  productName,
  category,
  brand,
  sku,
  image,
  manufactureDate,
  expiryDate: warrantyEndDate,
  qcStatus,
  qcInspector,
  qcScore,
  carbonFootprint,
  carbonRating: 'Estimasi ilustratif (belum diverifikasi)',
  verificationHash,
  story,
  materials: [mainMaterial, ...supportingMaterials],
  timeline: [
    {
      step: 'Penerimaan kayu dan pemeriksaan dokumen',
      date: process.dates[0],
      operator: 'Petugas Penerimaan Bahan',
      desc: `Jenis kayu, volume, pemasok, dan referensi dokumen dicatat untuk batch ${batchNumber}.`,
      done: true
    },
    {
      step: 'Pengolahan dan pembentukan komponen',
      date: process.dates[1],
      operator: 'Operator Produksi',
      desc: process.description,
      done: true
    },
    {
      step: 'Perakitan dan finishing',
      date: process.dates[2],
      operator: 'Tim Pengrajin',
      desc: 'Komponen dirakit, permukaan dirapikan, dan finishing diperiksa sesuai spesifikasi produk.',
      done: true
    },
    {
      step: 'Pemeriksaan akhir dan penerbitan QR',
      date: manufactureDate,
      operator: 'Petugas Kontrol Mutu',
      desc: `${inspection} Produk diperiksa sebelum paspor QR diterbitkan.`,
      done: true
    }
  ],
  aiAnalysis: {
    confidenceScore: qcScore,
    riskLevel: 'PERLU_PERHATIAN',
    ruleChecked: 'Kelengkapan catatan asal bahan, proses, dan pemeriksaan',
    anomalyDetected: false,
    summary: `Data contoh ${productName}; dokumen pemasok dan hasil pemeriksaan tetap perlu diverifikasi oleh UMKM.`,
    ecoScoreRecommendation: recommendation
  }
});

export const ADDITIONAL_WOOD_BATCHES = [
  createWoodSampleBatch({
    batchNumber: 'BATCH-2026-L04',
    productName: 'Lemari Pakaian Kayu Jati Dua Pintu',
    category: 'Furnitur Kayu',
    brand: 'Jepara Kayu Karya',
    sku: 'JKK-LPJ-004',
    image: '/images/wood-batches/teak-wardrobe.svg',
    manufactureDate: '2026-10-06',
    warrantyEndDate: '2028-10-06',
    qcStatus: 'Lolos Pemeriksaan Mutu (Grade A)',
    qcInspector: 'Dian Prasetyo (Petugas Kontrol Mutu)',
    qcScore: 96.8,
    carbonFootprint: '24.6 kg CO₂e / unit (estimasi contoh)',
    verificationHash: '0xa12c77e49f314ab682e0d5c29bc8f471',
    story: 'Lemari dua pintu dibuat oleh bengkel furnitur skala UMKM. Paspor produk menghubungkan catatan kayu jati, proses pembuatan panel dan rangka, pemeriksaan pintu, serta panduan perawatan.',
    mainMaterial: { name: 'Kayu jati gergajian, 0,42 m³', origin: 'Jepara, Jawa Tengah', supplier: 'Koperasi Kayu Jepara Sejahtera', batchRef: 'JPR-JTI-26091 / dokumen pemasok', verified: false },
    supportingMaterials: [
      { name: 'Plywood untuk panel belakang', origin: 'Kudus, Jawa Tengah', supplier: 'Mitra Panel Nusantara', batchRef: 'PNL-26088', verified: false },
      { name: 'Engsel dan tarikan logam', origin: 'Pemasok komponen furnitur', supplier: 'Aksesori Perabot Jaya', batchRef: 'AKS-ENG-441', verified: false }
    ],
    process: {
      dates: ['02 Okt 2026', '03 Okt 2026', '05 Okt 2026'],
      description: 'Kayu dipotong untuk rangka dan panel, lalu ukuran komponen dicocokkan dengan gambar kerja.'
    },
    inspection: 'Kesikuan rangka, celah pintu, kekuatan engsel, dan kerataan lapisan permukaan diperiksa.',
    recommendation: 'Verifikasi dokumen asal kayu dan catat volume kayu masuk, hasil jadi, serta sisa potongan.'
  }),
  createWoodSampleBatch({
    batchNumber: 'BATCH-2026-R05',
    productName: 'Rak Buku Kayu Pinus Lima Susun',
    category: 'Furnitur Kayu',
    brand: 'Ruang Kayu UMKM',
    sku: 'RKU-RBP-005',
    image: '/images/wood-batches/pine-bookshelf.svg',
    manufactureDate: '2026-10-07',
    warrantyEndDate: '2028-10-07',
    qcStatus: 'Lolos Pemeriksaan Mutu (Grade A)',
    qcInspector: 'Rizky Ananda (Petugas Kontrol Mutu)',
    qcScore: 97.2,
    carbonFootprint: '9.3 kg CO₂e / unit (estimasi contoh)',
    verificationHash: '0x6bd40e82735a41f09cba6e1481207f53',
    story: 'Rak buku lima susun memanfaatkan papan pinus dari pemasok lokal. Catatan produksi mencakup identitas lot papan, pemotongan, kestabilan rak, dan pemeriksaan kapasitas sesuai spesifikasi bengkel.',
    mainMaterial: { name: 'Papan kayu pinus, 0,16 m³', origin: 'Bandung, Jawa Barat', supplier: 'Pemasok Kayu Pinus Lestari', batchRef: 'PIN-BDG-26114 / nota pembelian', verified: false },
    supportingMaterials: [
      { name: 'Sekrup kayu dan bracket penguat', origin: 'Pemasok komponen lokal', supplier: 'Toko Teknik Sumber Rezeki', batchRef: 'KMP-SKR-208', verified: false },
      { name: 'Finishing water-based transparan', origin: 'Pemasok bahan finishing', supplier: 'Warna Kayu Amanah', batchRef: 'FIN-WB-630', verified: false }
    ],
    process: {
      dates: ['03 Okt 2026', '04 Okt 2026', '06 Okt 2026'],
      description: 'Papan dipotong menjadi ambalan dan tiang, kemudian lubang sambungan dibor mengikuti ukuran rak.'
    },
    inspection: 'Kestabilan, kesamaan jarak ant ambalan, kekuatan sambungan, dan kondisi finishing diperiksa.',
    recommendation: 'Tambahkan catatan kadar air kayu saat diterima dan hasil uji beban berdasarkan prosedur internal.'
  }),
  createWoodSampleBatch({
    batchNumber: 'BATCH-2026-B06',
    productName: 'Bangku Taman Kayu Ulin',
    category: 'Furnitur Kayu',
    brand: 'Bengkel Kayu Borneo',
    sku: 'BKB-BTU-006',
    image: '/images/wood-batches/ulin-garden-bench.svg',
    manufactureDate: '2026-10-08',
    warrantyEndDate: '2028-10-08',
    qcStatus: 'Lolos Pemeriksaan Mutu (Grade A)',
    qcInspector: 'Maya Lestari (Inspektur Produk)',
    qcScore: 95.9,
    carbonFootprint: '16.2 kg CO₂e / unit (estimasi contoh)',
    verificationHash: '0x954e210bd7634a8fac10927e65b8d341',
    story: 'Bangku taman dirakit oleh bengkel kayu lokal dengan perhatian pada kekuatan rangka dan permukaan yang nyaman. Informasi spesies, pemasok, dokumen bahan, serta pemeriksaan akhir dicatat untuk ditinjau.',
    mainMaterial: { name: 'Kayu ulin untuk rangka dan dudukan, 0,21 m³', origin: 'Kalimantan Timur (asal pemasok perlu diverifikasi)', supplier: 'Mitra Kayu Borneo', batchRef: 'ULN-KTM-26042 / dokumen asal belum ditinjau', verified: false },
    supportingMaterials: [
      { name: 'Baut galvanis untuk sambungan', origin: 'Pemasok komponen logam', supplier: 'Teknik Borneo Mandiri', batchRef: 'BTR-GVN-723', verified: false },
      { name: 'Pelapis pelindung eksterior', origin: 'Pemasok finishing lokal', supplier: 'Finishing Tahan Cuaca', batchRef: 'FIN-EXT-155', verified: false }
    ],
    process: {
      dates: ['04 Okt 2026', '05 Okt 2026', '07 Okt 2026'],
      description: 'Komponen rangka dan dudukan dipotong, lubang baut disiapkan, lalu dirakit dan dirapikan untuk penggunaan luar ruang.'
    },
    inspection: 'Kekokohan rangka, kekencangan baut, tepi tajam, dan cakupan pelapis diperiksa.',
    recommendation: 'Tinjau dokumen legalitas dan asal kayu sebelum mengubah status bahan menjadi terverifikasi.'
  }),
  createWoodSampleBatch({
    batchNumber: 'BATCH-2026-L07',
    productName: 'Lampu Meja Kayu Mahoni',
    category: 'Kerajinan Kayu',
    brand: 'Kriya Mahoni Studio',
    sku: 'KMS-LMK-007',
    image: '/images/wood-batches/mahogany-table-lamp.svg',
    manufactureDate: '2026-10-09',
    warrantyEndDate: '2027-10-09',
    qcStatus: 'Lolos Pemeriksaan Mutu (Grade A)',
    qcInspector: 'Fajar Nugraha (Petugas Kontrol Mutu)',
    qcScore: 98.0,
    carbonFootprint: '3.1 kg CO₂e / unit (estimasi contoh)',
    verificationHash: '0x0ac563e2b814497fb37d1906d4518a2c',
    story: 'Lampu meja dibuat dengan kaki kayu mahoni hasil bubut dan dirakit bersama komponen listrik dari pemasok terpisah. Paspor QR membedakan asal kayu dan komponen pendukung serta memuat informasi pemeriksaan produk.',
    mainMaterial: { name: 'Balok kayu mahoni, 0,025 m³', origin: 'Kendal, Jawa Tengah', supplier: 'Sentra Kayu Mahoni Kendal', batchRef: 'MHN-KDL-26073 / nota pemasok', verified: false },
    supportingMaterials: [
      { name: 'Kabel, fitting, dan sakelar lampu', origin: 'Pemasok komponen listrik', supplier: 'Elektrik Terang Jaya', batchRef: 'ELK-LMP-099', verified: false },
      { name: 'Lapisan minyak kayu', origin: 'Pemasok finishing', supplier: 'Finishing Aman Nusantara', batchRef: 'FIN-MHN-118', verified: false }
    ],
    process: {
      dates: ['05 Okt 2026', '06 Okt 2026', '08 Okt 2026'],
      description: 'Mahoni dibubut untuk membentuk kaki lampu, diamplas bertahap, lalu disiapkan untuk pemasangan komponen listrik.'
    },
    inspection: 'Kestabilan dudukan, kehalusan permukaan, pemasangan kabel, dan fungsi sakelar diperiksa.',
    recommendation: 'Simpan informasi pemasok komponen listrik serta catatan pemeriksaan keselamatan produk sesuai ketentuan yang berlaku.'
  }),
  createWoodSampleBatch({
    batchNumber: 'BATCH-2026-K08',
    productName: 'Kotak Penyimpanan Kayu Sungkai',
    category: 'Kerajinan Kayu',
    brand: 'Kriya Sungkai Lokal',
    sku: 'KSL-KPS-008',
    image: '/images/wood-batches/sungkai-storage-box.svg',
    manufactureDate: '2026-10-10',
    warrantyEndDate: '2027-10-10',
    qcStatus: 'Lolos Pemeriksaan Mutu (Grade A)',
    qcInspector: 'Nadia Putri (Inspektur Produk)',
    qcScore: 96.4,
    carbonFootprint: '2.4 kg CO₂e / unit (estimasi contoh)',
    verificationHash: '0x73f5a201b68d4c97a28e1f034bd569ca',
    story: 'Kotak penyimpanan dibuat dari papan sungkai dengan sambungan sudut sederhana. Data lot bahan, proses perakitan, hasil pemeriksaan tutup, dan petunjuk perawatan disediakan sebagai contoh paspor produk UMKM.',
    mainMaterial: { name: 'Papan kayu sungkai, 0,035 m³', origin: 'Sumatera Selatan', supplier: 'Pemasok Kayu Sungkai Setempat', batchRef: 'SKG-SUM-26102 / nota pembelian', verified: false },
    supportingMaterials: [
      { name: 'Engsel kecil dan kait penutup', origin: 'Pemasok aksesori kerajinan', supplier: 'Aksesori Kriya Mandiri', batchRef: 'AKS-KOT-064', verified: false },
      { name: 'Perekat kayu dan finishing bening', origin: 'Pemasok bahan pertukangan', supplier: 'Bahan Kriya Sejahtera', batchRef: 'BKS-CLR-311', verified: false }
    ],
    process: {
      dates: ['06 Okt 2026', '07 Okt 2026', '09 Okt 2026'],
      description: 'Papan dipotong menjadi sisi kotak dan tutup, kemudian disambung, diamplas, dan dipasangi engsel.'
    },
    inspection: 'Kesikuan kotak, kelancaran tutup, kerapian sambungan, dan permukaan finishing diperiksa.',
    recommendation: 'Catat pemanfaatan sisa potongan dan berikan instruksi perawatan agar produk bertahan lebih lama.'
  })
];

export const ADDITIONAL_WOOD_BATCH_NUMBERS = ADDITIONAL_WOOD_BATCHES.map(batch => batch.batchNumber);
export const INITIAL_BATCHES = [...ORIGINAL_WOOD_BATCHES, ...ADDITIONAL_WOOD_BATCHES];

const LEGACY_FOOD_SAMPLE_NAMES = new Set([
  'Kopi Robusta Temerloh Organik 250g',
  'Sabun Herbal Minyak Atsiri Serai 100g',
  'Madu Kelulut Asli Hutan Tropis 350g',
  'Kripik',
  'Pisang'
]);

const LEGACY_FOOD_DEMO_BATCHES = new Map([
  ['BATCH-2026-N04', 'Kripik'],
  ['BATCH-2026-N05', 'Pisang']
]);

export const migrateLegacyWoodBatches = batches => batches.flatMap(batch => {
  if (!LEGACY_FOOD_SAMPLE_NAMES.has(batch.productName)) return [batch];

  const replacement = INITIAL_BATCHES.find(sample => sample.batchNumber === batch.batchNumber);
  if (replacement) return [replacement];

  return LEGACY_FOOD_DEMO_BATCHES.get(batch.batchNumber) === batch.productName ? [] : [batch];
});

export const withWoodSampleImages = batches => batches.map(batch => {
  const sample = INITIAL_BATCHES.find(candidate =>
    candidate.batchNumber === batch.batchNumber && candidate.productName === batch.productName
  );
  return sample ? { ...batch, image: sample.image } : batch;
});

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
