import React, { useState } from 'react';
import { GlassPanel, PrimaryButton, SecondaryButton } from './ui/EliteComponents';
import { QrCode, Download, ShieldCheck, Activity, Video, Lock, Plus, FileText, CreditCard, Bell, Settings, ChevronRight, Clock, CheckCircle, AlertCircle, RefreshCw, Smartphone, Key, MapPin, Truck } from 'lucide-react';

export const Dashboard = () => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerateQr = () => {
    setShowQrModal(true);
    setTimeout(() => setQrGenerated(true), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-landco-security/10 text-landco-security border border-landco-security/20 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-landco-security animate-pulse" />
                ACTIVE LICENSE
              </span>
              <span className="text-slate-400 text-sm">•</span>
              <span className="text-slate-500 text-sm font-medium">License #LND-2024-4521</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-2">
              Welcome back, <span className="text-slate-400">Logistics Corp.</span>
            </h1>
            <p className="text-slate-500 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Unit 4B, Southampton Docks Hub • Plot SW-01
            </p>
          </div>
          <div className="flex gap-3">
            <SecondaryButton className="flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4" /> Settings
            </SecondaryButton>
            <PrimaryButton onClick={handleGenerateQr} className="flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Generate Access Code
            </PrimaryButton>
          </div>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <QuickAction 
            icon={<QrCode className="w-6 h-6" />}
            label="Entry Code"
            description="Generate new QR"
            onClick={handleGenerateQr}
          />
          <QuickAction 
            icon={<Download className="w-6 h-6" />}
            label="Download Invoice"
            description="December 2024"
          />
          <QuickAction 
            icon={<Plus className="w-6 h-6" />}
            label="Request Space"
            description="Expand your plot"
          />
          <QuickAction 
            icon={<FileText className="w-6 h-6" />}
            label="Documents"
            description="License & policies"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Status Panel */}
          <GlassPanel className="col-span-1 lg:col-span-2 p-0 relative overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-landco-yellow" /> Live Site Status
              </h2>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Updated 2 min ago
              </span>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gate Status */}
              <StatusCard 
                icon={<Lock className="w-5 h-5" />}
                title="Main Gate"
                status="LOCKED"
                statusColor="emerald"
                details={[
                  { label: "Last entry", value: "14:02 today" },
                  { label: "Vehicle", value: "HGV reg: XY71 ABC" }
                ]}
              />
              
              {/* CCTV Status */}
              <StatusCard 
                icon={<Video className="w-5 h-5" />}
                title="CCTV System"
                status="ONLINE"
                statusColor="emerald"
                details={[
                  { label: "Quality", value: "Recording HD" },
                  { label: "Cameras", value: "4 Active" }
                ]}
              />

              {/* Access Control */}
              <StatusCard 
                icon={<Key className="w-5 h-5" />}
                title="Access Control"
                status="ARMED"
                statusColor="emerald"
                details={[
                  { label: "Active codes", value: "3 users" },
                  { label: "Next expiry", value: "15 Jan 2025" }
                ]}
              />

              {/* Perimeter */}
              <StatusCard 
                icon={<ShieldCheck className="w-5 h-5" />}
                title="Perimeter"
                status="SECURE"
                statusColor="emerald"
                details={[
                  { label: "Sensors", value: "All nominal" },
                  { label: "Last patrol", value: "22:00 yesterday" }
                ]}
              />
            </div>

            {/* Live Feed Preview */}
            <div className="p-6 pt-0">
              <div className="h-48 bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden group cursor-pointer">
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] text-white font-mono bg-black/50 px-2 py-0.5 rounded">LIVE FEED - CAM 01</span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop&sat=-100" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
                  alt="CCTV Feed" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-landco-yellow" />
                    <span className="text-xs text-white font-medium">Stream encrypted • Click to expand</span>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] text-white/60 font-mono">
                  28/12/2024 • 14:32:05
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Financials */}
            <GlassPanel className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-slate-400" /> Financials
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-slate-500 text-sm">Next Invoice</span>
                    <p className="text-2xl font-bold text-slate-900">£2,200.00</p>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold">
                    Due in 4 days
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Due Date</span>
                  <span className="text-slate-900 font-semibold">01 Jan 2025</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Payment Method</span>
                  <span className="text-slate-900 font-semibold">Direct Debit</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">YTD Payments</span>
                  <span className="text-slate-900 font-semibold">£26,400.00</span>
                </div>

                <SecondaryButton className="w-full flex items-center justify-center gap-2 mt-2 text-sm">
                  <Download className="w-4 h-4" /> Download Statement
                </SecondaryButton>
              </div>
            </GlassPanel>

            {/* Upsell */}
            <GlassPanel className="p-6 bg-gradient-to-br from-landco-yellowLight to-white border-landco-yellow/20">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-landco-yellow/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-landco-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Expand Your Space</h3>
                  <p className="text-sm text-slate-500">Plot SW-02 adjacent to your unit</p>
                </div>
              </div>
              
              <div className="bg-white/60 rounded-lg p-3 mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Additional space</span>
                  <span className="font-semibold text-slate-900">5,000 sq ft</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Monthly rate</span>
                  <span className="font-semibold text-slate-900">£950/mo</span>
                </div>
              </div>
              
              <button className="text-slate-900 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                Check Availability <ChevronRight className="w-4 h-4" />
              </button>
            </GlassPanel>

            {/* Recent Activity */}
            <GlassPanel className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-slate-400" /> Recent Activity
              </h2>
              
              <div className="space-y-3">
                <ActivityItem 
                  icon={<Truck className="w-4 h-4" />}
                  title="Vehicle Entry"
                  time="2 hours ago"
                  description="HGV XY71 ABC accessed via Gate 1"
                />
                <ActivityItem 
                  icon={<CheckCircle className="w-4 h-4 text-landco-security" />}
                  title="Payment Received"
                  time="3 days ago"
                  description="December invoice - £2,200.00"
                />
                <ActivityItem 
                  icon={<Key className="w-4 h-4" />}
                  title="Access Code Generated"
                  time="1 week ago"
                  description="Temporary access for contractor"
                />
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <GlassPanel className="w-full max-w-md p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-landco-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-landco-dark" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Site Access Code</h3>
              <p className="text-slate-500 text-sm">
                Scan this QR code at the main gate for entry
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 mb-6">
              {qrGenerated ? (
                <div className="space-y-4">
                  {/* Simulated QR Code */}
                  <div className="w-48 h-48 mx-auto bg-slate-900 rounded-xl flex items-center justify-center relative">
                    <div className="absolute inset-4 grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}
                        />
                      ))}
                    </div>
                    <QrCode className="w-12 h-12 text-landco-yellow absolute" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Access Code</p>
                    <p className="font-mono text-2xl font-bold text-slate-900">LND-4521-QR</p>
                  </div>
                </div>
              ) : (
                <div className="w-48 h-48 mx-auto flex items-center justify-center">
                  <div className="animate-spin">
                    <RefreshCw className="w-8 h-8 text-slate-400" />
                  </div>
                </div>
              )}
            </div>

            {qrGenerated && (
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Valid for</span>
                  <span className="font-semibold text-slate-900">24 hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Expires</span>
                  <span className="font-semibold text-slate-900">29 Dec 2024, 14:32</span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <SecondaryButton 
                onClick={() => {
                  setShowQrModal(false);
                  setQrGenerated(false);
                }}
                className="flex-1"
              >
                Close
              </SecondaryButton>
              {qrGenerated && (
                <PrimaryButton className="flex-1 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Save
                </PrimaryButton>
              )}
            </div>
          </GlassPanel>
        </div>
      )}
    </div>
  );
};

