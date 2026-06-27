import { RefreshCw, Copy, Share2, Heart } from 'lucide-react';
import { Button } from './ui/Button';
import type { Quote } from '../types';
import { copyToClipboard, formatQuoteForShare } from '../utils/share';
import { useToastContext } from '../context/ToastContext';

interface ControlsProps {
  quote: Quote | null;
  isLoading: boolean;
  onNextQuote: () => void;
  onShare: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export function Controls({
  quote,
  isLoading,
  onNextQuote,
  onShare,
  onToggleFavorite,
  isFavorite,
}: ControlsProps) {
  const { showToast } = useToastContext();

  const handleCopy = async () => {
    if (!quote) return;
    const text = formatQuoteForShare(quote);
    const success = await copyToClipboard(text);
    if (success) {
      showToast('Quote copied successfully!', 'success');
    } else {
      showToast('Failed to copy. Please try again.', 'error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={onNextQuote}
          disabled={isLoading}
          aria-label="Generate new quote"
        >
          <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>New Quote</span>
        </Button>

        {quote && (
          <>
            <Button
              variant="icon"
              size="lg"
              onClick={handleCopy}
              aria-label="Copy quote to clipboard"
            >
              <Copy className="h-5 w-5" />
            </Button>

            <Button
              variant="icon"
              size="lg"
              onClick={onShare}
              aria-label="Share quote"
            >
              <Share2 className="h-5 w-5" />
            </Button>

            <Button
              variant="icon"
              size="lg"
              onClick={onToggleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={isFavorite ? 'border-[var(--heart)]' : ''}
            >
              <Heart
                className={`h-5 w-5 transition-all duration-200 ${
                  isFavorite
                    ? 'text-[var(--heart)] fill-[var(--heart)] heart-pop'
                    : ''
                }`}
              />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
