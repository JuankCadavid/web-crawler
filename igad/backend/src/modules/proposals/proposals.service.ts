import { Injectable } from '@nestjs/common';

@Injectable()
export class ProposalsService {
  private proposals = [
    { id: '1', title: 'Digital Agriculture Initiative', status: 'draft', author: 'John Doe', updatedAt: new Date() },
    { id: '2', title: 'Clean Energy Project', status: 'review', author: 'Jane Smith', updatedAt: new Date() },
  ];

  async findAll(userId: string, query: any) {
    return {
      data: this.proposals,
      total: this.proposals.length,
      page: 1,
      limit: 20,
    };
  }

  async findOne(id: string, userId: string) {
    return this.proposals.find(p => p.id === id) || null;
  }

  async create(createDto: any, userId: string) {
    const proposal = {
      id: Date.now().toString(),
      ...createDto,
      author: userId,
      status: 'draft',
      updatedAt: new Date(),
    };
    this.proposals.push(proposal);
    return proposal;
  }

  async update(id: string, updateDto: any, userId: string) {
    const index = this.proposals.findIndex(p => p.id === id);
    if (index >= 0) {
      this.proposals[index] = { ...this.proposals[index], ...updateDto, updatedAt: new Date() };
      return this.proposals[index];
    }
    return null;
  }

  async remove(id: string, userId: string) {
    const index = this.proposals.findIndex(p => p.id === id);
    if (index >= 0) {
      this.proposals.splice(index, 1);
      return { message: 'Proposal deleted successfully' };
    }
    return null;
  }

  async addCollaborator(id: string, email: string, userId: string) {
    return { message: `Collaborator ${email} added to proposal ${id}` };
  }

  async getAIAssistance(id: string, section: string, context: string, userId: string) {
    return {
      suggestions: [
        'This is an AI-generated suggestion for your proposal.',
        'Consider adding more details about the implementation timeline.',
        'Include budget breakdown and resource allocation.',
      ],
    };
  }

  async exportProposal(id: string, format: string, userId: string) {
    return { downloadUrl: `/api/downloads/proposal-${id}.${format}` };
  }

  async getVersionHistory(id: string, userId: string) {
    return [
      { version: '1.0', createdAt: new Date(), author: 'John Doe', changes: 'Initial version' },
      { version: '1.1', createdAt: new Date(), author: 'Jane Smith', changes: 'Added budget section' },
    ];
  }
}
