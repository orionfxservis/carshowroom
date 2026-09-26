import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface OfflineBannerProps {
  lang: Language;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ lang }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [justReconnected, setJustReconnected] = useState(false);

  const isAr = lang === 'ar';

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setJustReconnected(true);
      setTimeout(() => setJustReconnected(false), 4000);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline && !justReconnected) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 p-3.5 rounded-2xl shadow-2xl transition-all duration-300 flex items-center gap-3 backdrop-blur-md ${
        isOffline
          ? 'bg-amber-950/90 border border-amber-500/40 text-amber-200'
          : 'bg-emerald-950/90 border border-emerald-500/40 text-emerald-200'
      }`}
      role="status"
      aria-live="polite"
    >
      {isOffline ? (
        <WifiOff className="w-5 h-5 text-amber-400 flex-shrink-0 animate-pulse" />
      ) : (
        <Wifi className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      )}

      <div className="text-xs">
        <strong className="block font-semibold">
          {isOffline
            ? (isAr ? 'وضع عدم الاتصال بالإنترنت' : 'Offline Mode Active')
            : (isAr ? 'تمت استعادة الاتصال' : 'Connection Restored')}
        </strong>
        <p className="text-[11px] opacity-80">
          {isOffline
            ? (isAr ? 'أسطول السيارات والبيانات متاحة بالكامل محلياً عبر Service Worker.' : 'Showroom fleet & specs remain accessible offline via Service Worker cache.')
            : (isAr ? 'تمت مزامنة البيانات تلقائياً مع السحابة.' : 'Cloud telemetry and leads synchronized successfully.')}
        </p>
      </div>
    </div>
  );
};
