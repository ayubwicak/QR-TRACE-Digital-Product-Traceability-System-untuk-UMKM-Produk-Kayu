# 🚀 QR TRACE — Digital Product Passport & PostgreSQL Traceability Platform
> **Dipersiapkan untuk:** INNOVATIVE PRODUCT EXHIBITION AND COMPETITION (IPEC'26)  
> **Tema:** Teknologi & Digital | Sosial & Kelestarian  
> **Kolaborasi:** Kolej Komuniti Temerloh & Universitas Teknologi Digital Indonesia (UTDI)

---

## 🐘 1. Arsitektur Database PostgreSQL

Sistem menggunakan database relasional **PostgreSQL** dengan skema `qrtrace` untuk persistensi data industri yang reliabel:

* **Tabel `qrtrace.batches`:**
  Menyimpan seluruh metadata produk, nomor batch, brand, SKU, tanggal manufaktur, masa kadaluarsa, skor QC, rating karbon, tanda tangan hash, serta komposisi bahan baku (`materials` JSONB), linimasa proses (`timeline` JSONB), dan hasil analisis validasi (`ai_analysis` JSONB).
* **Tabel `qrtrace.audit_logs`:**
  Menyimpan buku besar audit (*immutable audit trail*) untuk setiap tindakan operator, pendaftaran batch baru, pembaruan data, dan otorisasi persetujuan.

---

## 💻 2. Cara Menjalankan Aplikasi

Jalankan perintah berikut untuk menyalakan Backend API (Express + PostgreSQL) dan Frontend (Vite + React) secara bersamaan:

```bash
cd /home/ayubw/qr-trace
npm run dev
```

* **Frontend Dashboard:** `http://localhost:5173` (atau `5174`)
* **Backend REST API:** `http://localhost:5000/api`
* **Health Check API:** `http://localhost:5000/api/health`

---

## ⚙️ 3. Konfigurasi Lingkungan (`.env`)

```env
PORT=5000
DATABASE_URL=postgresql://kwas:admin1234@localhost:5432/kwas
DB_SCHEMA=qrtrace
```

---

## 📋 4. Endpoint REST API PostgreSQL

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/health` | Cek status koneksi PostgreSQL |
| `GET` | `/api/batches` | Ambil semua batch dari database PostgreSQL |
| `POST` | `/api/batches` | Simpan batch baru ke database PostgreSQL |
| `PUT` | `/api/batches/:batchNumber` | Update rincian batch & bahan baku di PostgreSQL |
| `DELETE` | `/api/batches/:batchNumber` | Hapus batch dari database PostgreSQL |
| `GET` | `/api/audit-logs` | Ambil riwayat log audit dari PostgreSQL |
| `POST` | `/api/audit-logs` | Catat entri log audit baru ke PostgreSQL |
