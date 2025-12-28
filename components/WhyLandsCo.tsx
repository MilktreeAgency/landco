import React, { useState, useEffect } from 'react';
import { 
  Shield, Zap, TrendingUp, Clock, CheckCircle, Users, 
  Leaf, Award, Building2, Lock, Calendar, FileText,
  MapPin, Phone, ArrowRight, Star, Target, Briefcase
} from 'lucide-react';
import { AnimatedCounter, GlassPanel, PrimaryButton } from './ui/EliteComponents';
import { useNavigate } from 'react-router-dom';

export const WhyLandsCo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80" 
            alt="Industrial Yard" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-landco-darker via-landco-dark/90 to-slate-50" />
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-landco-yellow/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-landco-yellow/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className={`mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-300">
              <Star className="w-4 h-4 text-landco-yellow" />
              <span className="font-medium">The Future of Open Storage</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className={`font-display font-black text-5xl md:text-7xl tracking-tight text-white mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            WHY <span className="text-gradient">LANDCO?</span>
          </h1>

          <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            We're revolutionizing industrial land rental with <span className="text-white font-semibold">instant access</span>, <span className="text-white font-semibold">flexible terms</span>, and <span className="text-white font-semibold">zero hassle</span>.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={() => navigate('/search')}
              className="bg-landco-yellow text-landco-dark font-display font-bold px-8 py-4 rounded-lg hover:scale-105 hover:bg-landco-yellowHover transition-all duration-200 shadow-lg flex items-center gap-2"
            >
              Find Your Yard
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/sell-your-land')}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 font-display font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
            >
              List Your Land
              <Building2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-20 z-20 max-w-6xl mx-auto px-6">
        <GlassPanel className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
          <StatCard value={50} suffix="+" label="Active Yards" icon={<MapPin className="w-5 h-5 text-landco-yellow" />} />
          <StatCard value={98} suffix="%" label="Customer Satisfaction" icon={<Star className="w-5 h-5 text-landco-yellow" />} />
          <StatCard value={24} suffix="h" label="Average Setup Time" icon={<Clock className="w-5 h-5 text-landco-yellow" />} />
          <StatCard value={500} suffix="+" label="Happy Clients" icon={<Users className="w-5 h-5 text-landco-yellow" />} />
        </GlassPanel>
      </section>

      {/* Core Benefits */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-slate-900 mb-4">
            The <span className="text-gradient">LandCo</span> Difference
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We've eliminated the pain points of traditional land rental to give you the smoothest experience possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard
            icon={<Zap className="w-8 h-8" />}
            title="Instant Access"
            description="No waiting months for planning permissions or lease approvals. Find a yard and start operating within 24-48 hours."
            color="yellow"
          />
          <BenefitCard
            icon={<Calendar className="w-8 h-8" />}
            title="Flexible Terms"
            description="Monthly rolling contracts with no long-term commitments. Scale up or down as your business needs change."
            color="blue"
          />
          <BenefitCard
            icon={<Shield className="w-8 h-8" />}
            title="Fully Secure"
            description="All sites feature 24/7 security, CCTV coverage, secure fencing, and controlled access for complete peace of mind."
            color="purple"
          />
          <BenefitCard
            icon={<FileText className="w-8 h-8" />}
            title="Zero Red Tape"
            description="Simple online agreements, transparent pricing, and no hidden fees. What you see is what you get."
            color="green"
          />
          <BenefitCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Scale on Demand"
            description="Start with 1,000 sqft or take 50,000 sqft. Expand or reduce your footprint without penalties."
            color="orange"
          />
          <BenefitCard
            icon={<Users className="w-8 h-8" />}
            title="Dedicated Support"
            description="Every yard comes with a local site manager. Real people, real support, whenever you need it."
            color="indigo"
          />
        </div>
      </section>

      {/* Traditional vs LandsCo */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl text-slate-900 mb-4">
              Traditional Leasing vs <span className="text-gradient">LandCo</span>
            </h2>
            <p className="text-lg text-slate-600">
              See why forward-thinking businesses are making the switch
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-slate-500" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-700">Traditional Leasing</h3>
              </div>
              <ul className="space-y-4">
                <ComparisonItem negative text="3-12 month lease negotiations" />
                <ComparisonItem negative text="Long-term contracts (5-10 years)" />
                <ComparisonItem negative text="Expensive legal fees" />
                <ComparisonItem negative text="Hidden costs and service charges" />
                <ComparisonItem negative text="Complex exit clauses" />
                <ComparisonItem negative text="Limited flexibility" />
                <ComparisonItem negative text="Slow response times" />
              </ul>
            </div>

            {/* LandCo */}
            <div className="bg-gradient-to-br from-landco-yellowLight to-landco-yellow/30 border-2 border-landco-yellow rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-landco-dark text-landco-yellow text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-landco-yellow flex items-center justify-center">
                  <Zap className="w-6 h-6 text-landco-dark" />
                </div>
                <h3 className="font-display font-bold text-2xl text-landco-dark">The LandCo Way</h3>
              </div>
              <ul className="space-y-4">
                <ComparisonItem positive text="24-48 hour move-in ready" />
                <ComparisonItem positive text="Monthly rolling contracts" />
                <ComparisonItem positive text="Zero legal fees required" />
                <ComparisonItem positive text="Transparent all-in pricing" />
                <ComparisonItem positive text="Cancel anytime (30 days notice)" />
                <ComparisonItem positive text="Scale up or down easily" />
                <ComparisonItem positive text="Dedicated 24/7 support" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-slate-900 mb-4">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From startups to enterprise operations, we support businesses across every sector
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <IndustryCard
            icon={<Briefcase className="w-6 h-6" />}
            title="Logistics & Haulage"
            description="Fleet parking, container storage, cross-docking operations"
          />
          <IndustryCard
            icon={<Building2 className="w-6 h-6" />}
            title="Construction"
            description="Equipment storage, material yards, site compounds"
          />
          <IndustryCard
            icon={<Target className="w-6 h-6" />}
            title="Manufacturing"
            description="Raw material storage, finished goods, overflow capacity"
          />
          <IndustryCard
            icon={<Users className="w-6 h-6" />}
            title="Retail & E-commerce"
            description="Distribution hubs, seasonal storage, returns processing"
          />
        </div>
      </section>

      {/* Certifications & Standards */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl mb-4">
              Certified <span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We maintain the highest standards across all our sites
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CertCard
              icon={<Shield className="w-8 h-8 text-purple-400" />}
              title="ISO 27001"
              description="Information security management certified"
            />
            <CertCard
              icon={<Leaf className="w-8 h-8 text-emerald-400" />}
              title="BREEAM Rated"
              description="Sustainable building assessment methodology"
            />
            <CertCard
              icon={<Award className="w-8 h-8 text-amber-400" />}
              title="SIA Approved"
              description="Security Industry Authority accredited security"
            />
            <CertCard
              icon={<Lock className="w-8 h-8 text-blue-400" />}
              title="Secured by Design"
              description="Police-approved crime prevention standards"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-slate-900 mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-lg text-slate-600">
            Don't just take our word for it
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="LandCo made it incredibly easy for us to expand our fleet operations. We were operational within 48 hours!"
            author="James Mitchell"
            company="Mitchell Haulage Ltd"
            rating={5}
          />
          <TestimonialCard
            quote="The flexibility is unmatched. We scaled from 5,000 to 20,000 sqft in just two weeks. No other provider could do that."
            author="Sarah Chen"
            company="FastTrack Logistics"
            rating={5}
          />
          <TestimonialCard
            quote="Finally, a land rental service that understands modern business needs. Transparent pricing, no hidden fees, excellent support."
            author="David Thompson"
            company="BuildRight Construction"
            rating={5}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-landco-dark to-landco-darker text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-black text-4xl md:text-6xl mb-6">
            Ready to Experience the <span className="text-gradient">LandCo Difference?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses who've already made the switch to smarter, faster, flexible land rental.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/search')}
              className="bg-landco-yellow text-landco-dark font-display font-bold px-10 py-5 rounded-lg hover:scale-105 hover:bg-landco-yellowHover transition-all duration-200 shadow-2xl flex items-center gap-2 text-lg"
            >
              Browse Available Yards
              <ArrowRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => window.location.href = 'tel:+441234567890'}
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 font-display font-bold px-10 py-5 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-2 text-lg"
            >
              <Phone className="w-6 h-6" />
              Speak to an Expert
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-8">
            No commitment required • View pricing instantly • Move in within 48 hours
          </p>
        </div>
      </section>
    </div>
  );
};

