import React, { useEffect, useState, useMemo } from 'react';
import SEO from '../components/common/SEO';
import { getSkills } from '../services/firestoreService';
import { useSite } from '../context/SiteContext';
import { Analytics } from '../services/analyticsService';
import {
  Code2,
  Database,
  Cpu,
  Globe,
  Layers,
  CreditCard,
  MessageSquare,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  Server,
  Cloud,
  Lock,
  Smartphone,
  Repeat,
  Send,
  Mail,
  Workflow,
  ArrowRight,
  Terminal
} from 'lucide-react';

const CATEGORY_META = {
  'frontend': {
    title: 'Frontend & UI Architecture',
    subtitle: 'High-speed, accessible, and responsive user interfaces built with modern standards.',
    icon: Code2,
    color: '#00f2fe'
  },
  'backend': {
    title: 'Backend & Cloud Systems',
    subtitle: 'Serverless compute, REST APIs, middleware, and microservices architecture.',
    icon: Server,
    color: '#3b82f6'
  },
  'database': {
    title: 'Realtime Databases & Storage',
    subtitle: 'NoSQL document models, realtime subscriptions, and granular security rules.',
    icon: Database,
    color: '#8b5cf6'
  },
  'payments': {
    title: 'Payment & FinTech Integrations',
    subtitle: 'Razorpay checkout flows, webhook reconciliations, subscriptions, and UPI deep-linking.',
    icon: CreditCard,
    color: '#10b981'
  },
  'automation': {
    title: 'Meta WhatsApp API & Automations',
    subtitle: 'Official Meta WhatsApp Cloud API, interactive templates, automated alerts, and AI chatbots.',
    icon: MessageSquare,
    color: '#25D366'
  },
  'devops': {
    title: 'DevOps, Security & Deployment',
    subtitle: 'CI/CD workflows, DNS/SSL configurations, performance audits, and production monitoring.',
    icon: ShieldCheck,
    color: '#f43f5e'
  }
};

