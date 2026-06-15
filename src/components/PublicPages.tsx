import React, { useState } from 'react';
import { 
  Shield, CheckCircle, Flame, Calendar, Users, Briefcase, ChevronRight, 
  Map, DollarSign, Clock, FileCheck, Smartphone, Send, Star, HelpCircle, 
  MapPin, Phone, Mail, Award, Key, Car, Check, X, ClipboardList
} from 'lucide-react';
import { Driver, Business, Vehicle, Job } from '../types';
import { useI18n } from '../i18n';

interface PublicPagesProps {
  currentTab: string;
  onJoinAsDriver: () => void;
  onJoinAsBusiness: () => void;
  vehicles: Vehicle[];
  onApplyForRental: (vehicleId: string) => void;
}

export default function PublicPages({
  currentTab,
  onJoinAsDriver,
  onJoinAsBusiness,
  vehicles,
  onApplyForRental
}: PublicPagesProps) {
  const { t } = useI18n();

  // Interactive Earnings Calculator State
  const [calcVehicle, setCalcVehicle] = useState<'scooter' | 'bike' | 'car' | 'van'>('scooter');
  const [calcHours, setCalcHours] = useState<number>(35);

  // Form States
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Driver Inquiry', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Earnings calculations values (Croatian market approximations in EUR)
  const hourlyRates = {
    scooter: 11.5, // Wolt/Bolt avg
    bike: 9.8,     // Food delivery
    car: 14.0,     // Bolt Taxi
    van: 18.5      // B2B Cargo
  };

  const calculateEarnings = () => {
    const grossWeekly = hourlyRates[calcVehicle] * calcHours;
    const grossMonthly = grossWeekly * 4.33;
    const agencyCommissionFee = grossMonthly * 0.08; // 8% CargoElectra agency cut
    const estimatedNetPay = grossMonthly - agencyCommissionFee - (grossMonthly * 0.15); // Less approx taxes + agency
    return {
      grossWeekly: Math.round(grossWeekly),
      grossMonthly: Math.round(grossMonthly),
      commission: Math.round(agencyCommissionFee),
      net: Math.round(estimatedNetPay)
    };
  };

  const earnings = calculateEarnings();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactForm({ name: '', email: '', subject: 'Driver Inquiry', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="bg-black text-white w-full select-none">
      
      {/* 1. DYNAMIC STATS STRIP / SCROLL INDICATOR */}
      {currentTab === 'home' && (
        <div className="border-y border-white/5 bg-[#050811] py-10 overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,217,224,0.02)_1px,transparent_1px)] bg-[size:100%_28px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="stat-cell stat-tick pl-4 flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500 mb-2">{t(`home.stat${n}.label`)}</span>
                  <span className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-white font-tech leading-none">{t(`home.stat${n}.value`)}</span>
                  <span className="text-[11px] text-slate-500 mt-2 font-light">{t(`home.stat${n}.sub`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RENDER PAGES CONDITIONALLY */}

      {/* ==================== HOME PAGE: SECTIONS ==================== */}
      {currentTab === 'home' && (
        <>
          <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <span className="kicker kicker--center">{t('home.flow.tag')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-5 font-tech">{t('home.flow.title.a')}<span className="text-[#19D9E0]">{t('home.flow.title.hl')}</span>{t('home.flow.title.b')}</h2>
              <p className="text-slate-400 font-light mt-4 leading-relaxed">{t('home.flow.desc')}</p>
            </div>

            <div className="relative">
              {/* connecting circuit spine (desktop) */}
              <div className="hidden md:block step-spine absolute top-[58px] left-[16%] right-[16%] h-px" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
                {[
                  { n: '01', Icon: ClipboardList, title: 'home.flow.s1.title', desc: 'home.flow.s1.desc' },
                  { n: '02', Icon: Key, title: 'home.flow.s2.title', desc: 'home.flow.s2.desc' },
                  { n: '03', Icon: CheckCircle, title: 'home.flow.s3.title', desc: 'home.flow.s3.desc' },
                ].map(({ n, Icon, title, desc }) => (
                  <div key={n} className="step-card p-8 pt-7 group">
                    <div className="flex items-start justify-between mb-7">
                      <div className="relative z-10 p-3 bg-[#050b16] border border-[#19D9E0]/25 rounded-xl w-fit text-[#19D9E0] shadow-[0_0_18px_-6px_rgba(25,217,224,0.6)] group-hover:shadow-[0_0_24px_-4px_rgba(25,217,224,0.8)] transition-shadow">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="step-index text-6xl select-none">{n}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-tech tracking-tight">{t(title)}</h3>
                    <p className="text-slate-400 text-sm font-light leading-relaxed">{t(desc)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BRANDS WE OPERATE ON */}
          <section className="py-16 bg-[#040812] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#19D9E0] block mb-8">{t('home.brands.tag')}</span>
              <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="text-2xl font-black tracking-widest text-[#19D9E0] font-display">WOLT <span className="text-white">FLEET</span></div>
                <div className="text-2xl font-black tracking-wider text-[#B4E61E] font-display">GLOVO <span className="text-white">FLEET</span></div>
                <div className="text-2xl font-semibold tracking-tight text-white font-display">ZAGREB <span className="text-[#19D9E0] font-display font-black">· SPLIT · RIJEKA</span></div>
              </div>
            </div>
          </section>

          {/* SERVICES PREVIEW */}
          <section id="services-preview" className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="kicker">{t('home.svc.tag')}</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-5 font-tech">{t('home.svc.title')}</h2>
              </div>
              <p className="text-slate-400 font-light max-w-md mt-4 md:mt-0">
                {t('home.svc.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {[
                { k: 'home.svc1.kicker', title: 'home.svc1.title', desc: 'home.svc1.desc' },
                { k: 'home.svc2.kicker', title: 'home.svc2.title', desc: 'home.svc2.desc' },
                { k: 'home.svc3.kicker', title: 'home.svc3.title', desc: 'home.svc3.desc' },
              ].map((s) => (
                <div key={s.k} className="step-card group p-8 flex flex-col">
                  <span className="text-[10px] font-mono text-[#19D9E0] tracking-[0.18em] uppercase">{t(s.k)}</span>
                  <h3 className="text-xl font-semibold text-white mt-4 mb-3 font-tech tracking-tight">{t(s.title)}</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-7 flex-1">
                    {t(s.desc)}
                  </p>
                  <div className="w-10 h-10 rounded-full border border-[#19D9E0]/25 flex items-center justify-center text-[#19D9E0] group-hover:bg-[#19D9E0] group-hover:text-black group-hover:shadow-[0_0_18px_rgba(25,217,224,0.5)] transition-all duration-300">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* TESTIMONIALS & TRUST */}
          <section className="py-24 bg-gradient-to-b from-black to-[#050912]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#19D9E0]">{t('home.test.tag')}</span>
                  <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mt-4">{t('home.test.title')}</h2>
                  <p className="text-gray-400 font-light mt-4 leading-relaxed">
                    {t('home.test.desc')}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="liquid-glass border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-1 text-[#19D9E0] mb-3 text-xs">
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                    </div>
                    <p className="text-sm text-gray-300 font-light leading-relaxed italic mb-4">
                      {t('home.test1.quote')}
                    </p>
                    <div className="font-mono text-xs text-white">{t('home.test1.author')}</div>
                  </div>

                  <div className="liquid-glass border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-1 text-[#19D9E0] mb-3 text-xs">
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                      <Star className="w-4 h-4 fill-[#19D9E0]" />
                    </div>
                    <p className="text-sm text-gray-300 font-light leading-relaxed italic mb-4">
                      {t('home.test2.quote')}
                    </p>
                    <div className="font-mono text-xs text-white">{t('home.test2.author')}</div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* FINAL CTA BANNER */}
          <section className="py-24 border-t border-white/5 text-center">
            <div className="max-w-4xl mx-auto px-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B4E61E]">{t('home.cta.tag')}</span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-4 mb-6 leading-tight">
                {t('home.cta.title')}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={onJoinAsDriver}
                  className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-xl text-sm font-medium transition cursor-pointer"
                >
                  {t('home.cta.applyDriver')}
                </button>
                <button
                  onClick={onJoinAsBusiness}
                  className="liquid-glass border border-white/10 text-white hover:bg-white/5 px-8 py-4 rounded-xl text-sm font-medium transition cursor-pointer"
                >
                  {t('home.cta.requestCompany')}
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ==================== SERVICES SERVICES PAGE ==================== */}
      {currentTab === 'services' && (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#19D9E0]">{t('services.tag')}</span>
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-white mt-4">{t('services.title')}</h1>
            <p className="text-gray-400 text-lg font-light mt-4 leading-relaxed">
              {t('services.desc')}
            </p>
          </div>

          <div className="space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 rounded-2xl border border-white/5 liquid-glass">
              <div className="md:col-span-8">
                <span className="font-mono text-xs text-[#19D9E0]">{t('services.s1.kicker')}</span>
                <h3 className="text-2xl font-normal text-white mt-2 mb-4">{t('services.s1.title')}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed mb-4">
                  {t('services.s1.desc')}
                </p>
                <div className="flex gap-6 text-xs text-[#19D9E0] font-mono">
                  <span>{t('services.s1.b1')}</span>
                  <span>{t('services.s1.b2')}</span>
                  <span>{t('services.s1.b3')}</span>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-end">
                <div className="bg-[#050c18] border border-cyan-500/10 p-6 rounded-xl w-full text-center">
                  <span className="text-xs text-gray-400 uppercase font-mono block">{t('services.s1.priceLabel')}</span>
                  <span className="text-4xl font-extrabold text-white block mt-2 font-mono">{t('services.s1.priceValue')}</span>
                  <span className="text-xs text-gray-500 block mt-1">{t('services.s1.priceSub')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 rounded-2xl border border-border/5 liquid-glass">
              <div className="md:col-span-8">
                <span className="font-mono text-xs text-[#19D9E0]">{t('services.s2.kicker')}</span>
                <h3 className="text-2xl font-normal text-white mt-2 mb-4">{t('services.s2.title')}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed mb-4">
                  {t('services.s2.desc')}
                </p>
                <div className="flex gap-6 text-xs text-[#19D9E0] font-mono">
                  <span>{t('services.s2.b1')}</span>
                  <span>{t('services.s2.b2')}</span>
                  <span>{t('services.s2.b3')}</span>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-end">
                <div className="bg-[#030d07] border border-emerald-500/10 p-6 rounded-xl w-full text-center">
                  <span className="text-xs text-gray-400 uppercase font-mono block">{t('services.s2.priceLabel')}</span>
                  <span className="text-4xl font-extrabold text-[#B4E61E] block mt-2 font-mono">{t('services.s2.priceValue')}</span>
                  <span className="text-xs text-gray-500 block mt-1">{t('services.s2.priceSub')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 rounded-2xl border border-white/5 liquid-glass">
              <div className="md:col-span-8">
                <span className="font-mono text-xs text-[#19D9E0]">{t('services.s3.kicker')}</span>
                <h3 className="text-2xl font-normal text-white mt-2 mb-4">{t('services.s3.title')}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed mb-4">
                  {t('services.s3.desc')}
                </p>
                <div className="flex gap-6 text-xs text-[#19D9E0] font-mono">
                  <span>{t('services.s3.b1')}</span>
                  <span>{t('services.s3.b2')}</span>
                  <span>{t('services.s3.b3')}</span>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-end">
                <div className="bg-[#050c18] border border-cyan-500/10 p-6 rounded-xl w-full text-center">
                  <span className="text-xs text-gray-400 uppercase font-mono block">{t('services.s3.priceLabel')}</span>
                  <span className="text-3xl font-extrabold text-white block mt-2 font-mono">{t('services.s3.priceValue')}</span>
                  <span className="text-xs text-gray-500 block mt-1">{t('services.s3.priceSub')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 rounded-2xl border border-white/5 liquid-glass">
              <div className="md:col-span-8">
                <span className="font-mono text-xs text-[#19D9E0]">{t('services.s4.kicker')}</span>
                <h3 className="text-2xl font-normal text-white mt-2 mb-4 font-display font-semibold">{t('services.s4.title')}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed mb-4">
                  {t('services.s4.desc')}
                </p>
                <div className="flex gap-6 text-xs text-[#19D9E0] font-mono">
                  <span>{t('services.s4.b1')}</span>
                  <span>{t('services.s4.b2')}</span>
                  <span>{t('services.s4.b3')}</span>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-end">
                <div className="bg-[#050c18] border border-cyan-500/10 p-6 rounded-xl w-full text-center">
                  <span className="text-xs text-gray-400 uppercase font-mono block">{t('services.s4.priceLabel')}</span>
                  <span className="text-3xl font-extrabold text-[#19D9E0] block mt-2 font-mono">{t('services.s4.priceValue')}</span>
                  <span className="text-xs text-gray-500 block mt-1">{t('services.s4.priceSub')}</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ==================== FOR COMPANIES PAGE ==================== */}
      {currentTab === 'for-companies' && (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#19D9E0] font-semibold">{t('companies.tag')}</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-4 font-display">{t('companies.title')}</h1>
            <p className="text-slate-300 text-lg font-light mt-4 leading-relaxed">
              {t('companies.desc')}
            </p>
          </div>

          {/* Old Way vs CargoElectra Way */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 font-sans">
            <div className="p-8 rounded-2xl border border-white/5 bg-[#080d19]/30">
              <span className="text-xs font-mono text-slate-500 uppercase block mb-4 font-semibold tracking-wider">{t('companies.oldWay')}</span>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{t('companies.old1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{t('companies.old2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{t('companies.old3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{t('companies.old4')}</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-[#19D9E0]/20 bg-[#19D9E0]/5">
              <span className="text-xs font-mono text-[#19D9E0] uppercase block mb-4 font-bold tracking-wider">{t('companies.newWay')}</span>
              <ul className="space-y-4 text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19D9E0] shrink-0 mt-0.5" />
                  <span>{t('companies.new1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19D9E0] shrink-0 mt-0.5" />
                  <span>{t('companies.new2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19D9E0] shrink-0 mt-0.5" />
                  <span>{t('companies.new3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#19D9E0] shrink-0 mt-0.5" />
                  <span>{t('companies.new4')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-white text-center mb-4 font-display">{t('companies.pricing.title')}</h2>
            <p className="text-slate-400 text-sm text-center mb-12 max-w-xl mx-auto font-light">
              {t('companies.pricing.desc')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="liquid-glass border border-white/5 p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#19D9E0] uppercase font-semibold">{t('companies.plan.starter')}</span>
                  <div className="text-3xl font-bold mt-2 text-white font-mono">{t('companies.plan.starterPrice')}<span className="text-sm font-light text-slate-500">{t('companies.plan.perMonth')}</span></div>
                  <p className="text-slate-400 text-xs mt-3 mb-6">{t('companies.plan.starterDesc')}</p>
                  <ul className="space-y-3 text-xs text-slate-300 border-t border-white/5 pt-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.starter1')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.starter2')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.starter3')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.starter4')}
                    </li>
                  </ul>
                </div>
                <button
                  onClick={onJoinAsBusiness}
                  className="bg-white/10 hover:bg-[#19D9E0] hover:text-black hover:shadow-[0_0_15px_rgba(25,217,224,0.4)] text-white px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition w-full mt-8 cursor-pointer"
                >
                  {t('companies.plan.apply')}
                </button>
              </div>

              <div className="liquid-glass border border-[#19D9E0]/40 p-8 rounded-2xl relative flex flex-col justify-between shadow-2xl">
                <span className="absolute top-4 right-4 bg-[#19D9E0] text-black text-[10px] font-bold font-mono px-2.5 py-1 rounded">{t('companies.plan.popular')}</span>
                <div>
                  <span className="font-mono text-xs text-[#19D9E0] uppercase font-bold tracking-wider">{t('companies.plan.business')}</span>
                  <div className="text-3xl font-bold mt-2 text-white font-mono">{t('companies.plan.businessPrice')}<span className="text-sm font-light text-slate-500">{t('companies.plan.perMonth')}</span></div>
                  <p className="text-slate-400 text-xs mt-3 mb-6">{t('companies.plan.businessDesc')}</p>
                  <ul className="space-y-3 text-xs text-slate-200 border-t border-white/5 pt-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.business1')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.business2')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.business3')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.business4')}
                    </li>
                  </ul>
                </div>
                <button
                  onClick={onJoinAsBusiness}
                  className="bg-[#19D9E0] hover:bg-[#5EEAE0] hover:shadow-[0_0_20px_rgba(25,217,224,0.5)] text-black px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition w-full mt-8 cursor-pointer"
                >
                  {t('companies.plan.apply')}
                </button>
              </div>

              <div className="liquid-glass border border-white/5 p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#19D9E0] uppercase font-semibold">{t('companies.plan.enterprise')}</span>
                  <div className="text-3xl font-bold mt-2 text-white font-mono">{t('companies.plan.enterprisePrice')}</div>
                  <p className="text-slate-400 text-xs mt-3 mb-6">{t('companies.plan.enterpriseDesc')}</p>
                  <ul className="space-y-3 text-xs text-slate-300 border-t border-white/5 pt-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.enterprise1')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.enterprise2')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.enterprise3')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#19D9E0]" /> {t('companies.plan.enterprise4')}
                    </li>
                  </ul>
                </div>
                <button
                  onClick={onJoinAsBusiness}
                  className="bg-white/10 hover:bg-[#19D9E0] hover:text-black hover:shadow-[0_0_15px_rgba(25,217,224,0.4)] text-white px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition w-full mt-8 cursor-pointer"
                >
                  {t('companies.plan.contact')}
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ==================== FOR DRIVERS PAGE ==================== */}
      {currentTab === 'for-drivers' && (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#19D9E0] font-semibold">{t('drivers.tag')}</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-4 font-display">{t('drivers.title.a')}<span className="text-[#19D9E0]">{t('drivers.title.hl')}</span>{t('drivers.title.b')}</h1>
            <p className="text-slate-300 text-lg font-light mt-4 leading-relaxed">
              {t('drivers.desc')}
            </p>
          </div>

          {/* Interactive Calculator widget */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 rounded-3xl border border-white/5 bg-[#050811] mb-24">
            
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-mono text-[#19D9E0] uppercase block mb-1 font-semibold">{t('drivers.calc.tag')}</span>
                <h3 className="text-2xl font-bold text-white font-display">{t('drivers.calc.title')}</h3>
                <p className="text-slate-400 text-sm font-light mt-2">
                  {t('drivers.calc.desc')}
                </p>
              </div>

              {/* Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase text-slate-500">{t('drivers.calc.selectLabel')}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
                  <button 
                    onClick={() => setCalcVehicle('scooter')}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase borderMain transition cursor-pointer text-center border ${
                      calcVehicle === 'scooter' ? 'bg-[#19D9E0] text-black border-[#19D9E0]' : 'bg-black text-slate-400 border-white/10 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {t('drivers.calc.scooter')}
                  </button>
                  <button 
                    onClick={() => setCalcVehicle('bike')}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase borderMain transition cursor-pointer text-center border ${
                      calcVehicle === 'bike' ? 'bg-[#19D9E0] text-black border-[#19D9E0]' : 'bg-black text-slate-400 border-white/10 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {t('drivers.calc.bike')}
                  </button>
                  <button 
                    onClick={() => setCalcVehicle('car')}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase borderMain transition cursor-pointer text-center border ${
                      calcVehicle === 'car' ? 'bg-[#19D9E0] text-black border-[#19D9E0]' : 'bg-black text-slate-400 border-white/10 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {t('drivers.calc.car')}
                  </button>
                  <button 
                    onClick={() => setCalcVehicle('van')}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase borderMain transition cursor-pointer text-center border ${
                      calcVehicle === 'van' ? 'bg-[#19D9E0] text-black border-[#19D9E0]' : 'bg-black text-slate-400 border-white/10 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {t('drivers.calc.van')}
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 uppercase">{t('drivers.calc.hoursLabel')}</span>
                  <span className="text-[#19D9E0] font-bold">{calcHours} {t('drivers.calc.hoursUnit')}</span>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="60" 
                  value={calcHours}
                  onChange={(e) => setCalcHours(Number(e.target.value))}
                  className="w-full accent-[#19D9E0] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>{t('drivers.calc.partTime')}</span>
                  <span>{t('drivers.calc.standard')}</span>
                  <span>{t('drivers.calc.max')}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 border-l border-white/5 h-full hidden lg:block" />

            <div className="lg:col-span-4 bg-black/60 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
              
              <div className="space-y-1">
                <span className="text-xs text-slate-500 block font-mono">{t('drivers.calc.netLabel')}</span>
                <span className="text-4xl font-black text-[#19D9E0] tracking-tight block font-mono">€{earnings.net.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block leading-normal">{t('drivers.calc.netSub')}</span>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-light">{t('drivers.calc.gross')}</span>
                  <span className="font-mono">€{earnings.grossMonthly.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-light">{t('drivers.calc.commission')}</span>
                  <span className="font-mono text-red-400">- €{earnings.commission}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#19D9E0]">
                  <span className="font-light">{t('drivers.calc.netWeekly')}</span>
                  <span className="font-mono font-bold">€{earnings.grossWeekly}</span>
                </div>
              </div>

              <button 
                onClick={onJoinAsDriver}
                className="w-full bg-[#19D9E0] hover:bg-[#5EEAE0] hover:shadow-[0_4px_15px_rgba(25,217,224,0.3)] text-black py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition cursor-pointer"
              >
                {t('drivers.calc.cta')}
              </button>
            </div>

          </div>

          {/* Benefits Cards Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white text-center mb-12 font-display">{t('drivers.benefits.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="liquid-glass border border-white/5 p-6 rounded-2xl">
                <span className="text-xs text-[#19D9E0] font-mono font-bold">{t('drivers.b1.kicker')}</span>
                <h4 className="text-lg font-semibold text-white mt-3 mb-2 font-display">{t('drivers.b1.title')}</h4>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  {t('drivers.b1.desc')}
                </p>
              </div>

              <div className="liquid-glass border border-white/5 p-6 rounded-2xl">
                <span className="text-xs text-[#19D9E0] font-mono font-bold">{t('drivers.b2.kicker')}</span>
                <h4 className="text-lg font-semibold text-white mt-3 mb-2 font-display">{t('drivers.b2.title')}</h4>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  {t('drivers.b2.desc')}
                </p>
              </div>

              <div className="liquid-glass border border-white/5 p-6 rounded-2xl">
                <span className="text-xs text-[#19D9E0] font-mono font-bold">{t('drivers.b3.kicker')}</span>
                <h4 className="text-lg font-semibold text-white mt-3 mb-2 font-display">{t('drivers.b3.title')}</h4>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  {t('drivers.b3.desc')}
                </p>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ==================== VEHICLE RENTAL PAGE ==================== */}
      {currentTab === 'vehicles' && (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#19D9E0] font-semibold">{t('vehicles.tag')}</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-4 font-display">{t('vehicles.title')}</h1>
            <p className="text-slate-300 text-lg font-light mt-4 leading-relaxed">
              {t('vehicles.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="liquid-glass border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#19D9E0]/30 transition duration-300">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                      <span className="text-[10px] font-mono text-[#19D9E0] uppercase tracking-wider flex items-center gap-1.5">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${vehicle.status === 'available' ? 'bg-[#19D9E0]' : 'bg-amber-400'}`} />
                        {vehicle.status === 'available' ? t('vehicles.available') : t('vehicles.rented')}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] font-mono text-[#19D9E0] uppercase tracking-widest block mb-1">{vehicle.type}</span>
                    <h3 className="text-md font-semibold text-white mb-2 leading-tight font-display">{vehicle.name}</h3>
                    <p className="text-slate-400 text-xs font-light leading-relaxed mb-4">{vehicle.specs}</p>
                    
                    <div className="flex gap-4 border-t border-white/5 pt-4">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">{t('vehicles.dailyRate')}</span>
                        <span className="text-sm font-bold text-white font-mono">€{vehicle.dailyPrice}</span>
                      </div>
                      <div className="space-y-0.5 border-l border-white/5 pl-4">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">{t('vehicles.weeklyRate')}</span>
                        <span className="text-sm font-bold text-[#19D9E0] font-mono">€{vehicle.weeklyPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    disabled={vehicle.status !== 'available'}
                    onClick={() => onApplyForRental(vehicle.id)}
                    className={`w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase cursor-pointer transition ${
                      vehicle.status === 'available' 
                        ? 'bg-[#19D9E0] hover:bg-[#5EEAE0] text-black hover:shadow-[0_4px_12px_rgba(25,217,224,0.3)]' 
                        : 'bg-white/5 text-gray-500 pointer-events-none'
                    }`}
                  >
                    {vehicle.status === 'available' ? t('vehicles.requestRental') : t('vehicles.rentedBy') + vehicle.rentedByName}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="liquid-glass border border-white/5 p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4 font-display">{t('vehicles.terms.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed font-light font-sans">
              <div className="space-y-3">
                <p>{t('vehicles.terms1')}</p>
                <p>{t('vehicles.terms2')}</p>
              </div>
              <div className="space-y-3">
                <p>{t('vehicles.terms3')}</p>
                <p>{t('vehicles.terms4')}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== ABOUT US PAGE ==================== */}
      {currentTab === 'about' && (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start font-sans">
            
            <div className="lg:col-span-12 max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#19D9E0] font-semibold">{t('about.tag')}</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-4 font-display">{t('about.title')}</h1>
              <p className="text-slate-300 text-lg font-light mt-4 leading-relaxed">
                {t('about.desc')}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8 font-light text-slate-400 text-sm leading-relaxed">
              <h3 className="text-xl font-semibold text-white font-display">{t('about.storyTitle')}</h3>
              <p>
                {t('about.story1')}
              </p>
              <p>
                {t('about.story2')}
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 font-display">{t('about.visionTitle')}</h3>
              <p>
                {t('about.vision')}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="liquid-glass border border-white/5 p-6 rounded-2xl">
                <span className="text-[10px] text-[#19D9E0] uppercase font-mono block mb-1 font-semibold">{t('about.companyDetail')}</span>
                <span className="text-sm font-semibold text-white block">{t('about.companyName')}</span>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed whitespace-pre-line">
                  {t('about.companyInfo')}
                </p>
              </div>

              <div className="liquid-glass border border-[#19D9E0]/20 p-6 rounded-2xl">
                <span className="text-[10px] text-[#19D9E0] uppercase font-mono block mb-1 font-semibold">{t('about.values')}</span>
                <ul className="text-xs text-slate-300 space-y-2 font-light">
                  <li>{t('about.value1')}</li>
                  <li>{t('about.value2')}</li>
                  <li>{t('about.value3')}</li>
                  <li>{t('about.value4')}</li>
                </ul>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ==================== CONTACT PAGE ==================== */}
      {currentTab === 'contact' && (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start font-sans">
            
            <div className="lg:col-span-12 max-w-3xl mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#19D9E0] font-semibold">{t('contact.tag')}</span>
              <h1 className="text-4xl font-bold tracking-tight text-white mt-4 font-display">{t('contact.title')}</h1>
              <p className="text-slate-300 font-light text-base mt-4 leading-relaxed">
                {t('contact.desc')}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#19D9E0]/5 border border-[#19D9E0]/20 rounded-xl text-white">
                    <MapPin className="w-5 h-5 text-[#19D9E0]" />
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block text-[9px]">{t('contact.officeAddr')}</span>
                    <span className="text-white font-sans">{t('contact.officeAddrValue')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#19D9E0]/5 border border-[#19D9E0]/20 rounded-xl text-white">
                    <Phone className="w-5 h-5 text-[#19D9E0]" />
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block text-[9px]">{t('contact.phoneLabel')}</span>
                    <span className="text-white font-sans">+385 1 555 9823</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#19D9E0]/5 border border-[#19D9E0]/20 rounded-xl text-white">
                    <Mail className="w-5 h-5 text-[#19D9E0]" />
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block text-[9px]">{t('contact.emailLabel')}</span>
                    <span className="text-white font-sans">info@cargoelectra.com</span>
                  </div>
                </div>
              </div>

              {/* WHATSAPP WIDGET */}
              <div className="p-6 rounded-2xl bg-[#19D9E0]/5 border border-[#19D9E0]/20">
                <span className="text-[9px] font-mono text-[#19D9E0] uppercase tracking-widest block mb-1 font-semibold">{t('contact.wa.kicker')}</span>
                <span className="text-sm font-semibold text-white block font-display">{t('contact.wa.title')}</span>
                <p className="text-xs text-slate-400 mt-1 mb-4">{t('contact.wa.desc')}</p>
                <a 
                  href="https://wa.me/38515559823" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#19D9E0] hover:bg-[#5EEAE0] hover:shadow-[0_4px_15px_rgba(25,217,224,0.4)] text-black px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 fill-black text-black" />
                  {t('contact.wa.cta')}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="liquid-glass border border-white/10 p-8 rounded-3xl">
                <h3 className="text-lg font-semibold text-white mb-6 font-display">{t('contact.form.title')}</h3>

                {contactSubmitted ? (
                   <div className="text-center py-12 space-y-4">
                     <div className="w-12 h-12 bg-[#19D9E0]/10 border border-[#19D9E0]/25 text-[#19D9E0] rounded-full flex items-center justify-center mx-auto">
                       <Send className="w-6 h-6 animate-pulse text-[#19D9E0]" />
                     </div>
                     <h4 className="text-lg text-white font-semibold font-display">{t('contact.form.successTitle')}</h4>
                     <p className="text-xs text-slate-400 max-w-sm mx-auto">
                       {t('contact.form.successDesc')}
                     </p>
                   </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase text-slate-400">{t('contact.form.name')}</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder={t('contact.form.namePh')}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#19D9E0] focus:outline-none focus:ring-1 focus:ring-[#19D9E0]/30 transition"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase text-slate-400">{t('contact.form.email')}</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder={t('contact.form.emailPh')}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#19D9E0] focus:outline-none focus:ring-1 focus:ring-[#19D9E0]/30 transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-400">{t('contact.form.reason')}</label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm focus:border-[#19D9E0] focus:outline-none focus:ring-1 focus:ring-[#19D9E0]/30 transition text-white appearance-none"
                      >
                        <option value="Driver Inquiry" className="bg-black text-white">{t('contact.form.r1')}</option>
                        <option value="Company Inquiry" className="bg-black text-white">{t('contact.form.r2')}</option>
                        <option value="Vehicle Rental" className="bg-black text-white">{t('contact.form.r3')}</option>
                        <option value="Other" className="bg-black text-white">{t('contact.form.r4')}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-400">{t('contact.form.message')}</label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder={t('contact.form.messagePh')}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#19D9E0] focus:outline-none focus:ring-1 focus:ring-[#19D9E0]/30 transition"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="bg-[#19D9E0] hover:bg-[#5EEAE0] hover:shadow-[0_4px_15px_rgba(25,217,224,0.4)] text-black px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase cursor-pointer w-full transition flex items-center justify-center gap-2"
                    >
                      {t('contact.form.submit')}
                      <Send className="w-4 h-4 text-black" />
                    </button>

                  </form>
                )}
              </div>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