// Supporting Components

const StatCard = ({ value, suffix, label, icon }: { value: number; suffix: string; label: string; icon: React.ReactNode }) => (
  <div className="text-center">
    <div className="flex items-center justify-center gap-2 mb-2">
      {icon}
      <div className="text-3xl md:text-4xl font-display font-black text-slate-900">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
    </div>
    <p className="text-sm text-slate-600 font-medium">{label}</p>
  </div>
);

const BenefitCard = ({ icon, title, description, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
}) => {
  const colorClasses: Record<string, string> = {
    yellow: 'from-yellow-50 to-amber-50 text-yellow-600',
    blue: 'from-blue-50 to-cyan-50 text-blue-600',
    purple: 'from-purple-50 to-indigo-50 text-purple-600',
    green: 'from-green-50 to-emerald-50 text-green-600',
    orange: 'from-orange-50 to-red-50 text-orange-600',
    indigo: 'from-indigo-50 to-violet-50 text-indigo-600',
  };

  return (
    <GlassPanel className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </GlassPanel>
  );
};

const ComparisonItem = ({ text, positive, negative }: { text: string; positive?: boolean; negative?: boolean }) => (
  <li className="flex items-start gap-3">
    {positive && <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />}
    {negative && <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
      <div className="w-4 h-0.5 bg-red-500 rounded" />
    </div>}
    <span className={positive ? 'text-slate-900 font-medium' : 'text-slate-500'}>{text}</span>
  </li>
);

const IndustryCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <GlassPanel className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="w-12 h-12 rounded-xl bg-landco-yellowLight flex items-center justify-center text-landco-dark mb-4">
      {icon}
    </div>
    <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-600">{description}</p>
  </GlassPanel>
);

const CertCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
    <div className="mb-4">{icon}</div>
    <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author, company, rating }: { 
  quote: string; 
  author: string; 
  company: string; 
  rating: number;
}) => (
  <GlassPanel className="p-8">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-landco-yellow text-landco-yellow" />
      ))}
    </div>
    <p className="text-slate-700 mb-6 leading-relaxed italic">"{quote}"</p>
    <div>
      <p className="font-display font-bold text-slate-900">{author}</p>
      <p className="text-sm text-slate-500">{company}</p>
    </div>
  </GlassPanel>
);

