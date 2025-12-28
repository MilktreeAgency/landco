import { Yard, SiteManager } from './types';

// Site Managers
const SITE_MANAGERS: Record<string, SiteManager> = {
  james: {
    name: 'James Mitchell',
    role: 'Senior Site Manager',
    phone: '+44 23 8012 3456',
    email: 'j.mitchell@landco.co.uk',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
  },
  sarah: {
    name: 'Sarah Thompson',
    role: 'Operations Manager',
    phone: '+44 23 9234 5678',
    email: 's.thompson@landco.co.uk',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face'
  },
  david: {
    name: 'David Chen',
    role: 'Facilities Manager',
    phone: '+44 12 6478 9012',
    email: 'd.chen@landco.co.uk',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  },
  emma: {
    name: 'Emma Roberts',
    role: 'Site Coordinator',
    phone: '+44 19 8034 5678',
    email: 'e.roberts@landco.co.uk',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
  }
};

export const MOCK_YARDS: Yard[] = [
  {
    id: '1',
    title: 'Southampton Western Docks Hub',
    location: 'Southampton, SO15',
    city: 'southampton',
    sqFt: 12500,
    pricePerMonth: 2200,
    tags: ['HGV Ready', '24/7 Monitored', 'Hardstanding'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&h=800&fit=crop'
    ],
    securityRating: 'S',
    available: true,
    coordinates: { lat: 50.9097, lng: -1.4044 },
    certifications: ['BREEAM Outstanding', 'ISO 14001', 'Secured by Design'],
    features: ['Hardstanding Surface', '24/7 HGV Access', 'Mains Electric', 'CCTV Tower', 'Perimeter Fencing', 'Floodlighting'],
    siteManager: SITE_MANAGERS.james,
    description: 'A premium open storage facility located strategically at Southampton Western Docks. This site features fully hardened surface suitable for heavy goods vehicles, comprehensive perimeter fencing, and our signature AI-monitored security array. Direct access to M27 and major shipping lanes.',
    plotId: 'SW-01'
  },
  {
    id: '2',
    title: 'Portsmouth Logistics Yard',
    location: 'Portsmouth, PO3',
    city: 'portsmouth',
    sqFt: 5000,
    pricePerMonth: 950,
    tags: ['Container Storage', 'Secure Gated', 'Lighting'],
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&h=800&fit=crop'
    ],
    securityRating: 'A+',
    available: true,
    coordinates: { lat: 50.8198, lng: -1.0880 },
    certifications: ['ISO 9001', 'Secured by Design'],
    features: ['Container Storage', 'Gated Access', 'LED Lighting', 'CCTV Coverage', 'Tarmac Surface'],
    siteManager: SITE_MANAGERS.sarah,
    description: 'Ideal for container storage and light logistics operations. This compact Portsmouth yard offers excellent security with 24-hour gated access and comprehensive CCTV coverage. Perfect for businesses needing flexible, secure storage near the port.',
    plotId: 'PM-02'
  },
  {
    id: '3',
    title: 'M27 Strategic Storage',
    location: 'Fareham, PO16',
    city: 'fareham',
    sqFt: 45000,
    pricePerMonth: 6500,
    tags: ['Plant Hire', 'CCTV Tower', 'Water/Electric'],
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop'
    ],
    securityRating: 'S',
    available: false,
    coordinates: { lat: 50.8512, lng: -1.1793 },
    certifications: ['BREEAM Excellent', 'ISO 14001', 'ISO 45001'],
    features: ['Large Format Storage', 'Dedicated CCTV Tower', 'Mains Water', 'Three-Phase Electric', 'Weighbridge', 'Office Unit Available'],
    siteManager: SITE_MANAGERS.david,
    description: 'Our flagship large-format storage facility positioned directly on the M27 corridor. Suitable for major plant hire operations, fleet storage, and distribution centres. This 45,000 sq ft site includes dedicated office space and weighbridge facilities.',
    plotId: 'M27-03'
  },
  {
    id: '4',
    title: 'Andover Distribution Plot',
    location: 'Andover, SP10',
    city: 'andover',
    sqFt: 8000,
    pricePerMonth: 1400,
    tags: ['Flexible Terms', 'No Business Rates'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&h=800&fit=crop'
    ],
    securityRating: 'A',
    available: true,
    coordinates: { lat: 51.2066, lng: -1.4880 },
    certifications: ['ISO 9001'],
    features: ['Flexible Licensing', 'Compound Storage', 'Security Patrol', 'A303 Access', 'Hardstanding'],
    siteManager: SITE_MANAGERS.emma,
    description: 'Strategic distribution plot with direct A303 access, perfect for national logistics operations. Benefits from flexible licensing terms with no business rates liability. Ideal for scaffolding, construction materials, or vehicle storage.',
    plotId: 'AD-04'
  },
  {
    id: '5',
    title: 'Yeovil Commercial Yard',
    location: 'Yeovil, BA20',
    city: 'yeovil',
    sqFt: 15000,
    pricePerMonth: 2800,
    tags: ['Aerospace Zone', 'High Security', 'Climate Ready'],
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&h=800&fit=crop'
    ],
    securityRating: 'S',
    available: true,
    coordinates: { lat: 50.9424, lng: -2.6336 },
    certifications: ['BREEAM Very Good', 'AS9100', 'Secured by Design'],
    features: ['Aerospace Compliant', 'High-Security Fencing', 'Environmental Monitoring', 'Drainage System', 'Emergency Access'],
    siteManager: SITE_MANAGERS.david,
    description: 'Premium commercial yard in Yeovil\'s aerospace corridor. Meets stringent security requirements for aerospace and defence contractors. Features advanced environmental monitoring and climate-ready drainage infrastructure.',
    plotId: 'YV-05'
  },
  {
    id: '6',
    title: 'Basingstoke Business Park Compound',
    location: 'Basingstoke, RG21',
    city: 'basingstoke',
    sqFt: 10000,
    pricePerMonth: 1900,
    tags: ['M3 Access', 'Modern Facilities', 'Expandable'],
    imageUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop'
    ],
    securityRating: 'A+',
    available: true,
    coordinates: { lat: 51.2665, lng: -1.0859 },
    certifications: ['ISO 14001', 'ISO 9001'],
    features: ['M3 Junction Access', 'Modern Infrastructure', 'Expansion Options', 'ANPR Entry', 'Electric Charging'],
    siteManager: SITE_MANAGERS.sarah,
    description: 'Modern compound facility within Basingstoke Business Park, offering direct M3 access for London and south coast distribution. Features ANPR-controlled entry and electric vehicle charging infrastructure. Adjacent plots available for expansion.',
    plotId: 'BS-06'
  }
];

