import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title,
  icon,
  action
}) => {
  return (
    <div className={`bg-surface rounded-card shadow-card border border-border ${className}`}>
      {(title || icon || action) && (
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="flex-shrink-0 text-primary">
                {icon}
              </div>
            )}
            {title && (
              <h3 className="text-lg font-semibold text-text-primary">
                {title}
              </h3>
            )}
          </div>
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
