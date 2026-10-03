import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, initDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Format DB Row to CamelCase object for Frontend
function formatBatchRow(row) {
  return {
    batchNumber: row.batch_number,
    productName: row.product_name,
    brand: row.brand,
    sku: row.sku,
    category: row.category,
    manufactureDate: row.manufacture_date,
    expiryDate: row.expiry_date,
    qcStatus: row.qc_status,
    qcScore: parseFloat(row.qc_score),
    qcInspector: row.qc_inspector,
    carbonFootprint: row.carbon_footprint,
    carbonRating: row.carbon_rating,
    verificationHash: row.verification_hash,
    story: row.story,
    materials: typeof row.materials === 'string' ? JSON.parse(row.materials) : row.materials || [],
    timeline: typeof row.timeline === 'string' ? JSON.parse(row.timeline) : row.timeline || [],
    aiAnalysis: typeof row.ai_analysis === 'string' ? JSON.parse(row.ai_analysis) : row.ai_analysis || {}
  };
}

function formatAuditLogRow(row) {
  return {
    id: row.id,
    timestamp: row.timestamp,
    actor: row.actor,
    action: row.action,
    batchNumber: row.batch_number,
    details: row.details,
    status: row.status,
    hash: row.hash
  };
}

// 1. Health Check
app.get('/api/health', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW() as current_time, current_database(), current_user;');
    res.json({
      status: 'OK',
      database: 'PostgreSQL 18 (Connected)',
      info: dbRes.rows[0]
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// 2. Get All Batches
app.get('/api/batches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM qrtrace.batches ORDER BY created_at DESC;');
    const batches = result.rows.map(formatBatchRow);
    res.json(batches);
  } catch (err) {
    console.error('Error fetching batches:', err);
    res.status(500).json({ error: 'Gagal mengambil data batch dari database PostgreSQL' });
  }
});

// 3. Create New Batch
app.post('/api/batches', async (req, res) => {
  try {
    const b = req.body;
    const query = `
      INSERT INTO qrtrace.batches (
        batch_number, product_name, brand, sku, category,
        manufacture_date, expiry_date, qc_status, qc_score,
        qc_inspector, carbon_footprint, carbon_rating,
        verification_hash, story, materials, timeline, ai_analysis
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *;
    `;
    const values = [
      b.batchNumber, b.productName, b.brand, b.sku, b.category,
      b.manufactureDate, b.expiryDate, b.qcStatus, b.qcScore || 98.0,
      b.qcInspector, b.carbonFootprint || '0.30 kg CO₂e / unit', b.carbonRating || 'A',
      b.verificationHash, b.story, JSON.stringify(b.materials || []),
      JSON.stringify(b.timeline || []), JSON.stringify(b.aiAnalysis || {})
    ];

    const result = await pool.query(query, values);
    res.status(201).json(formatBatchRow(result.rows[0]));
  } catch (err) {
    console.error('Error creating batch:', err);
    res.status(500).json({ error: 'Gagal menyimpan batch baru ke PostgreSQL', details: err.message });
  }
});

// 4. Update Batch
app.put('/api/batches/:batchNumber', async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const b = req.body;

    const query = `
      UPDATE qrtrace.batches SET
        product_name = $1,
        brand = $2,
        sku = $3,
        category = $4,
        manufacture_date = $5,
        expiry_date = $6,
        qc_status = $7,
        qc_score = $8,
        qc_inspector = $9,
        carbon_footprint = $10,
        carbon_rating = $11,
        story = $12,
        materials = $13,
        timeline = $14,
        ai_analysis = $15,
        updated_at = CURRENT_TIMESTAMP
      WHERE batch_number = $16
      RETURNING *;
    `;
    const values = [
      b.productName, b.brand, b.sku, b.category,
      b.manufactureDate, b.expiryDate, b.qcStatus, b.qcScore,
      b.qcInspector, b.carbonFootprint, b.carbonRating,
      b.story, JSON.stringify(b.materials || []),
      JSON.stringify(b.timeline || []), JSON.stringify(b.aiAnalysis || {}),
      batchNumber
    ];

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Batch tidak ditemukan' });
    }
    res.json(formatBatchRow(result.rows[0]));
  } catch (err) {
    console.error('Error updating batch:', err);
    res.status(500).json({ error: 'Gagal memperbarui batch di PostgreSQL', details: err.message });
  }
});

// 5. Delete Batch
app.delete('/api/batches/:batchNumber', async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const result = await pool.query('DELETE FROM qrtrace.batches WHERE batch_number = $1 RETURNING *;', [batchNumber]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Batch tidak ditemukan' });
    }
    res.json({ message: 'Batch berhasil dihapus dari database PostgreSQL', batchNumber });
  } catch (err) {
    console.error('Error deleting batch:', err);
    res.status(500).json({ error: 'Gagal menghapus batch dari PostgreSQL' });
  }
});

// 6. Get All Audit Logs
app.get('/api/audit-logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM qrtrace.audit_logs ORDER BY created_at DESC;');
    const logs = result.rows.map(formatAuditLogRow);
    res.json(logs);
  } catch (err) {
    console.error('Error fetching audit logs:', err);
    res.status(500).json({ error: 'Gagal mengambil log audit dari PostgreSQL' });
  }
});

// 7. Create New Audit Log
app.post('/api/audit-logs', async (req, res) => {
  try {
    const log = req.body;
    const query = `
      INSERT INTO qrtrace.audit_logs (
        id, timestamp, actor, action, batch_number, details, status, hash
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [
      log.id, log.timestamp, log.actor, log.action, log.batchNumber,
      log.details, log.status, log.hash
    ];
    const result = await pool.query(query, values);
    res.status(201).json(formatAuditLogRow(result.rows[0]));
  } catch (err) {
    console.error('Error inserting audit log:', err);
    res.status(500).json({ error: 'Gagal mencatat audit log ke PostgreSQL' });
  }
});

// Start server after database initialization
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server Backend QR Trace aktif di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Server gagal start karena database error:', err);
    process.exit(1);
  });
