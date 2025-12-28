import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createGHLContact, type GHLLeadData } from '../services/ghlService';

/**
 * API Route: Push Lead to GoHighLevel
 * 
 * This endpoint can be called:
 * 1. Directly from the frontend after form submission
 * 2. From Formspree webhook
 * 3. From other automation systems
 */

interface LeadRequestBody {
  // Required
  email: string;
  
  // Contact info
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  companyName?: string;
  
  // Lead source
  source?: string;
  formType?: 'lead_qualifier' | 'land_submission' | 'quick_contact' | 'general';
  
  // Lead qualifier specific
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
  
  // Tags
  tags?: string[];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate GHL is configured
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error('GHL not configured');
    return res.status(500).json({ error: 'CRM system not configured' });
  }

  try {
    const body = req.body as LeadRequestBody;

    // Validate required fields
    if (!body.email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Build tags based on form type
    const tags: string[] = body.tags || [];
    
    switch (body.formType) {
      case 'lead_qualifier':
        tags.push('Website Lead', 'Lead Qualifier');
        if (body.timeline === 'immediate') {
          tags.push('Hot Lead');
        }
        break;
      case 'land_submission':
        tags.push('Land Seller', 'Acquisition Lead');
        if (body.interestedInLeaseback) {
          tags.push('Leaseback Interest');
        }
        break;
      case 'quick_contact':
        tags.push('Quick Enquiry', 'Land Seller');
        break;
      default:
        tags.push('Website Lead');
    }

    // Build GHL lead data
    const leadData: GHLLeadData = {
      email: body.email,
      phone: body.phone,
      name: body.name,
      firstName: body.firstName,
      lastName: body.lastName,
      companyName: body.companyName,
      source: body.source || 'Landco Website',
      tags,
      
      // Lead qualifier fields
      storageType: body.storageType,
      spaceRequired: body.spaceRequired,
      timeline: body.timeline,
      preferredLocation: body.preferredLocation,
      
      // Land submission fields
      propertyAddress: body.propertyAddress,
      postcode: body.postcode,
      landSize: body.landSize,
      landType: body.landType,
      askingPrice: body.askingPrice,
      interestedInLeaseback: body.interestedInLeaseback,
    };

    // Push to GHL
    const result = await createGHLContact(leadData, apiKey, locationId);

    if (!result.success) {
      console.error('GHL push failed:', result.error);
      return res.status(500).json({ 
        error: result.error || 'Failed to create contact in CRM' 
      });
    }

    return res.status(200).json({
      success: true,
      contactId: result.contactId,
      message: 'Lead successfully pushed to CRM',
    });

  } catch (error) {
    console.error('Lead push error:', error);
    return res.status(500).json({ error: 'Failed to process lead' });
  }
}

