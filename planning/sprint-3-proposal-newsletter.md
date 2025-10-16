# Sprint 3 – Proposal Writer & Newsletter Generator

**Duration:** Weeks 5–6  
**Goal:** Implement AI-powered Proposal Writer and Newsletter Generator modules with Amazon Q integration  
**Status:** Planned  
**Sprint Length:** 2 weeks

## 1. Sprint Goal

By the end of Sprint 3, we will have:
- **AI Integration Foundation**: Complete Amazon Q and Bedrock service integration with guardrails and cost controls
- **Proposal Writer Module**: Template-based proposal creation with LLM-assisted content generation and collaborative editing
- **Newsletter Generator Module**: Automated content aggregation with AI-powered summarization and email distribution
- **Content Workflows**: End-to-end content creation, review, and publication processes

Success criteria: Users can create proposals and newsletters with AI assistance, collaborate in real-time, and publish content through automated workflows.

## 2. Epics

| Epic ID | Epic Name | Description |
|----------|------------|-------------|
| E8 | Amazon Q & LLM Integration | Core AI services, prompt management, and cost optimization |
| E9 | Proposal Writer Module | Template-based proposal creation with AI assistance and collaboration |
| E10 | Newsletter Generator Module | Content aggregation, AI summarization, and distribution system |
| E11 | Content Management System | Version control, approval workflows, and publication management |

## 3. User Stories

| Story ID | Description | Acceptance Criteria | Story Points |
|-----------|--------------|--------------------|---------------|
| US3.1 | As a Developer, I want to integrate Amazon Q so that users can get AI-powered assistance across all modules | Amazon Q service configured, prompt templates created, cost monitoring active, guardrails implemented | 8 |
| US3.2 | As an Innovation Manager, I want to create proposals using templates so that I can efficiently develop project proposals with AI assistance | Template library available, AI content suggestions working, collaborative editing functional | 8 |
| US3.3 | As a Content Manager, I want to generate newsletters with AI summarization so that I can create engaging content from multiple sources | Content aggregation working, AI summarization functional, email distribution integrated | 8 |
| US3.4 | As a Team Member, I want to collaborate on proposals in real-time so that multiple people can contribute to proposal development | Real-time editing, conflict resolution, comment system, version history | 5 |
| US3.5 | As a Manager, I want approval workflows for content so that all publications go through proper review processes | Approval states, notification system, review interface, publication controls | 5 |
| US3.6 | As a User, I want to export proposals and newsletters so that I can share content in various formats | PDF/DOCX export, email templates, branded formatting, download management | 3 |

## 4. Tasks (JIRA Subtasks)

| Task ID | Description | Owner | Component | Est (hrs) |
|----------|--------------|--------|------------|-----------|
| T3.1 | Set up Amazon Q service integration and API client | Backend | AI | 6 |
| T3.2 | Implement Bedrock Claude integration for content generation | Backend | AI | 6 |
| T3.3 | Create prompt template management system | Backend | AI | 8 |
| T3.4 | Implement AI guardrails and content filtering | Backend | AI | 6 |
| T3.5 | Set up cost monitoring and usage quotas for AI services | Backend | Cost | 4 |
| T3.6 | Create proposal entity and database schema | Backend | Database | 4 |
| T3.7 | Implement proposal CRUD API endpoints | Backend | API | 6 |
| T3.8 | Create proposal template system with variables | Backend | Templates | 6 |
| T3.9 | Implement real-time collaboration with WebSockets | Backend | Collaboration | 8 |
| T3.10 | Create newsletter entity and content aggregation system | Backend | Newsletter | 6 |
| T3.11 | Implement AI-powered content summarization | Backend | AI | 6 |
| T3.12 | Set up email distribution with SES integration | Backend | Email | 4 |
| T3.13 | Create proposal editor UI with rich text editing | Frontend | Editor | 8 |
| T3.14 | Implement AI assistance panel and suggestions | Frontend | AI | 6 |
| T3.15 | Build collaborative editing interface | Frontend | Collaboration | 8 |
| T3.16 | Create newsletter builder with drag-and-drop | Frontend | Newsletter | 8 |
| T3.17 | Implement content source management interface | Frontend | Content | 4 |
| T3.18 | Create approval workflow interface | Frontend | Workflow | 6 |
| T3.19 | Implement export functionality (PDF/DOCX) | Backend | Export | 6 |
| T3.20 | Set up email template system and preview | Frontend | Email | 4 |
| T3.21 | Create version control and history interface | Frontend | Versioning | 4 |
| T3.22 | Implement content analytics and engagement tracking | Backend | Analytics | 4 |

