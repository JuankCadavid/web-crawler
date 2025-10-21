import { useState } from 'react';

import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';

export default function Newsletters() {
  const [sources, setSources] = useState('');
  const [generatedNewsletter, setGeneratedNewsletter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!sources.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedNewsletter(`
# IGAD Innovations Weekly Digest
*Week of ${new Date().toLocaleDateString()}*

## 🌟 Featured Innovation

**Climate-Smart Agriculture Initiative Launches Across Horn of Africa**
A groundbreaking partnership between IGAD member states has launched a comprehensive climate-smart agriculture program aimed at enhancing food security and resilience across the region.

## 📊 Key Developments

### Technology & Innovation
- **Digital Livestock Tracking System**: New blockchain-based system deployed in Kenya and Ethiopia for improved livestock management
- **Solar-Powered Irrigation**: 500+ smallholder farmers in Sudan now have access to solar irrigation systems
- **Mobile Weather Alerts**: Enhanced early warning system reaches 2M+ farmers across the region

### Policy & Partnerships
- **Regional Innovation Fund**: $50M commitment from development partners for cross-border innovation projects
- **Youth Innovation Challenge**: Applications now open for the 2024 IGAD Youth Innovation Challenge
- **Research Collaboration**: New MOU signed between regional universities for joint research initiatives

### Success Stories
- **Drought-Resistant Seeds**: Farmers in Somalia report 40% yield increase using new drought-resistant varieties
- **Water Management**: Community-led water harvesting projects benefit 10,000+ households in Djibouti
- **Digital Finance**: Mobile money adoption reaches 75% in rural areas across member states

## 🔬 Research Highlights

**Climate Adaptation Strategies**
Recent studies show that integrated approaches combining traditional knowledge with modern technology yield the best results for climate adaptation in arid and semi-arid regions.

**Innovation Ecosystem Development**
Analysis of regional innovation hubs reveals significant growth in startup activity, with a 35% increase in agtech ventures over the past year.

## 📅 Upcoming Events

- **IGAD Innovation Summit 2024**: March 15-17, Addis Ababa
- **Regional Startup Pitch Competition**: April 5, Nairobi
- **Climate Tech Workshop**: April 20-22, Kampala

## 💡 Innovation Spotlight

This week we highlight the **Smart Pastoralism Initiative**, which combines satellite monitoring, mobile technology, and traditional knowledge to optimize grazing patterns and improve livestock productivity across the region.

---

*Stay connected with IGAD innovations. Forward this newsletter to colleagues and partners interested in regional innovation developments.*
      `);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold text-text-primary">
            AI Newsletter Generator
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Transform your content sources into professional newsletters. Upload documents, paste text, 
            or provide URLs to generate engaging newsletter content with Amazon Q.
          </p>
        </div>

        {/* Input Section */}
        <Card
          title="Content Sources"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          }
        >
          <div className="space-y-6">
            <Input
              label="Paste your source content or URLs"
              placeholder="Paste articles, reports, URLs, or any text content you want to include in your newsletter..."
              multiline
              rows={8}
              value={sources}
              onChange={(e) => setSources(e.target.value)}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Upload Files
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Add URLs
                </Button>
              </div>
              
              <Button
                onClick={handleGenerate}
                loading={isGenerating}
                disabled={!sources.trim()}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              >
                {isGenerating ? 'Generating...' : 'Summarize with Amazon Q'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Generated Newsletter */}
        {generatedNewsletter && (
          <Card
            title="Generated Newsletter"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
            action={
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send
                </Button>
                <Button size="sm">
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
                {generatedNewsletter}
              </pre>
            </div>
          </Card>
        )}

        {/* Newsletter Templates */}
        <Card
          title="Newsletter Templates"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg hover:bg-background transition-colors cursor-pointer">
              <h4 className="font-medium text-text-primary mb-2">Weekly Digest</h4>
              <p className="text-sm text-text-secondary">Comprehensive weekly roundup of innovations and developments</p>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-background transition-colors cursor-pointer">
              <h4 className="font-medium text-text-primary mb-2">Research Update</h4>
              <p className="text-sm text-text-secondary">Focus on research findings and academic developments</p>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-background transition-colors cursor-pointer">
              <h4 className="font-medium text-text-primary mb-2">Policy Brief</h4>
              <p className="text-sm text-text-secondary">Policy updates and regulatory changes across the region</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