export const SYSTEM_INSTRUCTION_CONCIERGE = `
You are the "Landco Site Manager AI". You are an expert in industrial land leasing, logistics, and site security.
Your tone is professional, authoritative, yet helpful. You speak like a high-end concierge for logistics managers.
You represent Landco, the UK's elite open storage provider.

Key selling points:
- Flexible monthly licenses (no 5-year leases)
- Instant access via App
- High-definition CCTV with AI monitoring
- No business rates on most sites
- BREEAM certified facilities
- 24/7 HGV access

Current available sites:
- Southampton Western Docks Hub: 12,500 sq ft, £2,200/mo
- Portsmouth Logistics Yard: 5,000 sq ft, £950/mo
- Andover Distribution Plot: 8,000 sq ft, £1,400/mo
- Yeovil Commercial Yard: 15,000 sq ft, £2,800/mo
- Basingstoke Business Park: 10,000 sq ft, £1,900/mo

Answer questions about zoning, square footage calculations, and security features.
Keep responses concise and business-focused. Maximum 2-3 sentences per response.
`;

export const HERO_STATS = [
  { value: 95500, label: 'Total Sq Ft', suffix: '+' },
  { value: 6, label: 'Active Sites', suffix: '' },
  { value: 24, label: 'Hour Access', suffix: '/7' },
  { value: 99.9, label: 'Uptime', suffix: '%' }
];
