import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

/**
 * Consistent page header used across new pages (Permitted Uses, Terms & Costs,
 * Locations, About, Enquire). Light, airy, white-led aesthetic.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}) => {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <header className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
      <div className={`max-w-4xl px-6 ${align === 'center' ? 'mx-auto' : 'mx-auto'}`}>
        <div className={`max-w-3xl ${alignment}`}>
          {eyebrow && (
            <span className="inline-block text-landco-dark text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 leading-[1.05] mb-5">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
