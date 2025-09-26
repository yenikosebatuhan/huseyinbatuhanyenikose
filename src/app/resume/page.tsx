'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { getDictionary, getLocaleFromPathname, Dictionary } from '@/lib/i18n';

export default function ResumePage() {
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
            {currentLocale === 'tr' ? 'Özgeçmiş' : 'Resume'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            {currentLocale === 'tr' 
              ? 'Profesyonel deneyimim, eğitim ve yeteneklerimin kapsamlı bir özeti.'
              : 'A comprehensive overview of my professional experience, education, and skills.'
            }
          </p>
          <Button asChild variant="outline" size="lg" className="text-base px-8 py-3 border-2">
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-5 w-5" />
              {currentLocale === 'tr' ? 'Özgeçmiş İndir (PDF)' : 'Download Resume (PDF)'}
            </a>
          </Button>
        </div>

        {/* Resume Preview */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 mb-12 bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black dark:text-white mb-2">
              {currentLocale === 'tr' ? 'Özgeçmiş Önizleme' : 'Resume Preview'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {currentLocale === 'tr' 
                ? 'PDF önizlemesi /public/resume.pdf dosyası yüklendikten sonra burada görüntülenecek'
                : 'PDF preview will be displayed here once uploaded to /public/resume.pdf'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  {currentLocale === 'tr' ? 'İndir' : 'Download'}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  {currentLocale === 'tr' ? 'Tarayıcıda Görüntüle' : 'View in Browser'}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="text-center">
          <h2 className="text-2xl font-light mb-8 text-black dark:text-white">
            {currentLocale === 'tr' ? 'Hızlı Genel Bakış' : 'Quick Overview'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <h3 className="text-3xl font-light text-black dark:text-white mb-2">3+</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLocale === 'tr' ? 'Yıl Deneyim' : 'Years Experience'}
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-light text-black dark:text-white mb-2">7+</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLocale === 'tr' ? 'Proje' : 'Projects'}
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-light text-black dark:text-white mb-2">2</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLocale === 'tr' ? 'Patent' : 'Patents'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
