import React from 'react';
import { Link } from 'react-router-dom';
import { Banknote, ArrowRight, Clock, Handshake, TrendingUp, Phone, CheckCircle } from 'lucide-react';
import { AnimatedCounter } from './ui/EliteComponents';

export const SellLandCTA = () => {
  const benefits = [
    { icon: <Clock className="w-5 h-5" />, text: 'Cash offer in 48 hours' },
    { icon: <Handshake className="w-5 h-5" />, text: 'Sale & leaseback available' },
    { icon: <CheckCircle className="w-5 h-5" />, text: 'Complete in 14 days' },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" 
          alt="Industrial Land"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-landco-security/30 bg-landco-security/10 text-sm text-landco-security font-bold mb-6">
              <TrendingUp className="w-4 h-4" /> ACTIVE ACQUISITION PROGRAMME
            </div>
            
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Own Industrial Land?<br />
              <span className="text-landco-yellow">We're Buying.</span>
            </h2>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              Landco is actively acquiring yards, hardstanding, and industrial land across the UK. 
              Get a competitive cash offer and complete in as little as 14 days.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-8">
              {benefits.map((benefit, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10"
                >
                  <span className="text-landco-yellow">{benefit.icon}</span>
                  <span className="text-white text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sell-your-land">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-landco-yellow hover:bg-landco-yellowHover text-landco-dark font-bold rounded-xl transition-all shadow-lg hover:shadow-xl group">
                  <Banknote className="w-5 h-5" />
                  Get a Valuation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="tel:+442380123456">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all">
                  <Phone className="w-5 h-5" />
                  Speak to Acquisitions
                </button>
              </a>
            </div>
          </div>

          {/* Right Stats Card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
              <h3 className="text-white font-display font-bold text-xl mb-6">Our Track Record</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-display font-black text-landco-yellow">
                    <AnimatedCounter value={15} suffix="M+" />
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">Land Acquired (£)</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-display font-black text-landco-yellow">
                    <AnimatedCounter value={47} />
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">Sites Purchased</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-display font-black text-landco-yellow">
                    <AnimatedCounter value={14} suffix=" Days" />
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">Avg. Completion</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-display font-black text-landco-yellow">
                    <AnimatedCounter value={92} suffix="%" />
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-1">Offer Acceptance</p>
                </div>
              </div>

              {/* Sale & Leaseback highlight */}
              <div className="p-4 bg-landco-security/20 rounded-xl border border-landco-security/30">
                <div className="flex items-start gap-3">
                  <Handshake className="w-6 h-6 text-landco-security flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-sm">Sale & Leaseback Available</p>
                    <p className="text-xs text-slate-300 mt-1">
                      Sell your land and rent it back immediately. Unlock capital while maintaining operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};





