import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { INITIAL_BATCHES, INITIAL_AUDIT_LOGS } from '../src/data/mockData.js';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/qrtrace',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export const INITIAL_USERS = [
  {
    id: 'usr_admin_01',
    name: 'Budi Santoso',
    email: 'budi.admin@qrtrace.id',
    password: 'password123',
    role: 'Admin Rantai Pasok',
    organization: 'QR Trace System'
  },
  {
    id: 'usr_qc_01',
    name: 'Ahmad Faiz',
    email: 'faiz@kktagrofarm.id',
    password: 'password123',
    role: 'Petugas QC',
    organization: 'KKT AgroFarm'
  },
  {
    id: 'usr_auditor_01',
    name: 'Dr. Siti Nurhaliza',
    email: 'siti.esg@auditor.org',
    password: 'password123',
    role: 'Auditor ESG & Karbon',
    organization: 'Lembaga Sertifikasi ESG'
  }
];

export const INITIAL_CERTIFICATES = [
  {
    id: 'CERT-COA-001',
    batch_number: 'BATCH-2026-X01',
    cert_type: 'Certificate of Analysis (COA)',
    cert_number: 'COA/KKT/2026/0991',
    issuer: 'Balai Standardisasi Mutu Pangan & Agro (IPEC Certified)',
    issue_date: '2026-10-01',
    expiry_date: '2027-10-01',
    status: 'Valid',
    score: 98.4,
    document_url: 'https://qrtrace.app/docs/certs/COA-0991.pdf',
    hash: '0x8f7a9d2c1e4b3a6f8810e927c44d18fa'
  },
  {
    id: 'CERT-HALAL-001',
    batch_number: 'BATCH-2026-X01',
    cert_type: 'Sertifikat Halal Resmi',
    cert_number: 'ID32110002938810926',
    issuer: 'Badan Penyelenggara Jaminan Produk Halal (BPJPH)',
    issue_date: '2026-08-15',
    expiry_date: '2030-08-15',
    status: 'Valid',
    score: 100.0,
    document_url: 'https://qrtrace.app/docs/certs/HALAL-001.pdf',
    hash: '0x321fa120c88b901a'
  },
  {
    id: 'CERT-ESG-002',
    batch_number: 'BATCH-2026-B02',
    cert_type: 'Kepatuhan Emisi Rendah & ESG',
    cert_number: 'ESG-KARBON/UTDI/2026/041',
    issuer: 'Lembaga Sertifikasi Audit Karbon Nusantara',
    issue_date: '2026-10-02',
    expiry_date: '2027-10-02',
    status: 'Valid',
    score: 99.1,
    document_url: 'https://qrtrace.app/docs/certs/ESG-041.pdf',
    hash: '0x3c91e847a102b55f9a2e6178cd92b450'
  },
  {
    id: 'CERT-ORG-003',
    batch_number: 'BATCH-2026-F03',
    cert_type: 'Sertifikasi Organik Alami',
    cert_number: 'ORG-HUTAN/KKT/2026/882',
    issuer: 'Lembaga Sertifikasi Organik Nasional (LeSON)',
    issue_date: '2026-10-03',
    expiry_date: '2028-10-03',
    status: 'Valid',
    score: 97.5,
    document_url: 'https://qrtrace.app/docs/certs/ORG-882.pdf',
    hash: '0x7e29b451fa80c12e93d8b24168ee3a01'
  }
];

export const INITIAL_SCAN_EVENTS = [
  {
    id: 'scn_1',
    batch_number: 'BATCH-2026-X01',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    device_type: 'iOS Safari',
    ip_address: '175.140.x.x',
    verification_result: 'AUTHENTIC'
  },
  {
    id: 'scn_2',
    batch_number: 'BATCH-2026-X01',
    city: 'Yogyakarta',
    country: 'Indonesia',
    device_type: 'Android Chrome',
    ip_address: '180.252.x.x',
    verification_result: 'AUTHENTIC'
  },
  {
    id: 'scn_3',
    batch_number: 'BATCH-2026-B02',
    city: 'Temerloh',
    country: 'Malaysia',
    device_type: 'Android Chrome',
    ip_address: '115.164.x.x',
    verification_result: 'AUTHENTIC'
  },
  {
    id: 'scn_4',
    batch_number: 'BATCH-2026-F03',
    city: 'Jakarta',
    country: 'Indonesia',
    device_type: 'Desktop Chrome',
    ip_address: '36.85.x.x',
    verification_result: 'AUTHENTIC'
  }
];

