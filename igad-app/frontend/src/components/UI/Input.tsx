import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  multiline = false,
  rows = 4,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'block w-full rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary placeholder-text-secondary shadow-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors';
  
  const errorClasses = error ? 'border-error focus:border-error focus:ring-error' : '';

  const Component = multiline ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <Component
        id={inputId}
        className={`${baseClasses} ${errorClasses} ${className}`}
        rows={multiline ? rows : undefined}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};
