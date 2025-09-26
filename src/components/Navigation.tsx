'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Dictionary, getLocaleFromPathname, getDictionary } from '@/lib/i18n';

interface NavigationProps {
  dict?: Dictionary;
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      const currentLocale = getLocaleFromPathname(pathname);
      try {
        const newDict = await getDictionary(currentLocale);
        setDict(newDict);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
        const fallbackDict = await getDictionary('en');
        setDict(fallbackDict);
      }
    };

    loadDictionary();

    // Listen for language change events
    const handleLanguageChange = () => {
      loadDictionary();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [pathname]);

  if (!dict) {
    return null;
  }

  const navItems = [
    { href: `/`, label: dict.navigation.home },
    { href: `/about`, label: dict.navigation.about },
    { href: `/projects`, label: dict.navigation.projects },
    { href: `/resume`, label: dict.navigation.resume },
    { href: `/contact`, label: dict.navigation.contact },
  ];

  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {navItems.map((item) => (
        <Link 
          key={item.href} 
          href={item.href}
          className={cn(
            "text-sm font-light text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors",
            pathname === item.href && "text-black dark:text-white"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
