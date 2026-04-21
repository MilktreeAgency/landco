import { Yard } from './types';

export const MOCK_YARDS: Yard[] = [
  {
    id: '1',
    title: '407 Millbrook Road',
    location: '407 Millbrook Road',
    city: 'southampton',
    availability: '1 Site Available',
    description: 'Secure, main roadside commercial yard with excellent visibility and access. The site benefits from an electric gated entrance and on-site security cameras. A large portacabin office is included, providing functional workspace with two toilets and a kitchen.',
    features: [
      'Approx. 8,200 sq ft yard space',
      'Electric gated access',
      'CCTV security',
      'Portacabin office with kitchen and 2 x toilets',
      'Mains electricity on site',
      'Prominent roadside position'
    ],
    use: 'Suitable for open storage, operational yard use, or businesses requiring strong roadside presence.',
    price: 'Price on application',
    tags: ['Electric Gates', 'CCTV', 'Portacabin Office'],
    imageUrl: '/property-imagery/millbrook-road/cover.jpg',
    images: [
      '/property-imagery/millbrook-road/cover.jpg',
      '/property-imagery/millbrook-road/01.jpg',
      '/property-imagery/millbrook-road/02.jpg',
      '/property-imagery/millbrook-road/03.jpg',
      '/property-imagery/millbrook-road/04.jpg',
      '/property-imagery/millbrook-road/05.jpg',
      '/property-imagery/millbrook-road/06.jpg',
      '/property-imagery/millbrook-road/07.jpg',
      '/property-imagery/millbrook-road/aerial.jpg'
    ],
    available: true,
    coordinates: { lat: 50.9097, lng: -1.4620 }
  },
  {
    id: '2',
    title: 'Portsdown Main – James Callaghan Drive',
    location: 'James Callaghan Drive',
    city: 'portsmouth',
    availability: '4,000 – 80,000 sq ft',
    description: 'Flexible open storage yards available in a secure commercial setting. The site offers a range of plot sizes, making it suitable for both small and large-scale operations.',
    features: [
      'Units from 4,000 to 80,000 sq ft',
      'Secure yard environment',
      '7-day access',
      'Flexible lease terms from 12 months',
      'Suitable for a range of commercial uses'
    ],
    use: 'Ideal for open storage, logistics, distribution, and contractor yard space.',
    price: 'From £3 per sq ft',
    tags: ['4k – 80k sq ft', 'Flexible Terms', '7-Day Access'],
    imageUrl: '/property-imagery/portsdown-main/cover.jpg',
    images: [
      '/property-imagery/portsdown-main/cover.jpg',
      '/property-imagery/portsdown-main/01.jpg',
      '/property-imagery/portsdown-main/02.jpg',
      '/property-imagery/portsdown-main/03.jpg',
      '/property-imagery/portsdown-main/04.jpg',
      '/property-imagery/portsdown-main/aerial.jpg'
    ],
    available: true,
    coordinates: { lat: 50.8487, lng: -1.0529 }
  },
  {
    id: '3',
    title: 'Sentry House, Antelope Park',
    location: 'Bursledon Road, SO19 7TE',
    city: 'southampton',
    availability: 'Internal from 2,000 sq ft · External from 4,000 sq ft',
    totalSiteArea: 'Approx. 1.5 acres',
    description: 'A substantial commercial site currently undergoing refurbishment, offering a mix of internal space and external yard areas. Flexible configurations are available to suit a range of occupier requirements.',
    features: [
      'Internal space from 2,000 to 68,000 sq ft',
      'External yard space from 4,000 sq ft',
      'Total internal space up to approx. 30,000 sq ft',
      'Total site size approx. 68,000 sq ft',
      'Ongoing refurbishment',
      'Flexible space options'
    ],
    use: 'Suitable for warehousing, light industrial use, storage, and distribution.',
    price: 'Internal from £6 per sq ft · External from £3 per sq ft',
    tags: ['Internal & External', 'Up to 68,000 sq ft', 'Refurbishment'],
    imageUrl: '/property-imagery/sentry-house/cover.jpg',
    images: [
      '/property-imagery/sentry-house/cover.jpg'
    ],
    available: true,
    coordinates: { lat: 50.8987, lng: -1.3582 }
  },
  {
    id: '4',
    title: 'Sherborne House, Yeovil',
    location: 'Babylon Hill, Yeovil',
    city: 'yeovil',
    availability: 'Whole or split plots',
    totalSiteArea: 'Approx. 1.3 acres',
    description: 'Prominent roadside commercial site with redevelopment potential. Previously occupied by a garage and automotive businesses, the property includes multiple buildings and outbuildings across an irregular-shaped site.',
    features: [
      'Approx. 1.3-acre site',
      'Main road frontage (A30)',
      'Two workshop buildings',
      'Former garage retail unit',
      'Additional outbuildings',
      'Large vehicle display area',
      'Flexible plot configuration (whole or split)'
    ],
    condition: 'Buildings are in poor condition and may require refurbishment or redevelopment.',
    use: 'Suitable for redevelopment, owner-occupation, storage, or automotive-related uses.',
    price: 'Price on application',
    tags: ['1.3 Acres', 'A30 Frontage', 'Redevelopment Potential'],
    imageUrl: '/property-imagery/sherborne-house/cover.jpg',
    images: [
      '/property-imagery/sherborne-house/cover.jpg',
      '/property-imagery/sherborne-house/01.jpg',
      '/property-imagery/sherborne-house/02.jpg',
      '/property-imagery/sherborne-house/03.jpg',
      '/property-imagery/sherborne-house/aerial.jpg'
    ],
    available: true,
    coordinates: { lat: 50.9407, lng: -2.6136 }
  },
  {
    id: '5',
    title: 'Coldharbour Lane, Salisbury',
    location: 'Coldharbour Lane, SP2 7BW',
    city: 'salisbury',
    availability: 'Approx. 1.5 acres available',
    totalSiteArea: 'Approx. 2.12 acres',
    description: 'Secure commercial land suitable for vehicle parking, with flexible space availability. Part of the site is currently let, with remaining space available immediately.',
    features: [
      'Approx. 1.5 acres available',
      'Capacity for approx. 65,000 sq ft parking use',
      'Minimum space from 0.25 acres (approx. 50 vehicles)',
      'Flexible plot sizes',
      'Established commercial location'
    ],
    use: 'Car parking and vehicle storage.',
    price: 'From £1 per car per day',
    tags: ['1.5 Acres', 'Vehicle Parking', '65k sq ft Capacity'],
    imageUrl: '/property-imagery/coldharbour-lane/cover.jpg',
    images: [
      '/property-imagery/coldharbour-lane/cover.jpg',
      '/property-imagery/coldharbour-lane/01.jpg',
      '/property-imagery/coldharbour-lane/02.jpg',
      '/property-imagery/coldharbour-lane/03.jpg',
      '/property-imagery/coldharbour-lane/aerial.jpg'
    ],
    available: true,
    coordinates: { lat: 51.0741, lng: -1.7996 }
  },
  {
    id: '6',
    title: 'Byfleet Train Station Site',
    location: 'Near Byfleet Train Station',
    city: 'byfleet',
    availability: 'Whole or part-site available',
    description: 'Roadside commercial site available as a whole or in sections, offering flexible opportunities for parking and EV infrastructure.',
    features: [
      'Whole site or part-site availability',
      'Roadside location',
      'Suitable for parking use',
      'Potential for EV charging installation'
    ],
    use: 'Vehicle parking, EV charging, and roadside commercial use.',
    price: 'Price on application',
    tags: ['EV Charging', 'Roadside', 'Flexible Plot'],
    imageUrl: '/property-imagery/byfleet/cover.jpg',
    images: [
      '/property-imagery/byfleet/cover.jpg',
      '/property-imagery/byfleet/01.jpg',
      '/property-imagery/byfleet/02.jpg',
      '/property-imagery/byfleet/03.jpg',
      '/property-imagery/byfleet/04.jpg',
      '/property-imagery/byfleet/aerial.jpg'
    ],
    available: true,
    coordinates: { lat: 51.3444, lng: -0.4796 }
  }
];

