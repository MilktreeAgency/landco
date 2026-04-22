import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation, NavLink } from 'react-router-dom';

const PHONE_NUMBER = '+44 (0) 23 8012 3456';
const PHONE_HREF = 'tel:+442380123456';

interface NavItem {
  label: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Available Sites', to: '/sites' },
  { label: 'Permitted Uses', to: '/permitted-uses' },
  { label: 'Terms & Costs', to: '/terms-and-costs' },
  { label: 'Locations', to: '/locations' },
  { label: 'Land Wanted', to: '/land-wanted' },
  { label: 'About', to: '/about' },
];

export const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isDashboard = location.pathname === '/dashboard';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Subtle elevated style once user scrolls; light/transparent at the top of the homepage
  const useTransparentNav = isHomePage && !isScrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          useTransparentNav
            ? 'bg-white/70 backdrop-blur border-b border-transparent'
            : 'bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/logo-new.png"
              alt="LAND-CO"
              className="h-11 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop nav */}
          {!isDashboard && (
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-2.5 py-2 rounded-lg text-[13px] xl:text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'text-slate-900 bg-slate-100'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Right: Call now + Enquire CTA + mobile button */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={PHONE_HREF}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all"
              aria-label={`Call us on ${PHONE_NUMBER}`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">Call now</span>
            </a>

            <Link
              to="/enquire"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-landco-yellow hover:bg-landco-yellowHover text-landco-dark font-bold text-sm transition-all shadow-sm hover:shadow-md"
            >
              Enquire
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl animate-slide-in-right">
            <div className="pt-24 px-6 pb-8 h-full overflow-y-auto">
              <div className="space-y-1 mb-8">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                        isActive
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="space-y-2.5">
                <Link
                  to="/enquire"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-4 rounded-xl bg-landco-yellow hover:bg-landco-yellowHover text-landco-dark font-bold transition-all shadow-md"
                >
                  Enquire
                </Link>
                <a
                  href={PHONE_HREF}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 font-bold transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call now
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-sm text-slate-500 space-y-2">
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Get in touch
                </p>
                <a href={PHONE_HREF} className="block hover:text-slate-900">
                  {PHONE_NUMBER}
                </a>
                <a
                  href="mailto:enquiries@landco.co.uk"
                  className="block hover:text-slate-900"
                >
                  enquiries@landco.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
