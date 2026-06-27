import { Quote as QuoteIcon, Sparkles } from 'lucide-react';
import type { Quote } from '../types';
import { Loader } from './ui/Loader';

interface QuoteCardProps {
  quote: Quote | null;
  isLoading: boolean;
  currentIndex: number;
  totalQuotes: number;
  generatedCount: number;
}

export function QuoteCard({
  quote,
  isLoading,
  currentIndex,
  totalQuotes,
  generatedCount,
}: QuoteCardProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-[var(--card-bg)] rounded-3xl shadow-xl shadow-black/5 p-8 sm:p-12 min-h-[320px] flex items-center justify-center">
          <Loader size="lg" message="Loading quote..." />
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-[var(--card-bg)] rounded-3xl shadow-xl shadow-black/5 p-8 sm:p-12 min-h-[320px] flex items-center justify-center">
          <p className="text-[var(--muted)]">Unable to load quote. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div
        className="bg-[var(--card-bg)] rounded-3xl shadow-xl shadow-black/5 p-8 sm:p-12 relative overflow-hidden card-hover animate-fade-in"
        role="article"
        aria-label={`Quote by ${quote.author}`}
      >
        {/* Decorative elements */}
        <div className="absolute top-6 left-6 opacity-10">
          <QuoteIcon className="h-16 w-16 sm:h-20 sm:w-20 text-[var(--accent)]" />
        </div>
        <div className="absolute bottom-4 right-8 opacity-10">
          <Sparkles className="h-8 w-8 text-[var(--accent)]" />
        </div>

        {/* Quote content */}
        <div className="relative z-10">
          <blockquote className="quote-text text-xl sm:text-2xl lg:text-3xl font-medium text-[var(--text)] leading-relaxed mb-6 sm:mb-8 italic">
            "{quote.text}"
          </blockquote>

          <footer className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-violet-400 flex items-center justify-center text-white font-semibold text-sm">
                {quote.author.charAt(0)}
              </div>
              <div>
                <cite className="not-italic font-semibold text-[var(--text)] text-base sm:text-lg">
                  {quote.author}
                </cite>
                {quote.tags && quote.tags.length > 0 && (
                  <div className="flex gap-1.5 mt-1">
                    {quote.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Counter */}
            <div className="flex flex-col items-end">
              <span className="text-sm text-[var(--muted)]">
                Quote {currentIndex + 1} of {totalQuotes}
              </span>
              <span className="text-xs text-[var(--muted)]">
                Generated: {generatedCount}
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
