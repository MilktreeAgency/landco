import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { 
  createGHLContact, 
  addGHLContactNote, 
  updateGHLContactTags,
  findGHLContactByEmail 
} from '../services/ghlService';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

/**
 * Stripe Webhook Handler
 * 
 * Processes Stripe events and syncs with GHL:
 * - checkout.session.completed: Mark payment received, update contact
 * - payment_intent.succeeded: Backup handler
 * - checkout.session.expired: Handle abandoned checkouts
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate Stripe is configured
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not configured');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  // Require webhook secret in production for security
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured - rejecting webhook');
    return res.status(500).json({ error: 'Webhook not configured securely' });
  }

  if (!sig) {
    console.error('Missing stripe-signature header');
    return res.status(400).json({ error: 'Missing signature header' });
  }

  try {
    // Get raw body for signature verification
    const rawBody = typeof req.body === 'string' 
      ? req.body 
      : JSON.stringify(req.body);

    // Always verify signature - never skip in production
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ 
      error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` 
    });
  }

  // GHL configuration
  const ghlApiKey = process.env.GHL_API_KEY;
  const ghlLocationId = process.env.GHL_LOCATION_ID;
  const ghlConfigured = !!(ghlApiKey && ghlLocationId);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log('Checkout completed:', {
          sessionId: session.id,
          customerEmail: session.customer_email,
          paymentStatus: session.payment_status,
        });

        // Only process successful payments
        if (session.payment_status !== 'paid') {
          console.log('Payment not completed, skipping GHL sync');
          break;
        }

        const customerEmail = session.customer_email;
        const metadata = session.metadata || {};
        const propertyId = metadata.propertyId || session.client_reference_id;
        const propertyName = metadata.propertyName || 'Property';
        const customerName = metadata.customerName || '';
        const amountPaid = session.amount_total ? session.amount_total / 100 : 0;

        if (ghlConfigured && customerEmail) {
          // Try to find existing contact
          const existing = await findGHLContactByEmail(
            customerEmail, 
            ghlApiKey!, 
            ghlLocationId!
          );

          if (existing.contactId) {
            // Update existing contact with payment info
            await updateGHLContactTags(
              existing.contactId,
              ['Deposit Paid', 'Hot Lead', 'Website Lead'],
              ghlApiKey!
            );

            await addGHLContactNote(
              existing.contactId,
              `💰 DEPOSIT RECEIVED\n\nAmount: £${amountPaid.toFixed(2)}\nProperty: ${propertyName} (${propertyId})\nStripe Session: ${session.id}\nDate: ${new Date().toISOString()}`,
              ghlApiKey!
            );

            console.log('Updated existing GHL contact:', existing.contactId);
          } else {
            // Create new contact
            const result = await createGHLContact(
              {
                email: customerEmail,
                name: customerName,
                source: 'Stripe Deposit Payment',
                propertyId: propertyId || undefined,
                propertyName,
                tags: ['Deposit Paid', 'Hot Lead', 'Website Lead'],
                customFields: {
                  deposit_amount: `£${amountPaid.toFixed(2)}`,
                  deposit_date: new Date().toISOString(),
                  stripe_session_id: session.id,
                },
              },
              ghlApiKey!,
              ghlLocationId!
            );

            if (result.success && result.contactId) {
              await addGHLContactNote(
                result.contactId,
                `💰 DEPOSIT RECEIVED\n\nAmount: £${amountPaid.toFixed(2)}\nProperty: ${propertyName} (${propertyId})\nStripe Session: ${session.id}`,
                ghlApiKey!
              );
            }

            console.log('Created new GHL contact:', result.contactId);
          }
        }

        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log('Checkout expired:', session.id);

        // Optionally track abandoned checkouts in GHL
        if (ghlConfigured && session.customer_email) {
          const existing = await findGHLContactByEmail(
            session.customer_email,
            ghlApiKey!,
            ghlLocationId!
          );

          if (existing.contactId) {
            await updateGHLContactTags(
              existing.contactId,
              ['Abandoned Checkout'],
              ghlApiKey!
            );

            await addGHLContactNote(
              existing.contactId,
              `⚠️ ABANDONED CHECKOUT\n\nProperty: ${session.metadata?.propertyName || 'Unknown'}\nDate: ${new Date().toISOString()}\n\nFollow up recommended.`,
              ghlApiKey!
            );
          }
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        console.log('Payment failed:', paymentIntent.id);
        
        // Log for monitoring, GHL update would need customer lookup
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    // Return 200 to prevent Stripe retries for processing errors
    return res.status(200).json({ 
      received: true, 
      warning: 'Event received but processing had issues' 
    });
  }
}

// Disable body parsing to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

