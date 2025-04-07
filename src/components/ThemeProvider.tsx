"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider {...props} defaultTheme="dark" forcedTheme="dark">
      {mounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }}>
          {children}
        </div>
      )}
    </NextThemesProvider>
  );
} 