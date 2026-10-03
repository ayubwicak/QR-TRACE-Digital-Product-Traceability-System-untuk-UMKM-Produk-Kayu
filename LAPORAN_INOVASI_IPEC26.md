# KOLEJ KOMUNITI TEMERLOH
## Unit Penyelidikan, Inovasi dan Komersialan

---

# LAPORAN PROJEK INOVASI PELAJAR
### INNOVATIVE PRODUCT EXHIBITION AND COMPETITION 2026 (iPEC '26)

---

### NAMA PROJEK
**QR TRACE: PLATFORM PASPOR PRODUK DIGITAL & KETERTELUSURAN RANTAI PASOK BERINTEGRASI POSTGRESQL SERTA PENGESAHAN MUTU BERAUTOMATIK**

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
> **QR TRACE: Sistem Paspor Produk Digital (Digital Product Passport - DPP) dan Penjejakan Rantaian Bekalan Berasaskan Web dengan Enjin Pengesahan Integriti Data, Pengiraan Jejak Karbon ESG, dan Pangkalan Data PostgreSQL.**

---

### Pengenalan Projek Inovasi
**Pengenalan:**  
Dalam era pasaran moden dan persaingan global, isu ketulenan produk, keselamatan pengguna, dan pematuhan piawaian alam sekitar (ESG) menjadi keutamaan kritikal bagi industri agro-makanan, herba, dan pembuatan. Pengguna masa kini menuntut ketelusan penuh terhadap sumber bahan mentah, proses pemprosesan, serta jaminan kualiti produk yang mereka beli. Namun demikian, kebanyakan perusahaan kecil dan sederhana (PKS) serta pengeluar tempatan masih bergantung kepada rekod fizikal (kertas) dan label statik biasa yang mudah dipalsukan, sukar dijejak semula (*untraceable*), dan tidak mematuhi standard ketelusan antarabangsa seperti ISO 22000, HACCP, serta garis panduan Digital Product Passport (DPP) Kesatuan Eropah (EU Ecodesign Regulation).

Bagi mengatasi jurang kritikal ini, projek inovasi **QR TRACE** dibangunkan sebagai satu platform hujung-ke-hujung (*end-to-end web platform*) yang menghubungkan pengeluar, makmal kawalan mutu (QC/QA), juruaudit, dan pengguna akhir. Melalui penjanaan **Kod QR Dinamik Unik Berstrata Kriptografi** pada setiap kelompok (*batch*) pengeluaran, QR TRACE membolehkan setiap unit produk membawa "Paspor Digital" sendiri. 

Sistem ini merekodkan asal-usul bahan mentah dari ladang/pembekal, setiap fasa garis masa pembuatan (*manufacturing lifecycle*), keputusan ujian makmal sebenar, pengiraan jejak karbon produk, serta jejak audit (*immutable audit trail*) yang disimpan secara selamat dalam pangkalan data berprestasi tinggi **PostgreSQL**. Dengan sekali imbasan menggunakan kamera telefon pintar tanpa perlu memasang sebarang aplikasi tambahan, pengguna dan pihak berkuasa dapat mengesahkan kesahihan produk, melihat sijil analisis makmal (COA), serta menyemak ketelusan impak alam sekitar secara serta-merta.

---
\pagebreak

## [HALAMAN 2]

### Ciri-ciri Inovasi
**Nyatakan ciri-ciri inovasi:**  
1. **Paspor Produk Digital Berasaskan Kod QR Dinamik (Dynamic QR Digital Passport):**  
   Setiap kelompok produk (*batch*) dijana dengan pautan pengesahan unik dan kod QR SVG vektor berketumpatan tinggi yang memaut terus ke halaman paspor produk awam yang mesra peranti mudah alih.
2. **Penjejakan Rantaian Bekalan Berlapis (Multi-Tier Traceability):**  
   Merekodkan komponen bahan mentah secara terperinci merangkumi nama bahan, nombor rujukan kelompok pembekal (*batch reference*), lokasi geografi asal ladang/kilang, serta status ujian makmal.
3. **Garis Masa Pembuatan & Pematuhan SOP (Interactive Lifecycle Timeline):**  
   Merekodkan setiap langkah kronologi pemprosesan (contoh: penerimaan bahan mentah, pengekstrakan, kawalan suhu memanggang/roasting, pembungkusan steril) berserta tarikh, masa, dan identiti operator yang bertanggungjawab.
