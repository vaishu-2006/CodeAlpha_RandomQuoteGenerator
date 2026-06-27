import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full px-4 py-6 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <div className="flex items-center gap-2 text-[var(--muted)] text-sm">
          <Zap className="h-4 w-4 text-[var(--accent)]" />
          <span>Powered by inspiration</span>
        </div>
        <span className="hidden sm:inline text-[var(--muted)]">|</span>
        <p className="text-xs text-[var(--muted)]">
          Quotely - Random Quote Generator
        </p>
      </div>
    </footer>
  );
}
