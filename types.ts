export interface SiteManager {
  name: string;
  role: string;
  phone: string;
  email: string;
  imageUrl: string;
}

export interface Yard {
  id: string;
  title: string;
  location: string;
  city: string;
  sqFt: number;
  pricePerMonth: number;
  tags: string[];
  imageUrl: string;
  images: string[]; // Multiple images for carousel
  securityRating: 'A' | 'A+' | 'S';
  available: boolean;
  coordinates: { lat: number; lng: number };
  certifications: string[]; // e.g., 'BREEAM Outstanding', 'ISO 14001'
  features: string[]; // e.g., 'Hardstanding', '24/7 Access', 'Mains Electric'
  siteManager?: SiteManager;
  description?: string;
  plotId?: string; // For multi-plot sites
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LeadStep {
  TYPE = 0,
  SIZE = 1,
  TIMELINE = 2,
  LOCATION = 3,
  CONTACT = 4,
}

export interface LeadData {
  storageType: string;
  size: number;
  timeline: string;
  location: string;
  email: string;
}

export interface CityHub {
  slug: string;
  name: string;
  region: string;
  description: string;
  heroImage: string;
}

export const CITY_HUBS: CityHub[] = [
  {
    slug: 'southampton',
    name: 'Southampton',
    region: 'Hampshire',
    description: 'Strategic port access with M27 connectivity',
    heroImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80'
  },
  {
    slug: 'portsmouth',
    name: 'Portsmouth',
    region: 'Hampshire',
    description: 'Coastal logistics hub with naval heritage',
    heroImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80'
  },
  {
    slug: 'fareham',
    name: 'Fareham',
    region: 'Hampshire',
    description: 'Central M27 corridor with excellent distribution links',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80'
  },
  {
    slug: 'andover',
    name: 'Andover',
    region: 'Hampshire',
    description: 'Strategic A303 access for national distribution',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80'
  },
  {
    slug: 'yeovil',
    name: 'Yeovil',
    region: 'Somerset',
    description: 'Southwest gateway with aerospace heritage',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80'
  },
  {
    slug: 'basingstoke',
    name: 'Basingstoke',
    region: 'Hampshire',
    description: 'M3 corridor hub for London distribution',
    heroImage: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&q=80'
  }
];
