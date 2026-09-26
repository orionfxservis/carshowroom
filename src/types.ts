export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';
export type VehicleType = 'all' | 'luxury' | 'sports' | 'suv' | 'electric';
export type DealType = 'all' | 'buy' | 'rent';

export interface CarColor {
  name: string;
  hex: string;
  imageUrl: string;
}

export interface CarGalleryImage {
  url: string;
  titleEn: string;
  titleAr: string;
  category: 'Exterior' | 'Interior' | 'Rear' | 'Cockpit' | 'Wheel' | 'Detail';
  categoryAr: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: string;
  categoryAr: string;
  type: 'luxury' | 'sports' | 'suv' | 'electric';
  badge: 'NEW' | 'EXCLUSIVE' | 'ELECTRIC' | 'HOT DEAL' | 'VIP';
  badgeAr: string;
  priceAed: number;
  rentPerDayAed: number;
  rentPerWeekAed: number;
  rentPerMonthAed: number;
  transmission: string;
  transmissionAr: string;
  fuel: string;
  fuelAr: string;
  engine: string;
  engineAr: string;
  horsepower: number;
  acceleration: string; // "0-100 in 3.2s"
  topSpeed: string; // "320 km/h"
  seats: number;
  year: number;
  imageUrl: string;
  placeholderUrl: string;
  colors: CarColor[];
  galleryImages?: CarGalleryImage[];
  descriptionEn: string;
  descriptionAr: string;
  featured: boolean;
  stockCount: number;
  isBuyAvailable?: boolean;
  isRentAvailable?: boolean;
}

export interface FilterState {
  searchQuery: string;
  brand: string;
  type: VehicleType;
  dealType: DealType;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'power-desc';
}

export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  type: 'page_view' | 'car_view' | 'filter_change' | 'compare_add' | 'booking_attempt' | 'booking_success' | 'color_select' | 'theme_toggle' | 'lang_toggle' | 'scroll_depth' | 'push_subscribed';
  details: Record<string, any>;
}

export interface MetricSummary {
  activeVisitors: number;
  totalPageViews: number;
  bounceRate: number; // e.g. 24.5%
  avgSessionSeconds: number; // e.g. 195s
  retentionDay1: number; // e.g. 68%
  conversionRate: number; // e.g. 4.8%
  encryptedBookingsCount: number;
  topCars: { carId: string; carName: string; views: number; inquiries: number }[];
}

export interface OperationalAlert {
  id: string;
  timestamp: number;
  level: 'info' | 'warning' | 'success' | 'urgent';
  title: string;
  message: string;
  read: boolean;
  actionRequired?: boolean;
}

export interface EncryptedBookingPayload {
  bookingId: string;
  carId: string;
  carName: string;
  dealType: 'buy' | 'rent' | 'test-drive';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  preferredDate: string;
  uaeEmirate: string;
  notes: string;
  clientTimestamp: number;
  ciphertextHex: string;
  ivHex: string;
  saltHex: string;
  fingerprintSha256: string;
  encryptionAlgorithm: string;
}

export interface PushNotificationPayload {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  sentCount: number;
  badge: string;
}
