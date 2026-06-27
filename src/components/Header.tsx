import { Quote, Heart, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';

interface HeaderProps {
  onOpenFavorites: () => void;
  favoritesCount: number;
}

export function Header({ onOpenFavorites, favoritesCount }: HeaderProps) {
  return (
    <header className="w-full px-4 py-4 sm:px-6 sm:py-5">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--accent)] shadow-lg shadow-sky-500/20">
            <Quote className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <span>Quotely</span>
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            </h1>
            <p className="text-xs text-[var(--muted)] hidden sm:block">
              Discover inspiring quotes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 group"
            aria-label={`View favorites (${favoritesCount} quotes)`}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                favoritesCount > 0
                  ? 'text-[var(--heart)] fill-[var(--heart)]'
                  : 'text-[var(--text-secondary)] group-hover:text-[var(--heart)]'
              }`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-[var(--heart)] rounded-full animate-scale-in">
                {favoritesCount > 9 ? '9+' : favoritesCount}
              </span>
            )}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
