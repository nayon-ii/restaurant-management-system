// src\contexts\ThemeProvider.tsx
import React, { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  forcedTheme,
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  forcedTheme?: "light" | "dark";
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (forcedTheme) return forcedTheme as Theme;
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;

    if (forcedTheme) {
      root.classList.remove("light", "dark");
      root.classList.add(forcedTheme);
      setActualTheme(forcedTheme);
      return;
    }

    let themeToApply: "light" | "dark" = "light";

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      themeToApply = systemTheme;
    } else {
      themeToApply = theme as "light" | "dark";
    }

    root.classList.remove("light", "dark");
    root.classList.add(themeToApply);
    setActualTheme(themeToApply);
  }, [theme, forcedTheme]);

  useEffect(() => {
    if (theme !== "system" || forcedTheme) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const systemTheme = mediaQuery.matches ? "dark" : "light";
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
      setActualTheme(systemTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, forcedTheme]);

  const setTheme = (newTheme: Theme) => {
    if (forcedTheme) return;
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
