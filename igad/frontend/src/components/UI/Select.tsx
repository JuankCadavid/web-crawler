import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  placeholder,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'block w-full rounded-button border border-border bg-surface px-3 py-2.5 text-text-primary shadow-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none';
  
  const errorClasses = error ? 'border-error focus:border-error focus:ring-error' : '';

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`${baseClasses} ${errorClasses} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};
