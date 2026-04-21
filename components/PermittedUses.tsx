import React from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  Wrench,
  Car,
  Container,
  HardHat,
  Shapes,
  ArrowRight,
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { TrustStrip } from './TrustStrip';

const useCases = [
  {
    icon: <Truck className="w-7 h-7" />,
    title: 'Scaffolding & vehicle storage',
    description:
      'Secure parking and gated yards for scaffold trucks, HGVs, vans and operational fleets.',
  },
  {
    icon: <Wrench className="w-7 h-7" />,
    title: 'Plant & machinery',
    description:
      'Hardstanding suitable for plant equipment, generators, and heavy machinery.',
  },
  {
    icon: <Car className="w-7 h-7" />,
    title: 'Vehicle sales & display',
    description:
      'High-visibility, roadside-frontage land for car sales, vehicle display and forecourts.',
  },
  {
    icon: <Container className="w-7 h-7" />,
    title: 'Container & open storage',
    description:
      'Space for shipping containers, cabins, materials and general open storage needs.',
  },
  {
    icon: <HardHat className="w-7 h-7" />,
    title: 'Trade & contractor compounds',
    description:
      'Working compounds for builders, civils, utilities and tradespeople — site offices welcome.',
  },
  {
    icon: <Shapes className="w-7 h-7" />,
    title: 'Other commercial uses',
    description:
      'Have something else in mind? Many of our sites can flex to your specific use case — just ask.',
  },
];

export const PermittedUses: React.FC = () => (
  <>
    <PageHeader
      eyebrow="What our sites are for"
      title="Permitted uses"
      subtitle="Our yards and open storage land are licensed for a wide range of commercial uses. Here's what works on most sites."
    />

    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-landco-yellow/50 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-landco-yellowLight text-landco-dark flex items-center justify-center mb-5">
                {useCase.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2 leading-snug">
                {useCase.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <TrustStrip />

    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-4">
          Different use case?
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          We work with operators across many industries. Tell us what you need and we'll
          let you know what's possible.
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
            to="/sites"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold border border-slate-200 transition-all"
          >
            Browse available sites
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default PermittedUses;
