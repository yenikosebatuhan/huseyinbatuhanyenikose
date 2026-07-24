// Single source of truth for all projects, shared by the home and projects pages.
// Copy is intentionally concrete and understated — what was built, with what, and why.

export type Domain =
  | 'backend'
  | 'web'
  | 'mobile'
  | 'systems'
  | 'ai'
  | 'uav'
  | 'innovation';

export interface ProjectItem {
  slug: string;
  title: string;
  title_tr?: string;
  /** Human-friendly period shown on the card. */
  period: string;
  domains: Domain[];
  stack: string[];
  summary: string;
  summary_tr?: string;
  /** Longer description shown in the detail modal. */
  content: string;
  content_tr?: string;
  weight: number;
  featured?: boolean;
  repo?: string;
  demo?: string;
  /** Two-letter monogram used on the generated cover. */
  monogram: string;
  isPatent?: boolean;
  patentNumber?: string;
  abstract?: string;
  abstract_tr?: string;
}

export const projects: ProjectItem[] = [
  {
    slug: 'chargesquare',
    title: 'ChargeSquare — EV-Charging Backend',
    title_tr: 'ChargeSquare — EV Şarj Backend',
    period: '2025',
    domains: ['backend'],
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes', 'React'],
    summary:
      'Three cooperating Spring Boot microservices running a full start → stop → bill → settle charging flow, with JWT/RBAC security and two-layer idempotency.',
    summary_tr:
      'Tam bir başlat → durdur → faturala → tahsil et şarj akışını yürüten üç işbirlikçi Spring Boot mikroservisi; JWT/RBAC güvenliği ve iki katmanlı idempotency ile.',
    content:
      'A microservices case study built as three cooperating Spring Boot services — Station, Session and Wallet — over a shared PostgreSQL database. The Session service orchestrates the full charging lifecycle: it reads the tariff and occupies a connector on the Station service, then at stop time prices the energy and settles the cost against the Wallet service over synchronous REST.\n\nSecurity is stateless JWT with role-based access control (ADMIN / VIEWER) enforced server-side across all three services. Billing is decimal-safe (BigDecimal), and a two-layer idempotency design — a client Idempotency-Key plus a wallet debit keyed by session id — guarantees that a retried stop never double-charges. The whole system runs with one `docker compose up`, ships Kubernetes manifests and a GitHub Actions CI pipeline, and is covered by 23 automated tests including a Testcontainers + WireMock integration test. A React operations panel drives the flow end to end.',
    content_tr:
      'Paylaşılan bir PostgreSQL veritabanı üzerinde üç işbirlikçi Spring Boot servisi — Station, Session ve Wallet — olarak kurulan bir mikroservis vaka çalışması. Session servisi tüm şarj yaşam döngüsünü yönetir: Station servisinden tarifeyi okur ve bir konnektörü meşgul eder, durdurma anında enerjiyi fiyatlandırır ve maliyeti senkron REST üzerinden Wallet servisiyle tahsil eder.\n\nGüvenlik, üç serviste de sunucu tarafında uygulanan rol tabanlı erişim kontrollü (ADMIN / VIEWER) durumsuz JWT’dir. Faturalama ondalık-güvenlidir (BigDecimal) ve iki katmanlı idempotency tasarımı — istemci Idempotency-Key’i artı oturum kimliğiyle anahtarlanan cüzdan borçlandırması — tekrarlanan bir durdurmanın asla çift ücret kesmemesini garanti eder. Sistem tek bir `docker compose up` ile çalışır, Kubernetes manifestleri ve bir GitHub Actions CI hattı içerir, ve Testcontainers + WireMock entegrasyon testi dahil 23 otomatik testle kaplıdır. Bir React operasyon paneli akışı uçtan uca sürer.',
    weight: 100,
    featured: true,
    repo: 'https://github.com/yenikosebatuhan/chargesquare-case-study',
    monogram: 'CS',
  },
  {
    slug: 'hospital-management',
    title: 'Hospital Management System',
    title_tr: 'Hastane Yönetim Sistemi',
    period: '2026',
    domains: ['web', 'backend'],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'SQLite'],
    summary:
      'A full-stack hospital platform with an admin panel for patient records, appointments, staff management and analytics.',
    summary_tr:
      'Hasta kayıtları, randevular, personel yönetimi ve analizler için yönetim paneli olan full-stack bir hastane platformu.',
    content:
      'A full-stack hospital management platform with an admin panel covering patient records, appointments, staff management and hospital analytics. Built with Next.js and TypeScript for a type-safe front end and API layer, using Prisma ORM over SQLite for the data model and migrations. Designed for a one-command local setup so the whole system can be run and demoed without external services.',
    content_tr:
      'Hasta kayıtları, randevular, personel yönetimi ve hastane analizlerini kapsayan bir yönetim paneline sahip full-stack hastane yönetim platformu. Tip-güvenli bir ön yüz ve API katmanı için Next.js ve TypeScript ile, veri modeli ve migrasyonlar için SQLite üzerinde Prisma ORM kullanılarak geliştirildi. Tüm sistemin harici servisler olmadan çalıştırılıp gösterilebilmesi için tek komutla yerel kurulum sağlayacak şekilde tasarlandı.',
    weight: 90,
    featured: true,
    repo: 'https://github.com/yenikosebatuhan/Hospital_Management_System',
    monogram: 'HM',
  },
  {
    slug: 'towers',
    title: 'TOWERS — Strategy Board Game',
    title_tr: 'TOWERS — Strateji Kutu Oyunu',
    period: '2025 – 2026',
    domains: ['mobile'],
    stack: ['Flutter', 'Dart'],
    summary:
      'A release-ready cross-platform strategy board game with a custom 8×8 engine and dynamic tower-stacking mechanics.',
    summary_tr:
      'Özel bir 8×8 motoru ve dinamik kule-istifleme mekaniğine sahip, yayına hazır çapraz-platform strateji kutu oyunu.',
    content:
      'A cross-platform 2D strategy board game built with Flutter and Dart, prepared for Play Store release. It runs on a custom 8×8 game engine with dynamic tower-stacking mechanics, plus rule enforcement and move validation for deterministic, fair play. Beyond the gameplay I handled the production path: build optimization, asset compression and store configuration.',
    content_tr:
      'Flutter ve Dart ile geliştirilen, Play Store yayınına hazırlanan çapraz-platform 2D strateji kutu oyunu. Özel bir 8×8 oyun motoru üzerinde dinamik kule-istifleme mekaniğiyle çalışır; deterministik ve adil oyun için kural uygulama ve hamle doğrulama içerir. Oynanışın ötesinde üretim sürecini de yürüttüm: derleme optimizasyonu, varlık sıkıştırma ve mağaza yapılandırması.',
    weight: 80,
    featured: true,
    demo: 'https://play.google.com/store/apps/details?id=com.towers.game',
    monogram: 'TW',
  },
  {
    slug: 'shell-ish',
    title: 'Shell-ish — Unix-Style Shell',
    title_tr: 'Shell-ish — Unix Tarzı Kabuk',
    period: '2026',
    domains: ['systems'],
    stack: ['C', 'POSIX', 'Operating Systems'],
    summary:
      'An interactive Unix-style shell in C: command parsing, I/O redirection, pipes and background process management.',
    summary_tr:
      'C ile yazılmış etkileşimli Unix tarzı kabuk: komut ayrıştırma, G/Ç yönlendirme, borular ve arka plan süreç yönetimi.',
    content:
      'An interactive Unix-style shell written in C for an operating-systems course (COMP 304). It parses and executes commands, supports I/O redirection and pipes between processes, and manages background jobs. The project was an exercise in the process lifecycle — fork/exec/wait, file descriptors and signal handling — at the systems level.',
    content_tr:
      'Bir işletim sistemleri dersi (COMP 304) için C ile yazılmış etkileşimli Unix tarzı kabuk. Komutları ayrıştırıp yürütür, süreçler arası G/Ç yönlendirme ve boruları destekler, ve arka plan işlerini yönetir. Proje, sistem düzeyinde süreç yaşam döngüsü — fork/exec/wait, dosya tanımlayıcıları ve sinyal yönetimi — üzerine bir çalışmaydı.',
    weight: 70,
    repo: 'https://github.com/yenikosebatuhan/Shell-ish',
    monogram: 'SH',
  },
  {
    slug: 'kuav-combat-uav',
    title: 'Teknofest Combat UAV — KUAV',
    title_tr: 'Teknofest Savaş İHA — KUAV',
    period: '2023 – 2025',
    domains: ['uav', 'ai'],
    stack: ['PX4', 'MAVROS', 'ROS', 'Gazebo', 'Computer Vision'],
    summary:
      'As team captain, led multi-UAV autonomy for the Teknofest Combat UAV competition — flight control, coordination and vision-based target detection.',
    summary_tr:
      'Takım kaptanı olarak, Teknofest Savaş İHA yarışması için çoklu-İHA otonomisine liderlik ettim — uçuş kontrolü, koordinasyon ve görme tabanlı hedef tespiti.',
    content:
      'As team captain of KUAV, I led autonomy development for the Teknofest Combat UAV competition. The work spanned PX4/MAVROS flight control, ROS-based coordination between vehicles, and computer-vision target detection and tracking. We validated behaviour in Gazebo simulation before real-world flight testing, and I coordinated the sub-teams and external collaborations that made the build happen.',
    content_tr:
      'KUAV takım kaptanı olarak, Teknofest Savaş İHA yarışması için otonomi geliştirmesine liderlik ettim. Çalışma PX4/MAVROS uçuş kontrolü, araçlar arası ROS tabanlı koordinasyon ve bilgisayarlı görme hedef tespiti/takibini kapsıyordu. Davranışı gerçek uçuş testlerinden önce Gazebo simülasyonunda doğruladık; yapımı mümkün kılan alt takımları ve dış işbirliklerini koordine ettim.',
    weight: 60,
    monogram: 'UA',
  },
  {
    slug: 'legendary-club-owner',
    title: 'Legendary Club Owner — Landing Page',
    title_tr: 'Efsane Başkan — Açılış Sayfası',
    period: '2026',
    domains: ['web'],
    stack: ['React', 'Vite', 'Tailwind'],
    summary:
      'A mobile-first marketing landing page built as a React + Vite + Tailwind case study.',
    summary_tr:
      'React + Vite + Tailwind vaka çalışması olarak geliştirilen mobil öncelikli bir pazarlama açılış sayfası.',
    content:
      'A mobile-first landing page for the "Legendary Club Owner" (Efsane Başkan) product, built as a focused React + Vite + Tailwind case study. The emphasis was on a fast, responsive, conversion-oriented single page with clean component structure.',
    content_tr:
      '"Efsane Başkan" ürünü için, odaklı bir React + Vite + Tailwind vaka çalışması olarak geliştirilen mobil öncelikli bir açılış sayfası. Vurgu; temiz bileşen yapısına sahip, hızlı, duyarlı ve dönüşüm odaklı tek sayfaydı.',
    weight: 50,
    repo: 'https://github.com/yenikosebatuhan/legendary-club-owner',
    monogram: 'LC',
  },
  {
    slug: 'tubitak-oxygen',
    title: 'TÜBİTAK 2204-A — Oxygen Concentrator Automation',
    title_tr: 'TÜBİTAK 2204-A — Oksijen Konsantratörü Otomasyonu',
    period: '2021',
    domains: ['ai', 'innovation'],
    stack: ['Python', 'Automation'],
    summary:
      '3rd place in Turkey at the TÜBİTAK 2204-A national science competition — a Python automation system for oxygen concentrators.',
    summary_tr:
      'TÜBİTAK 2204-A ulusal bilim yarışmasında Türkiye 3.’sü — oksijen konsantratörleri için Python otomasyon sistemi.',
    content:
      'A Python-based automation system for oxygen concentrators, built to adjust oxygen delivery for patients with respiratory conditions. The project placed 3rd in Turkey at the TÜBİTAK 2204-A national research-project competition.',
    content_tr:
      'Solunum rahatsızlığı olan hastalar için oksijen dağıtımını ayarlamak amacıyla geliştirilen, oksijen konsantratörleri için Python tabanlı bir otomasyon sistemi. Proje, TÜBİTAK 2204-A ulusal araştırma-proje yarışmasında Türkiye 3.’sü oldu.',
    weight: 40,
    monogram: 'OX',
  },
  {
    slug: 'antimicrowave-shirt-patent',
    title: 'Patent — Shirt with Antimicrowave Pockets',
    title_tr: 'Patent — Antimikrodalga Cepli Gömlek',
    period: '2023',
    domains: ['innovation'],
    stack: ['Wearable', 'Materials'],
    summary:
      'A granted patent for a shirt whose pockets shield the body from mobile-phone electromagnetic radiation.',
    summary_tr:
      'Ceplerinin vücudu cep telefonu elektromanyetik radyasyonundan koruduğu bir gömlek için verilmiş patent.',
    content:
      'The invention is a shirt with pockets containing a thin, flexible metal-based radiation filter that blocks a significant portion of microwave radiation — the frequency range used in wireless communication. Because many people carry a phone in a pocket for long periods, the inner (body-facing) side of the pocket is lined with the filter, reducing the electromagnetic waves reaching the body.',
    content_tr:
      'Buluş, kablosuz iletişimde kullanılan frekans aralığı olan mikrodalga radyasyonunun önemli bir bölümünü engelleyen ince, esnek metal tabanlı bir radyasyon filtresi içeren cepli bir gömlektir. Birçok kişi telefonunu uzun süre cebinde taşıdığı için, cebin iç (vücuda bakan) tarafı filtreyle kaplanır ve vücuda ulaşan elektromanyetik dalgalar azaltılır.',
    weight: 30,
    isPatent: true,
    patentNumber: '2022/002640',
    monogram: 'PT',
  },
  {
    slug: 'laser-densimeter-patent',
    title: 'Patent — Laser Densimeter',
    title_tr: 'Patent — Lazer Yoğunluk Ölçer',
    period: '2021',
    domains: ['innovation'],
    stack: ['Laser', 'Optics'],
    summary:
      'A granted patent for a laser-refraction device that measures the density of an unknown liquid instantly.',
    summary_tr:
      'Bilinmeyen bir sıvının yoğunluğunu anında ölçen lazer-kırılma cihazı için verilmiş patent.',
    content:
      'The invention measures the density of unknown liquids using laser refraction. Light refracts at a different angle depending on the density of the liquid it passes through; the liquid is placed in the device’s upper chamber and a laser is projected through it, and the density is read instantly from the refraction angle — a fast, practical measurement.',
    content_tr:
      'Buluş, lazer kırılmasını kullanarak bilinmeyen sıvıların yoğunluğunu ölçer. Işık, geçtiği sıvının yoğunluğuna göre farklı bir açıyla kırılır; sıvı cihazın üst bölmesine konur ve üzerine lazer gönderilir, yoğunluk kırılma açısından anında okunur — hızlı, pratik bir ölçüm.',
    weight: 20,
    isPatent: true,
    patentNumber: '2021/01682',
    monogram: 'PT',
  },
];

