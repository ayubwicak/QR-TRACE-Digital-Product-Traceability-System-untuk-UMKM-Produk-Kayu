import React, { useState } from 'react';
import { 
  Leaf, 
  X, 
  CheckCircle2, 
  Truck, 
  Sun 
} from 'lucide-react';

export default function EcoCalculatorModal({ isOpen, onClose, batch, onUpdateEcoData }) {
  const [distanceKm, setDistanceKm] = useState(45);
  const [transportMode, setTransportMode] = useState('ev');
  const [packagingType, setPackagingType] = useState('biodegradable');
  const [renewableEnergyPercent, setRenewableEnergyPercent] = useState(80);

  if (!isOpen || !batch) return null;

  const transportFactor = transportMode === 'ev' ? 0.02 : transportMode === 'hybrid' ? 0.08 : 0.18;
  const packagingFactor = packagingType === 'biodegradable' ? 0.05 : packagingType === 'recycled_paper' ? 0.09 : 0.35;
  const energyFactor = (100 - renewableEnergyPercent) * 0.002;

  const totalCO2 = ((distanceKm * transportFactor * 0.05) + packagingFactor + energyFactor).toFixed(2);
  
  let rating = 'A+';
  let colorClass = 'text-emerald-700 border-emerald-300 bg-emerald-50';
  if (totalCO2 > 0.5) {
    rating = 'B';
    colorClass = 'text-amber-800 border-amber-300 bg-amber-50';
  } else if (totalCO2 > 0.25) {
    rating = 'A';
    colorClass = 'text-teal-800 border-teal-300 bg-teal-50';
  }

  const handleApplyEcoData = () => {
    onUpdateEcoData(batch.batchNumber, {
      carbonFootprint: `${totalCO2} kg CO₂e / unit`,
      carbonRating: `${rating} (${rating.includes('A') ? 'Rendah Karbon' : 'Moderat'})`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-xl space-y-5 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Kalkulator Jejak Karbon & ESG (SDG 12)</h3>
              <p className="text-[11px] text-slate-500">Estimasi Emisi Rantai Pasok & Efisiensi Material</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Outcome Card */}
        <div className="bg-teal-50/70 border border-teal-200 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-900 font-bold">
              Hasil Estimasi Emisi Karbon
            </span>
            <p className="text-2xl font-black text-slate-900 font-mono mt-0.5">{totalCO2} <span className="text-xs text-slate-500 font-sans">kg CO₂e / unit</span></p>
          </div>
          <div className={`px-4 py-2 rounded-xl border text-center font-bold text-lg font-mono ${colorClass}`}>
            Rating {rating}
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="space-y-4 text-xs">
          
          {/* Distance Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-700 font-medium">
              <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-teal-600" /> Radius Pasokan Bahan Baku:</span>
              <span className="font-mono text-teal-700 font-bold">{distanceKm} km</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="500" 
              step="5"
              value={distanceKm}
              onChange={e => setDistanceKm(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Transport Mode */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-medium block">Armada Transportasi Logistik:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ev', label: 'Electric EV / Rendah Emisi' },
                { id: 'hybrid', label: 'Hybrid / Biodiesel' },
                { id: 'diesel', label: 'Truk Standar' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTransportMode(t.id)}
                  className={`p-2 rounded-xl text-left border transition text-[11px] font-medium ${
                    transportMode === t.id
                      ? 'bg-teal-50 text-teal-900 border-teal-300 font-semibold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Packaging Type */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-medium block">Material Kemasan Produk:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'biodegradable', label: 'Bio-Degradable Pouch' },
                { id: 'recycled_paper', label: 'Kertas Daur Ulang' },
                { id: 'plastic', label: 'Plastik Standar' }
              ].map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPackagingType(p.id)}
                  className={`p-2 rounded-xl text-left border transition text-[11px] font-medium ${
                    packagingType === p.id
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Renewable Energy Factory */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-700 font-medium">
              <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-amber-600" /> Energi Terbarukan Pabrik (Solar/Hydro):</span>
              <span className="font-mono text-amber-700 font-bold">{renewableEnergyPercent}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="5"
              value={renewableEnergyPercent}
              onChange={e => setRenewableEnergyPercent(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition text-xs"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleApplyEcoData}
            className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            Terapkan ke Paspor Produk
          </button>
        </div>

      </div>
    </div>
  );
}