export async function initDb() {
  const client = await pool.connect();
  try {
    console.log('🔗 Mengkoneksikan ke PostgreSQL...');

    // 1. Buat Schema jika belum ada
    await client.query(`CREATE SCHEMA IF NOT EXISTS qrtrace;`);

    // 2. Buat Tabel Users
    await client.query(`
      CREATE TABLE IF NOT EXISTS qrtrace.users (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(100) NOT NULL DEFAULT 'Konsumen / Publik',
        organization VARCHAR(255) NOT NULL DEFAULT 'Umum',
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Buat Tabel Batches
    await client.query(`
      CREATE TABLE IF NOT EXISTS qrtrace.batches (
        batch_number VARCHAR(100) PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        sku VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        manufacture_date VARCHAR(50) NOT NULL,
        expiry_date VARCHAR(50) NOT NULL,
        qc_status VARCHAR(100) NOT NULL,
        qc_score NUMERIC(5,2) NOT NULL DEFAULT 98.0,
        qc_inspector VARCHAR(255) NOT NULL,
        carbon_footprint VARCHAR(100) NOT NULL,
        carbon_rating VARCHAR(50) NOT NULL,
        verification_hash VARCHAR(255) NOT NULL,
        story TEXT,
        materials JSONB NOT NULL DEFAULT '[]'::jsonb,
        timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
        ai_analysis JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Buat Tabel Audit Logs
    await client.query(`
      CREATE TABLE IF NOT EXISTS qrtrace.audit_logs (
        id VARCHAR(100) PRIMARY KEY,
        timestamp VARCHAR(100) NOT NULL,
        actor VARCHAR(255) NOT NULL,
        action VARCHAR(100) NOT NULL,
        batch_number VARCHAR(100) NOT NULL,
        details TEXT NOT NULL,
        status VARCHAR(50) NOT NULL,
        hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Buat Tabel Certificates
    await client.query(`
      CREATE TABLE IF NOT EXISTS qrtrace.certificates (
        id VARCHAR(100) PRIMARY KEY,
        batch_number VARCHAR(100) NOT NULL REFERENCES qrtrace.batches(batch_number) ON DELETE CASCADE,
        cert_type VARCHAR(150) NOT NULL,
        cert_number VARCHAR(100) NOT NULL,
        issuer VARCHAR(255) NOT NULL,
        issue_date VARCHAR(50) NOT NULL,
        expiry_date VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Valid',
        score NUMERIC(5,2) DEFAULT 99.0,
        document_url TEXT,
        hash VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Buat Tabel Scan Events (Consumer Analytics & Counterfeit Monitoring)
    await client.query(`
      CREATE TABLE IF NOT EXISTS qrtrace.scan_events (
        id VARCHAR(100) PRIMARY KEY,
        batch_number VARCHAR(100) NOT NULL,
        city VARCHAR(100) DEFAULT 'Indonesia / Malaysia',
        country VARCHAR(100) DEFAULT 'ASEAN',
        device_type VARCHAR(100) DEFAULT 'Web Browser',
        ip_address VARCHAR(100) DEFAULT '127.0.0.1',
        verification_result VARCHAR(50) DEFAULT 'AUTHENTIC',
        scanned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 7. Seed initial users jika kosong
    const userCountRes = await client.query(`SELECT COUNT(*) FROM qrtrace.users;`);
    const userCount = parseInt(userCountRes.rows[0].count, 10);

    if (userCount === 0) {
      console.log('🌱 Menanamkan data user default ke PostgreSQL...');
      for (const u of INITIAL_USERS) {
        const hashed = await bcrypt.hash(u.password, 10);
        await client.query(`
          INSERT INTO qrtrace.users (id, name, email, password_hash, role, organization)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (email) DO NOTHING;
        `, [u.id, u.name, u.email.toLowerCase(), hashed, u.role, u.organization]);
      }
    }

    // 8. Seed initial data jika tabel batches masih kosong
    const countRes = await client.query(`SELECT COUNT(*) FROM qrtrace.batches;`);
    const count = parseInt(countRes.rows[0].count, 10);

    if (count === 0) {
      console.log('🌱 Menanamkan data awal batch ke PostgreSQL...');
      for (const b of INITIAL_BATCHES) {
        await client.query(`
          INSERT INTO qrtrace.batches (
            batch_number, product_name, brand, sku, category,
            manufacture_date, expiry_date, qc_status, qc_score,
            qc_inspector, carbon_footprint, carbon_rating,
            verification_hash, story, materials, timeline, ai_analysis
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);
        `, [
          b.batchNumber, b.productName, b.brand, b.sku, b.category,
          b.manufactureDate, b.expiryDate, b.qcStatus, b.qcScore,
          b.qcInspector, b.carbonFootprint, b.carbonRating,
          b.verificationHash, b.story, JSON.stringify(b.materials),
          JSON.stringify(b.timeline), JSON.stringify(b.aiAnalysis)
        ]);
      }
    }

    // 9. Seed audit logs jika kosong
    const logCountRes = await client.query(`SELECT COUNT(*) FROM qrtrace.audit_logs;`);
    const logCount = parseInt(logCountRes.rows[0].count, 10);

    if (logCount === 0) {
      console.log('🌱 Menanamkan data awal audit log ke PostgreSQL...');
      for (const log of INITIAL_AUDIT_LOGS) {
        await client.query(`
          INSERT INTO qrtrace.audit_logs (
            id, timestamp, actor, action, batch_number, details, status, hash
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `, [
          log.id, log.timestamp, log.actor, log.action, log.batchNumber,
          log.details, log.status, log.hash
        ]);
      }
    }

    // 10. Seed certificates jika kosong
    const certCountRes = await client.query(`SELECT COUNT(*) FROM qrtrace.certificates;`);
    const certCount = parseInt(certCountRes.rows[0].count, 10);

    if (certCount === 0) {
      console.log('🌱 Menanamkan sertifikat mutu resmi ke PostgreSQL...');
      for (const c of INITIAL_CERTIFICATES) {
        await client.query(`
          INSERT INTO qrtrace.certificates (
            id, batch_number, cert_type, cert_number, issuer, issue_date, expiry_date, status, score, document_url, hash
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO NOTHING;
        `, [
          c.id, c.batch_number, c.cert_type, c.cert_number, c.issuer,
          c.issue_date, c.expiry_date, c.status, c.score, c.document_url, c.hash
        ]);
      }
    }

    // 11. Seed scan events jika kosong
    const scanCountRes = await client.query(`SELECT COUNT(*) FROM qrtrace.scan_events;`);
    const scanCount = parseInt(scanCountRes.rows[0].count, 10);

    if (scanCount === 0) {
      console.log('🌱 Menanamkan event pemindaian awal ke PostgreSQL...');
      for (const s of INITIAL_SCAN_EVENTS) {
        await client.query(`
          INSERT INTO qrtrace.scan_events (
            id, batch_number, city, country, device_type, ip_address, verification_result
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (id) DO NOTHING;
        `, [
          s.id, s.batch_number, s.city, s.country, s.device_type, s.ip_address, s.verification_result
        ]);
      }
    }

    console.log('✅ Skema tabel lengkap (users, batches, audit_logs, certificates, scan_events) siap digunakan!');
  } catch (err) {
    console.error('❌ Gagal inisialisasi PostgreSQL:', err);
    throw err;
  } finally {
    client.release();
  }
}
