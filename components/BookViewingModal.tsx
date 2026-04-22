import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, Check, Loader2, AlertCircle } from 'lucide-react';
import { Yard } from '../types';
import { submitViewingRequest } from '../services/formspreeService';

interface BookViewingModalProps {
  property: Yard;
  open: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '09:00 – 10:00',
  '10:00 – 11:00',
  '11:00 – 12:00',
  '12:00 – 13:00',
  '13:00 – 14:00',
  '14:00 – 15:00',
  '15:00 – 16:00',
  '16:00 – 17:00',
];

/**
 * Returns tomorrow's date as YYYY-MM-DD in the user's local timezone.
 * Used as the minimum bookable date (enforces the 24-hour lead time).
 */
const getMinDateString = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const formatHumanDate = (iso: string): string => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const BookViewingModal: React.FC<BookViewingModalProps> = ({
  property,
  open,
  onClose,
}) => {
  const minDate = getMinDateString();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll + handle ESC while open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setTimeSlot('');
      setNotes('');
      setSubmitting(false);
      setSubmitted(false);
      setError(null);
    }, 300);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const validate = (): string | null => {
    if (!name.trim()) return 'Please enter your name.';
    if (!email.trim()) return 'Please enter your email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email.';
    if (!phone.trim()) return 'Please enter a phone number so we can confirm.';
    if (!date) return 'Please choose a preferred date.';
    if (date < minDate) return 'Viewings must be booked at least 24 hours in advance.';
    if (!timeSlot) return 'Please choose a preferred time slot.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setSubmitting(true);
    const res = await submitViewingRequest({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredDate: date,
      preferredTimeSlot: timeSlot,
      notes: notes.trim() || undefined,
    });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error || 'Something went wrong. Please try again.');
      return;
    }
    setSubmitted(true);
  };

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-viewing-title"
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md sm:max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-landco-security/15 text-landco-security flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8" />
            </div>
            <h2
              id="book-viewing-title"
              className="font-display font-black text-2xl sm:text-3xl text-slate-900 mb-3"
            >
              Viewing request received
            </h2>
            <p className="text-slate-600 leading-relaxed mb-2">
              Thanks {name.split(' ')[0]} — we've got your request for{' '}
              <span className="font-semibold text-slate-900">{property.title}</span>.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              A member of the team will be in touch within{' '}
              <span className="font-semibold text-slate-900">24 hours</span> to confirm
              your viewing on{' '}
              <span className="font-semibold text-slate-900">{formatHumanDate(date)}</span>{' '}
              at <span className="font-semibold text-slate-900">{timeSlot}</span>.
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-landco-yellow hover:bg-landco-yellowHover text-landco-dark font-bold transition-all shadow-sm hover:shadow-md"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh]">
            <header className="px-6 sm:px-10 pt-7 pb-5 border-b border-slate-100 pr-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-landco-dark mb-1.5">
                Schedule a viewing
              </p>
              <h2
                id="book-viewing-title"
                className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight"
              >
                {property.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{property.location}</p>
            </header>

            <div className="px-6 sm:px-10 py-6 sm:py-7 space-y-5 overflow-y-auto">
              <Field label="Your name" icon={<User className="w-4 h-4" />} required>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Jane Smith"
                  autoComplete="name"
                  required
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email" icon={<Mail className="w-4 h-4" />} required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                  />
                </Field>
                <Field label="Phone" icon={<Phone className="w-4 h-4" />} required>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    placeholder="07…"
                    autoComplete="tel"
                    required
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Preferred date"
                  icon={<Calendar className="w-4 h-4" />}
                  hintBelow="Bookings require at least 24 hours' notice"
                  required
                >
                  <input
                    type="date"
                    value={date}
                    min={minDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                    required
                  />
                </Field>
                <Field label="Time slot" icon={<Clock className="w-4 h-4" />} required>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Notes (optional)" icon={<MessageSquare className="w-4 h-4" />}>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="form-input resize-none"
                  placeholder="Anything we should know before the viewing?"
                />
              </Field>

              {error && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <footer className="px-6 sm:px-10 py-5 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-slate-500 leading-relaxed sm:max-w-[14rem]">
                We'll confirm your viewing within 24 hours.
              </p>
              <div className="flex gap-2 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-landco-yellow hover:bg-landco-yellowHover disabled:opacity-60 disabled:cursor-not-allowed text-landco-dark font-bold transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>Request viewing</>
                  )}
                </button>
              </div>
            </footer>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

interface FieldProps {
  label: string;
  icon?: React.ReactNode;
  hint?: string;
  hintBelow?: string;
  required?: boolean;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({
  label,
  icon,
  hint,
  hintBelow,
  required,
  children,
}) => (
  <label className="block">
    <span className="flex items-center justify-between mb-1.5 gap-3">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 whitespace-nowrap">
        {icon && <span className="text-slate-400">{icon}</span>}
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {hint && <span className="text-xs text-slate-400 whitespace-nowrap">{hint}</span>}
    </span>
    {children}
    {hintBelow && (
      <span className="block text-xs text-slate-400 mt-1.5">{hintBelow}</span>
    )}
  </label>
);

export default BookViewingModal;
