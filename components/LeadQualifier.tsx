import React, { useState } from 'react';
import { LeadStep, LeadData, CITY_HUBS } from '../types';
import { GlassPanel, PrimaryButton, SecondaryButton } from './ui/EliteComponents';
import { Truck, Container, Box, Calendar, MapPin, CheckCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitLeadForm } from '../services/formspreeService';

export const LeadQualifier = () => {
  const [step, setStep] = useState<LeadStep>(LeadStep.TYPE);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const [data, setData] = useState<LeadData>({
    storageType: '',
    size: 5000,
    timeline: '',
    location: '',
    email: ''
  });

  const handleNext = () => {
    if (step < LeadStep.CONTACT) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const handleBack = () => {
    if (step > LeadStep.TYPE) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const updateData = (key: keyof LeadData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!data.email || !isValidEmail(data.email)) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const result = await submitLeadForm({
        storageType: data.storageType,
        size: data.size,
        timeline: data.timeline,
        location: data.location,
        email: data.email,
        source: 'Homepage Lead Qualifier',
      });
      
      if (result.ok) {
        setShowResults(true);
      } else {
        setSubmitError(result.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const matchedProperties = CITY_HUBS.filter(city => 
    !data.location || city.slug === data.location
  ).slice(0, 2);

  const OptionCard = ({ icon, label, sublabel, selected, onClick }: { 
    icon: React.ReactNode, 
    label: string, 
    sublabel?: string,
    selected: boolean, 
    onClick: () => void 
  }) => (
    <button 
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-300 w-full group relative overflow-hidden ${
        selected 
          ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.02]' 
          : 'bg-white border-slate-200 text-slate-500 hover:border-landco-yellow hover:shadow-lg hover:scale-[1.01]'
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="w-5 h-5 text-landco-yellow" />
        </div>
      )}
      <div className={`transition-colors duration-300 ${selected ? 'text-landco-yellow' : 'text-slate-400 group-hover:text-landco-dark'}`}>
        {icon}
      </div>
      <div className="text-center">
        <span className="font-display font-bold text-sm tracking-wide block">{label}</span>
        {sublabel && <span className="text-xs opacity-60 mt-1 block">{sublabel}</span>}
      </div>
    </button>
  );

  const LocationCard = ({ city, selected, onClick }: {
    city: typeof CITY_HUBS[0];
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-300 w-full text-left ${
        selected 
          ? 'bg-slate-900 text-white border-slate-900' 
          : 'bg-white border-slate-200 hover:border-landco-yellow'
      }`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
        selected ? 'bg-landco-yellow/20' : 'bg-slate-100'
      }`}>
        <MapPin className={`w-6 h-6 ${selected ? 'text-landco-yellow' : 'text-slate-400'}`} />
      </div>
      <div className="flex-1">
        <p className={`font-bold ${selected ? 'text-white' : 'text-slate-900'}`}>{city.name}</p>
        <p className={`text-sm ${selected ? 'text-slate-300' : 'text-slate-500'}`}>{city.region}</p>
      </div>
      {selected && <CheckCircle className="w-5 h-5 text-landco-yellow" />}
    </button>
  );

  if (showResults) {
    return (
      <section className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <GlassPanel className="p-8 md:p-12 text-center animate-scale-in">
            <div className="w-20 h-20 bg-landco-security/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-landco-security" />
            </div>
            
            <h2 className="font-display font-bold text-3xl text-slate-900 mb-3">Perfect Match Found!</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Based on your requirements, we've identified {matchedProperties.length} properties that meet your needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
              {matchedProperties.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => navigate(`/yards-to-rent-${city.slug}`)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left hover:border-landco-yellow hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-landco-security/10 text-landco-security px-2 py-1 rounded-full font-bold">
                      AVAILABLE
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-landco-dark group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{city.name} Yards</h3>
                  <p className="text-sm text-slate-500">{city.description}</p>
                </button>
              ))}
            </div>

            <p className="text-sm text-slate-400 mb-4">
              We've sent the details to <span className="font-semibold text-slate-600">{data.email}</span>
            </p>

            <SecondaryButton onClick={() => navigate('/search')} className="mx-auto">
              View All Properties
            </SecondaryButton>
          </GlassPanel>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-landco-yellow font-bold text-sm uppercase tracking-widest mb-2 block">Smart Matching</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-3">Find Your Perfect Space</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Answer a few questions and our elite matching engine will find the ideal plot for your needs.</p>
        </div>

        <GlassPanel className="p-8 md:p-12 relative min-h-[500px] border-slate-200 shadow-xl bg-gradient-to-b from-white to-slate-50/50">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-10">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="relative flex-1 h-2 rounded-full overflow-hidden bg-slate-100">
                <div 
                  className={`absolute inset-y-0 left-0 bg-landco-yellow transition-all duration-500 ease-out rounded-full ${
                    i < step ? 'w-full' : i === step ? 'w-1/2' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Step indicator */}
          <div className="text-center mb-8">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">
              Step {step + 1} of 5
            </span>
          </div>

          {/* Content Area */}
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
            {step === LeadStep.TYPE && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">What do you need to store?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <OptionCard 
                    icon={<Truck className="w-10 h-10" />} 
                    label="VEHICLES" 
                    sublabel="Cars, HGVs, Vans"
                    selected={data.storageType === 'vehicles'} 
                    onClick={() => updateData('storageType', 'vehicles')} 
                  />
                  <OptionCard 
                    icon={<Container className="w-10 h-10" />} 
                    label="CONTAINERS" 
                    sublabel="Shipping, ISO"
                    selected={data.storageType === 'containers'} 
                    onClick={() => updateData('storageType', 'containers')} 
                  />
                  <OptionCard 
                    icon={<Box className="w-10 h-10" />} 
                    label="MATERIALS" 
                    sublabel="Construction, Stock"
                    selected={data.storageType === 'materials'} 
                    onClick={() => updateData('storageType', 'materials')} 
                  />
                  <OptionCard 
                    icon={<Truck className="w-10 h-10" />} 
                    label="PLANT" 
                    sublabel="Machinery, Equipment"
                    selected={data.storageType === 'plant'} 
                    onClick={() => updateData('storageType', 'plant')} 
                  />
                </div>
              </div>
            )}

            {step === LeadStep.SIZE && (
              <div className="space-y-8 animate-fade-in-up text-center">
                <h3 className="text-2xl font-bold text-slate-900">How much space do you need?</h3>
                <div className="max-w-lg mx-auto">
                  <div className="flex justify-between text-slate-400 text-sm font-medium mb-3">
                    <span>500 sq ft</span>
                    <span>50,000+ sq ft</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="50000" 
                    step="500"
                    value={data.size}
                    onChange={(e) => updateData('size', parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-landco-yellow"
                    style={{
                      background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${((data.size - 500) / (50000 - 500)) * 100}%, #e2e8f0 ${((data.size - 500) / (50000 - 500)) * 100}%, #e2e8f0 100%)`
                    }}
                  />
                  <div className="mt-10">
                    <span className="text-6xl md:text-7xl font-display font-black text-slate-900 animate-count-up">
                      {data.size.toLocaleString()}
                    </span>
                    <span className="text-xl text-slate-500 ml-2">sq ft</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-4">
                    Approximately {Math.round(data.size / 200)} vehicle spaces
                  </p>
                </div>
              </div>
            )}

            {step === LeadStep.TIMELINE && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">When do you need access?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <OptionCard 
                    icon={<Calendar className="w-10 h-10" />} 
                    label="IMMEDIATELY" 
                    sublabel="Within 48 hours"
                    selected={data.timeline === 'immediate'} 
                    onClick={() => updateData('timeline', 'immediate')} 
                  />
                  <OptionCard 
                    icon={<Calendar className="w-10 h-10" />} 
                    label="NEXT 30 DAYS" 
                    sublabel="Planning ahead"
                    selected={data.timeline === 'month'} 
                    onClick={() => updateData('timeline', 'month')} 
                  />
                  <OptionCard 
                    icon={<Calendar className="w-10 h-10" />} 
                    label="JUST BROWSING" 
                    sublabel="Future requirements"
                    selected={data.timeline === 'browsing'} 
                    onClick={() => updateData('timeline', 'browsing')} 
                  />
                </div>
              </div>
            )}

            {step === LeadStep.LOCATION && (
              <div className="space-y-6 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">Preferred location?</h3>
                <p className="text-slate-500 text-center mb-8">Select a region or skip to see all options</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {CITY_HUBS.map((city) => (
                    <LocationCard
                      key={city.slug}
                      city={city}
                      selected={data.location === city.slug}
                      onClick={() => updateData('location', data.location === city.slug ? '' : city.slug)}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === LeadStep.CONTACT && (
              <div className="space-y-6 animate-fade-in-up text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-landco-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-landco-yellow" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">We found matches!</h3>
                <p className="text-slate-500">Enter your email to unlock the locations and receive instant pricing.</p>
                
                <div className="space-y-4 mt-8">
                  <input 
                    type="email" 
                    placeholder="work@company.com"
                    className="w-full bg-white border-2 border-slate-200 rounded-xl px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20 transition-all text-center font-medium text-lg"
                    value={data.email}
                    onChange={(e) => updateData('email', e.target.value)}
                  />
                  
                  <PrimaryButton 
                    onClick={handleSubmit}
                    disabled={!data.email || !isValidEmail(data.email) || isSubmitting}
                    className="w-full text-lg py-4 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Finding matches...
                      </>
                    ) : (
                      <>
                        VIEW MATCHES
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </PrimaryButton>
                </div>

                {submitError && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {submitError}
                  </div>
                )}

                <p className="text-xs text-slate-400 mt-4">
                  By continuing, you agree to our Terms & Privacy Policy
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between">
            {step > 0 ? (
              <SecondaryButton onClick={handleBack} className="text-sm px-5 py-2.5">
                Back
              </SecondaryButton>
            ) : <div />}
            
            {step < LeadStep.CONTACT && (
              <PrimaryButton 
                onClick={handleNext} 
                disabled={
                  (step === LeadStep.TYPE && !data.storageType) ||
                  (step === LeadStep.TIMELINE && !data.timeline)
                } 
                className="text-sm px-6 py-2.5 flex items-center gap-2"
              >
                {step === LeadStep.LOCATION && !data.location ? 'Skip' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
            )}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};
