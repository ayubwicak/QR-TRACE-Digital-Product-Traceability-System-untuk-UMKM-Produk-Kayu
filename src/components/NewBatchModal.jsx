import React, { useState, useRef } from 'react';
import { 
  Plus, 
  X, 
  Box, 
  CheckCircle2, 
  QrCode,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  AlertCircle
} from 'lucide-react';

export default function NewBatchModal({ isOpen, onClose, onAddBatch, currentBatchCount }) {
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    batchNumber: `BATCH-2026-N0${currentBatchCount + 1}`,
    productName: '',
    brand: 'Kolej Komuniti Temerloh InnoHub',
    sku: `KKT-PRD-${Math.floor(100 + Math.random() * 900)}`,
    category: 'F&B / Agrikultur',
    manufactureDate: new Date().toISOString().split('T')[0],
    expiryDate: '2027-10-15',
    qcStatus: 'Passed (Grade A+)',
    qcInspector: 'Tim Penjamin Mutu KKT & UTDI',
    qcScore: 98.6,
    carbonFootprint: '0.35 kg CO₂e / unit',
    carbonRating: 'A (Rendah Karbon)',
    image: '',
    story: 'Diproduksi menggunakan bahan baku terverifikasi dengan standar pengolahan bersih dan ramah lingkungan.',
    rawMaterial1: 'Bahan Baku Primer Grade Super',
    rawOrigin1: 'Petani Lokal Temerloh',
    rawSupplier1: 'Koperasi Komuniti Sentosa',
    rawRef1: 'RAW-AUTO-01',
    rawMaterial2: 'Kemasan Daur Ulang Ramah Lingkungan',
    rawOrigin2: 'Pusat Kemas Hijau',
    rawSupplier2: 'PT Kemas Lestari',
    rawRef2: 'PCK-AUTO-02',
    step1Desc: 'Pemeriksaan kadar kemurnian dan uji kualitas awal bahan.',
    step2Desc: 'Pemrosesan utama dengan teknologi hemat energi & standar HACCP.',
    step3Desc: 'Pengujian parameter laboratorium dan sertifikasi QC.',
    step4Desc: 'Pengemasan higienis dan penempelan paspor QR Trace.'
  });

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImageError('');
    if (!file) return;

    // Validasi tipe format gambar
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setImageError('Format tidak didukung. Harap pilih file JPG, JPEG, PNG, atau WEBP.');
      return;
    }

    // Validasi ukuran file (maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Ukuran file terlalu besar. Maksimal ukuran gambar adalah 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setImagePreview(base64Data);
      setFormData(prev => ({ ...prev, image: base64Data }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setImageError('');
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const defaultFallbackImage = 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80';
    const newBatchObj = {
      batchNumber: formData.batchNumber,
      productName: formData.productName,
      brand: formData.brand,
      sku: formData.sku,
      category: formData.category,
      manufactureDate: formData.manufactureDate,
      expiryDate: formData.expiryDate,
      qcStatus: formData.qcStatus,
      qcInspector: formData.qcInspector,
      qcScore: Number(formData.qcScore) || 98.5,
      carbonFootprint: formData.carbonFootprint,
      carbonRating: formData.carbonRating,
      image: formData.image || defaultFallbackImage,
      verificationHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      story: formData.story,
      materials: [
        {
          name: formData.rawMaterial1,
          origin: formData.rawOrigin1,
          supplier: formData.rawSupplier1,
          batchRef: formData.rawRef1,
          verified: true
        },
        {
          name: formData.rawMaterial2,
          origin: formData.rawOrigin2,
          supplier: formData.rawSupplier2,
          batchRef: formData.rawRef2,
          verified: true
        }
      ],
      timeline: [
        { step: 'Penerimaan & Uji Bahan Baku', date: formData.manufactureDate, operator: 'Unit Logistik', desc: formData.step1Desc, done: true },
        { step: 'Proses Manufaktur Inti', date: formData.manufactureDate, operator: 'Lini Produksi 01', desc: formData.step2Desc, done: true },
        { step: 'Inspeksi & Uji Laboratorium (QC)', date: formData.manufactureDate, operator: 'Lab Penjamin Mutu', desc: formData.step3Desc, done: true },
        { step: 'Packaging & Cetak Label QR Trace', date: formData.manufactureDate, operator: 'Unit Kemas', desc: formData.step4Desc, done: true }
      ],
      aiAnalysis: {
        confidenceScore: 97.5,
        riskLevel: 'LOW',
        ruleChecked: '5/5 Guardrails Passed',
        anomalyDetected: false,
        summary: `Batch ${formData.batchNumber} berhasil diverifikasi. Integritas data bahan baku dan parameter operasional memenuhi SOP.`,
        ecoScoreRecommendation: 'Jalur pasokan lokal berhasil menekan emisi logistik hingga 22%.'
      }
    };

    onAddBatch(newBatchObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-xl max-h-[90vh] overflow-y-auto space-y-5 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Daftarkan Batch Produksi Baru</h3>
              <p className="text-xs text-slate-500">Buat Paspor Produk Digital & Kode QR Unik</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Baris 1: Batch & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-slate-700 font-medium block mb-1">Nomor Batch (Otomatis)</label>
              <input 
                type="text"
                value={formData.batchNumber}
                readOnly
                className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 font-mono text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="text-slate-700 font-medium block mb-1">SKU / Kode Produk</label>
              <input 
                type="text"
                value={formData.sku}
                onChange={e => setFormData({...formData, sku: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-mono focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Baris 2: Nama Produk & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-slate-700 font-medium block mb-1">Nama Produk</label>
              <input 
                type="text"
                required
                placeholder="Contoh: Keripik Pisang Salai Organik 150g"
                value={formData.productName}
                onChange={e => setFormData({...formData, productName: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-slate-700 font-medium block mb-1">Nama Brand / Unit Usaha</label>
              <input 
                type="text"
                required
                value={formData.brand}
                onChange={e => setFormData({...formData, brand: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Baris 3: Kategori, Tanggal & QC */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="text-slate-700 font-medium block mb-1">Kategori Produk</label>
              <select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
              >
                <option value="F&B / Agrikultur">F&B / Agrikultur</option>
                <option value="Personal Care & Herbal">Personal Care & Herbal</option>
                <option value="Nutraceutical / Superfood">Nutraceutical / Superfood</option>
                <option value="Teknologi & Elektronik">Teknologi & Elektronik</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 font-medium block mb-1">Tgl Manufaktur</label>
              <input 
                type="date"
                value={formData.manufactureDate}
                onChange={e => setFormData({...formData, manufactureDate: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="text-slate-700 font-medium block mb-1">Masa Kadaluarsa</label>
              <input 
                type="date"
                value={formData.expiryDate}
                onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
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

            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50/70 hover:bg-teal-50/40 rounded-2xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Klik untuk Memilih Gambar Produk
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
                    src={imagePreview} 
                    alt="Pratinjau Produk" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Gambar Berhasil Dipilih
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pratinjau siap diterbitkan ke kartu paspor produk.
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

          {/* Bahan Baku Ketertelusuran */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-teal-600" /> Ketertelusuran Bahan Baku (Supply Chain)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input 
                type="text"
                placeholder="Nama Bahan Baku"
                value={formData.rawMaterial1}
                onChange={e => setFormData({...formData, rawMaterial1: e.target.value})}
                className="bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
              />
              <input 
                type="text"
                placeholder="Asal Daerah"
                value={formData.rawOrigin1}
                onChange={e => setFormData({...formData, rawOrigin1: e.target.value})}
                className="bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
              />
              <input 
                type="text"
                placeholder="Nama Supplier"
                value={formData.rawSupplier1}
                onChange={e => setFormData({...formData, rawSupplier1: e.target.value})}
                className="bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
              />
            </div>
          </div>

          {/* Footer Submit */}
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
              <CheckCircle2 className="w-4 h-4 text-white" />
              Terbitkan Batch & QR Paspor
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
