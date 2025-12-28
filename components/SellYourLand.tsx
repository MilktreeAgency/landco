import React, { useState } from 'react';
import { GlassPanel, PrimaryButton, SecondaryButton, AnimatedCounter } from './ui/EliteComponents';
import { 
  MapPin, Phone, Mail, Upload, CheckCircle, ArrowRight, 
  Banknote, Handshake, Clock, Shield, Building2, TrendingUp,
  FileText, Camera, Ruler, Users, Zap, ChevronDown, ChevronRight,
  Loader2, Check
} from 'lucide-react';

interface LandSubmission {
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

const initialFormState: LandSubmission = {
  address: '',
  postcode: '',
  landSize: '',
  landType: '',
  currentUse: '',
  hasPlanning: '',
  ownerName: '',
  email: '',
  phone: '',
  companyName: '',
  askingPrice: '',
  timeframe: '',
  rentBack: false,
  rentBackTerms: '',
  description: '',
  hasPhotos: false
};

export const SellYourLand = () => {
  const [formData, setFormData] = useState<LandSubmission>(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const steps = [
    { title: 'Property Details', icon: <MapPin className="w-5 h-5" /> },
    { title: 'Your Details', icon: <Users className="w-5 h-5" /> },
    { title: 'Sale Preferences', icon: <Banknote className="w-5 h-5" /> },
    { title: 'Additional Info', icon: <FileText className="w-5 h-5" /> }
  ];

  const updateField = (field: keyof LandSubmission, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(formData.address && formData.postcode && formData.landSize && formData.landType);
      case 1:
        return !!(formData.ownerName && formData.email && isValidEmail(formData.email) && formData.phone);
      case 2:
        return true; // Sale preferences are optional
      case 3:
        return true; // Additional info is optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const benefits = [
    {
      icon: <Banknote className="w-8 h-8" />,
      title: 'Competitive Cash Offers',
      description: 'Receive a fair market valuation within 48 hours. We purchase outright with no hidden fees.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Fast Completion',
      description: 'Complete sales in as little as 14 days. No lengthy chains or financing delays.'
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: 'Sale & Leaseback',
      description: 'Sell your land and rent it back immediately. Unlock capital while maintaining operations.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Discreet Process',
      description: 'Confidential negotiations. Your business operations remain undisturbed throughout.'
    }
  ];

  const stats = [
    { value: 15, suffix: 'M+', label: 'Land Acquired (£)' },
    { value: 47, suffix: '', label: 'Sites Purchased' },
    { value: 14, suffix: ' Days', label: 'Avg. Completion' },
    { value: 92, suffix: '%', label: 'Offer Acceptance' }
  ];

  const faqs = [
    {
      q: 'What types of land do you purchase?',
      a: 'We acquire industrial land, hardstanding yards, open storage compounds, and development sites. We\'re particularly interested in sites with existing planning permission or established commercial use.'
    },
    {
      q: 'How does sale and leaseback work?',
      a: 'You sell your land to Landco and we immediately lease it back to you on flexible terms. You receive the capital from the sale while continuing to operate from the same location. This unlocks equity without disrupting your business.'
    },
    {
      q: 'How quickly can you complete a purchase?',
      a: 'We can complete purchases in as little as 14 days for straightforward transactions. Complex sites with planning considerations may take 4-8 weeks. We\'ll provide a timeline during our initial assessment.'
    },
    {
      q: 'Do you charge any fees?',
      a: 'No. Landco covers all acquisition costs including surveys, legal fees, and stamp duty. The price we offer is the price you receive.'
    },
    {
      q: 'What happens after I submit my details?',
      a: 'Our acquisitions team will review your submission within 24 hours. If your site meets our criteria, we\'ll arrange a site visit and provide a formal offer within 48 hours of inspection.'
    },
    {
      q: 'Can I sell just part of my land?',
      a: 'Yes, we consider partial acquisitions. This can be an excellent way to release capital while retaining operational space. We\'ll discuss options during our initial consultation.'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <GlassPanel className="p-12 animate-scale-in">
            <div className="w-20 h-20 bg-landco-security/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-landco-security" />
            </div>
            <h1 className="font-display font-bold text-3xl text-slate-900 mb-4">
              Submission Received
            </h1>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Thank you for your interest in selling to Landco. Our acquisitions team will review your submission and contact you within 24 hours.
            </p>
            
            <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-bold text-slate-900 mb-4">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-landco-yellow flex items-center justify-center text-landco-dark font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-slate-900">Initial Review (24 hours)</p>
                    <p className="text-sm text-slate-500">Our team assesses your submission against our acquisition criteria.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-slate-900">Site Visit</p>
                    <p className="text-sm text-slate-500">If suitable, we arrange a site inspection at your convenience.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-slate-900">Formal Offer</p>
                    <p className="text-sm text-slate-500">Receive a written offer within 48 hours of our visit.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SecondaryButton onClick={() => window.location.href = '/'}>
                Return Home
              </SecondaryButton>
              <PrimaryButton onClick={() => {
                setIsSubmitted(false);
                setFormData(initialFormState);
                setCurrentStep(0);
              }}>
                Submit Another Property
              </PrimaryButton>
            </div>
          </GlassPanel>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80" 
            alt="Industrial Land"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-landco-yellow/30 bg-landco-yellow/10 text-sm text-landco-yellow font-bold mb-6">
                <TrendingUp className="w-4 h-4" /> ACTIVE LAND ACQUISITION PROGRAMME
              </span>
              
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Sell Your Land.<br />
                <span className="text-landco-yellow">Unlock Your Capital.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
                Landco is actively acquiring industrial land across the UK. Get a competitive cash offer within 48 hours, with completion in as little as 14 days.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
                <PrimaryButton 
                  onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  Get a Valuation <ArrowRight className="w-5 h-5" />
                </PrimaryButton>
                <a href="tel:+442380123456">
                  <SecondaryButton className="w-full sm:w-auto text-lg px-8 py-4 flex items-center justify-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Phone className="w-5 h-5" /> Speak to Acquisitions
                  </SecondaryButton>
                </a>
              </div>

              {/* Stats - Mobile responsive */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl sm:text-2xl md:text-3xl font-display font-black text-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="hidden lg:block">
              <GlassPanel className="p-8 bg-white/95">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Quick Enquiry</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Property Postcode</label>
                    <input 
                      type="text" 
                      placeholder="e.g. SO15 1AA"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Approx. Land Size</label>
                    <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow bg-white">
                      <option value="">Select size range</option>
                      <option value="small">Under 5,000 sq ft</option>
                      <option value="medium">5,000 - 20,000 sq ft</option>
                      <option value="large">20,000 - 50,000 sq ft</option>
                      <option value="xlarge">50,000+ sq ft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow"
                    />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-landco-yellowLight rounded-lg border border-landco-yellow/20">
                    <input type="checkbox" id="rentback-quick" className="w-5 h-5 accent-landco-yellow" />
                    <label htmlFor="rentback-quick" className="text-sm text-slate-700">
                      <span className="font-semibold">I'm interested in Sale & Leaseback</span>
                      <br />
                      <span className="text-slate-500">Sell and rent back immediately</span>
                    </label>
                  </div>
                  <PrimaryButton className="w-full text-lg py-4">
                    Request Callback
                  </PrimaryButton>
                  <p className="text-xs text-slate-400 text-center">
                    Or call us directly: <a href="tel:+442380123456" className="text-landco-dark font-semibold">023 8012 3456</a>
                  </p>
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-landco-yellow font-bold text-sm uppercase tracking-widest mb-2 block">WHY SELL TO LANDCO</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-4">
              A Smarter Way to Sell
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We make selling industrial land simple, fast, and profitable. No estate agents, no lengthy negotiations, no uncertainty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="w-16 h-16 bg-landco-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-landco-dark">
                  {benefit.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale & Leaseback Highlight */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-landco-yellow/20 text-landco-yellow text-sm font-bold mb-6">
                <Handshake className="w-4 h-4" /> POPULAR OPTION
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-6">
                Sale & Leaseback
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Unlock the capital tied up in your land without disrupting your operations. Sell your property to Landco and we'll lease it straight back to you on flexible terms.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-landco-security/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-landco-security" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Immediate Capital Release</p>
                    <p className="text-sm text-slate-400">Access the full value of your asset within weeks</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-landco-security/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-landco-security" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Business Continuity</p>
                    <p className="text-sm text-slate-400">Continue operating from the same location seamlessly</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-landco-security/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-landco-security" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Flexible Terms</p>
                    <p className="text-sm text-slate-400">Monthly licenses, not restrictive long-term leases</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-landco-security/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-landco-security" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">No Maintenance Burden</p>
                    <p className="text-sm text-slate-400">We handle site security and infrastructure upkeep</p>
                  </div>
                </div>
              </div>

              <PrimaryButton 
                onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2"
              >
                Discuss Leaseback Options <ArrowRight className="w-5 h-5" />
              </PrimaryButton>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop" 
                alt="Industrial Site"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <p className="text-sm text-slate-500 mb-1">Typical Leaseback Rate</p>
                <p className="text-3xl font-display font-black text-slate-900">4-6%</p>
                <p className="text-xs text-slate-400">of sale price annually</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section id="submission-form" className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-landco-yellow font-bold text-sm uppercase tracking-widest mb-2 block">PROPERTY SUBMISSION</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-4">
              Submit Your Land
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Complete the form below and our acquisitions team will assess your property within 24 hours.
            </p>
          </div>

          <GlassPanel className="p-8 md:p-12">
            {/* Progress Steps - Mobile friendly */}
            <div className="flex justify-between mb-8 sm:mb-12 overflow-x-auto pb-2">
              {steps.map((step, idx) => (
                <div key={idx} className="flex-1 relative min-w-[60px]">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      idx < currentStep 
                        ? 'bg-landco-security text-white' 
                        : idx === currentStep 
                          ? 'bg-landco-yellow text-landco-dark' 
                          : 'bg-slate-100 text-slate-400'
                    }`}>
                      {idx < currentStep ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : step.icon}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-semibold text-center hidden sm:block ${
                      idx <= currentStep ? 'text-slate-900' : 'text-slate-400'
                    }`}>{step.title}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`absolute top-5 sm:top-6 left-1/2 w-full h-0.5 ${
                      idx < currentStep ? 'bg-landco-security' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Property Details */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Property Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Property Address *</label>
                    <input 
                      type="text" 
                      placeholder="Full address of the land"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Postcode *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. SO15 1AA"
                      value={formData.postcode}
                      onChange={(e) => updateField('postcode', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Land Size (sq ft) *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 15,000"
                      value={formData.landSize}
                      onChange={(e) => updateField('landSize', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Land Type *</label>
                    <select 
                      value={formData.landType}
                      onChange={(e) => updateField('landType', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow bg-white"
                    >
                      <option value="">Select type</option>
                      <option value="hardstanding">Hardstanding / Tarmac</option>
                      <option value="concrete">Concrete Yard</option>
                      <option value="gravel">Gravel / Aggregate</option>
                      <option value="greenfield">Greenfield</option>
                      <option value="brownfield">Brownfield</option>
                      <option value="mixed">Mixed Surface</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Current Use</label>
                    <select 
                      value={formData.currentUse}
                      onChange={(e) => updateField('currentUse', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow bg-white"
                    >
                      <option value="">Select current use</option>
                      <option value="storage">Open Storage</option>
                      <option value="parking">Vehicle Parking</option>
                      <option value="industrial">Industrial Operations</option>
                      <option value="unused">Currently Unused</option>
                      <option value="agricultural">Agricultural</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Planning Permission</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Yes - Approved', 'Pending Application', 'No Planning'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField('hasPlanning', option)}
                          className={`px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                            formData.hasPlanning === option
                              ? 'border-landco-yellow bg-landco-yellow/10 text-landco-dark'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Your Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Your Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                    <input 
                      type="text" 
                      placeholder="Full name"
                      value={formData.ownerName}
                      onChange={(e) => updateField('ownerName', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      placeholder="If applicable"
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="+44..."
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Sale Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Sale Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Guide Price / Asking Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">£</span>
                      <input 
                        type="text" 
                        placeholder="e.g. 500,000"
                        value={formData.askingPrice}
                        onChange={(e) => updateField('askingPrice', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20"
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Leave blank if you'd like us to provide a valuation</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Sale Timeframe</label>
                    <select 
                      value={formData.timeframe}
                      onChange={(e) => updateField('timeframe', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow bg-white"
                    >
                      <option value="">When do you need to sell?</option>
                      <option value="asap">As soon as possible</option>
                      <option value="1month">Within 1 month</option>
                      <option value="3months">Within 3 months</option>
                      <option value="6months">Within 6 months</option>
                      <option value="exploring">Just exploring options</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <div 
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.rentBack 
                          ? 'border-landco-yellow bg-landco-yellow/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => updateField('rentBack', !formData.rentBack)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          formData.rentBack ? 'border-landco-yellow bg-landco-yellow' : 'border-slate-300'
                        }`}>
                          {formData.rentBack && <Check className="w-4 h-4 text-landco-dark" />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 mb-1">I'm interested in Sale & Leaseback</p>
                          <p className="text-sm text-slate-500">
                            Sell your land to Landco and rent it back immediately. Continue operating from the same location while releasing capital.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {formData.rentBack && (
                    <div className="md:col-span-2 animate-fade-in">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Leaseback Terms</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Monthly Rolling', '12 Month License', 'Long-term (3+ years)'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateField('rentBackTerms', option)}
                            className={`px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                              formData.rentBackTerms === option
                                ? 'border-landco-yellow bg-landco-yellow/10 text-landco-dark'
                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Additional Info */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Additional Information</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Property Description</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us more about your property - access, utilities, any structures, history, etc."
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Do you have photos or documents to share?</label>
                  <div 
                    className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
                      formData.hasPhotos 
                        ? 'border-landco-security bg-landco-security/5' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => updateField('hasPhotos', !formData.hasPhotos)}
                  >
                    {formData.hasPhotos ? (
                      <div className="text-landco-security">
                        <CheckCircle className="w-10 h-10 mx-auto mb-2" />
                        <p className="font-semibold">Files ready to share</p>
                        <p className="text-sm text-slate-500">We'll request these after initial review</p>
                      </div>
                    ) : (
                      <>
                        <Camera className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-600 font-medium">Click to indicate you have photos/documents</p>
                        <p className="text-sm text-slate-400">We'll request these after initial review</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-4">Submission Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Location:</span>
                      <p className="font-medium text-slate-900">{formData.postcode || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Size:</span>
                      <p className="font-medium text-slate-900">{formData.landSize ? `${formData.landSize} sq ft` : 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Land Type:</span>
                      <p className="font-medium text-slate-900">{formData.landType || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Leaseback:</span>
                      <p className="font-medium text-slate-900">{formData.rentBack ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
              {currentStep > 0 ? (
                <SecondaryButton onClick={handleBack}>
                  Back
                </SecondaryButton>
              ) : <div />}

              {currentStep < steps.length - 1 ? (
                <PrimaryButton 
                  onClick={handleNext} 
                  disabled={!isStepValid(currentStep)}
                  className="flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              ) : (
                <PrimaryButton 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Property <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </PrimaryButton>
              )}
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-3xl text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500">
              Common questions about selling land to Landco
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                    expandedFaq === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-landco-yellow">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl text-landco-dark mb-4">
            Ready to Unlock Your Land's Value?
          </h2>
          <p className="text-landco-dark/70 text-lg mb-8 max-w-2xl mx-auto">
            Get a competitive cash offer within 48 hours. Our acquisitions team is ready to discuss your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton 
              onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-landco-dark text-white hover:bg-slate-800"
            >
              Submit Your Land
            </PrimaryButton>
            <a href="tel:+442380123456">
              <SecondaryButton className="w-full sm:w-auto flex items-center justify-center gap-2 border-landco-dark text-landco-dark hover:bg-landco-dark/10">
                <Phone className="w-5 h-5" /> 023 8012 3456
              </SecondaryButton>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

