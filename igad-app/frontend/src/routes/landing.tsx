import { Link } from 'react-router-dom';
import { LandingHeader } from '../components/Layout/LandingHeader';

const ToolCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
  link?: string;
}> = ({ title, description, icon, available, link }) => (
  <div className={`
    relative bg-surface rounded-card shadow-card border-2 p-8
    ${available ? 'border-border-green' : 'border-border opacity-75'}
  `}>
    <div className="space-y-6">
      {/* Icon */}
      <div className={`
        w-16 h-16 rounded-card flex items-center justify-center
        ${available ? 'bg-bg-green-light' : 'bg-bg-gray-light'}
      `}>
        {icon}
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-normal text-text-primary">{title}</h3>
        <p className="text-base leading-relaxed text-text-secondary">{description}</p>
      </div>
      
      {/* Button */}
      {available ? (
        <Link
          to={link || '#'}
          className="block w-full bg-primary-light text-white text-center py-2 rounded-button font-normal"
        >
          Launch Tool
          <span className="ml-2">→</span>
        </Link>
      ) : (
        <button
          disabled
          className="w-full bg-surface border border-black/10 text-black/70 py-2 rounded-button font-normal opacity-50"
        >
          Coming Soon
        </button>
      )}
      
      {/* Status Badge */}
      <div className={`
        absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-normal
        ${available 
          ? 'bg-bg-green-light border border-border-green text-primary' 
          : 'bg-bg-gray-light border border-border text-text-secondary'
        }
      `}>
        {available ? 'Available' : 'Coming Soon'}
      </div>
    </div>
  </div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      {/* Hero Section */}
      <div className="bg-hero-gradient border-b border-border-hero">
        <div className="max-w-container mx-auto px-16 py-12">
          {/* IGAD Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/igad-logo.png" 
              alt="IGAD Logo" 
              className="h-24 w-auto"
            />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl font-normal text-primary text-center mb-8 tracking-tight">
            AI-Powered Agricultural Intelligence Hub
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl font-normal text-secondary text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering agricultural experts across the IGAD region with intelligent tools for innovation, 
            policy development, and sustainable growth.
          </p>
          
          {/* Mission Card */}
          <div className="max-w-4xl mx-auto bg-white/80 border border-border-green rounded-card shadow-card p-8">
            {/* Decorative line and text */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-primary-light"></div>
              <span className="text-base font-normal text-primary text-center">
                PEACE, PROSPERITY AND REGIONAL INTEGRATION
              </span>
              <div className="w-12 h-0.5 bg-primary-light"></div>
            </div>
            
            {/* Mission statement */}
            <p className="text-lg font-normal text-text-muted text-center leading-relaxed">
              Supporting the Intergovernmental Authority on Development (IGAD) in advancing 
              agricultural innovation, policy analysis, and regional cooperation through 
              cutting-edge artificial intelligence solutions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Tools Section */}
      <div className="max-w-container mx-auto px-16 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-normal text-primary mb-4">
            AI-Powered Tools & Services
          </h2>
          <p className="text-lg font-normal text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Choose from our suite of specialized tools designed to accelerate agricultural 
            innovation and policy development across the Horn of Africa.
          </p>
        </div>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Row 1 */}
          <ToolCard
            title="Report Generator"
            description="Generate comprehensive agricultural and policy reports using AI-powered analysis and data synthesis."
            available={false}
            icon={
              <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          
          <ToolCard
            title="Policy Analyzer"
            description="Analyze and review regional policies for agricultural development and sustainability impact assessment."
            available={false}
            icon={
              <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          
          <ToolCard
            title="Proposal Writer"
            description="Create compelling funding proposals for agricultural innovation projects with AI assistance."
            available={true}
            link="/proposals"
            icon={
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          />
          
          {/* Row 2 */}
          <ToolCard
            title="Newsletter Generator"
            description="Create engaging newsletters on agricultural innovations, research findings, and policy updates for stakeholders."
            available={true}
            link="/newsletters"
            icon={
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
          
          <ToolCard
            title="Agribusiness Hub"
            description="Connect with agribusiness development opportunities, market insights, and partnership networks across the region."
            available={false}
            icon={
              <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 8v10l4-4 4 4V8" />
              </svg>
            }
          />
        </div>
        
        {/* Documentation Button */}
        <div className="flex justify-end">
          <button className="bg-accent text-white px-6 py-3 rounded-button shadow-card flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Docs
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-primary text-center py-4">
        <p className="text-border-hero text-base mb-1">
          © 2024 IGAD - Intergovernmental Authority on Development
        </p>
        <p className="text-border-green text-sm">
          Advancing agricultural innovation and regional integration
        </p>
      </footer>
    </div>
  );
}