## 5. Deliverables

### AI Integration Deliverables
- **Amazon Q Service**: Complete integration with conversation management
- **Bedrock Integration**: Claude model integration for content generation
- **Prompt Management**: Template system with versioning and A/B testing capability
- **Cost Controls**: Usage monitoring, quotas, and budget alerts
- **Guardrails**: Content filtering, input validation, and safety measures

### Proposal Writer Deliverables
- **Backend APIs**:
  - `GET /proposals` - List user proposals with pagination
  - `POST /proposals` - Create new proposal from template
  - `GET /proposals/:id` - Get proposal with version history
  - `PUT /proposals/:id` - Update proposal content
  - `POST /proposals/:id/collaborate` - Join collaborative session
  - `POST /proposals/:id/ai-assist` - Get AI content suggestions
  - `POST /proposals/:id/export` - Export to PDF/DOCX
- **Frontend Interface**:
  - Rich text editor with collaborative features
  - Template selection and customization
  - AI assistance panel with suggestions
  - Real-time collaboration indicators
  - Version history and comparison
  - Export and sharing options

### Newsletter Generator Deliverables
- **Backend APIs**:
  - `GET /newsletters` - List newsletters with status
  - `POST /newsletters` - Create newsletter from sources
  - `POST /newsletters/:id/generate` - AI-powered content generation
  - `POST /newsletters/:id/preview` - Generate email preview
  - `POST /newsletters/:id/distribute` - Send newsletter
  - `GET /newsletters/:id/analytics` - Engagement metrics
- **Frontend Interface**:
  - Drag-and-drop newsletter builder
  - Content source management
  - AI summarization controls
  - Email template customization
  - Distribution management
  - Analytics dashboard

### Content Management Deliverables
- **Approval Workflows**: Multi-stage review process with notifications
- **Version Control**: Complete history with diff visualization
- **Publication Management**: Scheduled publishing and distribution
- **Analytics Integration**: Content performance tracking

## 6. Sprint Ceremonies

| Ceremony | Time | Description |
|-----------|------|-------------|
| Sprint Planning | Day 1, 9:00 AM | Review Sprint 2 outcomes, plan AI integration approach |
| Daily Standup | Daily, 9:30 AM | Progress sync, AI integration challenges, daily goals |
| AI Integration Review | Day 3, 10:00 AM | Review Amazon Q setup and prompt strategies |
| Mid-Sprint Demo | Day 5, 2:00 PM | Demo proposal creation and AI assistance |
| Sprint Review | Day 10, 2:00 PM | Demo complete proposal and newsletter workflows |
| Sprint Retrospective | Day 10, 3:00 PM | AI integration lessons learned, Sprint 4 preparation |

### Technical Reviews
- **AI Architecture Review**: Day 2, 11:00 AM - Review LLM integration patterns
- **Security Review**: Day 4, 10:00 AM - Review AI guardrails and data handling
- **Performance Review**: Day 7, 2:00 PM - Review AI response times and costs
- **UX Review**: Day 8, 11:00 AM - Review collaborative editing and AI assistance UX

## 7. Technical Architecture

### AI Service Layer
```typescript
// AI Service Architecture
@Injectable()
export class AmazonQService {
  async queryKnowledgeBase(question: string, userId: string): Promise<QResponse> {
    const userContext = await this.getUserContext(userId);
    return this.qClient.query({
      question,
      dataSourceIds: this.getAccessibleSources(userContext),
      userContext: { userId, groups: userContext.groups }
    });
  }
}

@Injectable()
export class BedrockService {
  async generateContent(prompt: PromptTemplate, variables: Record<string, any>): Promise<string> {
    const compiledPrompt = this.compilePrompt(prompt, variables);
    await this.guardrailService.validateInput(compiledPrompt);
    
    const response = await this.bedrockClient.invokeModel({
      modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        messages: [{ role: 'user', content: compiledPrompt }],
        max_tokens: 4000
      })
    });
    
    await this.guardrailService.validateOutput(response.content);
    return response.content;
  }
}
```

