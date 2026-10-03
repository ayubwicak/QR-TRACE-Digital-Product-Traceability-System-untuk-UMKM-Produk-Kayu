import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Box, 
  Factory 
} from 'lucide-react';

export default function EditBatchModal({ isOpen, onClose, batch, onSaveBatch }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (batch) {
      setFormData(JSON.parse(JSON.stringify(batch)));
    }
  }, [batch]);

  if (!isOpen || !formData) return null;

  const handleAddMaterial = () => {
    setFormData({
      ...formData,
      materials: [
        ...formData.materials,
        {
          name: 'Bahan Tambahan Baru',
          origin: 'Supplier Lokal',
          supplier: 'CV Mitra Berkualitas',
          batchRef: `RAW-EXT-${Math.floor(100 + Math.random() * 900)}`,
          verified: true
        }
      ]
    });
  };

  const handleRemoveMaterial = (index) => {
    const updated = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: updated });
  };

  const handleUpdateMaterial = (index, field, value) => {
    const updated = [...formData.materials];
    updated[index][field] = value;
    setFormData({ ...formData, materials: updated });
  };

  const handleAddTimelineStep = () => {
    setFormData({
      ...formData,
      timeline: [
        ...formData.timeline,
        {
          step: 'Tahapan Tambahan SOP',
          date: new Date().toISOString().split('T')[0],
          operator: 'Operator Lapangan',
          desc: 'Pengawasan dan kontrol kualitas tambahan.',
          done: true
        }
      ]
    });
  };

  const handleRemoveTimelineStep = (index) => {
    const updated = formData.timeline.filter((_, i) => i !== index);
    setFormData({ ...formData, timeline: updated });
  };

  const handleUpdateTimelineStep = (index, field, value) => {
    const updated = [...formData.timeline];
    updated[index][field] = value;
    setFormData({ ...formData, timeline: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveBatch(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-xl max-h-[92vh] overflow-y-auto space-y-6 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="font-mono text-xs text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">{formData.batchNumber}</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">Edit Rincian Batch & Rantai Pasok</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-slate-700 font-medium block mb-1">Nama Produk</label>
              <input 
                type="text"
                required
                value={formData.productName}
                onChange={e => setFormData({ ...formData, productName: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-slate-700 font-medium block mb-1">Brand / Produsen</label>
              <input 
                type="text"
                required
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="text-slate-700 font-medium block mb-1">Status Pengujian QC</label>
              <input 
                type="text"
                value={formData.qcStatus}
                onChange={e => setFormData({ ...formData, qcStatus: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-emerald-700 font-semibold"
              />
            </div>
            <div>
              <label className="text-slate-700 font-medium block mb-1">Skor QC (0 - 100%)</label>
              <input 
                type="number"
                step="0.1"
                value={formData.qcScore}
                onChange={e => setFormData({ ...formData, qcScore: Number(e.target.value) })}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="text-slate-700 font-medium block mb-1">Inspektur Penanggung Jawab</label>
              <input 
                type="text"
                value={formData.qcInspector}
                onChange={e => setFormData({ ...formData, qcInspector: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
              />
            </div>
          </div>

          {/* Raw Materials Dynamic List */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-xs">
                <Box className="w-3.5 h-3.5 text-teal-600" /> Daftar Bahan Baku ({formData.materials.length})
              </span>
              <button
                type="button"
                onClick={handleAddMaterial}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-teal-800 border border-slate-200 rounded-lg transition font-medium flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3 h-3 text-teal-600" /> Tambah Bahan
              </button>
            </div>

            <div className="space-y-2.5">
              {formData.materials.map((mat, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <div className="sm:col-span-4">
                    <input 
                      type="text"
                      placeholder="Nama Bahan"
                      value={mat.name}
                      onChange={e => handleUpdateMaterial(idx, 'name', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-800"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input 
                      type="text"
                      placeholder="Asal Lokasi"
                      value={mat.origin}
                      onChange={e => handleUpdateMaterial(idx, 'origin', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-700"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <input 
                      type="text"
                      placeholder="Nama Pemasok"
                      value={mat.supplier}
                      onChange={e => handleUpdateMaterial(idx, 'supplier', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-700"
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveMaterial(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="Hapus Bahan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline SOP Dynamic List */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-xs">
                <Factory className="w-3.5 h-3.5 text-teal-600" /> Tahapan Milestone Produksi ({formData.timeline.length})
              </span>
              <button
                type="button"
                onClick={handleAddTimelineStep}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-teal-800 border border-slate-200 rounded-lg transition font-medium flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3 h-3 text-teal-600" /> Tambah Tahap
              </button>
            </div>

            <div className="space-y-2.5">
              {formData.timeline.map((step, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center gap-2">
                    <input 
                      type="text"
                      placeholder="Nama Tahapan"
                      value={step.step}
                      onChange={e => handleUpdateTimelineStep(idx, 'step', e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-md p-1.5 font-bold text-slate-900"
                    />
                    <input 
                      type="text"
                      placeholder="Tanggal"
                      value={step.date}
                      onChange={e => handleUpdateTimelineStep(idx, 'date', e.target.value)}
                      className="w-28 bg-slate-50 border border-slate-200 rounded-md p-1.5 font-mono text-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTimelineStep(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="Hapus Tahap"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input 
                    type="text"
                    placeholder="Deskripsi proses SOP"
                    value={step.desc}
                    onChange={e => handleUpdateTimelineStep(idx, 'desc', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-700"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4 text-white" />
              Simpan Perubahan
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
