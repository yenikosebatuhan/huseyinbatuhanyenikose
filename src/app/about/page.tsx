'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getDictionary, getLocaleFromPathname, Dictionary } from '@/lib/i18n';
import { timelineData } from '@/data/timeline';

export default function AboutPage() {
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
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-light mb-8 text-black dark:text-white">
            {currentLocale === 'tr' ? 'Hakkımda' : 'About Me'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {currentLocale === 'tr' 
              ? 'Koç Üniversitesi 3. sınıf Bilgisayar Mühendisliği öğrencisi. Yazılım testleri, otonom UAV sistemleri ve AI destekli projeler konusunda deneyim sahibi.'
              : '3rd-year Computer Engineering student at Koç University with experience in software testing, autonomous UAV systems, and AI-powered projects.'
            }
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Bio */}
          <section>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {currentLocale === 'tr' 
                ? 'Şu anda Tegsoft\'ta Test Mühendisi Stajyeri olarak çalışıyorum. Kapsamlı test senaryoları tasarlıyor, hataları yönetiyor ve yazılım kalitesi ile güvenilirliğini sağlamaya odaklanıyorum.'
                : 'Currently working as a Test Engineer Intern at Tegsoft, I design comprehensive test cases, manage defects, and focus on ensuring software quality and reliability.'
              }
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {currentLocale === 'tr' 
                ? 'Daha önce KUAV\'ın Teknofest Savaş UAV projesine liderlik ettim. PX4, MAVROS, ROS ve bilgisayarlı görme hedef tespit sistemleri kullanarak çoklu-UAV otonomisi geliştirdim.'
                : 'Previously, I led KUAV\'s Teknofest Combat UAV project, developing multi-UAV autonomy using PX4, MAVROS, ROS, and computer vision target detection systems.'
              }
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentLocale === 'tr' 
                ? 'Mühendisliğin ötesinde, Ekonomi ve Küresel İş Stratejisi çalıştım. Bu da disiplinler arası bakış açımı ve iş anlayışımı güçlendirdi.'
                : 'Beyond engineering, I studied Economics and Global Business Strategy, which has strengthened my interdisciplinary perspective and business acumen.'
              }
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-light mb-8 text-black dark:text-white">
              {currentLocale === 'tr' ? 'Deneyim' : 'Experience'}
            </h2>
            <div className="space-y-8">
              <div className="border-l-2 border-gray-200 dark:border-gray-800 pl-6">
                <h3 className="text-lg font-medium text-black dark:text-white">
                  {currentLocale === 'tr' ? 'Test Mühendisi Stajyeri' : 'Test Engineer Intern'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Tegsoft · {currentLocale === 'tr' ? 'Tem 2025 – Şimdiki' : 'Jul 2025 – Present'}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentLocale === 'tr' 
                    ? 'Manuel ve regresyon testleri, CTI pop-up\'ları, inbound/outbound kampanya doğrulaması ve hata yönetimi.'
                    : 'Manual & regression testing, CTI pop-ups, inbound/outbound campaign validation, and defect management.'
                  }
                </p>
              </div>
              
              <div className="border-l-2 border-gray-200 dark:border-gray-800 pl-6">
                <h3 className="text-lg font-medium text-black dark:text-white">
                  {currentLocale === 'tr' ? 'Takım Lideri — KUAV' : 'Team Lead — KUAV'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {currentLocale === 'tr' ? 'Koç Üniversitesi · Eyl 2023 – Ağu 2025' : 'Koç University · Sep 2023 – Aug 2025'}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentLocale === 'tr' 
                    ? 'Teknofest yarışması için PX4, MAVROS, ROS ve bilgisayarlı görme hedef tespiti kullanarak çoklu-UAV otonom geliştirmesine liderlik ettim.'
                    : 'Led multi-UAV autonomy development using PX4, MAVROS, ROS, and computer vision target detection for Teknofest competition.'
                  }
                </p>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-800 pl-6">
                <h3 className="text-lg font-medium text-black dark:text-white">
                  {currentLocale === 'tr' ? 'Başkan Yardımcısı — KUAIRS' : 'Vice President — KUAIRS'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {currentLocale === 'tr' ? 'Koç Üniversitesi · Eyl 2023 – Ağu 2025' : 'Koç University · Sep 2023 – Aug 2025'}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentLocale === 'tr' 
                    ? 'AI ve Robotik etkinlikleri organize ettim ve otonom sistemler ile yapay zeka alanında öğrenci liderliğindeki projeleri destekledim.'
                    : 'Organized AI & Robotics events and supported student-led projects in autonomous systems and artificial intelligence.'
                  }
                </p>
              </div>
            </div>
          </section>

          {/* Key Skills */}
          <section>
            <h2 className="text-2xl font-light mb-8 text-black dark:text-white">
              {currentLocale === 'tr' ? 'Temel Yetenekler' : 'Key Skills'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-3">
                  {currentLocale === 'tr' ? 'Test & QA' : 'Testing & QA'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {currentLocale === 'tr' 
                    ? 'Manuel Test, Regresyon Testi, Test Senaryosu Tasarımı, Hata Yönetimi'
                    : 'Manual Testing, Regression Testing, Test Case Design, Defect Management'
                  }
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-3">
                  {currentLocale === 'tr' ? 'UAV & Robotik' : 'UAV & Robotics'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {currentLocale === 'tr' 
                    ? 'PX4 Autopilot, MAVROS, ROS, Gazebo Simülasyonu, Bilgisayarlı Görme'
                    : 'PX4 Autopilot, MAVROS, ROS, Gazebo Simulation, Computer Vision'
                  }
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-3">
                  {currentLocale === 'tr' ? 'Geliştirme' : 'Development'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Python, PyTorch, Next.js, TypeScript, Unity, C#
                </p>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-2xl font-light mb-8 text-black dark:text-white">
              {currentLocale === 'tr' ? 'Önemli Başarılar' : 'Key Achievements'}
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-black dark:text-white">
                    {currentLocale === 'tr' ? 'TÜBİTAK 2204-A Yarışması' : 'TÜBİTAK 2204-A Competition'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {currentLocale === 'tr' ? 'Türkiye 3.sü - Oksijen Konsantratörü Otomasyonu' : '3rd Place in Turkey - Oxygen Concentrator Automation'}
                  </p>
                </div>
                <span className="text-gray-600 dark:text-gray-400">2021</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-black dark:text-white">
                    {currentLocale === 'tr' ? 'Patent — Lazer Densimetre' : 'Patent — Laser Densimeter'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {currentLocale === 'tr' ? 'Kırılma tabanlı yoğunluk ölçüm sistemi' : 'Refraction-based density measurement system'}
                  </p>
                </div>
                <span className="text-gray-600 dark:text-gray-400">2021</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-black dark:text-white">
                    {currentLocale === 'tr' ? 'Patent — Antimikrodalga Gömlek' : 'Patent — Antimicrowave Shirt'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {currentLocale === 'tr' ? 'EM radyasyon korumalı giyim' : 'EM radiation protection wearable'}
                  </p>
                </div>
                <span className="text-gray-600 dark:text-gray-400">2023</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
