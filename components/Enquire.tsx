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
      setStatus('success');
      setForm(initialFormState);
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

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-2">
              {status === 'success' ? (
                <div className="bg-white border border-landco-security/30 rounded-2xl p-10 text-center shadow-sm">
                  <div className="w-16 h-16 mx-auto rounded-full bg-landco-security/15 flex items-center justify-center mb-5">
                    <Check className="w-8 h-8 text-landco-security" strokeWidth={3} />
                  </div>
                  <h3 className="font-display font-black text-2xl text-slate-900 mb-2">
                    Enquiry received
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Thanks — we'll come back to you within one working day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-landco-dark font-bold hover:underline"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Your name" required>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={update('name')}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Company (optional)">
                      <input
                        type="text"
                        value={form.company}
                        onChange={update('company')}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Email" required>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={update('email')}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Phone (optional)">
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Preferred location">
                      <select
                        value={form.location}
                        onChange={update('location')}
                        className={inputCls}
                      >
                        <option value="">Any location</option>
                        {CITY_HUBS.map((c) => (
                          <option key={c.slug} value={c.name}>
                            {c.name}, {c.region}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Use case">
                      <select
                        value={form.useCase}
                        onChange={update('useCase')}
                        className={inputCls}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Approx. size needed">
                      <input
                        type="text"
                        placeholder="e.g. 5,000 sq ft or 0.5 acre"
                        value={form.size}
                        onChange={update('size')}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Timeline">
                      <select
                        value={form.timeline}
                        onChange={update('timeline')}
                        className={inputCls}
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

                  <Field label="Anything else we should know?">
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      className={`${inputCls} resize-none`}
                      placeholder="Vehicles, equipment, access requirements, etc."
                    />
                  </Field>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-landco-yellow hover:bg-landco-yellowHover disabled:opacity-60 disabled:cursor-not-allowed text-landco-dark font-bold transition-all shadow-md hover:shadow-lg"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar contact info */}
            <aside className="lg:col-span-1">
              <div className="bg-slate-900 text-white rounded-2xl p-7 sticky top-28">
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
                    Browse available sites →
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

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-landco-yellow/40 focus:border-landco-yellow transition-all';

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="block text-sm font-semibold text-slate-700 mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </span>
    {children}
  </label>
);

export default Enquire;
