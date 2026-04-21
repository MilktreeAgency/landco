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
    title: 'Land that Works | Yards & Open Storage to Rent | Landco',
    description: 'Yards, hardstanding and open storage land to rent across South England. Move in same day, no solicitor fees, flexible terms. Landco — land that works.',
    canonicalPath: '/',
    keywords: ['yards to rent', 'industrial land', 'open storage', 'hardstanding', 'HGV parking', 'container storage', 'Southampton', 'Hampshire']
  },

  sites: {
    title: 'Available Sites | Yards & Open Storage to Rent | Landco',
    description: 'Browse available yards, hardstanding and open storage land across South England. Each site can be inspected and reserved in days, not months.',
    canonicalPath: '/#/sites',
    keywords: ['available yards', 'sites to rent', 'commercial land available', 'open storage availability']
  },

  permittedUses: {
    title: 'Permitted Uses | What Our Sites Are For | Landco',
    description: 'Vehicle storage, plant & machinery, container storage, trade compounds, vehicle sales — see what you can do with our yards and open storage land.',
    canonicalPath: '/#/permitted-uses',
    keywords: ['yard permitted uses', 'open storage uses', 'commercial land uses', 'HGV storage', 'plant storage']
  },

  termsAndCosts: {
    title: 'Terms & Costs | Simple Licence Agreements | Landco',
    description: 'Modern licence agreements — no solicitor fees, no long lock-ins, no hidden costs. See how Landco compares to a traditional commercial lease.',
    canonicalPath: '/#/terms-and-costs',
    keywords: ['licence vs lease', 'commercial land terms', 'open storage licence', 'no solicitor fees']
  },

  locations: {
    title: 'Locations | Yards Across South England | Landco',
    description: 'Landco operates yards and open storage sites across Hampshire, Wiltshire, Somerset and Surrey. Browse every location.',
    canonicalPath: '/#/locations',
    keywords: ['yard locations', 'south england commercial land', 'Hampshire yards', 'Wiltshire yards']
  },

  about: {
    title: 'About Landco | Land That Works | Landco',
    description: 'Landco owns and operates yards, hardstanding and open storage across South England — built around how operators actually want to work.',
    canonicalPath: '/#/about',
    keywords: ['about landco', 'landco company', 'commercial land specialist UK']
  },

  enquire: {
    title: 'Enquire | Get in Touch with Landco',
    description: 'Send Landco an enquiry about yards, open storage or land for sale. We respond the same working day.',
    canonicalPath: '/#/enquire',
    keywords: ['contact landco', 'enquire yards', 'commercial land enquiry']
  },

  landWanted: {
    title: 'Land Wanted | We Buy Yards & Commercial Land | Landco',
    description: 'Landco is actively buying yards, hardstanding and commercial land across South England. Cash offers in 48 hours. Sale-and-leaseback available.',
    canonicalPath: '/#/land-wanted',
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
  property: (propertyTitle: string, location: string) => ({
    title: `${propertyTitle} | Landco`,
    description: `${propertyTitle} – commercial land and open storage available at ${location}. View details and enquire online.`,
    canonicalPath: `/#/property/${propertyTitle.toLowerCase().replace(/\s+/g, '-')}`,
    ogType: 'product',
    keywords: ['commercial land to rent', 'open storage', propertyTitle, location]
  })
};

export default useSEO;





