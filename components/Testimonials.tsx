import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  businessType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Mitchell",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    rating: 5,
    date: "2 weeks ago",
    text: "Exceptional service from start to finish. The Lands Co team helped us find the perfect yard for our construction business in Southampton. The site manager is always available and the facilities are top-notch. Highly recommended!",
    businessType: "Construction Company Owner"
  },
  {
    id: 2,
    name: "Sarah Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    date: "1 month ago",
    text: "We've been renting from Lands Co for over a year now and couldn't be happier. The security is excellent, the location is perfect for our logistics operations, and the process was incredibly smooth. Worth every penny!",
    businessType: "Logistics Manager"
  },
  {
    id: 3,
    name: "David Richardson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 5,
    date: "3 weeks ago",
    text: "Outstanding experience! The viewing process was seamless, and they understood exactly what we needed for our plant machinery storage. The site is secure, well-maintained, and the access is brilliant. Can't fault them.",
    businessType: "Plant Hire Director"
  },
  {
    id: 4,
    name: "Emma Clarke",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    rating: 5,
    date: "2 months ago",
    text: "Professional, responsive, and genuinely helpful. We needed space urgently for our fleet and Lands Co delivered. The whole team went above and beyond to accommodate our timeline. First-class service all around!",
    businessType: "Fleet Operations Manager"
  },
  {
    id: 5,
    name: "Michael Bennett",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5,
    date: "1 week ago",
    text: "After looking at several options, Lands Co stood out for their transparency and quality. The yard we rent in Portsmouth is perfect for our needs. Great communication and no hidden surprises. Definitely recommend!",
    businessType: "Scaffolding Business Owner"
  },
  {
    id: 6,
    name: "Rachel Foster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
    rating: 5,
    date: "3 weeks ago",
    text: "Brilliant service! We needed secure storage for our vehicles and equipment, and Lands Co provided exactly what we were looking for. The site is immaculate, and the team is always just a phone call away. Very impressed!",
    businessType: "Transport Manager"
  }
];

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;
  
  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1);
  const totalReviews = testimonials.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsToShow >= testimonials.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - itemsToShow) : prev - 1
    );
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsToShow);
  
  // If we don't have enough items, loop back to beginning
  if (visibleTestimonials.length < itemsToShow) {
    visibleTestimonials.push(...testimonials.slice(0, itemsToShow - visibleTestimonials.length));
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GoogleIcon />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
              Google Reviews
            </h2>
          </div>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-6 h-6 fill-yellow-400 text-yellow-400" 
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-slate-900">{averageRating}</span>
          </div>
          
          <p className="text-slate-600">
            Based on <span className="font-semibold">{totalReviews} reviews</span>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-landco-yellow"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-landco-yellow"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {testimonial.businessType}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">{testimonial.date}</span>
                </div>

                {/* Review Text */}
                <div className="relative flex-1">
                  <Quote className="absolute -top-1 -left-1 w-8 h-8 text-slate-200" />
                  <p className="text-slate-600 leading-relaxed relative z-10 pl-6">
                    {testimonial.text}
                  </p>
                </div>

                {/* Google Badge */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                  <GoogleIcon />
                  <span className="text-xs font-medium text-slate-500">
                    Posted on Google
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(Math.max(1, testimonials.length - itemsToShow + 1))].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                idx === currentIndex 
                  ? 'bg-landco-yellow w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-slate-600 mb-4">
            Join hundreds of satisfied businesses trusting Lands Co
          </p>
          <a
            href="https://www.google.com/maps/place/Landco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <GoogleIcon />
            View all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

