import { LuxuryAsset, PriceHistoryPoint } from './lifestyle-types';

/* ─── Price History Generators ──────────────────────────────────────────────── */

function buildHistory(
  base: number,
  months: string[],
  trend: number,
  spread: number
): PriceHistoryPoint[] {
  return months.map((month, i) => {
    const avg = base + trend * i + (Math.sin(i * 0.8) * base * 0.02);
    return {
      month,
      avgPrice: Math.round(avg / 1000) * 1000,
      marketMin: Math.round((avg - spread) / 1000) * 1000,
      marketMax: Math.round((avg + spread) / 1000) * 1000,
    };
  });
}

const PAST_24 = [
  'May 2024','Jun 2024','Jul 2024','Aug 2024','Sep 2024','Oct 2024',
  'Nov 2024','Dec 2024','Jan 2025','Feb 2025','Mar 2025','Apr 2025',
  'May 2025','Jun 2025','Jul 2025','Aug 2025','Sep 2025','Oct 2025',
  'Nov 2025','Dec 2025','Jan 2026','Feb 2026','Mar 2026','Apr 2026',
];

const NEXT_6 = [
  'May 2026','Jun 2026','Jul 2026','Aug 2026','Sep 2026','Oct 2026',
];

function buildPrediction(lastAvg: number, monthlyChange: number) {
  return NEXT_6.map((month, i) => ({
    month,
    predicted: Math.round((lastAvg + monthlyChange * (i + 1)) / 1000) * 1000,
  }));
}

/* ─── Cars ───────────────────────────────────────────────────────────────────── */

const chiron_history = buildHistory(3_800_000, PAST_24, 18_000, 320_000);
const chiron_last = chiron_history[chiron_history.length - 1].avgPrice;

const pagani_history = buildHistory(2_900_000, PAST_24, 22_000, 280_000);
const pagani_last = pagani_history[pagani_history.length - 1].avgPrice;

const phantom_history = buildHistory(540_000, PAST_24, -1_200, 55_000);
const phantom_last = phantom_history[phantom_history.length - 1].avgPrice;

const ferrari_history = buildHistory(420_000, PAST_24, 3_500, 40_000);
const ferrari_last = ferrari_history[ferrari_history.length - 1].avgPrice;

const lamborghini_history = buildHistory(580_000, PAST_24, 4_200, 52_000);
const lamborghini_last = lamborghini_history[lamborghini_history.length - 1].avgPrice;

const aston_history = buildHistory(260_000, PAST_24, -800, 28_000);
const aston_last = aston_history[aston_history.length - 1].avgPrice;

/* ─── Watches ────────────────────────────────────────────────────────────────── */

const pp_history = buildHistory(420_000, PAST_24, 8_500, 48_000);
const pp_last = pp_history[pp_history.length - 1].avgPrice;

const rm_history = buildHistory(1_100_000, PAST_24, 19_000, 95_000);
const rm_last = rm_history[rm_history.length - 1].avgPrice;

const ap_history = buildHistory(185_000, PAST_24, 3_200, 22_000);
const ap_last = ap_history[ap_history.length - 1].avgPrice;

const fp_history = buildHistory(95_000, PAST_24, 2_100, 12_000);
const fp_last = fp_history[fp_history.length - 1].avgPrice;

const lange_history = buildHistory(75_000, PAST_24, 1_800, 9_000);
const lange_last = lange_history[lange_history.length - 1].avgPrice;

const daytona_history = buildHistory(38_000, PAST_24, 620, 6_500);
const daytona_last = daytona_history[daytona_history.length - 1].avgPrice;

/* ─── Yachts ─────────────────────────────────────────────────────────────────── */

const sunseeker_history = buildHistory(14_500_000, PAST_24, 85_000, 900_000);
const sunseeker_last = sunseeker_history[sunseeker_history.length - 1].avgPrice;

const feadship_history = buildHistory(62_000_000, PAST_24, 280_000, 5_200_000);
const feadship_last = feadship_history[feadship_history.length - 1].avgPrice;

const pershing_history = buildHistory(4_800_000, PAST_24, 22_000, 420_000);
const pershing_last = pershing_history[pershing_history.length - 1].avgPrice;

const benetti_history = buildHistory(28_000_000, PAST_24, 120_000, 2_400_000);
const benetti_last = benetti_history[benetti_history.length - 1].avgPrice;

/* ─── Jets ───────────────────────────────────────────────────────────────────── */

const gulfstream_history = buildHistory(75_000_000, PAST_24, 420_000, 6_800_000);
const gulfstream_last = gulfstream_history[gulfstream_history.length - 1].avgPrice;

const global_history = buildHistory(72_000_000, PAST_24, 380_000, 6_200_000);
const global_last = global_history[global_history.length - 1].avgPrice;

const falcon_history = buildHistory(58_000_000, PAST_24, 310_000, 5_100_000);
const falcon_last = falcon_history[falcon_history.length - 1].avgPrice;

const citation_history = buildHistory(3_200_000, PAST_24, -15_000, 380_000);
const citation_last = citation_history[citation_history.length - 1].avgPrice;

/* ─── Asset Data ─────────────────────────────────────────────────────────────── */

