"use client";
// src/i18n/LanguageContext.tsx
// Drop into src/i18n/LanguageContext.tsx
//
// Wrap your app once in src/app/layout.tsx:
//
//   import { LanguageProvider } from "@/i18n/LanguageContext";
//   ...
//   <body>
//     <LanguageProvider>{children}</LanguageProvider>
//   </body>

import React, { createContext, useContext, useEffect, useState } from "react";
import { LangCode, TRANSLATIONS, Translations } from "./translations";

interface Ctx {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: Translations;
}

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "sonicsense-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("EN");

  // restore persisted choice on mount
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as LangCode | null) : null;
    if (saved === "EN" || saved === "TH") setLangState(saved);
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  const value: Ctx = { lang, setLang, t: TRANSLATIONS[lang] };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
