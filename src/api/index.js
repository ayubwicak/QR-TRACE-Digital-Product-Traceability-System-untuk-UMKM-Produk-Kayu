const API_BASE = '/api';

const TOKEN_KEY = 'qrtrace_auth_token';

function getAuthHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // 1. Token Management
  setToken(token) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  // 2. Authentication & User Profile
  async login(email, password, role) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal login');
    if (data.token) this.setToken(data.token);
    return data;
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal registrasi');
    if (data.token) this.setToken(data.token);
    return data;
  },

  async getMe() {
    try {
      const token = this.getToken();
      if (!token) return null;
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
        signal: AbortSignal.timeout(3000)
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (_err) {
      return null;
    }
  },

  async updateProfile(profileData) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal memperbarui profil');
    return data;
  },

  logout() {
    this.setToken(null);
  },

  // 3. Health & System Status
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET', signal: AbortSignal.timeout(2500) });
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (err) {
      return { status: 'OFFLINE', error: err.message };
    }
  },

  // 4. Batches CRUD
  async getBatches(filters = {}) {
    try {
      let url = `${API_BASE}/batches`;
      const queryParams = new URLSearchParams();
      if (filters.category && filters.category !== 'Semua') queryParams.append('category', filters.category);
      if (filters.search) queryParams.append('search', filters.search);
      if (queryParams.toString()) url += `?${queryParams.toString()}`;

      const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
      if (!res.ok) throw new Error('Gagal mengambil data dari server PostgreSQL');
      return await res.json();
    } catch (err) {
      console.warn('Backend PostgreSQL offline, menggunakan penyimpanan lokal:', err.message);
      return null;
    }
  },

  async getBatch(batchNumber) {
    try {
      const res = await fetch(`${API_BASE}/batches/${encodeURIComponent(batchNumber)}`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('Batch tidak ditemukan');
      return await res.json();
    } catch (_err) {
      return null;
    }
  },

  async createBatch(batchData) {
    try {
      const res = await fetch(`${API_BASE}/batches`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(batchData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan batch ke server PostgreSQL');
      return data;
    } catch (err) {
      console.warn('Gagal sync ke PostgreSQL:', err.message);
      return batchData;
    }
  },

  async updateBatch(batchNumber, batchData) {
    try {
      const res = await fetch(`${API_BASE}/batches/${encodeURIComponent(batchNumber)}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(batchData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memperbarui batch di server PostgreSQL');
      return data;
    } catch (err) {
      console.warn('Gagal update ke PostgreSQL:', err.message);
      return batchData;
    }
  },

  async deleteBatch(batchNumber) {
    try {
      const res = await fetch(`${API_BASE}/batches/${encodeURIComponent(batchNumber)}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menghapus batch di server PostgreSQL');
      return data;
    } catch (err) {
      console.warn('Gagal hapus di PostgreSQL:', err.message);
      return { success: false };
    }
  },

  // 5. Certificates & Compliance Management
  async getCertificates() {
    try {
      const res = await fetch(`${API_BASE}/certificates`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('Gagal mengambil sertifikat');
      return await res.json();
    } catch (_err) {
      return null;
    }
  },

  async getBatchCertificates(batchNumber) {
    try {
      const res = await fetch(`${API_BASE}/certificates/batch/${encodeURIComponent(batchNumber)}`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('Gagal mengambil sertifikat batch');
      return await res.json();
    } catch (_err) {
      return [];
    }
  },

  async createCertificate(certData) {
    try {
      const res = await fetch(`${API_BASE}/certificates`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(certData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan sertifikat');
      return data;
    } catch (err) {
      console.warn('Gagal simpan sertifikat:', err.message);
      return certData;
    }
  },

  // 6. Digital Product Passport Verification Engine
  async verifyBatch(batchNumber) {
    try {
      const res = await fetch(`${API_BASE}/verify/${encodeURIComponent(batchNumber)}`, { signal: AbortSignal.timeout(3500) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verifikasi gagal');
      return data;
    } catch (err) {
      return { verified: false, message: err.message };
    }
  },

  async logScan(batchNumber, meta = {}) {
    try {
      await fetch(`${API_BASE}/verify/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchNumber, ...meta })
      });
    } catch (_err) {
      // non-blocking
    }
  },

  // 7. Analytics & Aggregations
  async getAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/analytics/stats`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('Gagal mengambil statistik analitik');
      return await res.json();
    } catch (_err) {
      return null;
    }
  },

  // 8. AI Copilot Server Evaluation
  async analyzeBatchAI(batchData) {
    try {
      const res = await fetch(`${API_BASE}/ai/analyze-batch`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(batchData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Evaluasi AI gagal');
      return data;
    } catch (_err) {
      return batchData.aiAnalysis || null;
    }
  },

  // 9. Audit Logs
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

  async createAuditLog(logData) {
    try {
      const res = await fetch(`${API_BASE}/audit-logs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(logData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mencatat audit log ke PostgreSQL');
      return data;
    } catch (err) {
      console.warn('Gagal log ke PostgreSQL:', err.message);
      return logData;
    }
  },

  // 10. CSV Report Export
  async exportBatchesCSV() {
    const token = this.getToken();
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/reports/batches/export`, { headers });
    if (!res.ok) throw new Error('Gagal mengunduh laporan CSV');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-audit-qrtrace-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
};
