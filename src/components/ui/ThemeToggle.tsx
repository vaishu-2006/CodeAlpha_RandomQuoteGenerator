import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <Sun
          className={`absolute inset-0 h-5 w-5 text-amber-500 transition-all duration-300 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 text-sky-400 transition-all duration-300 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50'
          }`}
        />
      </div>
    </button>
  );
}
