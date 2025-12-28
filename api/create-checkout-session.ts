import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Deposit amount in pence (default £500)
const DEPOSIT_AMOUNT = parseInt(process.env.DEPOSIT_AMOUNT || '50000', 10);

interface CheckoutRequestBody {
  propertyId: string;
  propertyName: string;
  customerEmail: string;
  customerName?: string;
  customAmount?: number; // Optional custom amount in pence
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

  // Validate Stripe key is configured
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not configured');
    return res.status(500).json({ error: 'Payment system not configured' });
  }

  try {
    const body = req.body as CheckoutRequestBody;

    // Validate required fields
    if (!body.propertyId || !body.customerEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields: propertyId, customerEmail' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.customerEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Determine amount (use custom or default)
    const amount = body.customAmount && body.customAmount > 0 
      ? body.customAmount 
      : DEPOSIT_AMOUNT;

    // Get the origin for redirect URLs
    const origin = req.headers.origin || process.env.VITE_SITE_URL || 'https://landco.co.uk';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: body.customerEmail,
      client_reference_id: body.propertyId,
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `Holding Deposit - ${body.propertyName || 'Landco Property'}`,
              description: `Refundable holding deposit for ${body.propertyName || 'property'} (ID: ${body.propertyId})`,
              images: ['https://landco.co.uk/landco-logo.png'],
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        propertyId: body.propertyId,
        propertyName: body.propertyName || '',
        customerName: body.customerName || '',
        type: 'holding_deposit',
      },
      success_url: `${origin}/#/property/${body.propertyId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#/property/${body.propertyId}?payment=cancelled`,
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    });

    // Return the checkout URL
    return res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return res.status(400).json({ 
        error: error.message 
      });
    }

    return res.status(500).json({ 
      error: 'Failed to create checkout session' 
    });
  }
}

