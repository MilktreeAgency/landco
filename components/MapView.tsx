import React, { useState, useMemo } from 'react';
import { MOCK_YARDS } from '../constants';
import { GlassPanel, StatusBadge, PrimaryButton } from './ui/EliteComponents';
import { MapPin, X, ArrowRight, Shield, Ruler, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Yard } from '../types';

interface MapViewProps {
  city?: string;
}

export const MapView: React.FC<MapViewProps> = ({ city }) => {
  const [selectedYard, setSelectedYard] = useState<Yard | null>(null);
  const [hoveredYard, setHoveredYard] = useState<string | null>(null);
  const navigate = useNavigate();

  const yards = useMemo(() => {
    return city 
      ? MOCK_YARDS.filter(y => y.city.toLowerCase() === city.toLowerCase())
      : MOCK_YARDS;
  }, [city]);

  // Calculate map bounds based on coordinates
  const bounds = useMemo(() => {
    if (yards.length === 0) return { minLat: 50.5, maxLat: 51.5, minLng: -2.5, maxLng: -0.5 };
    
    const lats = yards.map(y => y.coordinates.lat);
    const lngs = yards.map(y => y.coordinates.lng);
    
    const padding = 0.3;
    return {
      minLat: Math.min(...lats) - padding,
      maxLat: Math.max(...lats) + padding,
      minLng: Math.min(...lngs) - padding,
      maxLng: Math.max(...lngs) + padding
    };
  }, [yards]);

  // Convert coordinates to percentage position on map
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="relative w-full h-[600px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
      {/* Map Background - Using a stylized representation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
        {/* Grid pattern for visual interest */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Decorative map elements */}
        <div className="absolute inset-0">
          {/* Major roads representation */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q30,45 50,50 T100,48" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
            <path d="M30,0 Q35,30 32,50 T28,100" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
            <path d="M70,0 Q65,40 72,70 T68,100" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
          </svg>
        </div>

        {/* Region labels */}
        <div className="absolute top-10 left-10 text-slate-300 text-xs font-medium uppercase tracking-widest">
          Hampshire & South Coast
        </div>
      </div>

      {/* Plot Markers */}
      {yards.map((yard) => {
        const pos = getPosition(yard.coordinates.lat, yard.coordinates.lng);
        const isSelected = selectedYard?.id === yard.id;
        const isHovered = hoveredYard === yard.id;

        return (
          <div
            key={yard.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onMouseEnter={() => setHoveredYard(yard.id)}
            onMouseLeave={() => setHoveredYard(null)}
            onClick={() => setSelectedYard(yard)}
          >
            {/* Pulse ring for available properties */}
            {yard.available && (
              <div className={`absolute inset-0 -m-2 rounded-full bg-landco-security animate-ping opacity-30 ${isSelected ? 'hidden' : ''}`} />
            )}
            
            {/* Marker */}
            <div className={`
              relative flex items-center justify-center transition-all duration-300
              ${isSelected || isHovered ? 'scale-125 z-20' : 'scale-100'}
            `}>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-300
                ${yard.available 
                  ? isSelected 
                    ? 'bg-landco-yellow border-landco-dark' 
                    : 'bg-landco-security border-white hover:bg-landco-yellow hover:border-landco-dark'
                  : 'bg-slate-400 border-white'
                }
              `}>
                <MapPin className={`w-5 h-5 ${yard.available ? 'text-white' : 'text-white'} ${isSelected ? 'text-landco-dark' : ''}`} />
              </div>
              
              {/* Price tag on hover */}
              {(isHovered || isSelected) && !selectedYard && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-slate-200 whitespace-nowrap animate-fade-in">
                  <p className="font-bold text-slate-900 text-sm">£{yard.pricePerMonth.toLocaleString()}/mo</p>
                  <p className="text-xs text-slate-500">{yard.sqFt.toLocaleString()} sq ft</p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-slate-200" />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Selected Property Card */}
      {selectedYard && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-30 animate-slide-up">
          <GlassPanel className="p-0 shadow-2xl">
            <button 
              onClick={() => setSelectedYard(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>

            <div className="relative h-40 overflow-hidden rounded-t-xl">
              <img 
                src={selectedYard.images[0]} 
                alt={selectedYard.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <StatusBadge status={selectedYard.available ? 'available' : 'occupied'} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="p-5">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-1">{selectedYard.title}</h3>
              <p className="text-sm text-slate-500 flex items-center gap-1 mb-4">
                <MapPin className="w-4 h-4" /> {selectedYard.location}
              </p>

              <div className="flex gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Ruler className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold">{selectedYard.sqFt.toLocaleString()}</span> sq ft
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Shield className="w-4 h-4 text-slate-400" />
                  Grade <span className="font-semibold">{selectedYard.securityRating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">From</p>
                  <p className="text-xl font-display font-black text-slate-900">
                    £{selectedYard.pricePerMonth.toLocaleString()}
                    <span className="text-sm text-slate-500 font-medium"> /mo</span>
                  </p>
                </div>
                <PrimaryButton 
                  onClick={() => navigate(`/property/${selectedYard.id}`)}
                  className="flex items-center gap-2 text-sm px-4 py-2"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              </div>
            </div>
          </GlassPanel>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-slate-200">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Legend</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-landco-security border-2 border-white shadow" />
            <span className="text-sm text-slate-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-400 border-2 border-white shadow" />
            <span className="text-sm text-slate-600">Leased</span>
          </div>
        </div>
      </div>

      {/* Zoom controls placeholder */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-bold">
          +
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-bold">
          −
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {/* Empty state */}
      {yards.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No properties in this area</p>
          </div>
        </div>
      )}
    </div>
  );
};