const BASELINE_SKILLS = [
  // Frontend
  {
    id: 'f1',
    name: 'React.js (18 / 19)',
    category: 'frontend',
    level: 'Expert',
    desc: 'Component architecture, custom hooks, context state, and performance memoization.'
  },
  {
    id: 'f2',
    name: 'Modern JavaScript (ES6+)',
    category: 'frontend',
    level: 'Expert',
    desc: 'Asynchronous event loops, functional paradigms, and optimized DOM lifecycles.'
  },
  {
    id: 'f3',
    name: 'Vite & Build Tooling',
    category: 'frontend',
    level: 'Expert',
    desc: 'Lightning HMR, tree-shaking bundling, asset chunking, and lazy loading.'
  },
  {
    id: 'f4',
    name: 'Responsive UI / Modern CSS',
    category: 'frontend',
    level: 'Expert',
    desc: 'Custom design systems, CSS variables, dark/light themes, and glassmorphism.'
  },

  // Backend & Cloud
  {
    id: 'b1',
    name: 'Node.js & Express',
    category: 'backend',
    level: 'Advanced',
    desc: 'RESTful API routing, middleware authentication, and webhook listener pipelines.'
  },
  {
    id: 'b2',
    name: 'Serverless Functions',
    category: 'backend',
    level: 'Advanced',
    desc: 'Event-triggered cloud compute, automated background jobs, and micro-tasks.'
  },
  {
    id: 'b3',
    name: 'Role-Based RBAC Auth',
    category: 'backend',
    level: 'Expert',
    desc: 'Granular permissions, secure token verification, and session management.'
  },

  // Databases
  {
    id: 'd1',
    name: 'Firebase Firestore',
    category: 'database',
    level: 'Expert',
    desc: 'NoSQL collection schemas, realtime snapshot listeners, and composite indexes.'
  },
  {
    id: 'd2',
    name: 'Firestore Security Rules',
    category: 'database',
    level: 'Expert',
    desc: 'Strict server-side validation preventing unauthorized client mutations.'
  },
  {
    id: 'd3',
    name: 'Cloud Storage & CDN',
    category: 'database',
    level: 'Advanced',
    desc: 'Automated client-side WebP compression and optimized asset caching.'
  },

  // Payments & FinTech
  {
    id: 'p1',
    name: 'Razorpay Gateway Suite',
    category: 'payments',
    level: 'Expert',
    desc: 'Standard checkout, custom modals, instant order verification, and refund flows.'
  },
  {
    id: 'p2',
    name: 'Webhook Reconciliation',
    category: 'payments',
    level: 'Expert',
    desc: 'HMAC SHA-256 signature verification with failure-retry idempotency handling.'
  },
  {
    id: 'p3',
    name: 'UPI & Deep-Linking',
    category: 'payments',
    level: 'Expert',
    desc: 'Direct UPI intent links, dynamic QR generation, and instant payment callbacks.'
  },

  // Meta WhatsApp & Automation APIs
  {
    id: 'w1',
    name: 'WhatsApp Business Cloud API',
    category: 'automation',
    level: 'Expert',
    desc: 'Meta Graph API integration, system tokens, verified WABA business numbers.'
  },
  {
    id: 'w2',
    name: 'Interactive WhatsApp Templates',
    category: 'automation',
    level: 'Expert',
    desc: 'Quick-reply buttons, call-to-actions, dynamic list pickers, and media headers.'
  },
  {
    id: 'w3',
    name: 'Automated Event Alerts',
    category: 'automation',
    level: 'Expert',
    desc: 'Instant order confirmations, invoice delivery, status alerts, payment reminders.'
  },
  {
    id: 'w4',
    name: 'Two-Way Webhooks & Chatbots',
    category: 'automation',
    level: 'Expert',
    desc: 'Real-time message listeners, automated FAQ flows, and conversational routing.'
  },
  {
    id: 'a1',
    name: 'AI & LLM Assistants',
    category: 'automation',
    level: 'Advanced',
    desc: 'OpenAI API integration for intelligent customer responses and prompt workflows.'
  },
  {
    id: 'a2',
    name: 'CRM & Lead Pipelines',
    category: 'automation',
    level: 'Expert',
    desc: 'Real-time inquiry capture, instant admin alerts, and multi-channel lead routing.'
  },

  // DevOps & Security
  {
    id: 'o1',
    name: 'Git & GitHub CI/CD',
    category: 'devops',
    level: 'Expert',
    desc: 'Branch workflows, automated static analysis, and multi-environment deployments.'
  },
  {
    id: 'o2',
    name: 'Production Monitoring',
    category: 'devops',
    level: 'Expert',
    desc: 'Error tracing, conversion analytics, Core Web Vitals telemetry, and uptime tracking.'
  },
  {
    id: 'o3',
    name: 'SSL, DNS & Cloudflare',
    category: 'devops',
    level: 'Expert',
    desc: 'Custom domains, DNS propagation, edge caching, and automated HTTPS certificates.'
  }
];

