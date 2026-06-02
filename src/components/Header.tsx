"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const staticLinks = [
  { href: "/", label: "Home" },
  { href: "/eight-laws-of-health", label: "Eight Laws of Health" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dynamicLinks, setDynamicLinks] = useState<{ href: string; label: string }[]>([]);

  useEffect(() => {
    async function loadNav() {
      try {
        const res = await fetch("/api/nav");
        if (!res.ok) return;
        const pages: { title: string; slug: string }[] = await res.json();
        setDynamicLinks(pages.map((p) => ({ href: `/pages/${p.slug}`, label: p.title })));
      } catch {
        // Nav fetch failed — show static links only
      }
    }
    loadNav();
  }, []);

  const navLinks = [...staticLinks, ...dynamicLinks];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--light-green)] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline"
            onClick={() => setMobileOpen(false)}
          >
            <span className="text-2xl" role="img" aria-label="leaf">
              🌿
            </span>
            <span className="text-xl font-bold font-[family-name:var(--font-lora)] text-[var(--primary-green)]">
              WellnessNursePro
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--dark-text)] hover:text-[var(--primary-green)] font-medium transition-colors duration-200 text-sm tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-[var(--light-green)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-[var(--primary-green)] transition-transform duration-200 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--primary-green)] transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--primary-green)] transition-transform duration-200 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-[var(--light-green)]">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-[var(--dark-text)] hover:bg-[var(--light-green)] hover:text-[var(--primary-green)] font-medium transition-colors text-sm tracking-wide uppercase"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
