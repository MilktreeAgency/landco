import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  noIndex?: boolean;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
}

const BASE_URL = 'https://landco.co.uk';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = 'Landco';

/**
 * Custom hook to set dynamic SEO meta tags per page
 * Updates document title and meta tags on mount
 */
export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    // Set document title
    document.title = config.title;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      
      if (element) {
        element.setAttribute('href', href);
      } else {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        element.setAttribute('href', href);
        document.head.appendChild(element);
      }
    };

    // Set meta description
    setMetaTag('description', config.description);
    setMetaTag('title', config.title);

    // Set robots
    if (config.noIndex) {
      setMetaTag('robots', 'noindex, nofollow');
    } else {
      setMetaTag('robots', 'index, follow');
    }

    // Set keywords if provided
    if (config.keywords && config.keywords.length > 0) {
      setMetaTag('keywords', config.keywords.join(', '));
    }

    // Set canonical URL
    const canonicalUrl = config.canonicalPath 
      ? `${BASE_URL}${config.canonicalPath}`
      : BASE_URL;
    setLinkTag('canonical', canonicalUrl);

    // Open Graph tags
    setMetaTag('og:title', config.title, true);
    setMetaTag('og:description', config.description, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', config.ogImage || DEFAULT_OG_IMAGE, true);
    setMetaTag('og:type', config.ogType || 'website', true);
    setMetaTag('og:site_name', SITE_NAME, true);

    // Twitter Card tags
    setMetaTag('twitter:title', config.title);
    setMetaTag('twitter:description', config.description);
    setMetaTag('twitter:url', canonicalUrl);
    setMetaTag('twitter:image', config.ogImage || DEFAULT_OG_IMAGE);

    // Cleanup function - reset to defaults when unmounting
    return () => {
      document.title = 'Yards to Rent | Industrial Land & Open Storage | Landco';
    };
  }, [config.title, config.description, config.canonicalPath, config.noIndex, config.ogImage, config.ogType, config.keywords]);
};

/**
 * Pre-defined SEO configurations for each page
 */
export const SEO_CONFIG = {
  home: {
    title: 'Yards to Rent | Industrial Land & Open Storage | Landco',
    description: 'Secure industrial yards and open storage to rent across South England. Southampton, Portsmouth, Fareham, Basingstoke. Flexible terms, 24/7 access, no business rates.',
    canonicalPath: '/',
    keywords: ['yards to rent', 'industrial land', 'open storage', 'hardstanding', 'HGV parking', 'container storage', 'Southampton', 'Hampshire']
  },
  
  search: {
    title: 'Find a Yard | Search Industrial Land to Rent | Landco',
    description: 'Search available industrial yards, hardstanding, and open storage across South England. Filter by size, location, and features. Instant availability.',
    canonicalPath: '/#/search',
    keywords: ['find a yard', 'search industrial land', 'available yards', 'storage search', 'industrial property search']
  },
  
  sellYourLand: {
    title: 'Sell Your Land | We Buy Industrial Sites | Landco',
    description: 'Sell your industrial land to Landco. Competitive cash offers within 48 hours. Sale and leaseback available. Complete in as little as 14 days.',
    canonicalPath: '/#/sell-your-land',
    keywords: ['sell industrial land', 'sell my yard', 'land buyers UK', 'sale and leaseback', 'sell commercial land']
  },
  
  dashboard: {
    title: 'Tenant Portal | Landco',
    description: 'Access your Landco tenant portal. Manage your yard, view invoices, and request support.',
    canonicalPath: '/#/dashboard',
    noIndex: true
  },
  
  // City Hub SEO configs
  cityHub: (cityName: string, region: string) => ({
    title: `Yards to Rent in ${cityName} | Secure Industrial Land | Landco`,
    description: `Industrial yards and open storage to rent in ${cityName}, ${region}. Secure hardstanding, HGV parking, container storage. Flexible terms, 24/7 access, no business rates.`,
    canonicalPath: `/#/yards-to-rent-${cityName.toLowerCase()}`,
    keywords: [
      `yards to rent ${cityName}`,
      `industrial land ${cityName}`,
      `open storage ${cityName}`,
      `hardstanding ${cityName}`,
      `HGV parking ${cityName}`,
      `container storage ${cityName}`,
      region
    ]
  }),
  
  // Property detail SEO config
  property: (propertyTitle: string, city: string, sqFt: number) => ({
    title: `${propertyTitle} | ${sqFt.toLocaleString()} sq ft | Landco`,
    description: `${propertyTitle} - ${sqFt.toLocaleString()} sq ft industrial yard to rent in ${city}. Secure hardstanding with 24/7 access. View details and enquire online.`,
    canonicalPath: `/#/property/${propertyTitle.toLowerCase().replace(/\s+/g, '-')}`,
    ogType: 'product',
    keywords: [`${city} yard`, 'industrial land to rent', propertyTitle]
  })
};

export default useSEO;

