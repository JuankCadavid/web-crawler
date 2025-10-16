import { Injectable } from '@nestjs/common';

@Injectable()
export class NewslettersService {
  private newsletters = [
    { id: '1', title: 'Innovation Weekly #12', status: 'published', author: 'Editor', publishedAt: new Date() },
    { id: '2', title: 'Tech Trends Report', status: 'draft', author: 'Content Team', publishedAt: null },
  ];

  async findAll(userId: string, query: any) {
    return { data: this.newsletters, total: this.newsletters.length };
  }

  async findOne(id: string, userId: string) {
    return this.newsletters.find(n => n.id === id);
  }

  async create(createDto: any, userId: string) {
    const newsletter = {
      id: Date.now().toString(),
      ...createDto,
      author: userId,
      status: 'draft',
      createdAt: new Date(),
    };
    this.newsletters.push(newsletter);
    return newsletter;
  }

  async update(id: string, updateDto: any, userId: string) {
    const index = this.newsletters.findIndex(n => n.id === id);
    if (index >= 0) {
      this.newsletters[index] = { ...this.newsletters[index], ...updateDto };
      return this.newsletters[index];
    }
    return null;
  }

  async remove(id: string, userId: string) {
    const index = this.newsletters.findIndex(n => n.id === id);
    if (index >= 0) {
      this.newsletters.splice(index, 1);
      return { message: 'Newsletter deleted' };
    }
    return null;
  }

  async generateContent(id: string, sources: string[], userId: string) {
    return { content: 'AI-generated newsletter content based on provided sources.' };
  }

  async generatePreview(id: string, userId: string) {
    return { previewUrl: `/api/newsletters/${id}/preview` };
  }

  async distribute(id: string, recipients: string[], userId: string) {
    return { message: `Newsletter sent to ${recipients.length} recipients` };
  }

  async getAnalytics(id: string, userId: string) {
    return { opens: 150, clicks: 45, bounces: 5 };
  }

  async addContentSource(name: string, url: string, type: string, userId: string) {
    return { id: Date.now().toString(), name, url, type };
  }

  async getContentSources(userId: string) {
    return [
      { id: '1', name: 'Tech News RSS', url: 'https://example.com/rss', type: 'rss' },
      { id: '2', name: 'Innovation Blog', url: 'https://blog.example.com', type: 'website' },
    ];
  }
}
