import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CITY_HUBS } from '../types';
import { MapPin, Phone, Mail, Shield, Award, Leaf, Lock, Send, ArrowRight, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const trustBadges = [
    { icon: <Shield className="w-5 h-5" />, label: 'Secured by Design' },
    { icon: <Leaf className="w-5 h-5" />, label: 'BREEAM Certified' },
    { icon: <Award className="w-5 h-5" />, label: 'ISO 14001' },
    { icon: <Lock className="w-5 h-5" />, label: 'CCTV Monitored' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Main Footer - Mobile responsive */}
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img 
              src="/logo-white.png" 
              alt="LANDCO Logo" 
              className="h-12 w-auto mb-6"
            />
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The UK's premier open storage network. Secure, flexible industrial land for modern logistics operations.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="tel:+442380123456"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +44 (0) 23 8012 3456
              </a>
              <a 
                href="mailto:enquiries@landco.co.uk"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                enquiries@landco.co.uk
              </a>
            </div>
          </div>

          {/* Locations Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Locations
            </h4>
            <ul className="space-y-3">
              {CITY_HUBS.map((city) => (
                <li key={city.slug}>
                  <Link 
                    to={`/yards-to-rent-${city.slug}`}
                    className="flex items-center gap-2 text-slate-400 hover:text-landco-yellow transition-colors text-sm group"
                  >
                    <MapPin className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    Yards in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/search"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Search Properties
                </Link>
              </li>
              <li>
                <Link 
                  to="/sell-your-land"
                  className="text-landco-security hover:text-landco-security/80 transition-colors text-sm font-semibold"
                >
                  Sell Your Land
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Client Portal
                </Link>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  About Landco
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Investor Relations
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Market Insights
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              Get the latest industrial land market updates and exclusive availability alerts.
            </p>
            
            {subscribed ? (
              <div className="bg-landco-security/10 border border-landco-security/20 rounded-lg p-4 text-center">
                <p className="text-landco-security font-medium text-sm">
                  ✓ You're subscribed!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-landco-yellow transition-colors"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-landco-yellow text-landco-dark font-bold py-3 rounded-lg hover:bg-landco-yellowHover transition-colors text-sm flex items-center justify-center gap-2"
                >
                  Subscribe <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a 
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Section - Mobile friendly */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 sm:py-8">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
            {trustBadges.map((badge, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 text-slate-500"
              >
                <div className="text-slate-600">{badge.icon}</div>
                <span className="text-xs font-medium uppercase tracking-wider">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Landco Group Ltd. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
