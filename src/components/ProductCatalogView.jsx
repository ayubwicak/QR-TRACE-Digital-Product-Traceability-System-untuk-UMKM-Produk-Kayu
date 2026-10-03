import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Grid, 
  List, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Leaf, 
  Printer, 
  ArrowRight, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  SlidersHorizontal,
  Package,
  QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function ProductCatalogView({
  batches,
  onSelectBatch,
  onOpenNewBatch,
  onOpenLabelPrint,
  onOpenEditBatch,
  onDeleteBatch,
  onSimulateScan,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const categories = ['Semua', 'F&B / Agrikultur', 'Personal Care & Herbal', 'Nutraceutical / Superfood', 'Teknologi & Elektronik'];

  const filtered = batches.filter(b => {
    const matchesSearch = 
      b.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = 
      categoryFilter === 'Semua' || 
      b.category.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Welcome card */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-white/15 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Sistem Penjejakan Produk & Ketertelusuran Mutu
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            Katalog Produk & Paspor Digital
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
            Kelola identitas digital produk dari asal bahan baku, tahapan pengolahan, hasil uji laboratorium, hingga kode QR pada kemasan konsumen.
          </p>
          <div className="pt-3 flex flex-wrap gap-2.5">
            <button
              onClick={onOpenNewBatch}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              Tambah Produk Baru
            </button>
          </div>
        </div>

        {/* Decorative QR backdrop */}
        <div className="absolute right-4 bottom-4 opacity-10 hidden md:block pointer-events-none">
          <QrCode className="w-56 h-56 text-white" />
        </div>
      </div>

      {/* Filter and Controls Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari nama produk, nomor batch, atau merek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 transition"
            />
          </div>

          {/* View Mode Toggle (Grid vs Table) */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Tampilan:</span>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-white text-emerald-800 font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
                title="Tampilan Kartu (Grid)"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition ${viewMode === 'table' ? 'bg-white text-emerald-800 font-bold shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
                title="Tampilan Tabel (List)"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl transition whitespace-nowrap font-medium ${
                categoryFilter === cat
                  ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(b => (
            <div 
              key={b.batchNumber}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Photo with Overlay Badges */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img 
                    src={b.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80'} 
                    alt={b.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-bold font-mono px-2.5 py-1 rounded-xl shadow-xs border border-slate-200">
                    {b.batchNumber}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> QC {b.qcScore}%
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-lg">
                    {b.category}
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-2.5">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-1 group-hover:text-emerald-800 transition">
                      {b.productName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{b.brand}</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{b.story}"
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Rilis: {b.manufactureDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="line-clamp-1">{b.carbonRating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onOpenLabelPrint(b)}
                    className="p-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition shadow-2xs"
                    title="Cetak Stiker Label Kemasan"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => onOpenEditBatch(b)}
                    className="p-2 text-slate-600 hover:text-emerald-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition shadow-2xs"
                    title="Edit Data Produk"
                  >
                    <Edit3 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => onDeleteBatch(b.batchNumber)}
                    className="p-2 text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 rounded-xl transition shadow-2xs"
                    title="Hapus Produk"
                  >
                    <Trash2 className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSimulateScan(b)}
                    className="text-xs px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium rounded-xl transition shadow-2xs flex items-center gap-1"
                  >
                    <QrCode className="w-3.5 h-3.5 text-slate-500" /> Paspor HP
                  </button>
                  <button
                    onClick={() => onSelectBatch(b)}
                    className="text-xs px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-2xs flex items-center gap-1"
                  >
                    Rincian <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 pl-4">Produk</th>
                  <th className="p-3.5">Nomor Batch & SKU</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Tanggal Rilis</th>
                  <th className="p-3.5">Status QC</th>
                  <th className="p-3.5">Bahan Baku</th>
                  <th className="p-3.5 pr-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(b => (
                  <tr key={b.batchNumber} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 pl-4 flex items-center gap-3">
                      <img 
                        src={b.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80'} 
                        alt={b.productName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{b.productName}</p>
                        <p className="text-[11px] text-slate-500">{b.brand}</p>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-800 font-semibold">
                      <div>{b.batchNumber}</div>
                      <div className="text-[10px] text-slate-400 font-normal">SKU: {b.sku}</div>
                    </td>
                    <td className="p-3.5 text-slate-600">{b.category}</td>
                    <td className="p-3.5 text-slate-600">{b.manufactureDate}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {b.qcScore}%
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{b.materials.length} Komponen</td>
                    <td className="p-3.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenLabelPrint(b)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                          title="Cetak Label"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onSelectBatch(b)}
                          className="px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-medium rounded-lg transition text-xs flex items-center gap-1"
                        >
                          Buka
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3">
          <Package className="w-10 h-10 text-slate-400 mx-auto" />
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Tidak Ada Produk yang Ditemukan</h4>
            <p className="text-xs text-slate-500 mt-0.5">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.</p>
          </div>
          <button
            onClick={() => { setSearchQuery(''); setCategoryFilter('Semua'); }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
          >
            Reset Pencarian
          </button>
        </div>
      )}

    </div>
  );
}
