"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dictionary, koTerms, type Dictionary, type Lang } from "./dictionary";

const STORAGE_KEY = "grainbridge-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  /** Translate a data value (continent, region, event, commodity). */
  tr: (term: string) => string;
  /** Locale string for number formatting. */
  locale: string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Korean is the default on both server and first client render, so hydration matches.
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ko" || saved === "en") setLangState(saved);
    } catch {
      // storage unavailable: keep default
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionary[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const tr = useCallback((term: string) => (lang === "ko" ? koTerms[term] ?? term : term), [lang]);

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: dictionary[lang] as Dictionary,
    tr,
    locale: lang === "ko" ? "ko-KR" : "en-US",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
