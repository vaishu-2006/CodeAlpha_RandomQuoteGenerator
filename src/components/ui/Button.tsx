import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none btn-press';

  const variantStyles = {
    primary:
      'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-md hover:shadow-lg rounded-xl',
    secondary:
      'bg-[var(--card-bg)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)] shadow-sm hover:shadow-md rounded-xl',
    ghost:
      'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--card-bg)] rounded-xl',
    icon: 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] rounded-full',
  };

  const sizeStyles = {
    sm: 'h-9 px-3 text-sm gap-1.5',
    md: 'h-11 px-5 text-base gap-2',
    lg: 'h-13 px-7 text-lg gap-2.5',
  };

  const iconSizeStyles = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-13 w-13',
  };

  const finalStyles =
    variant === 'icon'
      ? `${baseStyles} ${iconSizeStyles[size]}`
      : `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;

  return (
    <button className={`${finalStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
