import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export function Loader({ size = 'md', message }: LoaderProps) {
  const sizeStyles = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <div
          className={`absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 pulse-ring ${sizeStyles[size]}`}
        />
        <Loader2
          className={`${sizeStyles[size]} text-[var(--accent)] animate-spin`}
        />
      </div>
      {message && (
        <p className="text-[var(--text-secondary)] text-sm animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