export const LUXURY_CARS: LuxuryAsset[] = [
  {
    id: 'bugatti-chiron-super-sport',
    category: 'car',
    make: 'Bugatti',
    model: 'Chiron Super Sport',
    title: 'Bugatti Chiron Super Sport',
    year: 2023,
    price: chiron_last,
    priceFormatted: '$' + (chiron_last / 1_000_000).toFixed(1) + 'M',
    currency: 'USD',
    location: 'Monaco',
    description:
      'One of 500 ever built, this Chiron Super Sport represents the absolute pinnacle of Bugatti\'s hypercar mastery. Finished in a bespoke Gris Rafale over Beluga leather interior with exposed carbon fibre accents, this example has covered just 1,200 km from new and remains in factory condition. Supplied new by Bugatti Monaco with full service history.',
    mainImage: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
      'https://images.unsplash.com/photo-1555353540-64580b51c258?w=1200',
    ],
    specs: {
      Engine: '8.0L Quad-Turbo W16',
      Power: '1,600 hp',
      Torque: '1,180 lb-ft',
      '0–60 mph': '2.3 sec',
      'Top Speed': '273 mph',
      Transmission: '7-Speed DSG',
      Drivetrain: 'AWD',
      Mileage: '1,200 km',
      Colour: 'Gris Rafale',
      Interior: 'Beluga Full Leather',
    },
    highlights: [
      'One of 500 worldwide',
      'Bespoke factory specification',
      'Full Bugatti service history',
      'Collector condition — 1,200 km',
      'Supplied with all books, tools & cover',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'dealer',
    priceHistory: chiron_history,
    pricePrediction: buildPrediction(chiron_last, 18_000),
    priceTrend: 'appreciating',
  },
  {
    id: 'pagani-huayra-roadster-bc',
    category: 'car',
    make: 'Pagani',
    model: 'Huayra Roadster BC',
    title: 'Pagani Huayra Roadster BC',
    year: 2022,
    price: pagani_last,
    priceFormatted: '$' + (pagani_last / 1_000_000).toFixed(1) + 'M',
    currency: 'USD',
    location: 'Dubai, UAE',
    description:
      'The Huayra Roadster BC is the most extreme open-top hypercar Pagani has ever produced, limited to just 40 units globally. This example, finished in Arancio Magnesio with carbon ceramic brakes and the optional titanium exhaust, has been maintained exclusively by Pagani Automobili and presents in absolute as-new condition.',
    mainImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
    ],
    specs: {
      Engine: '6.0L Twin-Turbo V12 (AMG)',
      Power: '800 hp',
      Torque: '774 lb-ft',
      '0–60 mph': '2.7 sec',
      'Top Speed': '238 mph',
      Transmission: '7-Speed Sequential',
      Drivetrain: 'RWD',
      Mileage: '820 km',
      Colour: 'Arancio Magnesio',
      Chassis: 'Carbon-Titanium Monocoque',
    },
    highlights: [
      '1 of 40 worldwide',
      'Titanium exhaust package',
      'Carbon ceramic braking system',
      'Pagani factory service history',
      'Museum-quality condition',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'private',
    priceHistory: pagani_history,
    pricePrediction: buildPrediction(pagani_last, 22_000),
    priceTrend: 'appreciating',
  },
  {
    id: 'rolls-royce-phantom-viii',
    category: 'car',
    make: 'Rolls-Royce',
    model: 'Phantom VIII Extended',
    title: 'Rolls-Royce Phantom VIII Extended',
    year: 2024,
    price: phantom_last,
    priceFormatted: '$' + Math.round(phantom_last / 1_000).toLocaleString() + 'K',
    currency: 'USD',
    location: 'London, UK',
    description:
      'The Rolls-Royce Phantom represents the ultimate expression of automotive luxury. This extended wheelbase commission features the Gallery dashboard inlaid with Murano glass containing a bespoke artistic installation, rear Theatre Configuration, and Starlight Headliner with 1,344 individually placed fiber-optic lights.',
    mainImage: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=1200',
    images: [
      'https://images.unsplash.com/photo-1617654112368-307921291f42?w=1200',
      'https://images.unsplash.com/photo-1555353540-64580b51c258?w=1200',
    ],
    specs: {
      Engine: '6.75L Twin-Turbo V12',
      Power: '563 hp',
      Torque: '664 lb-ft',
      '0–60 mph': '5.1 sec',
      Wheelbase: 'Extended (+170 mm)',
      Transmission: '8-Speed Automatic',
      Drivetrain: 'AWD',
      Mileage: '4,200 km',
      Colour: 'Andalusian White',
      Interior: 'Seashell & Moccasin Leather',
    },
    highlights: [
      'Gallery dashboard — Murano glass art installation',
      'Starlight Headliner — 1,344 fibre-optic stars',
      'Rear Theatre Configuration',
      'Spirit of Ecstasy illuminated',
      'Rolls-Royce Provenance Certified',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'dealer',
    priceHistory: phantom_history,
    pricePrediction: buildPrediction(phantom_last, -1_200),
    priceTrend: 'depreciating',
  },
  {
    id: 'ferrari-purosangue',
    category: 'car',
    make: 'Ferrari',
    model: 'Purosangue',
    title: 'Ferrari Purosangue',
    year: 2024,
    price: ferrari_last,
    priceFormatted: '$' + Math.round(ferrari_last / 1_000).toLocaleString() + 'K',
    currency: 'USD',
    location: 'Miami, FL',
    description:
      'Ferrari\'s first-ever four-door, four-seat sports car delivers the Prancing Horse\'s signature performance in an entirely new form. Finished in Rosso Corsa with Nero Ade interior and Carbon Fibre race seats, this example is supplied new by Ferrari of Miami and features the full Personalisation programme specification.',
    mainImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200',
    ],
    specs: {
      Engine: '6.5L Naturally Aspirated V12',
      Power: '715 hp',
      Torque: '528 lb-ft',
      '0–60 mph': '3.3 sec',
      'Top Speed': '193 mph',
      Transmission: '8-Speed Dual-Clutch',
      Drivetrain: 'AWD',
      Mileage: '850 km',
      Colour: 'Rosso Corsa',
      Doors: '4 (Rear-Hinged Rear Doors)',
    },
    highlights: [
      'Ferrari\'s first four-door model',
      'Naturally aspirated V12 — pure Ferrari',
      'Full Personalisation programme',
      'Carbon fibre race seats',
      'Ferrari Classiche-eligible in future',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'dealer',
    priceHistory: ferrari_history,
    pricePrediction: buildPrediction(ferrari_last, 3_500),
    priceTrend: 'appreciating',
  },
  {
    id: 'lamborghini-revuelto',
    category: 'car',
    make: 'Lamborghini',
    model: 'Revuelto',
    title: 'Lamborghini Revuelto',
    year: 2024,
    price: lamborghini_last,
    priceFormatted: '$' + Math.round(lamborghini_last / 1_000).toLocaleString() + 'K',
    currency: 'USD',
    location: 'Dubai, UAE',
    description:
      'The Revuelto marks Lamborghini\'s transition into the hybrid era without sacrificing a single decibel of the iconic V12 howl. This example is finished in the exclusive Grigio Telesto with Senso interior and the full Ad Personam programme including exposed carbon fibre aero package and forged carbon wheels.',
    mainImage: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=1200',
    images: [
      'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=1200',
    ],
    specs: {
      Engine: '6.5L V12 + 3 Electric Motors',
      Power: '1,001 hp',
      Torque: '535 lb-ft (ICE only)',
      '0–60 mph': '2.5 sec',
      'Top Speed': '217 mph',
      Transmission: '8-Speed DCT',
      Drivetrain: 'HPEV AWD',
      Mileage: '2,100 km',
      Colour: 'Grigio Telesto',
      System: 'Plug-in Hybrid V12',
    },
    highlights: [
      'First Lamborghini PHEV — 1,001 hp system',
      'Forged carbon aero package',
      'Full Ad Personam specification',
      'All-electric drive mode (urban)',
      'Immediate availability — no waiting list',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'dealer',
    priceHistory: lamborghini_history,
    pricePrediction: buildPrediction(lamborghini_last, 4_200),
    priceTrend: 'appreciating',
  },
  {
    id: 'aston-martin-db12',
    category: 'car',
    make: 'Aston Martin',
    model: 'DB12',
    title: 'Aston Martin DB12',
    year: 2024,
    price: aston_last,
    priceFormatted: '$' + Math.round(aston_last / 1_000).toLocaleString() + 'K',
    currency: 'USD',
    location: 'London, UK',
    description:
      'The DB12 marks Aston Martin\'s most significant new model in a generation — the world\'s first Super Tourer. This example, supplied new by Aston Martin Works, is finished in Iridescent Emerald with Obsidian Black Bridge of Weir leather and the full Q by Aston Martin treatment including satin chrome detailing.',
    mainImage: 'https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?w=1200',
    images: [
      'https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?w=1200',
    ],
    specs: {
      Engine: '4.0L Twin-Turbo V8',
      Power: '671 hp',
      Torque: '590 lb-ft',
      '0–60 mph': '3.5 sec',
      'Top Speed': '202 mph',
      Transmission: '8-Speed Torque Converter',
      Drivetrain: 'RWD',
      Mileage: '3,600 km',
      Colour: 'Iridescent Emerald',
      Interior: 'Obsidian Black Bridge of Weir',
    },
    highlights: [
      'Q by Aston Martin full bespoke specification',
      'Iridescent Emerald — exclusive colour',
      'Aston Martin Works supplied new',
      'Sport Plus seats with contrast stitching',
      'Panoramic glass roof',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'dealer',
    priceHistory: aston_history,
    pricePrediction: buildPrediction(aston_last, -800),
    priceTrend: 'stable',
  },
];

/* ─── Watches ────────────────────────────────────────────────────────────────── */

export const LUXURY_WATCHES: LuxuryAsset[] = [
  {
    id: 'patek-philippe-nautilus-5726a',
    category: 'watch',
    make: 'Patek Philippe',
    model: 'Nautilus Annual Calendar 5726A',
    title: 'Patek Philippe Nautilus 5726A',
    year: 2022,
    price: pp_last,
    priceFormatted: '$' + Math.round(pp_last / 1_000).toLocaleString() + 'K',
    currency: 'USD',
    location: 'Geneva, Switzerland',
    description:
      'The Nautilus Annual Calendar ref. 5726A in stainless steel remains one of the most coveted complications in the Nautilus family. This example, purchased directly from Patek Philippe Geneva, has never been worn and retains all original packaging, certificate and hang tags. An exceptional opportunity to acquire what may become unobtainable.',
    mainImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200',
    images: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200',
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200',
    ],
    specs: {
      Reference: '5726A-001',
      Movement: 'Cal. 324 S QA LU 24H (Annual Calendar)',
      Case: 'Stainless Steel, 40.5 mm',
      Dial: 'Blue Gradient Sunburst',
      Bracelet: 'Integrated Stainless Steel',
      'Water Resistance': '120 m',
      'Power Reserve': '45 hours',
      Condition: 'Unworn / New Old Stock',
      'Box & Papers': 'Full set — original box, papers, hang tags',
      Year: '2022',
    },
    highlights: [
      'Unworn — never on a wrist',
      'Full set: box, papers, certificate, hang tags',
      'Purchased directly from Patek Philippe Geneva',
      'Annual calendar — only needs setting once per year',
      'Strongest appreciating reference in the Nautilus family',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'private',
    priceHistory: pp_history,
    pricePrediction: buildPrediction(pp_last, 8_500),
    priceTrend: 'appreciating',
  },
  {
    id: 'richard-mille-rm11-03',
    category: 'watch',
    make: 'Richard Mille',
    model: 'RM 11-03 McLaren Flyback Chronograph',
    title: 'Richard Mille RM 11-03 McLaren',
    year: 2021,
    price: rm_last,
    priceFormatted: '$' + (rm_last / 1_000_000).toFixed(2) + 'M',
    currency: 'USD',
    location: 'Dubai, UAE',
    description:
      'The RM 11-03 McLaren is a triumph of materials science — an ultra-thin, ultra-light flyback chronograph with annual calendar in NTPT Carbon with orange accents mirroring McLaren\'s signature colour. Limited to 500 pieces as part of the McLaren partnership, this example has been worn fewer than five times and is accompanied by its complete set.',
    mainImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200',
    ],
    specs: {
      Reference: 'RM 11-03 McLaren',
      Movement: 'Cal. RMAC3 (Flyback Chronograph, Annual Calendar)',
      Case: 'NTPT Carbon, 40 × 50 mm',
      Dial: 'Skeletonised / NTPT Carbon',
      Strap: 'Orange Rubber + Titanium Buckle',
      'Power Reserve': '55 hours',
      'Water Resistance': '50 m',
      Condition: 'Excellent (5 wears)',
      'Box & Papers': 'Full set',
      Edition: '500 pieces — McLaren partnership',
    },
    highlights: [
      'McLaren limited edition — 500 pieces',
      'NTPT Carbon case — 3g lighter than titanium',
      'Flyback chronograph with annual calendar',
      'Worn fewer than 5 times — near mint',
      'Full set with Richard Mille presentation box',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'dealer',
    priceHistory: rm_history,
    pricePrediction: buildPrediction(rm_last, 19_000),
    priceTrend: 'appreciating',
  },
  {
    id: 'ap-royal-oak-5402st',
    category: 'watch',
    make: 'Audemars Piguet',
    model: 'Royal Oak 41mm Self-Winding',
    title: 'Audemars Piguet Royal Oak 15500ST',
    year: 2023,
    price: ap_last,
    priceFormatted: '$' + Math.round(ap_last / 1_000).toLocaleString() + 'K',
    currency: 'USD',
    location: 'London, UK',
    description:
      'The Royal Oak ref. 15500ST in stainless steel with blue "Grande Tapisserie" dial is the definitive expression of Gérald Genta\'s 1972 masterpiece. This 2023 example purchased from Audemars Piguet London is unworn and in absolute mint condition, with the current 4-year waiting list making examples like this increasingly rare on the secondary market.',
    mainImage: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=1200',
    images: [
      'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=1200',
    ],
    specs: {
      Reference: '15500ST.OO.1220ST.01',
      Movement: 'Cal. 4302 (Self-Winding)',
      Case: 'Stainless Steel, 41 mm',
      Dial: 'Blue Grande Tapisserie',
      Bracelet: 'Integrated "Bracelet Intégré"',
      'Power Reserve': '60 hours',
      'Water Resistance': '50 m',
      Condition: 'Unworn',
      'Box & Papers': 'Full set — AP box and certificate',
      Year: '2023',
    },
    highlights: [
      '4-year waiting list at authorised dealers',
      'Unworn — purchased AP London direct',
      '60-hour power reserve calibre',
      'Blue dial — most collectible Royal Oak variant',
      'Immediately available — no wait',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'private',
    priceHistory: ap_history,
    pricePrediction: buildPrediction(ap_last, 3_200),
    priceTrend: 'appreciating',
  },
  {
    id: 'fp-journe-chronometre-bleu',
    category: 'watch',
    make: 'F.P. Journe',
    model: 'Chronomètre Bleu',
    title: 'F.P. Journe Chronomètre Bleu',
    year: 2022,
    price: fp_last,
    priceFormatted: '$' + Math.round(fp_last / 1_000).toLocaleString() + 'K',
    currency: 'USD',
    location: 'Monaco',
    description:
      'The Chronomètre Bleu is François-Paul Journe\'s horological testament — a remontoir d\'égalité movement beating with a resonance system unique in all of watchmaking. The tantalum blue case and brass movement define FPJ\'s uncompromising philosophy: form utterly in service of function. This example is accompanied by full papers.',
    mainImage: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200',
    images: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200',
    ],
    specs: {
      Reference: 'CBL T 40',
      Movement: 'Cal. 1304 (Remontoir d\'Égalité)',
      Case: 'Tantalum, 40 mm',
      Dial: 'Brass — Power Reserve / Seconds',
      Strap: 'Dark Blue Alligator',
      'Power Reserve': '40 hours',
      'Water Resistance': '30 m',
      Condition: 'Excellent',
      'Box & Papers': 'Full set',
      Complications: 'Constant Force Remontoir',
    },
    highlights: [
      'Constant force remontoir — unique complication',
      'Tantalum case — extremely rare material',
      'Brass movement — FPJ horological signature',
      'Full set with F.P. Journe papers',
      'Secondary market demand consistently exceeds supply',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'dealer',
    priceHistory: fp_history,
    pricePrediction: buildPrediction(fp_last, 2_100),
    priceTrend: 'appreciating',
  },
  {
    id: 'lange-sohne-datograph',
    category: 'watch',
    make: 'A. Lange & Söhne',
    model: 'Datograph Perpetual Tourbillon',
    title: 'A. Lange & Söhne Datograph Perpetual Tourbillon',
    year: 2021,
    price: lange_last,
    priceFormatted: '$' + Math.round(lange_last / 1_000).toLocaleString() + 'K',
    currency: 'USD',
    location: 'Glashütte, Germany',
    description:
      'The Datograph Perpetual Tourbillon combines A. Lange & Söhne\'s most celebrated chronograph with a perpetual calendar and tourbillon — three supreme complications in a single movement. The platinum case and black dial with outsize date are hallmarks of Saxony\'s most prestigious watchmaker.',
    mainImage: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=1200',
    images: [
      'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=1200',
    ],
    specs: {
      Reference: '740.035',
      Movement: 'Cal. L952.2 (3 Complications)',
      Case: 'Platinum, 41.5 mm',
      Dial: 'Black with Outsize Date',
      Strap: 'Black Alligator + Platinum Buckle',
      'Power Reserve': '50 hours',
      Complications: 'Flyback Chronograph + Perpetual Calendar + Tourbillon',
      Condition: 'Very Good',
      'Box & Papers': 'Full set',
      Year: '2021',
    },
    highlights: [
      'Triple complication: flyback chrono + perpetual + tourbillon',
      'Platinum case — most precious A.L.&S. material',
      'Hand-engraved balance cock visible through caseback',
      'Full set with original Lange & Söhne packaging',
      'Less than 100 examples produced per year',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'private',
    priceHistory: lange_history,
    pricePrediction: buildPrediction(lange_last, 1_800),
    priceTrend: 'appreciating',
  },
  {
    id: 'rolex-daytona-116500ln',
    category: 'watch',
    make: 'Rolex',
    model: 'Cosmograph Daytona 116500LN',
    title: 'Rolex Daytona White Dial 116500LN',
    year: 2023,
    price: daytona_last,
    priceFormatted: '$' + Math.round(daytona_last / 1_000).toLocaleString() + 'K',
    currency: 'USD',
    location: 'New York, USA',
    description:
      'The Daytona 116500LN with white dial and black Cerachrom bezel is the most sought-after stainless steel sports watch in the world, with waiting lists at authorised dealers exceeding five years. This sticker-intact example purchased in 2023 represents the last reference before the 126500LN transition — making it immediately collectible.',
    mainImage: 'https://images.unsplash.com/photo-1639037034329-f7576bdba9d0?w=1200',
    images: [
      'https://images.unsplash.com/photo-1639037034329-f7576bdba9d0?w=1200',
    ],
    specs: {
      Reference: '116500LN',
      Movement: 'Cal. 4130 (COSC Chronometer)',
      Case: 'Oystersteel, 40 mm',
      Dial: 'White "Panda"',
      Bezel: 'Black Cerachrom (Ceramic)',
      Bracelet: 'Oyster with Oysterclasp',
      'Power Reserve': '72 hours',
      'Water Resistance': '100 m',
      Condition: 'Unworn (stickers intact)',
      'Box & Papers': 'Full set',
    },
    highlights: [
      'Stickers intact — true unworn example',
      '5+ year waiting list at AD',
      'Last 116500 reference before transition',
      'White "panda" dial — most desirable configuration',
      'Full 2023 papers and Rolex warranty',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'dealer',
    priceHistory: daytona_history,
    pricePrediction: buildPrediction(daytona_last, 620),
    priceTrend: 'appreciating',
  },
];

/* ─── Yachts ─────────────────────────────────────────────────────────────────── */

export const LUXURY_YACHTS: LuxuryAsset[] = [
  {
    id: 'sunseeker-155-yacht',
    category: 'yacht',
    make: 'Sunseeker',
    model: '155 Yacht',
    title: 'Sunseeker 155 Yacht',
    year: 2023,
    price: sunseeker_last,
    priceFormatted: '$' + (sunseeker_last / 1_000_000).toFixed(1) + 'M',
    currency: 'USD',
    location: 'Monaco',
    description:
      'The Sunseeker 155 Yacht is the British shipyard\'s crowning achievement — a 47-metre superyacht blending the DNA of a sport yacht with true superyacht proportions. This 2023 example, currently berthed in Monaco Harbour, features a main saloon with panoramic views, sky lounge, sundeck with Jacuzzi, and accommodation for 12 guests in 5 staterooms.',
    mainImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200',
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
    ],
    specs: {
      Builder: 'Sunseeker International',
      LOA: '47.2 m (155 ft)',
      Beam: '9.1 m',
      Draft: '2.3 m',
      Guests: '12 in 5 staterooms',
      Crew: '8',
      'Max Speed': '22 knots',
      'Cruising Speed': '16 knots',
      Engines: 'Twin MTU 16V 2000 M96L',
      'Home Port': 'Monaco',
    },
    highlights: [
      'Sky lounge + main saloon with panoramic glazing',
      'Sundeck Jacuzzi and alfresco dining',
      'Beach club with fold-down swim platform',
      'Full crew quarters for 8',
      'Available for summer 2026 charter — offset costs',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'dealer',
    priceHistory: sunseeker_history,
    pricePrediction: buildPrediction(sunseeker_last, 85_000),
    priceTrend: 'appreciating',
  },
  {
    id: 'feadship-custom-superyacht',
    category: 'yacht',
    make: 'Feadship',
    model: 'Custom 72m Superyacht',
    title: 'Feadship 72m Custom Superyacht',
    year: 2021,
    price: feadship_last,
    priceFormatted: '$' + (feadship_last / 1_000_000).toFixed(0) + 'M',
    currency: 'USD',
    location: 'Dubai, UAE',
    description:
      'This fully custom Feadship superyacht represents Dutch craftsmanship at its finest — built to the original owner\'s commission with no detail overlooked. Featuring an art collection worth $3M integrated into the interior design, a submarine garage, 8-metre tender, and spa deck, this vessel defines the upper echelon of private yachting.',
    mainImage: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200',
    images: [
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200',
    ],
    specs: {
      Builder: 'Feadship (De Vries / Van Lent)',
      LOA: '72 m (236 ft)',
      Beam: '12.4 m',
      Draft: '3.2 m',
      Guests: '16 in 8 staterooms',
      Crew: '16',
      'Max Speed': '18 knots',
      'Cruising Speed': '14 knots',
      'Gross Tonnage': '1,480 GT',
      'Home Port': 'Dubai',
    },
    highlights: [
      'Integrated $3M curated art collection',
      'Submarine garage (2-person submersible included)',
      'Full beach club + spa deck',
      'Hybrid propulsion — reduced emissions',
      'Feadship 20-year structural warranty',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'private',
    priceHistory: feadship_history,
    pricePrediction: buildPrediction(feadship_last, 280_000),
    priceTrend: 'stable',
  },
  {
    id: 'pershing-140',
    category: 'yacht',
    make: 'Pershing',
    model: '140',
    title: 'Pershing 140',
    year: 2022,
    price: pershing_last,
    priceFormatted: '$' + (pershing_last / 1_000_000).toFixed(1) + 'M',
    currency: 'USD',
    location: 'Marbella, Spain',
    description:
      'The Pershing 140 is the Italian yard\'s most powerful sports yacht — a 42-metre thoroughbred combining aggressive styling with genuine superyacht accommodation. Berthed in Puerto Banús, Marbella, this example is fully operational and available for the 2026 summer Mediterranean season, making it an immediate income-generating asset.',
    mainImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
    ],
    specs: {
      Builder: 'Pershing (Ferretti Group)',
      LOA: '42.1 m (138 ft)',
      Beam: '8.4 m',
      Draft: '1.95 m',
      Guests: '10 in 4 staterooms',
      Crew: '6',
      'Max Speed': '30 knots',
      'Cruising Speed': '22 knots',
      Engines: 'Twin MTU 16V 4000 M93L',
      'Home Port': 'Puerto Banús, Marbella',
    },
    highlights: [
      '30-knot top speed — fastest in class',
      'Current MYBA charter management — income generating',
      'Puerto Banús berth included (2026 season)',
      'Azimut-Benetti Group engineering pedigree',
      'Full refit completed Q1 2025',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'private',
    priceHistory: pershing_history,
    pricePrediction: buildPrediction(pershing_last, 22_000),
    priceTrend: 'stable',
  },
  {
    id: 'benetti-spirit-of-tradition',
    category: 'yacht',
    make: 'Benetti',
    model: 'Spirit of Tradition 116',
    title: 'Benetti Spirit of Tradition 116',
    year: 2020,
    price: benetti_last,
    priceFormatted: '$' + (benetti_last / 1_000_000).toFixed(0) + 'M',
    currency: 'USD',
    location: 'Portofino, Italy',
    description:
      'The Benetti Spirit of Tradition 116 is a semi-displacement yacht that blends classic styling with modern performance. This Portofino-based example features a full-beam master stateroom with panoramic sea views, beach club, and a glass-enclosed dining saloon designed by Benetti\'s in-house Azimut|Benetti design team.',
    mainImage: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200',
    images: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200',
    ],
    specs: {
      Builder: 'Benetti',
      LOA: '35.4 m (116 ft)',
      Beam: '7.6 m',
      Draft: '1.7 m',
      Guests: '10 in 4 staterooms',
      Crew: '5',
      'Max Speed': '16 knots',
      'Cruising Speed': '12 knots',
      Engines: 'Twin Caterpillar C32 ACERT',
      'Home Port': 'Portofino',
    },
    highlights: [
      'Full-beam master stateroom panoramic windows',
      'Classic Italian shipbuilding — Benetti heritage since 1873',
      'Portofino berth — most exclusive Italian marina',
      'MCA Compliant — charter-ready',
      'Complete refit 2024 — new soft furnishings throughout',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'dealer',
    priceHistory: benetti_history,
    pricePrediction: buildPrediction(benetti_last, 120_000),
    priceTrend: 'stable',
  },
];

/* ─── Private Jets ───────────────────────────────────────────────────────────── */

export const LUXURY_JETS: LuxuryAsset[] = [
  {
    id: 'gulfstream-g700',
    category: 'jet',
    make: 'Gulfstream',
    model: 'G700',
    title: 'Gulfstream G700',
    year: 2024,
    price: gulfstream_last,
    priceFormatted: '$' + (gulfstream_last / 1_000_000).toFixed(0) + 'M',
    currency: 'USD',
    location: 'Geneva, Switzerland',
    description:
      'The Gulfstream G700 is the world\'s largest purpose-built business jet, defining the ultra-long-range category with a cabin that spans five living areas. This 2024 delivery example is configured for 19 passengers with a full master suite including en-suite bathroom, two full galley kitchens, and Gulfstream\'s Cabin Management System 3.0.',
    mainImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200',
    images: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200',
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200',
    ],
    specs: {
      Manufacturer: 'Gulfstream Aerospace',
      Range: '7,500 nm (13,890 km)',
      Passengers: '19 max (configured: 14)',
      'Max Speed': 'Mach 0.925',
      'Cruising Altitude': '51,000 ft',
      Engines: '2× Rolls-Royce Pearl 700',
      Cabin: '5 living zones, 19 Panoramic Oval windows',
      'Baggage Volume': '4.8 m³',
      'Total Time': '180 hours',
      MTOW: '46,266 kg',
    },
    highlights: [
      'World\'s largest purpose-built business jet cabin',
      'Master suite with en-suite shower room',
      'Rolls-Royce Pearl 700 engines — quietest in class',
      'Non-stop: New York–Tokyo, London–Singapore',
      'FANS 1/A+, ADS-B Out compliant — all airspaces',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'dealer',
    priceHistory: gulfstream_history,
    pricePrediction: buildPrediction(gulfstream_last, 420_000),
    priceTrend: 'appreciating',
  },
  {
    id: 'bombardier-global-7500',
    category: 'jet',
    make: 'Bombardier',
    model: 'Global 7500',
    title: 'Bombardier Global 7500',
    year: 2023,
    price: global_last,
    priceFormatted: '$' + (global_last / 1_000_000).toFixed(0) + 'M',
    currency: 'USD',
    location: 'Dubai, UAE',
    description:
      'The Bombardier Global 7500 holds the world record for the longest-range business jet flight, connecting any two cities on earth non-stop. This 2023 example features Bombardier\'s Nuage seating — the most advanced business jet seat ever engineered — and a four-zone cabin with dedicated master suite, dining room, and entertainment area.',
    mainImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200',
    images: [
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200',
    ],
    specs: {
      Manufacturer: 'Bombardier',
      Range: '7,700 nm (14,260 km)',
      Passengers: '19 max (configured: 13)',
      'Max Speed': 'Mach 0.925',
      'Cruising Altitude': '51,000 ft',
      Engines: '2× GE Passport',
      Cabin: '4 zones — Master Suite + Dining + Living + Entertainment',
      Seating: 'Nuage Seats — 12 reclining to flat-bed',
      'Total Time': '420 hours',
      MTOW: '47,400 kg',
    },
    highlights: [
      'World record: longest business jet range',
      'Bombardier Nuage seating — reclines to flat-bed',
      'Full galley with electric oven + espresso station',
      'Non-stop: Dubai–New York, London–Sydney possible',
      'FANS 1/A+ and CPDLC equipped',
    ],
    isVerified: true,
    isFeatured: true,
    sellerType: 'private',
    priceHistory: global_history,
    pricePrediction: buildPrediction(global_last, 380_000),
    priceTrend: 'appreciating',
  },
  {
    id: 'dassault-falcon-10x',
    category: 'jet',
    make: 'Dassault',
    model: 'Falcon 10X',
    title: 'Dassault Falcon 10X',
    year: 2024,
    price: falcon_last,
    priceFormatted: '$' + (falcon_last / 1_000_000).toFixed(0) + 'M',
    currency: 'USD',
    location: 'Paris, France',
    description:
      'The Dassault Falcon 10X is the French manufacturer\'s most ambitious aircraft — a widebody ultra-long-range jet with the largest cabin cross-section of any purpose-built business jet. The 10X\'s 2.03-metre cabin height allows passengers to stand fully upright anywhere in the aircraft, while the wing design provides exceptional fuel efficiency.',
    mainImage: 'https://images.unsplash.com/photo-1474302771604-9c739f2c3d8b?w=1200',
    images: [
      'https://images.unsplash.com/photo-1474302771604-9c739f2c3d8b?w=1200',
    ],
    specs: {
      Manufacturer: 'Dassault Aviation',
      Range: '7,500 nm (13,890 km)',
      Passengers: '16 max (configured: 12)',
      'Max Speed': 'Mach 0.925',
      'Cruising Altitude': '51,000 ft',
      Engines: '2× Rolls-Royce Pearl 10X',
      'Cabin Width': '2.93 m — widest in class',
      'Cabin Height': '2.03 m — stand fully upright',
      'Total Time': '85 hours',
      MTOW: '51,200 kg',
    },
    highlights: [
      'Largest cabin cross-section in business aviation',
      'Stand fully upright — 2.03 m ceiling height',
      'Rolls-Royce Pearl 10X — lowest emissions in class',
      'Digital fly-by-wire — fighter jet heritage',
      '85 hours only — essentially new aircraft',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'dealer',
    priceHistory: falcon_history,
    pricePrediction: buildPrediction(falcon_last, 310_000),
    priceTrend: 'appreciating',
  },
  {
    id: 'cessna-citation-xls',
    category: 'jet',
    make: 'Cessna',
    model: 'Citation XLS+',
    title: 'Cessna Citation XLS+ (Fractional Share)',
    year: 2020,
    price: citation_last,
    priceFormatted: '$' + (citation_last / 1_000_000).toFixed(1) + 'M',
    currency: 'USD',
    location: 'Miami, FL',
    description:
      'A 1/4 fractional ownership share in a 2020 Cessna Citation XLS+ offering 200 guaranteed flight hours per year — ideal for buyers who require private aviation flexibility without the full capital commitment and operational overhead of sole ownership. Managed by a leading Part 135 operator with no blackout dates.',
    mainImage: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?w=1200',
    images: [
      'https://images.unsplash.com/photo-1520437358207-323b43b50729?w=1200',
    ],
    specs: {
      Manufacturer: 'Textron Aviation (Cessna)',
      Ownership: '1/4 Fractional Share',
      'Guaranteed Hours': '200 hrs/year',
      Range: '3,700 km (2,000 nm)',
      Passengers: '9',
      'Max Speed': '860 km/h (Mach 0.75)',
      Engines: '2× Pratt & Whitney PW545C',
      'Cabin Height': '1.52 m',
      'Home Base': 'Miami Opa-locka Executive',
      Operator: 'Part 135 Certified',
    },
    highlights: [
      '200 hours/year — no blackout dates',
      'Ideal for 1–2 hour regional missions',
      'Management fees included in purchase price',
      'No maintenance, hangar or crew costs',
      'Upgrade to full ownership available',
    ],
    isVerified: true,
    isFeatured: false,
    sellerType: 'dealer',
    priceHistory: citation_history,
    pricePrediction: buildPrediction(citation_last, -15_000),
    priceTrend: 'depreciating',
  },
];

/* ─── Combined export ────────────────────────────────────────────────────────── */

export const ALL_LIFESTYLE_ASSETS = [
  ...LUXURY_CARS,
  ...LUXURY_WATCHES,
  ...LUXURY_YACHTS,
  ...LUXURY_JETS,
];

export const LIFESTYLE_CATEGORIES = [
  {
    id: 'cars',
    label: 'Exotic Cars',
    href: '/lifestyle/cars',
    count: LUXURY_CARS.length,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    description: 'Hypercars, grand tourers & collector automobiles',
  },
  {
    id: 'watches',
    label: 'Timepieces',
    href: '/lifestyle/watches',
    count: LUXURY_WATCHES.length,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800',
    description: 'Investment-grade watches & horological masterpieces',
  },
  {
    id: 'yachts',
    label: 'Yachts',
    href: '/lifestyle/yachts',
    count: LUXURY_YACHTS.length,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
    description: 'Sport yachts, superyachts & custom commissions',
  },
  {
    id: 'jets',
    label: 'Private Jets',
    href: '/lifestyle/jets',
    count: LUXURY_JETS.length,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    description: 'Ultra-long-range jets, turboprops & fractional ownership',
  },
  {
    id: 'art',
    label: 'Art & Collectibles',
    href: '/lifestyle/art',
    count: 24,
    image: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800',
    description: 'Contemporary art, sculptures & rare collectibles',
  },
];
