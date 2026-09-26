import React from 'react';
import { Language } from '../types';
import { Calendar, Clock, Award, ShieldCheck, Check } from 'lucide-react';

interface RentalPlansSectionProps {
  lang: Language;
  onBookRental: (planName: string) => void;
}

export const RentalPlansSection: React.FC<RentalPlansSectionProps> = ({
  lang,
  onBookRental
}) => {
  const isAr = lang === 'ar';

  const plans = [
    {
      id: 'daily',
      nameEn: 'Daily Hire',
      nameAr: 'إيجار يومي',
      priceAed: 'AED 1,800+',
      periodEn: '/ day',
      periodAr: '/ يوم',
      descEn: 'Perfect for weekend getaways, photoshoots, business meetings, or experiencing a dream hypercar.',
      descAr: 'مثالي لعطلات نهاية الأسبوع، جلسات التصوير، واجتماعات كبار الشخصيات في دبي.',
      featuresEn: ['250 km included daily', 'Full comprehensive UAE insurance', 'Free car wash & sanitization', 'Doorstep delivery available'],
      featuresAr: ['250 كم مشمول يومياً', 'تأمين شامل لكافة إمارات الدولة', 'غسيل وتعقيم مجاني', 'توصيل لباب المنزل']
    },
    {
      id: 'weekly',
      nameEn: 'Weekly Prestige',
      nameAr: 'إيجار أسبوعي فندقي',
      priceAed: 'AED 11,000+',
      periodEn: '/ week',
      periodAr: '/ أسبوع',
      popular: true,
      descEn: 'Our most requested package for tourists, VIP delegations, and business leaders visiting the UAE.',
      descAr: 'الباقة الأكثر طلباً للزوار ووفود كبار الشخصيات ورجال الأعمال في دبي وأبوظبي.',
      featuresEn: ['1,750 km included weekly', 'Free Dubai Airport DXB delivery', 'Secondary driver registered free', 'Priority 24/7 concierge support'],
      featuresAr: ['1,750 كم مشمول أسبوعياً', 'توصيل مجاني لمطار دبي الدولي', 'تسجيل سائق إضافي مجاناً', 'دعم كونسيرج على مدار الساعة']
    },
    {
      id: 'monthly',
      nameEn: 'Monthly Executive Lease',
      nameAr: 'إيجار شهري تنفيذي',
      priceAed: 'AED 38,000+',
      periodEn: '/ month',
      periodAr: '/ شهر',
      descEn: 'Long-term supercar luxury with maximum financial flexibility and dedicated vehicle replacement.',
      descAr: 'فخامة طويلة الأمد مع مرونة مالية كاملة وتوفير سيارة بديلة فورية عند الصيانة.',
      featuresEn: ['5,000 km included per month', 'Routine servicing & maintenance included', 'Free replacement vehicle guarantee', 'Bespoke corporate billing'],
      featuresAr: ['5,000 كم مشمول شهرياً', 'الصيانة الدورية وتبديل الإطارات مشمول', 'ضمان توفير سيارة بديلة فورية', 'فواتير مرنة للشركات']
    },
    {
      id: 'chauffeur',
      nameEn: 'VIP Chauffeur & Security',
      nameAr: 'خدمة سائق VIP ومرافقة',
      priceAed: 'AED 800+',
      periodEn: '/ 6 hours',
      periodAr: '/ 6 ساعات',
      descEn: 'Bilingual certified executive chauffeurs dressed in formal attire with immaculate Rolls-Royce or Mercedes fleets.',
      descAr: 'سائقون محترفون ثنائيو اللغة بالزي الرسمي مع أسطول رولز رويس ومرسيدس الفاخر.',
      featuresEn: ['Certified VIP security trained driver', 'Bottled Evian, Wi-Fi & device chargers', 'Airport gate meet & greet', 'Available 24/7 across UAE'],
      featuresAr: ['سائقون مدربون على أعلى معايير البروتوكول', 'مياه فاخرة وإنترنت وشواحن في المركبة', 'استقبال في صالة المطار', 'متوفر على مدار الساعة']
    }
  ];

  return (
    <section id="rentals" className="py-20 bg-gradient-to-b from-[#0A0A0A] via-[#0E1520] to-[#0A0A0A] relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1E3A5F]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-widest block mb-2">
            {isAr ? 'خطط تأجير مرنة ومخصصة' : 'FLEXIBLE LUXURY RENTAL TIERS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            {isAr ? 'استأجر سيارتك الفاخرة بشروطك' : 'Rent With Uncompromising Distinction'}
          </h2>
          <p className="text-sm text-white/70">
            {isAr
              ? 'خيارات تأجير يومية وأسبوعية وشهرية بأسعار شفافة وبدون رسوم خفية مع تأمين شامل وتوصيل VIP.'
              : 'Daily, weekly, and monthly rates tailored for discerning drivers. Complete with comprehensive UAE cover and concierge delivery.'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-[#121214] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'border-2 border-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.25)] -translate-y-2'
                  : 'border border-white/10 hover:border-[#D4AF37]/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider">
                  {isAr ? 'الأكثر طلباً' : 'MOST POPULAR'}
                </div>
              )}

              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  {isAr ? plan.nameAr : plan.nameEn}
                </h3>
                <div className="mb-4">
                  <span className="font-serif text-2xl font-bold text-[#D4AF37]">{plan.priceAed}</span>
                  <span className="text-xs text-white/50">{isAr ? plan.periodAr : plan.periodEn}</span>
                </div>
                <p className="text-xs text-white/60 mb-6 leading-relaxed">
                  {isAr ? plan.descAr : plan.descEn}
                </p>

                <ul className="space-y-2.5 mb-8 border-t border-white/10 pt-4">
                  {(isAr ? plan.featuresAr : plan.featuresEn).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/80">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onBookRental(plan.nameEn)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  plan.popular
                    ? 'bg-[#D4AF37] text-black hover:bg-[#F4E5A3] shadow-md'
                    : 'bg-white/5 hover:bg-white/15 text-white border border-white/15'
                }`}
              >
                {isAr ? 'حجز الباقة' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
