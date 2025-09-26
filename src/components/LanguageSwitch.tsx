'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { Locale, isValidLocale, getLocaleFromPathname } from '@/lib/i18n';

export function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');

  useEffect(() => {
    // Initialize current locale
    const locale = getLocaleFromPathname(pathname);
    setCurrentLocale(locale);

    // Listen for language change events
    const handleLanguageChange = (event: CustomEvent<Locale>) => {
      setCurrentLocale(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, [pathname]);

  const switchLanguage = (locale: Locale) => {
    // Store locale in localStorage for persistence
    localStorage.setItem('preferred-locale', locale);
    
    // Trigger a custom event to notify components about language change
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: locale }));
  };

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4" />
      <div className="flex gap-1">
        <Button
          variant={currentLocale === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => switchLanguage('en')}
          disabled={isPending}
          className="h-8 w-8 p-0"
        >
          EN
        </Button>
        <Button
          variant={currentLocale === 'tr' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => switchLanguage('tr')}
          disabled={isPending}
          className="h-8 w-8 p-0"
        >
          TR
        </Button>
      </div>
    </div>
  );
}

