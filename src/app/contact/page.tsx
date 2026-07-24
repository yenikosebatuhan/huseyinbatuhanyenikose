'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from 'lucide-react';
import { getLocaleFromPathname } from '@/lib/i18n';

export default function ContactPage() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<'en' | 'tr'>('en');

  useEffect(() => {
    const sync = () => setLocale(getLocaleFromPathname(pathname));
    sync();
    window.addEventListener('languageChanged', sync);
    return () => window.removeEventListener('languageChanged', sync);
  }, [pathname]);

  const tr = locale === 'tr';

  const links = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hyenikose22@ku.edu.tr',
      href: 'mailto:hyenikose22@ku.edu.tr',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/huseyinbatuhanyenikose',
      href: 'https://linkedin.com/in/huseyinbatuhanyenikose',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '/yenikosebatuhan',
      href: 'https://github.com/yenikosebatuhan',
    },
  ];

  return (
    <div className="relative min-h-[80vh]">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
        <div className="mono inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {tr ? 'Yeni projeler için müsait' : 'Available for new projects'}
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
          {tr ? 'İletişime Geçelim' : 'Let’s Connect'}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed">
          {tr
            ? 'Backend, full-stack ve test otomasyonu alanlarında staj, tam zamanlı pozisyon ve işbirliği fırsatlarına açığım. En hızlı ulaşım e-posta.'
            : 'Open to internships, full-time roles, and collaborations in backend, full-stack, and test automation. Email is the fastest way to reach me.'}
        </p>

        <a
          href="mailto:hyenikose22@ku.edu.tr"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
        >
          <Mail className="h-4 w-4" />
          hyenikose22@ku.edu.tr
        </a>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {links.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="lift group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 text-left hover:border-foreground/20"
            >
              <div className="flex w-full items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div>
                <div className="font-medium">{label}</div>
                <div className="mono text-xs text-muted-foreground break-all">{value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {tr ? 'İstanbul, Türkiye' : 'Istanbul, Turkey'}
        </div>
      </div>
    </div>
  );
}
