import React from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon, trend }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary-50 rounded-lg text-primary">
            {icon}
          </div>
          <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-text-primary">{value}</p>
          <p className="text-sm text-text-secondary">{description}</p>
          {trend && (
            <div className="flex items-center space-x-1">
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-success' : 'text-error'}`}>
                {trend.isPositive ? '↗' : '↘'} {trend.value}
              </span>
              <span className="text-xs text-text-secondary">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </Card>
);

interface RecentActivityItem {
  id: string;
  type: 'proposal' | 'newsletter' | 'prompt' | 'scraper';
  title: string;
  status: 'completed' | 'in-progress' | 'failed';
  timestamp: string;
}

const recentActivities: RecentActivityItem[] = [
  {
    id: '1',
    type: 'proposal',
    title: 'Climate Change Adaptation Proposal',
    status: 'completed',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'newsletter',
    title: 'Weekly Innovation Digest',
    status: 'in-progress',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    type: 'scraper',
    title: 'Research Papers Scraping Job',
    status: 'completed',
    timestamp: '6 hours ago'
  },
  {
    id: '4',
    type: 'prompt',
    title: 'New AI Assistant Prompt',
    status: 'failed',
    timestamp: '1 day ago'
  }
];

const ActivityItem: React.FC<{ activity: RecentActivityItem }> = ({ activity }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'proposal':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'newsletter':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'scraper':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 hover:bg-background rounded-lg transition-colors">
      <div className="flex-shrink-0 p-2 bg-primary-50 rounded-lg text-primary">
        {getIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{activity.title}</p>
        <p className="text-xs text-text-secondary">{activity.timestamp}</p>
      </div>
      <Badge variant={activity.status === 'completed' ? 'success' : activity.status === 'in-progress' ? 'warning' : 'destructive'}>
        {activity.status}
      </Badge>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-card p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold mb-4">
              Welcome to IGAD Innovations Hub
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Accelerate innovation across the Horn of Africa with AI-powered tools for proposal writing, 
              newsletter generation, and intelligent content management.
            </p>
            <div className="flex space-x-4">
              <Button variant="secondary" size="lg">
                Create New Proposal
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                View Documentation
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Recent Proposals"
            value="24"
            description="Active proposals this month"
            trend={{ value: "+12%", isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          />
          <MetricCard
            title="Newsletter Drafts"
            value="8"
            description="Drafts ready for review"
            trend={{ value: "+3", isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
          <MetricCard
            title="Prompts in Use"
            value="156"
            description="Active AI prompts"
            trend={{ value: "+8%", isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
          <MetricCard
            title="Scraping Jobs"
            value="12"
            description="Active data collection jobs"
            trend={{ value: "-2", isPositive: false }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
              </svg>
            }
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card
            title="Recent Activity"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            action={
              <Button variant="ghost" size="sm">
                View All
              </Button>
            }
          >
            <div className="space-y-2">
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </Card>

          <Card
            title="Quick Actions"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          >
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Proposal
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Generate Newsletter
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
                </svg>
                Start Web Scraping
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Manage Prompts
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
