import { X, MessageCircle, Linkedin, Link2 } from 'lucide-react';
import type { Quote } from '../types';
import { copyToClipboard, formatQuoteForShare, shareOnTwitter, shareOnWhatsApp, shareOnLinkedIn } from '../utils/share';
import { useToastContext } from '../context/ToastContext';

interface ShareSheetProps {
  quote: Quote;
  onClose: () => void;
}

export function ShareSheet({ quote, onClose }: ShareSheetProps) {
  const { showToast } = useToastContext();

  const handleCopy = async () => {
    const text = formatQuoteForShare(quote);
    const success = await copyToClipboard(text);
    if (success) {
      showToast('Quote copied to clipboard!', 'success');
    } else {
      showToast('Failed to copy. Please try again.', 'error');
    }
    onClose();
  };

  const handleTwitter = () => {
    shareOnTwitter(quote);
    onClose();
  };

  const handleWhatsApp = () => {
    shareOnWhatsApp(quote);
    onClose();
  };

  const handleLinkedIn = async () => {
    const text = formatQuoteForShare(quote);
    await copyToClipboard(text);
    showToast('Quote copied! Paste it on LinkedIn.', 'info');
    shareOnLinkedIn(quote);
    onClose();
  };

  const shareOptions = [
    {
      name: 'Copy Text',
      icon: Link2,
      handler: handleCopy,
      color: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700',
      textColor: 'text-slate-600 dark:text-slate-300',
    },
    {
      name: 'X (Twitter)',
      icon: X,
      handler: handleTwitter,
      color: 'bg-black hover:bg-gray-800',
      textColor: 'text-white',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      handler: handleWhatsApp,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      handler: handleLinkedIn,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-center text-[var(--text-secondary)] text-sm mb-6">
        Share this quote on your favorite platform
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {shareOptions.map((option) => (
          <button
            key={option.name}
            onClick={option.handler}
            className={`social-icon flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 ${option.color}`}
            aria-label={`Share on ${option.name}`}
          >
            <option.icon className={`h-6 w-6 ${option.textColor}`} />
            <span className={`text-xs font-medium ${option.textColor}`}>
              {option.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
