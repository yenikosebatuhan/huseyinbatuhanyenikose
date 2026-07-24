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
    period: 'Feb 2026 – Present',
    period_tr: 'Şub 2026 – Halen',
    desc: 'Develop and maintain automated test frameworks for enterprise applications, design and run automated test cases, and support CI/CD pipelines with developer, QA and DevOps teams.',
    desc_tr: 'Kurumsal uygulamalar için otomatik test çerçeveleri geliştirip sürdürüyorum, otomatik test senaryoları tasarlayıp çalıştırıyorum ve geliştirici, QA ve DevOps ekipleriyle CI/CD hatlarını destekliyorum.',
  },
  {
    org: 'Tegsoft',
    title: 'QA Intern — Test Engineering',
    title_tr: 'QA Stajyeri — Test Mühendisliği',
    period: 'Jul 2025 – Oct 2025',
    period_tr: 'Tem 2025 – Eki 2025',
    desc: 'Wrote and maintained manual & automated test cases for call-center / omnichannel software; functional, regression and exploratory testing with BrowserStack; defect tracking with developers.',
    desc_tr: 'Çağrı merkezi / omnichannel yazılımı için manuel ve otomatik test senaryoları yazdım; BrowserStack ile fonksiyonel, regresyon ve keşifsel testler yaptım; geliştiricilerle hata takibi yürüttüm.',
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
    title: 'Backend',
    title_tr: 'Backend',
    items: ['Java 21', 'Spring Boot', 'REST APIs', 'JWT / RBAC', 'JPA / Hibernate', 'PostgreSQL / SQL'],
  },
  {
    title: 'DevOps & Tooling',
    title_tr: 'DevOps & Araçlar',
    items: ['Docker', 'Kubernetes', 'CI/CD (GitHub Actions)', 'Git', 'Flyway'],
  },
  {
    title: 'Languages',
    title_tr: 'Diller',
    items: ['Java', 'Python', 'C', 'TypeScript / JavaScript', 'Dart (Flutter)'],
  },
  {
    title: 'Testing & QA',
    title_tr: 'Test & QA',
    items: ['Test Automation', 'Regression & Functional', 'Testcontainers', 'JUnit', 'BrowserStack', 'Postman'],
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
            ? 'Koç Üniversitesi’nde Bilgisayar Mühendisliği öğrencisiyim; backend yazılım mühendisliği ve test otomasyonuna odaklanıyorum. Baskı altında doğru çalışan sistemler kurmayı seviyorum — temiz servis sınırları, ondalık-güvenli para, idempotent operasyonlar ve gerçekten regresyon yakalayan testler.'
            : 'I’m a Computer Engineering student at Koç University, focused on backend software engineering and test automation. I like building systems that stay correct under pressure — clean service boundaries, decimal-safe money, idempotent operations, and tests that actually catch regressions.'}
        </p>
        <p>
          {tr
            ? 'Şu anda Siemens’te test otomasyonu alanında part-time mühendisim; öncesinde Tegsoft’ta QA stajyeriydim. Daha önce KUAV’ın Teknofest Savaş İHA takımına liderlik ettim ve AI & Robotik topluluğunun başkan yardımcılığını yaptım. Bu süreçte iki patentli cihazın ortak mucidi oldum ve TÜBİTAK’ta Türkiye 3.’lüğü kazandım.'
            : 'Currently I’m a part-time engineer in test automation at Siemens; before that I was a QA intern at Tegsoft. Earlier I led KUAV’s Teknofest Combat UAV team and served as vice president of the AI & Robotics society. Along the way I co-invented two patented devices and placed 3rd nationally at TÜBİTAK.'}
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
