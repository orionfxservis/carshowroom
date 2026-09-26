import React from 'react';
import { Language } from '../types';
import { 
  Car, 
  CreditCard, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  RefreshCw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectService
}) => {
  const isAr = lang === 'ar';

  const services = [
    {
      icon: Car,
      titleEn: 'Certified Supercar Sales',
      titleAr: 'بيع السيارات الفاخرة المعتمدة',
      descEn: 'Brand-new and certified pre-owned exotic automobiles with rigorous 160-point mechanical inspection and clean history.',
      descAr: 'سيارات فاخرة جديدة ومستعملة معتمدة خضعت لفحص دقيق يشمل 160 نقطة ميكانيكية وإلكترونية مع تقرير كامل.'
    },
    {
      icon: CreditCard,
      titleEn: 'Expedited VIP Financing',
      titleAr: 'تمويل مصرفي ميسر وسريع',
      descEn: 'Partnership with leading UAE banks (Emirates NBD, FAB, ADCB) offering 3.2% flat profit rates and 15-minute approvals.',
      descAr: 'شراكات حصرية مع كبرى بنوك الإمارات بنسب أرباح تنافسية تبدأ من 3.2% وموافقة مبدئية خلال 15 دقيقة.'
    },
    {
      icon: Wrench,
      titleEn: 'Factory Authorized Maintenance',
      titleAr: 'صيانة معتمدة بقطع أصلية',
      descEn: 'State-of-the-art service facility in Al Quoz with certified master mechanics and 100% genuine factory replacement parts.',
      descAr: 'مركز خدمة متطور في القوز يديره نخبة من الفنيين المعتمدين مع استخدام قطع غيار أصلية 100% وضمان الوكالة.'
    },
    {
      icon: ShieldCheck,
      titleEn: 'Comprehensive Bespoke Insurance',
      titleAr: 'تأمين شامل لكبار الشخصيات',
      descEn: 'Full agency-repair insurance coverage including roadside assistance across UAE, Oman, and GCC borders.',
      descAr: 'تغطية تأمينية شاملة مع إصلاح الوكالة وخدمة المساعدة على الطريق في جميع إمارات الدولة ودول الخليج.'
    },
    {
      icon: Truck,
      titleEn: 'Enclosed Door-to-Door Delivery',
      titleAr: 'نقل ونقل مغلق للسيارات',
      descEn: 'Private enclosed hydraulic car transporters delivering your vehicle directly to your residence, yacht, or private jet hangar.',
      descAr: 'شاحنات نقل هيدروليكية مغلقة ومكيفة تنقل سيارتك بأمان وسرية تامة حتى باب قصرك أو مهبط طائرتك الخاصة.'
    },
    {
      icon: RefreshCw,
      titleEn: 'Instant Trade-In & Consignment',
      titleAr: 'استبدال وبيع بالأمانة فوري',
      descEn: 'Transparent market valuation for your existing supercar within 30 minutes with immediate wire transfer settlement.',
      descAr: 'تقييم فوري لسيارتك الحالية خلال 30 دقيقة بأعلى سعر سوقي مع تحويل بنكي فوري وإجراءات سلسة.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#0A0A0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-widest block mb-2">
            {isAr ? 'خدمات استثنائية مصممة للعميل المميز' : 'COMPREHENSIVE AUTOMOTIVE SOLUTIONS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            {isAr ? 'خدمات لا تضاهى في عالم السيارات' : 'Bespoke Automotive Services'}
          </h2>
          <p className="text-sm text-white/70">
            {isAr
              ? 'نقدم منظومة متكاملة من الخدمات الفاخرة التي تلبي تطلعات عشاق التميز في دولة الإمارات العربية المتحدة.'
              : 'From acquisition and custom financing to factory maintenance and enclosed delivery across Dubai and Abu Dhabi.'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#121214] border border-[#D4AF37]/20 hover:border-[#D4AF37] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {isAr ? s.titleAr : s.titleEn}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {isAr ? s.descAr : s.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'متاح 24/7' : 'Instant Concierge'}</span>
                  </span>
                  <button
                    onClick={() => onSelectService(s.titleEn)}
                    className="text-xs font-semibold text-[#D4AF37] hover:underline"
                  >
                    {isAr ? 'طلب الخدمة ←' : 'Inquire →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
