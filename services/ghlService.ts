/**
 * GoHighLevel CRM Integration Service
 * Server-side only - use via API routes
 * 
 * This service handles pushing leads and contacts to GHL
 */

// GHL API configuration
const GHL_API_BASE = 'https://services.leadconnectorhq.com';

export interface GHLContactData {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  companyName?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, string>;
}

export interface GHLLeadData extends GHLContactData {
  // Property/Enquiry specific
  propertyId?: string;
  propertyName?: string;
  storageType?: string;
  spaceRequired?: number;
  timeline?: string;
  preferredLocation?: string;
  
  // Land submission specific
  propertyAddress?: string;
  postcode?: string;
  landSize?: string;
  landType?: string;
  askingPrice?: string;
  interestedInLeaseback?: boolean;
}

export interface GHLResponse {
  success: boolean;
  contactId?: string;
  error?: string;
}

/**
 * Create or update a contact in GHL
 * This should be called from server-side API routes only
 */
export async function createGHLContact(
  data: GHLLeadData,
  apiKey: string,
  locationId: string
): Promise<GHLResponse> {
  try {
    // Split name into first/last if only full name provided
    let firstName = data.firstName || '';
    let lastName = data.lastName || '';
    
    if (!firstName && !lastName && data.name) {
      const nameParts = data.name.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }

    // Build custom fields
    const customFields: Record<string, string> = {
      ...data.customFields,
    };

    // Add lead-specific fields
    if (data.propertyId) customFields.property_id = data.propertyId;
    if (data.propertyName) customFields.property_name = data.propertyName;
    if (data.storageType) customFields.storage_type = data.storageType;
    if (data.spaceRequired) customFields.space_required = `${data.spaceRequired} sq ft`;
    if (data.timeline) customFields.timeline = data.timeline;
    if (data.preferredLocation) customFields.preferred_location = data.preferredLocation;
    
    // Land submission fields
    if (data.propertyAddress) customFields.property_address = data.propertyAddress;
    if (data.postcode) customFields.postcode = data.postcode;
    if (data.landSize) customFields.land_size = data.landSize;
    if (data.landType) customFields.land_type = data.landType;
    if (data.askingPrice) customFields.asking_price = data.askingPrice;
    if (data.interestedInLeaseback !== undefined) {
      customFields.interested_in_leaseback = data.interestedInLeaseback ? 'Yes' : 'No';
    }

    const payload = {
      email: data.email,
      phone: data.phone || '',
      firstName,
      lastName,
      companyName: data.companyName || '',
      source: data.source || 'Website',
      tags: data.tags || ['Website Lead'],
      customField: customFields,
      locationId,
    };

    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GHL API Error:', errorData);
      return {
        success: false,
        error: errorData.message || `GHL API error (${response.status})`,
      };
    }

    const result = await response.json();
    
    return {
      success: true,
      contactId: result.contact?.id,
    };
  } catch (error) {
    console.error('GHL Service Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create contact',
    };
  }
}

/**
 * Trigger a workflow/automation in GHL
 */
export async function triggerGHLWorkflow(
  contactId: string,
  workflowId: string,
  apiKey: string,
  locationId: string
): Promise<GHLResponse> {
  try {
    const response = await fetch(
      `${GHL_API_BASE}/contacts/${contactId}/workflow/${workflowId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify({ locationId }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || 'Failed to trigger workflow',
      };
    }

    return { success: true, contactId };
  } catch (error) {
    console.error('GHL Workflow Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to trigger workflow',
    };
  }
}

/**
 * Add a note to a contact
 */
export async function addGHLContactNote(
  contactId: string,
  note: string,
  apiKey: string
): Promise<GHLResponse> {
  try {
    const response = await fetch(
      `${GHL_API_BASE}/contacts/${contactId}/notes`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify({ body: note }),
      }
    );

    if (!response.ok) {
      return { success: false, error: 'Failed to add note' };
    }

    return { success: true, contactId };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add note',
    };
  }
}

/**
 * Update contact tags
 */
export async function updateGHLContactTags(
  contactId: string,
  tags: string[],
  apiKey: string
): Promise<GHLResponse> {
  try {
    const response = await fetch(
      `${GHL_API_BASE}/contacts/${contactId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify({ tags }),
      }
    );

    if (!response.ok) {
      return { success: false, error: 'Failed to update tags' };
    }

    return { success: true, contactId };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update tags',
    };
  }
}

/**
 * Find contact by email
 */
export async function findGHLContactByEmail(
  email: string,
  apiKey: string,
  locationId: string
): Promise<{ contactId: string | null; error?: string }> {
  try {
    const response = await fetch(
      `${GHL_API_BASE}/contacts/search/duplicate?locationId=${locationId}&email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
      }
    );

    if (!response.ok) {
      return { contactId: null, error: 'Search failed' };
    }

    const result = await response.json();
    return { contactId: result.contact?.id || null };
  } catch (error) {
    return { contactId: null, error: 'Search failed' };
  }
}


