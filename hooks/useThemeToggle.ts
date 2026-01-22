'use client';

import { useEffect, useState } from 'react';

export const useThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const storedTheme = getCookie('theme');
    let dark: boolean;

    if (storedTheme) {
      dark = storedTheme === 'dark';
    } else {
      // Use system preference if no cookie is set
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set cookie to persist the system preference
      document.cookie = `theme=${dark ? 'dark' : 'light'}; path=/; max-age=31536000`;
    }

    setIsDarkMode(dark);
    document.body.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.cookie = `theme=${newTheme ? 'dark' : 'light'}; path=/; max-age=31536000`; // 1 year
    document.body.classList.toggle('dark', newTheme);
  };

  return { isDarkMode, toggleTheme };
};