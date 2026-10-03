import React from 'react';
import { 
  Search, 
  ChevronRight, 
  Calendar, 
  Layers, 
  X, 
  Copy, 
  Check, 
  Sparkles,
  Tag
} from 'lucide-react';

export default function BatchList({ 
  batches, 
  selectedBatch, 
  onSelectBatch, 
  searchQuery, 
  setSearchQuery, 
  categoryFilter, 
  setCategoryFilter,
  onCopyBatchId
}) {
  const categories = ['Semua', 'F&B', 'Personal Care', 'Nutraceutical'];

  const getCategoryCount = (cat) => {
    if (cat === 'Semua') return batches.length;
    return batches.filter(b => b.category.toLowerCase().includes(cat.toLowerCase())).length;
  };

  const filtered = batches.filter(b => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      b.batchNumber.toLowerCase().includes(q) ||
      b.productName.toLowerCase().includes(q) ||
      b.brand.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q);
    
    const matchesCat = 
      categoryFilter === 'Semua' || 
      b.category.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-3.5">
      
      {/* Header Info */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            Batch Explorer
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Pilih batch untuk inspeksi detail</p>
        </div>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
          {filtered.length} / {batches.length}
        </span>
      </div>

      {/* Search Input with Clear Button */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
        <input 
          type="text"
          placeholder="Cari Batch ID, Produk, Brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8.5 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-slate-900 dark:text-white placeholder-slate-400 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition"
            title="Hapus pencarian"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => {
          const count = getCategoryCount(cat);
          const isActive = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-[11px] px-2.5 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap flex items-center gap-1 font-semibold ${
                isActive
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isActive ? 'bg-teal-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Batch Cards List */}
      <div className="space-y-2.5 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
        {filtered.map(b => {
          const isSelected = selectedBatch?.batchNumber === b.batchNumber;
          const score = b.qcScore || 98;
          const isTopQc = score >= 95;

          return (
            <div
              key={b.batchNumber}
              onClick={() => onSelectBatch(b)}
              className={`group relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                isSelected
                  ? 'bg-teal-50/90 dark:bg-teal-950/40 border-teal-500 dark:border-teal-500 shadow-md shadow-teal-500/5 ring-1 ring-teal-500/20'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50/70 dark:hover:bg-slate-800 shadow-2xs'
              }`}
            >
              {/* Selected Left Accent Bar */}
              {isSelected && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-teal-500 rounded-r" />
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  
                  {/* Top Bar with ID & QC pill */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      {b.batchNumber}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold border ${
                      isTopQc
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/80'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/80'
                    }`}>
                      QC {score}%
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      {b.category.split('/')[0]}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5 line-clamp-1 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                    {b.productName}
                  </h4>
                  
                  {/* Brand */}
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {b.brand}
                  </p>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                  isSelected 
                    ? 'text-teal-600 dark:text-teal-400 translate-x-0.5' 
                    : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-400'
                }`} />
              </div>

              {/* Bottom Metadata Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                  <span>{b.manufactureDate}</span>
                </span>
                
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/70 px-2 py-0.5 rounded-full border border-slate-200/80 dark:border-slate-600">
                    {b.materials.length} Bahan
                  </span>
                  
                  {onCopyBatchId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyBatchId(b.batchNumber);
                      }}
                      className="p-1 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 rounded transition"
                      title="Salin Batch ID"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-8 px-4 bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
            <Layers className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tidak ada batch yang cocok</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter kategori.</p>
            {(searchQuery || categoryFilter !== 'Semua') && (
              <button
                onClick={() => { setSearchQuery(''); setCategoryFilter('Semua'); }}
                className="mt-3 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Reset Semua Filter
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
