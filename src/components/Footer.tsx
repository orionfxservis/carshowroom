import React, { useState } from 'react';
import { Language } from '../types';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  CreditCard,
  Send,
  CheckCircle2,
  Car,
  Key,
  FileCheck,
  ChevronRight,
  Headphones,
  Globe2
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenBooking: () => void;
  onOpenVanillaExport: () => void;
  onOpenAnalytics: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenBooking,
  onOpenVanillaExport,
  onOpenAnalytics
}) => {
  const isAr = lang === 'ar';
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  return (
    <footer id="contact" className="bg-[#060607] border-t border-[#D4AF37]/25 text-white/70 text-xs">
      {/* Top Banner: Private Collectors' Circle / Newsletter */}
      <div className="border-b border-white/5 bg-gradient-to-r from-[#0C0C0E] via-[#121217] to-[#0C0C0E] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'عضوية النخبة الحصرية' : 'Exclusive VIP Membership'}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                {isAr
                  ? 'انضم إلى دائرة هواة ومقتني السيارات الفائقة'
                  : 'Join the LuxeDrive Private Collectors Circle'}
              </h3>
              <p className="text-xs text-white/60 max-w-2xl leading-relaxed">
                {isAr
                  ? 'احصل على إخطارات حصرية لأحدث السيارات النادرة قبل طرحها بالأسواق، ودعوات خاصة لأيام الحلبات في أوتودروم دبي وحلبة مرسى ياس.'
                  : 'Receive priority allocation alerts for off-market hypercars, private unveilings on Sheikh Zayed Road, and invitations to track days at Dubai Autodrome & Yas Marina.'}
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-xl p-4 flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">{isAr ? 'تم استلام طلب انضمامك بنجاح' : 'VIP Invitation Confirmed'}</p>
                    <p className="text-white/60 text-[11px]">
                      {isAr
                        ? 'سيتواصل معك المستشار الخاص لترتيب دعوتك الحصرية.'
                        : 'Our bespoke concierge will reach out discreetly with your private welcome dossier.'}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    placeholder={isAr ? 'أدخل بريدك الإلكتروني الخاص...' : 'Enter your private email address...'}
                    className="flex-1 bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 outline-none transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A9871E] hover:from-[#F4E5A3] hover:to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(212,175,55,0.25)] flex-shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isAr ? 'انضمام فوري' : 'Join Circle'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        {/* Main 5-Column Grid with Deep Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-14">
          
          {/* Column 1: Brand & Heritage (Col-span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F4E5A3] via-[#D4AF37] to-[#8C6D1F] p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <div className="w-full h-full bg-[#0A0A0A] rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F4E5A3] via-[#D4AF37] to-[#F4E5A3]">
                  LUXEDRIVE
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-mono">
                  DUBAI • ABU DHABI
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-white/60">
              {isAr
                ? 'الوجهة الرائدة الأولى في دولة الإمارات لتجارة واقتناء وتأجير السيارات الفائقة والنادرة. نجمع بين أعلى معايير الخصوصية، الخدمة الملكية، وضمانات الفحص الشاملة.'
                : "Dubai's foremost automotive atelier specializing in rare exotics, bespoke hypercars, and white-glove fleet management with absolute client discretion."}
            </p>

            {/* Official Accreditations */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="text-[10px] font-bold tracking-wider uppercase text-white/40">
                {isAr ? 'الاعتمادات والتراخيص الرسمية' : 'Official Accreditations'}
              </div>
              <div className="flex flex-col gap-1.5 text-[11px] text-white/65">
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span>{isAr ? 'وكيل معتمد من هيئة الطرق والمواصلات RTA #77492' : 'RTA Certified Luxury Dealer #77492'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span>{isAr ? 'ترخيص دائرة الاقتصاد والسياحة بدبي CR: 1049283' : 'Dubai DED Licensed Auto Firm CR: 1049283'}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{isAr ? 'حماية بيانات مشفرة AES-256 E2EE' : 'Client-Side AES-256 Encrypted'}</span>
                </div>
              </div>
            </div>

            {/* Accepted Currencies */}
            <div className="pt-2">
              <div className="text-[10px] font-bold tracking-wider uppercase text-white/40 mb-1.5">
                {isAr ? 'طرق الدفع والعملات المقبولة' : 'Accepted Settlement & Currencies'}
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-white/70">
                {['AED', 'USD', 'EUR', 'GBP', 'Wire Transfer', 'Crypto Escrow'].map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Vehicle Portfolio & Fleet (Col-span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
              <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? 'أسطول السيارات' : 'Showroom Fleet'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inventory" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'السيارات الخارقة (Supercars)' : 'Exotic Supercars'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'صالون الفخامة المطلقة' : 'Ultra-Luxury Saloons'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'سيارات الدفع الرباعي الرياضية' : 'Hyper & Luxury SUVs'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'الهايبرد والكهربائية الفائقة' : 'Electrics & Hybrids'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'أسطول الحلبات والسباقات' : 'Track & Performance'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'مستعمل معتمد فحص 120 نقطة' : 'Certified Pre-Owned (CPO)'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Bespoke Services & Solutions (Col-span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
              <Key className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? 'خدمات النخبة' : 'Bespoke Services'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'توصيل مغلق وشحن دولي' : 'Enclosed Worldwide Freight'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'استقبال وتوصيل مطار DXB VIP' : 'VIP Airport Chauffeur DXB'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'تقييم واستبدال فوري' : 'Instant Consignment & Trade-In'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'تمويل بنكي ميسر (FAB, ENBD)' : 'UAE Bank Supercar Finance'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'حماية النانو سيراميك وتجليد PPF' : 'Ceramic Armor & PPF Detailing'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'تخصيص داخلي وطلب خاص' : 'Custom Tailored Commissioning'}</span>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Showroom Tools (Col-span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
              <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? 'بوابة المعرض' : 'Client Portal'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'الرئيسية' : 'Showroom Home'}</span>
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'المخزون المتاح' : 'Available Inventory'}</span>
                </a>
              </li>
              <li>
                <a href="#rentals" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between group">
                  <span>{isAr ? 'باقات التأجير اليومي والشهري' : 'Daily & Monthly Tariffs'}</span>
                </a>
              </li>
              <li>
                <a
                  href="/page/cookies-policy.html"
                  className="hover:text-[#D4AF37] text-left transition-colors flex items-center justify-between w-full group"
                >
                  <span>{isAr ? 'سياسة ملفات تعريف الارتباط' : 'Cookies Policy'}</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#D4AF37] text-left transition-colors flex items-center justify-between w-full group"
                >
                  <span>{isAr ? 'حجز تجربة قيادة مشفرة' : 'Encrypted Test Drive Booking'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAnalytics}
                  className="hover:text-[#D4AF37] text-left transition-colors flex items-center justify-between w-full group"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{isAr ? 'لوحة التحليلات والمزامنة' : 'Analytics & Telemetry'}</span>
                  </span>
                </button>
              </li>

            </ul>
          </div>

          {/* Column 5: Dubai Flagship HQ & Private Concierge (Col-span 3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? 'المقر وصالة العرض' : 'Dubai Flagship HQ'}</span>
            </h4>
            
            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Sheikh Zayed Road, Exit 43, Al Quoz 1, Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href="tel:+97148005893" className="hover:text-[#D4AF37] transition-colors">
                  +971 4 800 LUXE (5893)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Headphones className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href="https://wa.me/971508887766" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">
                  WhatsApp VIP: +971 50 888 7766
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:concierge@luxedrive-uae.com" className="hover:text-[#D4AF37] transition-colors">
                  concierge@luxedrive-uae.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <p><span className="text-white/90 font-medium">Sat – Thu:</span> 10:00 AM – 10:00 PM</p>
                  <p><span className="text-white/90 font-medium">Friday:</span> 2:00 PM – 10:00 PM</p>
                  <p className="text-[11px] text-[#D4AF37] mt-0.5">VIP Private Lounge: 24/7 By Appointment</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A9871E] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'طلب جلسة استعراض خاصة' : 'Request Private Viewing'}</span>
            </button>
          </div>

        </div>

        {/* Curated UAE Search & Supercar Directory Tag Cloud */}
        <div className="py-6 border-t border-b border-white/5 my-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-white/50 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              {isAr ? 'دليل السيارات الفائقة وكلمات البحث الرائجة' : 'UAE Luxury Automotive Index & Directory'}
            </span>
            <span className="text-[10px] text-white/40 font-mono">
              DXB • AUH • SHJ
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px] text-white/50">
            {[
              'Rolls-Royce Spectre Dubai',
              'Porsche 911 GT3 RS Weissach UAE',
              'Ferrari 296 GTB Sheikh Zayed Road',
              'Lamborghini Revuelto V12 Hybrid',
              'Bentley Continental GT Speed Hire',
              'Mercedes-AMG G63 Rental Dubai',
              'Range Rover SV Long Wheelbase',
              'Supercar Airport Chauffeur DXB',
              'Exotic Car Financing Dubai (FAB & ENBD)',
              'Zero-Knowledge Encrypted Auto Booking',
              'Dubai Autodrome Private Track Day Hire',
              'Direct Supercar Escrow Settlement UAE'
            ].map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md hover:border-[#D4AF37]/40 hover:text-white transition-colors cursor-default"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Regulatory & Corporate Compliance Information Bar */}
        <div className="bg-[#0A0A0C] border border-white/5 rounded-xl p-4 mb-8 text-[11px] text-white/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div>
              <span className="text-white/30 uppercase mr-1.5 font-mono">{isAr ? 'السجل التجاري:' : 'CR:'}</span>
              <span className="text-white/70 font-mono">1049283-DXB</span>
            </div>
            <div>
              <span className="text-white/30 uppercase mr-1.5 font-mono">{isAr ? 'الرقم الضريبي:' : 'TRN:'}</span>
              <span className="text-white/70 font-mono">100392849100003</span>
            </div>
            <div>
              <span className="text-white/30 uppercase mr-1.5 font-mono">{isAr ? 'تصريح أسطول النخبة RTA:' : 'RTA Permit:'}</span>
              <span className="text-white/70 font-mono">UAE-RTA-88219</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="/page/terms-and-conditions.html" className="hover:text-[#D4AF37] transition-colors">{isAr ? 'شروط الخدمة والتعاقد' : 'Terms & Conditions'}</a>
            <span>•</span>
            <a href="/page/privacy-policy.html" className="hover:text-[#D4AF37] transition-colors">{isAr ? 'سياسة الخصوصية والكتمان' : 'Discretion & Privacy Policy'}</a>
            <span>•</span>
            <a href="/page/insurance-terms.html" className="hover:text-[#D4AF37] transition-colors">{isAr ? 'شروط التأمين الشامل' : 'Comprehensive Insurance Terms'}</a>
            <span>•</span>
            <a href="/page/cookies-policy.html" className="hover:text-[#D4AF37] transition-colors text-amber-200/90 font-medium">{isAr ? 'سياسة ملفات تعريف الارتباط' : 'Cookies Policy'}</a>
          </div>
        </div>

        {/* Bottom Credits, Security Standards & Copyright */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-white/40 pt-4 border-t border-white/5">
          <div>
            © {new Date().getFullYear()} LuxeDrive UAE Motor Cars LLC. {isAr ? 'جميع الحقوق محفوظة. صالة عرض معتمدة.' : 'All Rights Reserved. Verified Luxury Showroom.'}
          </div>
          <div className="flex flex-wrap items-center gap-4">

            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>AES-256 E2EE</span>
            </span>
            <span>•</span>
            <span>WCAG 2.1 AA Compliant</span>
            <span>•</span>
            <span>Dubai, UAE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

