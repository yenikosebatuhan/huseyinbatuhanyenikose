import { notFound } from 'next/navigation';

export type Locale = 'en' | 'tr';

// Define supported locales
export const locales: Locale[] = ['en', 'tr'];
export const defaultLocale: Locale = 'en';

// Dictionary structure
export interface Dictionary {
  navigation: {
    home: string;
    about: string;
    projects: string;
    resume: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  stats: {
    gpa: string;
    tubitak: string;
    patents: string;
    projects: string;
  };
  common: {
    viewCv: string;
    emailMe: string;
    viewAll: string;
    search: string;
    filter: string;
    download: string;
    readMore: string;
    back: string;
  };
  projects: {
    featured: string;
    all: string;
    domains: {
      uav: string;
      qa: string;
      ai: string;
      web: string;
      game: string;
      medical: string;
    };
  };
  about: {
    biography: string;
    experience: string;
    education: string;
  };
  contact: {
    title: string;
    description: string;
  };
  footer: {
    copyright: string;
  };
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default as Dictionary;
  } catch (error) {
    // Fallback to English if translation not found
    if (locale !== defaultLocale) {
      const dict = await import(`@/dictionaries/${defaultLocale}.json`);
      return dict.default as Dictionary;
    }
    throw error;
  }
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  // For client-side, check localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferred-locale');
    if (stored && isValidLocale(stored)) {
      return stored as Locale;
    }
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return defaultLocale;
}

