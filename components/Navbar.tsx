import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Search, MapPin, ChevronDown, Menu, X, Building2, Truck, Container, Phone, Banknote } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CITY_HUBS } from '../types';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setLocationsOpen(false);
      setSolutionsOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDropdownClick = (e: React.MouseEvent, dropdown: 'locations' | 'solutions') => {
    e.stopPropagation();
    if (dropdown === 'locations') {
      setLocationsOpen(!locationsOpen);
      setSolutionsOpen(false);
    } else {
      setSolutionsOpen(!solutionsOpen);
      setLocationsOpen(false);
    }
  };

  const solutions = [
    { icon: <Truck className="w-5 h-5" />, label: 'Vehicle Storage', description: 'HGV, van & fleet parking', href: '/search' },
    { icon: <Container className="w-5 h-5" />, label: 'Container Storage', description: 'ISO & shipping containers', href: '/search' },
    { icon: <Building2 className="w-5 h-5" />, label: 'Plant & Equipment', description: 'Construction machinery', href: '/search' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm' 
          : 'bg-transparent border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - switches between white and color */}
          <Link to="/" className="flex items-center gap-2 group relative">
            {/* White logo for transparent state */}
            <img 
              src="/logo-white.png" 
              alt="LANDCO Logo" 
              className={`h-12 w-auto group-hover:scale-105 transition-all duration-500 absolute ${
                isScrolled ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Color logo for scrolled state */}
            <img 
              src="/landco-logo-colour.png" 
              alt="LANDCO Logo" 
              className={`h-12 w-auto group-hover:scale-105 transition-all duration-500 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile/tablet, shown on large screens */}
          <div className="hidden lg:flex items-center gap-1">
            {!isDashboard ? (
              <>
                {/* Locations Dropdown */}
                <div className="relative">
                  <button 
                    onClick={(e) => handleDropdownClick(e, 'locations')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      locationsOpen 
                        ? isScrolled 
                          ? 'text-slate-900 bg-slate-100' 
                          : 'text-white bg-white/20'
                        : isScrolled
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    LOCATIONS
                    <ChevronDown className={`w-4 h-4 transition-transform ${locationsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {locationsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-down z-50">
                      <div className="p-2">
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold px-3 py-2">
                          Available Regions
                        </p>
                        {CITY_HUBS.map((city) => (
                          <Link
                            key={city.slug}
                            to={`/yards-to-rent-${city.slug}`}
                            onClick={() => setLocationsOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 hover:bg-slate-50 rounded-lg transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-landco-yellow/20 transition-colors">
                              <MapPin className="w-5 h-5 text-slate-400 group-hover:text-landco-dark" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 text-sm">{city.name}</p>
                              <p className="text-xs text-slate-500">{city.region}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-slate-100 p-3 bg-slate-50">
                        <Link 
                          to="/search" 
                          onClick={() => setLocationsOpen(false)}
                          className="text-sm font-semibold text-landco-dark hover:underline flex items-center gap-1"
                        >
                          View all locations →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Solutions Dropdown */}
                <div className="relative">
                  <button 
                    onClick={(e) => handleDropdownClick(e, 'solutions')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      solutionsOpen 
                        ? isScrolled 
                          ? 'text-slate-900 bg-slate-100' 
                          : 'text-white bg-white/20'
                        : isScrolled
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    SOLUTIONS
                    <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {solutionsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-down z-50">
                      <div className="p-2">
                        {solutions.map((solution, idx) => (
                          <Link
                            key={idx}
                            to={solution.href}
                            onClick={() => setSolutionsOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 hover:bg-slate-50 rounded-lg transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-landco-yellow/20 group-hover:text-landco-dark transition-colors">
                              {solution.icon}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 text-sm">{solution.label}</p>
                              <p className="text-xs text-slate-500">{solution.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sell Your Land - Prominent CTA */}
                <Link 
                  to="/sell-your-land" 
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    isScrolled
                      ? 'bg-landco-security/10 text-landco-security hover:bg-landco-security/20 border-landco-security/20'
                      : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  SELL YOUR LAND
                </Link>

                {/* Why Landco */}
                <Link 
                  to="/why-landco" 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isScrolled
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  WHY LANDCO
                </Link>

                {/* Contact */}
                <a 
                  href="tel:+442380123456" 
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isScrolled
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  CONTACT
                </a>
              </>
            ) : (
              <span className="text-landco-dark bg-landco-yellow/20 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                Tenant Portal
              </span>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search button (desktop only - hidden below lg) */}
            <Link 
              to="/search" 
              className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isScrolled
                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Search</span>
            </Link>

            {/* Login/Dashboard button - Icon only on mobile */}
            <Link to={isDashboard ? "/" : "/dashboard"} className="hidden lg:block">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-landco-yellow hover:bg-landco-yellowHover transition-all shadow-sm hover:shadow-md group">
                {isDashboard ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-landco-dark" />
                    <span className="text-sm font-bold text-landco-dark">Site Secure</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 text-landco-dark" />
                    <span className="text-sm font-bold text-landco-dark">Client Login</span>
                  </>
                )}
              </button>
            </Link>
            
            {/* Mobile Login button - Icon only */}
            <Link to={isDashboard ? "/" : "/dashboard"} className="lg:hidden">
              <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-landco-yellow hover:bg-landco-yellowHover transition-all shadow-sm hover:shadow-md group">
                {isDashboard ? (
                  <ShieldCheck className="w-5 h-5 text-landco-dark" />
                ) : (
                  <User className="w-5 h-5 text-landco-dark" />
                )}
              </button>
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'hover:bg-slate-100 text-slate-700'
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl animate-slide-in-right">
            <div className="pt-24 px-6 pb-8 h-full overflow-y-auto">
              {/* Logo */}
              <div className="mb-8 -mt-4">
                <img 
                  src="/logo-white.png" 
                  alt="LANDCO Logo" 
                  className="h-10 w-auto"
                  style={{ filter: 'brightness(0)' }}
                />
              </div>

              {/* Search */}
              <Link 
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-4 bg-slate-50 rounded-xl mb-6"
              >
                <Search className="w-5 h-5 text-slate-400" />
                <span className="text-slate-500">Search locations...</span>
              </Link>

              {/* Menu sections */}
              <div className="space-y-6">
                {/* Locations */}
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold px-2 mb-3">
                    Locations
                  </p>
                  <div className="space-y-1">
                    {CITY_HUBS.map((city) => (
                      <Link
                        key={city.slug}
                        to={`/yards-to-rent-${city.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <MapPin className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-semibold text-slate-900">{city.name}</p>
                          <p className="text-xs text-slate-500">{city.region}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold px-2 mb-3">
                    Solutions
                  </p>
                  <div className="space-y-1">
                    {solutions.map((solution, idx) => (
                      <Link
                        key={idx}
                        to={solution.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <div className="text-slate-400">{solution.icon}</div>
                        <div>
                          <p className="font-semibold text-slate-900">{solution.label}</p>
                          <p className="text-xs text-slate-500">{solution.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Sell Your Land - Prominent */}
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to="/sell-your-land"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 bg-landco-security/10 rounded-xl mb-4 border border-landco-security/20"
                  >
                    <Banknote className="w-6 h-6 text-landco-security" />
                    <div>
                      <p className="font-bold text-landco-security">Sell Your Land</p>
                      <p className="text-xs text-slate-500">Get a cash offer in 48 hours</p>
                    </div>
                  </Link>
                </div>

                {/* Other links */}
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to="/why-landco"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Building2 className="w-5 h-5 text-slate-400" />
                    <span className="font-semibold text-slate-900">Why Landco</span>
                  </Link>
                  <a
                    href="tel:+442380123456"
                    className="flex items-center gap-3 px-3 py-3 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5 text-slate-400" />
                    <span className="font-semibold text-slate-900">Contact Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
