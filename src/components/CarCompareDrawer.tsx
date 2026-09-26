import React from 'react';
import { Car, Language } from '../types';
import { X, Layers, Trash2, ShieldCheck, Zap } from 'lucide-react';

interface CarCompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cars: Car[];
  onRemoveCar: (carId: string) => void;
  onClearAll: () => void;
  lang: Language;
  onBookCar: (car: Car) => void;
}

export const CarCompareDrawer: React.FC<CarCompareDrawerProps> = ({
  isOpen,
  onClose,
  cars,
  onRemoveCar,
  onClearAll,
  lang,
  onBookCar
}) => {
  const isAr = lang === 'ar';

  if (!isOpen || cars.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
    >
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl bg-[#121214] border-t sm:border border-[#D4AF37]/40 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <h2 id="compare-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-white">
              {isAr ? `مقارنة المواصفات (${cars.length}/3)` : `Vehicle Specifications Comparison (${cars.length}/3)`}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-white/50 hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'مسح الكل' : 'Clear All'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              aria-label="Close comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-white/40 font-semibold w-1/4">
                  {isAr ? 'المواصفة' : 'Specification'}
                </th>
                {cars.map(c => (
                  <th key={c.id} className="p-3 text-white">
                    <div className="relative mb-2">
                      <img
                        src={c.imageUrl}
                        alt={c.name}
                        className="w-full h-24 object-cover rounded-lg border border-white/10"
                      />
                      <button
                        onClick={() => onRemoveCar(c.id)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]"
                        title="Remove from comparison"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="font-serif text-sm font-bold text-white">{c.name}</div>
                    <div className="text-[11px] text-[#D4AF37] font-semibold">AED {c.priceAed.toLocaleString()}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="p-3 text-white/50 font-medium">{isAr ? 'القوة الحصانية' : 'Horsepower'}</td>
                {cars.map(c => (
                  <td key={c.id} className="p-3 font-semibold text-white">
                    <span className="text-[#D4AF37] font-bold text-sm">{c.horsepower} HP</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-white/50 font-medium">{isAr ? 'التسارع (0-100 كم/س)' : '0-100 km/h'}</td>
                {cars.map(c => (
                  <td key={c.id} className="p-3 font-semibold text-white">
                    {c.acceleration}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-white/50 font-medium">{isAr ? 'السرعة القصوى' : 'Top Speed'}</td>
                {cars.map(c => (
                  <td key={c.id} className="p-3 font-semibold text-white">
                    {c.topSpeed}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-white/50 font-medium">{isAr ? 'المحرك' : 'Engine'}</td>
                {cars.map(c => (
                  <td key={c.id} className="p-3 text-white/80">
                    {isAr ? c.engineAr : c.engine}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-white/50 font-medium">{isAr ? 'ناقل الحركة' : 'Transmission'}</td>
                {cars.map(c => (
                  <td key={c.id} className="p-3 text-white/80">
                    {isAr ? c.transmissionAr : c.transmission}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-white/50 font-medium">{isAr ? 'سعر الإيجار اليومي' : 'Daily Rental'}</td>
                {cars.map(c => (
                  <td key={c.id} className="p-3 text-[#D4AF37] font-semibold">
                    AED {c.rentPerDayAed.toLocaleString()} / day
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-white/50 font-medium">{isAr ? 'حجز فوري' : 'Action'}</td>
                {cars.map(c => (
                  <td key={c.id} className="p-3">
                    <button
                      onClick={() => {
                        onClose();
                        onBookCar(c);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#A9871E] text-black font-semibold text-xs flex items-center justify-center gap-1"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isAr ? 'حجز VIP' : 'Reserve'}</span>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
