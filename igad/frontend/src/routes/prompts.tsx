import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';

interface Prompt {
  id: string;
  name: string;
  description: string;
  content: string;
  category: 'proposal' | 'newsletter' | 'research' | 'general';
  lastUpdated: string;
  usage: number;
}

const mockPrompts: Prompt[] = [
  {
    id: '1',
    name: 'Innovation Proposal Generator',
    description: 'Generates comprehensive innovation proposals for IGAD region projects',
    content: 'Create a detailed innovation proposal for {topic} focusing on {region} with emphasis on {priorities}...',
    category: 'proposal',
    lastUpdated: '2024-01-15',
    usage: 45
  },
  {
    id: '2',
    name: 'Newsletter Summarizer',
    description: 'Summarizes multiple sources into engaging newsletter content',
    content: 'Summarize the following content into a newsletter format with sections for {sections}...',
    category: 'newsletter',
    lastUpdated: '2024-01-14',
    usage: 32
  },
  {
    id: '3',
    name: 'Research Analysis',
    description: 'Analyzes research papers and extracts key insights',
    content: 'Analyze the following research content and provide insights on {focus_areas}...',
    category: 'research',
    lastUpdated: '2024-01-13',
    usage: 28
  },
  {
    id: '4',
    name: 'Policy Brief Generator',
    description: 'Creates policy briefs from complex policy documents',
    content: 'Create a policy brief from the following content focusing on {policy_area}...',
    category: 'general',
    lastUpdated: '2024-01-12',
    usage: 19
  }
];

export default function Prompts() {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [newPrompt, setNewPrompt] = useState({
    name: '',
    description: '',
    content: '',
    category: 'general' as Prompt['category']
  });

  const handleAddPrompt = () => {
    const prompt: Prompt = {
      id: Date.now().toString(),
      ...newPrompt,
      lastUpdated: new Date().toISOString().split('T')[0],
      usage: 0
    };
    setPrompts([...prompts, prompt]);
    setNewPrompt({ name: '', description: '', content: '', category: 'general' });
    setShowAddModal(false);
  };

  const handleDeletePrompt = (id: string) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  const getCategoryColor = (category: Prompt['category']) => {
    switch (category) {
      case 'proposal': return 'primary';
      case 'newsletter': return 'secondary';
      case 'research': return 'info';
      default: return 'neutral';
    }
  };

  return (
    <Layout title="Prompt Manager" breadcrumb="Tools">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary">
              Prompt Manager
            </h1>
            <p className="text-lg text-text-secondary mt-2">
              Manage and organize your AI prompts for consistent, high-quality content generation.
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add New Prompt
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-semibold text-text-primary">{prompts.length}</div>
              <div className="text-sm text-text-secondary">Total Prompts</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-semibold text-text-primary">
                {prompts.reduce((sum, p) => sum + p.usage, 0)}
              </div>
              <div className="text-sm text-text-secondary">Total Usage</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-semibold text-text-primary">
                {prompts.filter(p => p.category === 'proposal').length}
              </div>
              <div className="text-sm text-text-secondary">Proposal Prompts</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-semibold text-text-primary">
                {prompts.filter(p => p.category === 'newsletter').length}
              </div>
              <div className="text-sm text-text-secondary">Newsletter Prompts</div>
            </div>
          </Card>
        </div>

        {/* Prompts List */}
        <Card
          title="Your Prompts"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        >
          <div className="space-y-4">
            {prompts.map((prompt) => (
              <div key={prompt.id} className="border border-border rounded-lg p-6 hover:bg-background transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-text-primary">{prompt.name}</h3>
                      <Badge variant={getCategoryColor(prompt.category)}>
                        {prompt.category}
                      </Badge>
                    </div>
                    <p className="text-text-secondary mb-4">{prompt.description}</p>
                    <div className="bg-background rounded-lg p-4 mb-4">
                      <code className="text-sm text-text-primary font-mono">
                        {prompt.content.length > 150 
                          ? `${prompt.content.substring(0, 150)}...` 
                          : prompt.content
                        }
                      </code>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-text-secondary">
                      <span>Last updated: {prompt.lastUpdated}</span>
                      <span>Used {prompt.usage} times</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPrompt(prompt)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePrompt(prompt.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Add/Edit Modal */}
        {(showAddModal || editingPrompt) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-card shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-text-primary">
                  {editingPrompt ? 'Edit Prompt' : 'Add New Prompt'}
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <Input
                  label="Prompt Name"
                  placeholder="Enter a descriptive name for your prompt"
                  value={editingPrompt ? editingPrompt.name : newPrompt.name}
                  onChange={(e) => editingPrompt 
                    ? setEditingPrompt({...editingPrompt, name: e.target.value})
                    : setNewPrompt({...newPrompt, name: e.target.value})
                  }
                />
                <Input
                  label="Description"
                  placeholder="Describe what this prompt does"
                  value={editingPrompt ? editingPrompt.description : newPrompt.description}
                  onChange={(e) => editingPrompt 
                    ? setEditingPrompt({...editingPrompt, description: e.target.value})
                    : setNewPrompt({...newPrompt, description: e.target.value})
                  }
                />
                <Input
                  label="Prompt Content"
                  placeholder="Enter your prompt template. Use {variable} for dynamic content."
                  multiline
                  rows={8}
                  value={editingPrompt ? editingPrompt.content : newPrompt.content}
                  onChange={(e) => editingPrompt 
                    ? setEditingPrompt({...editingPrompt, content: e.target.value})
                    : setNewPrompt({...newPrompt, content: e.target.value})
                  }
                />
              </div>
              <div className="p-6 border-t border-border flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingPrompt(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddPrompt}>
                  {editingPrompt ? 'Update Prompt' : 'Add Prompt'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
