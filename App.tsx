import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ListingGrid } from './components/ListingGrid';
import { LeadQualifier } from './components/LeadQualifier';
import { Dashboard } from './components/Dashboard';
import { GeminiChat } from './components/GeminiChat';
import { Footer } from './components/Footer';
import { PropertySearch } from './components/PropertySearch';
import { PropertyDetails } from './components/PropertyDetails';
import { CityHub } from './components/CityHub';
import { SellYourLand } from './components/SellYourLand';
import { SellLandCTA } from './components/SellLandCTA';
import { WhyLandsCo } from './components/WhyLandsCo';
import { Testimonials } from './components/Testimonials';
import { useSEO, SEO_CONFIG } from './hooks/useSEO';

// Simple ScrollToTop component
const ScrollToTopHelper = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const LandingPage = () => {
  useSEO(SEO_CONFIG.home);
  return (
    <>
      <Hero />
      <ListingGrid limit={3} />
      <LeadQualifier />
      <Testimonials />
      <SellLandCTA />
      <Footer />
    </>
  );
};

const SearchPage = () => {
  useSEO(SEO_CONFIG.search);
  return (
    <>
      <PropertySearch />
      <Footer />
    </>
  );
};

const PropertyPage = () => (
  <>
    <PropertyDetails />
    <Footer />
  </>
);

const DashboardPage = () => {
  useSEO(SEO_CONFIG.dashboard);
  return (
    <>
      <Dashboard />
      <Footer />
    </>
  );
};

const CityHubPage = () => (
  <>
    <CityHub />
    <Footer />
  </>
);

const SellYourLandPage = () => {
  useSEO(SEO_CONFIG.sellYourLand);
  return (
    <>
      <SellYourLand />
    </>
  );
};

const WhyLandCoPage = () => (
  <>
    <WhyLandsCo />
    <Footer />
  </>
);

function App() {
  return (
    <HashRouter>
      <ScrollToTopHelper />
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-landco-yellow selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sell-your-land" element={<SellYourLandPage />} />
          <Route path="/why-landco" element={<WhyLandCoPage />} />
          {/* City Hub Routes for SEO */}
          <Route path="/yards-to-rent-southampton" element={<CityHubPage />} />
          <Route path="/yards-to-rent-portsmouth" element={<CityHubPage />} />
          <Route path="/yards-to-rent-fareham" element={<CityHubPage />} />
          <Route path="/yards-to-rent-andover" element={<CityHubPage />} />
          <Route path="/yards-to-rent-yeovil" element={<CityHubPage />} />
          <Route path="/yards-to-rent-basingstoke" element={<CityHubPage />} />
        </Routes>
        <GeminiChat />
      </div>
    </HashRouter>
  );
}

export default App;
