import { PushNotificationPayload } from '../types';

const INITIAL_NOTIFICATIONS: PushNotificationPayload[] = [
  {
    id: 'push-1',
    title: '🏎️ New 2024 Rolls-Royce Ghost Extended Arrived',
    body: 'Exclusive allocation now available for private VIP viewings in our Sheikh Zayed Road showroom.',
    timestamp: Date.now() - 1000 * 60 * 30,
    sentCount: 1420,
    badge: 'NEW MODEL'
  },
  {
    id: 'push-2',
    title: '⚡ Weekend Supercar Special: Lamborghini Urus',
    body: 'Complimentary full tank + VIP airport delivery for all 3+ day rentals this Friday to Sunday.',
    timestamp: Date.now() - 1000 * 60 * 180,
    sentCount: 980,
    badge: 'PROMOTION'
  },
  {
    id: 'push-3',
    title: '🛡️ Encrypted VIP Booking Confirmation Ready',
    body: 'Your test-drive reservation has been secured with 256-bit cryptographic verification.',
    timestamp: Date.now() - 1000 * 60 * 360,
    sentCount: 450,
    badge: 'SECURITY'
  }
];

class NotificationService {
  private notifications: PushNotificationPayload[] = INITIAL_NOTIFICATIONS;
  private permission: NotificationPermission = 'default';
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.permission = Notification.permission;
    }
  }

  public init() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.permission = Notification.permission;
      this.notify();
    }
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public getPermission(): NotificationPermission {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return this.permission;
  }

  public async requestPermission(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }
    try {
      const res = await Notification.requestPermission();
      this.permission = res;
      this.notify();
      if (res === 'granted') {
        this.sendLocalNotification(
          '🔔 LuxeDrive UAE VIP Notifications Enabled',
          'You will now receive instant alerts for rare hypercar arrivals and private invitations.'
        );
        return true;
      }
      return false;
    } catch (e) {
      console.warn('Notification permission error:', e);
      return false;
    }
  }

  public sendLocalNotification(title: string, body: string) {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then(reg => {
            reg.showNotification(title, {
              body,
              icon: '/icon.svg',
              badge: '/icon.svg'
            });
          });
        } else {
          new Notification(title, {
            body,
            icon: '/icon.svg'
          });
        }
      } catch (err) {
        console.warn('Native notification failed:', err);
      }
    }

    const payload: PushNotificationPayload = {
      id: 'push-' + Date.now(),
      title,
      body,
      timestamp: Date.now(),
      sentCount: 1,
      badge: 'ALERT'
    };
    this.notifications.unshift(payload);
    this.notify();
  }

  public dispatchCampaign(title: string, body: string, badge: string = 'VIP UPDATE'): PushNotificationPayload {
    const payload: PushNotificationPayload = {
      id: 'push-' + Date.now(),
      title,
      body,
      timestamp: Date.now(),
      sentCount: 2840 + Math.floor(Math.random() * 300),
      badge
    };
    this.notifications.unshift(payload);
    this.sendLocalNotification(title, body);
    this.notify();
    return payload;
  }

  public getHistory(): PushNotificationPayload[] {
    return [...this.notifications];
  }
}

export const notificationService = new NotificationService();
