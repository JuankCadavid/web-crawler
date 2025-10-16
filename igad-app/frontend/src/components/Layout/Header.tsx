import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  breadcrumb?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Dashboard", breadcrumb }) => {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-normal text-sm">I</span>
            </div>
            <div>
              <h1 className="text-lg font-normal text-primary">
                IGAD <span className="text-secondary">Hub</span>
              </h1>
            </div>
          </Link>
          
          {/* Breadcrumb / Page Title */}
          <div className="flex items-center space-x-2 text-sm">
            {breadcrumb && (
              <>
                <span className="text-text-secondary">/</span>
                <span className="text-text-secondary">{breadcrumb}</span>
              </>
            )}
            {title !== "Dashboard" && (
              <>
                <span className="text-text-secondary">/</span>
                <span className="text-text-primary font-normal">{title}</span>
              </>
            )}
          </div>
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center space-x-4">
          {/* User Avatar and Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-bg-gray-light transition-colors">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-normal">U</span>
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-normal text-text-primary">User Name</div>
                <div className="text-xs text-text-secondary">Administrator</div>
              </div>
              <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
