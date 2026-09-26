import React, { useState } from 'react';
import { Car, Language, EncryptedBookingPayload } from '../types';
import { encryptBookingData } from '../services/crypto';
import { analytics } from '../services/analytics';
import { cloudSync } from '../services/sync';
import { X, Lock, ShieldCheck, CheckCircle2, KeyRound, Sparkles, Copy, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
  dealType: 'buy' | 'rent' | 'test-drive';
  lang: Language;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  car,
  dealType,
  lang
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [uaeEmirate, setUaeEmirate] = useState('Dubai');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptedResult, setEncryptedResult] = useState<EncryptedBookingPayload | null>(null);
  const [copied, setCopied] = useState(false);

  const isAr = lang === 'ar';

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEncrypting(true);

    try {
      const encryptedPayload = await encryptBookingData({
        carId: car ? car.id : 'vip-general-inquiry',
        carName: car ? car.name : 'Exclusive UAE Fleet Allocation',
        dealType,
        customerName,
        customerPhone,
        customerEmail,
        preferredDate: preferredDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
        uaeEmirate,
        notes
      });

      // Save to analytics service & cloud sync queue
      analytics.recordEncryptedBooking(encryptedPayload);
      cloudSync.queueForSync(encryptedPayload);

      setEncryptedResult(encryptedPayload);
    } catch (err) {
      console.error('Encryption failed:', err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleCopyCipher = () => {
    if (encryptedResult) {
      navigator.clipboard.writeText(encryptedResult.ciphertextHex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setEncryptedResult(null);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={handleReset}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-[#121214] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <h2 id="booking-modal-title" className="font-serif text-2xl font-bold text-white">
              {isAr ? 'حجز VIP مشفر بالكامل (E2EE)' : 'End-to-End Encrypted Reservation'}
            </h2>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'تشفير العميل AES-256-GCM متوافق مع معايير السرية التامة' : 'Client-side AES-256-GCM • Zero-Knowledge Security'}</span>
            </p>
          </div>
        </div>

        {/* Selected Vehicle Summary */}
        <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">
              {isAr ? 'المركبة المطلوبة' : 'Selected Vehicle'}
            </span>
            <div className="text-sm font-semibold text-white">
              {car ? car.name : (isAr ? 'أسطول السيارات الفاخرة' : 'General Luxury Supercar Fleet')}
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase">
            {dealType.toUpperCase()}
          </span>
        </div>

        {!encryptedResult ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">
                {isAr ? 'الاسم الكامل أو اللقب' : 'Full Name / VIP Title'}
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={isAr ? 'سعادة الشيخ / السيد / السيدة...' : 'H.E. / Sheikh / Mr. / Ms.'}
                className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm rounded-xl px-4 py-2.5 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">
                  {isAr ? 'رقم الهاتف / واتساب' : 'Mobile / WhatsApp Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm rounded-xl px-4 py-2.5 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="vip.client@domain.ae"
                  className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm rounded-xl px-4 py-2.5 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">
                  {isAr ? 'مدينة الاستلام / الإمارة' : 'Delivery City / UAE Emirate'}
                </label>
                <select
                  value={uaeEmirate}
                  onChange={(e) => setUaeEmirate(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] text-white text-sm rounded-xl px-4 py-2.5 transition-colors"
                >
                  <option value="Dubai">Dubai (Downtown / Marina / Palm)</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Dubai International Airport (DXB VIP Terminal)">DXB VIP Terminal Terminal</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">
                  {isAr ? 'التاريخ المفضل' : 'Preferred Date & Time'}
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] text-white text-sm rounded-xl px-4 py-2.5 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">
                {isAr ? 'طلبات خاصة / تخصيص' : 'Bespoke Requirements / Chauffeur Requests'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isAr ? 'أدخل أي متطلبات خاصة أو استفسار عن مواصفات محددة...' : 'Any custom delivery instructions, track configuration, or security escort...'}
                className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] text-white text-sm rounded-xl px-4 py-2.5 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isEncrypting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4E5A3] to-[#A9871E] text-black font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isEncrypting ? (
                <>
                  <KeyRound className="w-4 h-4 animate-spin text-black" />
                  <span>{isAr ? 'جاري تشفير البيانات بتقنية AES-256...' : 'Generating 256-bit Ciphertext...'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-black" />
                  <span>{isAr ? 'تشفير وإرسال الحجز الآمن' : 'Encrypt & Submit Secure Reservation'}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* SUCCESS VIEW WITH LIVE CRYPTOGRAPHIC INSPECTION */
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-emerald-300">
                  {isAr ? 'تم تشفير وإرسال حجزك بنجاح' : 'Encrypted Payload Generated & Transmitted'}
                </h4>
                <p className="text-xs text-white/70">
                  {isAr
                    ? `رقم المعاملة المشفرة: ${encryptedResult.bookingId}`
                    : `Encrypted ID: ${encryptedResult.bookingId} • Authenticated with Web Crypto API`}
                </p>
              </div>
            </div>

            {/* Cryptographic Inspector Box */}
            <div className="p-4 rounded-xl bg-black/60 border border-[#D4AF37]/30 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-[#D4AF37]">
                <span className="font-semibold flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{encryptedResult.encryptionAlgorithm}</span>
                </span>
                <button
                  onClick={handleCopyCipher}
                  className="inline-flex items-center gap-1 text-[10px] text-white/60 hover:text-white"
                  title="Copy ciphertext"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Cipher'}</span>
                </button>
              </div>

              <div>
                <span className="text-white/40 block">CIPHERTEXT (Hex):</span>
                <p className="text-white/80 break-all bg-black/40 p-2 rounded border border-white/5 max-h-20 overflow-y-auto">
                  {encryptedResult.ciphertextHex}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-white/40 block">IV (Initialization Vector):</span>
                  <span className="text-white/70">{encryptedResult.ivHex}</span>
                </div>
                <div>
                  <span className="text-white/40 block">SHA-256 FINGERPRINT:</span>
                  <span className="text-white/70 truncate block">{encryptedResult.fingerprintSha256}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed">
              {isAr
                ? 'تم استلام طلبك بأمان وسيصلك اتصال من مستشار كبار الشخصيات لتأكيد موعد استلام أو تجربة قيادة السيارة.'
                : 'Our VIP concierge team has received your encrypted dispatch. A private client advisor will reach out within 15 minutes.'}
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#F4E5A3] transition-colors"
            >
              {isAr ? 'العودة إلى المعرض' : 'Return to Showroom'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
