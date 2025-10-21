import { Link } from 'react-router-dom';

export function LandingHeader() {
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-container mx-auto px-16 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/igad-logo.png" alt="IGAD" className="h-8 w-auto" />
            <span className="text-xl font-semibold text-primary">IGAD Hub</span>
          </div>
          
          {/* Login Button */}
          <Link
            to="/login"
            className="bg-primary text-white px-6 py-2 rounded-button hover:bg-primary-dark transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
