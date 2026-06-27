import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import type { ToastMessage } from '../../types';

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

export function Toast({ toast, onRemove }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, 2700);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-[var(--success)]" />,
    error: <XCircle className="h-5 w-5 text-[var(--error)]" />,
    info: <Info className="h-5 w-5 text-[var(--accent)]" />,
  };

  const borderColors = {
    success: 'border-l-[var(--success)]',
    error: 'border-l-[var(--error)]',
    info: 'border-l-[var(--accent)]',
  };

  return (
    <div
      className={`toast-enter ${isExiting ? 'toast-exit' : ''} flex items-center gap-3 px-4 py-3 bg-[var(--card-bg)] shadow-lg rounded-xl border border-[var(--border)] border-l-4 ${borderColors[toast.type]} min-w-[280px] max-w-[400px]`}
      role="alert"
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm text-[var(--text)]">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