4. **Enjin Validasi Automatik & Simulasi Anomali (Quality Assurance Cockpit):**  
   Dilengkapi modul pengesanan deviasi piawaian (seperti anomali suhu melebihi ambang SOP, amaran pembekal belum tersenarai/whitelist, dan lebihan kadar air) berkonsepkan *Human-in-the-Loop* yang memastikan integriti data sentiasa disahkan oleh ketua pemeriksa QC sebelum dikomit.
5. **Kalkulator Jejak Karbon & Penarafan ESG Terbina (Built-in Carbon Footprint Calculator):**  
   Mengira pelepasan karbon berdasarkan jarak logistik pengangkutan, jenis pembungkusan mesra alam, dan tenaga pemprosesan, serta memberikan penarafan abjad eko (Gred A, B, atau C) secara saintifik.
6. **Sistem Sijil Analisis Makmal Digital (Digital Certificate of Analysis - COA):**  
   Menjana paparan sijil analisis makmal rasmi dengan cop pengesahan digital dan tanda tangan auditor utama untuk semakan pihak berkuasa.
7. **Jejak Audit Kalis Usik (Cryptographic Audit Trail Ledger):**  
   Merekodkan setiap penambahan, pengemaskinian, kelulusan, dan penghapusan data dengan cap masa rasmi dan tanda tangan cincangan (*hash*) kriptografi SHA-256 bagi mencegah sebarang manipulasi data lampau.
8. **Pengimbas Kamera QR Terbina & Mod Dwi-Antaramuka (Dual-Mode UI):**  
   Menyediakan mod papan pemuka pengeluar (*Manufacturer Admin Dashboard*) dengan tema terang/gelap serta mod simulasi imbasan pengguna (*Consumer Mobile View*) dalam satu sistem responsif.

---

### Impak / Kelebihan Inovasi
**Terangkan impak dan kelebihan inovasi:**  
1. **Membasmi Pemalsuan Produk & Penipuan Label (Anti-Counterfeiting):**  
   Kod QR dinamik yang dipautkan kepada cincangan kriptografi unik memastikan produk asli tidak boleh ditiru menggunakan label cetakan biasa, sekali gus melindungi reputasi pengeluar tempatan.
2. **Meningkatkan Kepercayaan & Keyakinan Pengguna (Consumer Empowerment):**  
   Pengguna dapat melihat bukti sebenar daripada mana bahan mentah diperoleh, siapa penguji makmalnya, dan bila ia diproses, menghapuskan amalan "greenwashing" dan dakwaan palsu.
3. **Pematuhan Pantas Terhadap Standard Eksport & ESG Antarabangsa:**  
   Membantu produk tempatan dan PKS menembusi pasaran eksport bernilai tinggi yang mewajibkan kebolehkesanan digital dan pelaporan jejak karbon (contoh: Kesatuan Eropah, Singapura, dan Timur Tengah).
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
   * Menemu bual pengeluar produk pertanian tempatan (contoh: ladang kopi agro Kolej Komuniti Temerloh, pengeluar madu kelulut, dan produk herba) bagi mengenal pasti masalah ketiadaan rekod rantaian bekalan yang telus.
   * Menyelidik piawaian Digital Product Passport (DPP), ISO 22000, dan piawaian kebolehkesanan HACCP.
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
5. **Fasa 5: Pembangunan Modul Khas (Kalkulator ESG, COA & Anomaly Cockpit) (Minggu 9 - 10)**  
   * Mengintegrasikan kalkulator jejak karbon berasaskan formula sains pelepasan logistik dan pembungkusan.
   * Membangunkan modul simulasi anomali mutu (suhu roasting melebihi had, pembekal luar senarai putih) berserta mekanisme kelulusan manusia (*Human-in-the-Loop*).
6. **Fasa 6: Pengujian Sistem, Integrasi Perkakasan & Penambahbaikan (Minggu 11 - 12)**  
   * Melakukan ujian imbasan kod QR merentas pelbagai pencahayaan dan model kamera telefon pintar.
   * Menjalankan pengauditan kod (*oxlint/linter*) dan ujian tekanan pangkalan data PostgreSQL untuk memastikan kebolehpercayaan sifar ralat.

---
\pagebreak

## [HALAMAN 5]