// Quick Action Component
const QuickAction = ({ icon, label, description, onClick }: { 
  icon: React.ReactNode; 
  label: string; 
  description: string;
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className="bg-white border border-slate-200 rounded-xl p-5 text-left hover:border-landco-yellow hover:shadow-md transition-all group"
  >
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-landco-yellow/10 transition-colors">
      <div className="text-slate-400 group-hover:text-landco-dark transition-colors">
        {icon}
      </div>
    </div>
    <h3 className="font-bold text-slate-900">{label}</h3>
    <p className="text-sm text-slate-500">{description}</p>
  </button>
);

// Status Card Component
const StatusCard = ({ icon, title, status, statusColor, details }: {
  icon: React.ReactNode;
  title: string;
  status: string;
  statusColor: 'emerald' | 'amber' | 'red';
  details: { label: string; value: string }[];
}) => {
  const colors = {
    emerald: 'text-landco-security',
    amber: 'text-amber-500',
    red: 'text-red-500'
  };

  return (
    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="text-slate-400">{icon}</div>
          <span className="text-slate-600 font-medium">{title}</span>
        </div>
        <div className={colors[statusColor]}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-3">{status}</div>
      <div className="space-y-1">
        {details.map((detail, idx) => (
          <div key={idx} className="flex justify-between text-xs">
            <span className="text-slate-400">{detail.label}</span>
            <span className="text-slate-600 font-medium">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ icon, title, time, description }: {
  icon: React.ReactNode;
  title: string;
  time: string;
  description: string;
}) => (
  <div className="flex gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-400">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium text-slate-900 text-sm truncate">{title}</p>
        <span className="text-xs text-slate-400 flex-shrink-0">{time}</span>
      </div>
      <p className="text-xs text-slate-500 truncate">{description}</p>
    </div>
  </div>
);
