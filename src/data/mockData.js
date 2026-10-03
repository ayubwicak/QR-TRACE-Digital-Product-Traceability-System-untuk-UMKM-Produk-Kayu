export const INITIAL_BATCHES = [
  {
    batchNumber: 'BATCH-2026-X01',
    productName: 'Kopi Robusta Temerloh Organik 250g',
    category: 'F&B / Agrikultur',
    brand: 'Kolej Komuniti Temerloh AgroFarm',
    sku: 'KKT-KOP-250',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80',
    manufactureDate: '2026-10-01',
    expiryDate: '2027-10-01',
    qcStatus: 'Lolos Uji Standar (Grade A)',
    qcInspector: 'Ahmad Faiz, S.T. (Petugas Kontrol Mutu)',
    qcScore: 98.4,
    carbonFootprint: '0.42 kg CO₂e / bungkus',
    carbonRating: 'Kategori Hijau (Rendah Emisi)',
    verificationHash: '0x8f7a9d2c1e4b3a6f8810e927c44d18fa',
    story: 'Dipetik langsung oleh petani lokal Temerloh pada ketinggian optimal. Menggunakan pupuk organik alami dan diproses dengan mesin sangrai hemat energi untuk menjaga cita rasa khas kopi nusantara.',
    materials: [
      { name: 'Biji Kopi Robusta Petik Merah', origin: 'Perkebunan Temerloh Hill, Pahang', supplier: 'Koperasi Petani Sejahtera', batchRef: 'RAW-KOP-881', verified: true },
      { name: 'Kantong Kemasan Biodegradable', origin: 'Pusat Kemasan Ramah Lingkungan', supplier: 'PT Hijau Kemas Lestari', batchRef: 'PCK-BIO-102', verified: true }
    ],
    timeline: [
      { step: 'Pemanenan & Sortasi Biji Kopi', date: '25 Sep 2026', operator: 'Tim Kebun & Logistik', desc: 'Biji kopi dipetik manual saat matang merah, disortir dengan kadar air 11.2% tanpa bahan kimia.', done: true },
      { step: 'Penyangraian (Roasting)', date: '28 Sep 2026', operator: 'Master Roaster', desc: 'Disangrai pada profil medium-dark suhu 205°C untuk mengeluarkan aroma cokelat dan karamel alami.', done: true },
      { step: 'Uji Laboratorium & Rasa', date: '29 Sep 2026', operator: 'Laboratorium Uji Mutu', desc: 'Uji kebersihan mikrobiologi 0 CFU dan uji rasa (cupping score 84.5) memenuhi standar kelayakan pangan.', done: true },
      { step: 'Pengemasan & Penempelan QR', date: '01 Okt 2026', operator: 'Lini Pengemasan 02', desc: 'Kemasan ditutup rapat dengan segel vakum dan ditempel stiker QR Trace untuk verifikasi pembeli.', done: true }
    ],
    aiAnalysis: {
      confidenceScore: 98.5,
      riskLevel: 'AMAN',
      ruleChecked: 'Semua Standar Mutu Terpenuhi',
      anomalyDetected: false,
      summary: 'Data proses produksi konsisten. Kadar air dan parameter suhu sangrai berada dalam batas standar mutu pangan SNI & ISO 22000.',
      ecoScoreRecommendation: 'Bahan baku berasal dari kebun berjarak kurang dari 45 km, mendukung pengurangan jejak karbon logistik kampus hijau.'
    }
  },
  {
    batchNumber: 'BATCH-2026-B02',
    productName: 'Sabun Herbal Minyak Atsiri Serai 100g',
    category: 'Personal Care & Herbal',
    brand: 'UTDI BioLab x Komuniti Temerloh',
    sku: 'UTDI-SBN-100',
    image: 'https://images.unsplash.com/photo-1607006314144-88f98a2e58c0?auto=format&fit=crop&w=600&q=80',
    manufactureDate: '2026-10-02',
    expiryDate: '2028-10-02',
    qcStatus: 'Lolos Uji Standar (Grade A+)',
    qcInspector: 'Dr. Siti Nurhaliza (Spesialis Formulasi)',
    qcScore: 99.1,
    carbonFootprint: '0.18 kg CO₂e / batang',
    carbonRating: 'Kategori Hijau (Sangat Rendah Emisi)',
    verificationHash: '0x3c91e847a102b55f9a2e6178cd92b450',
    story: 'Diformulasikan secara tradisional dari minyak kelapa murni dan distilasi serai wangi alami lokal. Bebas detergen sintetis SLS dan paraben, lembut serta aman untuk semua jenis kulit.',
    materials: [
      { name: 'Minyak Kelapa Murni (VCO Asli)', origin: 'Sentra VCO Komuniti Temerloh', supplier: 'Koperasi Tani Makmur', batchRef: 'VCO-909', verified: true },
      { name: 'Minyak Atsiri Serai Wangi', origin: 'Penyulingan Atsiri Alami', supplier: 'CV Atsiri Alami Nusantara', batchRef: 'EO-334', verified: true }
    ],
    timeline: [
      { step: 'Pencampuran Bahan Alami (Cold Process)', date: '27 Sep 2026', operator: 'Tim Formulasi Herbal', desc: 'Pencampuran minyak kelapa dan ekstrak atsiri pada suhu kamar untuk menjaga nutrisi alami.', done: true },
      { step: 'Masa Pematangan Sabun (Curing)', date: '30 Sep 2026', operator: 'Ruang Pematangan', desc: 'Sabun didiamkan selama 21 hari dengan sirkulasi udara alami hingga busa dan tekstur terbentuk sempurna.', done: true },
      { step: 'Pemeriksaan pH & Uji Keamanan Kulit', date: '01 Okt 2026', operator: 'Laboratorium Uji Klinis', desc: 'pH sabun terukur 7.2 (netral dan lembut), terbukti bebas iritasi pada pengujian kulit.', done: true },
      { step: 'Bungkus Kertas Daur Ulang & QR', date: '02 Okt 2026', operator: 'Lini Kemas Ramah Lingkungan', desc: 'Dibungkus kertas daur ulang bebas plastik dengan segel nomor batch resmi.', done: true }
    ],
    aiAnalysis: {
      confidenceScore: 99.2,
      riskLevel: 'AMAN',
      ruleChecked: 'Semua Standar Mutu Terpenuhi',
      anomalyDetected: false,
      summary: 'Bebas detergen sintetis. Nilai pH dan waktu pematangan sabun terverifikasi optimal tanpa deviasi.',
      ecoScoreRecommendation: 'Penggunaan kemasan kertas daur ulang membantu target kampus bebas sampah plastik.'
    }
  },
  {
    batchNumber: 'BATCH-2026-F03',
    productName: 'Madu Kelulut Asli Hutan Tropis 350g',
    category: 'Nutraceutical / Superfood',
    brand: 'KKT Madu Alami',
    sku: 'KKT-MD-350',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    manufactureDate: '2026-10-03',
    expiryDate: '2028-10-03',
    qcStatus: 'Lolos Uji Standar (Grade A)',
    qcInspector: 'Ir. Hendra Wijaya (Pemeriksa Keamanan Pangan)',
    qcScore: 97.5,
    carbonFootprint: '0.28 kg CO₂e / botol',
    carbonRating: 'Kategori Hijau (Rendah Emisi)',
    verificationHash: '0x7e29b451fa80c12e93d8b24168ee3a01',
    story: 'Madu murni dari lebah tanpa sengat (Trigona) yang dipanen higienis dari nektar bunga liar hutan tropis. Kaya enzim aktif dan antioksidan alami untuk daya tahan tubuh.',
    materials: [
      { name: 'Madu Mentah Kelulut Segar', origin: 'Hutan Konservasi Komuniti', supplier: 'Kelompok Peternak Lebah Lestari', batchRef: 'RAW-HON-404', verified: true },
      { name: 'Botol Kaca Gelap Pelindung Nutrisi', origin: 'Pusat Kemas Higienis', supplier: 'PT Prima Kemasindo', batchRef: 'GLS-UV-88', verified: true }
    ],
    timeline: [
      { step: 'Pemanenan Higienis & Steril', date: '28 Sep 2026', operator: 'Peternak Kelulut', desc: 'Penyedotan madu steril langsung dari sarang kayu tanpa kontak tangan.', done: true },
      { step: 'Penyaringan Alami Tanpa Pemanasan', date: '30 Sep 2026', operator: 'Lini Filtrasi Higienis', desc: 'Disaring mikro tanpa pemanasan agar enzim diastase dan khasiat madu tetap hidup utuh.', done: true },
      { step: 'Uji Kemurnian & Laboratorium', date: '02 Okt 2026', operator: 'Laboratorium Uji Pangan', desc: 'Hasil uji menunjukkan 100% madu murni tanpa campuran gula tebu tambahan.', done: true },
      { step: 'Pembotolan & Pemasangan Segel QR', date: '03 Okt 2026', operator: 'Lini Botol Steril', desc: 'Pengisian ke botol kaca kedap udara dengan nomor identitas QR Trace digital.', done: true }
    ],
    aiAnalysis: {
      confidenceScore: 97.8,
      riskLevel: 'AMAN',
      ruleChecked: 'Semua Standar Mutu Terpenuhi',
      anomalyDetected: false,
      summary: 'Data spektrum kemurnian madu terkonfirmasi 100% asli tanpa pemalsuan pemanis.',
      ecoScoreRecommendation: 'Peternakan lebah kelulut membantu penyerbukan alami tanaman hutan sekitar kampus.'
    }
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-1001',
    timestamp: '2026-10-01 08:30:12',
    actor: 'Ahmad Faiz (Petugas QC)',
    action: 'PERSETUJUAN_RILIS_BATCH',
    batchNumber: 'BATCH-2026-X01',
    details: 'Menyetujui rilis batch kopi setelah verifikasi hasil lab kadar air 11.2% dan uji aroma.',
    status: 'TERVERIFIKASI',
    hash: '0xa19f...44b1'
  },
  {
    id: 'LOG-1002',
    timestamp: '2026-10-01 08:31:05',
    actor: 'Sistem Validasi Otomatis',
    action: 'PEMERIKSAAN_SOP',
    batchNumber: 'BATCH-2026-X01',
    details: 'Pemeriksaan 4 tahapan produksi selesai. Parameter suhu dan kebersihan memenuhi standar ISO 22000.',
    status: 'TERCATAT',
    hash: '0x882c...91e0'
  },
  {
    id: 'LOG-1003',
    timestamp: '2026-10-02 14:15:40',
    actor: 'Dr. Siti Nurhaliza (Spesialis Formulasi)',
    action: 'VERIFIKASI_BAHAN_BAKU',
    batchNumber: 'BATCH-2026-B02',
    details: 'Konfirmasi sertifikat analisis bahan VCO murni dari Koperasi Tani Makmur.',
    status: 'TERVERIFIKASI',
    hash: '0x32cf...e871'
  },
  {
    id: 'LOG-1004',
    timestamp: '2026-10-03 09:10:22',
    actor: 'Ir. Hendra Wijaya (Petugas Pangan)',
    action: 'ESTIMASI_JEJAK_KARBON',
    batchNumber: 'BATCH-2026-F03',
    details: 'Perhitungan jejak karbon 0.28 kg CO₂e diverifikasi memenuhi standar kampus ramah lingkungan.',
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
    desc: 'Bahan baku yang dimasukkan wajib cocok dengan daftar petani/pemasok terverifikasi untuk mencegah bahan palsu atau tidak higienis.',
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
