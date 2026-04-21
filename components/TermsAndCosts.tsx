import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Minus, ArrowRight } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { TrustStrip } from './TrustStrip';

const principles = [
  {
    number: '01',
    title: 'Flexible licences',
    description:
      'Most of our sites are offered on a simple licence agreement, typically rolling monthly after an initial term — no long lock-ins.',
  },
  {
    number: '02',
    title: 'No solicitor fees',
    description:
      'Licences are signed directly between you and Landco. No legal fees, no waiting weeks for paperwork to clear.',
  },
  {
    number: '03',
    title: 'No other legal fees',
    description:
      'No surveyor or agent fees added on. The price you see is what you pay — straightforward and transparent.',
  },
  {
    number: '04',
    title: 'Business rates',
    description:
      'Many of our open storage sites fall outside business rates entirely. We confirm the position on every site upfront.',
  },
];

const licenceVsLease = {
  licence: {
    title: 'Licence agreement',
    tag: 'How we work',
    items: [
      { ok: true, text: 'Move in same day, in many cases' },
      { ok: true, text: 'No solicitor fees' },
      { ok: true, text: 'Rolling monthly after initial term' },
      { ok: true, text: 'Single, transparent monthly payment' },
      { ok: true, text: 'Simple to scale up or down' },
    ],
  },
  lease: {
    title: 'Commercial lease',
    tag: 'The traditional alternative',
    items: [
      { ok: false, text: 'Weeks of negotiation and legal back-and-forth' },
      { ok: false, text: 'Solicitor fees on both sides' },
      { ok: false, text: 'Multi-year fixed terms with break clauses' },
      { ok: false, text: 'Schedule of dilapidations at exit' },
      { ok: false, text: 'Stamp duty and registration costs' },
    ],
  },
};

export const TermsAndCosts: React.FC = () => (
  <>
    <PageHeader
      eyebrow="How it works"
      title="Terms & costs"
      subtitle="Simple, modern licence agreements. No solicitors. No hidden fees. No drawn-out negotiation."
    />

    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((principle) => (
            <div
              key={principle.number}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7"
            >
              <p className="font-display font-black text-3xl text-landco-yellow mb-3 leading-none">
                {principle.number}
              </p>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                {principle.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Licence vs Lease */}
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-3">
            Licence vs. commercial lease
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The difference between getting on site this week versus this quarter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Licence card (highlighted) */}
          <div className="bg-white rounded-2xl border-2 border-landco-yellow shadow-lg p-7 sm:p-8 relative">
            <span className="absolute top-0 right-6 -translate-y-1/2 inline-block px-3 py-1 rounded-full bg-landco-yellow text-landco-dark text-xs font-bold uppercase tracking-wider">
              {licenceVsLease.licence.tag}
            </span>
            <h3 className="font-display font-black text-2xl text-slate-900 mb-5">
              {licenceVsLease.licence.title}
            </h3>
            <ul className="space-y-3">
              {licenceVsLease.licence.items.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-landco-security/15 text-landco-security flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <span className="text-slate-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lease card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-8">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
              {licenceVsLease.lease.tag}
            </span>
            <h3 className="font-display font-bold text-2xl text-slate-700 mb-5">
              {licenceVsLease.lease.title}
            </h3>
            <ul className="space-y-3">
              {licenceVsLease.lease.items.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mt-0.5">
                    <Minus className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <span className="text-slate-500">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <TrustStrip />

    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-4">
          Ready to move in?
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Pick a site, send us a quick enquiry, and we'll have you on the ground in days
          not months.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/sites"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-landco-yellow hover:bg-landco-yellowHover text-landco-dark font-bold transition-all shadow-md"
          >
            Browse available sites
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/enquire"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold border border-slate-200 transition-all"
          >
            Make an enquiry
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default TermsAndCosts;