### Proposal Module Architecture
```typescript
// Proposal Entity
@Entity('proposals')
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  title: string;

  @Column('jsonb')
  content: ProposalContent;

  @Column({ type: 'uuid', nullable: true })
  templateId: string;

  @Column({ default: 'draft' })
  status: ProposalStatus;

  @ManyToOne(() => User)
  author: User;

  @ManyToMany(() => User)
  @JoinTable()
  collaborators: User[];

  @Column({ default: 1 })
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// Proposal Service
@Injectable()
export class ProposalService {
  async createFromTemplate(templateId: string, variables: Record<string, any>): Promise<Proposal> {
    const template = await this.templateService.findById(templateId);
    const aiContent = await this.bedrockService.generateContent(template.prompt, variables);
    
    return this.proposalRepository.save({
      title: variables.title,
      content: { sections: this.parseAIContent(aiContent) },
      templateId,
      status: 'draft'
    });
  }

  async getAISuggestions(proposalId: string, section: string): Promise<string[]> {
    const proposal = await this.findById(proposalId);
    const context = this.buildContext(proposal, section);
    
    return this.amazonQService.getSuggestions(context);
  }
}
```

### Newsletter Module Architecture
```typescript
// Newsletter Entity
@Entity('newsletters')
export class Newsletter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  title: string;

  @Column('jsonb')
  content: NewsletterContent;

  @Column('jsonb')
  sources: ContentSource[];

  @Column({ default: 'draft' })
  status: NewsletterStatus;

  @ManyToOne(() => User)
  author: User;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  scheduledFor: Date;
}

// Newsletter Service
@Injectable()
export class NewsletterService {
  async generateFromSources(sources: ContentSource[]): Promise<Newsletter> {
    const aggregatedContent = await this.contentAggregator.aggregate(sources);
    const summarizedContent = await this.bedrockService.summarizeContent(aggregatedContent);
    
    return this.newsletterRepository.save({
      title: `Newsletter - ${new Date().toISOString().split('T')[0]}`,
      content: summarizedContent,
      sources,
      status: 'draft'
    });
  }

  async distributeNewsletter(newsletterId: string, recipients: string[]): Promise<void> {
    const newsletter = await this.findById(newsletterId);
    const emailTemplate = await this.templateService.renderEmail(newsletter);
    
    await this.sesService.sendBulkEmail({
      template: emailTemplate,
      recipients,
      subject: newsletter.title
    });
  }
}
```

## 8. Database Schema Extensions

```sql
-- Proposals table
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content JSONB NOT NULL,
  template_id UUID REFERENCES proposal_templates(id),
  status VARCHAR(50) DEFAULT 'draft',
  author_id UUID REFERENCES users(id),
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Proposal collaborators (many-to-many)
CREATE TABLE proposal_collaborators (
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'editor',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (proposal_id, user_id)
);

-- Proposal templates
CREATE TABLE proposal_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  template_content JSONB NOT NULL,
  prompt_template TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletters table
CREATE TABLE newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content JSONB NOT NULL,
  sources JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'draft',
  author_id UUID REFERENCES users(id),
  published_at TIMESTAMP,
  scheduled_for TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content sources for newsletters
CREATE TABLE content_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  source_type VARCHAR(50) NOT NULL, -- 'rss', 'website', 'api'
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_fetched TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI usage tracking for cost monitoring
CREATE TABLE ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  service VARCHAR(50) NOT NULL, -- 'amazon-q', 'bedrock'
  operation VARCHAR(100) NOT NULL,
  tokens_used INTEGER,
  cost_usd DECIMAL(10,4),
  request_data JSONB,
  response_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 9. AI Integration Specifications

### Amazon Q Configuration
```yaml
# SAM Template addition for Amazon Q
AmazonQApplication:
  Type: AWS::QBusiness::Application
  Properties:
    DisplayName: !Sub "${AWS::StackName}-igad-hub"
    Description: "IGAD Innovations Hub Knowledge Base"
    RoleArn: !GetAtt QBusinessRole.Arn

QBusinessRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Effect: Allow
          Principal:
            Service: qbusiness.amazonaws.com
          Action: sts:AssumeRole
    ManagedPolicyArns:
      - arn:aws:iam::aws:policy/AmazonQBusinessServiceRolePolicy
