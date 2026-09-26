import React from 'react';
import { FilterState, Language, VehicleType, DealType } from '../types';
import { BRANDS } from '../data/cars';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
  lang: Language;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  lang
}) => {
  const isAr = lang === 'ar';

  const types: { id: VehicleType; labelEn: string; labelAr: string }[] = [
    { id: 'all', labelEn: 'All Fleet', labelAr: 'كل الأسطول' },
    { id: 'luxury', labelEn: 'Luxury Sedans', labelAr: 'سيدان فاخرة' },
    { id: 'sports', labelEn: 'Supercars', labelAr: 'سوبر كار' },
    { id: 'suv', labelEn: 'Super SUVs', labelAr: 'دفع رباعي' },
    { id: 'electric', labelEn: 'Electric', labelAr: 'كهربائية' }
  ];

  const deals: { id: DealType; labelEn: string; labelAr: string }[] = [
    { id: 'all', labelEn: 'Buy & Rent', labelAr: 'شراء وتأجير' },
    { id: 'buy', labelEn: 'Buy', labelAr: 'شراء' },
    { id: 'rent', labelEn: 'Rent', labelAr: 'تأجير' }
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
      <div className="bg-[#121214] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
        
        {/* Top Controls: Search, Brand, Deal Type, Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-5">
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-[#D4AF37] absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              placeholder={isAr ? 'ابحث عن سيارة، محرك، أو طراز...' : 'Search model, engine, brand...'}
              className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 transition-colors placeholder:text-white/40"
              aria-label="Search car showroom"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-white/50 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Brand Dropdown */}
          <div className="md:col-span-3">
            <select
              value={filters.brand}
              onChange={(e) => onFilterChange({ ...filters, brand: e.target.value })}
              className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer"
              aria-label="Select Car Brand"
            >
              {BRANDS.map(brand => (
                <option key={brand} value={brand} className="bg-[#141416]">
                  {brand === 'All Brands' ? (isAr ? 'جميع العلامات' : 'All Brands') : brand}
                </option>
              ))}
            </select>
          </div>

          {/* Buy vs Rent Toggle */}
          <div className="md:col-span-3">
            <div className="flex bg-[#1A1A1E] p-1 rounded-xl border border-white/15">
              {deals.map(deal => (
                <button
                  key={deal.id}
                  onClick={() => onFilterChange({ ...filters, dealType: deal.id })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    filters.dealType === deal.id
                      ? 'bg-[#D4AF37] text-black shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {isAr ? deal.labelAr : deal.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-2">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
              className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] text-white text-xs rounded-xl px-3 py-2.5 transition-colors cursor-pointer"
              aria-label="Sort inventory"
            >
              <option value="featured" className="bg-[#141416]">{isAr ? 'المميزة أولاً' : 'Featured'}</option>
              <option value="price-asc" className="bg-[#141416]">{isAr ? 'السعر: من الأقل' : 'Price: Low to High'}</option>
              <option value="price-desc" className="bg-[#141416]">{isAr ? 'السعر: من الأعلى' : 'Price: High to Low'}</option>
              <option value="power-desc" className="bg-[#141416]">{isAr ? 'الأعلى قوة (حصان)' : 'Highest Power'}</option>
            </select>
          </div>
        </div>

        {/* Bottom Strip: Vehicle Type Pills & Quick Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button
                key={t.id}
                onClick={() => onFilterChange({ ...filters, type: t.id })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filters.type === t.id
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-sm shadow-[#D4AF37]/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {isAr ? t.labelAr : t.labelEn}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/60">
              {isAr ? (
                <>عرض <strong className="text-[#D4AF37]">{totalResults}</strong> سيارة متاحة</>
              ) : (
                <>Showing <strong className="text-[#D4AF37]">{totalResults}</strong> vehicles</>
              )}
            </span>

            {(filters.searchQuery || filters.brand !== 'All Brands' || filters.type !== 'all' || filters.dealType !== 'all') && (
              <button
                onClick={onReset}
                className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isAr ? 'إعادة ضبط' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
