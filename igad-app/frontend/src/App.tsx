
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './styles/globals.css';

// Import components
import { AuthProvider } from './lib/AuthProvider';
import { Protected } from './lib/Protected';
import { Header } from './components/Layout/Header';

// Import route components
import Landing from './routes/landing';
import Placeholder from './components/Placeholder';
import Login from './routes/login';
import Register from './routes/register';
import AwaitingApproval from './routes/awaiting-approval';
import Forbidden from './routes/forbidden';

// Layout component with Header
function Layout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/awaiting-approval" element={<AwaitingApproval />} />
          <Route path="/forbidden" element={<Forbidden />} />
          
          {/* Protected routes with layout */}
          <Route element={<Layout />}>
            <Route 
              path="/dashboard" 
              element={
                <Protected roles={['USER', 'ADMIN']}>
                  <Placeholder title="Dashboard" />
                </Protected>
              } 
            />
            <Route 
              path="/proposals" 
              element={
                <Protected roles={['USER', 'ADMIN']}>
                  <Placeholder title="Proposals" />
                </Protected>
              } 
            />
            <Route 
              path="/newsletters" 
              element={
                <Protected roles={['USER', 'ADMIN']}>
                  <Placeholder title="Newsletters" />
                </Protected>
              } 
            />
            <Route 
              path="/prompts" 
              element={
                <Protected roles={['ADMIN']}>
                  <Placeholder title="Prompts" />
                </Protected>
              } 
            />
            <Route 
              path="/scraper" 
              element={
                <Protected roles={['ADMIN']}>
                  <Placeholder title="Scraper" />
                </Protected>
              } 
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