```

### Prompt Templates
```typescript
// Proposal Generation Prompts
export const PROPOSAL_PROMPTS = {
  EXECUTIVE_SUMMARY: `
    Generate an executive summary for an innovation proposal with the following details:
    Title: {{title}}
    Objective: {{objective}}
    Target Beneficiaries: {{beneficiaries}}
    Budget Range: {{budget}}
    
    Create a compelling 2-3 paragraph executive summary that highlights the innovation's impact on IGAD member states.
  `,
  
  TECHNICAL_APPROACH: `
    Develop a technical approach section for:
    Innovation Type: {{innovationType}}
    Technology Stack: {{techStack}}
    Implementation Timeline: {{timeline}}
    
    Provide a detailed technical methodology with implementation phases.
  `,
  
  BUDGET_JUSTIFICATION: `
    Create a budget justification for:
    Total Budget: {{totalBudget}}
    Major Categories: {{categories}}
    Duration: {{duration}}
    
    Provide detailed cost breakdown with justifications for each major expense category.
  `
};

// Newsletter Summarization Prompts
export const NEWSLETTER_PROMPTS = {
  CONTENT_SUMMARY: `
    Summarize the following content for an IGAD innovation newsletter:
    {{content}}
    
    Create a concise, engaging summary (150-200 words) that highlights key innovations and their potential impact on regional development.
  `,
  
  TREND_ANALYSIS: `
    Analyze the following innovation trends:
    {{trends}}
    
    Provide insights on emerging patterns and their relevance to IGAD member states' development goals.
  `
};
```

### Cost Monitoring Implementation
```typescript
@Injectable()
export class AIUsageTracker {
  async trackUsage(userId: string, service: string, operation: string, tokens: number): Promise<void> {
    const cost = this.calculateCost(service, operation, tokens);
    
    await this.usageRepository.save({
      userId,
      service,
      operation,
      tokensUsed: tokens,
      costUsd: cost,
      createdAt: new Date()
    });
    
    // Check usage limits
    const monthlyUsage = await this.getMonthlyUsage(userId);
    if (monthlyUsage.totalCost > this.getUserLimit(userId)) {
      throw new Error('Monthly AI usage limit exceeded');
    }
  }
  
