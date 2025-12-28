import React, { useEffect, useState } from 'react';
import { MOCK_YARDS } from '../constants';
import { GlassPanel, StatusBadge, ImageCarousel, FeatureBadge, TagBadge, SiteManagerCard } from './ui/EliteComponents';
import { ArrowRight, Video, MapPin, Ruler, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Yard } from '../types';

interface ListingGridProps {
  limit?: number;
  city?: string;
  showHeading?: boolean;
}

export const ListingGrid = ({ limit, city, showHeading = true }: ListingGridProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  let yards = city 
    ? MOCK_YARDS.filter(yard => yard.city.toLowerCase() === city.toLowerCase())
    : MOCK_YARDS;
  
  yards = limit ? yards.slice(0, limit) : yards;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="yards" className="py-24 px-6 max-w-7xl mx-auto bg-slate-50">
      {showHeading && (
        <div className={`flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-landco-yellow font-bold text-sm uppercase tracking-widest mb-2 block">Premium Locations</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-2">Available Infrastructure</h2>
            <p className="text-slate-500 max-w-lg">High-capacity yards ready for immediate occupation. All sites feature 24/7 access and comprehensive security.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/search">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 hover:bg-white hover:shadow-md text-slate-700 transition-all font-semibold bg-white">
                View All Locations <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {yards.map((yard, idx) => (
          <PropertyCard 
            key={yard.id} 
            yard={yard} 
            onClick={() => navigate(`/property/${yard.id}`)}
            delay={idx * 100}
            isVisible={isVisible}
          />
        ))}
      </div>

      {yards.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">No properties available in this location.</p>
          <Link to="/search" className="text-landco-dark font-semibold hover:underline mt-2 inline-block">
            View all locations →
          </Link>
        </div>
      )}
    </section>
  );
};

interface PropertyCardProps {
  yard: Yard;
  onClick: () => void;
  delay?: number;
  isVisible?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ yard, onClick, delay = 0, isVisible = true }) => {
  return (
    <GlassPanel 
      onClick={onClick}
      className={`group relative flex flex-col h-full hover:border-landco-yellow/50 cursor-pointer hover-lift card-glow transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image Area with Carousel */}
      <div className="relative h-64 overflow-hidden">
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-20">
          <StatusBadge status={yard.available ? 'available' : 'occupied'} />
        </div>
        
        {/* Security Badge */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {yard.securityRating === 'S' && (
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-lg">
              <Video className="w-3 h-3 text-red-500 animate-pulse" /> 24/7 MONITORED
            </span>
          )}
        </div>

        {/* Image Carousel */}
        <ImageCarousel 
          images={yard.images} 
          alt={yard.title}
          showArrows={true}
          showDots={true}
        />

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        {/* Certifications */}
        {yard.certifications.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {yard.certifications.slice(0, 2).map(cert => (
              <FeatureBadge 
                key={cert}
                type={cert.toLowerCase().includes('breeam') ? 'breeam' : cert.toLowerCase().includes('iso') ? 'iso' : 'certified'}
                label={cert}
              />
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {yard.tags.slice(0, 3).map(tag => (
            <TagBadge key={tag} variant="muted">
              {tag}
            </TagBadge>
          ))}
        </div>

        {/* Title & Location */}
        <div className="mb-4">
          <h3 className="font-display font-bold text-xl text-slate-900 leading-tight mb-1.5 group-hover:text-landco-dark transition-colors line-clamp-2">
            {yard.title}
          </h3>
          <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4" /> {yard.location}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Ruler className="w-4 h-4 text-slate-400" />
            <span className="font-semibold">{yard.sqFt.toLocaleString()}</span>
            <span className="text-slate-400">sq ft</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Shield className="w-4 h-4 text-slate-400" />
            <span className="font-semibold">Grade {yard.securityRating}</span>
          </div>
        </div>

        {/* Site Manager (compact) */}
        {yard.siteManager && (
          <div className="mb-4 pb-4 border-b border-slate-100">
            <SiteManagerCard manager={yard.siteManager} compact />
          </div>
        )}

        {/* Price & CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">License Fee</p>
            <p className="text-2xl font-display font-black text-slate-900">
              £{yard.pricePerMonth.toLocaleString()}
              <span className="text-sm text-slate-500 font-medium"> /mo</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-landco-yellow group-hover:border-landco-yellow transition-all duration-300 group-hover:scale-110">
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-landco-dark transition-colors" />
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};
