import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_YARDS } from '../constants';
import { CITY_HUBS } from '../types';

const getCityName = (slug: string) =>
  CITY_HUBS.find(c => c.slug === slug)?.name ?? (slug.charAt(0).toUpperCase() + slug.slice(1));
import { GlassPanel, PrimaryButton, StatusBadge, ImageCarousel, SiteManagerCard } from './ui/EliteComponents';
import { MapPin, Check, Ruler, Tag, ArrowLeft, Share2, X, ChevronLeft, ChevronRight, Calendar, FileText, Phone, Download, Eye, AlertTriangle } from 'lucide-react';
import { Yard } from '../types';
import { useSEO, SEO_CONFIG } from '../hooks/useSEO';

const SpecCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-slate-300 transition-all duration-300">
    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">{icon}</div>
    <div>
      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="font-bold text-slate-900 text-lg">{value}</p>
    </div>
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center gap-3 text-slate-700">
    <span className="w-6 h-6 rounded-full bg-landco-security/10 flex items-center justify-center shrink-0">
      <Check className="w-3.5 h-3.5 text-landco-security" />
    </span>
    {children}
  </li>
);

export const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Yard | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const found = MOCK_YARDS.find(y => y.id === id);
    setProperty(found || null);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [id]);

  // Dynamic SEO for property pages
  useSEO(property ? SEO_CONFIG.property(property.title, property.location) : {
    title: 'Property Details | Landco',
    description: 'View commercial land details and enquire online.'
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!property) return;
    const total = property.images.length;
    if (direction === 'next') {
      setLightboxIndex((prev) => (prev + 1) % total);
    } else {
      setLightboxIndex((prev) => (prev - 1 + total) % total);
    }
  };

  if (!property) {
    return (
      <div className="pt-32 text-center text-slate-900 min-h-screen">
        <div className="animate-pulse">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-200 mb-4" />
          <p className="text-slate-500">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb / Nav */}
      <div className={`max-w-7xl mx-auto px-6 py-6 flex justify-between items-center transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Link to="/search" className="text-slate-500 hover:text-slate-900 flex items-center gap-2 text-sm font-medium group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Search
        </Link>
        <div className="flex items-center gap-3">
          <button className="text-slate-500 hover:text-slate-900 flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="text-slate-500 hover:text-slate-900 flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
            <Download className="w-4 h-4" /> Brochure
          </button>
        </div>
      </div>

      {/* Hero Gallery - Mobile optimized */}
      <div className={`max-w-7xl mx-auto px-6 mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
          {/* Main Image */}
          <div 
            className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <StatusBadge status={property.available ? 'available' : 'occupied'} />
            </div>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" /> View Gallery
            </div>
          </div>
          
          {/* Secondary Images */}
          {property.images.slice(1, 4).map((img, idx) => (
            <div 
              key={idx}
              className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer group hidden md:block"
              onClick={() => openLightbox(idx + 1)}
            >
              <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={`${property.title} - View ${idx + 2}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              
              {/* 360 Tour badge on last visible image */}
              {idx === 2 && property.images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors">
                  <span className="text-white font-bold text-sm border border-white/30 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                    <Eye className="w-4 h-4" /> +{property.images.length - 4} More
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="lg:col-span-2 space-y-10">
          {/* Header */}
          <div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-slate-900 mb-3">{property.title}</h1>
            <p className="text-xl text-slate-500 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> {getCityName(property.city)}
            </p>
            {property.totalSiteArea && (
              <p className="text-sm text-slate-400 mt-1 ml-7">Total Site Area: {property.totalSiteArea}</p>
            )}
          </div>

          {/* Specs - Mobile responsive grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <SpecCard icon={<Ruler className="w-6 h-6 text-landco-dark" />} label="Availability" value={property.availability} />
            <SpecCard icon={<Tag className="w-6 h-6 text-landco-dark" />} label="Use" value={property.use.split(',')[0]} />
            <SpecCard icon={<Calendar className="w-6 h-6 text-landco-dark" />} label="Price" value={property.price} />
          </div>

          {/* Description */}
          <div className="prose prose-slate max-w-none">
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-4">Property Description</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              {property.description}
            </p>

            <h4 className="font-display font-bold text-lg text-slate-900 mb-4">Key Features</h4>
            <ul className="space-y-3 mt-4">
              {property.features.map((feature, idx) => (
                <ListItem key={idx}>{feature}</ListItem>
              ))}
            </ul>

            <h4 className="font-display font-bold text-lg text-slate-900 mb-3 mt-8">Suitable Use</h4>
            <p className="text-slate-600 leading-relaxed">{property.use}</p>

            {property.condition && (
              <div className="mt-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800 text-sm mb-1">Condition Note</p>
                  <p className="text-amber-700 text-sm">{property.condition}</p>
                </div>
              </div>
            )}
          </div>

          {/* Site Manager */}
          {property.siteManager && (
            <div>
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-4">Your Site Manager</h3>
              <SiteManagerCard manager={property.siteManager} />
            </div>
          )}

          {/* Documents Section */}
          <div>
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-4">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-landco-yellow/10 transition-colors">
                  <FileText className="w-6 h-6 text-slate-400 group-hover:text-landco-dark" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">Site Brochure</p>
                  <p className="text-sm text-slate-500">PDF, 2.4 MB</p>
                </div>
                <Download className="w-5 h-5 text-slate-400 ml-auto" />
              </button>
              <button className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-landco-yellow/10 transition-colors">
                  <FileText className="w-6 h-6 text-slate-400 group-hover:text-landco-dark" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">License Agreement</p>
                  <p className="text-sm text-slate-500">PDF, 156 KB</p>
                </div>
                <Download className="w-5 h-5 text-slate-400 ml-auto" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <GlassPanel className="p-6 sticky top-24">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <p className="text-sm text-slate-500 font-medium mb-1">Price</p>
              <p className="text-2xl font-display font-black text-slate-900 leading-tight">{property.price}</p>
              <p className="text-sm text-slate-400 mt-2 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-landco-security" /> Flexible terms available
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <PrimaryButton className="w-full text-lg flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> Enquire Now
              </PrimaryButton>
              <button className="w-full py-3.5 border border-slate-200 rounded-lg text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" /> Schedule Viewing
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-400 text-center space-y-1">
                <p>✓ Digital signature ready</p>
                <p>✓ Immediate occupation available</p>
                <p>✓ Flexible license terms</p>
              </div>
            </div>
          </GlassPanel>

          {/* Quick Contact */}
          {property.siteManager && (
            <GlassPanel className="p-5">
              <p className="text-sm text-slate-500 mb-3">Quick Contact</p>
              <a 
                href={`tel:${property.siteManager.phone}`}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-10 h-10 bg-landco-yellow rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-landco-dark" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{property.siteManager.name}</p>
                  <p className="text-sm text-slate-500">{property.siteManager.phone}</p>
                </div>
              </a>
            </GlassPanel>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            onClick={() => navigateLightbox('prev')}
            className="absolute left-6 text-white/80 hover:text-white transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={() => navigateLightbox('next')}
            className="absolute right-6 text-white/80 hover:text-white transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-5xl max-h-[80vh] mx-6">
            <img 
              src={property.images[lightboxIndex]} 
              alt={`${property.title} - Image ${lightboxIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === lightboxIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>

          <p className="absolute bottom-6 right-6 text-white/60 text-sm">
            {lightboxIndex + 1} / {property.images.length}
          </p>
        </div>
      )}
    </div>
  );
};
