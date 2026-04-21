import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { CITY_HUBS } from '../types';
import { MOCK_YARDS } from '../constants';
import { PageHeader } from './PageHeader';

export const Locations: React.FC = () => {
  const cityCount = (slug: string) =>
    MOCK_YARDS.filter((y) => y.city === slug).length;

  return (
    <>
      <PageHeader
        eyebrow="Where we are"
        title="Locations"
        subtitle="Sites across South England — from coastal logistics hubs to inland commercial corridors."
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {CITY_HUBS.map((city) => {
              const count = cityCount(city.slug);
              return (
                <Link
                  key={city.slug}
                  to={`/yards-to-rent-${city.slug}`}
                  className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-landco-yellow/60 hover:shadow-lg transition-all"
                >
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={city.heroImage}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-white/80 uppercase tracking-wider font-medium">
                          {city.region}
                        </p>
                        <h3 className="font-display font-black text-2xl text-white leading-tight">
                          {city.name}
                        </h3>
                      </div>
                      {count > 0 && (
                        <span className="px-2.5 py-1 rounded-full bg-landco-yellow text-landco-dark text-xs font-bold">
                          {count} {count === 1 ? 'site' : 'sites'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                      {city.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-landco-dark group-hover:gap-2.5 transition-all">
                      <MapPin className="w-4 h-4" />
                      View {city.name} sites
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-4">
            Need a location we don't list?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            We're constantly acquiring new sites. Tell us where you're looking and we'll
            let you know what's coming.
          </p>
          <Link
            to="/enquire"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-landco-yellow hover:bg-landco-yellowHover text-landco-dark font-bold transition-all shadow-md"
          >
            Get in touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Locations;
