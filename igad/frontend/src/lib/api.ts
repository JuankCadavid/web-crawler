const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Health check
  async getHealth() {
    return this.request('/health');
  }

  // Proposals
  async getProposals(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/proposals${query}`);
  }

  async getProposal(id: string) {
    return this.request(`/proposals/${id}`);
  }

  async createProposal(data: any) {
    return this.request('/proposals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProposal(id: string, data: any) {
    return this.request(`/proposals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProposal(id: string) {
    return this.request(`/proposals/${id}`, {
      method: 'DELETE',
    });
  }

  // Newsletters
  async getNewsletters(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/newsletters${query}`);
  }

  async createNewsletter(data: any) {
    return this.request('/newsletters', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Prompts
  async getPrompts(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/prompts${query}`);
  }

  async createPrompt(data: any) {
    return this.request('/prompts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Scraper
  async getScraperJobs(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/scraper/jobs${query}`);
  }

  async createScraperJob(data: any) {
    return this.request('/scraper/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
