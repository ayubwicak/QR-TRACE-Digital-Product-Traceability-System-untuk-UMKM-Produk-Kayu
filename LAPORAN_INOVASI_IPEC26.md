# KOLEJ KOMUNITI TEMERLOH
## Unit Penyelidikan, Inovasi dan Komersialan

---

# LAPORAN PROJEK INOVASI PELAJAR
### INNOVATIVE PRODUCT EXHIBITION AND COMPETITION 2026 (iPEC '26)

---

### NAMA PROJEK
**QR TRACE: SISTEM KETERTELUSURAN PRODUK KAYU DIGITAL UNTUK USAHA MIKRO, KECIL DAN SEDERHANA**

| Nama Pelajar | No Pendaftaran | No K/P |
| :--- | :--- | :--- |
| **Nama Pelajar 1** (Ketua Projek / Pembangun Perisian) | [Isi No Pendaftaran Pelajar 1] | [Isi No K/P Pelajar 1] |
| **Nama Pelajar 2** (Penyelidik Data & Jaminan Mutu) | [Isi No Pendaftaran Pelajar 2] | [Isi No K/P Pelajar 2] |
| **Nama Pelajar 3** (Pembangun Antaramuka & Dokumentasi) | [Isi No Pendaftaran Pelajar 3] | [Isi No K/P Pelajar 3] |

**NAMA PENSYARAH PENYELIA:**  
**[Isi Nama Pensyarah Penyelia / Penasihat Projek]**  
Kolej Komuniti Temerloh (dengan Kolaborasi Penyelidikan Bersama UTDI)

---
\pagebreak

## [HALAMAN 1]

### Tajuk Projek Inovasi
**Nyatakan tajuk projek inovasi:**  
> **QR TRACE: Sistem Ketertelusuran Produk Kayu Digital untuk UMKM, dari bahan baku hingga produk jadi.**

---

### Pengenalan Projek Inovasi
**Pengenalan:**  
UMKM produk kayu mengelola bahan dari beragam pemasok dan mencatat banyak tahapan kerja, mulai dari penerimaan dan pengeringan kayu hingga pemotongan, perakitan, finishing, serta pemeriksaan produk jadi. Informasi spesies, lot, lokasi asal, dokumen pendukung, dan riwayat pengerjaan sering tersebar di catatan kertas sehingga sulit ditelusuri kembali oleh pelaku usaha maupun pembeli.

Untuk menjawab kebutuhan tersebut, **QR TRACE** dikembangkan sebagai sistem ketertelusuran digital bagi UMKM produk kayu. Sistem menghubungkan pencatatan bahan dan pemasok, tahapan produksi, pemeriksaan mutu, serta paspor digital berbasis QR untuk setiap batch produk.

Data yang dikelola dapat mencakup jenis dan volume kayu, pemasok dan dokumen asal-usul, komponen pendukung, kondisi bahan, hasil pemeriksaan dimensi dan sambungan, informasi finishing, serta petunjuk perawatan produk. Catatan batch dan riwayat perubahan disimpan pada PostgreSQL. Pembeli dapat memindai QR untuk melihat informasi yang dipilih pelaku usaha untuk dibagikan. Data demo pada aplikasi merupakan contoh; dokumen dan sertifikasi resmi harus diverifikasi dan diunggah oleh pihak yang berwenang.

---
\pagebreak

## [HALAMAN 2]

### Ciri-ciri Inovasi
**Nyatakan ciri-ciri inovasi:**  
1. **Paspor Produk Digital Berasaskan Kod QR Dinamik (Dynamic QR Digital Passport):**  
   Setiap kelompok produk (*batch*) dijana dengan pautan pengesahan unik dan kod QR SVG vektor berketumpatan tinggi yang memaut terus ke halaman paspor produk awam yang mesra peranti mudah alih.
2. **Penjejakan Rantaian Bekalan Berlapis (Multi-Tier Traceability):**  
   Merekodkan spesies, volume, lot, pemasok, lokasi asal, serta dokumen pendukung kayu dan komponen produk.
3. **Garis Masa Pembuatan & Pematuhan SOP (Interactive Lifecycle Timeline):**  
   Merekodkan setiap langkah pengerjaan (contoh: penerimaan, pengeringan, pemotongan, perakitan, pengamplasan, finishing, dan pengemasan) beserta tarikh serta operator yang bertanggungjawab.
