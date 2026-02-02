'use client';

import { useEffect, useState } from 'react';

export const useThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    let dark: boolean;

    if (storedTheme) {
      dark = storedTheme === 'dark';
    } else {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }

    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return { isDarkMode, toggleTheme };
};