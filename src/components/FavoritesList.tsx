import { Heart, Trash2, Quote as QuoteIcon } from 'lucide-react';
import type { Quote } from '../types';
import { formatQuoteForShare, copyToClipboard } from '../utils/share';
import { useToastContext } from '../context/ToastContext';

interface FavoritesListProps {
  quotes: Quote[];
  onRemove: (id: string) => void;
}

export function FavoritesList({ quotes, onRemove }: FavoritesListProps) {
  const { showToast } = useToastContext();

  const handleCopy = async (quote: Quote) => {
    const text = formatQuoteForShare(quote);
    const success = await copyToClipboard(text);
    if (success) {
      showToast('Quote copied!', 'success');
    }
  };

  if (quotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 rounded-full bg-[var(--bg)] mb-4">
          <Heart className="h-12 w-12 text-[var(--muted)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
          No favorites yet
        </h3>
        <p className="text-sm text-[var(--muted)] max-w-xs mx-auto px-4">
          Start adding quotes to your favorites by clicking the heart icon on any
          quote you love.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
        <span className="text-sm text-[var(--muted)]">
          {quotes.length} saved quote{quotes.length !== 1 ? 's' : ''}
        </span>
      </div>
      <ul className="space-y-3">
        {quotes.map((quote) => (
          <li
            key={quote.id}
            className="group relative bg-[var(--bg)] rounded-xl p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <QuoteIcon className="h-4 w-4 text-[var(--accent)] opacity-50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[var(--text)] text-sm leading-relaxed line-clamp-3">
                  "{quote.text}"
                </p>
                <p className="text-[var(--muted)] text-xs mt-2">
                  — {quote.author}
                </p>
              </div>
              <div className="flex-shrink-0 flex items-start gap-1">
                <button
                  onClick={() => handleCopy(quote)}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--card-bg)] transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Copy quote"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onRemove(quote.id)}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--error)] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
