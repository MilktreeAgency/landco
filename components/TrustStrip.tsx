import React from 'react';
import { Zap, FileX, Sliders } from 'lucide-react';

const items = [
  { icon: <Zap className="w-5 h-5" />, text: 'Move in same day' },
  { icon: <FileX className="w-5 h-5" />, text: 'No solicitor fees' },
  { icon: <Sliders className="w-5 h-5" />, text: 'Flexible terms' },
];

interface TrustStripProps {
  variant?: 'light' | 'dark';
}

/**
 * Reusable trust badges band used on the homepage, Terms & Costs page and
 * other key pages. Communicates the three core promises.
 */
export const TrustStrip: React.FC<TrustStripProps> = ({ variant = 'light' }) => {
  const isDark = variant === 'dark';
  return (
    <section
      className={`py-8 sm:py-10 border-y ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-white'
          : 'bg-white border-slate-100 text-slate-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-16">
          {items.map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-full ${
                  isDark
                    ? 'bg-landco-yellow text-landco-dark'
                    : 'bg-landco-yellowLight text-landco-dark'
                }`}
              >
                {item.icon}
              </span>
              <span className="font-semibold text-sm sm:text-base tracking-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
