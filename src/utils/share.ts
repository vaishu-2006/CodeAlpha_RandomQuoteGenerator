import type { Quote } from '../types';

export function formatQuoteForShare(quote: Quote): string {
  return `"${quote.text}" — ${quote.author}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch {
    return false;
  }
}

export function shareOnTwitter(quote: Quote): void {
  const text = formatQuoteForShare(quote);
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'width=550,height=420');
}

export function shareOnWhatsApp(quote: Quote): void {
  const text = formatQuoteForShare(quote);
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

export function shareOnLinkedIn(quote: Quote): void {
  const text = formatQuoteForShare(quote);
  // LinkedIn share URL - using text parameter
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
  // Copy to clipboard first as a helper
  copyToClipboard(text);
  window.open(url, '_blank', 'width=550,height=420');
}

export function getShareUrl(quote: Quote, platform: 'twitter' | 'whatsapp' | 'linkedin'): string {
  const text = formatQuoteForShare(quote);
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(text)}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
    default:
      return '';
  }
}
