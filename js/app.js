/* =====================================================================
   AL MAJD MOTORS — app.js
   Bilingual (EN/AR) single-page showroom app: routing, i18n, filtering.
   ===================================================================== */

/* ---------- Shared car glyph (side-profile silhouette) ---------- */
const CAR_PATH = `
  <path d="M18 62 L28 62 L34 44 Q40 34 54 34 L120 34 Q132 34 140 44 L156 58 L182 62
           Q188 63 188 69 L188 74 Q188 78 184 78 L172 78
           M40 78 L18 78 Q14 78 14 74 L14 68 Q14 63 18 62 Z"
        fill="none" stroke="#C9A227" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M46 44 L56 44 L52 60 L38 60 Z" fill="#C9A227" opacity="0.55"/>
  <path d="M60 44 L112 44 L120 60 L68 60 Z" fill="#C9A227" opacity="0.35"/>
  <circle cx="54" cy="78" r="12" fill="#0B1E33" stroke="#C9A227" stroke-width="2.5"/>
  <circle cx="54" cy="78" r="4" fill="#C9A227"/>
  <circle cx="152" cy="78" r="12" fill="#0B1E33" stroke="#C9A227" stroke-width="2.5"/>
  <circle cx="152" cy="78" r="4" fill="#C9A227"/>
`;
function carArtSVG(plateText){
  return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">${CAR_PATH}</svg>
          <div class="plate">${plateText}</div>`;
}

/* ---------- i18n dictionary ---------- */
const I18N = {
en: {
  "topbar.hours": "Sat–Thu, 9:00 AM – 9:00 PM",
  "topbar.loc": "Sheikh Zayed Road, Dubai, UAE",
  "nav.home": "Home", "nav.listings": "Browse Cars", "nav.about": "About Us", "nav.contact": "Contact",
  "hero.eyebrow": "RTA Registered • Est. 2009 • Dubai, UAE",
  "hero.title": "Rent or own your next car, the trusted way.",
  "hero.lede": "From daily rentals to outright ownership, Al Majd Motors brings a certified fleet, transparent pricing, and a showroom built on three generations of trust.",
  "hero.cta1": "Browse cars to rent", "hero.cta2": "Browse cars to buy",
  "hero.stat1": "Years in the UAE", "hero.stat2": "Cars in fleet", "hero.stat3": "Brands available", "hero.stat4": "Roadside support",
  "featured.eyebrow": "This week's selection", "featured.title": "Featured vehicles",
  "featured.sub": "A rotating edit from our showroom floor — available for rent or sale today.",
  "featured.viewall": "View all cars",
  "trust.eyebrow": "Why Al Majd", "trust.title": "A certificate of trust with every key handover",
  "trust.seal1short": "RTA CERTIFIED", "trust.card1title": "RTA-registered dealer",
  "trust.card1body": "Every rental and sale is processed through fully compliant, RTA-registered channels.",
  "trust.seal2short": "FULL COVER", "trust.card2title": "Comprehensive insurance",
  "trust.card2body": "Every vehicle on our lot, rented or sold, is covered by comprehensive UAE insurance.",
  "trust.seal3short": "INSPECTED", "trust.card3title": "200-point inspection",
  "trust.card3body": "Each car passes a rigorous inspection before it ever reaches our showroom floor.",
  "cta.eyebrow": "Get started", "cta.title": "Have a car in mind?",
  "cta.sub": "Tell us what you're looking for and our team will reach out within the hour.",
  "cta.button": "Contact our team",
  "listings.eyebrow": "Our fleet", "listings.title": "Cars for rent & sale",
  "filters.title": "Filter results", "filters.type": "Listing type", "filters.all": "All",
  "filters.rent": "For rent", "filters.sale": "For sale", "filters.brand": "Brand",
  "filters.allBrands": "All brands", "filters.body": "Body type", "filters.allBody": "All types",
  "body.suv": "SUV", "body.sedan": "Sedan", "body.sports": "Sports", "body.pickup": "Pickup",
  "filters.price": "Max price (AED)", "filters.anyPrice": "Any price", "filters.noLimit": "No limit",
  "filters.reset": "Reset filters", "filters.empty": "No cars match these filters. Try widening your search.",
  "listing.perDay": "/ day", "listing.viewDetails": "View details", "listing.results": "cars found",
  "about.eyebrow": "Our story", "about.title": "Three generations on Sheikh Zayed Road",
  "about.body1": "Al Majd Motors opened its doors in 2009 with a simple promise: every car that leaves our lot, whether rented for a weekend or bought outright, should be one you can trust completely. Today we serve residents, tourists, and businesses across Dubai and Abu Dhabi.",
  "about.body2": "Our showroom holds a curated fleet of over 500 vehicles, from everyday sedans to statement SUVs, each one inspected, insured, and registered in full compliance with RTA regulations.",
  "about.point1": "Founded in 2009, family-owned and operated",
  "about.point2": "Two showrooms: Dubai (Sheikh Zayed Road) & Abu Dhabi (Al Falah St)",
  "about.point3": "Arabic & English-speaking sales and support staff",
  "about.whyEyebrow": "The Al Majd promise", "about.whyTitle": "Why choose us",
  "about.why1short": "TRANSPARENT", "about.why1title": "No hidden fees",
  "about.why1body": "Every quote, rental or sale, is itemized in full before you sign anything.",
  "about.why2short": "FLEXIBLE", "about.why2title": "Flexible terms",
  "about.why2body": "Daily, weekly, and monthly rentals, plus financing options on every car for sale.",
  "about.why3short": "BILINGUAL", "about.why3title": "Bilingual service",
  "about.why3body": "Our team serves customers fluently in both Arabic and English, in person and online.",
  "about.visitEyebrow": "Visit the showroom", "about.visitTitle": "Come see the fleet in person",
  "about.addr": "Sheikh Zayed Road, Al Quoz, Dubai, United Arab Emirates",
  "contact.eyebrow": "Get in touch", "contact.title": "Let's find your next car",
  "contact.sub": "Fill in the form and our team will contact you within one business hour.",
  "contact.name": "Full name", "contact.phone": "Phone number", "contact.email": "Email address",
  "contact.carInterest": "Car of interest", "contact.carAny": "General inquiry", "contact.message": "Message",
  "contact.send": "Send inquiry",
  "contact.success": "Thank you — your inquiry has been received. Our team will call you shortly.",
  "contact.visitTitle": "Showroom details", "contact.mapNote": "Showroom location — Sheikh Zayed Road, Al Quoz, Dubai",
  "footer.tagline": "Dubai's trusted showroom for renting and buying quality vehicles since 2009.",
  "footer.explore": "Explore", "footer.rent": "Rent a car", "footer.buy": "Buy a car",
  "footer.company": "Company", "footer.careers": "Careers", "footer.terms": "Terms & conditions",
  "footer.contact": "Reach us",
  "footer.copy": "© 2026 Al Majd Motors. All rights reserved.",
  "footer.rta": "RTA Registered Dealer — License No. DXB-4471",
  "detail.year": "Year", "detail.mileage": "Mileage", "detail.transmission": "Transmission",
  "detail.fuel": "Fuel type", "detail.bodyType": "Body type", "detail.color": "Exterior colour",
  "detail.engine": "Engine", "detail.availability": "Available for",
  "detail.enquire": "Enquire about this car", "detail.back": "Back to all cars",
  "detail.related": "You may also like", "detail.perDay": "per day", "detail.totalPrice": "total price",
  "detail.both": "Rent & Sale",
  "trans.automatic": "Automatic", "trans.manual": "Manual",
  "fuel.petrol": "Petrol", "fuel.diesel": "Diesel", "fuel.hybrid": "Hybrid",
},
ar: {
  "topbar.hours": "السبت–الخميس، 9:00 صباحًا – 9:00 مساءً",
  "topbar.loc": "شارع الشيخ زايد، دبي، الإمارات",
  "nav.home": "الرئيسية", "nav.listings": "تصفح السيارات", "nav.about": "من نحن", "nav.contact": "اتصل بنا",
  "hero.eyebrow": "معتمدة لدى هيئة الطرق والمواصلات • تأسست 2009 • دبي، الإمارات",
  "hero.title": "استأجر أو امتلك سيارتك القادمة، بثقة تامة.",
  "hero.lede": "من التأجير اليومي إلى التملك الكامل، تقدّم لكم المجد للسيارات أسطولًا معتمدًا وأسعارًا شفافة ومعرضًا بُني على ثقة ثلاثة أجيال.",
  "hero.cta1": "تصفح سيارات للإيجار", "hero.cta2": "تصفح سيارات للبيع",
  "hero.stat1": "سنوات في الإمارات", "hero.stat2": "سيارة في الأسطول", "hero.stat3": "علامة تجارية متاحة", "hero.stat4": "دعم على الطريق",
  "featured.eyebrow": "اختيارات هذا الأسبوع", "featured.title": "سيارات مميزة",
  "featured.sub": "تشكيلة متجددة من صالة العرض — متاحة للإيجار أو البيع اليوم.",
  "featured.viewall": "عرض جميع السيارات",
  "trust.eyebrow": "لماذا المجد", "trust.title": "شهادة ثقة مع كل تسليم مفتاح",
  "trust.seal1short": "معتمدة رسميًا", "trust.card1title": "وكيل معتمد لدى هيئة الطرق",
  "trust.card1body": "تتم كل عملية إيجار أو بيع عبر قنوات معتمدة بالكامل لدى هيئة الطرق والمواصلات.",
  "trust.seal2short": "تغطية شاملة", "trust.card2title": "تأمين شامل",
  "trust.card2body": "كل سيارة في معرضنا، مؤجرة أو مباعة، مغطاة بتأمين إماراتي شامل.",
  "trust.seal3short": "تم الفحص", "trust.card3title": "فحص من 200 نقطة",
  "trust.card3body": "تخضع كل سيارة لفحص دقيق قبل وصولها إلى صالة العرض.",
  "cta.eyebrow": "ابدأ الآن", "cta.title": "لديك سيارة في بالك؟",
  "cta.sub": "أخبرنا بما تبحث عنه وسيتواصل معك فريقنا خلال ساعة.",
  "cta.button": "تواصل مع فريقنا",
  "listings.eyebrow": "أسطولنا", "listings.title": "سيارات للإيجار والبيع",
  "filters.title": "تصفية النتائج", "filters.type": "نوع الإعلان", "filters.all": "الكل",
  "filters.rent": "للإيجار", "filters.sale": "للبيع", "filters.brand": "العلامة التجارية",
  "filters.allBrands": "جميع العلامات", "filters.body": "نوع الهيكل", "filters.allBody": "جميع الأنواع",
  "body.suv": "دفع رباعي", "body.sedan": "سيدان", "body.sports": "رياضية", "body.pickup": "بيك أب",
  "filters.price": "أقصى سعر (درهم)", "filters.anyPrice": "أي سعر", "filters.noLimit": "بدون حد",
  "filters.reset": "إعادة تعيين", "filters.empty": "لا توجد سيارات مطابقة لهذه الفلاتر. جرّب توسيع بحثك.",
  "listing.perDay": "/ يوم", "listing.viewDetails": "عرض التفاصيل", "listing.results": "سيارة",
  "about.eyebrow": "قصتنا", "about.title": "ثلاثة أجيال على شارع الشيخ زايد",
  "about.body1": "افتتحت المجد للسيارات أبوابها عام 2009 بوعد بسيط: كل سيارة تغادر معرضنا، سواء مؤجرة لعطلة نهاية الأسبوع أو مباعة بالكامل، يجب أن تكون سيارة تثق بها تمامًا. اليوم نخدم المقيمين والسياح والشركات في دبي وأبوظبي.",
  "about.body2": "يضم معرضنا أسطولًا منتقى من أكثر من 500 مركبة، من السيدان اليومية إلى الدفع الرباعي المميز، وكل واحدة مفحوصة ومؤمَّنة ومسجّلة بما يتوافق تمامًا مع أنظمة هيئة الطرق.",
  "about.point1": "تأسست عام 2009، مملوكة وتُدار عائليًا",
  "about.point2": "معرضان: دبي (شارع الشيخ زايد) وأبوظبي (شارع الفلاح)",
  "about.point3": "طاقم مبيعات ودعم يتحدث العربية والإنجليزية",
  "about.whyEyebrow": "وعد المجد", "about.whyTitle": "لماذا تختارنا",
  "about.why1short": "شفافية", "about.why1title": "بدون رسوم خفية",
  "about.why1body": "كل عرض سعر، إيجار أو بيع، مفصّل بالكامل قبل التوقيع على أي شيء.",
  "about.why2short": "مرونة", "about.why2title": "شروط مرنة",
  "about.why2body": "إيجار يومي وأسبوعي وشهري، بالإضافة إلى خيارات تمويل لكل سيارة للبيع.",
  "about.why3short": "ثنائية اللغة", "about.why3title": "خدمة ثنائية اللغة",
  "about.why3body": "يخدم فريقنا العملاء بطلاقة باللغتين العربية والإنجليزية، حضوريًا وعبر الإنترنت.",
  "about.visitEyebrow": "زوروا المعرض", "about.visitTitle": "تعرف على الأسطول عن قرب",
  "about.addr": "شارع الشيخ زايد، القوز، دبي، الإمارات العربية المتحدة",
  "contact.eyebrow": "تواصل معنا", "contact.title": "لنجد سيارتك القادمة",
  "contact.sub": "املأ النموذج وسيتواصل معك فريقنا خلال ساعة عمل واحدة.",
  "contact.name": "الاسم الكامل", "contact.phone": "رقم الهاتف", "contact.email": "البريد الإلكتروني",
  "contact.carInterest": "السيارة المهتم بها", "contact.carAny": "استفسار عام", "contact.message": "الرسالة",
  "contact.send": "إرسال الطلب",
  "contact.success": "شكرًا لك — تم استلام طلبك. سيتصل بك فريقنا قريبًا.",
  "contact.visitTitle": "تفاصيل المعرض", "contact.mapNote": "موقع المعرض — شارع الشيخ زايد، القوز، دبي",
  "footer.tagline": "معرض دبي الموثوق لتأجير وشراء المركبات عالية الجودة منذ 2009.",
  "footer.explore": "استكشف", "footer.rent": "استأجر سيارة", "footer.buy": "اشترِ سيارة",
  "footer.company": "الشركة", "footer.careers": "الوظائف", "footer.terms": "الشروط والأحكام",
  "footer.contact": "تواصل معنا",
  "footer.copy": "© 2026 المجد للسيارات. جميع الحقوق محفوظة.",
  "footer.rta": "وكيل معتمد لدى هيئة الطرق — رخصة رقم DXB-4471",
  "detail.year": "سنة الصنع", "detail.mileage": "المسافة المقطوعة", "detail.transmission": "ناقل الحركة",
  "detail.fuel": "نوع الوقود", "detail.bodyType": "نوع الهيكل", "detail.color": "لون الهيكل الخارجي",
  "detail.engine": "المحرك", "detail.availability": "متاحة لـ",
  "detail.enquire": "استفسر عن هذه السيارة", "detail.back": "العودة إلى جميع السيارات",
  "detail.related": "قد يعجبك أيضًا", "detail.perDay": "في اليوم", "detail.totalPrice": "السعر الإجمالي",
  "detail.both": "إيجار وبيع",
  "trans.automatic": "أوتوماتيك", "trans.manual": "يدوي",
  "fuel.petrol": "بنزين", "fuel.diesel": "ديزل", "fuel.hybrid": "هجين",
}
};

/* ---------- Car inventory ---------- */
const CARS = [
  { id:"lc300", brand:"Toyota", model:"Land Cruiser 300 VXR", year:2025, body:"suv",
    type:"both", rentPrice:850, salePrice:389000, mileage:"12,000 km", trans:"automatic", fuel:"petrol",
    color:{en:"Pearl White", ar:"أبيض لؤلؤي"}, engine:"3.5L Twin-Turbo V6",
    desc:{en:"The undisputed favourite on UAE roads — spacious, capable off-road, and built to hold its value. Ideal for family trips to the mountains or the dunes.",
          ar:"السيارة المفضلة بلا منازع على طرق الإمارات — واسعة وقوية في القيادة على الرمال، ومصممة للحفاظ على قيمتها. مثالية للرحلات العائلية إلى الجبال أو الكثبان الرملية."} },
  { id:"patrol-nismo", brand:"Nissan", model:"Patrol Nismo", year:2024, body:"suv",
    type:"rent", rentPrice:900, salePrice:null, mileage:"8,500 km", trans:"automatic", fuel:"petrol",
    color:{en:"Storm White", ar:"أبيض عاصفي"}, engine:"5.6L V8",
    desc:{en:"A bold, muscular SUV with Nismo styling and serious highway presence — a favourite for weekend getaways and desert drives.",
          ar:"سيارة دفع رباعي جريئة وقوية بتصميم نيسمو الرياضي وحضور مميز على الطرق السريعة — مفضّلة لرحلات نهاية الأسبوع والقيادة الصحراوية."} },
  { id:"g63", brand:"Mercedes-Benz", model:"G63 AMG", year:2025, body:"suv",
    type:"both", rentPrice:2400, salePrice:1250000, mileage:"3,200 km", trans:"automatic", fuel:"petrol",
    color:{en:"Obsidian Black", ar:"أسود أوبسيديان"}, engine:"4.0L V8 Biturbo",
    desc:{en:"The icon of Dubai boulevards. Uncompromising luxury, box-fresh presence, and an engine note that announces every arrival.",
          ar:"أيقونة شوارع دبي. فخامة لا تقبل التنازل، حضور مميز، وصوت محرك يعلن عن وصولك أينما ذهبت."} },
  { id:"range-vogue", brand:"Land Rover", model:"Range Rover Vogue", year:2024, body:"suv",
    type:"sale", rentPrice:null, salePrice:475000, mileage:"15,600 km", trans:"automatic", fuel:"diesel",
    color:{en:"Santorini Black", ar:"أسود سانتوريني"}, engine:"3.0L Diesel I6",
    desc:{en:"Quiet, commanding, and impeccably finished — the Vogue trim brings first-class comfort to every seat.",
          ar:"هادئة وقوية ومصنّعة بعناية فائقة — فئة فوغ توفر راحة درجة أولى لكل مقعد."} },
  { id:"lx600", brand:"Lexus", model:"LX600", year:2025, body:"suv",
    type:"both", rentPrice:1600, salePrice:598000, mileage:"6,000 km", trans:"automatic", fuel:"hybrid",
    color:{en:"Sonic Titanium", ar:"تيتانيوم سونيك"}, engine:"3.4L Twin-Turbo V6 Hybrid",
    desc:{en:"Effortless refinement with genuine off-road ability — the LX600 pairs Toyota reliability with Lexus polish.",
          ar:"رقي بلا جهد مع قدرة حقيقية على القيادة الوعرة — يجمع LX600 بين موثوقية تويوتا وأناقة لكزس."} },
  { id:"7series", brand:"BMW", model:"7 Series 760i", year:2024, body:"sedan",
    type:"sale", rentPrice:null, salePrice:520000, mileage:"9,800 km", trans:"automatic", fuel:"petrol",
    color:{en:"Frozen Bronze", ar:"برونزي مطفي"}, engine:"4.4L V8",
    desc:{en:"A flagship sedan built for executive travel between Dubai and Abu Dhabi — silent, spacious, and beautifully appointed.",
          ar:"سيدان فاخرة مصممة للتنقل التنفيذي بين دبي وأبوظبي — هادئة وواسعة ومجهزة بعناية فائقة."} },
  { id:"camry", brand:"Toyota", model:"Camry SE", year:2025, body:"sedan",
    type:"both", rentPrice:180, salePrice:98000, mileage:"18,200 km", trans:"automatic", fuel:"petrol",
    color:{en:"Celestial Silver", ar:"فضي سماوي"}, engine:"2.5L I4",
    desc:{en:"The everyday choice for UAE families and daily commuters — economical, dependable, and easy to live with.",
          ar:"الخيار اليومي للعائلات في الإمارات والمتنقلين يوميًا — اقتصادية وموثوقة وسهلة الاستخدام."} },
  { id:"mustang", brand:"Ford", model:"Mustang GT", year:2024, body:"sports",
    type:"rent", rentPrice:650, salePrice:null, mileage:"11,400 km", trans:"automatic", fuel:"petrol",
    color:{en:"Race Red", ar:"أحمر سباق"}, engine:"5.0L V8",
    desc:{en:"A weekend favourite — book it for a coastal drive along Jumeirah or an evening on Sheikh Zayed Road.",
          ar:"المفضلة لعطلات نهاية الأسبوع — احجزها لجولة ساحلية في جميرا أو أمسية على شارع الشيخ زايد."} },
  { id:"camaro", brand:"Chevrolet", model:"Camaro SS", year:2023, body:"sports",
    type:"rent", rentPrice:600, salePrice:null, mileage:"14,900 km", trans:"automatic", fuel:"petrol",
    color:{en:"Shock Yellow", ar:"أصفر لامع"}, engine:"6.2L V8",
    desc:{en:"Turn heads on the Corniche — a rental favourite for special occasions, photoshoots, and celebration drives.",
          ar:"سيارة تلفت الأنظار على الكورنيش — مفضلة للإيجار في المناسبات الخاصة وجلسات التصوير وجولات الاحتفال."} },
  { id:"lc79", brand:"Toyota", model:"Land Cruiser 79 Pickup", year:2024, body:"pickup",
    type:"both", rentPrice:420, salePrice:165000, mileage:"22,000 km", trans:"manual", fuel:"diesel",
    color:{en:"Sand Beige", ar:"بيج رملي"}, engine:"4.5L V8 Turbo-Diesel",
    desc:{en:"The workhorse of choice for desert operations and heavy-duty use across the Emirates — proven, tough, unstoppable.",
          ar:"المركبة العاملة المفضلة للعمليات الصحراوية والاستخدام الشاق في جميع أنحاء الإمارات — مثبتة وقوية لا تتوقف."} },
];

/* ---------- App state ---------- */
const state = { lang: "en", filters: { type:"all", brand:"all", body:"all", price:"all" } };
function t(key){ return (I18N[state.lang] && I18N[state.lang][key]) || key; }
function tField(obj){ return obj[state.lang] || obj.en; }

/* ---------- i18n render pass ---------- */
function applyI18n(){
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.getElementById("langToggleLabel").textContent = state.lang === "ar" ? "English" : "العربية";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if (I18N[state.lang][key] !== undefined) el.textContent = I18N[state.lang][key];
  });
}

/* ---------- Car card + detail rendering ---------- */
function typeTag(car){
  if (car.type === "both") return `<span class="tag tag-rent">${t("filters.rent")}</span> <span class="tag tag-sale">${t("filters.sale")}</span>`;
  if (car.type === "rent") return `<span class="tag tag-rent">${t("filters.rent")}</span>`;
  return `<span class="tag tag-sale">${t("filters.sale")}</span>`;
}
function priceBlock(car, big){
  const cls = big ? "detail-price" : "price";
  let parts = [];
  if (car.rentPrice) parts.push(`<div class="${cls}">AED ${car.rentPrice.toLocaleString()} <span class="unit">${t("listing.perDay")}</span></div>`);
  if (car.salePrice) parts.push(`<div class="${cls}">AED ${car.salePrice.toLocaleString()} <span class="unit">${big? t('detail.totalPrice') : ''}</span></div>`);
  return parts.join("");
}
function sealFor(car){
  const cls = car.type === "sale" ? "seal sale" : "seal";
  const label = car.type === "both" ? t("detail.both") : (car.type === "rent" ? t("filters.rent") : t("filters.sale"));
  return `<div class="${cls}" style="width:44px;height:44px;"><span class="seal-label" style="font-size:7px;">${label}</span></div>`;
}
function carCard(car){
  return `
  <a href="#/car/${car.id}" class="car-card">
    <div class="car-art">${carArtSVG("UAE • " + car.year)}</div>
    <div class="car-card-body">
      <div class="car-card-top">
        <div class="car-card-title">
          <h3>${car.brand} ${car.model}</h3>
          <div class="yr">${car.year} · ${t("body."+car.body)}</div>
        </div>
        ${sealFor(car)}
      </div>
      <div class="car-specs-row">
        <span>⚙ ${t("trans."+car.trans)}</span>
        <span>⛽ ${t("fuel."+car.fuel)}</span>
        <span>📍 ${car.mileage}</span>
      </div>
      <div class="car-card-footer">
        <div>${priceBlock(car,false)}</div>
        <span class="btn btn-navy btn-sm">${t("listing.viewDetails")}</span>
      </div>
    </div>
  </a>`;
}

function renderFeatured(){
  const featured = CARS.slice(0,3);
  document.getElementById("featuredGrid").innerHTML = featured.map(carCard).join("");
}

function populateBrandFilter(){
  const sel = document.getElementById("f-brand");
  const brands = [...new Set(CARS.map(c=>c.brand))].sort();
  sel.innerHTML = `<option value="all">${t("filters.allBrands")}</option>` +
    brands.map(b=>`<option value="${b}">${b}</option>`).join("");
  sel.value = state.filters.brand;
}
function populateCarSelect(){
  const sel = document.getElementById("cf-car");
  sel.innerHTML = `<option value="">${t("contact.carAny")}</option>` +
    CARS.map(c=>`<option value="${c.id}">${c.brand} ${c.model}</option>`).join("");
}

function filteredCars(){
  return CARS.filter(c=>{
    if (state.filters.type !== "all" && c.type !== "both" && c.type !== state.filters.type) return false;
    if (state.filters.type !== "all" && c.type === "both") { /* both matches any specific filter */ }
    if (state.filters.brand !== "all" && c.brand !== state.filters.brand) return false;
    if (state.filters.body !== "all" && c.body !== state.filters.body) return false;
    if (state.filters.price !== "all") {
      const cap = parseInt(state.filters.price,10);
      const relevantPrice = state.filters.type === "sale" ? c.salePrice : (state.filters.type === "rent" ? c.rentPrice : (c.rentPrice || c.salePrice));
      if (relevantPrice && relevantPrice > cap) return false;
    }
    return true;
  });
}

function renderListings(){
  populateBrandFilter();
  document.getElementById("f-body").value = state.filters.body;
  document.getElementById("f-price").value = state.filters.price;
  document.querySelectorAll('input[name="f-type"]').forEach(r=> r.checked = (r.value === state.filters.type));

  const results = filteredCars();
  const grid = document.getElementById("listingsGrid");
  const empty = document.getElementById("emptyState");
  document.getElementById("resultsCount").textContent = `${results.length} ${t("listing.results")}`;
  if (results.length === 0){
    grid.innerHTML = ""; empty.style.display = "block";
  } else {
    empty.style.display = "none";
    grid.innerHTML = results.map(carCard).join("");
  }
}

function renderDetail(id){
  const car = CARS.find(c=>c.id === id);
  const container = document.getElementById("detailContainer");
  if (!car){
    container.innerHTML = `<div class="empty-state">${t("filters.empty")}</div>`;
    return;
  }
  const related = CARS.filter(c=> c.id !== car.id && (c.body === car.body || c.brand === car.brand)).slice(0,3);
  container.innerHTML = `
    <div class="breadcrumb"><a href="#/">${t("nav.home")}</a> / <a href="#/listings">${t("nav.listings")}</a> / ${car.brand} ${car.model}</div>
    <div class="detail-layout">
      <div class="detail-gallery">
        <div class="car-art" style="aspect-ratio:4/3;">${carArtSVG("UAE • " + car.year)}</div>
        <div class="thumb-row">
          ${[1,2,3].map((n,i)=>`<div class="thumb ${i===0?'active':''}" style="background:linear-gradient(135deg, var(--ink-navy), var(--ink-navy-2));"></div>`).join("")}
        </div>
        <p class="detail-desc">${tField(car.desc)}</p>
      </div>
      <div class="detail-panel">
        <div class="detail-title">
          <div>
            <h2 style="font-size:24px;">${car.brand} ${car.model}</h2>
            <div class="yr mono" style="color:var(--steel); margin-top:4px;">${car.year}</div>
          </div>
          ${sealFor(car)}
        </div>
        ${priceBlock(car,true)}
        <table class="spec-table">
          <tr><td>${t("detail.year")}</td><td>${car.year}</td></tr>
          <tr><td>${t("detail.mileage")}</td><td>${car.mileage}</td></tr>
          <tr><td>${t("detail.transmission")}</td><td>${t("trans."+car.trans)}</td></tr>
          <tr><td>${t("detail.fuel")}</td><td>${t("fuel."+car.fuel)}</td></tr>
          <tr><td>${t("detail.bodyType")}</td><td>${t("body."+car.body)}</td></tr>
          <tr><td>${t("detail.color")}</td><td>${tField(car.color)}</td></tr>
          <tr><td>${t("detail.engine")}</td><td>${car.engine}</td></tr>
          <tr><td>${t("detail.availability")}</td><td>${car.type==="both"?t("detail.both"):(car.type==="rent"?t("filters.rent"):t("filters.sale"))}</td></tr>
        </table>
        <a href="#/contact?car=${car.id}" class="btn btn-gold btn-block" style="margin-top:22px;">${t("detail.enquire")}</a>
        <a href="#/listings" class="btn btn-outline btn-block" style="margin-top:10px; border-color:var(--line); color:var(--ink-navy);">${t("detail.back")}</a>
      </div>
    </div>
    ${related.length ? `
    <h3 class="related-title">${t("detail.related")}</h3>
    <div class="grid-cars" style="margin-top:24px;">${related.map(carCard).join("")}</div>
    ` : ""}
  `;
}

/* ---------- Fill the static about-page car glyph ---------- */
function fillStaticGlyph(){
  const g = document.getElementById("carGlyph");
  if (g) g.innerHTML = CAR_PATH;
}

/* ---------- Routing ---------- */
function parseHash(){
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, query] = raw.split("?");
  const params = new URLSearchParams(query || "");
  return { path: path || "/", params };
}
function setActiveNav(path){
  document.querySelectorAll("nav.main-nav a").forEach(a=>{
    a.classList.toggle("active", a.getAttribute("data-route") === path);
  });
}
function router(){
  const { path, params } = parseHash();
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));

  let pageKey = path;
  if (path.startsWith("/car/")) pageKey = "/car";

  const target = document.querySelector(`.page[data-page="${pageKey}"]`) || document.querySelector('.page[data-page="/"]');
  target.classList.add("active");
  setActiveNav(pageKey === "/car" ? "/listings" : pageKey);

  if (pageKey === "/"){
    renderFeatured();
  } else if (pageKey === "/listings"){
    if (params.get("type")) state.filters.type = params.get("type");
    renderListings();
  } else if (pageKey === "/car"){
    const id = path.split("/car/")[1];
    renderDetail(id);
  } else if (pageKey === "/contact"){
    populateCarSelect();
    if (params.get("car")) document.getElementById("cf-car").value = params.get("car");
    document.getElementById("formSuccess").classList.remove("show");
  }

  window.scrollTo({ top:0, behavior:"instant" in window ? "instant" : "auto" });
  closeMobileNav();
}

/* ---------- Mobile nav ---------- */
function closeMobileNav(){
  document.getElementById("mainNav").classList.remove("open");
  document.getElementById("navScrim").classList.remove("open");
}

/* ---------- Event wiring ---------- */
function wireEvents(){
  window.addEventListener("hashchange", router);

  document.getElementById("langToggle").addEventListener("click", ()=>{
    state.lang = state.lang === "en" ? "ar" : "en";
    applyI18n();
    router(); // re-render dynamic content in new language
  });

  document.getElementById("menuToggle").addEventListener("click", ()=>{
    document.getElementById("mainNav").classList.toggle("open");
    document.getElementById("navScrim").classList.toggle("open");
  });
  document.getElementById("navScrim").addEventListener("click", closeMobileNav);

  document.body.addEventListener("change", (e)=>{
    if (e.target.name === "f-type"){ state.filters.type = e.target.value; renderListings(); }
    if (e.target.id === "f-brand"){ state.filters.brand = e.target.value; renderListings(); }
    if (e.target.id === "f-body"){ state.filters.body = e.target.value; renderListings(); }
    if (e.target.id === "f-price"){ state.filters.price = e.target.value; renderListings(); }
  });

  document.getElementById("resetFilters").addEventListener("click", ()=>{
    state.filters = { type:"all", brand:"all", body:"all", price:"all" };
    renderListings();
  });

  document.getElementById("contactForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    document.getElementById("formSuccess").classList.add("show");
    e.target.reset();
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  fillStaticGlyph();
  applyI18n();
  wireEvents();
  router();
});