### Fungsi dan Kegunaan Projek Inovasi
**Nyatakan fungsi dan kegunaan projek inovasi:**  
1. **Penjanaan Label Paspor Produk Digital:**  
   Menjana label siap cetak yang mengandungi kod QR dinamik berserta maklumat kelompok, tarikh luput, dan gred kualiti untuk dilekatkan terus pada pembungkusan fizikal produk.
2. **Penyemakan Asal Usul Bahan Mentah (Traceability Verifier):**  
   Membolehkan pihak audit dan pelanggan menjejaki setiap komponen bahan mentah hingga ke nama ladang, daerah asal, dan kod pembekal yang membekalkannya.
3. **Pengauditan Mutu & Simulasi Deviasi:**  
   Menyediakan panel kawalan untuk menyemak sama ada parameter fizikal produk (kadar air, suhu pemprosesan, status kebersihan) memenuhi piawaian sebelum sijil digital dikeluarkan.
4. **Pengeluaran Sijil Analisis Makmal Digital (Digital COA):**  
   Membolehkan institusi atau makmal mengeluarkan sijil ujian kualiti yang sah secara digital tanpa risiko sijil palsu atau diubah suai.
5. **Kalkulator & Pengesahan Jejak Karbon Hijau:**  
   Mengira penarafan pelepasan karbon kelompok bagi memenuhi kriteria produk hijau, membolehkan pengeluar mempromosikan kelebihan kelestarian produk mereka kepada pasaran.
6. **Buku Lejar Audit Kriptografi:**  
   Menyimpan sejarah aktiviti pengeluaran yang tidak boleh dipadam (*tamper-evident log*) sebagai bukti pematuhan kepada agensi pensijilan seperti KKM, MARDI, SIRIM, atau Jabatan Pertanian.

---

### Sasaran Pengguna
**Nyatakan sasaran pengguna projek inovasi yang dibangunkan:**  
1. **Pengeluar Tempatan, Agropreneur & PKS Industri Makanan/Herba:**  
   Pengusaha madu kelulut, kopi premium, minyak pati herba, sabun organik, dan produk pemakanan tambahan yang ingin menaik taraf nilai komersial produk mereka melalui penjenamaan digital telus.
2. **Institusi Pendidikan & Pusat Pengeluaran Kemahiran (Kolej Komuniti & TVET):**  
   Unit inkubator keusahawanan dan ladang agro-teknologi Kolej Komuniti untuk memantau SOP latihan pengeluaran pelajar berstandard industri.
3. **Pegawai Kawalan Kualiti (QC/QA Officers) & Juruaudit Pematuhan:**  
   Pemeriksa kualiti kilang dan juruaudit luaran yang memerlukan rekod jejak digital masa nyata untuk pengesahan pensijilan halal, MeSTI, GMP, dan HACCP.
4. **Pengguna Akhir / Pembeli:**  
   Orang awam yang mengutamakan keselamatan makanan, kesihatan, ketulenan produk, dan kelestarian alam sekitar yang ingin mengesahkan produk sebelum membeli.
5. **Rakan Niaga Runcit & Pengimport Global:**  
   Pasar raya besar dan syarikat pengimport antarabangsa yang memerlukan dokumentasi ketertelusuran lengkap sebelum menerima kemasukan produk ke pasaran mereka.

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
   Sistem ini boleh dilanggan oleh koperasi pengeluar, persatuan petani, dan kilang PKS pada kadar yuran bulanan atau tahunan yang mampu milik (contoh: model langganan berperingkat RM30 - RM150/bulan mengikut jumlah kelompok produk).
2. **Nilai Tambah Tinggi Bagi Produk Tempatan Eksport:**  
   Produk kampung atau keluaran agro-TVET yang dilengkapi kod QR TRACE dapat dijual pada harga premium (peningkatan nilai jualan antara 20% hingga 40%) kerana mempunyai jaminan paspor digital yang diiktiraf.
3. **Integrasi Bersama Agensi Kerajaan & Pensijilan:**  
   Berpotensi diguna pakai oleh agensi seperti FAMA, MARDI, Jabatan Pertanian, atau Halal Development Corporation (HDC) sebagai platform seragam penjejakan produk usahawan bimbingan.