export const SYSTEM_INSTRUCTION_CONCIERGE = `
You are the "Landco Site Manager AI". You are an expert in commercial land leasing, open storage, and site management.
Your tone is professional, authoritative, yet helpful. You speak like a high-end concierge for business operators.
You represent Landco, a UK commercial land specialist.

Key selling points:
- Flexible lease terms from 12 months
- Secure, gated sites with CCTV
- Open storage, parking, and logistics yard use
- Sites available from small plots to 80,000 sq ft+
- Locations across Hampshire, Somerset, Wiltshire, and Surrey

Current available sites:
- 407 Millbrook Road, Southampton: Approx. 8,200 sq ft – Price on application
- Portsdown Main, James Callaghan Drive: 4,000 – 80,000 sq ft – From £3 per sq ft
- Sentry House, Antelope Park, Bursledon Road SO19: Internal from 2,000 sq ft, External from 4,000 sq ft
- Sherborne House, Babylon Hill, Yeovil: Approx. 1.3 acres – Price on application
- Coldharbour Lane, Salisbury SP2: Approx. 1.5 acres – From £1 per car per day
- Byfleet Train Station Site: Whole or part-site – Price on application

Answer questions about site sizes, lease terms, permitted uses, and availability.
Keep responses concise and business-focused. Maximum 2-3 sentences per response.
`;

export const HERO_STATS = [
  { value: 6, label: 'Active Sites', suffix: '' },
  { value: 80000, label: 'Max Sq Ft Available', suffix: '+' },
  { value: 4, label: 'Counties Covered', suffix: '' },
  { value: 24, label: 'Hour Access', suffix: '/7' }
];
