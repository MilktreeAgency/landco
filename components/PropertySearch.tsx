import React, { useState } from 'react';
import { ListingGrid } from './ListingGrid';
import { MapView } from './MapView';
import { GlassPanel } from './ui/EliteComponents';
import { Search, SlidersHorizontal, Map, Grid3X3, ChevronDown, X } from 'lucide-react';

type ViewMode = 'grid' | 'map';

interface FilterState {
  minSize: number;
  maxSize: number;
  minPrice: number;
  maxPrice: number;
  available: boolean | null;
  securityRating: string[];
}

export const PropertySearch = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minSize: 0,
    maxSize: 50000,
    minPrice: 0,
    maxPrice: 10000,
    available: null,
    securityRating: []
  });

  const activeFilterCount = [
    filters.minSize > 0,
    filters.maxSize < 50000,
    filters.minPrice > 0,
    filters.maxPrice < 10000,
    filters.available !== null,
    filters.securityRating.length > 0
  ].filter(Boolean).length;

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Search Header - Mobile optimized */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-6 sm:py-8 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900">Find Your Yard</h1>
              <p className="text-slate-500 mt-1 text-sm sm:text-base">Discover available industrial storage across the UK</p>
            </div>
            
            {/* View Toggle - Mobile friendly */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
              <button 
                onClick={() => setViewMode('grid')}
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all font-medium text-sm flex-1 sm:flex-initial ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow text-slate-900' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Grid3X3 className="w-4 h-4" /> <span className="hidden sm:inline">Grid</span>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all font-medium text-sm flex-1 sm:flex-initial ${
                  viewMode === 'map' 
                    ? 'bg-white shadow text-slate-900' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Map className="w-4 h-4" /> <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by location, size, or features..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-landco-yellow focus:ring-2 focus:ring-landco-yellow/20 transition-all text-slate-900 font-medium text-sm sm:text-base"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-5 py-3.5 bg-white border rounded-xl flex items-center gap-2 font-semibold transition-all ${
                  showFilters || activeFilterCount > 0
                    ? 'border-landco-yellow text-landco-dark bg-landco-yellow/5' 
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" /> 
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-landco-yellow text-landco-dark text-xs font-bold rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in-down">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Size Range */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Size (sq ft)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Min"
                      value={filters.minSize || ''}
                      onChange={(e) => setFilters({...filters, minSize: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-landco-yellow"
                    />
                    <span className="text-slate-400">-</span>
                    <input 
                      type="number" 
                      placeholder="Max"
                      value={filters.maxSize === 50000 ? '' : filters.maxSize}
                      onChange={(e) => setFilters({...filters, maxSize: parseInt(e.target.value) || 50000})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-landco-yellow"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Price (£/mo)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Min"
                      value={filters.minPrice || ''}
                      onChange={(e) => setFilters({...filters, minPrice: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-landco-yellow"
                    />
                    <span className="text-slate-400">-</span>
                    <input 
                      type="number" 
                      placeholder="Max"
                      value={filters.maxPrice === 10000 ? '' : filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value) || 10000})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-landco-yellow"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Availability</label>
                  <select 
                    value={filters.available === null ? '' : filters.available.toString()}
                    onChange={(e) => setFilters({...filters, available: e.target.value === '' ? null : e.target.value === 'true'})}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-landco-yellow"
                  >
                    <option value="">All</option>
                    <option value="true">Available Only</option>
                    <option value="false">Leased</option>
                  </select>
                </div>

                {/* Security Rating */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Security Grade</label>
                  <div className="flex gap-2">
                    {['A', 'A+', 'S'].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => {
                          const current = filters.securityRating;
                          setFilters({
                            ...filters,
                            securityRating: current.includes(rating)
                              ? current.filter(r => r !== rating)
                              : [...current, rating]
                          });
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          filters.securityRating.includes(rating)
                            ? 'bg-landco-yellow text-landco-dark'
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setFilters({
                      minSize: 0,
                      maxSize: 50000,
                      minPrice: 0,
                      maxPrice: 10000,
                      available: null,
                      securityRating: []
                    })}
                    className="text-sm font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === 'grid' ? (
          <ListingGrid showHeading={false} />
        ) : (
          <MapView />
        )}
      </div>
    </div>
  );
};
