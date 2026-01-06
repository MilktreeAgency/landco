/**
 * Stripe Payment Service
 * Handles creating checkout sessions and redirecting to Stripe
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe publishable key from environment
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  (typeof process !== 'undefined' ? process.env.STRIPE_PUBLISHABLE_KEY : '');

let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Get or initialize the Stripe instance
 */
export const getStripe = () => {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

export interface CreateCheckoutParams {
  propertyId: string;
  propertyName: string;
  customerEmail: string;
  customerName?: string;
  customAmount?: number; // Amount in pence
}

export interface CheckoutResult {
  success: boolean;
  url?: string;
  sessionId?: string;
  error?: string;
}

/**
 * Create a Stripe checkout session for a deposit payment
 */
export async function createDepositCheckout(
  params: CreateCheckoutParams
): Promise<CheckoutResult> {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to create checkout session',
      };
    }

    return {
      success: true,
      url: data.url,
      sessionId: data.sessionId,
    };
  } catch (error) {
    console.error('Checkout error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(
  params: CreateCheckoutParams
): Promise<void> {
  const result = await createDepositCheckout(params);

  if (result.success && result.url) {
    // Redirect to Stripe hosted checkout
    window.location.href = result.url;
  } else {
    throw new Error(result.error || 'Failed to create checkout');
  }
}

/**
 * Check if Stripe is configured
 */
export function isStripeConfigured(): boolean {
  return !!stripePublishableKey;
}

/**
 * Format amount from pence to pounds display
 */
export function formatAmount(amountInPence: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amountInPence / 100);
}

/**
 * Parse payment status from URL query params
 */
export function getPaymentStatusFromUrl(): {
  status: 'success' | 'cancelled' | null;
  sessionId: string | null;
} {
  const params = new URLSearchParams(window.location.search);
  const payment = params.get('payment');
  const sessionId = params.get('session_id');

  if (payment === 'success') {
    return { status: 'success', sessionId };
  } else if (payment === 'cancelled') {
    return { status: 'cancelled', sessionId: null };
  }

  return { status: null, sessionId: null };
}




