import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
      return;
    }
    if (saved === 'light') {
      setIsDark(false);
      return;
    }
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="icon-button p-2.5"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5 text-secondary" /> : <Moon className="h-5 w-5 text-primary" />}
    </button>
  );
}
