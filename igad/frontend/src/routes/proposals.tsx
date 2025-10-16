import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';

export default function Proposals() {
  const [topic, setTopic] = useState('');
  const [generatedProposal, setGeneratedProposal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedProposal(`
# Innovation Proposal: ${topic}

## Executive Summary
This proposal outlines a comprehensive approach to addressing ${topic} through innovative solutions and strategic partnerships within the IGAD region.

## Problem Statement
The challenge of ${topic} requires immediate attention and coordinated efforts across member states to ensure sustainable development and regional stability.

## Proposed Solution
We propose a multi-faceted approach that includes:

1. **Technology Integration**: Leveraging cutting-edge technology to address core challenges
2. **Capacity Building**: Developing local expertise and knowledge transfer programs
3. **Partnership Development**: Creating strategic alliances with key stakeholders
4. **Monitoring & Evaluation**: Implementing robust tracking mechanisms for impact assessment

## Implementation Timeline
- Phase 1 (Months 1-3): Planning and stakeholder engagement
- Phase 2 (Months 4-12): Implementation and pilot testing
- Phase 3 (Months 13-18): Scale-up and evaluation

## Budget Overview
Total estimated budget: $2.5M USD over 18 months

## Expected Outcomes
- Improved regional cooperation
- Enhanced innovation capacity
- Sustainable development impact
- Knowledge transfer and capacity building

## Conclusion
This proposal represents a significant opportunity to advance ${topic} initiatives across the IGAD region through innovative approaches and collaborative partnerships.
      `);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Layout title="Proposal Writer" breadcrumb="Tools">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold text-text-primary">
            AI-Powered Proposal Writer
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Generate comprehensive innovation proposals using advanced AI. Simply describe your topic 
            and let our system create a structured, professional proposal document.
          </p>
        </div>

        {/* Input Section */}
        <Card
          title="Proposal Topic"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
        >
          <div className="space-y-6">
            <Input
              label="Describe your proposal topic"
              placeholder="e.g., Climate-smart agriculture initiatives for drought resilience in the Horn of Africa"
              multiline
              rows={4}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            
            <div className="flex justify-center">
              <Button
                onClick={handleGenerate}
                loading={isGenerating}
                disabled={!topic.trim()}
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                {isGenerating ? 'Generating Proposal...' : 'Generate Proposal Draft'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Generated Proposal */}
        {generatedProposal && (
          <Card
            title="Generated Proposal"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            action={
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export
                </Button>
              </div>
            }
          >
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-text-primary font-sans leading-relaxed">
                {generatedProposal}
              </pre>
            </div>
          </Card>
        )}

        {/* Tips Section */}
        <Card
          title="Tips for Better Proposals"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Be Specific</h4>
              <p className="text-sm text-text-secondary">
                Provide detailed context about your innovation topic, target region, and expected outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">Include Context</h4>
              <p className="text-sm text-text-secondary">
                Mention relevant IGAD priorities, regional challenges, and stakeholder considerations.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">Define Scope</h4>
              <p className="text-sm text-text-secondary">
                Clearly outline the geographical scope, timeline, and scale of your proposed innovation.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">Review & Edit</h4>
              <p className="text-sm text-text-secondary">
                Always review the generated content and customize it to match your specific requirements.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
