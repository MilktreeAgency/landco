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
  availability: string;       // e.g. "1 Site Available", "4,000 – 80,000 sq ft"
  description: string;
  features: string[];
  use: string;
  price: string;              // e.g. "Price on application", "From £3 per sq ft"
  tags: string[];
  imageUrl: string;
  images: string[];
  available: boolean;
  coordinates?: { lat: number; lng: number };
  totalSiteArea?: string;     // e.g. "Approx. 1.5 acres"
  condition?: string;         // building/site condition note
  siteManager?: SiteManager;
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
    heroImage: '/property-imagery/millbrook-road/cover.jpg'
  },
  {
    slug: 'portsmouth',
    name: 'Portsmouth',
    region: 'Hampshire',
    description: 'Coastal logistics hub with naval heritage',
    heroImage: '/property-imagery/portsdown-main/cover.jpg'
  },
  {
    slug: 'yeovil',
    name: 'Yeovil',
    region: 'Somerset',
    description: 'Southwest gateway with strong road connectivity',
    heroImage: '/property-imagery/sherborne-house/cover.jpg'
  },
  {
    slug: 'salisbury',
    name: 'Salisbury',
    region: 'Wiltshire',
    description: 'Established commercial location with flexible land available',
    heroImage: '/property-imagery/coldharbour-lane/cover.jpg'
  },
  {
    slug: 'byfleet',
    name: 'Byfleet',
    region: 'Surrey',
    description: 'Roadside commercial sites with EV and parking potential',
    heroImage: '/property-imagery/byfleet/cover.jpg'
  }
];
