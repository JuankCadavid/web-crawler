
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthProvider';

export default function AwaitingApproval() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="rounded-full bg-warning/15 w-16 h-16 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-foreground">Awaiting Approval</h2>
          <p className="mt-2 text-muted-foreground">
            Your account is currently pending approval from the tech team. You will receive access once your account has been reviewed and approved.
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">What happens next?</h3>
          <ul className="text-sm text-muted-foreground space-y-1 text-left">
            <li>• The tech team will review your registration</li>
            <li>• You'll be assigned appropriate access permissions</li>
            <li>• You'll receive an email notification when approved</li>
            <li>• You can then sign in and access the platform</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Sign Out
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
