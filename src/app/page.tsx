'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  Server,
  TestTube2,
  Layers,
  ExternalLink,
  Smartphone,
  BrainCircuit,
  Briefcase,
} from 'lucide-react';
import { getLocaleFromPathname } from '@/lib/i18n';
import { projects, localizedTitle, localizedSummary } from '@/data/projects';
import { ProjectCover } from '@/components/ProjectCover';
import { asset } from '@/lib/asset';

const TECH = [
  'Python', 'FastAPI', 'Azure Document Intelligence', 'Redis RQ', 'Java',
  'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes', 'REST', 'JWT / RBAC',
  'React', 'Next.js', 'TypeScript', 'Flutter', 'GitHub Actions', 'Testcontainers',
];

const EXPERIENCE = [
  {
    org: 'Siemens',
    initials: 'SI',
    role: 'Part-Time Student Engineer — Test Automation',
    role_tr: 'Part-Time Öğrenci Mühendis — Test Otomasyonu',
    period: 'Feb 2026 – Sep 2026',
    period_tr: 'Şub 2026 – Eyl 2026',
    desc: 'Automated test development for enterprise software with Java; functional & regression testing, API testing, Git, CI/CD and containerized environments.',
    desc_tr: 'Kurumsal yazılım için Java ile otomatik test geliştirme; fonksiyonel ve regresyon testleri, API testi, Git, CI/CD ve konteyner ortamları.',
  },
  {
    org: 'Tegsoft',
    initials: 'TG',
    role: 'QA Intern — Test Engineering',
    role_tr: 'QA Stajyeri — Test Mühendisliği',
    period: 'Jul 2025 – Oct 2025',
    period_tr: 'Tem 2025 – Eki 2025',
    desc: 'Manual, functional, regression and exploratory testing of web-based omnichannel software; cross-browser checks with BrowserStack.',
    desc_tr: 'Web tabanlı omnichannel yazılımın manuel, fonksiyonel, regresyon ve keşifsel testleri; BrowserStack ile tarayıcılar arası kontroller.',
  },
  {
    org: 'Koç University',
    initials: 'KU',
    role: 'KUAV Captain · KUAIRS Vice President',
    role_tr: 'KUAV Kaptanı · KUAIRS Başkan Yardımcısı',
    period: '2023 – 2025',
    period_tr: '2023 – 2025',
    desc: 'Led the Teknofest Combat UAV team, coordinated student technical initiatives and organized AI-focused workshops.',
    desc_tr: 'Teknofest Savaş İHA takımına liderlik ettim, öğrenci teknik girişimlerini koordine ettim ve AI odaklı atölyeler düzenledim.',
  },
];

