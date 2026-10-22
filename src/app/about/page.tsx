'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Briefcase, GraduationCap, Award, MapPin } from 'lucide-react';
import { getLocaleFromPathname } from '@/lib/i18n';

interface Role {
  org: string;
  title: string;
  title_tr: string;
  period: string;
  period_tr: string;
  desc: string;
  desc_tr: string;
}

const EXPERIENCE: Role[] = [
  {
    org: 'Siemens',
    title: 'Part-Time Student Engineer — Test Automation',
    title_tr: 'Part-Time Öğrenci Mühendis — Test Otomasyonu',
    period: 'Feb 2026 – Sep 2026',
    period_tr: 'Şub 2026 – Eyl 2026',
    desc: 'Contributed to automated test development and maintenance for enterprise software using Java and test tooling; designed and ran functional and regression tests with developers and QA; worked with API testing, Git, CI/CD and containerized environments.',
    desc_tr: 'Kurumsal yazılım için Java ve test araçlarıyla otomatik test geliştirme ve bakımına katkı sağladım; geliştirici ve QA ekipleriyle fonksiyonel ve regresyon testleri tasarlayıp yürüttüm; API testi, Git, CI/CD ve konteyner ortamlarıyla çalıştım.',
  },
  {
    org: 'Tegsoft',
    title: 'QA Intern — Test Engineering',
    title_tr: 'QA Stajyeri — Test Mühendisliği',
    period: 'Jul 2025 – Oct 2025',
    period_tr: 'Tem 2025 – Eki 2025',
    desc: 'Executed manual, functional, regression and exploratory tests for web-based omnichannel software; cross-browser/device checks with BrowserStack; reported defects and documented test results.',
    desc_tr: 'Web tabanlı omnichannel yazılım için manuel, fonksiyonel, regresyon ve keşifsel testler yürüttüm; BrowserStack ile tarayıcı/cihaz kontrolleri yaptım; hataları raporlayıp test sonuçlarını belgeledim.',
  },
  {
    org: 'KUAV — Koç University',
    title: 'Team Lead — Teknofest Combat UAV',
    title_tr: 'Takım Lideri — Teknofest Savaş İHA',
    period: 'Sep 2023 – Aug 2025',
    period_tr: 'Eyl 2023 – Ağu 2025',
    desc: 'Led multi-UAV autonomy for the Teknofest competition using PX4/MAVROS, ROS and computer-vision target detection; coordinated sub-teams and external collaborations.',
    desc_tr: 'Teknofest yarışması için PX4/MAVROS, ROS ve bilgisayarlı görme hedef tespitiyle çoklu-İHA otonomisine liderlik ettim; alt takımları ve dış işbirliklerini koordine ettim.',
  },
  {
    org: 'KUAIRS — Koç University',
    title: 'Vice President — AI & Robotics Society',
    title_tr: 'Başkan Yardımcısı — Yapay Zeka & Robotik Topluluğu',
    period: 'Sep 2023 – Jul 2025',
    period_tr: 'Eyl 2023 – Tem 2025',
    desc: 'Organized AI & robotics events and technical workshops with industry experts, and supported student-led projects in autonomous systems.',
    desc_tr: 'Sektör uzmanlarıyla AI & robotik etkinlikleri ve teknik atölyeler düzenledim; otonom sistemler alanında öğrenci projelerini destekledim.',
  },
];

const SKILLS: { title: string; title_tr: string; items: string[] }[] = [
  {
    title: 'AI / Data',
    title_tr: 'AI / Veri',
    items: ['Azure Document Intelligence', 'Document Extraction', 'Regex / Rule-based Parsing', 'Game AI'],
  },
  {
    title: 'Backend',
    title_tr: 'Backend',
    items: ['FastAPI', 'Spring Boot', 'REST APIs', 'JWT / RBAC', 'PostgreSQL / SQL', 'Redis RQ'],
  },
  {
    title: 'Infrastructure',
    title_tr: 'Altyapı',
    items: ['Docker', 'Kubernetes', 'GitHub Actions CI/CD', 'Git'],
  },
  {
    title: 'Web / Mobile',
    title_tr: 'Web / Mobil',
    items: ['React', 'Next.js', 'TypeScript', 'Flutter (Dart)', 'Prisma ORM'],
  },
  {
    title: 'Languages',
    title_tr: 'Diller',
    items: ['Python', 'Java', 'TypeScript', 'C'],
  },
  {
    title: 'Testing & QA',
    title_tr: 'Test & QA',
    items: ['Test Automation', 'API Testing', 'Regression & Functional', 'Testcontainers', 'JUnit', 'BrowserStack', 'Postman', 'JIRA'],
  },
];

const ACHIEVEMENTS: { title: string; title_tr: string; sub: string; sub_tr: string; year: string }[] = [
  {
    title: 'TÜBİTAK 2204-A — 3rd in Turkey',
    title_tr: 'TÜBİTAK 2204-A — Türkiye 3.’sü',
    sub: 'Oxygen Concentrator Automation (Python)',
    sub_tr: 'Oksijen Konsantratörü Otomasyonu (Python)',
    year: '2021',
  },
  {
    title: 'Patent — Laser Densimeter',
    title_tr: 'Patent — Lazer Yoğunluk Ölçer',
    sub: 'Refraction-based density measurement · 2021/01682',
    sub_tr: 'Kırılma tabanlı yoğunluk ölçümü · 2021/01682',
    year: '2021',
  },
  {
    title: 'Patent — Antimicrowave Shirt',
    title_tr: 'Patent — Antimikrodalga Gömlek',
    sub: 'EM-radiation-shielding wearable · 2022/002640',
    sub_tr: 'EM radyasyonu engelleyen giyilebilir · 2022/002640',
    year: '2023',
  },
];

