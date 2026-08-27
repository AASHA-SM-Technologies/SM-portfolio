import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import {
  Cpu,
  Bot,
  MessageSquare,
  Database,
  Bell,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Workflow,
  PhoneCall,
  UserCheck,
  Send
} from 'lucide-react';

export default function AIAutomationSection() {
  const { openInquiryModal } = useSite();
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  const workflows = [
    {
      title: "AI WhatsApp Lead Qualification & Booking",
      subtitle: "Instant sub-minute response, budget verification & CRM sync",
      steps: [
        { label: "New Lead Capture", sub: "Website or Ads form trigger", icon: MessageSquare, color: "#38bdf8" },
        { label: "AI WhatsApp Agent", sub: "Conversational qualification", icon: Bot, color: "#00f2fe" },
        { label: "Lead Scoring", sub: "Budget & intent verification", icon: UserCheck, color: "#818cf8" },
        { label: "Firestore CRM Sync", sub: "Structured data storage", icon: Database, color: "#a855f7" },
        { label: "Instant Owner Alert", sub: "Direct WhatsApp/SMS notification", icon: Bell, color: "#10b981" }
      ],
      impact: "Cuts response time from 4+ hours to under 45 seconds while filtering out non-serious inquiries automatically."
    },
    {
      title: "24/7 AI Customer Support & Ticket Routing",
      subtitle: "Automated triage, FAQ resolution & escalation",
      steps: [
        { label: "Customer Message", sub: "WhatsApp / Web Chat", icon: MessageSquare, color: "#38bdf8" },
        { label: "LLM Intent Classifier", sub: "Understands user issue", icon: Cpu, color: "#00f2fe" },
        { label: "Knowledgebase Retrieval", sub: "Instant precise answers", icon: Database, color: "#818cf8" },
        { label: "Auto-Resolution", sub: "Dispatches solution & links", icon: CheckCircle2, color: "#10b981" },
        { label: "Human Escalation", sub: "Alerts engineer if complex", icon: Bell, color: "#f59e0b" }
      ],
      impact: "Resolves 70%+ of routine inquiries instantly, saving 15+ support hours weekly."
    }
  ];

  const current = workflows[activeWorkflow];

  return (
    <section style={{ padding: '3.5rem 0', background: 'var(--bg-section-alt)', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <Cpu size={14} /> Intelligent Automation
          </div>
          <h2 className="ai-section-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Automate Operations with Custom <span className="text-gradient">AI Workflows</span>
          </h2>
          <p className="ai-section-desc" style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            Replace manual bottlenecks with event-driven AI pipelines that capture leads, qualify prospects, process orders, and notify your team 24/7.
          </p>
        </div>

        {/* Workflow Toggle Tabs */}
        <div className="workflow-tabs-container" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {workflows.map((wf, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWorkflow(idx)}
              className="workflow-tab-btn"
              style={{
                background: activeWorkflow === idx ? 'var(--badge-tech-bg)' : 'var(--btn-secondary-bg)',
                border: `1px solid ${activeWorkflow === idx ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                color: activeWorkflow === idx ? 'var(--accent-cyan)' : 'var(--text-muted)',
                padding: '0.75rem 1.4rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Workflow size={16} /> {wf.title}
            </button>
          ))}
        </div>

        {/* Interactive Visual Flow Diagram */}
        <div
          className="glass-card-glow workflow-flow-container"
          style={{
            padding: '2.5rem 2rem',
            marginBottom: '2.5rem',
            background: 'var(--bg-card-solid)'
          }}
        >
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h3 className="workflow-flow-heading" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {current.title}
            </h3>
            <p className="workflow-flow-subtitle" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {current.subtitle}
            </p>
          </div>

          {/* Workflow Sequence Steps */}
          <div
            className="workflow-steps-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '1.25rem',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {current.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="workflow-step-card"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '1.4rem 1rem',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = step.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div
                    className="workflow-step-icon"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'var(--btn-secondary-bg)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: step.color,
                      margin: '0 auto 0.75rem'
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="workflow-step-label" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {step.label}
                    </div>
                    <div className="workflow-step-sub" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {step.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Business Impact Footer */}
          <div
            className="workflow-impact-footer"
            style={{
              marginTop: '2rem',
              padding: '1rem 1.25rem',
              background: 'var(--badge-tech-bg)',
              border: '1px solid var(--border-glow)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <TrendingUp size={18} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
              <span><strong style={{ color: 'var(--text-main)' }}>Business Impact:</strong> {current.impact}</span>
            </div>

            <button
              onClick={() => openInquiryModal({
                requirementType: 'AI Automation & Workflows',
                sourcePage: `AI Workflows: ${current.title}`
              })}
              className="btn-primary workflow-cta-btn"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              Build This Workflow
            </button>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .ai-section-title {
            font-size: 1.65rem !important;
            line-height: 1.25 !important;
          }
          .ai-section-desc {
            font-size: 0.92rem !important;
            line-height: 1.6 !important;
          }
          .workflow-tabs-container {
            display: flex !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            gap: 0.5rem !important;
            padding-bottom: 4px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .workflow-tabs-container::-webkit-scrollbar {
            display: none;
          }
          .workflow-tab-btn {
            flex: 0 0 auto !important;
            width: auto !important;
            padding: 0.6rem 0.95rem !important;
            font-size: 0.82rem !important;
            border-radius: 10px !important;
            white-space: nowrap !important;
          }
          .workflow-flow-container {
            padding: 1.25rem 1rem !important;
            border-radius: 14px !important;
            margin-bottom: 2rem !important;
          }
          .workflow-flow-heading {
            font-size: 1.15rem !important;
          }
          .workflow-flow-subtitle {
            font-size: 0.82rem !important;
          }
          .workflow-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 0.65rem !important;
          }
          .workflow-step-card {
            display: flex !important;
            align-items: center !important;
            text-align: left !important;
            padding: 0.85rem 0.95rem !important;
            gap: 0.85rem !important;
            border-radius: 10px !important;
          }
          .workflow-step-icon {
            width: 38px !important;
            height: 38px !important;
            margin: 0 !important;
            flex-shrink: 0 !important;
          }
          .workflow-step-label {
            font-size: 0.88rem !important;
            margin-bottom: 1px !important;
          }
          .workflow-step-sub {
            font-size: 0.74rem !important;
          }
          .workflow-impact-footer {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.85rem !important;
            padding: 0.95rem 1rem !important;
          }
          .workflow-cta-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            border-radius: 10px !important;
            padding: 0.75rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
