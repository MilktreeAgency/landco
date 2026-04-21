import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, MessageSquare } from 'lucide-react';
import { MOCK_YARDS } from '../constants';

/**
 * Light, approachable hero. Replaces the previous cinematic dark hero.
 * Two-column layout on lg+: copy + CTAs on the left, featured property on the right.
 * Stacks on mobile.
 */
export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const featured = MOCK_YARDS[0];

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
      {/* Soft accent shapes */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-landco-yellow/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-32 w-[28rem] h-[28rem] bg-landco-security/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: copy + CTAs */}
          <div className="lg:col-span-7">
            <div
              className={`transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-600 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-landco-security animate-pulse" />
                Sites available across South England
              </span>
            </div>

            <h1
              className={`font-display font-black text-5xl sm:text-6xl md:text-7xl tracking-tight text-slate-900 leading-[1.02] mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Land that{' '}
              <span className="relative inline-block">
                <span className="relative z-10">works.</span>
                <span className="absolute left-0 right-0 bottom-1 h-3 bg-landco-yellow/60 -z-0 rounded-sm" />
              </span>
            </h1>

            <p
              className={`text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mb-8 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Open storage, yards and commercial land — ready when you are. Move in the
              same day. Flexible terms. No solicitor fees.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link
                to="/sites"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-landco-yellow hover:bg-landco-yellowHover text-landco-dark font-bold text-base shadow-md hover:shadow-lg transition-all"
              >
                Browse available sites
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/enquire"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border border-slate-200 hover:border-slate-300 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                Make an enquiry
              </Link>
            </div>

            <div
              className={`flex flex-wrap items-center gap-6 sm:gap-10 text-sm transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Stat number="6" label="Active sites" />
              <Divider />
              <Stat number="4" label="Counties covered" />
              <Divider />
              <Stat number="80k+" label="Sq ft available" />
            </div>
          </div>

          {/* Right: featured site card — desktop only (avoids duplicating with the
              full listing grid which now appears immediately below on mobile) */}
          <div className="hidden lg:block lg:col-span-5">
            <Link
              to={`/property/${featured.id}`}
              className={`group block rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-bold uppercase tracking-wider text-landco-security">
                    <span className="w-1.5 h-1.5 rounded-full bg-landco-security animate-pulse" />
                    Available now
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-landco-yellow/90 mb-1">
                  Featured site
                </p>
                <h3 className="font-display font-bold text-xl text-slate-900 leading-tight mb-2">
                  {featured.title}
                </h3>
                <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4">
                  <MapPin className="w-4 h-4" />
                  {featured.location}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                      Availability
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {featured.availability}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-landco-dark group-hover:gap-2 transition-all">
                    View
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div>
    <p className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-none">
      {number}
    </p>
    <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider font-medium mt-1">
      {label}
    </p>
  </div>
);

const Divider = () => <span className="hidden sm:block h-8 w-px bg-slate-200" />;
