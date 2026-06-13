import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { en } from './en';
import { hr } from './hr';

export type Lang = 'en' | 'hr';

const DICTS: Record<Lang, Record<string, string>> = { en, hr };
const STORAGE_KEY = 'cargoelectra_lang';

// SEO: per-locale <title> + meta description, swapped on language change.
const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'CargoElectra — Croatia\'s Managed Driver Network & Logistics Platform',
    description:
      'CargoElectra is Croatia\'s smart managed driver network and logistics platform for Wolt, Bolt and B2B cargo. Premium fleet rental, vetted couriers, insured freight in Zagreb.',
  },
  hr: {
    title: 'CargoElectra — Hrvatska mreža vozača i logistička platforma',
    description:
      'CargoElectra je hrvatska pametna mreža upravljanih vozača i logistička platforma za Wolt, Bolt i B2B teret. Premium najam vozila, provjereni kuriri, osigurani prijevoz u Zagrebu.',
  },
};

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved === 'en' || saved === 'hr') return saved;
  // EN-first: only default to HR if the browser is explicitly Croatian.
  const nav = navigator.language?.toLowerCase() || '';
  return nav.startsWith('hr') ? 'hr' : 'en';
}

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Initialize after mount (avoids SSR/static mismatch) then sync <html> + meta.
  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
    const meta = META[lang];
    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('og:title', meta.title, true);
    setMeta('og:description', meta.description, true);
    setMeta('og:locale', lang === 'hr' ? 'hr_HR' : 'en_US', true);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: string, fallback?: string) => DICTS[lang][key] ?? DICTS.en[key] ?? fallback ?? key,
    [lang]
  );

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

// Convenience hook: just the translator.
export function useT() {
  return useI18n().t;
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
