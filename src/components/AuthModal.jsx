import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  KeyRound, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { api } from '../api';

// Demo preset accounts
const DEMO_ACCOUNTS = [
  {
    name: 'Ahmad Faiz',
    email: 'faiz@kktagrofarm.id',
    role: 'Petugas QC',
    org: 'KKT AgroFarm',
    password: 'password123'
  },
  {
    name: 'Dr. Siti Nurhaliza',
    email: 'siti.esg@auditor.org',
    role: 'Auditor ESG & Karbon',
    org: 'Lembaga Sertifikasi ESG',
    password: 'password123'
  },
  {
    name: 'Budi Santoso',
    email: 'budi.admin@qrtrace.id',
    role: 'Admin Rantai Pasok',
    org: 'QR Trace System',
    password: 'password123'
  }
];

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'login', 
  onLoginSuccess,
  onRegisterSuccess
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState('Petugas QC');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regOrg, setRegOrg] = useState('KKT AgroFarm');
  const [regRole, setRegRole] = useState('Petugas QC');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickLogin = async (account) => {
    setErrorMsg('');
    setLoading(true);
    try {
      // Coba otentikasi via backend JWT
      const res = await api.login(account.email, account.password, account.role);
      onLoginSuccess(res.user);
      onClose();
    } catch (_err) {
      // Fallback offline simulator
      const user = {
        name: account.name,
        email: account.email,
        role: account.role,
        organization: account.org,
        loginTime: new Date().toLocaleTimeString('id-ID')
      };
      onLoginSuccess(user);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginEmail || !loginPassword) {
      setErrorMsg('Mohon isi email dan kata sandi Anda.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.login(loginEmail, loginPassword, loginRole);
      onLoginSuccess(res.user);
      onClose();
    } catch (err) {
      // Tampilkan error jika server aktif mengembalikan error, atau fallback jika offline
      if (err.message && !err.message.includes('fetch') && !err.message.includes('NetworkError')) {
        setErrorMsg(err.message);
      } else {
        // Fallback offline mode jika database belum start
        const userName = loginEmail.split('@')[0] || 'Pengguna System';
        const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
        const user = {
          name: formattedName,
          email: loginEmail,
          role: loginRole,
          organization: 'KKT AgroFarm',
          loginTime: new Date().toLocaleTimeString('id-ID')
        };
        onLoginSuccess(user);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName || !regEmail || !regPassword) {
      setErrorMsg('Mohon lengkapi bidang yang wajib diisi.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Kata sandi minimal harus 6 karakter.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.register({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: regRole,
        organization: regOrg
      });
      onRegisterSuccess(res.user);
      onClose();
    } catch (err) {
      if (err.message && !err.message.includes('fetch') && !err.message.includes('NetworkError')) {
        setErrorMsg(err.message);
      } else {
        const user = {
          name: regName,
          email: regEmail,
          role: regRole,
          organization: regOrg,
          loginTime: new Date().toLocaleTimeString('id-ID')
        };
        onRegisterSuccess(user);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-slate-900 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {mode === 'login' ? 'Masuk ke QR Trace' : 'Daftar Akun Baru'}
              </h2>
              <p className="text-xs text-slate-400">
                Sistem Paspor Digital & Ketertelusuran Mutu
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-slate-800 p-1 rounded-xl mt-4">
            <button
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'login' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk</span>
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'register' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Daftar</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto max-h-[75vh] space-y-4">

          {errorMsg && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* MODE 1: LOGIN */}
          {mode === 'login' && (
            <div className="space-y-4">
              
              {/* Demo Quick Login Helper */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Pilih Akun Demo:
                </div>

                <div className="space-y-1.5">
                  {DEMO_ACCOUNTS.map((acc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickLogin(acc)}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left transition text-xs cursor-pointer"
                    >
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {acc.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {acc.role} • {acc.org}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Masukkan alamat email"
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Masukkan kata sandi"
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Peran Pengguna
                  </label>
                  <select
                    value={loginRole}
                    onChange={(e) => setLoginRole(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                  >
                    <option value="Petugas QC">Petugas QC</option>
                    <option value="Auditor ESG & Karbon">Auditor ESG</option>
                    <option value="Admin Rantai Pasok">Admin Rantai Pasok</option>
                    <option value="Konsumen / Publik">Konsumen</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Memproses...' : 'Masuk'}</span>
                </button>
              </form>
            </div>
          )}

          {/* MODE 2: REGISTER */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Alamat Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Masukkan alamat email"
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Organisasi / Perusahaan
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={regOrg}
                      onChange={(e) => setRegOrg(e.target.value)}
                      placeholder="Nama instansi"
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Peran Pengguna
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                  >
                    <option value="Petugas QC">Petugas QC</option>
                    <option value="Auditor ESG & Karbon">Auditor ESG</option>
                    <option value="Admin Rantai Pasok">Admin Rantai Pasok</option>
                    <option value="Konsumen / Publik">Konsumen</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kata Sandi *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ulangi Kata Sandi *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi"
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                <span>{loading ? 'Memproses...' : 'Daftar Akun'}</span>
              </button>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/50 px-5 py-3 border-t border-slate-200 dark:border-slate-800 text-center text-xs">
          <button 
            type="button" 
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')} 
            className="text-teal-700 dark:text-teal-400 font-semibold hover:underline"
          >
            {mode === 'login' ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
          </button>
        </div>

      </div>
    </div>
  );
}
