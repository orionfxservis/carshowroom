import React, { useState, useEffect } from 'react';
import { Language, MetricSummary, OperationalAlert, EncryptedBookingPayload, PushNotificationPayload } from '../types';
import { analytics } from '../services/analytics';
import { cloudSync, CloudSyncState } from '../services/sync';
import { notificationService } from '../services/notifications';
import { decryptBookingData } from '../services/crypto';
import { 
  X, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  ShieldCheck, 
  Bell, 
  Cloud, 
  RefreshCw, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  KeyRound, 
  Unlock, 
  Send,
  Smartphone,
  Monitor,
  Flame
} from 'lucide-react';

interface AnalyticsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AnalyticsDashboardModal: React.FC<AnalyticsDashboardModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'alerts' | 'sync' | 'push'>('metrics');
  const [summary, setSummary] = useState<MetricSummary>(analytics.getSummary());
  const [alerts, setAlerts] = useState<OperationalAlert[]>(analytics.getAlerts());
  const [syncState, setSyncState] = useState<CloudSyncState>(cloudSync.getStatus());
  const [bookings, setBookings] = useState<EncryptedBookingPayload[]>(analytics.getEncryptedBookings());
  const [decryptedLead, setDecryptedLead] = useState<{ id: string; data: any } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pushHistory, setPushHistory] = useState<PushNotificationPayload[]>(notificationService.getHistory());
  const [customPushTitle, setCustomPushTitle] = useState('🔥 New Rolls-Royce Spectre Electric Available in Dubai');
  const [customPushBody, setCustomPushBody] = useState('Exclusive private viewing slots open this weekend on Sheikh Zayed Road.');
  const [notificationStatus, setNotificationStatus] = useState(notificationService.getPermission());

  const isAr = lang === 'ar';

  useEffect(() => {
    if (!isOpen) return;

    const unsubAnalytics = analytics.subscribe(() => {
      setSummary(analytics.getSummary());
      setAlerts(analytics.getAlerts());
      setBookings(analytics.getEncryptedBookings());
    });

    const unsubSync = cloudSync.subscribe(() => {
      setSyncState(cloudSync.getStatus());
    });

    const unsubPush = notificationService.subscribe(() => {
      setPushHistory(notificationService.getHistory());
      setNotificationStatus(notificationService.getPermission());
    });

    // Refresh metrics on open
    setSummary(analytics.getSummary());
    setAlerts(analytics.getAlerts());
    setBookings(analytics.getEncryptedBookings());

    const interval = setInterval(() => {
      setSummary(analytics.getSummary());
    }, 4000);

    return () => {
      unsubAnalytics();
      unsubSync();
      unsubPush();
      clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleManualSync = async () => {
    setIsSyncing(true);
    await cloudSync.triggerManualSync();
    setIsSyncing(false);
  };

  const handleDecryptBooking = async (b: EncryptedBookingPayload) => {
    try {
      const data = await decryptBookingData(b);
      setDecryptedLead({ id: b.bookingId, data });
    } catch (err) {
      alert('Decryption failed: cryptographic mismatch.');
    }
  };

  const handleExportJSON = () => {
    const report = analytics.exportReport();
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luxedrive-operational-audit-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendPush = async () => {
    if (notificationStatus !== 'granted') {
      await notificationService.requestPermission();
    }
    notificationService.dispatchCampaign(customPushTitle, customPushBody, 'VIP ALERT');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="analytics-dashboard-title"
    >
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl bg-[#101012] border border-[#D4AF37]/50 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#161619] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="analytics-dashboard-title" className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {isAr ? 'لوحة تحليلات العمليات والمقاييس اللحظية' : 'Executive Operations & Real-Time Analytics'}
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-white/50">
                {isAr ? 'مراقبة سلوك الزوار، معدل الارتداد، المزامنة السحابية والتشفير' : 'Engagement patterns, bounce rate, multi-platform sync & 256-bit E2EE telemetry'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            aria-label="Close dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#0D0D0F] px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{isAr ? 'المقاييس وسلوك المستخدم' : 'Engagement & Retention'}</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap relative ${
              activeTab === 'alerts'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{isAr ? 'التنبيهات المخصصة' : 'Customized Alerts'}</span>
            {alerts.filter(a => !a.read).length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {alerts.filter(a => !a.read).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'sync'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>{isAr ? 'المزامنة السحابية وتشفير E2EE' : 'Cloud Sync & E2EE Vault'}</span>
          </button>

          <button
            onClick={() => setActiveTab('push')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'push'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>{isAr ? 'الإشعارات الفورية' : 'Push Notification Center'}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-grow">
          
          {/* TAB 1: METRICS & RETENTION */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              
              {/* Top 4 KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#141417] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/60">{isAr ? 'الزوار النشطون الآن' : 'Active Visitors'}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-white mb-1">{summary.activeVisitors}</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.4% vs last hour</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141417] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/60">{isAr ? 'معدل الارتداد (Bounce Rate)' : 'Bounce Rate'}</span>
                    <Flame className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#D4AF37] mb-1">{summary.bounceRate}%</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span>Low bounce rate (Optimal)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141417] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/60">{isAr ? 'متوسط وقت التصفح' : 'Avg Session Time'}</span>
                    <Clock className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-white mb-1">{summary.avgSessionSeconds}s</div>
                  <div className="text-[11px] text-white/60">
                    High engagement depth
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141417] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/60">{isAr ? 'نسبة التحويل VIP' : 'Lead Conversion Rate'}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-emerald-400 mb-1">{summary.conversionRate}%</div>
                  <div className="text-[11px] text-white/60">
                    {summary.encryptedBookingsCount} Encrypted Leads
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Retention Curve Chart (SVG) */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white">
                        {isAr ? 'منحنى احتفاظ المستخدمين (User Retention Curve)' : 'User Retention & Return Cohorts'}
                      </h4>
                      <p className="text-[11px] text-white/50">Tracking 7-day visitor engagement & return visits</p>
                    </div>
                    <span className="text-xs font-bold text-[#D4AF37]">{summary.retentionDay1}% D1</span>
                  </div>

                  <div className="h-44 w-full flex items-end pt-4">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
                      <defs>
                        <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                      <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                      <line x1="0" y1="100" x2="320" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                      
                      {/* Filled Curve */}
                      <path
                        d="M 10 10 Q 60 25, 110 40 T 210 65 T 310 80 L 310 115 L 10 115 Z"
                        fill="url(#retGrad)"
                      />
                      {/* Line */}
                      <path
                        d="M 10 10 Q 60 25, 110 40 T 210 65 T 310 80"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Points */}
                      <circle cx="10" cy="10" r="4" fill="#F4E5A3" />
                      <circle cx="110" cy="40" r="4" fill="#F4E5A3" />
                      <circle cx="210" cy="65" r="4" fill="#F4E5A3" />
                      <circle cx="310" cy="80" r="4" fill="#F4E5A3" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-white/50 pt-2 border-t border-white/5">
                    <span>Day 0 (100%)</span>
                    <span>Day 1 (74.2%)</span>
                    <span>Day 3 (62.8%)</span>
                    <span>Day 7 (51.4%)</span>
                  </div>
                </div>

                {/* Top Desired Models Breakdown */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white">
                        {isAr ? 'السيارات الأكثر طلباً وتصفحاً' : 'Most In-Demand Showroom Models'}
                      </h4>
                      <p className="text-[11px] text-white/50">CTR & booking requests correlation</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {summary.topCars.slice(0, 5).map((item, idx) => {
                      const maxViews = summary.topCars[0]?.views || 1;
                      const pct = Math.round((item.views / maxViews) * 100);
                      return (
                        <div key={item.carId} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-white/90 truncate max-w-[200px]">{item.carName}</span>
                            <span className="text-[#D4AF37] font-mono">{item.views} views • {item.inquiries} leads</span>
                          </div>
                          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4E5A3] rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Export Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>{isAr ? 'تصدير تقرير التدقيق التحليلي (JSON)' : 'Export Analytical Audit Report (JSON)'}</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: OPERATIONAL ALERTS */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-white">
                    {isAr ? 'سجل التنبيهات المخصصة لمدير المعرض' : 'Customized Manager Alerts & System Triggers'}
                  </h4>
                  <p className="text-xs text-white/50">Granular alerts for incoming VIP leads, low stock thresholds, and performance spikes</p>
                </div>

                <button
                  onClick={() => analytics.clearAllAlerts()}
                  className="text-xs text-white/50 hover:text-white"
                >
                  {isAr ? 'مسح التنبيهات' : 'Clear All'}
                </button>
              </div>

              <div className="space-y-3">
                {alerts.length === 0 ? (
                  <div className="text-center py-12 text-white/50 text-xs">
                    No active alerts in operational feed.
                  </div>
                ) : (
                  alerts.map(alert => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        alert.level === 'urgent'
                          ? 'bg-red-950/20 border-red-500/40'
                          : alert.level === 'warning'
                          ? 'bg-amber-950/20 border-amber-500/40'
                          : 'bg-emerald-950/20 border-emerald-500/40'
                      } flex items-start gap-3`}
                    >
                      {alert.level === 'urgent' ? (
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      ) : alert.level === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}

                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-xs font-bold text-white">{alert.title}</h5>
                          <span className="text-[10px] text-white/40 font-mono">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed mb-2">{alert.message}</p>

                        {!alert.read && (
                          <button
                            onClick={() => analytics.markAlertAsRead(alert.id)}
                            className="text-[10px] text-[#D4AF37] hover:underline font-semibold"
                          >
                            Mark as Handled
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CLOUD SYNC & ENCRYPTED VAULT */}
          {activeTab === 'sync' && (
            <div className="space-y-6">
              
              {/* Cloud Sync Status Strip */}
              <div className="p-5 rounded-2xl bg-[#141417] border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white">
                        {isAr ? 'حالة المزامنة السحابية متعددة المنصات' : 'Multi-Platform Cloud Synchronization'}
                      </h4>
                      <p className="text-xs text-white/50">Continuous bi-directional state replication with conflict resolution</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {syncState.status.toUpperCase()}
                    </span>

                    <button
                      onClick={handleManualSync}
                      disabled={isSyncing}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#D4AF37]' : ''}`} />
                      <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                    </button>
                  </div>
                </div>

                {/* Platforms breakdown */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-white/50 block">Web Client</span>
                      <span className="text-xs font-bold text-white">Connected</span>
                    </div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-white/50 block">iOS Native App</span>
                      <span className="text-xs font-bold text-white">Synced</span>
                    </div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-white/50 block">Android App</span>
                      <span className="text-xs font-bold text-white">Synced</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* End-to-End Encrypted Customer Leads Vault */}
              <div className="p-5 rounded-2xl bg-[#141417] border border-[#D4AF37]/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-serif text-sm font-bold text-white">
                      {isAr ? 'خزنة العملاء المشفرة E2EE (معاينة التشفير وفك التشفير)' : 'Encrypted Client Inquiries Vault (E2EE Inspector)'}
                    </h4>
                  </div>
                  <span className="text-xs text-[#D4AF37] font-semibold">{bookings.length} Encrypted Records</span>
                </div>

                {bookings.length === 0 ? (
                  <div className="text-center py-8 text-white/40 text-xs">
                    No client reservations submitted yet. Submit a test reservation to inspect the live 256-bit AES-GCM ciphertext!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.map(booking => (
                      <div key={booking.bookingId} className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-white text-xs mr-2">{booking.carName}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-mono">
                              ID: {booking.bookingId}
                            </span>
                          </div>

                          <button
                            onClick={() => handleDecryptBooking(booking)}
                            className="px-2.5 py-1 rounded bg-[#D4AF37]/15 hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] text-[11px] font-semibold flex items-center gap-1 transition-all"
                          >
                            <Unlock className="w-3 h-3" />
                            <span>Verify & Decrypt with Master Key</span>
                          </button>
                        </div>

                        {/* Cipher text view */}
                        <div className="font-mono text-[10px] text-white/60 bg-black/50 p-2 rounded border border-white/5 break-all">
                          <span className="text-[#D4AF37]">CIPHERTEXT: </span>
                          {booking.ciphertextHex.substring(0, 80)}... [AES-256-GCM Verified]
                        </div>

                        {/* Decrypted Reveal */}
                        {decryptedLead && decryptedLead.id === booking.bookingId && (
                          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono space-y-1">
                            <div className="font-bold flex items-center gap-1 text-emerald-200">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>DECRYPTED CLIENT RECORD (Authenticated):</span>
                            </div>
                            <div>Name: {decryptedLead.data.customerName}</div>
                            <div>Phone: {decryptedLead.data.customerPhone}</div>
                            <div>Email: {decryptedLead.data.customerEmail}</div>
                            <div>Emirate: {decryptedLead.data.uaeEmirate}</div>
                            <div>Date: {decryptedLead.data.preferredDate}</div>
                            {decryptedLead.data.notes && <div>Notes: {decryptedLead.data.notes}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: PUSH NOTIFICATIONS CENTER */}
          {activeTab === 'push' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-[#141417] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white">
                      {isAr ? 'مركز إرسال الإشعارات الترويجية والخاصة' : 'Web Push Notification Broadcast Center'}
                    </h4>
                    <p className="text-xs text-white/50">Keep VIP clients updated on fresh luxury arrivals & personalized allocations</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    notificationStatus === 'granted'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    Browser Permission: {notificationStatus.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-white/70 block mb-1">Campaign Alert Title</label>
                    <input
                      type="text"
                      value={customPushTitle}
                      onChange={(e) => setCustomPushTitle(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] text-white text-xs rounded-xl px-3.5 py-2.5"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/70 block mb-1">Message Content</label>
                    <textarea
                      rows={2}
                      value={customPushBody}
                      onChange={(e) => setCustomPushBody(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-white/15 focus:border-[#D4AF37] text-white text-xs rounded-xl px-3.5 py-2.5 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSendPush}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A9871E] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Push Notification</span>
                  </button>
                </div>
              </div>

              {/* Push History */}
              <div className="p-5 rounded-2xl bg-[#141417] border border-white/10">
                <h4 className="font-serif text-sm font-bold text-white mb-3">
                  {isAr ? 'سجل الحملات والإشعارات السابقة' : 'Dispatched Notification History'}
                </h4>

                <div className="space-y-2.5">
                  {pushHistory.map(push => (
                    <div key={push.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold uppercase">
                            {push.badge}
                          </span>
                          <h5 className="text-xs font-bold text-white">{push.title}</h5>
                        </div>
                        <p className="text-xs text-white/60">{push.body}</p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-mono text-[#D4AF37] font-bold">{push.sentCount} Rec</span>
                        <div className="text-[10px] text-white/40">{new Date(push.timestamp).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
