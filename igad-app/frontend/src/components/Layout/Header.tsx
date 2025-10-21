
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthProvider';

export function Header() {
  const { session, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/dashboard', label: 'Home', roles: [] },
    { path: '/proposals', label: 'Proposal Writer', roles: ['USER', 'ADMIN'] },
    { path: '/newsletters', label: 'Newsletter Generator', roles: ['USER', 'ADMIN'] },
    { path: '/prompts', label: 'Prompt Manager', roles: ['ADMIN'] },
    { path: '/scraper', label: 'Web Scraper', roles: ['ADMIN'] },
  ];

  const canAccess = (roles: string[]) => {
    if (!session || !session.approved) return false;
    if (roles.length === 0) return true;
    return roles.some(role => session.groups.includes(role));
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">I</span>
            </div>
            <span className="font-semibold text-lg text-foreground">IGAD Hub</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const hasAccess = canAccess(link.roles);
            const isDisabled = session && session.approved && !hasAccess;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-medium transition-colors hover:text-primary
                  ${isActive(link.path) ? 'text-primary' : 'text-muted-foreground'}
                  ${isDisabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-3">
              {/* User Info */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {session.username}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {session.groups.includes('ADMIN') ? 'ADMIN' : 'USER'}
                  </div>
                </div>
              </div>
              
              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
