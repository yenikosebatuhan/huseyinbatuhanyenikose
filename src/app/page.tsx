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
} from 'lucide-react';
import { getLocaleFromPathname } from '@/lib/i18n';
import { projects, localizedTitle, localizedSummary } from '@/data/projects';
import { ProjectCover } from '@/components/ProjectCover';
import { asset } from '@/lib/asset';

const TECH = [
  'Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes', 'REST',
  'JWT / RBAC', 'JPA / Hibernate', 'React', 'Next.js', 'TypeScript',
  'Python', 'C', 'Git', 'CI/CD', 'Testcontainers',
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
      icon: Server,
      title: tr ? 'Backend & Dağıtık Sistemler' : 'Backend & Distributed Systems',
      desc: tr
        ? 'Spring Boot mikroservisleri, REST API’ler, JWT/RBAC güvenliği, idempotency ve ondalık-güvenli faturalama.'
        : 'Spring Boot microservices, REST APIs, JWT/RBAC security, idempotency, and decimal-safe billing.',
    },
    {
      icon: TestTube2,
      title: tr ? 'Test Otomasyonu & QA' : 'Test Automation & QA',
      desc: tr
        ? 'Kurumsal uygulamalar için otomatik test çerçeveleri, CI/CD entegrasyonu ve regresyon testi.'
        : 'Automated test frameworks for enterprise apps, CI/CD integration, and regression testing.',
    },
    {
      icon: Layers,
      title: tr ? 'Full-Stack & Ürün' : 'Full-Stack & Product',
      desc: tr
        ? 'Next.js / TypeScript ile uçtan uca ürünler, temiz mimari ve tek komutla çalışan kurulumlar.'
        : 'End-to-end products with Next.js / TypeScript, clean architecture, and one-command setups.',
    },
  ];

  const stats = [
    { value: '3+', label: tr ? 'Yıl Deneyim' : 'Years Experience' },
    { value: '8+', label: tr ? 'Proje' : 'Projects Shipped' },
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
                  {tr ? 'Backend odaklı yazılım mühendisi.' : 'I build reliable backends.'}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                {tr
                  ? 'Koç Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. Java / Spring Boot mikroservisleri, dağıtık sistemler ve test otomasyonu üzerine çalışıyorum. Şu anda Siemens’te test otomasyonu alanında part-time mühendisim.'
                  : 'Computer Engineering student at Koç University, focused on Java / Spring Boot microservices, distributed systems, and test automation. Currently a part-time engineer in test automation at Siemens.'}
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
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    {!p.repo && p.demo && p.demo.includes('play.google.com') && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Smartphone className="h-4 w-4" />
                        {tr ? 'Play Store' : 'Play Store'}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Stats ───────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
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
                ? 'Backend, full-stack ve test otomasyonu fırsatlarına açığım.'
                : 'Open to backend, full-stack, and test-automation opportunities.'}
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
