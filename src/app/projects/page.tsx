'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ProjectsClient } from './client';
import { getDictionary, getLocaleFromPathname, Dictionary } from '@/lib/i18n';

export default function ProjectsPage() {
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
  // Project data for static export
  const allProjects = [
    {
      slug: 'qa-tegsoft',
      title: 'QA Engineer — Tegsoft Test Engineering Internship',
      title_tr: 'QA Mühendisi — Tegsoft Test Mühendisliği Stajı',
      date: '2025-01-01',
      summary: 'Full-time QA Engineer Intern at Tegsoft. Functional & regression testing, test case design, bug tracking in Agile environment.',
      summary_tr: 'Tegsoft\'ta tam zamanlı QA Mühendisi Stajyeri. Fonksiyonel & regresyon testleri, test senaryosu tasarımı, çevik ortamda hata takibi.',
      content: 'Spearheaded comprehensive quality assurance initiatives as a full-time QA Engineer at Tegsoft, orchestrating end-to-end testing strategies that encompass functional validation, regression analysis, and exploratory testing methodologies. Architected robust test frameworks while maintaining meticulous defect lifecycle management within agile development cycles. Successfully elevated product reliability standards across Tegsoft\'s enterprise platform, ensuring seamless user experiences and optimal system performance.',
      content_tr: 'Tegsoft\'ta tam zamanlı QA Mühendisi olarak kapsamlı kalite güvencesi girişimlerine öncülük ettim ve fonksiyonel doğrulama, regresyon analizi ve keşifsel test metodolojilerini kapsayan uçtan uca test stratejileri düzenledim. Çevik geliştirme döngüleri içinde titiz hata yaşam döngüsü yönetimi sürdürürken sağlam test çerçeveleri tasarladım. Tegsoft\'ın kurumsal platformunda ürün güvenilirlik standartlarını başarıyla yükselttim, sorunsuz kullanıcı deneyimleri ve optimal sistem performansı sağladım.',
      cover: '/images/qa-tegsoft.jpg',
      tags: ['domain:qa', 'tech:browserstack', 'tech:postman', 'tech:agile', 'tech:testing'],
      weight: 10
    },
    {
      slug: 'kuav-combat-uav',
      title: 'Teknofest Combat UAV — KUAV Team Captain',
      title_tr: 'Teknofest Savaş UAV — KUAV Takım Kaptanı',
      date: '2023-09-01',
      summary: 'Team Captain for KUAV in Teknofest Combat UAV competition. Autonomous flight algorithms with computer vision.',
      summary_tr: 'Teknofest Savaş UAV yarışmasında KUAV Takım Kaptanı. Bilgisayarlı görme ile otonom uçuş algoritmaları.',
      content: 'Commanded KUAV as Team Captain in Turkey\'s premier Teknofest Combat UAV competition, pioneering cutting-edge autonomous aviation technologies. Engineered sophisticated flight control algorithms leveraging PX4 autopilot framework, seamlessly integrated with ROS/MAVROS ecosystems for real-time vehicle coordination. Developed advanced computer vision systems for precision target acquisition and dynamic tracking capabilities. Orchestrated comprehensive multi-UAV simulation environments in Gazebo while conducting rigorous real-world flight testing protocols. Delivered a revolutionary autonomous aerial platform featuring intelligent decision-making and vision-guided engagement systems.',
      content_tr: 'Türkiye\'nin önde gelen Teknofest Savaş UAV yarışmasında KUAV\'a Takım Kaptanı olarak komuta ettim ve çığır açan otonom havacılık teknolojilerine öncülük ettim. PX4 otopilot çerçevesinden yararlanan sofistike uçuş kontrol algoritmaları geliştirdim ve gerçek zamanlı araç koordinasyonu için ROS/MAVROS ekosistemleriyle sorunsuz entegrasyon sağladım. Hassas hedef edinimi ve dinamik takip yetenekleri için gelişmiş bilgisayarlı görme sistemleri geliştirdim. Sıkı gerçek dünya uçuş test protokolleri yürütürken Gazebo\'da kapsamlı çoklu-UAV simülasyon ortamları düzenledim. Akıllı karar verme ve görme güdümlü angajman sistemleri içeren devrimci otonom hava platformu teslim ettim.',
      cover: '/images/kuav-combat-uav.jpg',
      tags: ['domain:uav', 'tech:px4', 'tech:mavros', 'tech:ros', 'tech:gazebo'],
      weight: 9
    },
    {
      slug: 'aurora-ai',
      title: 'Aurora AI — AI Chat for Marketing Strategy',
      title_tr: 'Aurora AI — Pazarlama Stratejisi için AI Chat',
      date: '2024-11-01',
      summary: 'GPT API-powered AI chatbot for professional marketing. Strategic conversation flows and content generation.',
      summary_tr: 'Profesyonel pazarlama için GPT API destekli AI chatbot. Stratejik konuşma akışları ve içerik üretimi.',
      content: 'Architected Aurora AI, an enterprise-grade conversational intelligence platform powered by OpenAI\'s GPT API, specifically engineered for strategic marketing applications. Designed sophisticated conversational workflows that seamlessly blend data-driven insights with creative content generation, enabling dynamic strategy formulation and automated marketing asset creation. Developed a fully functional prototype featuring advanced natural language processing capabilities, intuitive user interfaces, and scalable architecture for business deployment. Successfully bridged the gap between cutting-edge artificial intelligence and tangible business value, creating a transformative tool for modern marketing professionals.',
      content_tr: 'Stratejik pazarlama uygulamaları için özel olarak tasarlanmış OpenAI\'nin GPT API\'si ile desteklenen kurumsal düzeyde konuşmalı zeka platformu Aurora AI\'yi tasarladım. Veri odaklı içgörüleri yaratıcı içerik üretimiyle sorunsuz bir şekilde harmanlayan sofistike konuşma iş akışları tasarlayarak dinamik strateji formülasyonu ve otomatik pazarlama varlığı oluşturulmasını sağladım. Gelişmiş doğal dil işleme yetenekleri, sezgisel kullanıcı arayüzleri ve iş dağıtımı için ölçeklenebilir mimari içeren tamamen işlevsel prototip geliştirdim. En son yapay zeka ile somut iş değeri arasındaki boşluğu başarıyla kapattım ve modern pazarlama profesyonelleri için dönüştürücü bir araç yarattım.',
      cover: '/images/aurora-ai.jpg',
      tags: ['domain:ai', 'tech:python', 'tech:gpt', 'tech:api'],
      weight: 8
    },
    {
      slug: 'baturk-strategy-game',
      title: 'Batürk — Strategy Game',
      title_tr: 'Batürk — Strateji Oyunu',
      date: '2023-07-01',
      summary: 'Cross-platform strategy board game with unique mechanics. Flutter & Dart 3, AI opponents with minimax algorithm.',
      summary_tr: 'Benzersiz mekaniğe sahip çapraz platform strateji kutu oyunu. Flutter & Dart 3, minimax algoritmalı AI rakipler.',
      content: 'Conceptualized and developed Batürk, an innovative cross-platform strategic board game featuring revolutionary gameplay mechanics that redefine traditional strategy gaming. Leveraged Flutter framework and Dart 3 to create a seamless multi-device experience spanning mobile, web, and desktop platforms. Engineered sophisticated turn-based strategic gameplay on an 8x8 tactical grid, incorporating dynamic Tower evolution mechanics that introduce unprecedented depth and strategic complexity. Implemented advanced artificial intelligence opponents utilizing minimax algorithms enhanced with alpha-beta pruning for optimal computational efficiency. Delivered a groundbreaking gaming experience that combines original rule systems with cutting-edge technology, establishing new paradigms in digital board game design.',
      content_tr: 'Geleneksel strateji oyunlarını yeniden tanımlayan devrimci oynanış mekaniği içeren yenilikçi çapraz platform stratejik kutu oyunu Batürk\'ü kavramsallaştırdım ve geliştirdim. Mobil, web ve masaüstü platformlarına yayılan sorunsuz çoklu cihaz deneyimi yaratmak için Flutter çerçevesi ve Dart 3\'ten yararlandım. Eşi benzeri görülmemiş derinlik ve stratejik karmaşıklık sunan dinamik Kule evrim mekaniği içeren 8x8 taktiksel ızgarada sofistike sıra tabanlı stratejik oynanış geliştirdim. Optimal hesaplama verimliliği için alfa-beta budama ile geliştirilmiş minimax algoritmaları kullanan gelişmiş yapay zeka rakipleri uyguladım. Orijinal kural sistemlerini en son teknolojiyle birleştiren çığır açan oyun deneyimi sunarak dijital kutu oyunu tasarımında yeni paradigmalar oluşturdum.',
      cover: '/images/mobile-game.jpg',
      tags: ['domain:game', 'tech:flutter', 'tech:dart'],
      weight: 7
    },
    {
      slug: 'edom',
      title: 'EDOM — Parent-Supported Reading Intervention',
      title_tr: 'EDOM — Ebeveyn Destekli Okuma Müdahalesi',
      date: '2024-05-01',
      summary: 'Web platform for literacy education with interactive exercises. Family Guide for parental support to enhance reading skills.',
      summary_tr: 'Etkileşimli egzersizlerle okur-yazarlık eğitimi web platformu. Okuma becerilerini geliştirmek için Aile Rehberi.',
      content: 'Engineered EDOM, a comprehensive digital literacy intervention platform utilizing cutting-edge web technologies to revolutionize early childhood reading education. Developed immersive, interactive learning modules targeting critical cognitive domains including reading comprehension, memory enhancement, and lexical access optimization. Integrated evidence-based pedagogical frameworks with engaging gamification elements to maximize learning retention and student motivation. Created an innovative Family Guide system that empowers parents with research-backed strategies and real-time progress monitoring tools. Delivered a transformative educational technology solution that bridges the gap between academic research and practical application, significantly improving literacy outcomes for young learners.',
      content_tr: 'Erken çocukluk okuma eğitimini devrimleştirmek için en son web teknolojilerini kullanan kapsamlı dijital okur-yazarlık müdahale platformu EDOM\'u geliştirdim. Okuduğunu anlama, hafıza geliştirme ve leksik erişim optimizasyonu dahil kritik bilişsel alanları hedefleyen sürükleyici, etkileşimli öğrenme modülleri geliştirdim. Öğrenme tutmayı ve öğrenci motivasyonunu en üst düzeye çıkarmak için kanıta dayalı pedagojik çerçeveleri ilgi çekici oyunlaştırma öğeleriyle entegre ettim. Ebeveynleri araştırma destekli stratejiler ve gerçek zamanlı ilerleme izleme araçlarıyla güçlendiren yenilikçi Aile Rehberi sistemi yarattım. Akademik araştırma ile pratik uygulama arasındaki boşluğu kapatan ve genç öğreniciler için okur-yazarlık sonuçlarını önemli ölçüde iyileştiren dönüştürücü eğitim teknolojisi çözümü teslim ettim.',
      cover: '/images/edom.jpg',
      tags: ['domain:web', 'domain:education', 'tech:html', 'tech:css', 'tech:javascript'],
      weight: 6
    },
    {
      slug: 'konus-kazan',
      title: 'Konuş Kazan — Educational Board Game (Web Version)',
      title_tr: 'Konuş Kazan — Eğitici Kutu Oyunu (Web Versiyonu)',
      date: '2025-03-21',
      summary: 'Web-based educational board game to enhance communication skills. Interactive digital experience with HTML, CSS, JavaScript.',
      summary_tr: 'İletişim becerilerini geliştiren web tabanlı eğitici kutu oyunu. HTML, CSS, JavaScript ile etkileşimli dijital deneyim.',
      content: 'Conceptualized and developed Konuş Kazan, an innovative digital board game platform specifically designed to enhance interpersonal communication skills through immersive interactive gameplay. Leveraged modern web technologies including HTML5, CSS3, and advanced JavaScript frameworks to create an engaging, responsive gaming environment that seamlessly adapts across all devices. Implemented sophisticated game mechanics that combine entertainment with educational objectives, fostering critical thinking, active listening, and effective verbal expression. Designed intuitive user interfaces and dynamic content delivery systems that maintain player engagement while delivering measurable learning outcomes. Created a revolutionary educational gaming experience that transforms traditional communication training into an enjoyable, memorable, and highly effective learning journey.',
      content_tr: 'Sürükleyici etkileşimli oynanış yoluyla kişilerarası iletişim becerilerini geliştirmek için özel olarak tasarlanmış yenilikçi dijital kutu oyunu platformu Konuş Kazan\'ı kavramsallaştırdım ve geliştirdim. Tüm cihazlarda sorunsuz bir şekilde uyum sağlayan ilgi çekici, duyarlı oyun ortamı yaratmak için HTML5, CSS3 ve gelişmiş JavaScript çerçeveleri dahil modern web teknolojilerinden yararlandım. Eğlenceyi eğitim hedefleriyle birleştiren, eleştirel düşünmeyi, aktif dinlemeyi ve etkili sözel ifadeyi destekleyen sofistike oyun mekaniği uyguladım. Ölçülebilir öğrenme sonuçları sunarken oyuncu katılımını sürdüren sezgisel kullanıcı arayüzleri ve dinamik içerik dağıtım sistemleri tasarladım. Geleneksel iletişim eğitimini keyifli, unutulmaz ve son derece etkili öğrenme yolculuğuna dönüştüren devrimci eğitici oyun deneyimi yarattım.',
      cover: '/images/konus-kazan.jpg',
      tags: ['domain:web', 'domain:game', 'tech:html', 'tech:css', 'tech:javascript'],
      weight: 5
    },
    {
      slug: 'tubitak-oxygen-concentrator',
      title: 'TÜBİTAK 2204-A — Oxygen Concentrator Automation',
      title_tr: 'TÜBİTAK 2204-A — Oksijen Konsantratörü Otomasyonu',
      date: '2021-04-01',
      summary: '3rd place in Turkey at TÜBİTAK National Science Competition. Python automation for oxygen concentrators with dynamic delivery.',
      summary_tr: 'TÜBİTAK Ulusal Bilim Yarışması Türkiye 3.\'sü. Dinamik dağıtımlı oksijen konsantratörü Python otomasyonu.',
      content: 'Achieved prestigious 3rd place recognition in Turkey\'s highly competitive TÜBİTAK National Science Competition, representing the pinnacle of scientific innovation among the nation\'s brightest young researchers. Engineered a groundbreaking automated oxygen concentrator system utilizing advanced Python programming to revolutionize respiratory care delivery. Developed intelligent dynamic algorithms that optimize oxygen flow rates based on real-time patient monitoring, significantly enhancing sleep quality and overall breathing efficiency for patients with respiratory conditions. Created a paradigm-shifting healthcare technology solution that seamlessly integrates medical device automation with patient-centric care optimization. Earned national recognition for pioneering contributions to healthcare innovation, establishing new standards for medical device intelligence and patient outcome improvement.',
      content_tr: 'Ülkenin en parlak genç araştırmacıları arasında bilimsel inovasyonun zirvesini temsil eden Türkiye\'nin son derece rekabetçi TÜBİTAK Ulusal Bilim Yarışması\'nda prestijli 3. sırayı elde ettim. Solunum bakım dağıtımını devrimleştirmek için gelişmiş Python programlama kullanan çığır açan otomatik oksijen konsantratörü sistemi geliştirdim. Gerçek zamanlı hasta izlemeye dayalı oksijen akış oranlarını optimize eden akıllı dinamik algoritmalar geliştirerek solunum problemleri olan hastaların uyku kalitesini ve genel nefes alma verimliliğini önemli ölçüde artırdım. Tıbbi cihaz otomasyonunu hasta merkezli bakım optimizasyonuyla sorunsuz bir şekilde entegre eden paradigma değiştiren sağlık teknolojisi çözümü yarattım. Sağlık inovasyonuna öncü katkılarım için ulusal tanınırlık kazandım ve tıbbi cihaz zekası ile hasta sonucu iyileştirmesi için yeni standartlar oluşturdum.',
      cover: '/images/tubitak-oxygen.jpg',
      tags: ['domain:ai', 'domain:medical', 'tech:python'],
      weight: 4
    },
    {
      slug: 'antimicrowave-shirt-patent',
      title: 'Patent — Shirt with Antimicrowave Pockets',
      title_tr: 'Patent — Antimikrodalga Cepli Gömlek',
      date: '2023-10-23',
      summary: 'Patented shirt with radiation-blocking pocket filters. Protects against mobile phone electromagnetic radiation while maintaining signal.',
      summary_tr: 'Radyasyon engelleyici cep filtreli patentli gömlek. Sinyal alımını koruyarak cep telefonu elektromanyetik radyasyonundan korur.',
      cover: '/images/patent-shirt.jpg',
      tags: ['domain:medical', 'domain:innovation', 'tech:materials'],
      weight: 3,
      isPatent: true,
      patentNumber: '2022/002640',
      publishDate: '23 Eki 2023',
      abstract: 'The invention relates to a shirt with pockets containing a thin and flexible metal-based radiation filter, designed to block a significant portion of microwave radiation—a frequency range commonly used in wireless communication. Many individuals carry their mobile phones in their pockets, leading to prolonged exposure to electromagnetic radiation. To mitigate this exposure, the inner sections of the pockets (facing the body) are lined with a radiation-blocking filter, effectively reducing the transmission of electromagnetic waves to the body.',
      abstract_tr: 'Buluş, kablosuz iletişimde yaygın olarak kullanılan bir frekans aralığı olan mikrodalga radyasyonunun önemli bir bölümünü engellemek üzere tasarlanmış, ince ve esnek metal tabanlı radyasyon filtresi içeren cepli bir gömlek ile ilgilidir. Birçok kişi cep telefonlarını ceplerinde taşır ve bu da uzun süreli elektromanyetik radyasyon maruziyetine yol açar. Bu maruziyeti azaltmak için ceplerin iç kısımları (vücuda bakan) radyasyon engelleyici filtre ile kaplanarak elektromanyetik dalgaların vücuda geçişi etkili bir şekilde azaltılır.'
    },
    {
      slug: 'laser-densimeter-patent',
      title: 'Patent — Laser Densimeter',
      title_tr: 'Patent — Lazer Densimetre',
      date: '2021-12-21',
      summary: 'Patented laser-based density measurement device using refraction principles. Instant, accurate measurements for unknown liquids.',
      summary_tr: 'Kırılma prensipleri kullanan lazer tabanlı yoğunluk ölçüm cihazı patenti. Bilinmeyen sıvılar için anında, doğru ölçümler.',
      cover: '/images/patent-laser.jpg',
      tags: ['domain:medical', 'domain:innovation', 'tech:laser', 'tech:optics'],
      weight: 2,
      isPatent: true,
      patentNumber: '2021/01682',
      publishDate: '21 Ara 2021',
      abstract: 'The invention is designed to measure the density of unknown liquids using laser-based refraction principles. The system operates on the fundamental concept that light refracts at different angles depending on the density of the liquid it passes through. To conduct a measurement, the liquid is placed into the upper chamber of the device, and a laser beam is projected through it. The density is determined instantly based on the refraction angle, providing a fast, practical, and efficient measurement process.',
      abstract_tr: 'Buluş, lazer tabanlı kırılma prensipleri kullanarak bilinmeyen sıvıların yoğunluğunu ölçmek üzere tasarlanmıştır. Sistem, ışığın geçtiği sıvının yoğunluğuna bağlı olarak farklı açılarda kırılması temel konseptine dayanır. Ölçüm yapmak için sıvı cihazın üst bölmesine yerleştirilir ve üzerine lazer ışını gönderilir. Yoğunluk, kırılma açısına dayalı olarak anında belirlenir ve hızlı, pratik ve verimli bir ölçüm süreci sağlar.'
    }
  ];


  // Get current locale for dynamic content
  const currentLocale = getLocaleFromPathname(pathname);
  
  // Process projects for current locale
  const localizedProjects = allProjects.map(project => ({
    ...project,
    title: currentLocale === 'tr' && project.title_tr ? project.title_tr : project.title,
    summary: currentLocale === 'tr' && project.summary_tr ? project.summary_tr : project.summary
  }));

  return (
    <ProjectsClient allProjects={localizedProjects} dict={dict} />
  );
}
