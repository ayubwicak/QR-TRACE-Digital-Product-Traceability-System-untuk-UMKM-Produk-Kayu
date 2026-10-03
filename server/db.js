import pg from 'pg';
import dotenv from 'dotenv';
import { INITIAL_BATCHES, INITIAL_AUDIT_LOGS } from '../src/data/mockData.js';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://kwas:admin1234@localhost:5432/kwas',
  ssl: false
});

export async function initDb() {
  const client = await pool.connect();
  try {
    console.log('🔗 Mengkoneksikan ke PostgreSQL...');

    // 1. Buat Schema jika belum ada
    await client.query(`CREATE SCHEMA IF NOT EXISTS qrtrace;`);

    // 2. Buat Tabel Batches
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

    // 3. Buat Tabel Audit Logs
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

    // 4. Seed initial data jika tabel batches masih kosong
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

    // Seed audit logs jika kosong
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

    console.log('✅ Skema tabel dan database PostgreSQL qrtrace siap digunakan!');
  } catch (err) {
    console.error('❌ Gagal inisialisasi PostgreSQL:', err);
    throw err;
  } finally {
    client.release();
  }
}
