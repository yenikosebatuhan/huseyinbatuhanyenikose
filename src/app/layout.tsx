import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Navigation } from "@/components/Navigation";
import { getDictionary, getLocaleFromPathname, Locale } from "@/lib/i18n";
import { Mail, Github, Linkedin } from 'lucide-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hüseyin Batuhan YENİKÖSE - Portfolio",
  description: "Computer Engineering Student, Test Engineer Intern, UAV & QA Projects",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For static export, we need to handle this differently
  // We'll default to English for the layout
  const dict = await getDictionary('en');

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-background text-foreground`}
      >
        <div className="min-h-screen">
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-700/60">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Hüseyin Batuhan YENİKÖSE
              </Link>
              <div className="flex items-center gap-8">
                <Navigation className="hidden md:flex" />
                <div className="flex items-center gap-3">
                  <LanguageSwitch />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          <main className="pt-20">
            {children}
          </main>

          <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-12">
            <div className="container mx-auto px-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 Hüseyin Batuhan YENİKÖSE · <a href="https://github.com/yenikosebatuhan" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">GitHub</a> · <a href="https://linkedin.com/in/huseyinbatuhanyenikose" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">LinkedIn</a> · <a href="mailto:byenikose@gmail.com" className="hover:underline hover:text-red-600 dark:hover:text-red-400">Email</a>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