export default function HomePage() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<'en' | 'tr'>('en');

  useEffect(() => {
    const sync = () => setLocale(getLocaleFromPathname(pathname));
    sync();
    window.addEventListener('languageChanged', sync);
    return () => window.removeEventListener('languageChanged', sync);
  }, [pathname]);

  const tr = locale === 'tr';
  const featured = projects.filter((p) => p.featured);

  const focus = [
    {
      icon: BrainCircuit,
      title: tr ? 'Uygulamalı AI' : 'Applied AI',
      desc: tr
        ? 'Azure Document Intelligence ve kural tabanlı çıkarımla belge işleme hatları; AI’ı gerçek ürünlere bağlayan backend’ler.'
        : 'Document-processing pipelines with Azure Document Intelligence and rule-based extraction; backends that put AI into real products.',
    },
    {
      icon: Server,
      title: tr ? 'Backend & Dağıtık Sistemler' : 'Backend & Distributed Systems',
      desc: tr
        ? 'FastAPI ve Spring Boot servisleri, kuyruklu arka plan işleri, JWT/RBAC güvenliği, idempotency ve ondalık-güvenli faturalama.'
        : 'FastAPI and Spring Boot services, queued background jobs, JWT/RBAC security, idempotency, and decimal-safe billing.',
    },
    {
      icon: TestTube2,
      title: tr ? 'Test Otomasyonu & QA' : 'Test Automation & QA',
      desc: tr
        ? 'Siemens ve Tegsoft’ta kurumsal yazılım için otomatik, fonksiyonel ve regresyon testleri; API testi ve CI/CD.'
        : 'Automated, functional and regression testing for enterprise software at Siemens and Tegsoft; API testing and CI/CD.',
    },
    {
      icon: Layers,
      title: tr ? 'Full-Stack & Mobil' : 'Full-Stack & Mobile',
      desc: tr
        ? 'React / Next.js ile uçtan uca ürünler ve Google Play’de yayınlanmış bir Flutter oyunu.'
        : 'End-to-end products with React / Next.js, and a Flutter game published on Google Play.',
    },
  ];

  const stats = [
    { value: '2', label: tr ? 'Sektör Deneyimi' : 'Industry Roles' },
    { value: '10+', label: tr ? 'Proje' : 'Projects Built' },
    { value: '2', label: tr ? 'Patent' : 'Patents' },
    { value: '3.', label: tr ? 'TÜBİTAK (Ulusal)' : 'TÜBİTAK (National)' },
  ];

  return (
    <div className="overflow-hidden">
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="orb h-72 w-72 -left-10 top-6 bg-[var(--brand)]/40" />
        <div className="orb h-72 w-72 right-0 top-24 bg-[var(--brand-2)]/40" />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Text */}
            <div className="md:col-span-8 animate-fade-up">
              <div className="mono inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-6">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {tr ? 'Yeni fırsatlara açık' : 'Open to new opportunities'}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                {tr ? 'Merhaba, ben ' : 'Hi, I’m '}
                <span className="text-gradient">Batuhan</span>.
                <br />
                <span className="text-muted-foreground font-semibold">
                  {tr ? 'Backend ve uygulamalı AI geliştiriyorum.' : 'I build backends and applied AI.'}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                {tr
                  ? 'Koç Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. FastAPI ve Azure Document Intelligence ile AI destekli bir belge işleme MVP’si, Java / Spring Boot mikroservisleri geliştirdim ve bir Flutter oyunu yayınladım. Siemens ve Tegsoft’ta test mühendisliği deneyimim var; junior AI mühendisliği ve backend fırsatları arıyorum.'
                  : 'Computer Engineering student at Koç University. I’ve built an AI-assisted document-processing MVP with FastAPI and Azure Document Intelligence, Java / Spring Boot microservices, and a published Flutter game — with test-engineering experience at Siemens and Tegsoft. Looking for junior AI engineering and backend roles.'}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
                >
                  {tr ? 'Projelerimi Gör' : 'View My Work'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={asset('/resume.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-foreground/30 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  {tr ? 'CV (PDF)' : 'Résumé (PDF)'}
                </a>
                <div className="flex items-center gap-1.5 ml-1">
                  {[
                    { href: 'https://github.com/yenikosebatuhan', icon: Github, label: 'GitHub' },
                    { href: 'https://linkedin.com/in/huseyinbatuhanyenikose', icon: Linkedin, label: 'LinkedIn' },
                    { href: 'mailto:hyenikose22@ku.edu.tr', icon: Mail, label: 'Email' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo */}
            <div className="md:col-span-4 flex justify-center md:justify-end animate-fade-up">
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] opacity-20 blur-xl" />
                <img
                  src={asset('/images/profile.jpeg')}
                  alt="Hüseyin Batuhan Yeniköse"
                  className="relative h-48 w-48 md:h-56 md:w-56 rounded-2xl object-cover border border-border shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Tech marquee ───────────────── */}
      <section className="border-y border-border bg-card/50">
        <div className="relative flex overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex shrink-0 animate-marquee gap-3 pr-3">
            {[...TECH, ...TECH].map((t, i) => (
              <span
                key={i}
                className="mono whitespace-nowrap rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Focus areas ───────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SectionHeading
          index="01"
          title={tr ? 'Ne Yapıyorum' : 'What I Do'}
          subtitle={
            tr
              ? 'Güvenilir, iyi test edilmiş sistemler kurmaya odaklanıyorum.'
              : 'I focus on building reliable, well-tested systems.'
          }
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {focus.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="lift rounded-2xl border border-border bg-card p-6 hover:border-foreground/20"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── Featured projects ───────────────── */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              index="02"
              title={tr ? 'Öne Çıkan Çalışmalar' : 'Featured Work'}
              subtitle={tr ? 'Son ve en güçlü projeler.' : 'Recent, strongest projects.'}
            />
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {tr ? 'Tümü' : 'View all'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((p) => (
              <article
                key={p.slug}
                className="lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-foreground/20 hover:shadow-lg"
              >
                <ProjectCover project={p} className="h-40" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-snug">
                    {localizedTitle(p, locale)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {localizedSummary(p, locale)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="mono rounded-md bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all"
                    >
                      {tr ? 'Detaylar' : 'Details'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        {tr ? 'Kod' : 'Code'}
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {p.demo.includes('play.google.com') ? (
                          <Smartphone className="h-4 w-4" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                        {p.demo.includes('play.google.com') ? 'Play Store' : tr ? 'Canlı' : 'Live'}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Experience ───────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <SectionHeading
          index="03"
          title={tr ? 'Deneyim' : 'Experience'}
          subtitle={tr ? 'Sektörde ve kampüste.' : 'In industry and on campus.'}
        />
        <ol className="mt-12 relative border-l border-border ml-5">
          {EXPERIENCE.map((e) => (
            <li key={e.org + e.role} className="relative pl-10 pb-10 last:pb-0">
              <span className="mono absolute -left-5 top-0 grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-xs font-bold">
                {e.initials}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-semibold">
                  {tr ? e.role_tr : e.role}
                  <span className="text-muted-foreground font-normal"> · {e.org}</span>
                </h3>
                <span className="mono shrink-0 text-xs text-muted-foreground">
                  {tr ? e.period_tr : e.period}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground leading-relaxed">
                {tr ? e.desc_tr : e.desc}
              </p>
            </li>
          ))}
        </ol>
        <Link
          href="/about"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Briefcase className="h-4 w-4" />
          {tr ? 'Tam geçmiş' : 'Full background'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ───────────────── Stats ───────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <div className="text-4xl font-bold text-gradient">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] px-8 py-14 text-center">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,.6) 1px, transparent 0)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {tr ? 'Birlikte çalışalım mı?' : 'Let’s build something.'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              {tr
                ? 'Junior AI mühendisliği, uygulamalı AI ve backend geliştirme fırsatlarına açığım.'
                : 'Open to junior AI engineering, applied AI, and backend development roles.'}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-white/90 transition-colors"
              >
                {tr ? 'İletişime Geç' : 'Get in Touch'}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/yenikosebatuhan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="mono flex items-center gap-3 text-xs text-muted-foreground">
        <span className="text-gradient font-semibold">{index}</span>
        <span className="h-px w-8 bg-border" />
      </div>
      <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
