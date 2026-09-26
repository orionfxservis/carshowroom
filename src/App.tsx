/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Car, FilterState, Language, Theme } from './types';
import { CARS } from './data/cars';
import { analytics } from './services/analytics';
import { cloudSync } from './services/sync';
import { notificationService } from './services/notifications';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchFilterBar } from './components/SearchFilterBar';
import { CarCard } from './components/CarCard';
import { CarDetailModal } from './components/CarDetailModal';
import { BookingModal } from './components/BookingModal';
import { CarCompareDrawer } from './components/CarCompareDrawer';
import { RentalPlansSection } from './components/RentalPlansSection';
import { ServicesSection } from './components/ServicesSection';
import { AnalyticsDashboardModal } from './components/AnalyticsDashboardModal';
import { VanillaExportModal } from './components/VanillaExportModal';
import { OfflineBanner } from './components/OfflineBanner';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    brand: 'All Brands',
    type: 'all',
    dealType: 'all',
    minPrice: 0,
    maxPrice: 3000000,
    sortBy: 'featured'
  });

  // Modal & Drawer States
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<Car | null>(null);
  const [bookingModalState, setBookingModalState] = useState<{
    isOpen: boolean;
    car: Car | null;
    dealType: 'buy' | 'rent' | 'test-drive';
  }>({
    isOpen: false,
    car: null,
    dealType: 'test-drive'
  });
  const [comparedCars, setComparedCars] = useState<Car[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isVanillaExportOpen, setIsVanillaExportOpen] = useState(false);

  // Alerts Count
  const [unreadAlerts, setUnreadAlerts] = useState<number>(0);

  // Initialize analytics & sync
  useEffect(() => {
    analytics.recordPageView();
    notificationService.init();

    const updateAlerts = () => {
      const alerts = analytics.getAlerts();
      setUnreadAlerts(alerts.filter(a => !a.read).length);
    };

    updateAlerts();
    const unsub = analytics.subscribe(updateAlerts);
    return () => unsub();
  }, []);

  // Filtered & Sorted Cars
  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(q);
        const matchesBrand = car.brand.toLowerCase().includes(q);
        const matchesDesc = car.descriptionEn.toLowerCase().includes(q) || car.descriptionAr.includes(q);
        const matchesEngine = car.engine.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesEngine) return false;
      }

      // Brand filter
      if (filters.brand !== 'All Brands' && car.brand !== filters.brand) {
        return false;
      }

      // Category / Type filter
      if (filters.type !== 'all' && car.category !== filters.type) {
        return false;
      }

      // Deal type filter
      if (filters.dealType === 'buy' && car.isBuyAvailable === false) {
        return false;
      }
      if (filters.dealType === 'rent' && (car.isRentAvailable === false || !car.rentPerDayAed)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceAed - b.priceAed;
      if (filters.sortBy === 'price-desc') return b.priceAed - a.priceAed;
      if (filters.sortBy === 'power-desc') return b.horsepower - a.horsepower;
      // Default 'featured'
      return 0;
    });
  }, [filters]);

  // Comparison handlers
  const handleToggleCompare = (car: Car) => {
    setComparedCars(prev => {
      const exists = prev.some(c => c.id === car.id);
      if (exists) {
        return prev.filter(c => c.id !== car.id);
      } else {
        if (prev.length >= 3) {
          alert(lang === 'ar' ? 'يمكنك مقارنة حتى 3 سيارات فقط في آن واحد' : 'You can compare up to 3 vehicles at a time.');
          return prev;
        }
        setIsCompareOpen(true);
        return [...prev, car];
      }
    });
  };

  const handleRemoveCompare = (carId: string) => {
    setComparedCars(prev => prev.filter(c => c.id !== carId));
  };

  const handleClearCompare = () => {
    setComparedCars([]);
    setIsCompareOpen(false);
  };

  // Open booking modal helper
  const handleOpenBooking = (car: Car | null = null, dealType: 'buy' | 'rent' | 'test-drive' = 'test-drive') => {
    if (car) {
      analytics.recordCarInquiry(car.id, car.name);
    }
    setBookingModalState({
      isOpen: true,
      car,
      dealType
    });
  };

  const handleSelectCarForDetail = (car: Car) => {
    analytics.recordCarView(car.id, car.name);
    setSelectedCarForDetail(car);
  };

  const isAr = lang === 'ar';

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`min-h-screen font-sans transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#0A0A0A] text-white selection:bg-[#D4AF37] selection:text-black'
          : 'bg-[#F9F9F8] text-[#1A1A1A] selection:bg-[#D4AF37] selection:text-black'
      }`}
    >
      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#inventory"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-lg shadow-xl"
      >
        {isAr ? 'انتقل مباشرة إلى قائمة السيارات' : 'Skip to car showroom inventory'}
      </a>

      {/* Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={() => setLang(l => (l === 'en' ? 'ar' : 'en'))}
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenVanillaExport={() => setIsVanillaExportOpen(true)}
        onOpenBooking={() => handleOpenBooking(null, 'test-drive')}
        compareCount={comparedCars.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        unreadAlertCount={unreadAlerts}
      />

      {/* Hero Section */}
      <main id="main-content">
        <HeroSection
          lang={lang}
          onExploreClick={() => {
            const el = document.getElementById('inventory');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookClick={() => handleOpenBooking(null, 'test-drive')}
        />

        {/* Search & Filter Bar */}
        <SearchFilterBar
          filters={filters}
          onFilterChange={setFilters}
          onReset={() =>
            setFilters({
              searchQuery: '',
              brand: 'All Brands',
              type: 'all',
              dealType: 'all',
              minPrice: 0,
              maxPrice: 3000000,
              sortBy: 'featured'
            })
          }
          totalResults={filteredCars.length}
          lang={lang}
        />

        {/* Showroom Vehicle Grid Section */}
        <section id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                {isAr ? 'الأسطول الفاخر المتاح للتسليم الفوري' : 'IN-STOCK ALLOCATIONS'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {isAr ? 'سيارات النخبة والسوبر كار في دبي' : 'Featured Luxury & Exotic Cars'}
              </h2>
            </div>

            <div className="text-xs text-white/50">
              {isAr ? 'تم الفحص والتحقق طبقاً لمواصفات الخليج' : 'Verified GCC Spec • 100% Certified Mechanical Inspection'}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredCars.length === 0 ? (
            <div className="py-20 text-center bg-[#141416] rounded-3xl border border-white/10 p-8">
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                {isAr ? 'لم يتم العثور على سيارات مطابقة' : 'No matching vehicles found'}
              </h3>
              <p className="text-xs text-white/60 mb-6">
                {isAr ? 'يرجى تجربة كلمات بحث أخرى أو إزالة الفلاتر النشطة.' : 'Try adjusting your search criteria or clearing filters.'}
              </p>
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    brand: 'All Brands',
                    type: 'all',
                    dealType: 'all',
                    minPrice: 0,
                    maxPrice: 3000000,
                    sortBy: 'featured'
                  })
                }
                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase"
              >
                {isAr ? 'إعادة ضبط الفلاتر' : 'Reset All Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCars.map(car => (
                <CarCard
                  key={car.id}
                  car={car}
                  lang={lang}
                  onSelectCar={handleSelectCarForDetail}
                  onBookCar={handleOpenBooking}
                  isCompared={comparedCars.some(c => c.id === car.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          )}
        </section>

        {/* Flexible Luxury Rental Plans */}
        <RentalPlansSection
          lang={lang}
          onBookRental={(planName) => handleOpenBooking(null, 'rent')}
        />

        {/* Bespoke Services */}
        <ServicesSection
          lang={lang}
          onSelectService={(serviceName) => handleOpenBooking(null, 'test-drive')}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenBooking={() => handleOpenBooking(null, 'test-drive')}
        onOpenVanillaExport={() => setIsVanillaExportOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Offline Alert Banner */}
      <OfflineBanner lang={lang} />

      {/* Modals & Drawers */}
      <CarDetailModal
        car={selectedCarForDetail}
        onClose={() => setSelectedCarForDetail(null)}
        lang={lang}
        onBookNow={handleOpenBooking}
      />

      <BookingModal
        isOpen={bookingModalState.isOpen}
        onClose={() => setBookingModalState({ isOpen: false, car: null, dealType: 'test-drive' })}
        car={bookingModalState.car}
        dealType={bookingModalState.dealType}
        lang={lang}
      />

      <CarCompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        cars={comparedCars}
        onRemoveCar={handleRemoveCompare}
        onClearAll={handleClearCompare}
        lang={lang}
        onBookCar={(car) => handleOpenBooking(car, 'test-drive')}
      />

      <AnalyticsDashboardModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        lang={lang}
      />

      <VanillaExportModal
        isOpen={isVanillaExportOpen}
        onClose={() => setIsVanillaExportOpen(false)}
        lang={lang}
      />
    </div>
  );
}