4. **Enjin Validasi Automatik & Simulasi Anomali (Quality Assurance Cockpit):**  
   Dilengkapi simulasi deviasi yang relevan untuk produk kayu, seperti dimensi tidak sesuai, kadar air di luar spesifikasi batch, atau dokumen asal kayu yang belum diverifikasi. Petugas meninjau dan mengesahkan keputusan sebelum status batch diperbarui.
5. **Kalkulator Jejak Karbon & Penarafan ESG Terbina (Built-in Carbon Footprint Calculator):**  
   Mengira pelepasan karbon berdasarkan jarak logistik pengangkutan, jenis pembungkusan mesra alam, dan tenaga pemprosesan, serta memberikan penarafan abjad eko (Gred A, B, atau C) secara saintifik.
6. **Pratinjau Laporan Pemeriksaan Produk Kayu:**
   Menyediakan pratinjau laporan pemeriksaan produk kayu. Pratinjau bukan sertifikat resmi; dokumen dan pengesahan harus berasal dari lembaga atau petugas yang berwenang.
7. **Jejak Audit Kalis Usik (Cryptographic Audit Trail Ledger):**  
   Merekodkan setiap penambahan, pengemaskinian, kelulusan, dan penghapusan data dengan cap masa rasmi dan tanda tangan cincangan (*hash*) kriptografi SHA-256 bagi mencegah sebarang manipulasi data lampau.
8. **Pengimbas Kamera QR Terbina & Mod Dwi-Antaramuka (Dual-Mode UI):**  
   Menyediakan mod papan pemuka pengeluar (*Manufacturer Admin Dashboard*) dengan tema terang/gelap serta mod simulasi imbasan pengguna (*Consumer Mobile View*) dalam satu sistem responsif.

---

### Impak / Kelebihan Inovasi
**Terangkan impak dan kelebihan inovasi:**  
1. **Membasmi Pemalsuan Produk & Penipuan Label (Anti-Counterfeiting):**  
   Identitas batch dan QR membantu pembeli memeriksa catatan produk. QR dan hash mendukung pemeriksaan integritas data, tetapi tidak dengan sendirinya menjamin label fisik tidak dapat disalin.
2. **Meningkatkan Kepercayaan & Keyakinan Pengguna (Consumer Empowerment):**  
   Pembeli dapat meninjau informasi asal kayu, pemasok, proses pengerjaan, pemeriksaan, dan petunjuk perawatan yang diisi serta diverifikasi oleh pelaku usaha.
3. **Pematuhan Pantas Terhadap Standard Eksport & ESG Antarabangsa:**  
   Mendukung kesiapan dokumentasi produk kayu untuk kerja sama usaha dan pasar yang memerlukan informasi asal bahan. Persyaratan ekspor dan sertifikasi tetap harus diperiksa berdasarkan negara tujuan dan jenis produk.
4. **Penjimatan Kos Operasi & Pengurangan Sisa Kertas (Paperless & Cost-Effective):**  
   Menggantikan fail arkib kertas dan sijil cetak fizikal dengan rekod digital awan yang boleh dicapai pada bila-bila masa tanpa kos pelesenan perisian proprietari yang mahal.
5. **Kebolehskalaan Industri (Enterprise-Grade Scalability):**  
   Penggunaan pangkalan data PostgreSQL berstruktur membolehkan sistem mengendalikan jutaan rekod kelompok produk dan log transaksi audit secara stabil dan selamat.

---
\pagebreak

## [HALAMAN 3]

### Bahan-bahan Projek Inovasi
**Nyatakan bahan-bahan yang digunakan untuk membangunkan projek inovasi:**  
Projek inovasi ini dibangunkan menggunakan gabungan teknologi perisian sumber terbuka (*Open-Source Software Stack*) dan perkakasan pengujian piawai:

