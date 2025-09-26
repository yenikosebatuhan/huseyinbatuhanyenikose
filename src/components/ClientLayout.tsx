'use client';

import { useEffect, useState } from 'react';
import { Dictionary, getDictionary, getLocaleFromPathname, Locale } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
  initialDict: Dictionary;
}

export function ClientLayout({ children, initialDict }: ClientLayoutProps) {
  const [dict, setDict] = useState<Dictionary>(initialDict);
  const pathname = usePathname();

  useEffect(() => {
    const updateDictionary = async () => {
      const currentLocale = getLocaleFromPathname(pathname);
      try {
        const newDict = await getDictionary(currentLocale);
        setDict(newDict);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
      }
    };

    updateDictionary();
  }, [pathname]);

  return <>{children}</>;
}