  private calculateCost(service: string, operation: string, tokens: number): number {
    const rates = {
      'bedrock-claude': 0.008, // per 1K tokens
      'amazon-q': 0.01 // per conversation
    };
    
    return (tokens / 1000) * rates[service] || 0;
  }
}
```

## 10. Frontend Component Architecture

### Proposal Editor Component
```typescript
// Proposal Editor with AI Assistance
export const ProposalEditor: React.FC<ProposalEditorProps> = ({ proposalId }) => {
  const [content, setContent] = useState<ProposalContent>();
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isCollaborating, setIsCollaborating] = useState(false);
  
  const { mutate: getAISuggestions } = useMutation({
    mutationFn: (section: string) => 
      proposalService.getAISuggestions(proposalId, section),
    onSuccess: (suggestions) => setAiSuggestions(suggestions)
  });
  
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <RichTextEditor
          content={content}
          onChange={setContent}
          onSelectionChange={(section) => getAISuggestions(section)}
          collaborative={isCollaborating}
        />
      </div>
      <div className="w-80 border-l">
        <AISuggestionPanel
          suggestions={aiSuggestions}
          onApplySuggestion={(suggestion) => 
            setContent(prev => ({ ...prev, ...suggestion }))
          }
        />
        <CollaborationPanel proposalId={proposalId} />
      </div>
    </div>
  );
};
```

### Newsletter Builder Component
```typescript
// Newsletter Builder with Content Aggregation
export const NewsletterBuilder: React.FC = () => {
  const [sources, setSources] = useState<ContentSource[]>([]);
  const [generatedContent, setGeneratedContent] = useState<NewsletterContent>();
  
  const { mutate: generateNewsletter } = useMutation({
    mutationFn: (sources: ContentSource[]) => 
      newsletterService.generateFromSources(sources),
    onSuccess: (newsletter) => setGeneratedContent(newsletter.content)
  });
  
  return (
    <div className="grid grid-cols-3 gap-6 h-screen">
      <div>
        <ContentSourceManager
          sources={sources}
          onSourcesChange={setSources}
        />
        <Button 
          onClick={() => generateNewsletter(sources)}
          disabled={sources.length === 0}
        >
          Generate with AI
        </Button>
      </div>
      <div className="col-span-2">
        <NewsletterPreview
          content={generatedContent}
          onContentChange={setGeneratedContent}
        />
      </div>
    </div>
  );
};
```

## 11. Testing Strategy

### AI Integration Testing
- **Unit Tests**: Prompt template compilation and validation
- **Integration Tests**: Amazon Q and Bedrock API responses
- **Cost Tests**: Usage tracking and limit enforcement
- **Security Tests**: Guardrail effectiveness and content filtering

### Feature Testing
- **Proposal Creation**: Template selection to final export
- **Collaboration**: Real-time editing with multiple users
- **Newsletter Generation**: Source aggregation to distribution
- **AI Assistance**: Suggestion quality and relevance

### Performance Testing
- **AI Response Times**: Target < 2.5 seconds for content generation
- **Collaborative Editing**: Real-time sync performance
- **Content Processing**: Large document handling
- **Email Distribution**: Bulk sending performance

## 12. Security & Compliance

### AI Data Handling
- **Data Privacy**: No PII in AI prompts without explicit consent
- **Content Filtering**: Inappropriate content detection and blocking
- **Usage Auditing**: Complete audit trail for AI interactions
- **Access Controls**: Role-based access to AI features

### Content Security
- **Version Control**: Immutable version history
- **Approval Workflows**: Mandatory review for sensitive content
- **Export Controls**: Watermarking and access tracking
- **Collaboration Security**: Encrypted real-time communications

## 13. Cost Optimization

### AI Usage Controls
| Control | Implementation | Target Savings |
|---------|----------------|----------------|
| Response Caching | 24-hour cache for similar prompts | 40% reduction |
| Usage Quotas | 20 AI interactions/user/month | Budget compliance |
| Prompt Optimization | Reduce average tokens by 30% | 30% cost reduction |
| Smart Routing | Use cheaper models for simple tasks | 25% cost reduction |

### Monitoring Dashboards
- Real-time AI cost tracking per user/organization
- Monthly budget alerts at 50%, 80%, 100% thresholds
- Usage pattern analysis and optimization recommendations
- Cost per feature analysis (proposals vs newsletters)

## 14. Success Metrics

### Functional Success
- [ ] Users can create proposals with AI assistance
- [ ] Newsletter generation works end-to-end
- [ ] Real-time collaboration functions properly
- [ ] AI suggestions are relevant and helpful
- [ ] Export and distribution systems work correctly

### Performance Success
- [ ] AI responses within 2.5 seconds (p95)
- [ ] Collaborative editing latency < 100ms
- [ ] Newsletter generation < 30 seconds
- [ ] Email distribution < 5 minutes for 500 recipients

### Business Success
- [ ] 80% user adoption of AI features
- [ ] 50% reduction in proposal creation time
- [ ] 90% user satisfaction with AI suggestions
- [ ] AI costs stay within $300/month budget

## 15. Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI API rate limits | High | Medium | Implement queuing and retry logic |
| Poor AI response quality | Medium | Medium | Extensive prompt testing and refinement |
| Collaboration conflicts | Medium | Low | Robust conflict resolution algorithms |
| Cost overruns | High | Medium | Strict usage monitoring and quotas |
| Real-time sync issues | Medium | Low | WebSocket fallback mechanisms |

## 16. References

### Sprint Dependencies
- **Sprint 2 Outputs**: User management, API framework, database schema, UI components
- **Required for Sprint 4**: AI service layer, content management patterns, collaboration framework

### Documentation
- `/specs/technical-spec-igad-innovations-hub-v1.1.md` - AI integration architecture
- `/specs/cost/cost-spec-igad-innovations-hub-v1.0.md` - AI cost optimization strategies
- `/planning/sprint-2-core-backend-frontend.md` - Previous sprint foundation

### External Resources
- [Amazon Q Business Documentation](https://docs.aws.amazon.com/amazonq/)
- [Amazon Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
- [WebSocket Real-time Collaboration Patterns](https://socket.io/docs/)

## 17. Next Sprint Preview

Sprint 4 will focus on:
- **Prompt Manager Module**: Advanced prompt template management with A/B testing
- **Web Scraper Module**: Automated content collection with SQS job processing
- **Search Integration**: OpenSearch or pgvector implementation for content discovery
- **Advanced Analytics**: Usage patterns, content performance, and user engagement metrics
