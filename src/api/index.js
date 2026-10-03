const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Check Database Connection
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (err) {
      return { status: 'OFFLINE', error: err.message };
    }
  },

  // Get Batches
  async getBatches() {
    try {
      const res = await fetch(`${API_BASE}/batches`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('Gagal mengambil data dari server PostgreSQL');
      return await res.json();
    } catch (err) {
      console.warn('Backend PostgreSQL offline, menggunakan penyimpanan lokal:', err.message);
      return null;
    }
  },

  // Create Batch
  async createBatch(batchData) {
    try {
      const res = await fetch(`${API_BASE}/batches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batchData)
      });
      if (!res.ok) throw new Error('Gagal menyimpan batch ke server PostgreSQL');
      return await res.json();
    } catch (err) {
      console.warn('Gagal sync ke PostgreSQL:', err.message);
      return batchData;
    }
  },

  // Update Batch
  async updateBatch(batchNumber, batchData) {
    try {
      const res = await fetch(`${API_BASE}/batches/${encodeURIComponent(batchNumber)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batchData)
      });
      if (!res.ok) throw new Error('Gagal memperbarui batch di server PostgreSQL');
      return await res.json();
    } catch (err) {
      console.warn('Gagal update ke PostgreSQL:', err.message);
      return batchData;
    }
  },

  // Delete Batch
  async deleteBatch(batchNumber) {
    try {
      const res = await fetch(`${API_BASE}/batches/${encodeURIComponent(batchNumber)}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Gagal menghapus batch di server PostgreSQL');
      return await res.json();
    } catch (err) {
      console.warn('Gagal hapus di PostgreSQL:', err.message);
      return { success: false };
    }
  },

  // Get Audit Logs
  async getAuditLogs() {
    try {
      const res = await fetch(`${API_BASE}/audit-logs`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('Gagal mengambil audit logs dari server PostgreSQL');
      return await res.json();
    } catch (err) {
      console.warn('Gagal mengambil log dari PostgreSQL:', err.message);
      return null;
    }
  },

  // Create Audit Log
  async createAuditLog(logData) {
    try {
      const res = await fetch(`${API_BASE}/audit-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
      });
      if (!res.ok) throw new Error('Gagal mencatat audit log ke PostgreSQL');
      return await res.json();
    } catch (err) {
      console.warn('Gagal log ke PostgreSQL:', err.message);
      return logData;
    }
  }
};
