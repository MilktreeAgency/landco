import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Shield, Zap, Infinity, ChevronDown } from 'lucide-react';
import { AnimatedCounter } from './ui/EliteComponents';
import { useNavigate } from 'react-router-dom';
import { HERO_STATS } from '../constants';
import { CITY_HUBS } from '../types';

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      const matchedCity = CITY_HUBS.find(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchedCity) {
        navigate(`/yards-to-rent-${matchedCity.slug}`);
        return;
      }
    }
    navigate('/search');
  };

  const handleCitySelect = (slug: string) => {
    navigate(`/yards-to-rent-${slug}`);
    setShowSuggestions(false);
  };

  const filteredCities = searchTerm 
    ? CITY_HUBS.filter(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.region.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : CITY_HUBS;

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" 
          alt="Industrial Background" 
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-landco-darker via-landco-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        
        {/* Animated grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-landco-yellow/10 rounded-full blur-3xl animate-float opacity-50" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-landco-yellow/5 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-6xl px-6 text-center">
        {/* Pre-headline badge - Added extra padding for mobile devices */}
        <div className={`pt-24 sm:pt-20 md:pt-16 mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-300">
            <span className="w-2 h-2 rounded-full bg-landco-security animate-pulse" />
            <span className="font-medium">UK's Premier Open Storage Network</span>
          </span>
        </div>

        {/* Main headline - Larger on mobile */}
        <h1 className={`font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          ELITE OPEN<br />
          <span className="text-gradient">STORAGE.</span>
        </h1>

        {/* Subheadline - Better mobile sizing */}
        <p className={`text-base sm:text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Secure, hardstanding industrial land for modern logistics infrastructure. 
          <span className="text-white font-medium"> Instant access. Flexible terms. No traditional lease delays.</span>
        </p>

        {/* The "Google-Simple" Search */}
        <div className={`relative max-w-2xl mx-auto mb-16 transition-all duration-700 delay-300 z-50 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={searchContainerRef}>
          <div className="relative z-50">
            <div className="bg-white p-2 flex items-center shadow-2xl rounded-xl border border-white/10 relative z-10">
              <div className="pl-4 text-slate-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Find a yard in Southampton, Portsmouth..." 
                className="w-full bg-transparent border-none text-slate-900 text-base sm:text-lg px-4 py-3 focus:outline-none placeholder-slate-400 font-medium"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="bg-landco-yellow text-landco-dark p-3 rounded-lg hover:bg-landco-yellowHover transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>

            {/* Location suggestions dropdown */}
            {showSuggestions && (
              <div 
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-[999] animate-fade-in-down max-h-96 overflow-y-auto"
                style={{
                  backgroundColor: '#ffffff',
                  isolation: 'isolate'
                }}
                onMouseDown={(e) => e.preventDefault()} // Prevent input blur on click
              >
                {filteredCities.length > 0 ? (
                  <div className="p-2">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold px-3 py-2 bg-slate-50 rounded-lg mb-2">
                      {searchTerm ? `Results for "${searchTerm}" (${filteredCities.length})` : 'Popular Locations'}
                    </p>
                    {filteredCities.map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => handleCitySelect(city.slug)}
                        className="w-full flex items-center gap-3 px-3 py-3 hover:bg-slate-50 rounded-lg transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-landco-yellow/20 transition-colors flex-shrink-0">
                          <MapPin className="w-5 h-5 text-slate-400 group-hover:text-landco-dark" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{city.name}</p>
                          <p className="text-sm text-slate-500 truncate">{city.region} • {city.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-slate-500 mb-2">No locations found matching "{searchTerm}"</p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setShowSuggestions(true);
                      }}
                      className="text-landco-dark font-semibold hover:underline"
                    >
                      Show all locations
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Value Badges */}
        <div className={`flex flex-wrap justify-center gap-4 md:gap-6 mb-16 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge icon={<Shield className="w-4 h-4 text-landco-security" />} text="SECURE SITES" delay="stagger-1" />
          <Badge icon={<Zap className="w-4 h-4 text-landco-yellow" />} text="IMMEDIATE START" delay="stagger-2" />
          <Badge icon={<Infinity className="w-4 h-4 text-blue-400" />} text="FLEXIBLE TERMS" delay="stagger-3" />
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {HERO_STATS.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-black text-white mb-1">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center gap-2 text-slate-400 animate-pulse-slow">
          <span className="text-xs uppercase tracking-widest font-medium">Explore</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
};

const Badge = ({ icon, text, delay }: { icon: React.ReactNode; text: string; delay?: string }) => (
  <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-default ${delay}`}>
    {icon}
    <span className="text-xs font-bold tracking-wider text-gray-300">{text}</span>
  </div>
);
