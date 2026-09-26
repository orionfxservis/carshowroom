import React, { useEffect, useRef } from 'react';
import { Language } from '../types';
import { Shield, Sparkles, ChevronRight, Award, Zap, Lock } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onExploreClick: () => void;
  onBookClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreClick,
  onBookClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isAr = lang === 'ar';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes for luxury floating constellations
    const particleCount = Math.min(80, Math.floor(width / 20));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.6 + 0.2
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let angle = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial luxury glow in background
      const grad = ctx.createRadialGradient(
        width * 0.75 + Math.sin(angle) * 40,
        height * 0.35 + Math.cos(angle) * 30,
        20,
        width * 0.75,
        height * 0.35,
        width * 0.6
      );
      grad.addColorStop(0, 'rgba(212, 175, 55, 0.12)');
      grad.addColorStop(0.5, 'rgba(30, 58, 95, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p1.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      angle += 0.005;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#0A0A0A]">
      {/* Interactive Luxury Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Subtle ambient luxury backdrop gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-[#F4E5A3]" />
              <span>
                {isAr ? 'صالة عرض النخبة في الإمارات • دبي' : 'PREMIER LUXURY & SUPERCAR SHOWROOM • UAE'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
              {isAr ? (
                <>
                  امتلك أو استأجر <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E5A3] via-[#D4AF37] to-[#A9871E]">
                    أرقى سيارات العالم
                  </span>
                </>
              ) : (
                <>
                  Drive The Pinnacle Of <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E5A3] via-[#D4AF37] to-[#A9871E]">
                    Automotive Perfection
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
              {isAr
                ? 'استمتع بتجربة امتلاك وتأجير نخبة السيارات الفائقة من رولز رويس، بورشه، فيراري، ولمبورغيني. توصيل فاخر لجميع إمارات الدولة مع حجوزات مؤمنة بتشفير 256-بت.'
                : "Experience Dubai's handpicked inventory of Rolls-Royce, Porsche, Ferrari, and Lamborghini. Buy or rent with white-glove UAE delivery and military-grade 256-bit client encryption."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#A9871E] text-black font-semibold text-sm tracking-wider uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'استكشف السيارات المتاحة' : 'Explore Showroom'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/15 hover:border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#D4AF37]" />
                <span>{isAr ? 'حجز تجربة قيادة مشفرة' : 'Encrypted VIP Booking'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">100%</span>
                <span className="text-[11px] text-white/60">
                  {isAr ? 'فحص وضمان شامل' : 'Verified UAE Specs'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">256-bit</span>
                <span className="text-[11px] text-white/60">
                  {isAr ? 'تشفير E2EE للبيانات' : 'Client E2EE Security'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">24/7</span>
                <span className="text-[11px] text-white/60">
                  {isAr ? 'خدمة كبار الشخصيات' : 'VIP Chauffeur & Support'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Feature (Rolls-Royce / Porsche Showcase) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-b from-[#1A1A1E] to-[#0A0A0A] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2 group">
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=75"
                  alt="Porsche 911 GT3 RS in LuxeDrive Dubai Showroom"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 px-3 py-1 rounded-md text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                  {isAr ? 'حصري • جديد في دبي' : 'EXCLUSIVE ALLOCATION'}
                </div>

                {/* Car Spec Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">
                        {isAr ? 'سوبر كار سباق' : 'Track Weapon'}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white">Porsche 911 GT3 RS</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#D4AF37]">AED 1,350,000</div>
                      <div className="text-[10px] text-white/50">{isAr ? 'أو AED 4,500 / يوم' : 'or AED 4,500/day'}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                    <div>
                      <div className="text-[10px] text-white/50">{isAr ? 'التسارع' : '0-100 km/h'}</div>
                      <div className="text-xs font-bold text-white">3.0s</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/50">{isAr ? 'القوة' : 'Horsepower'}</div>
                      <div className="text-xs font-bold text-white">518 HP</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/50">{isAr ? 'السرعة القصوى' : 'Top Speed'}</div>
                      <div className="text-xs font-bold text-white">296 km/h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
