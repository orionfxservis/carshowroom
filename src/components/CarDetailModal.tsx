import React, { useState, useEffect } from 'react';
import { Car, Language } from '../types';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Gauge, 
  Fuel, 
  Layers, 
  Calendar, 
  Sparkles, 
  Calculator,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  CheckCircle2,
  Award
} from 'lucide-react';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
  lang: Language;
  onBookNow: (car: Car, dealType: 'buy' | 'rent' | 'test-drive') => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  lang,
  onBookNow
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(3);
  const [activeTab, setActiveTab] = useState<'specs' | 'finance' | 'rentals'>('specs');
  const [imgLoaded, setImgLoaded] = useState(true);

  const isAr = lang === 'ar';

  // Prepare full list of multiple images for this vehicle
  const allImages = React.useMemo(() => {
    if (!car) return [];
    
    const list: { url: string; title: string; category: string }[] = [];

    // Add color photos if available
    car.colors.forEach((c) => {
      if (!list.some(item => item.url === c.imageUrl)) {
        list.push({
          url: c.imageUrl,
          title: isAr ? `${car.name} - ${c.name}` : `${car.name} in ${c.name}`,
          category: isAr ? 'هيكل خارجي' : 'Exterior'
        });
      }
    });

    // Add dedicated gallery images
    if (car.galleryImages && car.galleryImages.length > 0) {
      car.galleryImages.forEach(g => {
        if (!list.some(item => item.url === g.url)) {
          list.push({
            url: g.url,
            title: isAr ? g.titleAr : g.titleEn,
            category: isAr ? g.categoryAr : g.category
          });
        }
      });
    }

    // Fallback if none
    if (list.length === 0) {
      list.push({
        url: car.imageUrl,
        title: car.name,
        category: isAr ? 'خارجي' : 'Exterior'
      });
    }

    return list;
  }, [car, isAr]);

  // Reset active image when car changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColorIndex(0);
  }, [car?.id]);

  // Keyboard navigation for closing (Esc) and switching photos (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (allImages.length > 1) {
          setActiveImageIndex(prev => (prev + 1) % allImages.length);
        }
      } else if (e.key === 'ArrowLeft') {
        if (allImages.length > 1) {
          setActiveImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, allImages.length]);

  if (!car) return null;

  const activeColor = car.colors[selectedColorIndex] || car.colors[0];
  const currentPhoto = allImages[activeImageIndex] || allImages[0];

  // Handle color change: update selected color index and find matching photo if present
  const handleSelectColor = (index: number) => {
    setSelectedColorIndex(index);
    const chosenColor = car.colors[index];
    if (chosenColor) {
      const matchIdx = allImages.findIndex(img => img.url === chosenColor.imageUrl);
      if (matchIdx !== -1) {
        setActiveImageIndex(matchIdx);
      }
    }
  };

  // Next / Previous image handlers
  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev + 1) % allImages.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  // EMI Financing Calculation (standard UAE automotive loan ~3.2% annual flat rate)
  const downPaymentAed = Math.round(car.priceAed * (downPaymentPercent / 100));
  const principalAed = car.priceAed - downPaymentAed;
  const interestRate = 0.032;
  const totalInterest = principalAed * interestRate * loanTenureYears;
  const monthlyInstallment = Math.round((principalAed + totalInterest) / (loanTenureYears * 12));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="car-modal-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#121214] border border-[#D4AF37]/35 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 flex flex-col max-h-[94vh]">
        
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-[#D4AF37] hover:text-black text-white border border-white/20 flex items-center justify-center transition-colors shadow-lg"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 pr-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
                  {isAr ? car.badgeAr : car.badge}
                </span>
                <span className="text-xs text-white/50">{car.brand} • {car.year}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70">
                  {isAr ? car.categoryAr : car.category}
                </span>
              </div>
              <h2 id="car-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {car.name}
              </h2>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-white/50">{isAr ? 'سعر الشراء النقدي' : 'Cash Purchase Price'}</div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                AED {car.priceAed.toLocaleString()}
              </div>
              <div className="text-xs text-white/70">
                {isAr ? `أو استئجار يومي: AED ${car.rentPerDayAed.toLocaleString()}` : `Or Daily Rent: AED ${car.rentPerDayAed.toLocaleString()}`}
              </div>
            </div>
          </div>

          {/* MULTIPLE IMAGES SHOWCASE VIEWER */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 h-72 sm:h-96 md:h-[420px] group">
              {/* Active Image */}
              <img
                key={currentPhoto.url}
                src={currentPhoto.url}
                alt={currentPhoto.title}
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imgLoaded ? 'opacity-100' : 'opacity-80'
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

              {/* Prev & Next Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#D4AF37] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all z-20 shadow-lg"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#D4AF37] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all z-20 shadow-lg"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Photo Information Overlay (Bottom Left) */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 max-w-md pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                      {currentPhoto.category}
                    </span>
                    <span className="text-xs text-white/50">
                      {activeImageIndex + 1} / {allImages.length}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white mt-1 line-clamp-1">
                    {currentPhoto.title}
                  </p>
                </div>

                {/* Exterior Swatch Selector */}
                {car.colors.length > 1 && (
                  <div className="hidden sm:flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 pointer-events-auto">
                    <span className="text-[11px] text-white/60 mr-1">
                      {isAr ? 'اللون:' : 'Color:'}
                    </span>
                    {car.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => handleSelectColor(idx)}
                        className={`w-5 h-5 rounded-full border-2 transition-all ${
                          selectedColorIndex === idx
                            ? 'border-[#D4AF37] scale-125 shadow-[0_0_8px_rgba(212,175,55,0.7)]'
                            : 'border-white/30 hover:border-white'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* THUMBNAILS STRIP: Multiple images click selector */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                {allImages.map((img, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={`${img.url}-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-105 shadow-md'
                          : 'border-white/15 opacity-70 hover:opacity-100 hover:border-white/40'
                      }`}
                      aria-label={`View photo ${idx + 1}: ${img.title}`}
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#D4AF37]/15 pointer-events-none" />
                      )}
                      <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1 rounded bg-black/80 text-white">
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Specifications Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="text-[10px] text-white/50 block">{isAr ? 'التسارع (0-100)' : 'Acceleration'}</span>
                <span className="text-xs font-bold text-white">{car.acceleration}</span>
              </div>
            </div>

            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
              <Gauge className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="text-[10px] text-white/50 block">{isAr ? 'القوة الحصانية' : 'Horsepower'}</span>
                <span className="text-xs font-bold text-white">{car.horsepower} HP</span>
              </div>
            </div>

            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
              <Fuel className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="text-[10px] text-white/50 block">{isAr ? 'السرعة القصوى' : 'Top Speed'}</span>
                <span className="text-xs font-bold text-white">{car.topSpeed}</span>
              </div>
            </div>

            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="text-[10px] text-white/50 block">{isAr ? 'المواصفات' : 'Specification'}</span>
                <span className="text-xs font-bold text-white">GCC Official</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation: Specs | Financing | Rental Options */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 px-4 text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              {isAr ? 'المواصفات والتفاصيل' : 'Vehicle Specifications & Details'}
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`pb-3 px-4 text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'finance'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              {isAr ? 'حاسبة التمويل البنكي' : 'UAE Finance Calculator'}
            </button>
            <button
              onClick={() => setActiveTab('rentals')}
              className={`pb-3 px-4 text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'rentals'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              {isAr ? 'باقات الإيجار' : 'Rental Rates'}
            </button>
          </div>

          {/* TAB 1: SPECS & DETAILS */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <p className="text-sm text-white/80 leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                {isAr ? car.descriptionAr : car.descriptionEn}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-[11px] text-white/50 block">{isAr ? 'المحرك' : 'Engine & Power'}</span>
                  <span className="text-xs font-bold text-white">{isAr ? car.engineAr : car.engine}</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-[11px] text-white/50 block">{isAr ? 'ناقل الحركة' : 'Transmission'}</span>
                  <span className="text-xs font-bold text-white">{isAr ? car.transmissionAr : car.transmission}</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-[11px] text-white/50 block">{isAr ? 'الوقود / الطاقة' : 'Fuel / Electric'}</span>
                  <span className="text-xs font-bold text-white">{isAr ? car.fuelAr : car.fuel}</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-[11px] text-white/50 block">{isAr ? 'المقاعد' : 'Seating Capacity'}</span>
                  <span className="text-xs font-bold text-white">{car.seats} {isAr ? 'ركاب' : 'Seats'}</span>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{isAr ? 'فحص شامل 160 نقطة معتمد من خبراء دبي' : '160-Point Comprehensive Mechanical Inspection'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{isAr ? 'تأمين شامل وتوصيل VIP إلى باب منزلك في الإمارات' : 'White-Glove VIP Delivery to your doorstep across UAE'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{isAr ? 'ضمان الوكالة ساري المفعول مع عقد صيانة مجاني' : 'Manufacturer Agency Warranty & Service Contract'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{isAr ? 'تسجيل فوري لدى هيئة الطرق والمواصلات RTA' : 'Immediate RTA Registration & Number Plate Assistance'}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FINANCE CALCULATOR */}
          {activeTab === 'finance' && (
            <div className="p-5 bg-black/40 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                <Calculator className="w-4 h-4" />
                <span>{isAr ? 'تقدير أقساط التمويل البنكي في الإمارات (نسبة 3.2% متوافقة مع الشريعة)' : 'UAE Automotive Bank Finance Estimator (3.2% Islamic Rate)'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/70 block mb-1">
                    {isAr ? `الدفعة الأولى (${downPaymentPercent}%): AED ${downPaymentAed.toLocaleString()}` : `Down Payment (${downPaymentPercent}%): AED ${downPaymentAed.toLocaleString()}`}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/70 block mb-1">
                    {isAr ? `فترة السداد: ${loanTenureYears} سنوات (${loanTenureYears * 12} شهر)` : `Tenure: ${loanTenureYears} Years (${loanTenureYears * 12} Months)`}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-white/60 block">{isAr ? 'القسط الشهري التقديري' : 'Estimated Monthly Installment'}</span>
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                    AED {monthlyInstallment.toLocaleString()} <span className="text-xs font-sans text-white/70">/ month</span>
                  </span>
                </div>
                <span className="text-[11px] text-white/50 max-w-xs text-right">
                  {isAr ? 'موافقة أولية في 15 دقيقة مع أبرز بنوك دبي وأبوظبي' : 'Pre-approval in 15 minutes with top UAE partner banks.'}
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: RENTAL RATES */}
          {activeTab === 'rentals' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-black/40 rounded-xl border border-white/10 text-center">
                <span className="text-xs text-white/60 block mb-1">{isAr ? 'إيجار يومي' : 'Daily Hire'}</span>
                <span className="font-serif text-xl font-bold text-[#D4AF37]">AED {car.rentPerDayAed.toLocaleString()}</span>
                <span className="text-[10px] text-white/50 block mt-1">{isAr ? 'يشمل 250 كم/يوم' : 'Includes 250 km/day'}</span>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-white/10 text-center">
                <span className="text-xs text-white/60 block mb-1">{isAr ? 'إيجار أسبوعي' : 'Weekly Hire'}</span>
                <span className="font-serif text-xl font-bold text-[#D4AF37]">AED {car.rentPerWeekAed.toLocaleString()}</span>
                <span className="text-[10px] text-white/50 block mt-1">{isAr ? 'توفير 15%' : '15% Discount Applied'}</span>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-white/10 text-center">
                <span className="text-xs text-white/60 block mb-1">{isAr ? 'إيجار شهري' : 'Monthly Lease'}</span>
                <span className="font-serif text-xl font-bold text-[#D4AF37]">AED {car.rentPerMonthAed.toLocaleString()}</span>
                <span className="text-[10px] text-white/50 block mt-1">{isAr ? 'صيانة وتأمين شامل' : 'Full Maintenance & Cover'}</span>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'مشمول بضمان الوكالة وفحص معتمد 100%' : 'Verified GCC Spec • 100% Inspection Guarantee'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookNow(car, 'rent');
                }}
                className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
              >
                {isAr ? 'حجز إيجار' : 'Book Rental'}
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookNow(car, 'test-drive');
                }}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#A9871E] text-black text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'حجز تجربة قيادة مشفرة' : 'Encrypted VIP Test Drive'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
