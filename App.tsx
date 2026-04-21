import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ListingGrid } from './components/ListingGrid';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { PropertyDetails } from './components/PropertyDetails';
import { CityHub } from './components/CityHub';
import { SellYourLand } from './components/SellYourLand';
import { SellLandCTA } from './components/SellLandCTA';
import { WhyLandsCo } from './components/WhyLandsCo';
import { Testimonials } from './components/Testimonials';
import { Sites } from './components/Sites';
import { PermittedUses } from './components/PermittedUses';
import { TermsAndCosts } from './components/TermsAndCosts';
import { Locations } from './components/Locations';
import { About } from './components/About';
import { Enquire } from './components/Enquire';
import { TrustStrip } from './components/TrustStrip';
import { useSEO, SEO_CONFIG } from './hooks/useSEO';

const ScrollToTopHelper = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LandingPage = () => {
  useSEO(SEO_CONFIG.home);
  return (
    <>
      <Hero />
      <TrustStrip />
      <ListingGrid />
      <Testimonials />
      <SellLandCTA />
      <Footer />
    </>
  );
};

const SitesPage = () => {
  useSEO(SEO_CONFIG.sites);
  return (
    <>
      <Sites />
      <Footer />
    </>
  );
};

const PermittedUsesPage = () => {
  useSEO(SEO_CONFIG.permittedUses);
  return (
    <>
      <PermittedUses />
      <Footer />
    </>
  );
};

const TermsAndCostsPage = () => {
  useSEO(SEO_CONFIG.termsAndCosts);
  return (
    <>
      <TermsAndCosts />
      <Footer />
    </>
  );
};

const LocationsPage = () => {
  useSEO(SEO_CONFIG.locations);
  return (
    <>
      <Locations />
      <Footer />
    </>
  );
};

const AboutPage = () => {
  useSEO(SEO_CONFIG.about);
  return (
    <>
      <About />
      <Footer />
    </>
  );
};

const EnquirePage = () => {
  useSEO(SEO_CONFIG.enquire);
  return (
    <>
      <Enquire />
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

const LandWantedPage = () => {
  useSEO(SEO_CONFIG.landWanted);
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
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-landco-yellow selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* New primary routes */}
          <Route path="/sites" element={<SitesPage />} />
          <Route path="/permitted-uses" element={<PermittedUsesPage />} />
          <Route path="/terms-and-costs" element={<TermsAndCostsPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/land-wanted" element={<LandWantedPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/enquire" element={<EnquirePage />} />

          {/* Legacy redirects */}
          <Route path="/search" element={<Navigate to="/sites" replace />} />
          <Route
            path="/sell-your-land"
            element={<Navigate to="/land-wanted" replace />}
          />

          {/* Other utility / detail pages */}
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/why-landco" element={<WhyLandCoPage />} />

          {/* City Hub Routes for SEO */}
          <Route path="/yards-to-rent-southampton" element={<CityHubPage />} />
          <Route path="/yards-to-rent-portsmouth" element={<CityHubPage />} />
          <Route path="/yards-to-rent-yeovil" element={<CityHubPage />} />
          <Route path="/yards-to-rent-salisbury" element={<CityHubPage />} />
          <Route path="/yards-to-rent-byfleet" element={<CityHubPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
