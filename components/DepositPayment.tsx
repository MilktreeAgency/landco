import React, { useState, useEffect } from 'react';
import { GlassPanel, PrimaryButton, SecondaryButton } from './ui/EliteComponents';
import { 
  CreditCard, Shield, Lock, CheckCircle, AlertCircle, 
  Loader2, ArrowRight, X, Info
} from 'lucide-react';
import { 
  redirectToCheckout, 
  isStripeConfigured, 
  formatAmount,
  getPaymentStatusFromUrl 
} from '../services/stripeService';

interface DepositPaymentProps {
  propertyId: string;
  propertyName: string;
  depositAmount?: number; // Amount in pence, defaults to £500
  onClose?: () => void;
  isModal?: boolean;
}

export const DepositPayment: React.FC<DepositPaymentProps> = ({
  propertyId,
  propertyName,
  depositAmount = 50000, // £500 default
  onClose,
  isModal = false,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePayment = async () => {
    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await redirectToCheckout({
        propertyId,
        propertyName,
        customerEmail: email,
        customerName: name,
        customAmount: depositAmount,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  const stripeConfigured = isStripeConfigured();

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        {isModal && onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="w-16 h-16 bg-landco-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-landco-dark" />
        </div>
        <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
          Secure Your Space
        </h3>
        <p className="text-slate-500">
          Pay a refundable holding deposit to reserve this property
        </p>
      </div>

      {/* Property Summary */}
      <div className="bg-slate-50 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Property</p>
            <p className="font-semibold text-slate-900">{propertyName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Holding Deposit</p>
            <p className="font-display font-bold text-2xl text-landco-dark">
              {formatAmount(depositAmount)}
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Fully Refundable</p>
          <p>Your deposit is fully refundable if you choose not to proceed within 14 days, or if the property becomes unavailable.</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            placeholder="John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
          />
          <p className="text-xs text-slate-400 mt-1">
            Receipt and confirmation will be sent here
          </p>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-5 h-5 mt-0.5 accent-landco-yellow rounded"
          />
          <label htmlFor="terms" className="text-sm text-slate-600">
            I agree to the{' '}
            <a href="#" className="text-landco-dark font-semibold hover:underline">
              deposit terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-landco-dark font-semibold hover:underline">
              privacy policy
            </a>
          </label>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Stripe Not Configured Warning */}
      {!stripeConfigured && (
        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-3 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Payment system is being configured. Please contact us directly.
        </div>
      )}

      {/* Submit Button */}
      <PrimaryButton
        onClick={handlePayment}
        disabled={isLoading || !stripeConfigured || !agreedToTerms}
        className="w-full text-lg py-4 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Connecting to Payment...
          </>
        ) : (
          <>
            Pay {formatAmount(depositAmount)} Deposit
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </PrimaryButton>

      {/* Security Badges */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Lock className="w-4 h-4" />
          SSL Secured
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Shield className="w-4 h-4" />
          PCI Compliant
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <CreditCard className="w-4 h-4" />
          Powered by Stripe
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <GlassPanel className="w-full max-w-md p-8 relative animate-scale-in">
          {content}
        </GlassPanel>
      </div>
    );
  }

  return (
    <GlassPanel className="p-8">
      {content}
    </GlassPanel>
  );
};

/**
 * Payment Success Banner - show after successful payment
 */
export const PaymentSuccessBanner: React.FC<{ onDismiss?: () => void }> = ({ onDismiss }) => {
  const [visible, setVisible] = useState(false);
  const paymentStatus = getPaymentStatusFromUrl();

  useEffect(() => {
    if (paymentStatus.status === 'success') {
      setVisible(true);
      // Clean URL
      const url = new URL(window.location.href);
      url.searchParams.delete('payment');
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-slide-up">
      <div className="bg-landco-security text-white p-4 rounded-xl shadow-xl flex items-center gap-4">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="font-bold">Payment Successful!</p>
          <p className="text-sm text-white/80">Your deposit has been received. Check your email for confirmation.</p>
        </div>
        <button 
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

/**
 * Payment Cancelled Banner
 */
export const PaymentCancelledBanner: React.FC<{ onDismiss?: () => void }> = ({ onDismiss }) => {
  const [visible, setVisible] = useState(false);
  const paymentStatus = getPaymentStatusFromUrl();

  useEffect(() => {
    if (paymentStatus.status === 'cancelled') {
      setVisible(true);
      // Clean URL
      const url = new URL(window.location.href);
      url.searchParams.delete('payment');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-slide-up">
      <div className="bg-amber-500 text-white p-4 rounded-xl shadow-xl flex items-center gap-4">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="font-bold">Payment Cancelled</p>
          <p className="text-sm text-white/80">No payment was taken. You can try again when you're ready.</p>
        </div>
        <button 
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DepositPayment;

