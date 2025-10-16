import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Select } from '../components/UI/Select';
import { Badge } from '../components/UI/Badge';

interface ScrapingJob {
  id: string;
  url: string;
  frequency: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  lastRun: string;
  nextRun: string;
  itemsCollected: number;
}

const mockJobs: ScrapingJob[] = [
  {
    id: '1',
    url: 'https://research.igad.int/publications',
    frequency: 'daily',
    status: 'running',
    lastRun: '2024-01-15 14:30',
    nextRun: '2024-01-16 14:30',
    itemsCollected: 156
  },
  {
    id: '2',
    url: 'https://africanews.com/tag/horn-of-africa',
    frequency: 'hourly',
    status: 'completed',
    lastRun: '2024-01-15 15:00',
    nextRun: '2024-01-15 16:00',
    itemsCollected: 89
  },
  {
    id: '3',
    url: 'https://www.fao.org/emergencies/crisis/drought-horn-africa',
    frequency: 'weekly',
    status: 'failed',
    lastRun: '2024-01-14 09:00',
    nextRun: '2024-01-21 09:00',
    itemsCollected: 23
  }
];

const frequencyOptions = [
  { value: 'hourly', label: 'Every Hour' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
];

export default function Scraper() {
  const [jobs, setJobs] = useState<ScrapingJob[]>(mockJobs);
  const [newJob, setNewJob] = useState({
    url: '',
    frequency: 'daily'
  });
  const [isValidating, setIsValidating] = useState(false);

  const handleStartScraping = async () => {
    if (!newJob.url.trim()) return;
    
    setIsValidating(true);
    
    // Simulate URL validation
    setTimeout(() => {
      const job: ScrapingJob = {
        id: Date.now().toString(),
        url: newJob.url,
        frequency: newJob.frequency,
        status: 'running',
        lastRun: new Date().toLocaleString(),
        nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString(),
        itemsCollected: 0
      };
      setJobs([...jobs, job]);
      setNewJob({ url: '', frequency: 'daily' });
      setIsValidating(false);
    }, 1500);
  };

  const handleJobAction = (id: string, action: 'pause' | 'resume' | 'delete') => {
    if (action === 'delete') {
      setJobs(jobs.filter(job => job.id !== id));
    } else {
      setJobs(jobs.map(job => 
        job.id === id 
          ? { ...job, status: action === 'pause' ? 'paused' : 'running' }
          : job
      ));
    }
  };

  const getStatusColor = (status: ScrapingJob['status']) => {
    switch (status) {
      case 'running': return 'success';
      case 'completed': return 'info';
      case 'failed': return 'error';
      case 'paused': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <Layout title="Web Scraper" breadcrumb="Tools">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold text-text-primary">
            Intelligent Web Scraper
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Automatically collect and monitor content from websites. Set up scheduled scraping jobs 
            to gather research papers, news articles, and other relevant content.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-semibold text-text-primary">{jobs.length}</div>
              <div className="text-sm text-text-secondary">Active Jobs</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-semibold text-text-primary">
                {jobs.reduce((sum, job) => sum + job.itemsCollected, 0)}
              </div>
              <div className="text-sm text-text-secondary">Items Collected</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-semibold text-text-primary">
                {jobs.filter(job => job.status === 'running').length}
              </div>
              <div className="text-sm text-text-secondary">Running Jobs</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-semibold text-text-primary">
                {jobs.filter(job => job.status === 'failed').length}
              </div>
              <div className="text-sm text-text-secondary">Failed Jobs</div>
            </div>
          </Card>
        </div>

        {/* New Job Form */}
        <Card
          title="Create New Scraping Job"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Website URL"
                placeholder="https://example.com/news"
                value={newJob.url}
                onChange={(e) => setNewJob({ ...newJob, url: e.target.value })}
              />
            </div>
            <div>
              <Select
                label="Scraping Frequency"
                options={frequencyOptions}
                value={newJob.frequency}
                onChange={(e) => setNewJob({ ...newJob, frequency: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleStartScraping}
              loading={isValidating}
              disabled={!newJob.url.trim()}
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
                </svg>
              }
            >
              {isValidating ? 'Validating URL...' : 'Start Scraping'}
            </Button>
          </div>
        </Card>

        {/* Jobs List */}
        <Card
          title="Scraping Jobs"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-text-primary">URL</th>
                  <th className="text-left py-3 px-4 font-medium text-text-primary">Frequency</th>
                  <th className="text-left py-3 px-4 font-medium text-text-primary">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-text-primary">Last Run</th>
                  <th className="text-left py-3 px-4 font-medium text-text-primary">Items</th>
                  <th className="text-left py-3 px-4 font-medium text-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-border hover:bg-background">
                    <td className="py-4 px-4">
                      <div className="max-w-xs truncate text-text-primary" title={job.url}>
                        {job.url}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-text-secondary capitalize">
                      {job.frequency}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-text-secondary text-sm">
                      {job.lastRun}
                    </td>
                    <td className="py-4 px-4 text-text-primary font-medium">
                      {job.itemsCollected}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        {job.status === 'running' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleJobAction(job.id, 'pause')}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                            </svg>
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleJobAction(job.id, 'resume')}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10v18a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2z" />
                            </svg>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleJobAction(job.id, 'delete')}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Best Practices */}
        <Card
          title="Scraping Best Practices"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Respect robots.txt</h4>
              <p className="text-sm text-text-secondary">
                Always check and follow the website's robots.txt file to ensure ethical scraping practices.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">Set Appropriate Delays</h4>
              <p className="text-sm text-text-secondary">
                Use reasonable delays between requests to avoid overwhelming the target server.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">Monitor Performance</h4>
              <p className="text-sm text-text-secondary">
                Regularly check job status and performance to ensure optimal data collection.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">Data Quality</h4>
              <p className="text-sm text-text-secondary">
                Review collected data regularly to ensure accuracy and relevance for your needs.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
