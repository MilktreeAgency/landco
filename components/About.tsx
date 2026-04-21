import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, Handshake } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { TrustStrip } from './TrustStrip';

const values = [
  {
    icon: <Compass className="w-7 h-7" />,
    title: 'Practical, not corporate',
    description:
      'We talk like operators, not landlords. Plain English contracts, straight answers, no jargon.',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: 'Sites you can rely on',
    description:
      'Every yard is secured, well-maintained and ready to work — not a problem to inherit.',
  },
  {
    icon: <Handshake className="w-7 h-7" />,
    title: 'Long-term relationships',
    description:
      'Most of our occupiers stay because the model works, not because they\'re locked in.',
  },
];

export const About: React.FC = () => (
  <>
    <PageHeader
      eyebrow="About Landco"
      title="We make commercial land easy."
      subtitle="Landco owns and operates a portfolio of yards, hardstanding and open storage sites across South England. We've built our model around how operators actually want to work — flexible, fast, and fair."
    />

    {/* Story */}
    <section className="py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="prose prose-slate max-w-none">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mb-5">
            Why we built it this way
          </h2>
          <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
            <p>
              Most commercial land is rented through traditional commercial leases —
              built for big institutions, not for the contractors, scaffolders, hauliers
              and trade businesses who actually need yards.
            </p>
            <p>
              Multi-year terms. Solicitor fees. Schedules of dilapidations. Weeks of
              back-and-forth before you can even unload a vehicle.
            </p>
            <p>
              Landco does it differently. Our sites are offered on simple licence
              agreements — usually rolling monthly after an initial term, with no legal
              fees and no fuss. You see a site, you sign, you move in. That's it.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-landco-dark text-xs font-bold uppercase tracking-[0.2em] mb-3">
            How we work
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900">
            What sets us apart
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-landco-yellowLight text-landco-dark flex items-center justify-center mb-5">
                {value.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                {value.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <TrustStrip />

    {/* CTA */}
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-4">
          Looking for land or selling some?
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          We'd love to hear from you either way.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/enquire"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-landco-yellow hover:bg-landco-yellowHover text-landco-dark font-bold transition-all shadow-md"
          >
            Make an enquiry
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/land-wanted"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold border border-slate-200 transition-all"
          >
            Sell your land
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default About;