4. **Khidmat Penyesuaian Sistem & Integrasi Kilang (Customization & Integration Services):**  
   Menyediakan perkhidmatan pemasangan dan integrasi sistem bersama pangkalan data sedia ada atau sistem ERP kilang bersaiz sederhana.
5. **Kos Operasi Minimum dengan Margin Untung Tinggi:**  
   Disebabkan dibina menggunakan teknologi sumber terbuka moden tanpa kos pelesenan pihak ketiga, kos penyelenggaraan pelayan awam adalah sangat rendah, membolehkan margin keuntungan operasi melebihi 80%.

---
\pagebreak

## [HALAMAN 7]

### Penutup
**Kesimpulan dan perbincangan projek inovasi:**  
Projek inovasi **QR TRACE: Platform Paspor Produk Digital & Ketertelusuran Rantai Pasok Berasaskan PostgreSQL** membuktikan bahawa jurang antara teknologi industri digital 4.0 (IR 4.0) dengan perusahaan kecil dan komuniti agro-makanan tempatan dapat dirapatkan secara berkesan. Melalui gabungan pangkalan data relasional berkeupayaan tinggi, penjanaan kod QR dinamik, pengiraan jejak karbon saintifik, dan sokongan semakan integriti *Human-in-the-Loop*, sistem ini menawarkan penyelesaian yang bukan sahaja praktikal malah kalis masa hadapan (*future-proof*).

Sistem ini bukan sekadar alat pelabelan semata-mata, sebaliknya merupakan satu ekosistem ketelusan menyeluruh yang mengembalikan hak pengguna untuk mengetahui kebenaran di sebalik produk yang mereka guna, di samping mengangkat martabat pengeluar tempatan ke piawaian dokumentasi global. Diharapkan agar sistem QR TRACE ini dapat diperluaskan ke institusi-institusi pendidikan TVET lain dan diangkat sebagai piawaian standard kebolehkesanan produk inovasi di peringkat kebangsaan dan serantau.

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
|            Sistem Paspor Produk Digital & Ketertelusuran Rantai Pasok             |
|                                                                                   |
|  [Logo Kolej Komuniti Temerloh]                     [Logo Rasmi iPEC '26]        |
|                                                                                   |
|  1. PERNYATAAN MASALAH:                                                           |
|     - Pemalsuan produk & dakwaan 'greenwashing' yang tidak dapat disahkan.        |
|     - Ketiadaan rekod rantaian bekalan digital bagi PKS dan produk komuniti.      |
|                                                                                   |
|  2. OBJEKTIF & PENYELESAIAN:                                                      |
|     - Mewujudkan Paspor Produk Digital (DPP) menggunakan Kod QR Dinamik.          |
|     - Pengesahan asal-usul bahan mentah & audit SOP pembuatan masa nyata.         |
|     - Kalkulator jejak karbon bersepadu & lejar audit kalis ubah (SHA-256).      |
|                                                                                   |
|  3. CIRI-CIRI UTAMA SISTEM:                                                       |
|     [*] Kod QR Dinamik Berpusat              [*] Pangkalan Data PostgreSQL Live   |
|     [*] Enjin Validasi Mutu ISO/HACCP        [*] Sijil Analisis Makmal (COA)      |
|     [*] Penarafan Karbon Eko (Gred A/B/C)    [*] Dwi-Mod Antaramuka Gelap/Terang  |
|                                                                                   |
|  4. CARTA ALIR SISTEM (WORKFLOW):                                                 |
|     [Ladang/Bahan] -> [Input SOP Kilang] -> [Ujian Makmal QC] -> [Cetak QR DPP]  |
|                                                                         |         |
|                                                       [Pengguna Imbas Telefon]    |
|                                                                                   |
|  5. IMPAK & KELEBIHAN:                                                            |
|     - Kos pelesenan perisian sifar (RM0 - 100% Sumber Terbuka).                   |
|     - Meningkatkan nilai pasaran dan eksport produk tempatan sehingga 40%.        |
|     - Memenuhi kehendak polisi ketelusan global (EU DPP & Standard Halal/ESG).    |
|                                                                                   |
|  Kolej Komuniti Temerloh | Unit Penyelidikan, Inovasi & Komersialan | iPEC '26    |
+-----------------------------------------------------------------------------------+
```

*(Sila masukkan fail imej grafik rasmi poster inovasi bersaiz A4/A3 pada helaian ini semasa penyerahan akhir laporan fizikal atau fail digital).*
