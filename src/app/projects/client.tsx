'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Github, ExternalLink, X, FileBadge, Smartphone } from 'lucide-react';
import { getLocaleFromPathname } from '@/lib/i18n';
import { ProjectCover } from '@/components/ProjectCover';
import {
  projects,
  domainLabels,
  localizedTitle,
  localizedSummary,
  localizedContent,
  Domain,
  ProjectItem,
} from '@/data/projects';

const FILTERS: Domain[] = ['backend', 'web', 'mobile', 'systems', 'ai', 'uav', 'innovation'];

export function ProjectsClient() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<'en' | 'tr'>('en');
  const [active, setActive] = useState<Domain | 'all'>('all');
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const sync = () => setLocale(getLocaleFromPathname(pathname));
    sync();
    window.addEventListener('languageChanged', sync);
    return () => window.removeEventListener('languageChanged', sync);
  }, [pathname]);

  const tr = locale === 'tr';

  const sorted = useMemo(
    () => [...projects].sort((a, b) => b.weight - a.weight),
    []
  );
  const filtered = useMemo(
    () => (active === 'all' ? sorted : sorted.filter((p) => p.domains.includes(active))),
    [sorted, active]
  );

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="mono flex items-center gap-3 text-xs text-muted-foreground">
            <span className="text-gradient font-semibold">/ projects</span>
            <span className="h-px w-8 bg-border" />
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            {tr ? 'Projeler' : 'Projects'}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {tr
              ? 'Backend mikroservislerinden full-stack ürünlere, sistem programlamaya ve patentli donanıma kadar seçme çalışmalar.'
              : 'Selected work — from backend microservices and full-stack products to systems programming and patented hardware.'}
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          <FilterChip active={active === 'all'} onClick={() => setActive('all')}>
            {tr ? 'Tümü' : 'All'}
          </FilterChip>
          {FILTERS.map((d) => (
            <FilterChip key={d} active={active === d} onClick={() => setActive(d)}>
              {domainLabels[d][tr ? 'tr' : 'en']}
            </FilterChip>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article
              key={p.slug}
              onClick={() => setSelected(p)}
              className="lift group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-foreground/20 hover:shadow-lg"
            >
              <ProjectCover project={p} className="h-36" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  {p.isPatent && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                      <FileBadge className="h-3 w-3" />
                      Patent
                    </span>
                  )}
                  {p.domains.map((d) => (
                    <span key={d} className="mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {domainLabels[d][tr ? 'tr' : 'en']}
                    </span>
                  ))}
                </div>
                <h3 className="mt-2 font-semibold leading-snug group-hover:text-gradient transition-colors">
                  {localizedTitle(p, locale)}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {localizedSummary(p, locale)}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="mono rounded bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="mono rounded bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                      +{p.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-border bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectCover project={selected} className="h-40 sm:h-48 rounded-t-3xl sm:rounded-t-2xl" />
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {selected.domains.map((d) => (
                  <span key={d} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                    {domainLabels[d][tr ? 'tr' : 'en']}
                  </span>
                ))}
                <span className="mono text-xs text-muted-foreground">{selected.period}</span>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight">
                {localizedTitle(selected, locale)}
              </h2>

              {selected.isPatent && selected.patentNumber && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm dark:border-amber-500/20 dark:bg-amber-500/10">
                  <span className="font-medium text-amber-800 dark:text-amber-300">
                    {tr ? 'Patent No: ' : 'Patent No: '}
                  </span>
                  <span className="mono text-amber-700 dark:text-amber-400">{selected.patentNumber}</span>
                </div>
              )}

              <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-muted-foreground">
                {localizedContent(selected, locale)}
              </p>

              <div className="mt-6">
                <h3 className="mono text-xs uppercase tracking-wider text-muted-foreground">
                  {tr ? 'Teknolojiler' : 'Tech Stack'}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.stack.map((s) => (
                    <span key={s} className="mono rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {(selected.repo || selected.demo) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {selected.repo && (
                    <a
                      href={selected.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
                    >
                      <Github className="h-4 w-4" />
                      {tr ? 'GitHub’da Gör' : 'View on GitHub'}
                    </a>
                  )}
                  {selected.demo && (() => {
                    const isStore = selected.demo.includes('play.google.com');
                    return (
                      <a
                        href={selected.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground/30 transition-colors"
                      >
                        {isStore ? <Smartphone className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                        {isStore ? (tr ? 'Play Store’da Gör' : 'View on Play Store') : tr ? 'Canlı Demo' : 'Live Demo'}
                      </a>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30'
      }`}
    >
      {children}
    </button>
  );
}
