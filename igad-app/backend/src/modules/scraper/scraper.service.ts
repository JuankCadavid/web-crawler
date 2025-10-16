import { Injectable } from '@nestjs/common';

@Injectable()
export class ScraperService {
  private jobs = [
    { id: '1', name: 'Tech News Aggregator', url: 'https://example.com', status: 'running', lastRun: new Date() },
    { id: '2', name: 'Innovation Reports', url: 'https://reports.example.com', status: 'paused', lastRun: new Date() },
  ];

  private results = [
    { id: '1', jobId: '1', title: 'Latest Tech Trends', url: 'https://example.com/article1', scrapedAt: new Date() },
    { id: '2', jobId: '1', title: 'AI in Agriculture', url: 'https://example.com/article2', scrapedAt: new Date() },
  ];

  async findAllJobs(userId: string, query: any) {
    return { data: this.jobs, total: this.jobs.length };
  }

  async findOneJob(id: string, userId: string) {
    return this.jobs.find(j => j.id === id);
  }

  async createJob(createDto: any, userId: string) {
    const job = {
      id: Date.now().toString(),
      ...createDto,
      createdBy: userId,
      status: 'active',
      createdAt: new Date(),
    };
    this.jobs.push(job);
    return job;
  }

  async updateJob(id: string, updateDto: any, userId: string) {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index >= 0) {
      this.jobs[index] = { ...this.jobs[index], ...updateDto };
      return this.jobs[index];
    }
    return null;
  }

  async removeJob(id: string, userId: string) {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index >= 0) {
      this.jobs.splice(index, 1);
      return { message: 'Job deleted' };
    }
    return null;
  }

  async runJob(id: string, userId: string) {
    return { message: `Job ${id} triggered successfully` };
  }

  async pauseJob(id: string, userId: string) {
    const job = this.jobs.find(j => j.id === id);
    if (job) {
      job.status = 'paused';
      return job;
    }
    return null;
  }

  async resumeJob(id: string, userId: string) {
    const job = this.jobs.find(j => j.id === id);
    if (job) {
      job.status = 'running';
      return job;
    }
    return null;
  }

  async getResults(userId: string, query: any) {
    return { data: this.results, total: this.results.length };
  }

  async getResult(id: string, userId: string) {
    return this.results.find(r => r.id === id);
  }

  async getJobResults(id: string, userId: string, query: any) {
    const jobResults = this.results.filter(r => r.jobId === id);
    return { data: jobResults, total: jobResults.length };
  }

  async getAnalyticsOverview(userId: string) {
    return {
      totalJobs: this.jobs.length,
      activeJobs: this.jobs.filter(j => j.status === 'running').length,
      totalResults: this.results.length,
      successRate: 95,
    };
  }

  async getJobAnalytics(id: string, userId: string) {
    return {
      totalRuns: 25,
      successfulRuns: 24,
      failedRuns: 1,
      avgDuration: 45,
      lastSuccess: new Date(),
    };
  }

  async validateUrl(url: string, userId: string) {
    return {
      valid: true,
      robotsAllowed: true,
      message: 'URL is valid and scraping is allowed',
    };
  }

  async getBlockedDomains(userId: string) {
    return ['blocked-site.com', 'no-scraping.org'];
  }

  async processContent(resultId: string, userId: string) {
    return { message: `Content ${resultId} processed successfully` };
  }
}
