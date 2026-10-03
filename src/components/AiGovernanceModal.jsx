import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { AI_GOVERNANCE_RULES } from '../data/mockData';

export default function AiGovernanceModal({ isOpen, onClose }) {
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState(null);

  if (!isOpen) return null;

  const handleTestGuardrail = () => {
    if (!testInput) return;

    const isHarmfulOrMutating = /ubah|hapus|delete|drop|update|bypass|palsukan|kurangi qc/i.test(testInput);
    
    if (isHarmfulOrMutating) {
      setTestOutput({
        allowed: false,
        ruleTriggered: 'Aturan #01 & #04: Larangan Mutasi Langsung',
        confidence: '99.9%',
        result: 'DITOLAK OTOMATIS: Sistem tidak mengizinkan mutasi data langsung atau pengubahan status QC tanpa izin otorisasi manual manusia.'
      });
    } else {
      setTestOutput({
        allowed: true,
        ruleTriggered: '5/5 Aturan Pengawasan Terpenuhi',
        confidence: '97.2%',
        result: `DISETUJUI SEBAGAI DRAF: Rekomendasi narasi berbasis katalog tervalidasi: "${testInput}". Menunggu persetujuan Lead QC.`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-xl max-h-[90vh] overflow-y-auto space-y-5 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Aturan Validasi & Tata Kelola Sistem
              </h3>
              <p className="text-xs text-slate-500">Prinsip Keamanan Data, Verifikasi Mutu & Human-in-the-Loop</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Core Rules List */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            5 Pilar Batasan & Keamanan Data
          </h4>
          
          <div className="grid grid-cols-1 gap-2.5">
            {AI_GOVERNANCE_RULES.map(rule => (
              <div key={rule.id} className="bg-slate-50 border border-slate-200/90 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700">{rule.id}</span>
                    <span className="text-xs font-bold text-slate-900">{rule.name}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-medium">
                      AKTIF
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rule.desc}</p>
                </div>
                <div className="text-[10px] font-mono text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-lg whitespace-nowrap self-start sm:self-center shadow-2xs">
                  {rule.enforcement}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Guardrail Simulator */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> Uji Coba Pengawasan Validasi
            </span>
            <span className="text-[11px] text-slate-500">Ketik perintah untuk menguji filter sistem</span>
          </div>

          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="Contoh: 'Ubah hasil QC jadi Grade A tanpa uji lab' ATAU 'Buat ringkasan produk'"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
            />
            <button
              onClick={handleTestGuardrail}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition shadow-2xs whitespace-nowrap"
            >
              Uji Validasi
            </button>
          </div>

          {testOutput && (
            <div className={`p-3 rounded-lg border text-xs ${
              testOutput.allowed 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <div className="flex items-center justify-between font-bold mb-1">
                <span>{testOutput.ruleTriggered}</span>
                <span className="font-mono text-[10px]">Akurasi: {testOutput.confidence}</span>
              </div>
              <p>{testOutput.result}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
