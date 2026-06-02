"use client";

import { useEffect, ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    async function applyTheme() {
      try {
        const res = await fetch("/api/theme");
        if (!res.ok) return;
        const { theme } = await res.json();
        const root = document.documentElement;
        if (theme.primaryColor) root.style.setProperty("--primary-green", theme.primaryColor);
        if (theme.secondaryColor) root.style.setProperty("--secondary-green", theme.secondaryColor);
        if (theme.accentColor) root.style.setProperty("--accent-gold", theme.accentColor);
        if (theme.backgroundColor) root.style.setProperty("--light-bg", theme.backgroundColor);
        if (theme.textColor) root.style.setProperty("--dark-text", theme.textColor);
      } catch {
        // Theme fetch failed — keep defaults
      }
    }
    applyTheme();
  }, []);

  return <>{children}</>;
}
