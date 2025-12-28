/**
 * Formspree Integration Service
 * Handles form submissions to Formspree with proper error handling
 */

// Form IDs from environment variables (VITE_ prefix for client-side access)
const LEAD_FORM_ID = import.meta.env.VITE_FORMSPREE_LEAD_FORM_ID || '';
const LAND_FORM_ID = import.meta.env.VITE_FORMSPREE_LAND_FORM_ID || '';

export interface FormspreeResponse {
  ok: boolean;
  error?: string;
}

export interface LeadFormData {
  storageType: string;
  size: number;
  timeline: string;
  location: string;
  email: string;
  source?: string;
}

export interface LandSubmissionData {
  // Property Details
  address: string;
  postcode: string;
  landSize: string;
  landType: string;
  currentUse: string;
  hasPlanning: string;
  
  // Owner Details
  ownerName: string;
  email: string;
  phone: string;
  companyName: string;
  
  // Sale Preferences
  askingPrice: string;
  timeframe: string;
  rentBack: boolean;
  rentBackTerms: string;
  
  // Additional
  description: string;
  hasPhotos: boolean;
}

/**
 * Submit form data to Formspree
 */
async function submitToFormspree(
  formId: string, 
  data: Record<string, unknown>
): Promise<FormspreeResponse> {
  // If no form ID is configured, use mock mode
  if (!formId) {
    console.warn('Formspree form ID not configured. Running in mock mode.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { ok: true };
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        _subject: `New ${data._formType || 'Form'} Submission - Landco`,
        _timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        ok: false,
        error: errorData.error || `Submission failed (${response.status})`,
      };
    }

    return { ok: true };
  } catch (error) {
    console.error('Formspree submission error:', error);
    return {
      ok: false,
      error: 'Network error. Please try again.',
    };
  }
}

/**
 * Submit lead qualifier form (homepage wizard)
 */
export async function submitLeadForm(data: LeadFormData): Promise<FormspreeResponse> {
  return submitToFormspree(LEAD_FORM_ID, {
    _formType: 'Lead Qualifier',
    storage_type: data.storageType,
    space_required_sqft: data.size,
    timeline: data.timeline,
    preferred_location: data.location || 'Any',
    email: data.email,
    source: data.source || 'Website Lead Qualifier',
  });
}

/**
 * Submit land sale enquiry form
 */
export async function submitLandForm(data: LandSubmissionData): Promise<FormspreeResponse> {
  return submitToFormspree(LAND_FORM_ID, {
    _formType: 'Land Submission',
    // Property Details
    property_address: data.address,
    postcode: data.postcode,
    land_size_sqft: data.landSize,
    land_type: data.landType,
    current_use: data.currentUse,
    planning_permission: data.hasPlanning,
    // Owner Details
    owner_name: data.ownerName,
    email: data.email,
    phone: data.phone,
    company_name: data.companyName || 'N/A',
    // Sale Preferences
    asking_price: data.askingPrice || 'Valuation requested',
    sale_timeframe: data.timeframe,
    interested_in_leaseback: data.rentBack ? 'Yes' : 'No',
    leaseback_terms: data.rentBackTerms || 'N/A',
    // Additional
    description: data.description || 'No additional notes',
    has_photos_documents: data.hasPhotos ? 'Yes' : 'No',
    source: 'Sell Your Land Page',
  });
}

/**
 * Submit quick contact form (hero section sidebar)
 */
export async function submitQuickContact(data: {
  postcode: string;
  landSize: string;
  email: string;
  interestedInLeaseback: boolean;
}): Promise<FormspreeResponse> {
  return submitToFormspree(LAND_FORM_ID, {
    _formType: 'Quick Land Enquiry',
    postcode: data.postcode,
    approx_land_size: data.landSize,
    email: data.email,
    interested_in_leaseback: data.interestedInLeaseback ? 'Yes' : 'No',
    source: 'Sell Your Land - Quick Contact',
  });
}

