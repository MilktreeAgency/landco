import React, { useState, useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronLeft, ChevronRight, Phone, Mail, Award, Shield, Leaf, Building2 } from 'lucide-react';
import { SiteManager } from '../../types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Extended to include standard div attributes like onClick, className, etc.
export interface EliteComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const GlassPanel: React.FC<EliteComponentProps> = ({ children, className, onClick, ...props }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const PrimaryButton: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={cn(
      "bg-landco-yellow text-landco-dark font-display font-bold px-6 py-3 rounded-lg",
      "hover:scale-[1.02] hover:bg-landco-yellowHover active:scale-[0.98]",
      "transition-all duration-200 shadow-lg shadow-yellow-500/20",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
      "focus:outline-none focus:ring-2 focus:ring-landco-yellow focus:ring-offset-2",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={cn(
      "bg-white text-slate-900 border border-slate-200 font-display font-semibold px-6 py-3 rounded-lg",
      "hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm",
      "focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export const StatusBadge = ({ status }: { status: 'available' | 'occupied' | 'maintenance' }) => {
  const styles = {
    available: "bg-emerald-100 text-emerald-700 border-emerald-200",
    occupied: "bg-red-100 text-red-700 border-red-200",
    maintenance: "bg-orange-100 text-orange-700 border-orange-200",
  };

  const labels = {
    available: "AVAILABLE NOW",
    occupied: "LEASED",
    maintenance: "MAINTENANCE",
  };

  return (
    <span className={cn("px-3 py-1 text-xs font-bold tracking-wider rounded-full border", styles[status])}>
      {labels[status]}
    </span>
  );
};

// Image Carousel Component
interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt,
  className,
  showDots = true,
  showArrows = true,
  autoPlay = false,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoPlay && !isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, interval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, isHovered, images.length, interval]);

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToIndex = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div 
      className={cn("relative w-full h-full overflow-hidden group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      <div 
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${alt} - Image ${idx + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => goToIndex(e, idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                idx === currentIndex 
                  ? "bg-white w-4" 
                  : "bg-white/60 hover:bg-white/80"
              )}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-medium z-10">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Feature Badge Component
interface FeatureBadgeProps {
  type: 'breeam' | 'iso' | 'security' | 'certified' | 'custom';
  label: string;
  variant?: 'light' | 'dark';
  className?: string;
}

const badgeIcons = {
  breeam: Leaf,
  iso: Award,
  security: Shield,
  certified: Award,
  custom: Building2
};

const badgeColors = {
  breeam: { light: 'bg-emerald-50 text-emerald-700 border-emerald-200', dark: 'bg-emerald-900/50 text-emerald-300 border-emerald-700' },
  iso: { light: 'bg-blue-50 text-blue-700 border-blue-200', dark: 'bg-blue-900/50 text-blue-300 border-blue-700' },
  security: { light: 'bg-purple-50 text-purple-700 border-purple-200', dark: 'bg-purple-900/50 text-purple-300 border-purple-700' },
  certified: { light: 'bg-amber-50 text-amber-700 border-amber-200', dark: 'bg-amber-900/50 text-amber-300 border-amber-700' },
  custom: { light: 'bg-slate-50 text-slate-700 border-slate-200', dark: 'bg-slate-900/50 text-slate-300 border-slate-700' }
};

export const FeatureBadge: React.FC<FeatureBadgeProps> = ({ 
  type, 
  label, 
  variant = 'light',
  className 
}) => {
  const Icon = badgeIcons[type];
  const colors = badgeColors[type][variant];

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-full border uppercase",
      colors,
      className
    )}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

// Site Manager Card Component
interface SiteManagerCardProps {
  manager: SiteManager;
  compact?: boolean;
  className?: string;
}

export const SiteManagerCard: React.FC<SiteManagerCardProps> = ({ 
  manager, 
  compact = false,
  className 
}) => {
  if (compact) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <img 
          src={manager.imageUrl} 
          alt={manager.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div>
          <p className="text-sm font-semibold text-slate-900">{manager.name}</p>
          <p className="text-xs text-slate-500">{manager.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-xl p-5 shadow-sm",
      className
    )}>
      <div className="flex items-start gap-4">
        <img 
          src={manager.imageUrl} 
          alt={manager.name}
          className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100 shadow-sm"
        />
        <div className="flex-1">
          <h4 className="font-bold text-slate-900">{manager.name}</h4>
          <p className="text-sm text-slate-500 mb-3">{manager.role}</p>
          
          <div className="space-y-2">
            <a 
              href={`tel:${manager.phone}`}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-landco-dark transition-colors"
            >
              <Phone className="w-4 h-4" />
              {manager.phone}
            </a>
            <a 
              href={`mailto:${manager.email}`}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-landco-dark transition-colors"
            >
              <Mail className="w-4 h-4" />
              {manager.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
  decimals = 0
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const animateValueFn = () => {
      const startTime = performance.now();
      const startValue = 0;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const current = startValue + (value - startValue) * easeOut;
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValueFn();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, value, duration]);

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={elementRef} className={cn("tabular-nums", className)}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

// Loading Skeleton Component
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className,
  variant = 'rectangular'
}) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  return (
    <div 
      className={cn(
        "shimmer",
        variantClasses[variant],
        className
      )}
    />
  );
};

// Tooltip Component
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'top' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={cn(
          "absolute z-50 px-2 py-1 text-xs font-medium text-white bg-slate-900 rounded shadow-lg whitespace-nowrap",
          "animate-fade-in",
          positionClasses[position]
        )}>
          {content}
        </div>
      )}
    </div>
  );
};

// Badge for property tags
interface TagBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'highlight' | 'muted';
  className?: string;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ 
  children, 
  variant = 'default',
  className 
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600 border-slate-200',
    highlight: 'bg-landco-yellowLight text-landco-dark border-landco-yellow/30',
    muted: 'bg-slate-50 text-slate-500 border-slate-100'
  };

  return (
    <span className={cn(
      "text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wide",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
