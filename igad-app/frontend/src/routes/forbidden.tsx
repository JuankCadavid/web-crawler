
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthProvider';

export default function Forbidden() {
  const { session } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="rounded-full bg-destructive/15 w-16 h-16 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
          <p className="mt-2 text-muted-foreground">
            You don't have permission to access this resource. Your current role doesn't include the necessary permissions.
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Your Current Access</h3>
          <div className="text-sm text-muted-foreground">
            <p><strong>Role:</strong> {session?.groups.includes('ADMIN') ? 'ADMIN' : 'USER'}</p>
            <p className="mt-1">
              {session?.groups.includes('ADMIN') 
                ? 'You have full access to all features.'
                : 'You can access Proposal Writer and Newsletter Generator.'
              }
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Back to Dashboard
          </Link>
          
          <Link
            to="/proposals"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Go to Proposals
          </Link>
        </div>
      </div>
    </div>
  );
}
