import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Box, 
  Factory,
  UploadCloud,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function EditBatchModal({ isOpen, onClose, batch, onSaveBatch }) {
  const [formData, setFormData] = useState(null);
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (batch) {
      setFormData(JSON.parse(JSON.stringify(batch)));
    }
  }, [batch]);

  if (!isOpen || !formData) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImageError('');
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setImageError('Format tidak didukung. Pilih JPG, JPEG, PNG, atau WEBP.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError('Ukuran file maksimal 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddMaterial = () => {
    setFormData({
      ...formData,
      materials: [
        ...formData.materials,
        {
          name: '',
          origin: '',
          supplier: '',
          batchRef: `KAY-LOT-${Math.floor(100 + Math.random() * 900)}`,
          verified: false
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

          {/* Upload / Impor Gambar Produk */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-medium block">
              Foto Produk (JPG, JPEG, PNG, WEBP - Maks. 5MB)
            </label>

            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
            />

            {!formData.image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50/70 hover:bg-teal-50/40 rounded-2xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Klik untuk Memilih / Mengganti Gambar Produk
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Mendukung file JPG, JPEG, PNG, WEBP (Maksimal 5MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <img 
                    src={formData.image} 
                    alt="Pratinjau Produk" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Gambar Produk Terpasang
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pratinjau gambar siap diperbarui di katalog & paspor.
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer"
                  >
                    Ganti
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    title="Hapus Gambar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {imageError && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {imageError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="text-slate-700 font-medium block mb-1">Inspektur QC</label>
              <input 
                type="text"
                value={formData.qcInspector}
                onChange={e => setFormData({ ...formData, qcInspector: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
              />
            </div>
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
          </div>

          {/* Raw Materials Dynamic List */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-xs">
                <Box className="w-3.5 h-3.5 text-teal-600" /> Kayu dan Bahan Pendukung ({formData.materials.length})
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
                  <div className="sm:col-span-3">
                    <input 
                      type="text"
                      placeholder="Spesies kayu / bahan / volume"
                      value={mat.name}
                      onChange={e => handleUpdateMaterial(idx, 'name', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-800"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input 
                      type="text"
                      placeholder="Lokasi asal"
                      value={mat.origin}
                      onChange={e => handleUpdateMaterial(idx, 'origin', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-700"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input 
                      type="text"
                      placeholder="Pemasok"
                      value={mat.supplier}
                      onChange={e => handleUpdateMaterial(idx, 'supplier', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-700"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="No. lot / dokumen asal"
                      value={mat.batchRef || ''}
                      onChange={e => handleUpdateMaterial(idx, 'batchRef', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-700"
                    />
                  </div>
                  <label className="sm:col-span-2 flex items-center gap-1.5 text-[10px] text-slate-600">
                    <input
                      type="checkbox"
                      checked={Boolean(mat.verified)}
                      onChange={e => handleUpdateMaterial(idx, 'verified', e.target.checked)}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    Dokumen diperiksa
                  </label>
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
