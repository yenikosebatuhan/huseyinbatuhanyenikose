'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Download, ExternalLink } from 'lucide-react';
import { getLocaleFromPathname } from '@/lib/i18n';

export default function ResumePage() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<'en' | 'tr'>('en');

  useEffect(() => {
    const sync = () => setLocale(getLocaleFromPathname(pathname));
    sync();
    window.addEventListener('languageChanged', sync);
    return () => window.removeEventListener('languageChanged', sync);
  }, [pathname]);

  const tr = locale === 'tr';

  const stats = [
    { value: '3+', label: tr ? 'Yıl Deneyim' : 'Years Experience' },
    { value: '8+', label: tr ? 'Proje' : 'Projects' },
    { value: '2', label: tr ? 'Patent' : 'Patents' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
      <div className="mono flex items-center gap-3 text-xs text-muted-foreground">
        <span className="text-gradient font-semibold">/ résumé</span>
        <span className="h-px w-8 bg-border" />
      </div>
      <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {tr ? 'Özgeçmiş' : 'Résumé'}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {tr
              ? 'Deneyim, eğitim ve yeteneklerimin tek sayfalık, ATS-uyumlu özeti.'
              : 'A one-page, ATS-friendly summary of my experience, education, and skills.'}
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4" />
            {tr ? 'İndir' : 'Download'}
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground/30 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            {tr ? 'Yeni Sekmede' : 'Open'}
          </a>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-10 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-gradient">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* PDF preview */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <object
          data="/resume.pdf#view=FitH"
          type="application/pdf"
          className="h-[80vh] w-full"
        >
          <div className="p-10 text-center text-muted-foreground">
            {tr
              ? 'PDF önizleme tarayıcınızda gösterilemiyor. '
              : 'PDF preview is not available in your browser. '}
            <a href="/resume.pdf" className="text-[var(--brand)] underline" download>
              {tr ? 'İndirmek için tıklayın.' : 'Click to download.'}
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
