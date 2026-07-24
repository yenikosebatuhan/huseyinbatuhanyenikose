import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Navigation } from "@/components/Navigation";
import { Logo } from "@/components/Logo";
import { Github, Linkedin, Mail } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hüseyin Batuhan Yeniköse — Backend & Software Engineer",
  description:
    "Computer Engineering student focused on backend software engineering — Java / Spring Boot microservices, distributed systems, and test automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
              <Link
                href="/"
                className="group flex items-center gap-2.5 font-semibold tracking-tight"
              >
                <Logo size={34} className="transition-transform group-hover:scale-105" />
                <span className="hidden sm:inline text-[15px]">
                  Batuhan Yeniköse
                </span>
              </Link>

              <div className="flex items-center gap-6">
                <Navigation className="hidden md:flex" />
                <div className="flex items-center gap-1.5">
                  <LanguageSwitch />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 pt-16">{children}</main>

          <footer className="border-t border-border">
            <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Hüseyin Batuhan Yeniköse
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/yenikosebatuhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/in/huseyinbatuhanyenikose"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:hyenikose22@ku.edu.tr"
                  aria-label="Email"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
