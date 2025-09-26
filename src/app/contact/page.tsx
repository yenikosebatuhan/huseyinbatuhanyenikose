'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { getDictionary, getLocaleFromPathname, Dictionary } from '@/lib/i18n';

export default function ContactPage() {
  const [dict, setDict] = useState<Dictionary | null>(null);
  const pathname = usePathname();

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

    const handleLanguageChange = () => {
      loadDictionary();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [pathname]);

  if (!dict) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>;
  }

  const currentLocale = getLocaleFromPathname(pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-light mb-8 text-black dark:text-white">
            {currentLocale === 'tr' ? 'İletişim' : 'Contact'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {currentLocale === 'tr' ? 'Fırsatlar, projeler veya işbirlikleri hakkında konuşalım.' : 'Let\'s discuss opportunities, projects, or collaborations.'}
          </p>
        </div>

        {/* Contact Information */}
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-3 border-2">
              <a href="mailto:byenikose@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                byenikose@gmail.com
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a 
              href="https://linkedin.com/in/huseyinbatuhanyenikose"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <Linkedin className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-black dark:text-white">LinkedIn</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLocale === 'tr' ? 'Profesyonel profil' : 'Professional profile'}
                </p>
              </div>
            </a>

            <a 
              href="https://github.com/yenikosebatuhan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <Github className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-black dark:text-white">GitHub</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLocale === 'tr' ? 'Kod depoları' : 'Code repositories'}
                </p>
              </div>
            </a>
          </div>

          {/* Location */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-5 w-5" />
              <span>{currentLocale === 'tr' ? 'İstanbul, Türkiye' : 'Istanbul, Turkey'}</span>
            </div>
          </div>

          {/* Availability */}
          <div className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
            <h3 className="text-lg font-medium text-black dark:text-white mb-4">
              {currentLocale === 'tr' ? 'Mevcut Durum' : 'Current Status'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {currentLocale === 'tr' 
                ? 'Yazılım testleri, UAV sistemleri ve AI projelerinde freelance fırsatları, araştırma işbirlikleri ve tam zamanlı pozisyonlara açığım.'
                : 'Open to freelance opportunities, research collaborations, and full-time positions in software testing, UAV systems, and AI projects.'
              }
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {currentLocale === 'tr' ? 'Yeni projeler için müsait' : 'Available for new projects'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
