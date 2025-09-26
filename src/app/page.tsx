'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, FileText, Github, Linkedin } from 'lucide-react';
import { getDictionary, getLocaleFromPathname, Dictionary } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

export default function HomePage() {
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
        // Fallback to English
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
    return <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>;
  }

  const currentLocale = getLocaleFromPathname(pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Professional two-column layout */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Left: Photo */}
          <div className="md:col-span-4 flex md:justify-start justify-center">
            <img
              src="/images/profile.jpeg"
              alt="Hüseyin Batuhan YENİKÖSE"
              className="w-44 h-44 rounded-full object-cover border border-gray-200 shadow-md"
            />
          </div>

          {/* Right: Content */}
          <div className="md:col-span-8">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
              {dict.hero.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 text-xs text-gray-700 dark:text-gray-300">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Bilgisayar Mühendisi' : 'Computer Engineer'}
              </span>
              <span className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 text-xs text-gray-700 dark:text-gray-300">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Test Mühendisi' : 'Test Engineer'}
              </span>
              <span className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 text-xs text-gray-700 dark:text-gray-300">
                {getLocaleFromPathname(pathname) === 'tr' ? 'UAV Sistemleri' : 'UAV Systems'}
              </span>
            </div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-8">
              {currentLocale === 'tr' 
                ? 'Test mühendisliği, kalite güvencesi ve yazılım geliştirme konusunda tutkulu. Şu anda Tegsoft\'ta QA Mühendisi olarak yenilikçi çözümlere katkı sağlıyorum.'
                : 'Passionate about test engineering, quality assurance and software development. Currently contributing to innovative solutions as a QA Engineer at Tegsoft.'
              }
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                <Link href="/projects">{getLocaleFromPathname(pathname) === 'tr' ? 'Projelerimi Gör' : 'View My Work'}</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600 px-6">
                <Link href="/contact">{getLocaleFromPathname(pathname) === 'tr' ? 'İletişime Geç' : 'Get In Touch'}</Link>
              </Button>
              <div className="flex items-center gap-3 ml-2">
                <a href="https://linkedin.com/in/huseyinbatuhanyenikose" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://github.com/yenikosebatuhan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <Github className="h-4 w-4" />
                </a>
                <a href="mailto:byenikose@gmail.com" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Visual Cards */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {getLocaleFromPathname(pathname) === 'tr' ? 'Öne Çıkan Çalışmalar' : 'Featured Work'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {getLocaleFromPathname(pathname) === 'tr' ? 'Son projeler ve başarılar' : 'Recent projects and achievements'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project Card 1 - QA Highlight */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 h-64 cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">
                  {getLocaleFromPathname(pathname) === 'tr' ? 'QA Mühendisi - Tegsoft' : 'QA Engineer - Tegsoft'}
                </h3>
                <p className="text-sm text-white/80">
                  {getLocaleFromPathname(pathname) === 'tr' ? 'Kalite güvencesi & test otomasyonu' : 'Quality assurance & test automation'}
                </p>
              </div>
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">QA</span>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 h-64 cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">
                  {getLocaleFromPathname(pathname) === 'tr' ? 'Aurora AI Chat' : 'Aurora AI Chat'}
                </h3>
                <p className="text-sm text-white/80">
                  {getLocaleFromPathname(pathname) === 'tr' ? 'GPT API ile pazarlama stratejisi' : 'Marketing strategy with GPT API'}
                </p>
              </div>
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">AI</span>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 h-64 cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">
                  {getLocaleFromPathname(pathname) === 'tr' ? 'KUAV Teknofest Projesi' : 'KUAV Teknofest Project'}
                </h3>
                <p className="text-sm text-white/80">
                  {getLocaleFromPathname(pathname) === 'tr' ? 'Takım kaptanlığı & otonom sistemler' : 'Team leadership & autonomous systems'}
                </p>
              </div>
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">UAV</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Tüm Projeleri Gör' : 'View All Projects'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section - More Visual */}
      <section className="py-24 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Yıl' : 'Years'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Deneyim' : 'Experience'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                7+
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Proje' : 'Projects'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Tamamlandı' : 'Completed'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Patent' : 'Patents'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Yayınlandı' : 'Published'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                3rd
              </div>
              <p className="font-medium text-gray-900 dark:text-white">TÜBİTAK</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getLocaleFromPathname(pathname) === 'tr' ? 'Ulusal Sıralama' : 'National Rank'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}