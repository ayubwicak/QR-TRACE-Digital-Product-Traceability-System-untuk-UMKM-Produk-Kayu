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
    brand: 'UMKM Produk Kayu Temerloh',
    sku: `KKT-PRD-${Math.floor(100 + Math.random() * 900)}`,
    category: 'Furnitur Kayu',
    manufactureDate: new Date().toISOString().split('T')[0],
    expiryDate: '2027-10-15',
    qcStatus: 'Lolos Pemeriksaan Mutu',
    qcInspector: 'Petugas Kontrol Mutu',
    qcScore: 98.6,
    carbonFootprint: '0.35 kg CO₂e / unit',
    carbonRating: 'A (Rendah Karbon)',
    image: '',
    story: 'Produk kayu UMKM dengan asal bahan, proses pengerjaan, hasil pemeriksaan, dan informasi perawatan yang tercatat.',
    rawMaterial1: '',
    rawOrigin1: '',
    rawSupplier1: '',
    rawRef1: '',
    rawVerified1: false,
    rawMaterial2: '',
    rawOrigin2: '',
    rawSupplier2: '',
    rawRef2: '',
    rawVerified2: false,
    step1Desc: 'Periksa spesies, volume, kondisi kayu, pemasok, dan dokumen asal-usul.',
    step2Desc: 'Catat pengeringan, pemotongan, pembentukan, serta perakitan komponen kayu.',
    step3Desc: 'Periksa kadar air sesuai spesifikasi, dimensi, sambungan, dan kualitas permukaan.',
    step4Desc: 'Catat finishing, pengemasan, petunjuk perawatan, dan pemasangan label QR.'
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
    const defaultFallbackImage = 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&w=600&q=80';
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
          verified: formData.rawVerified1
        },
        {
          name: formData.rawMaterial2,
          origin: formData.rawOrigin2,
          supplier: formData.rawSupplier2,
          batchRef: formData.rawRef2,
          verified: formData.rawVerified2
        }
      ].filter(material => [material.name, material.origin, material.supplier, material.batchRef].some(value => value.trim())),
      timeline: [
        { step: 'Penerimaan dan verifikasi kayu', date: formData.manufactureDate, operator: 'Petugas Penerimaan Bahan', desc: formData.step1Desc, done: true },
        { step: 'Pengolahan dan perakitan', date: formData.manufactureDate, operator: 'Bengkel Produksi', desc: formData.step2Desc, done: true },
        { step: 'Pemeriksaan dimensi dan mutu', date: formData.manufactureDate, operator: 'Petugas Kontrol Mutu', desc: formData.step3Desc, done: true },
        { step: 'Finishing, pengemasan, dan label QR', date: formData.manufactureDate, operator: 'Tim Penyelesaian Produk', desc: formData.step4Desc, done: true }
      ],
      aiAnalysis: {
        confidenceScore: 97.5,
        riskLevel: 'LOW',
        ruleChecked: 'Asal kayu, proses, dan pemeriksaan produk ditinjau',
        anomalyDetected: false,
        summary: `Batch ${formData.batchNumber} siap ditinjau. Pastikan dokumen asal kayu, pemasok, tahapan pengerjaan, dan hasil pemeriksaan sesuai catatan usaha.`,
        ecoScoreRecommendation: 'Lengkapi data volume bahan, jarak angkut, energi produksi, dan pemanfaatan sisa potongan kayu.'
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
                placeholder="Contoh: Meja makan kayu jati solid"
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
                <option value="Kayu Olahan & Komponen">Kayu Olahan & Komponen</option>
                <option value="Furnitur Kayu">Furnitur Kayu</option>
                <option value="Kerajinan Kayu">Kerajinan Kayu</option>
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
              <label className="text-slate-700 font-medium block mb-1">Masa Garansi / Layanan</label>
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
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-teal-600" /> Asal Kayu dan Bahan Pendukung
            </span>
            {[
              {
                number: 1,
                title: 'Kayu utama',
                name: 'rawMaterial1',
                origin: 'rawOrigin1',
                supplier: 'rawSupplier1',
                reference: 'rawRef1',
                verified: 'rawVerified1',
                namePlaceholder: 'Spesies, grade, dan volume kayu',
                referencePlaceholder: 'Nomor lot / dokumen asal kayu'
              },
              {
                number: 2,
                title: 'Bahan pendukung',
                name: 'rawMaterial2',
                origin: 'rawOrigin2',
                supplier: 'rawSupplier2',
                reference: 'rawRef2',
                verified: 'rawVerified2',
                namePlaceholder: 'Finishing, perekat, atau komponen',
                referencePlaceholder: 'Nomor lot / dokumen pendukung'
              }
            ].map(material => (
              <div key={material.number} className="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-[11px] font-semibold text-slate-700">{material.title}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder={material.namePlaceholder}
                    value={formData[material.name]}
                    onChange={e => setFormData({ ...formData, [material.name]: e.target.value })}
                    required={material.number === 1}
                    className="bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
                  />
                  <input
                    type="text"
                    placeholder="Lokasi asal bahan"
                    value={formData[material.origin]}
                    onChange={e => setFormData({ ...formData, [material.origin]: e.target.value })}
                    required={material.number === 1}
                    className="bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
                  />
                  <input
                    type="text"
                    placeholder="Nama pemasok"
                    value={formData[material.supplier]}
                    onChange={e => setFormData({ ...formData, [material.supplier]: e.target.value })}
                    required={material.number === 1}
                    className="bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
                  />
                  <input
                    type="text"
                    placeholder={material.referencePlaceholder}
                    value={formData[material.reference]}
                    onChange={e => setFormData({ ...formData, [material.reference]: e.target.value })}
                    required={material.number === 1}
                    className="bg-white border border-slate-200 rounded-lg p-2 text-slate-800"
                  />
                </div>
                <label className="flex items-center gap-2 text-[11px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={formData[material.verified]}
                    onChange={e => setFormData({ ...formData, [material.verified]: e.target.checked })}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  Dokumen sumber sudah diperiksa petugas
                </label>
              </div>
            ))}
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