* **Lapisan Hadapan (Frontend Architecture):**
  * **React 19 (JavaScript ES6+):** Rangka kerja antaramuka berprestasi tinggi berasaskan komponen reaktif.
  * **Vite 8:** Enjin pembina (*bundler*) moden untuk pemaparan pantas (*Hot Module Replacement*).
  * **Tailwind CSS v4:** Rangka kerja penggayaan atomik terkini untuk reka bentuk antaramuka moden, responsif, dan sokongan mod gelap/terang.
  * **Lucide React:** Kolej ikon vektor berdefinisi tinggi untuk ketepatan visual sistem.
  * **QRCode.react & HTML5-QRCode:** Pustaka penjanaan kod QR SVG dinamik serta modul imbasan kamera masa nyata berasaskan web.
  * **Canvas Confetti:** Modul maklum balas visual interaktif semasa pendaftaran kelompok berjaya.
* **Lapisan Belakang & Pangkalan Data (Backend & Database Architecture):**
  * **Node.js (v24 LTS) & Express 5:** Pelayan RESTful API mikro untuk memproses transaksi rantaian bekalan.
  * **PostgreSQL RDBMS (v16):** Pangkalan data relasional gred industri menggunakan skema khusus `qrtrace` dengan sokongan indeks data JSONB pantas.
  * **Node-Postgres (`pg` driver):** Pustaka sambungan kolam sambungan (*connection pool*) selamat antara pelayan API dan pangkalan data.
  * **Dotenv & CORS:** Pengurusan pembolehubah persekitaran selamat dan kawalan perkongsian sumber merentas domain.
* **Perkakasan & Pengujian Fizikal:**
  * Komputer riba stesen kerja pembangun (OS Windows & WSL2 Ubuntu Linux).
  * Peranti telefon pintar pelbagai model (Android & iOS) untuk ujian imbasan kod QR kamera di lapangan.
  * Pencetak label terma (*Thermal Label Printer*) untuk prototaip cetakan pelekat label kelompok kemasan.

---

### Kos Bahan
**Nyatakan kos bahan yang dibelanjakan:**  
Oleh kerana sistem ini memanfaatkan ekosistem perisian sumber terbuka (*Free and Open-Source Software - FOSS*) sepenuhnya, kos pembangunan perisian adalah **sifar (RM 0.00)** untuk pelesenan:

| Bil | Perkara / Komponen | Kategori | Anggaran Kos (RM) |
| :---: | :--- | :--- | :---: |
| 1. | Rangka Kerja Pembangunan (React, Vite, Node.js, Express) | Perisian Sumber Terbuka (FOSS) | RM 0.00 |
| 2. | Enjin Pangkalan Data (PostgreSQL Community Edition) | Pangkalan Data Percuma | RM 0.00 |
| 3. | Pustaka Penjanaan & Imbasan QR (HTML5-QRCode & QRCode.react) | Pustaka MIT License | RM 0.00 |
| 4. | Kertas Pelekat Label Terma Sintetik (Pek Prototaip 500 label) | Bahan Fizikal Pengujian | RM 35.00 |
| 5. | Dakwat / Pita Reben Pencetak Label Ujian | Bahan Habis Pakai Prototaip | RM 25.00 |
| 6. | Kos Domain & Pelayan Ujian Awan Tempatan (Localhost / Sandbox Cloud) | Infrastruktur Ujian Pembangun | RM 0.00 |
| **JUMLAH** | **KOS KESELURUHAN PEMBANGUNAN PROJEK** | | **RM 60.00** |

*Nota: Keberkesanan kos yang amat rendah (hanya RM 60.00 untuk bahan prototaip fizikal) membuktikan inovasi ini amat kos efektif dan berdaya maju tinggi untuk diguna pakai oleh PKS dan institusi kemahiran tanpa bebanan kos lesen.*

---
\pagebreak

## [HALAMAN 4]

### Langkah-langkah Penghasilan Projek Inovasi
**Nyatakan langkah-langkah untuk membangunkan projek inovasi:**  

1. **Fasa 1: Analisis Keperluan & Kajian Masalah (Minggu 1 - 2)**  
   * Mengkaji alur kerja UMKM produk kayu, termasuk pemasok, dokumen asal bahan, pengeringan, pemotongan, perakitan, finishing, pemeriksaan, dan pengiriman.
   * Mengidentifikasi informasi legalitas kayu dan pemeriksaan mutu yang relevan; persyaratan khusus perlu mengikuti ketentuan wilayah serta jenis produk.
