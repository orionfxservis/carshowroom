import React, { useState } from 'react';
import { Car, Language } from '../types';
import { ShieldCheck, Eye, Layers, Check, Camera } from 'lucide-react';

interface CarCardProps {
  car: Car;
  lang: Language;
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car, dealType: 'buy' | 'rent' | 'test-drive') => void;
  isCompared: boolean;
  onToggleCompare: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  lang,
  onSelectCar,
  onBookCar,
  isCompared,
  onToggleCompare
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const isAr = lang === 'ar';

  const activeColor = car.colors[selectedColorIndex] || car.colors[0];
  const activeImageUrl = activeColor ? activeColor.imageUrl : car.imageUrl;
  const imageCount = (car.galleryImages?.length || 0) + car.colors.length;

  return (
    <article
      onClick={() => onSelectCar(car)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectCar(car);
        }
      }}
      tabIndex={0}
      role="button"
      className="group relative bg-[#141416] border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_16px_40px_rgba(212,175,55,0.22)] transition-all duration-300 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
      aria-label={`${isAr ? 'عرض تفاصيل ومواصفات' : 'View details and images for'} ${car.name}`}
    >
      {/* Top Image Container with Optimized Lazy Loading & Hover Eye Overlay */}
      <div className="relative w-full h-56 sm:h-64 bg-[#0A0A0A] overflow-hidden">
        {/* Placeholder blur background */}
        <div
          className={`absolute inset-0 bg-cover bg-center filter blur-md scale-105 transition-opacity duration-500 ${
            imgLoaded ? 'opacity-0' : 'opacity-60'
          }`}
          style={{ backgroundImage: `url(${car.placeholderUrl})` }}
          aria-hidden="true"
        />

        {/* High Resolution Compressed WebP Image with Lazy Loading */}
        <img
          src={activeImageUrl}
          alt={`${car.name} luxury vehicle in UAE showroom`}
          loading="lazy"
          decoding="async"
          width="800"
          height="500"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase pointer-events-auto">
            {isAr ? car.badgeAr : car.badge}
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Multiple Photos Indicator Pill */}
            {imageCount > 1 && (
              <span className="px-2 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-medium flex items-center gap-1">
                <Camera className="w-3 h-3 text-[#D4AF37]" />
                <span>{imageCount} {isAr ? 'صور' : 'Photos'}</span>
              </span>
            )}

            {/* Compare Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(car);
              }}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 transition-all ${
                isCompared
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'bg-black/70 backdrop-blur-md text-white/80 hover:text-white border border-white/20'
              }`}
              aria-label={`Compare ${car.name}`}
              title="Add to spec comparison"
            >
              {isCompared ? <Check className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
              <span>{isCompared ? (isAr ? 'تمت الإضافة' : 'Compared') : (isAr ? 'مقارنة' : '+ Compare')}</span>
            </button>
          </div>
        </div>

        {/* EYE OVERLAY ON HOVER: Visible when cursor moves over the card */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/90 border border-[#D4AF37] text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.45)] transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Eye className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-white">
              {isAr ? 'عرض التفاصيل والصور' : 'View Details & Gallery'}
            </span>
          </div>
        </div>

        {/* Quick Swatch Color Selector On Hover */}
        {car.colors.length > 1 && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 opacity-90 group-hover:opacity-100 transition-opacity"
          >
            {car.colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColorIndex === idx ? 'border-[#D4AF37] scale-125 ring-1 ring-[#D4AF37]' : 'border-white/30'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select color ${c.name}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Car Content Body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category & Year */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#D4AF37] tracking-wider uppercase mb-1">
          <span>{isAr ? car.categoryAr : car.category}</span>
          <span className="text-white/40">{car.year}</span>
        </div>

        {/* Car Name */}
        <h3 className="font-serif text-lg font-bold text-white mb-3 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
          {car.name}
        </h3>

        {/* Specifications Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#0D0D0F] rounded-xl border border-white/5 mb-4 text-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50">{isAr ? 'التسارع' : '0-100 km/h'}</span>
            <span className="text-xs font-semibold text-white">{car.acceleration.replace('0-100 km/h in ', '')}</span>
          </div>
          <div className="flex flex-col border-x border-white/10">
            <span className="text-[10px] text-white/50">{isAr ? 'القوة' : 'Horsepower'}</span>
            <span className="text-xs font-semibold text-white">{car.horsepower} HP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50">{isAr ? 'السرعة' : 'Top Speed'}</span>
            <span className="text-xs font-semibold text-white">{car.topSpeed.split(' ')[0]}</span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-white/50">{isAr ? 'سعر الشراء' : 'Purchase Price'}</div>
            <div className="font-serif text-base font-bold text-[#D4AF37]">
              AED {car.priceAed.toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/50">{isAr ? 'أو استئجار' : 'Or Daily Rent'}</div>
            <div className="text-xs font-semibold text-white">
              AED {car.rentPerDayAed.toLocaleString()} <span className="text-[10px] text-white/50">{isAr ? '/ يوم' : '/ day'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectCar(car);
            }}
            className="py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 hover:border-[#D4AF37]/50 transition-colors flex items-center justify-center gap-1.5"
            aria-label={`View full details & gallery for ${car.name}`}
          >
            <Eye className="w-4 h-4 text-[#D4AF37]" />
            <span>{isAr ? 'التفاصيل والصور' : 'Details & Photos'}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookCar(car, 'test-drive');
            }}
            className="py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#A9871E] text-black text-xs font-semibold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-1"
            aria-label={`Book encrypted reservation for ${car.name}`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isAr ? 'حجز VIP' : 'Reserve VIP'}</span>
          </button>
        </div>

      </div>
    </article>
  );
};
