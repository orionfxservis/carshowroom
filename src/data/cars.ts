import { Car } from '../types';

export const LUXURY_CARS: Car[] = [
  {
    id: 'mercedes-s-class-2024',
    name: 'Mercedes-Benz S-Class S580 2024',
    brand: 'Mercedes-Benz',
    category: 'Luxury Sedan',
    categoryAr: 'سيدان فاخرة',
    type: 'luxury',
    badge: 'NEW',
    badgeAr: 'جديد',
    priceAed: 650000,
    rentPerDayAed: 1800,
    rentPerWeekAed: 11000,
    rentPerMonthAed: 38000,
    transmission: '9G-TRONIC Auto',
    transmissionAr: 'أوتوماتيك 9 سرعات',
    fuel: 'Hybrid / Petrol',
    fuelAr: 'هايبرد / بنزين',
    engine: '4.0L V8 Biturbo + EQ Boost',
    engineAr: '4.0 لتر V8 تيربو مزدوج + EQ',
    horsepower: 496,
    acceleration: '0-100 km/h in 4.4s',
    topSpeed: '250 km/h (Limited)',
    seats: 5,
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1000&q=75',
    placeholderUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=120&q=30',
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a', imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Diamond White Pearl', hex: '#EAEAEA', imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Kalahari Gold', hex: '#C5A059', imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=75' }
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Exterior Front Three-Quarter Angle',
        titleAr: 'المظهر الخارجي بزاوية أمامية ثلاثية الأبعاد',
        category: 'Exterior',
        categoryAr: 'خارجي'
      },
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Bespoke Executive Lounge Cabin',
        titleAr: 'المقصورة التنفيذية الفاخرة مع شاشات OLED',
        category: 'Interior',
        categoryAr: 'داخلي'
      },
      {
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Aerodynamic Side Profile & Multi-Spoke Wheels',
        titleAr: 'التصميم الجانبي الانسيابي وعجلات ميباخ',
        category: 'Exterior',
        categoryAr: 'جانبي'
      },
      {
        url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Digital Light Matrix & Front Pantheon Grille',
        titleAr: 'إضاءة رقمية متطورة وشبك ميباخ الأيقوني',
        category: 'Detail',
        categoryAr: 'تفاصيل'
      },
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Driver Cockpit with MBUX Augmented Reality HUD',
        titleAr: 'مقصورة السائق مع شاشة عرض الواقع المعزز',
        category: 'Cockpit',
        categoryAr: 'المقصورة'
      }
    ],
    descriptionEn: 'The benchmark of luxury automotive craftsmanship. Features executive rear lounge seating, Burmester 4D surround sound, and active road noise cancellation for serene UAE highway cruising.',
    descriptionAr: 'معيار الفخامة المطلق في عالم السيارات. مقاعد خلفية تنفيذية فاخرة، نظام صوتي بورميستر 4D ثلاثي الأبعاد، وعزل صوتي نشط لقيادة استثنائية.',
    featured: true,
    stockCount: 3
  },
  {
    id: 'porsche-911-gt3-rs-2024',
    name: 'Porsche 911 GT3 RS 2024',
    brand: 'Porsche',
    category: 'Super Car',
    categoryAr: 'سوبر كار سباق',
    type: 'sports',
    badge: 'EXCLUSIVE',
    badgeAr: 'حصري',
    priceAed: 1350000,
    rentPerDayAed: 4500,
    rentPerWeekAed: 27000,
    rentPerMonthAed: 92000,
    transmission: '7-Speed PDK Dual-Clutch',
    transmissionAr: 'ناقل حركة PDK مزدوج القابض',
    fuel: 'High Octane Super 98',
    fuelAr: 'بنزين سوبر 98',
    engine: '4.0L Naturally Aspirated Boxer-6',
    engineAr: '4.0 لتر سداسي مسطح تنفس طبيعي',
    horsepower: 518,
    acceleration: '0-100 km/h in 3.0s',
    topSpeed: '296 km/h',
    seats: 2,
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=75',
    placeholderUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=120&q=30',
    colors: [
      { name: 'Guards Red / Carbon', hex: '#CC1100', imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Weissach Silver', hex: '#C0C0C0', imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Racing Yellow', hex: '#E5B800', imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=75' }
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Track Attack Stance with Active Swan-Neck Wing',
        titleAr: 'وقفة الحلبات مع الجناح الخلفي الهوائي النشط',
        category: 'Exterior',
        categoryAr: 'خارجي'
      },
      {
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Aero Fender Louvers & Side Racing Stance',
        titleAr: 'فتحات التهوية الهوائية من ألياف الكربون',
        category: 'Exterior',
        categoryAr: 'جانبي'
      },
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Motorsport Alcantara Cockpit & Carbon Bucket Seats',
        titleAr: 'مقصورة الكانتارا الرياضية ومقاعد ألياف الكربون',
        category: 'Cockpit',
        categoryAr: 'المقصورة'
      },
      {
        url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Titanium Dual Center Exhaust & Rear Aero Diffuser',
        titleAr: 'عادم تيتانيوم وسطي مزدوج مع مشتت هواء خلفي',
        category: 'Rear',
        categoryAr: 'خلفي'
      },
      {
        url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Forged Magnesium Center-Lock Wheels & PCCB Brakes',
        titleAr: 'عجلات مغنيسيوم مسبوكة مع مكابح سيراميك كربونية',
        category: 'Wheel',
        categoryAr: 'العجلات'
      }
    ],
    descriptionEn: 'Street-legal motorsport masterpiece featuring active DRS rear wing, carbon-fiber monocoque chassis, and razor-sharp track telemetry calibrated for Yas Marina and Dubai Autodrome.',
    descriptionAr: 'تحفة سباقات مسموح بقيادتها على الطرق العامة. مزودة بجناح خلفي هوائي متكيف بتقنية DRS، وهيكل ألياف الكربون لثبات وسرعة لا تضاهى.',
    featured: true,
    stockCount: 1
  },
  {
    id: 'rolls-royce-ghost-2024',
    name: 'Rolls-Royce Ghost Extended 2024',
    brand: 'Rolls-Royce',
    category: 'Ultra Luxury',
    categoryAr: 'فخامة ملكية مطلقة',
    type: 'luxury',
    badge: 'EXCLUSIVE',
    badgeAr: 'حصري',
    priceAed: 1850000,
    rentPerDayAed: 5200,
    rentPerWeekAed: 32000,
    rentPerMonthAed: 110000,
    transmission: '8-Speed Satellite-Aided Auto',
    transmissionAr: 'أوتوماتيك موجه بالأقمار الصناعية',
    fuel: 'V12 Twin-Turbo Petrol',
    fuelAr: 'بنزين V12 تيربو مزدوج',
    engine: '6.75L Twin-Turbocharged V12',
    engineAr: '6.75 لتر V12 تيربو مزدوج',
    horsepower: 563,
    acceleration: '0-100 km/h in 4.8s',
    topSpeed: '250 km/h',
    seats: 4,
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1631263307067-85403890772b?auto=format&fit=crop&w=1000&q=75',
    placeholderUrl: 'https://images.unsplash.com/photo-1631263307067-85403890772b?auto=format&fit=crop&w=120&q=30',
    colors: [
      { name: 'Bespoke Arctic White', hex: '#F0F4F8', imageUrl: 'https://images.unsplash.com/photo-1631263307067-85403890772b?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Black Badge Midnight', hex: '#111116', imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Imperial Gold Duo', hex: '#D4AF37', imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=75' }
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1631263307067-85403890772b?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Illuminated Pantheon Grille & Spirit of Ecstasy',
        titleAr: 'شبك البانثيون المضيء وتمثال روح النشوة',
        category: 'Exterior',
        categoryAr: 'خارجي'
      },
      {
        url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Starlight Headliner & Handcrafted Veneer Interior',
        titleAr: 'سقف مرصع بالنجوم المضيئة مع خشب طبيعي مطعم يدوياً',
        category: 'Interior',
        categoryAr: 'داخلي'
      },
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Reverse-Opening Coach Doors & Serene Sanctuary',
        titleAr: 'أبواب كوتش خلفية تفتح باتجاه معاكس لمزيد من الخصوصية',
        category: 'Exterior',
        categoryAr: 'جانبي'
      },
      {
        url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Extended Wheelbase Majestic Road Presence',
        titleAr: 'هيبة ملكية وحضور استثنائي بقاعدة عجلات ممتدة',
        category: 'Exterior',
        categoryAr: 'خارجي'
      },
      {
        url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Self-Righting Wheel Hub Emblems & Floating Suspension',
        titleAr: 'شعارات العجلات ذاتية التوازن ونظام التعليق الهوائي بلانار',
        category: 'Wheel',
        categoryAr: 'العجلات'
      }
    ],
    descriptionEn: 'The pure expression of Rolls-Royce Post-Opulent design. Featuring the Starlight Headliner, Planar suspension system, and whisper-quiet acoustic cabin insulation.',
    descriptionAr: 'قمة الفخامة البريطانية العريقة. سقف مرصع بالنجوم المضيئة، نظام تعليق بلانار فائق النعومة، ومقصورة مجهزة بأحدث وسائل الراحة الملكية.',
    featured: true,
    stockCount: 2
  },
  {
    id: 'lamborghini-urus-performante-2024',
    name: 'Lamborghini Urus Performante 2024',
    brand: 'Lamborghini',
    category: 'Super SUV',
    categoryAr: 'سوبر SUV رياضي',
    type: 'suv',
    badge: 'HOT DEAL',
    badgeAr: 'عرض خاص',
    priceAed: 1450000,
    rentPerDayAed: 4000,
    rentPerWeekAed: 24000,
    rentPerMonthAed: 85000,
    transmission: '8-Speed Automatic',
    transmissionAr: 'أوتوماتيك 8 سرعات',
    fuel: 'V8 Twin-Turbo Petrol',
    fuelAr: 'بنزين V8 تيربو مزدوج',
    engine: '4.0L Twin-Turbo V8',
    engineAr: '4.0 لتر V8 تيربو مزدوج',
    horsepower: 666,
    acceleration: '0-100 km/h in 3.3s',
    topSpeed: '306 km/h',
    seats: 5,
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=75',
    placeholderUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=120&q=30',
    colors: [
      { name: 'Giallo Auge (Yellow)', hex: '#F0B800', imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Nero Noctis (Black)', hex: '#1C1C1E', imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Verde Mantis (Green)', hex: '#26A65B', imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=75' }
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Aerodynamic Front Carbon Bumper & Y-Signature Lights',
        titleAr: 'مصد أمامي من ألياف الكربون مع إضاءة Y المميزة',
        category: 'Exterior',
        categoryAr: 'خارجي'
      },
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Aviation Cockpit with Anima Drive Selector & Alcantara',
        titleAr: 'مقصورة مستوحاة من الطائرات الحربية مع محدد أنماط أنيما',
        category: 'Cockpit',
        categoryAr: 'المقصورة'
      },
      {
        url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Lowered Stance & Steel Spring Performance Setup',
        titleAr: 'ارتفاع منخفض وأداء فائق مع نظام تعليق سبرينغ الرياضي',
        category: 'Exterior',
        categoryAr: 'جانبي'
      },
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Titanium Akrapovič Quad Exhaust & Carbon Diffuser',
        titleAr: 'عادم أكرابوفيتش تيتانيوم رباعي مع مشتت كربون خلفي',
        category: 'Rear',
        categoryAr: 'خلفي'
      },
      {
        url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Carbon-Fiber Vented Hood & 23-inch Pelope Wheels',
        titleAr: 'غطاء محرك من ألياف الكربون مع عجلات بيلوبي قياس 23 إنش',
        category: 'Wheel',
        categoryAr: 'العجلات'
      }
    ],
    descriptionEn: 'The ultimate Super SUV combining blistering supercar performance with all-terrain UAE capability. Equipped with titanium Akrapovič exhaust and carbon-fiber bonnet.',
    descriptionAr: 'سيارة الدفع الرباعي الخارقة التي تجمع بين أداء سيارات السباق وقدرات القيادة على كافة الطرقات مع نظام عادم أكرابوفيتش من التيتانيوم.',
    featured: true,
    stockCount: 2
  },
  {
    id: 'bmw-m8-competition-2024',
    name: 'BMW M8 Competition Gran Coupé 2024',
    brand: 'BMW',
    category: 'Sports Coupé',
    categoryAr: 'كوبيه رياضية فاخرة',
    type: 'sports',
    badge: 'NEW',
    badgeAr: 'جديد',
    priceAed: 760000,
    rentPerDayAed: 2200,
    rentPerWeekAed: 13500,
    rentPerMonthAed: 46000,
    transmission: '8-Speed M Steptronic with Drivelogic',
    transmissionAr: 'أوتوماتيك M ستبترونيك 8 سرعات',
    fuel: 'V8 TwinPower Turbo Petrol',
    fuelAr: 'بنزين V8 تيربو مزدوج',
    engine: '4.4L M TwinPower Turbo V8',
    engineAr: '4.4 لتر M V8 تيربو مزدوج',
    horsepower: 617,
    acceleration: '0-100 km/h in 3.2s',
    topSpeed: '305 km/h (M Driver Package)',
    seats: 4,
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=75',
    placeholderUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=120&q=30',
    colors: [
      { name: 'Isle of Man Green', hex: '#1C4A3E', imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Frozen Marina Bay Blue', hex: '#15325B', imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Dravit Grey Metallic', hex: '#484A4C', imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1000&q=75' }
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Iconic M Kidney Grille with Shadowline Laserlights',
        titleAr: 'شبك M الأيقوني مع إضاءة ليزر بي إم دبليو المتطورة',
        category: 'Exterior',
        categoryAr: 'خارجي'
      },
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'M Carbon Bucket Seats & Merino Leather Interior',
        titleAr: 'مقاعد M الرياضية المصنوعة من ألياف الكربون وجلود ميرينو',
        category: 'Interior',
        categoryAr: 'داخلي'
      },
      {
        url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Four-Door Coupé Silhouette with Carbon Roof',
        titleAr: 'تصميم كوبيه بأربعة أبواب مع سقف كامل من ألياف الكربون',
        category: 'Exterior',
        categoryAr: 'جانبي'
      },
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'M Sport Exhaust System with 100mm Quad Black Tips',
        titleAr: 'نظام عادم M الرياضي مع فوهات رباعية سوداء قياس 100 مم',
        category: 'Rear',
        categoryAr: 'خلفي'
      },
      {
        url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80',
        titleEn: '20-inch M Star-Spoke Bicolor Alloy Wheels',
        titleAr: 'عجلات M الرياضية خفيفة الوزن ذات اللونين قياس 20 إنش',
        category: 'Wheel',
        categoryAr: 'العجلات'
      }
    ],
    descriptionEn: 'Supreme motorsport DNA fused with executive four-door touring luxury. Featuring M xDrive all-wheel drive with selectable rear-wheel-drive drift mode.',
    descriptionAr: 'حمض نووي للسباقات مع مقصورة فاخرة رباعية الأبواب. مزودة بنظام الدفع الرباعي الذكي M xDrive مع إمكانية التبديل للدفع الخلفي بالكامل.',
    featured: false,
    stockCount: 4
  },
  {
    id: 'range-rover-electric-2024',
    name: 'Range Rover SV Electric Flagship 2024',
    brand: 'Range Rover',
    category: 'Electric Luxury SUV',
    categoryAr: 'SUV كهربائية فاخرة',
    type: 'electric',
    badge: 'ELECTRIC',
    badgeAr: 'كهربائية',
    priceAed: 950000,
    rentPerDayAed: 2700,
    rentPerWeekAed: 16500,
    rentPerMonthAed: 58000,
    transmission: 'Single-Speed Direct Drive AWD',
    transmissionAr: 'محرك كهربائي مباشر دفع رباعي',
    fuel: '100% Electric (115 kWh Battery)',
    fuelAr: 'كهربائي 100% (بطارية 115 ك.و.س)',
    engine: 'Dual Permanent-Magnet Electric Motors',
    engineAr: 'محركان كهربائيان بقوة دفع مستمرة',
    horsepower: 550,
    acceleration: '0-100 km/h in 4.3s',
    topSpeed: '220 km/h',
    seats: 5,
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=75',
    placeholderUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=120&q=30',
    colors: [
      { name: 'Lantau Bronze', hex: '#7E634F', imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Santorini Black', hex: '#0B0C0E', imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Ostuni Pearl White', hex: '#EDECE8', imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1000&q=75' }
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Monolithic Minimalist Design & Floating Roof',
        titleAr: 'تصميم متجانس فائق البساطة مع سقف عائم أنيق',
        category: 'Exterior',
        categoryAr: 'خارجي'
      },
      {
        url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'SV Serenity Ultra-Lounge with Ceramic Controls',
        titleAr: 'مقصورة إس في سيرينيتي مع أزرار وأسطح من السيراميك الأبيض',
        category: 'Interior',
        categoryAr: 'داخلي'
      },
      {
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Flush Glazing & Hidden-Until-Lit Exterior Surfaces',
        titleAr: 'زجاج متساوٍ وأسطح خارجية ملساء تخفي الإضاءة عند إيقافها',
        category: 'Exterior',
        categoryAr: 'جانبي'
      },
      {
        url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Vertical Tail Lamps & Split Powered Tailgate',
        titleAr: 'مصابيح خلفية عمودية متطورة مع باب صندوق أمتعة كهربائي مزدوج',
        category: 'Rear',
        categoryAr: 'خلفي'
      },
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        titleEn: '23-inch Aerodynamic Diamond-Turned Wheels',
        titleAr: 'عجلات هوائية ماسية قياس 23 إنش لتقليل مقاومة الهواء',
        category: 'Wheel',
        categoryAr: 'العجلات'
      }
    ],
    descriptionEn: 'Pioneering zero-emission luxury. Features 600km range, 800V ultra-fast charging (10-80% in 18 minutes), and whisper-quiet suspension isolating passengers from desert winds.',
    descriptionAr: 'فخامة خالية من الانبعاثات بنطاق قيادة يصل إلى 600 كم، مع دعم الشحن فائق السرعة بقدرة 800 فولت ونظام تعليق هوائي فائق الهدوء.',
    featured: true,
    stockCount: 3
  },
  {
    id: 'ferrari-296-gtb-2024',
    name: 'Ferrari 296 GTB Assetto Fiorano 2024',
    brand: 'Ferrari',
    category: 'Plug-in Hybrid Supercar',
    categoryAr: 'سوبر كار هجينة',
    type: 'sports',
    badge: 'EXCLUSIVE',
    badgeAr: 'حصري',
    priceAed: 1480000,
    rentPerDayAed: 4800,
    rentPerWeekAed: 29000,
    rentPerMonthAed: 98000,
    transmission: '8-Speed F1 Dual-Clutch',
    transmissionAr: 'ناقل حركة F1 ثنائي القابض 8 سرعات',
    fuel: 'PHEV Hybrid / High Octane',
    fuelAr: 'هايبرد قابل للشحن / بنزين',
    engine: '3.0L 120° V6 Twin-Turbo + Electric Motor',
    engineAr: '3.0 لتر V6 تيربو مزدوج + محرك كهربائي',
    horsepower: 819,
    acceleration: '0-100 km/h in 2.9s',
    topSpeed: '330 km/h',
    seats: 2,
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1000&q=75',
    placeholderUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=120&q=30',
    colors: [
      { name: 'Rosso Corsa', hex: '#D40000', imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Giallo Modena', hex: '#FFC400', imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Nero Daytona', hex: '#111111', imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=75' }
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Rosso Corsa Scuplture with Flying Buttress Aerodynamics',
        titleAr: 'هيكل أحمر روسو كورسا مع فتحات هوائية انسيابية مستوحاة من سباقات لومان',
        category: 'Exterior',
        categoryAr: 'خارجي'
      },
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'F1 Cockpit with Touch Steering Wheel & Digital Instrument Cluster',
        titleAr: 'مقصورة قيادة فورمولا 1 مع مقود مزود بأزرار لمسية وشاشة رقمية منحنية',
        category: 'Cockpit',
        categoryAr: 'المقصورة'
      },
      {
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Assetto Fiorano Lightweight Carbon Aerodynamic Package',
        titleAr: 'حزمة أسيتو فيورانو خفيفة الوزن من ألياف الكربون لزيادة قوة الضغط السفلية',
        category: 'Exterior',
        categoryAr: 'جانبي'
      },
      {
        url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Single Central Exhaust Tip & Active Rear Spoiler',
        titleAr: 'فوهة عادم مركزية فردية مع جناح خلفي نشط مدمج',
        category: 'Rear',
        categoryAr: 'خلفي'
      },
      {
        url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Carbon Fiber Lightweight Wheels with Titanium Wheel Bolts',
        titleAr: 'عجلات ألياف الكربون فائقة الخفة مع براغي تيتانيوم',
        category: 'Wheel',
        categoryAr: 'العجلات'
      }
    ],
    descriptionEn: 'The modern renaissance of mid-rear-engine Berlinetta sports cars. Unleashes 819 horsepower with instant electric torque vectoring and spine-tingling sound.',
    descriptionAr: 'ولادة جديدة لسيارات فيراري الرياضية بمحرك وسطي خلفي يولد 819 حصاناً مع عزم دوران فوري وصوت محرك إيطالي أصيل يهز القلوب.',
    featured: false,
    stockCount: 1
  },
  {
    id: 'bentley-continental-gt-2024',
    name: 'Bentley Continental GT Speed Mulliner 2024',
    brand: 'Bentley',
    category: 'Grand Tourer',
    categoryAr: 'جراند تورير فاخرة',
    type: 'luxury',
    badge: 'VIP',
    badgeAr: 'كبار الشخصيات',
    priceAed: 1320000,
    rentPerDayAed: 3900,
    rentPerWeekAed: 23500,
    rentPerMonthAed: 82000,
    transmission: '8-Speed Dual Clutch Active AWD',
    transmissionAr: 'دفع رباعي مستمر 8 سرعات مزدوج القابض',
    fuel: '6.0L W12 Twin-Turbo',
    fuelAr: 'بنزين 6.0 لتر W12 تيربو مزدوج',
    engine: '6.0L TSI Twin-Turbocharged W12',
    engineAr: '6.0 لتر W12 تيربو مزدوج',
    horsepower: 650,
    acceleration: '0-100 km/h in 3.6s',
    topSpeed: '335 km/h',
    seats: 4,
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=75',
    placeholderUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=120&q=30',
    colors: [
      { name: 'British Racing Green', hex: '#0B3B24', imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Silver Tempest', hex: '#A8A9AD', imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=75' },
      { name: 'Beluga Black', hex: '#141416', imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=75' }
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Signature Double Diamond Grille & Cut-Crystal Headlamps',
        titleAr: 'شبك أمامي مزدوج الألماسات مع مصابيح كريستالية مقطوعة بدقة',
        category: 'Exterior',
        categoryAr: 'خارجي'
      },
      {
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Diamond-in-Diamond Hand-Quilted Leather Lounge',
        titleAr: 'تطريز ألماسي مزدوج يدوي مع جلود نابا الفاخرة وخشب بيانو الأسود',
        category: 'Interior',
        categoryAr: 'داخلي'
      },
      {
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Muscular Haunches & Fastback Grand Tourer Silhouette',
        titleAr: 'أكتاف خلفية عريضة وخطوط جراند تورير البريطانية الأصيلة',
        category: 'Exterior',
        categoryAr: 'جانبي'
      },
      {
        url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Elliptical Dual Exhaust Pipes & Deployable Spoiler',
        titleAr: 'فوهات عادم بيضاوية مزدوجة وجناح خلفي يرتفع تلقائياً عند السرعات العالية',
        category: 'Rear',
        categoryAr: 'خلفي'
      },
      {
        url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80',
        titleEn: 'Three-Sided Bentley Rotating Dashboard Display',
        titleAr: 'شاشة بنتلي الدوارة ثلاثية الجوانب (شاشة لمس، عدادات كلاسيكية، وقشرة خشبية)',
        category: 'Cockpit',
        categoryAr: 'المقصورة'
      }
    ],
    descriptionEn: 'The definitive luxury grand tourer. Handcrafted in Crewe with diamond-in-diamond quilted leather, rotating dashboard display, and effortless 335 km/h capability.',
    descriptionAr: 'سيارة السفر الطويل الفاخرة المطلقة. مصنوعة يدوياً بجلود فاخرة مطرزة بدقة، شاشة عرض دوارة ثلاثية، وقوة هائلة تصل إلى 335 كم/س.',
    featured: false,
    stockCount: 2
  }
];

export const BRANDS = ['All Brands', 'Mercedes-Benz', 'Porsche', 'Rolls-Royce', 'Lamborghini', 'BMW', 'Range Rover', 'Ferrari', 'Bentley'];

export const CARS = LUXURY_CARS;
