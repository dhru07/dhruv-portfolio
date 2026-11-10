"use client";

import { SunMoon } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio-theme-change", callback);
  };
}

function getTheme(): "dark" | "light" {
  try {
    return window.localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark");

  useEffect(() => {
    document.documentElement.dataset.themeReady = "true";
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "light"}
      className="icon-button theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <SunMoon aria-hidden="true" size={18} />
    </button>
  );
}