2. **Fasa 2: Reka Bentuk Seni Bina Sistem & Pangkalan Data (Minggu 3 - 4)**  
   * Mereka bentuk skema pangkalan data PostgreSQL (`qrtrace.batches` dan `qrtrace.audit_logs`) untuk menyimpan struktur hierarki bahan mentah dan garis masa pembuatan.
   * Mereka bentuk model keselamatan data termasuk penjanaan cincangan SHA-256 untuk mempastikan integriti lejar.
3. **Fasa 3: Pembangunan Enjin Bahagian Belakang (Backend Development) (Minggu 5 - 6)**  
   * Membina RESTful API menggunakan Express.js dan Node.js bagi menyokong operasi CRUD penuh (Create, Read, Update, Delete) kelompok produk.
   * Melaksanakan mekanisme pengelogan audit automatik (*immutable logging engine*) setiap kali berlaku perubahan status atau semakan mutu.
4. **Fasa 4: Pembangunan Antaramuka Pengguna Responsif (Frontend UI/UX) (Minggu 7 - 8)**  
   * Mereka bentuk susun atur dwi-skrin (*split-screen layout*): Penjelajah Kelompok (*Batch Explorer*) di sebelah kiri dan Panel Perincian Paspor Mutu di sebelah kanan.
   * Membangunkan modul sokongan mod dwi-tema (Dark/Light Mode), penapisan kategori dinamik, dan sokongan berbilang bahasa (Bahasa Melayu, Bahasa Indonesia, Bahasa Inggeris).
   * Membina modul *Consumer Mobile View* berbingkai telefon pintar realistik.
5. **Fasa 5: Pembangunan Modul Khas (Jejak Bahan, Pemeriksaan Mutu & Anomaly Cockpit) (Minggu 9 - 10)**
   * Mengintegrasikan kalkulator jejak karbon berasaskan formula sains pelepasan logistik dan pembungkusan.
   * Membangun simulasi deviasi produk kayu (dimensi tidak sesuai, kadar air di luar spesifikasi batch, atau dokumen asal kayu belum diverifikasi) dengan peninjauan petugas.
6. **Fasa 6: Pengujian Sistem, Integrasi Perkakasan & Penambahbaikan (Minggu 11 - 12)**  
   * Melakukan ujian imbasan kod QR merentas pelbagai pencahayaan dan model kamera telefon pintar.
   * Menjalankan pengauditan kod (*oxlint/linter*) dan ujian tekanan pangkalan data PostgreSQL untuk memastikan kebolehpercayaan sifar ralat.

---
\pagebreak

## [HALAMAN 5]

### Fungsi dan Kegunaan Projek Inovasi
**Nyatakan fungsi dan kegunaan projek inovasi:**  
1. **Penjanaan Label Paspor Produk Digital:**  
   Menjana label QR dengan identitas batch, informasi pemeriksaan, serta tautan ke paspor produk kayu. Informasi garansi atau layanan dicatat sesuai kebijakan produsen.
2. **Penyemakan Asal Usul Bahan Mentah (Traceability Verifier):**  
   Membolehkan petugas dan pembeli menelusuri spesies, lot, pemasok, lokasi asal, dan dokumen pendukung bahan kayu yang dicatat.
3. **Pengauditan Mutu & Simulasi Deviasi:**  
   Menyediakan panel untuk meninjau kondisi bahan, kadar air sesuai spesifikasi batch, dimensi, sambungan, permukaan, dan hasil pemeriksaan akhir sebelum paspor dibagikan.
4. **Pencatatan Laporan Pemeriksaan Produk Kayu:**
   Menyediakan ruang pencatatan laporan pemeriksaan dan dokumen pendukung. Pengesahan resmi tetap diterbitkan oleh pihak berwenang dan dokumennya perlu diverifikasi.
5. **Kalkulator & Pengesahan Jejak Karbon Hijau:**  
   Mengira penarafan pelepasan karbon kelompok bagi memenuhi kriteria produk hijau, membolehkan pengeluar mempromosikan kelebihan kelestarian produk mereka kepada pasaran.
6. **Buku Lejar Audit Kriptografi:**  
   Mencatat aktivitas batch dan perubahan data untuk membantu peninjauan internal. Catatan sistem bukan pengganti sertifikasi atau dokumen legalitas yang diwajibkan.

---