export default function AboutPage() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<'en' | 'tr'>('en');

  useEffect(() => {
    const sync = () => setLocale(getLocaleFromPathname(pathname));
    sync();
    window.addEventListener('languageChanged', sync);
    return () => window.removeEventListener('languageChanged', sync);
  }, [pathname]);

  const tr = locale === 'tr';

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
      {/* Header */}
      <div className="mono flex items-center gap-3 text-xs text-muted-foreground">
        <span className="text-gradient font-semibold">/ about</span>
        <span className="h-px w-8 bg-border" />
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
        {tr ? 'Hakkımda' : 'About'}
      </h1>

      {/* Bio */}
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
        <p>
          {tr
            ? 'Koç Üniversitesi’nde Bilgisayar Mühendisliği öğrencisiyim; backend API’ler, uygulamalı AI ve yazılım otomasyonu üzerine çalışıyorum. FastAPI ve Azure Document Intelligence ile AI destekli bir belge işleme MVP’si geliştirdim; Java / Spring Boot mikroservisleri yazdım ve bağımsız bir Flutter oyunu yayınladım. Baskı altında doğru çalışan sistemler kurmayı seviyorum — temiz servis sınırları, idempotent operasyonlar ve gerçekten regresyon yakalayan testler.'
            : 'I’m a Computer Engineering student at Koç University working on backend APIs, applied AI and software automation. I built an AI-assisted document-processing MVP with FastAPI and Azure Document Intelligence, developed Java / Spring Boot microservices, and published an independent Flutter game. I like systems that stay correct under pressure — clean service boundaries, idempotent operations, and tests that actually catch regressions.'}
        </p>
        <p>
          {tr
            ? 'Siemens’te test otomasyonu alanında part-time öğrenci mühendis olarak çalıştım; öncesinde Tegsoft’ta QA stajyeriydim. KUAV’ın Teknofest Savaş İHA takımına kaptanlık yaptım ve AI & Robotik topluluğunun başkan yardımcılığını üstlendim. Bu süreçte iki patentli cihazın ortak mucidi oldum ve TÜBİTAK’ta Türkiye 3.’lüğü kazandım. Şimdi junior AI mühendisliği, uygulamalı AI ve backend fırsatları arıyorum.'
            : 'I worked as a part-time student engineer in test automation at Siemens, and before that as a QA intern at Tegsoft. I captained KUAV’s Teknofest Combat UAV team and served as vice president of the AI & Robotics society. Along the way I co-invented two patented devices and placed 3rd nationally at TÜBİTAK. I’m now looking for junior AI engineering, applied AI and backend roles.'}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        {tr ? 'İstanbul, Türkiye' : 'Istanbul, Turkey'}
      </div>

      {/* Experience */}
      <section className="mt-16">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Briefcase className="h-5 w-5 text-[var(--brand)]" />
          {tr ? 'Deneyim' : 'Experience'}
        </h2>
        <div className="mt-6 space-y-6">
          {EXPERIENCE.map((r) => (
            <div key={r.org + r.title} className="relative rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-semibold">
                  {tr ? r.title_tr : r.title}
                  <span className="text-muted-foreground font-normal"> · {r.org}</span>
                </h3>
                <span className="mono shrink-0 text-xs text-muted-foreground">
                  {tr ? r.period_tr : r.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {tr ? r.desc_tr : r.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <GraduationCap className="h-5 w-5 text-[var(--brand)]" />
          {tr ? 'Eğitim' : 'Education'}
        </h2>
        <div className="mt-6 rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 className="font-semibold">
              {tr ? 'Koç Üniversitesi' : 'Koç University'}
              <span className="text-muted-foreground font-normal">
                {tr ? ' · Bilgisayar Mühendisliği (Lisans)' : ' · B.Sc. Computer Engineering'}
              </span>
            </h3>
            <span className="mono shrink-0 text-xs text-muted-foreground">
              {tr ? '2022 – 2027 (beklenen)' : '2022 – 2027 (expected)'}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {tr
              ? 'İlgili dersler: İşletim Sistemleri, Makine Öğrenmesi, Yapay Zeka, Bilgisayarlı Görme. Ayrıca Ekonomi ve Küresel İş Stratejisi çalıştım.'
              : 'Relevant coursework: Operating Systems, Machine Learning, Artificial Intelligence, Computer Vision. Also studied Economics and Global Business Strategy.'}
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-14">
        <h2 className="text-xl font-bold">{tr ? 'Yetenekler' : 'Skills'}</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SKILLS.map((g) => (
            <div key={g.title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mono text-xs uppercase tracking-wider text-muted-foreground">
                {tr ? g.title_tr : g.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <span key={i} className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Award className="h-5 w-5 text-[var(--brand)]" />
          {tr ? 'Başarılar' : 'Achievements'}
        </h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="flex items-start justify-between gap-4 p-5">
              <div>
                <h3 className="font-semibold">{tr ? a.title_tr : a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tr ? a.sub_tr : a.sub}</p>
              </div>
              <span className="mono shrink-0 text-sm text-muted-foreground">{a.year}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