export default function SkillsPage() {
  const [dbSkills, setDbSkills] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const { openInquiryModal } = useSite();

  useEffect(() => {
    Analytics.pageView('Skills');
    async function load() {
      try {
        const data = await getSkills(true);
        if (data && data.length > 0) {
          setDbSkills(data);
        }
      } catch (err) {
        console.error("Failed to load skills from DB:", err);
      }
    }
    load();
  }, []);

  // Merge Firestore skills with Baseline Skills
  const combinedSkills = useMemo(() => {
    const map = new Map();
    
    // 1. Add baseline skills
    BASELINE_SKILLS.forEach(skill => map.set(skill.name.toLowerCase(), skill));

    // 2. Overlay / augment with DB skills
    dbSkills.forEach(dbSkill => {
      let normalizedCat = 'frontend';
      const c = (dbSkill.category || '').toLowerCase();
      if (c.includes('front') || c.includes('ui') || c.includes('react')) normalizedCat = 'frontend';
      else if (c.includes('back') || c.includes('node') || c.includes('server')) normalizedCat = 'backend';
      else if (c.includes('data') || c.includes('fire')) normalizedCat = 'database';
      else if (c.includes('pay') || c.includes('razor') || c.includes('fintech')) normalizedCat = 'payments';
      else if (c.includes('auto') || c.includes('what') || c.includes('api')) normalizedCat = 'automation';
      else if (c.includes('dev') || c.includes('sec') || c.includes('deploy')) normalizedCat = 'devops';

      map.set(dbSkill.name.toLowerCase(), {
        id: dbSkill.id,
        name: dbSkill.name,
        category: normalizedCat,
        level: dbSkill.level || 'Expert',
        desc: dbSkill.description || `${dbSkill.name} production implementation & architecture.`
      });
    });

    return Array.from(map.values());
  }, [dbSkills]);

  // Group by category
  const categoriesList = useMemo(() => {
    const cats = Object.keys(CATEGORY_META);
    return cats.map(catKey => {
      const skillsInCat = combinedSkills.filter(s => s.category === catKey);
      return {
        key: catKey,
        meta: CATEGORY_META[catKey],
        skills: skillsInCat
      };
    }).filter(c => c.skills.length > 0);
  }, [combinedSkills]);

  // Filtered categories based on selected tab
  const filteredCategories = useMemo(() => {
    if (activeTab === 'all') return categoriesList;
    return categoriesList.filter(c => c.key === activeTab);
  }, [categoriesList, activeTab]);

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
      <SEO
        title="Technical Skills & Architecture Stack"
        description="Comprehensive technical capabilities: React 19, JavaScript, Firebase Firestore, Razorpay Payment Gateways, WhatsApp Cloud API, AI Automation, and Cloud Infrastructure."
      />

      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <div
            className="skills-top-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--accent-cyan)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              background: 'var(--badge-tech-bg)',
              border: '1px solid var(--border-glow)',
              padding: '0.3rem 0.8rem',
              borderRadius: '8px'
            }}
          >
            <Cpu size={14} /> Technology Stack & Architecture
          </div>

          <h1
            className="skills-page-title"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 900,
              color: 'var(--text-main)',
              letterSpacing: '-0.025em',
              marginBottom: '1rem',
              lineHeight: 1.15
            }}
          >
            Engineering Capabilities & Tooling
          </h1>

          <p className="skills-page-desc" style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto' }}>
            Production-grade frameworks, realtime databases, payment systems, and automation pipelines built for high speed and long-term reliability.
          </p>
        </div>

        {/* 4 Architecture Pillars KPI Row */}
        <div
          className="skills-pillars-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '3.5rem'
          }}
        >
          {[
            { label: 'Sub-Second Speed', sub: '< 1.2s Core Web Vitals', icon: Gauge, color: '#00f2fe' },
            { label: 'Enterprise Security', sub: 'Strict HMAC & DB Rules', icon: ShieldCheck, color: '#10b981' },
            { label: 'Serverless Scalability', sub: 'Zero Maintenance Cloud', icon: Cloud, color: '#3b82f6' },
            { label: '100% IP Ownership', sub: 'Complete Code Transfer', icon: CheckCircle2, color: '#f59e0b' }
          ].map((pillar, pIdx) => {
            const PIcon = pillar.icon;
            return (
              <div
                key={pIdx}
                className="skills-pillar-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card-sharp)',
                  borderRadius: '12px',
                  padding: '1.1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  transition: 'all 0.25s ease'
                }}
              >
                <div
                  className="skills-pillar-icon"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: 'var(--bg-section-alt)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: pillar.color
                  }}
                >
                  <PIcon size={18} />
                </div>
                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                  <div className="skills-pillar-label" style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {pillar.label}
                  </div>
                  <div className="skills-pillar-sub" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {pillar.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Domain Filter Tabs */}
        <div
          className="skills-filter-tabs"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}
        >
          {[
            { id: 'all', label: 'All Stack' },
            { id: 'frontend', label: 'Frontend UI' },
            { id: 'backend', label: 'Backend & Cloud' },
            { id: 'database', label: 'Databases' },
            { id: 'payments', label: 'FinTech & Payments' },
            { id: 'automation', label: 'WhatsApp & APIs' },
            { id: 'devops', label: 'DevOps & Security' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="skills-tab-btn"
              style={{
                background: activeTab === tab.id ? '#dc2626' : 'var(--bg-card)',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-main)',
                border: activeTab === tab.id ? '1px solid #dc2626' : '1px solid var(--border-card-sharp)',
                padding: '0.5rem 1.1rem',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = 'var(--border-card-sharp)';
                  e.currentTarget.style.color = 'var(--text-main)';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2-Column Bento Grid of Domain Categories */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))',
            gap: '2rem',
            marginBottom: '4.5rem'
          }}
          className="skills-bento-grid"
        >
          {filteredCategories.map((category) => {
            const MetaIcon = category.meta.icon || Code2;
            return (
              <div
                key={category.key}
                className="skills-bento-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card-sharp)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    className="skills-cat-icon"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'var(--bg-section-alt)',
                      border: '1px solid var(--border-card-sharp)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: category.meta.color
                    }}
                  >
                    <MetaIcon size={20} />
                  </div>
                  <div>
                    <h2 className="skills-cat-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                      {category.meta.title}
                    </h2>
                    <p className="skills-cat-subtitle" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                      {category.meta.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skills Sub-Cards Grid */}
                <div
                  className="skills-subcards-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.85rem',
                    marginTop: '0.25rem'
                  }}
                >
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id || skill.name}
                      style={{
                        background: 'var(--bg-card-solid)',
                        border: '1px solid var(--border-card-sharp)',
                        borderRadius: '10px',
                        padding: '0.85rem 0.95rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = 'var(--border-card-sharp)';
                      }}
                    >
                      {/* Name & Badge Row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {skill.name}
                        </span>

                        <span
                          style={{
                            fontSize: '0.64rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            padding: '0.2rem 0.45rem',
                            borderRadius: '4px',
                            background: skill.level === 'Expert' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(0, 242, 254, 0.12)',
                            color: skill.level === 'Expert' ? '#10b981' : '#0284c7',
                            border: skill.level === 'Expert' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(0, 242, 254, 0.3)',
                            flexShrink: 0
                          }}
                        >
                          {skill.level || 'Expert'}
                        </span>
                      </div>

                      {/* Brief Architectural Context */}
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Executive CTA Callout */}
        <div
          className="skills-bottom-cta"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card-sharp)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h2 className="skills-cta-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Looking for a Tailored Technical Architecture?
          </h2>
          <p className="skills-cta-desc" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '620px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Whether you need a high-conversion Web platform, secure payment workflow, or automated WhatsApp business API, let's architect the right stack for your business.
          </p>
          <button
            onClick={() => openInquiryModal({ requirementType: 'Custom Architecture', sourcePage: 'Skills Directory CTA' })}
            className="btn-primary skills-cta-btn"
            style={{ padding: '0.85rem 2.2rem', fontSize: '0.95rem', borderRadius: '10px' }}
          >
            Discuss Technical Architecture <ArrowRight size={16} />
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-top-badge {
            font-size: 0.72rem !important;
            padding: 0.25rem 0.65rem !important;
            border-radius: 6px !important;
            margin-bottom: 0.65rem !important;
          }
          .skills-page-title {
            font-size: 1.6rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.65rem !important;
          }
          .skills-page-desc {
            font-size: 0.88rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1.5rem !important;
          }
          .skills-pillars-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.55rem !important;
            margin-bottom: 2rem !important;
          }
          .skills-pillar-card {
            padding: 0.75rem 0.65rem !important;
            gap: 0.55rem !important;
            border-radius: 10px !important;
            min-width: 0 !important;
            overflow: hidden !important;
          }
          .skills-pillar-icon {
            width: 32px !important;
            height: 32px !important;
            border-radius: 6px !important;
            flex-shrink: 0 !important;
          }
          .skills-pillar-label {
            font-size: 0.78rem !important;
            font-weight: 800 !important;
            line-height: 1.2 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .skills-pillar-sub {
            font-size: 0.68rem !important;
            line-height: 1.2 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .skills-filter-tabs {
            display: flex !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            gap: 0.45rem !important;
            margin-bottom: 2rem !important;
            padding-bottom: 4px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .skills-filter-tabs::-webkit-scrollbar {
            display: none;
          }
          .skills-tab-btn {
            flex: 0 0 auto !important;
            padding: 0.45rem 0.85rem !important;
            font-size: 0.78rem !important;
            border-radius: 8px !important;
            white-space: nowrap !important;
          }
          .skills-bento-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            margin-bottom: 2.5rem !important;
          }
          .skills-bento-card {
            padding: 1.25rem 1rem !important;
            border-radius: 14px !important;
            gap: 1rem !important;
          }
          .skills-cat-icon {
            width: 36px !important;
            height: 36px !important;
          }
          .skills-cat-title {
            font-size: 1.1rem !important;
          }
          .skills-cat-subtitle {
            font-size: 0.78rem !important;
          }
          .skills-subcards-grid {
            grid-template-columns: 1fr !important;
            gap: 0.55rem !important;
          }
          .skills-bottom-cta {
            padding: 1.5rem 1.15rem !important;
            border-radius: 14px !important;
          }
          .skills-cta-title {
            font-size: 1.35rem !important;
            line-height: 1.25 !important;
          }
          .skills-cta-desc {
            font-size: 0.88rem !important;
            line-height: 1.55 !important;
          }
          .skills-cta-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            border-radius: 10px !important;
            padding: 0.85rem 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
