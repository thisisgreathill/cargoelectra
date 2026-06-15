import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { useI18n, type Lang } from '../i18n';

interface NavigationProps {
  currentTab: string;
  onNavigateTab: (tab: string) => void;
}

// Single source of truth for the public nav — tab id maps to translation key.
const NAV_ITEMS: { tab: string; key: string }[] = [
  { tab: 'home', key: 'nav.home' },
  { tab: 'services', key: 'nav.services' },
  { tab: 'for-companies', key: 'nav.companies' },
  { tab: 'for-drivers', key: 'nav.drivers' },
  { tab: 'vehicles', key: 'nav.fleet' },
];

// Segmented EN/HR toggle.
function LangSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div className="seg" role="group" aria-label="Language">
      <Globe className="w-3.5 h-3.5 text-slate-500 mx-1" />
      {(['en', 'hr'] as Lang[]).map((l) => (
        <button
          key={l}
          data-on={lang === l}
          onClick={() => setLang(l)}
          className="px-2 py-1 text-[10px] font-tech font-semibold uppercase tracking-[0.12em] text-slate-400 hover:text-white"
        >
          {l}
        </button>
      ))}
    </div>
  );
}


function Wordmark({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center cursor-pointer select-none group shrink-0" aria-label="CargoElectra home">
      <img
        src="/logo.png"
        alt="CargoElectra"
        className="h-16 sm:h-20 w-auto object-contain -my-3 transition-opacity duration-300 group-hover:opacity-90"
      />
    </button>
  );
}

export function Navbar({ currentTab, onNavigateTab }: NavigationProps) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (tab: string) => {
    onNavigateTab(tab);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1240px] z-50 pt-4 sm:pt-5 px-4 sm:px-6">
      <div
        className={`nav-shell rounded-2xl grid grid-cols-[auto_1fr_auto] items-center transition-all duration-300 ${
          scrolled ? 'nav-shell--scrolled px-4 py-2.5 sm:px-5' : 'px-4 py-3 sm:px-6 sm:py-3.5'
        }`}
      >
        {/* Left: Brand */}
        <Wordmark onClick={() => go('home')} />

        {/* Center: Quick Links */}
        <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">
          {NAV_ITEMS.map((item) => {
            const active = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => go(item.tab)}
                data-active={active}
                className={`nav-link text-[11px] font-tech font-medium tracking-[0.18em] uppercase whitespace-nowrap transition-colors duration-300 cursor-pointer ${
                  active ? 'text-[#00E5FF]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t(item.key)}
              </button>
            );
          })}
        </nav>

        {/* Right: utilities */}
        <div className="flex items-center gap-3 sm:gap-4 justify-self-end">
          <div className="hidden md:block"><LangSwitcher /></div>

          <button
            onClick={() => go('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#00E5FF] text-black hover:bg-white hover:shadow-[0_0_22px_rgba(0,229,255,0.5)] px-4 py-2 rounded-[10px] text-[11px] font-tech font-bold tracking-[0.12em] uppercase cursor-pointer transition-all duration-300 active:scale-95"
          >
            {t('nav.contact')}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[9px] border border-white/10 text-white hover:border-[#00E5FF]/40 hover:text-[#00E5FF] transition cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 nav-shell rounded-2xl p-4 drawer-in">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item, i) => {
                const active = currentTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => go(item.tab)}
                    className={`flex items-center justify-between text-left py-3 text-sm font-tech tracking-[0.1em] uppercase transition cursor-pointer ${
                      i !== NAV_ITEMS.length - 1 ? 'border-b border-white/5' : ''
                    } ${active ? 'text-[#00E5FF]' : 'text-slate-300 hover:text-white'}`}
                  >
                    {t(item.key)}
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />}
                  </button>
                );
              })}
          </nav>

          <div className="flex items-center justify-center mt-4 pt-4 border-t border-white/5">
            <LangSwitcher />
          </div>

          <button
            onClick={() => go('contact')}
            className="w-full mt-4 inline-flex items-center justify-center gap-1.5 bg-[#00E5FF] text-black hover:bg-white px-4 py-3 rounded-[9px] text-xs font-tech font-bold tracking-[0.12em] uppercase cursor-pointer transition active:scale-95"
          >
            {t('nav.contact')}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}

export function Footer({ onNavigateTab }: { onNavigateTab: (tab: string) => void }) {
  const { t } = useI18n();
  return (
    <footer className="bg-[#050A15] border-t border-white/10 py-16 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-12 font-sans select-none">
        
        <div className="space-y-4">
          <div>
            <img src="/logo.png" alt="CargoElectra" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
            {t('footer.tagline')}
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-bold text-[#00E5FF] font-mono uppercase tracking-[0.2em]">{t('footer.quickNav')}</h4>
          <ul className="space-y-2 text-slate-400 font-light">
            <li><button onClick={() => onNavigateTab('home')} className="hover:text-white cursor-pointer transition">{t('footer.fHome')}</button></li>
            <li><button onClick={() => onNavigateTab('services')} className="hover:text-white cursor-pointer transition">{t('footer.fServices')}</button></li>
            <li><button onClick={() => onNavigateTab('for-companies')} className="hover:text-white cursor-pointer transition">{t('footer.fCompanies')}</button></li>
            <li><button onClick={() => onNavigateTab('for-drivers')} className="hover:text-white cursor-pointer transition">{t('footer.fDrivers')}</button></li>
          </ul>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-bold text-[#00E5FF] font-mono uppercase tracking-[0.2em]">{t('footer.legal')}</h4>
          <ul className="space-y-2 text-slate-400 font-light">
            <li>{t('footer.legal1')}</li>
            <li>{t('footer.legal2')}</li>
            <li>{t('footer.legal3')}</li>
            <li>{t('footer.legal4')}</li>
          </ul>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-bold text-[#00E5FF] font-mono uppercase tracking-[0.2em]">{t('footer.hq')}</h4>
          <p className="text-slate-400 leading-relaxed font-light font-mono text-[11px] whitespace-pre-line">
            {t('footer.address')}
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-mono">
        <p>{t('footer.rights')}</p>
        <p className="tracking-widest uppercase text-[#00E5FF]/70">{t('footer.ecosystem')}</p>
      </div>
    </footer>
  );
}
