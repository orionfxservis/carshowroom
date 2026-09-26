import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../types';
import { 
  Car, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Globe, 
  ShieldCheck, 
  BarChart3, 
  Download, 
  PhoneCall, 
  Bell, 
  Sparkles,
  Layers
} from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenAnalytics: () => void;
  onOpenVanillaExport: () => void;
  onOpenBooking: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  unreadAlertCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onOpenAnalytics,
  onOpenVanillaExport,
  onOpenBooking,
  compareCount,
  onOpenCompare,
  unreadAlertCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAr = lang === 'ar';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-[#D4AF37]/20'
            : 'bg-transparent py-5 border-b border-white/5'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group text-decoration-none"
            aria-label="LuxeDrive UAE Homepage"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F4E5A3] via-[#D4AF37] to-[#8C6D1F] p-[1px] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
              <div className="w-full h-full bg-[#0A0A0A] rounded-[7px] flex items-center justify-center group-hover:bg-[#141416] transition-colors">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F4E5A3] via-[#D4AF37] to-[#F4E5A3]">
                LUXEDRIVE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-white/70 uppercase font-sans">
                {isAr ? 'الإمارات • دبي' : 'UAE • DUBAI'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" role="navigation" aria-label="Desktop Navigation">
            <a
              href="#home"
              className="text-sm font-medium text-white/80 hover:text-[#D4AF37] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1"
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </a>
            <a
              href="#inventory"
              className="text-sm font-medium text-white/80 hover:text-[#D4AF37] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1"
            >
              {isAr ? 'الأسطول الفاخر' : 'Showroom Fleet'}
            </a>
            <a
              href="#rentals"
              className="text-sm font-medium text-white/80 hover:text-[#D4AF37] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1"
            >
              {isAr ? 'باقات التأجير' : 'Rental Plans'}
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-white/80 hover:text-[#D4AF37] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1"
            >
              {isAr ? 'خدمات VIP' : 'Services'}
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-white/80 hover:text-[#D4AF37] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded px-1"
            >
              {isAr ? 'تواصل معنا' : 'Contact'}
            </a>
          </nav>

          {/* Top Actions: Compare, Export, Manager Analytics, Theme, Lang, Reserve */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Drawer Button */}
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="relative p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors"
                title="Compare selected cars"
                aria-label={`Compare ${compareCount} cars`}
              >
                <Layers className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              </button>
            )}

            {/* Zero-NPM GitHub Pages Export Modal Button */}
            <button
              onClick={onOpenVanillaExport}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500 hover:text-black transition-all"
              title="Download clean HTML/CSS/JS with no npm for GitHub Pages deployment"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'كود خالي من NPM' : 'Vanilla Export'}</span>
            </button>

            {/* Manager Operations & Analytics Dashboard Button */}
            <button
              onClick={onOpenAnalytics}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold hover:bg-[#D4AF37] hover:text-black transition-all shadow-sm shadow-[#D4AF37]/20"
              title="Real-time Analytics Dashboard & Operational Alerts"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isAr ? 'لوحة التحليلات' : 'Analytics & Sync'}</span>
              {unreadAlertCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute -top-0.5 -right-0.5" />
              )}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F4E5A3]" /> : <Moon className="w-4 h-4 text-[#D4AF37]" />}
            </button>

            {/* Language Switch */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white/90 border border-white/10 transition-colors flex items-center gap-1"
              aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? 'English' : 'عربي'}</span>
            </button>

            {/* Reserve CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#A9871E] text-black font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'حجز مشفر E2EE' : 'VIP Reserve'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
              aria-label="Toggle Navigation Drawer"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6 text-[#D4AF37]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute top-0 bottom-0 ${isAr ? 'left-0' : 'right-0'} w-4/5 max-w-sm bg-[#0E0E10] border-l border-[#D4AF37]/20 p-6 pt-24 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ${
            isMobileOpen ? 'translate-x-0' : isAr ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/10">
              <p className="text-xs uppercase text-[#D4AF37] font-semibold tracking-wider">
                {isAr ? 'القائمة الرئيسية' : 'Quick Navigation'}
              </p>
            </div>

            <nav className="flex flex-col gap-4">
              <a
                href="#home"
                onClick={() => setIsMobileOpen(false)}
                className="text-lg font-serif text-white hover:text-[#D4AF37] flex items-center justify-between"
              >
                <span>{isAr ? 'الرئيسية' : 'Home'}</span>
                <span className="text-[#D4AF37] text-sm">→</span>
              </a>
              <a
                href="#inventory"
                onClick={() => setIsMobileOpen(false)}
                className="text-lg font-serif text-white hover:text-[#D4AF37] flex items-center justify-between"
              >
                <span>{isAr ? 'السيارات المتاحة' : 'Showroom Inventory'}</span>
                <span className="text-[#D4AF37] text-sm">→</span>
              </a>
              <a
                href="#rentals"
                onClick={() => setIsMobileOpen(false)}
                className="text-lg font-serif text-white hover:text-[#D4AF37] flex items-center justify-between"
              >
                <span>{isAr ? 'باقات التأجير' : 'Rental Plans'}</span>
                <span className="text-[#D4AF37] text-sm">→</span>
              </a>
              <a
                href="#services"
                onClick={() => setIsMobileOpen(false)}
                className="text-lg font-serif text-white hover:text-[#D4AF37] flex items-center justify-between"
              >
                <span>{isAr ? 'خدمات النخبة' : 'Bespoke Services'}</span>
                <span className="text-[#D4AF37] text-sm">→</span>
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="text-lg font-serif text-white hover:text-[#D4AF37] flex items-center justify-between"
              >
                <span>{isAr ? 'اتصل بالمعرض' : 'Contact Dubai HQ'}</span>
                <span className="text-[#D4AF37] text-sm">→</span>
              </a>
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenAnalytics();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-semibold flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>{isAr ? 'فتح لوحة التحليلات' : 'Analytics & Manager Portal'}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenVanillaExport();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-sm font-medium flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تصدير كود GitHub Pages' : 'Export Vanilla HTML/CSS/JS'}</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#A9871E] text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'حجز تجربة قيادة مشفرة' : 'Encrypted VIP Booking'}</span>
            </button>
            <p className="text-center text-[11px] text-white/50 mt-3">
              Sheikh Zayed Road, Dubai • +971 4 800 LUXE
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