export const domainLabels: Record<Domain, { en: string; tr: string }> = {
  backend: { en: 'Backend', tr: 'Backend' },
  web: { en: 'Web', tr: 'Web' },
  mobile: { en: 'Mobile', tr: 'Mobil' },
  systems: { en: 'Systems', tr: 'Sistem' },
  ai: { en: 'AI', tr: 'AI' },
  uav: { en: 'UAV', tr: 'İHA' },
  innovation: { en: 'Innovation', tr: 'İnovasyon' },
};

// Brand-consistent gradient per domain for the generated covers.
export const domainGradient: Record<Domain, string> = {
  backend: 'from-indigo-500 to-blue-600',
  web: 'from-sky-500 to-cyan-600',
  mobile: 'from-violet-500 to-purple-600',
  systems: 'from-slate-600 to-slate-800',
  ai: 'from-fuchsia-500 to-pink-600',
  uav: 'from-blue-500 to-indigo-700',
  innovation: 'from-amber-500 to-orange-600',
};

export function localizedTitle(p: ProjectItem, locale: string) {
  return locale === 'tr' && p.title_tr ? p.title_tr : p.title;
}
export function localizedSummary(p: ProjectItem, locale: string) {
  return locale === 'tr' && p.summary_tr ? p.summary_tr : p.summary;
}
export function localizedContent(p: ProjectItem, locale: string) {
  return locale === 'tr' && p.content_tr ? p.content_tr : p.content;
}
