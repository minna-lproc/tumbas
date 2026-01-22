'use client';

import { useThemeToggle } from '@/hooks/useThemeToggle';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useThemeToggle(); // This will apply the theme to the document body

  return <>{children}</>;
};