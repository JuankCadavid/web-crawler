import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'page' | 'content' | 'full';
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  maxWidth = 'content' 
}) => {
  const maxWidthClass = {
    page: 'max-w-page',
    content: 'max-w-content',
    full: 'max-w-full'
  }[maxWidth];

  return (
    <div className={`mx-auto px-6 ${maxWidthClass} ${className}`}>
      {children}
    </div>
  );
};
