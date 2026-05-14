/* ─── Property ───────────────────────────────────────────────────────────────── */

export type PropertyStatus = 'resale' | 'pre-construction';
export type PropertyType = 'Villa' | 'Penthouse' | 'Estate' | 'Apartment' | 'Townhouse' | 'Mansion';

export interface PropertyLocation {
  city: string;
  country: string;
  neighborhood: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  currency: string;
  location: PropertyLocation;
  type: PropertyType;
  beds: number;
  baths: number;
  sqm: number;
  status: PropertyStatus;
  isOffPlan: boolean;
  completionYear?: number;
  developer?: string;
  description: string;
  mainImage: string;
  images: string[];
  amenities: string[];
  isLuxury: boolean;
  isFeatured: boolean;
  coordinates: Coordinates;
}

/* ─── Pre-Construction Project ───────────────────────────────────────────────── */

export type ProjectStatus = 'Launching Soon' | 'Under Construction' | 'Ready to Move';

export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  country: string;
  priceFrom: number;
  priceTo: number;
  units: number;
  completionYear: number;
  status: ProjectStatus;
  paymentPlan: string;
  description: string;
  coverImage: string;
  amenities: string[];
  highlights: string[];
}

/* ─── Market ─────────────────────────────────────────────────────────────────── */

export interface Market {
  name: string;
  country: string;
  flag: string;
  avgPrice: number;
  yoy: string;
  listingCount: number;
  image: string;
}

/* ─── Testimonial ────────────────────────────────────────────────────────────── */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  property: string;
  location: string;
  rating: number;
}

/* ─── Search Filters ─────────────────────────────────────────────────────────── */

export interface SearchFilters {
  query?: string;
  location?: string;
  type?: PropertyType | '';
  status?: PropertyStatus | '';
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  currency?: string;
  isOffPlan?: boolean;
  developer?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'featured';
}

/* ─── Stats ──────────────────────────────────────────────────────────────────── */

export interface Stats {
  totalListings: number;
  countries: number;
  developers: number;
  totalValue: string;
}
