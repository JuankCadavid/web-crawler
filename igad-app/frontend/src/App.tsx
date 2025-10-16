import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';

// Import route components
import Landing from './routes/landing';
import Dashboard from './routes/index';
import Proposals from './routes/proposals';
import Newsletters from './routes/newsletters';
import Prompts from './routes/prompts';
import Scraper from './routes/scraper';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/scraper" element={<Scraper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