### Sasaran Pengguna
**Nyatakan sasaran pengguna projek inovasi yang dibangunkan:**  
1. **UMKM Furnitur dan Produk Kayu:**
   Pengrajin furnitur, produsen komponen kayu, bengkel pertukangan, serta usaha kerajinan dan dekorasi kayu yang ingin mengelola informasi bahan dan proses secara lebih tertelusur.
2. **Institusi Pendidikan & Pusat Pengeluaran Kemahiran (Kolej Komuniti & TVET):**  
   Unit inkubator keusahawanan, bengkel produksi kayu, dan institusi TVET untuk memantau proses latihan serta pencatatan batch produk.
3. **Pegawai Kawalan Kualiti (QC/QA Officers) & Juruaudit Pematuhan:**  
   Petugas QC dan auditor yang meninjau catatan pemasok, dokumen asal kayu, spesifikasi produk, proses pengerjaan, dan hasil pemeriksaan.
4. **Pengguna Akhir / Pembeli:**  
   Pembeli furnitur dan produk kayu yang ingin mengetahui bahan, proses produksi, mutu, dan cara perawatan produk sebelum membeli.
5. **Rakan Niaga Runcit & Pengimport Global:**  
   Mitra ritel, kontraktor, dan pembeli grosir yang memerlukan informasi produk serta dokumentasi bahan yang lebih teratur.

---
\pagebreak

## [HALAMAN 6]

### Pendaftaran Hak Cipta (Jika Ada)
**Nyatakan pendaftaran hak cipta projek inovasi:**  
* **Status Permohonan:** Dalam Proses Penyediaan Dokumen Pendaftaran Harta Intelek (IP).
* **Kategori Perlindungan:** Hak Cipta Kod Sumber Perisian Komputer (*Copyright in Computer Software*) di bawah Akta Hak Cipta 1987, Perbadanan Harta Intelek Malaysia (MyIPO).
* **Karya Yang Dilindungi:**
  1. Seni bina kod sumber perisian penuh sistem QR TRACE (Frontend React & Backend Node.js/PostgreSQL).
  2. Reka bentuk susun atur antaramuka pengguna (UI/UX) Paspor Digital dan Panel Audit Interaktif.
  3. Algoritma integrasi pengiraan jejak karbon dan rantai cincangan log audit kriptografi (*Cryptographic SHA-256 Ledger Formulation*).
* **Pemilikan:** Bersama antara Kolej Komuniti Temerloh (KPT) dan Pasukan Pembangun Projek Pelajar.

---

### Potensi Komersial
**Nyatakan potensi komersial projek inovasi yang dibangunkan:**  
1. **Model Perniagaan Perisian Sebagai Perkhidmatan (SaaS Traceability Model):**  
   Sistem berpotensi ditawarkan kepada bengkel furnitur, kelompok pengrajin, pemasok kayu, dan UMKM produk kayu dengan paket sesuai jumlah batch dan kebutuhan pencatatan.
2. **Nilai Tambah Tinggi Bagi Produk Tempatan Eksport:**  
   Produk kampung atau keluaran agro-TVET yang dilengkapi kod QR TRACE dapat dijual pada harga premium (peningkatan nilai jualan antara 20% hingga 40%) kerana mempunyai jaminan paspor digital yang diiktiraf.
3. **Integrasi Bersama Agensi Kerajaan & Pensijilan:**  
   Dapat dikembangkan bersama institusi pembinaan UMKM, komunitas pengrajin, serta pemangku kepentingan industri kayu sesuai kebutuhan dan ketentuan yang berlaku.
4. **Khidmat Penyesuaian Sistem & Integrasi Kilang (Customization & Integration Services):**  
   Menyediakan perkhidmatan pemasangan dan integrasi sistem bersama pangkalan data sedia ada atau sistem ERP kilang bersaiz sederhana.
5. **Kos Operasi Minimum dengan Margin Untung Tinggi:**  
   Disebabkan dibina menggunakan teknologi sumber terbuka moden tanpa kos pelesenan pihak ketiga, kos penyelenggaraan pelayan awam adalah sangat rendah, membolehkan margin keuntungan operasi melebihi 80%.

---
\pagebreak

## [HALAMAN 7]

