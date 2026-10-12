import React, { useState } from 'react';
import {
  Search,
  Plus,
  Grid,
  List,
  CheckCircle2,
  Calendar,
  Leaf,
  Printer,
  ArrowRight,
  Edit3,
  Trash2,
  ShieldCheck,
  Package,
  QrCode,
  Download
} from 'lucide-react';
import { api } from '../api';
import { TRANSLATIONS } from '../data/i18n';
import { matchesWoodCategory } from '../data/mockData';

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
  setCategoryFilter,
  lang = 'id'
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [isExporting, setIsExporting] = useState(false);
  const [expandedStories, setExpandedStories] = useState({});

  const toggleStory = (batchNumber, e) => {
    e.stopPropagation();
    setExpandedStories(prev => ({
      ...prev,
      [batchNumber]: !prev[batchNumber]
    }));
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;
  const copy = t.catalogUi;
  const categories = t.landing.categoryKeys.map((key, index) => ({ key, label: t.landing.categories[index] }));

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      await api.exportBatchesCSV();
    } catch (_err) {
      // Fallback export jika offline
      const headers = ['Nomor Batch,Nama Produk,Brand,SKU,Kategori,Tgl Rilis,Masa Garansi/Layanan,Skor QC,Status QC,Pemeriksa,Jejak Karbon'];
      const rows = batches.map(b => `"${b.batchNumber}","${b.productName}","${b.brand}","${b.sku}","${b.category}","${b.manufactureDate}","${b.expiryDate}",${b.qcScore},"${b.qcStatus}","${b.qcInspector}","${b.carbonFootprint}"`);
      const csv = [headers, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `laporan-batches-${Date.now()}.csv`;
      a.click();
    } finally {
      setIsExporting(false);
    }
  };

  const filtered = batches.filter(b => {
    const matchesSearch = 
      b.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = matchesWoodCategory(b.category, categoryFilter);

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-5 sm:space-y-6">

      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0 max-w-3xl">
          <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-blue-700 dark:text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            {copy.eyebrow}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {t.catalogTitle || 'Katalog Produk & Paspor Digital'}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            {t.catalogSubtitle || 'Kelola identitas digital produk dari asal bahan baku, tahapan pengolahan, hasil uji laboratorium, hingga kode QR pada kemasan konsumen.'}
          </p>
        </div>
        <button
          onClick={onOpenNewBatch}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Plus className="h-4 w-4" />
          {t.addNewProduct || 'Tambah Produk Baru'}
        </button>
      </section>

      {/* Filter and Controls Toolbar */}
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          {/* View Mode Toggle & CSV Export */}
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              onClick={handleExportCsv}
              disabled={isExporting}
              aria-label={t.exportCsv || 'Ekspor CSV'}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              title={copy.exportTitle}
            >
              <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">{isExporting ? '...' : (t.exportCsv || 'Ekspor CSV')}</span>
            </button>

            <span className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:inline">{t.viewLabel || 'Tampilan:'}</span>
            <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                aria-label={copy.gridView}
                aria-pressed={viewMode === 'grid'}
                className={`flex h-8 w-9 items-center justify-center rounded-lg transition ${viewMode === 'grid' ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                title={copy.gridView}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                aria-label={copy.tableView}
                aria-pressed={viewMode === 'table'}
                className={`flex h-8 w-9 items-center justify-center rounded-lg transition ${viewMode === 'table' ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                title={copy.tableView}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label={copy.categoryFilter}>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`min-h-9 shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition whitespace-nowrap ${
                categoryFilter === cat.key
                  ? 'border-blue-200 bg-blue-50 font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
          {filtered.length} {t.productsShown}
        </p>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(b => (
            <div 
              key={b.batchNumber}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
            >
              <div>
                {/* Photo with Overlay Badges */}
                <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={b.image || '/images/wood-batches/coffee-table.svg'}
                    alt={b.productName}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/95 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-800 shadow-sm backdrop-blur-sm">
                    {b.batchNumber}
                  </div>
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                    <ShieldCheck className="h-3.5 w-3.5" /> QC {b.qcScore}%
                  </div>
                  <div className="absolute bottom-3 left-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] text-white backdrop-blur-sm">
                    {b.category}
                  </div>
                </div>

                {/* Details Body */}
                <div className="space-y-3 p-4 sm:p-5">
                  <div>
                    <h3 className="text-base font-semibold leading-snug text-slate-900 transition group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                      {b.productName}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{b.brand}</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    <p className="line-clamp-2 break-words text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {b.story}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-600 dark:text-slate-400">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>{copy.release}: {b.manufactureDate}</span>
                    </div>
                    <div className="flex min-w-0 items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                      <Leaf className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      <span className="line-clamp-1">{b.carbonRating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onOpenLabelPrint(b)}
                    className="min-h-10 min-w-10 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    title={copy.printLabel}
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => onOpenEditBatch(b)}
                    className="min-h-10 min-w-10 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    title={copy.editProduct}
                  >
                    <Edit3 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => onDeleteBatch(b.batchNumber)}
                    className="min-h-10 min-w-10 rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-rose-950/40"
                    title={copy.deleteProduct}
                  >
                    <Trash2 className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <button
                    onClick={() => onSimulateScan(b)}
                    className="inline-flex min-h-10 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <QrCode className="h-3.5 w-3.5 text-slate-500" /> {copy.passport}
                  </button>
                  <button
                    onClick={() => onSelectBatch(b)}
                    className="inline-flex min-h-10 items-center justify-center gap-1 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    {copy.details} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                <tr>
                  <th className="p-3.5 pl-4">{copy.product}</th>
                  <th className="p-3.5">{copy.batchSku}</th>
                  <th className="p-3.5">{copy.category}</th>
                  <th className="p-3.5">{copy.releaseDate}</th>
                  <th className="p-3.5">{copy.qcStatus}</th>
                  <th className="p-3.5">{copy.rawMaterials}</th>
                  <th className="p-3.5 pr-4 text-right">{copy.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map(b => (
                  <tr key={b.batchNumber} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                    <td className="p-3.5 pl-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={b.image || '/images/wood-batches/coffee-table.svg'}
                          alt={b.productName}
                          className="h-10 w-10 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                        />
                        <div>
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">{b.productName}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{b.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      <div>{b.batchNumber}</div>
                      <div className="text-[10px] text-slate-400 font-normal">SKU: {b.sku}</div>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{b.category}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{b.manufactureDate}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {b.qcScore}%
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{b.materials.length} {copy.ingredients}</td>
                    <td className="p-3.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenLabelPrint(b)}
                          className="rounded-lg bg-slate-100 p-1.5 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                          title={copy.printLabel}
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onSelectBatch(b)}
                          className="flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                        >
                          {copy.details}
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
        <div className="space-y-3 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <Package className="w-10 h-10 text-slate-400 mx-auto" />
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.noProductsFound}</h4>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{copy.noProducts}</p>
          </div>
          <button
            onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
            className="rounded-xl bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950"
          >
            {copy.resetSearch}
          </button>
        </div>
      )}

    </div>
  );
}
