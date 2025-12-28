import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CITY_HUBS, CityHub as CityHubType } from '../types';
import { MOCK_YARDS } from '../constants';
import { ListingGrid } from './ListingGrid';
import { MapView } from './MapView';
import { GlassPanel, PrimaryButton, AnimatedCounter } from './ui/EliteComponents';
import { MapPin, ArrowLeft, Grid3X3, Map, Shield, Zap, Truck, ChevronRight } from 'lucide-react';
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

type ViewMode = 'grid' | 'map';

export const CityHub = () => {
  const location = useLocation();
  // Extract city from URL path like "/yards-to-rent-southampton"
  const city = location.pathname.replace('/yards-to-rent-', '');
  const [cityData, setCityData] = useState<CityHubType | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const found = CITY_HUBS.find(c => c.slug === city);
    setCityData(found || null);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [city]);

  // Dynamic SEO for city hub pages
  useSEO(cityData ? SEO_CONFIG.cityHub(cityData.name, cityData.region) : {
    title: 'Yards to Rent | Landco',
    description: 'Find industrial yards and open storage to rent across South England.'
  });

  const cityYards = city ? MOCK_YARDS.filter(y => y.city.toLowerCase() === city.toLowerCase()) : [];
  const availableCount = cityYards.filter(y => y.available).length;
  const totalSqFt = cityYards.reduce((acc, y) => acc + y.sqFt, 0);

  if (!cityData) {
    return (
      <div className="pt-32 text-center text-slate-900 min-h-screen">
        <div className="max-w-md mx-auto">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Location Not Found</h1>
          <p className="text-slate-500 mb-6">We couldn't find yards in this location.</p>
          <Link to="/search">
            <PrimaryButton>View All Locations</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={cityData.heroImage} 
            alt={cityData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className={`relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Breadcrumb */}
          <Link 
            to="/search" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all locations
          </Link>

          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-landco-yellow text-landco-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {cityData.region}
                </span>
                {availableCount > 0 && (
                  <span className="bg-landco-security/20 text-landco-security px-3 py-1 rounded-full text-xs font-bold">
                    {availableCount} Available
                  </span>
                )}
              </div>
              <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-3">
                Yards to Rent in <span className="text-landco-yellow">{cityData.name}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                {cityData.description}. Premium industrial open storage with flexible terms and 24/7 access.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              value={cityYards.length} 
              label="Total Sites"
              icon={<MapPin className="w-5 h-5" />}
            />
            <StatCard 
              value={availableCount} 
              label="Available Now"
              icon={<Shield className="w-5 h-5" />}
              highlight
            />
            <StatCard 
              value={totalSqFt} 
              label="Sq Ft Available"
              icon={<Grid3X3 className="w-5 h-5" />}
              format
            />
            <StatCard 
              value={24} 
              label="Hour Access"
              suffix="/7"
              icon={<Zap className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Controls Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900">
              {cityYards.length} {cityYards.length === 1 ? 'Property' : 'Properties'} in {cityData.name}
            </h2>
            <p className="text-slate-500">Find your perfect industrial storage solution</p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium text-sm ${
                viewMode === 'grid' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Grid3X3 className="w-4 h-4" /> Grid
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium text-sm ${
                viewMode === 'map' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Map className="w-4 h-4" /> Map
            </button>
          </div>
        </div>

        {/* Listings or Map */}
        {viewMode === 'grid' ? (
          <ListingGrid city={city} showHeading={false} />
        ) : (
          <MapView city={city} />
        )}

        {/* CTA Section */}
        {cityYards.length > 0 && (
          <div className={`mt-16 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <GlassPanel className="p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-center">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
                Can't find what you're looking for?
              </h3>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                Our team can help you find the perfect storage solution across our UK-wide network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton className="flex items-center justify-center gap-2">
                  <Truck className="w-5 h-5" /> Speak to an Expert
                </PrimaryButton>
                <Link to="/search">
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
                    View All Locations <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </GlassPanel>
          </div>
        )}
      </section>

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-6">
            Industrial Storage in {cityData.name}
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed mb-4">
              Landco offers premium open storage and industrial yard space across {cityData.name} and the wider {cityData.region} region. 
              Our secure, hardstanding sites are perfect for businesses requiring flexible storage solutions for vehicles, containers, 
              construction materials, and plant equipment.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              All our {cityData.name} yards feature 24/7 access, comprehensive CCTV coverage, and flexible monthly license terms 
              with no lengthy lease commitments. Many sites offer additional benefits including mains utilities, office space, 
              and immediate availability.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether you're a logistics company needing HGV parking, a construction firm requiring material storage, 
              or a container operator seeking secure compound space, our {cityData.name} portfolio has the solution for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ 
  value, 
  label, 
  icon, 
  suffix = '',
  highlight = false,
  format = false 
}: { 
  value: number; 
  label: string; 
  icon: React.ReactNode;
  suffix?: string;
  highlight?: boolean;
  format?: boolean;
}) => (
  <div className={`p-5 rounded-xl backdrop-blur-sm ${
    highlight 
      ? 'bg-landco-yellow/20 border border-landco-yellow/30' 
      : 'bg-white/10 border border-white/10'
  }`}>
    <div className={`mb-2 ${highlight ? 'text-landco-yellow' : 'text-white/60'}`}>
      {icon}
    </div>
    <div className={`text-2xl md:text-3xl font-display font-black ${highlight ? 'text-landco-yellow' : 'text-white'}`}>
      {format ? (
        <AnimatedCounter value={value} />
      ) : (
        <>{value}{suffix}</>
      )}
    </div>
    <p className="text-white/60 text-sm font-medium">{label}</p>
  </div>
);