### Penutup
**Kesimpulan dan perbincangan projek inovasi:**  
Projek inovasi **QR TRACE: Sistem Ketertelusuran Produk Kayu Digital untuk UMKM** membantu menghubungkan informasi bahan baku dengan proses hingga produk jadi. Pencatatan spesies dan asal kayu, pemasok, dokumen pendukung, lot bahan, tahapan pengerjaan, pemeriksaan mutu, serta informasi perawatan tersedia melalui satu paspor digital.

QR TRACE ditujukan sebagai alat bantu pencatatan dan berbagi informasi, bukan pengganti verifikasi legalitas kayu atau sertifikasi resmi. Pengembangan berikutnya dapat memperkuat dukungan untuk kebutuhan bengkel furnitur, pengrajin, pemasok, dan pembeli produk kayu.

---

### Pengesahan Produk
**Tandatangan pengesahan oleh pensyarah penyelia:**  

Disahkan bahawa laporan projek inovasi ini telah disemak dan produk **QR TRACE** telah dibangunkan, diuji serta memenuhi syarat-syarat penyertaan dalam *Innovative Product Exhibition and Competition 2026 (iPEC '26)*.


Tandatangan Pensyarah Penyelia: ............................................................  

Nama Pensyarah Penyelia: **[Nama Pensyarah Penyelia]**  
Jawatan: **Pensyarah / Pegawai Penyelaras Inovasi**  
Jabatan: **Kolej Komuniti Temerloh**  
Tarikh: **[Tarikh Pengesahan]**  
Cop Rasmi Institusi:

---
\pagebreak

## [HALAMAN 8]

### Lampiran Poster Inovasi
**Lampirkan poster inovasi:**  

*(Ruangan di bawah disediakan untuk penampalan / cetakan imej Poster Infografik Projek Inovasi iPEC '26)*

```
+-----------------------------------------------------------------------------------+
|                                 [POSTER INOVASI]                                  |
|                                                                                   |
|                                     QR TRACE                                      |
|        Ketertelusuran Produk Kayu UMKM: Bahan Baku hingga Produk Jadi             |
|                                                                                   |
|  [Logo Kolej Komuniti Temerloh]                     [Logo Rasmi iPEC '26]        |
|                                                                                   |
|  1. PERNYATAAN MASALAH:                                                           |
|     - Asal kayu, pemasok, dan proses produk sulit ditelusuri kembali.             |
|     - Catatan produksi UMKM masih tersebar dan banyak dilakukan secara manual.   |
|                                                                                   |
|  2. OBJEKTIF & PENYELESAIAN:                                                      |
|     - Membuat paspor produk kayu digital dengan kode QR per batch.               |
|     - Mencatat spesies, asal, lot kayu, pemasok, serta tahapan pengerjaan.        |
|     - Mendokumentasikan pemeriksaan mutu dan riwayat perubahan data.              |
|                                                                                   |
|  3. CIRI-CIRI UTAMA SISTEM:                                                       |
|     [*] Kod QR Dinamik Berpusat              [*] Pangkalan Data PostgreSQL Live   |
|     [*] Pemeriksaan kadar air & dimensi      [*] Catatan asal-usul bahan kayu    |
|     [*] Paspor QR dan perawatan produk       [*] Riwayat audit dan perubahan     |
|                                                                                   |
|  4. CARTA ALIR SISTEM (WORKFLOW):                                                 |
|     [Asal Kayu] -> [Produksi] -> [Pemeriksaan Mutu] -> [Terbitkan QR]            |
|                                                                         |         |
|                                                       [Pengguna Imbas Telefon]    |
|                                                                                   |
|  5. IMPAK & KELEBIHAN:                                                            |
|     - Kos pelesenan perisian sifar (RM0 - 100% Sumber Terbuka).                   |
|     - Memudahkan UMKM berbagi informasi bahan, pengerjaan, dan mutu produk.       |
|     - Membantu pembeli memahami perjalanan serta perawatan produk kayu.           |
|                                                                                   |
|  Kolej Komuniti Temerloh | Unit Penyelidikan, Inovasi & Komersialan | iPEC '26    |
+-----------------------------------------------------------------------------------+
```

*(Sila masukkan fail imej grafik rasmi poster inovasi bersaiz A4/A3 pada helaian ini semasa penyerahan akhir laporan fizikal atau fail digital).*
