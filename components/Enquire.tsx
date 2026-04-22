import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Check,
  Loader2,
  AlertCircle,
  User,
  Building2,
  Layers,
  Ruler,
  CalendarClock,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { PageHeader } from './PageHeader';
import { submitLeadForm } from '../services/formspreeService';
import { CITY_HUBS } from '../types';

interface EnquireFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  useCase: string;
  size: string;
  timeline: string;
  message: string;
}

const initialFormState: EnquireFormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  location: '',
  useCase: '',
  size: '',
  timeline: '',
  message: '',
};

const useCases = [
  'Vehicle / fleet storage',
  'Container or open storage',
  'Plant & machinery',
  'Trade compound',
  'Vehicle sales',
  'Other',
];

const timelines = [
  'ASAP / immediate',
  'Within 1 month',
  '1–3 months',
  'Just exploring',
];

export const Enquire: React.FC = () => {
  const [form, setForm] = useState<EnquireFormState>(initialFormState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submittedName, setSubmittedName] = useState<string>('');

  const update = (key: keyof EnquireFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const sizeNum = parseInt(form.size.replace(/[^0-9]/g, ''), 10) || 0;
    const message = [
      form.message ? `Message: ${form.message}` : '',
      form.useCase ? `Use case: ${form.useCase}` : '',
      form.company ? `Company: ${form.company}` : '',
      form.phone ? `Phone: ${form.phone}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const result = await submitLeadForm({
      storageType: form.useCase || 'General enquiry',
      size: sizeNum,
      timeline: form.timeline || 'Unspecified',
      location: form.location || 'Any',
      email: form.email,
      source: `Enquire Page – ${form.name} – ${message}`,
    });

    if (result.ok) {
      setSubmittedName(form.name);
      setStatus('success');
      setForm(initialFormState);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Make an enquiry"
        subtitle="Tell us a bit about what you need. We'll come back to you the same working day."
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Form card */}
            <div className="lg:col-span-2">
              {status === 'success' ? (
                <SuccessCard
                  firstName={submittedName.split(' ')[0]}
                  onReset={() => {
                    setStatus('idle');
                    setSubmittedName('');
                  }}
                />
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden"
                >
                  <div className="px-6 sm:px-10 pt-8 pb-2">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-landco-dark mb-1.5">
                      Send us a message
                    </p>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                      Tell us about your project
                    </h2>
                    <p className="text-sm text-slate-500 mt-1.5">
                      We'll respond within one working day.
                    </p>
                  </div>

                  <div className="px-6 sm:px-10 py-7 space-y-7">
                    {/* Section: About you */}
                    <Section title="About you" step="1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field
                          label="Your name"
                          icon={<User className="w-4 h-4" />}
                          required
                        >
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={update('name')}
                            className="form-input"
                            placeholder="Jane Smith"
                            autoComplete="name"
                          />
                        </Field>
                        <Field
                          label="Company"
                          icon={<Building2 className="w-4 h-4" />}
                          optional
                        >
                          <input
                            type="text"
                            value={form.company}
                            onChange={update('company')}
                            className="form-input"
                            placeholder="Acme Logistics Ltd"
                            autoComplete="organization"
                          />
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field
                          label="Email"
                          icon={<Mail className="w-4 h-4" />}
                          required
                        >
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={update('email')}
                            className="form-input"
                            placeholder="you@company.com"
                            autoComplete="email"
                          />
                        </Field>
                        <Field
                          label="Phone"
                          icon={<Phone className="w-4 h-4" />}
                          optional
                        >
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={update('phone')}
                            className="form-input"
                            placeholder="07…"
                            autoComplete="tel"
                          />
                        </Field>
                      </div>
                    </Section>

                    <Divider />

                    {/* Section: Requirements */}
                    <Section title="What you're looking for" step="2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field
                          label="Preferred location"
                          icon={<MapPin className="w-4 h-4" />}
                        >
                          <select
                            value={form.location}
                            onChange={update('location')}
                            className="form-input"
                          >
                            <option value="">Any location</option>
                            {CITY_HUBS.map((c) => (
                              <option key={c.slug} value={c.name}>
                                {c.name}, {c.region}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field
                          label="Use case"
                          icon={<Layers className="w-4 h-4" />}
                        >
                          <select
                            value={form.useCase}
                            onChange={update('useCase')}
                            className="form-input"
                          >
                            <option value="">Select a use</option>
                            {useCases.map((u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field
                          label="Approx. size needed"
                          icon={<Ruler className="w-4 h-4" />}
                        >
                          <input
                            type="text"
                            placeholder="e.g. 5,000 sq ft or 0.5 acre"
                            value={form.size}
                            onChange={update('size')}
                            className="form-input"
                          />
                        </Field>
                        <Field
                          label="Timeline"
                          icon={<CalendarClock className="w-4 h-4" />}
                        >
                          <select
                            value={form.timeline}
                            onChange={update('timeline')}
                            className="form-input"
                          >
                            <option value="">Select timeline</option>
                            {timelines.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    </Section>

                    <Divider />

                    {/* Section: Message */}
                    <Section title="Anything else?" step="3">
                      <Field
                        label="Tell us more"
                        icon={<MessageSquare className="w-4 h-4" />}
                        optional
                      >
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={update('message')}
                          className="form-input resize-none"
                          placeholder="Vehicles, equipment, access requirements, etc."
                        />
                      </Field>
                    </Section>

                    {status === 'error' && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{errorMsg}</p>
                      </div>
                    )}
                  </div>

                  <footer className="px-6 sm:px-10 py-5 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs text-slate-500 leading-relaxed sm:max-w-[18rem]">
                      We respond to all enquiries within one working day.
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-landco-yellow hover:bg-landco-yellowHover disabled:opacity-60 disabled:cursor-not-allowed text-landco-dark font-bold transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          Send enquiry <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </footer>
                </form>
              )}
            </div>

            {/* Sidebar contact info */}
            <aside className="lg:col-span-1">
              <div className="bg-slate-900 text-white rounded-2xl p-7 sticky top-28 shadow-sm">
                <h3 className="font-display font-bold text-xl mb-1">
                  Prefer to talk?
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  Our team are available Monday to Friday, 9am–5:30pm.
                </p>

                <div className="space-y-4 mb-8">
                  <a
                    href="tel:+442380123456"
                    className="flex items-start gap-3 hover:text-landco-yellow transition-colors group"
                  >
                    <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-landco-yellow group-hover:text-landco-dark transition-colors flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                        Phone
                      </p>
                      <p className="font-semibold">+44 (0) 23 8012 3456</p>
                    </div>
                  </a>
                  <a
                    href="mailto:enquiries@landco.co.uk"
                    className="flex items-start gap-3 hover:text-landco-yellow transition-colors group"
                  >
                    <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-landco-yellow group-hover:text-landco-dark transition-colors flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                        Email
                      </p>
                      <p className="font-semibold">enquiries@landco.co.uk</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                        Coverage
                      </p>
                      <p className="font-semibold">South England</p>
                      <p className="text-sm text-slate-400">
                        Hampshire · Wiltshire · Somerset · Surrey
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-slate-400 mb-3">
                    Already know what you need?
                  </p>
                  <Link
                    to="/sites"
                    className="inline-flex items-center gap-1.5 text-landco-yellow font-bold hover:underline"
                  >
                    Browse available sites <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

interface SectionProps {
  title: string;
  step: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, step, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-landco-yellow/20 text-landco-dark text-xs font-bold">
        {step}
      </span>
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
        {title}
      </h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Divider = () => <div className="border-t border-slate-100" />;

interface FieldProps {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({
  label,
  icon,
  required,
  optional,
  children,
}) => (
  <label className="block">
    <span className="flex items-center justify-between mb-1.5 gap-3">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 whitespace-nowrap">
        {icon && <span className="text-slate-400">{icon}</span>}
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {optional && (
        <span className="text-xs text-slate-400 font-normal">Optional</span>
      )}
    </span>
    {children}
  </label>
);

const SuccessCard: React.FC<{ firstName: string; onReset: () => void }> = ({
  firstName,
  onReset,
}) => (
  <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-8 sm:p-12 text-center animate-fade-in">
    <div className="w-16 h-16 mx-auto rounded-full bg-landco-security/15 text-landco-security flex items-center justify-center mb-5">
      <Check className="w-8 h-8" strokeWidth={2.5} />
    </div>
    <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-3">
      Enquiry received
    </h2>
    <p className="text-slate-600 leading-relaxed mb-2 max-w-md mx-auto">
      Thanks {firstName || 'for getting in touch'} — we've got your message and a member
      of the team will be in touch{' '}
      <span className="font-semibold text-slate-900">within one working day</span>.
    </p>
    <p className="text-sm text-slate-500 mb-8">
      In the meantime, feel free to browse our available sites.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link
        to="/sites"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-landco-yellow hover:bg-landco-yellowHover text-landco-dark font-bold transition-all shadow-sm hover:shadow-md"
      >
        Browse available sites <ArrowRight className="w-4 h-4" />
      </Link>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
      >
        Send another enquiry
      </button>
    </div>
  </div>
);

export default Enquire;
