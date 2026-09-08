import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import {
  ArrowRight,
  Globe,
  Layers,
  CreditCard,
  Cpu,
  MessageSquare,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Code2,
  Activity
} from 'lucide-react';

export default function HeroSection({ projectsCount = 28 }) {
  const { siteConfig, stats, openInquiryModal } = useSite();
  const [selectedSolution, setSelectedSolution] = useState('web');

  // Dynamic counter animation
  const [counts, setCounts] = useState({
    projects: 0,
    websites: 0,
    businesses: 0,
    technologies: 0
  });

  const targetProjects = stats?.projectsCompleted || projectsCount || 28;
  const targetWebsites = stats?.websitesBuilt || 18;
  const targetBusinesses = stats?.businessesSupported || 42;
  const targetTechnologies = stats?.technologiesCount || 32;

  useEffect(() => {
    const duration = 1200;
    const steps = 24;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        projects: Math.min(Math.round(targetProjects * progress), targetProjects),
        websites: Math.min(Math.round(targetWebsites * progress), targetWebsites),
        businesses: Math.min(Math.round(targetBusinesses * progress), targetBusinesses),
        technologies: Math.min(Math.round(targetTechnologies * progress), targetTechnologies)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [targetProjects, targetWebsites, targetBusinesses, targetTechnologies]);

  const directWhatsAppUrl = () => {
    const phone = siteConfig?.whatsapp?.replace(/[^0-9]/g, '') || '919022410301';
    const text = encodeURIComponent(
      "Hello Nexvora Technologies, I'm reaching out from your website to discuss a digital project for my business."
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  const solutions = {
    web: {
      id: 'web',
      name: 'Web Platforms',
      badge: 'High Conversion · SEO',
      icon: Globe,
      color: 'var(--accent-cyan)',
      headline: 'Modern Web Apps & Business Portals',
      description: 'Ultra-fast, responsive web applications built with React 19, custom CSS, and SEO architecture.',
      metric: '< 1.2s Core Web Vitals',
      tech: ['React 19', 'Vite', 'Firestore', 'Tailwind/CSS'],
      ctaReq: 'Website Development',
      link: '/projects?category=websites'
    },
    erp: {
      id: 'erp',
      name: 'Custom ERP',
      badge: 'Role-Based RBAC',
      icon: Layers,
      color: 'var(--accent-blue)',
      headline: 'Operations & Business Software',
      description: 'Custom dashboards, CRM workflows, and management systems tailored to eliminate manual overhead.',
      metric: '100% Tailored Workflows',
      tech: ['Full-Stack', 'Cloud DB', 'Role Security', 'Reports'],
      ctaReq: 'Business Software & ERP',
      link: '/projects?category=software'
    },
    payment: {
      id: 'payment',
      name: 'Payment APIs',
      badge: 'PCI Compliant · Webhooks',
      icon: CreditCard,
      color: 'var(--accent-emerald)',
      headline: 'Razorpay & UPI Payment Flows',
      description: 'Seamless checkout systems, automated webhook reconciliation, dynamic QR, and instant receipts.',
      metric: 'Instant Webhook Sync',
      tech: ['Razorpay', 'Dynamic UPI', 'Webhooks', 'Invoicing'],
      ctaReq: 'Payment Gateway (Razorpay/UPI)',
      link: '/projects?category=payment'
    },
    ai: {
      id: 'ai',
      name: 'AI & WhatsApp',
      badge: 'Meta API · Automation',
      icon: MessageSquare,
      color: '#25d366',
      headline: 'WhatsApp Bots & AI Automations',
      description: '24/7 automated lead qualification, WhatsApp Cloud API notifications, and AI pipeline sync.',
      metric: '24/7 Automated Leads',
      tech: ['WhatsApp API', 'OpenAI/LLM', 'Webhooks', 'CRM Bot'],
      ctaReq: 'WhatsApp Cloud API & Chatbot',
      link: '/projects?category=whatsapp-api'
    }
  };

  const current = solutions[selectedSolution] || solutions.web;

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '2.75rem',
        paddingBottom: '2.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Background Architectural Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(var(--text-main) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

        {/* 2-Column Clean Hero Layout */}
        <div
          className="hero-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '2rem'
          }}
        >
          {/* Left Column: Short, SEO-Friendly & High-Impact Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {/* Minimal Developer Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cyan)'
                }}
              >
                NEXVORA TECHNOLOGIES • DIGITAL SOLUTIONS STUDIO
              </span>
            </div>

            {/* Clean & Standard H1 Headline */}
            <h1
              className="hero-headline"
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.1rem)',
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                color: 'var(--text-main)',
                maxWidth: '600px'
              }}
            >
              Crafting Scalable <span className="text-gradient">Web Systems</span> & Digital Solutions.
            </h1>

            {/* Minimal & Standard Subtitle */}
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.55,
                fontWeight: 400,
                maxWidth: '520px'
              }}
            >
              Custom web applications, business software, Razorpay payment flows, and WhatsApp Cloud APIs built for speed, security, and growth.
            </p>

            {/* 3 Quick Proof Badges (Inline Balanced Row) */}
            <div
              className="hero-proof-badges"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                flexWrap: 'wrap'
              }}
            >
              <div
                className="hero-badge-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.65rem',
                  background: 'var(--btn-secondary-bg)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-main)'
                }}
              >
                <Gauge size={14} color="#10b981" /> Sub-Second Speed
              </div>

              <div
                className="hero-badge-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.65rem',
                  background: 'var(--btn-secondary-bg)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-main)'
                }}
              >
                <ShieldCheck size={14} color="var(--accent-cyan)" /> Production Security
              </div>

              <div
                className="hero-badge-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.65rem',
                  background: 'var(--btn-secondary-bg)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-main)'
                }}
              >
                <CheckCircle2 size={14} color="var(--accent-blue)" /> 100% Direct Delivery
              </div>
            </div>

            {/* Action CTAs in Single Balanced Row */}
            <div
              className="hero-action-buttons"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                flexWrap: 'wrap',
                marginTop: '0.5rem'
              }}
            >
              <button
                onClick={() => openInquiryModal({ sourcePage: 'Hero Primary CTA' })}
                className="btn-primary hero-btn-start"
                style={{ padding: '0.8rem 1.75rem', fontSize: '0.94rem' }}
              >
                Start a Project
              </button>

              <Link
                to="/projects"
                className="btn-secondary hero-btn-work"
                style={{ padding: '0.8rem 1.5rem', fontSize: '0.94rem' }}
              >
                View Work <ArrowRight size={15} />
              </Link>

              <a
                href={directWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="hero-btn-wa"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#25d366',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(37, 211, 102, 0.08)',
                  border: '1px solid rgba(37, 211, 102, 0.25)'
                }}
              >
                <MessageSquare size={14} /> WhatsApp Chat
              </a>
            </div>

          </div>

          {/* Right Column: Clean, Interactive Live Solutions Engine */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '16px',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              background: 'var(--bg-card-solid)'
            }}
          >
            {/* Header with Traffic Dots */}
            <div
              style={{
                padding: '0.75rem 1.25rem',
                borderBottom: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ marginLeft: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  nexvora-technologies // solutions-hub
                </span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: '#10b981'
                }}
              >
                <Activity size={12} /> LIVE
              </div>
            </div>

            {/* Interactive 4-Pill Category Switcher */}
            <div
              className="hero-solutions-tabs"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                borderBottom: '1px solid var(--border-subtle)',
                background: 'var(--btn-secondary-bg)'
              }}
            >
              {Object.values(solutions).map((sol) => {
                const isSelected = selectedSolution === sol.id;
                return (
                  <button
                    key={sol.id}
                    onClick={() => setSelectedSolution(sol.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0.65rem 0.35rem',
                      background: isSelected ? 'var(--bg-card-solid)' : 'transparent',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      border: 'none',
                      borderBottom: isSelected ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <sol.icon size={13} />
                    <span>{sol.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Interactive Card Content */}
            <div className="solution-card-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div className="solution-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="solution-card-header-main" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'var(--badge-tech-bg)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: current.color,
                      flexShrink: 0
                    }}
                  >
                    <current.icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.25 }}>
                      {current.headline}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      {current.badge}
                    </div>
                  </div>
                </div>

                <div
                  className="solution-card-metric"
                  style={{
                    padding: '0.3rem 0.6rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: '#10b981',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {current.metric}
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {current.description}
              </p>

              {/* Tech Stack Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {current.tech.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Card Action Buttons */}
              <div
                className="solution-card-footer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  marginTop: '0.25rem'
                }}
              >
                <Link
                  to={current.link}
                  className="solution-footer-link"
                  style={{
                    color: 'var(--text-main)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  View Case Studies <ExternalLink size={12} />
                </Link>

                <button
                  onClick={() => openInquiryModal({ requirementType: current.ctaReq, sourcePage: `Hero Interactive ${current.name}` })}
                  className="solution-footer-btn"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Inquire Solution <ArrowRight size={12} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* 4-Column Clean Benchmark Statistics Bar */}
        <div
          className="glass-panel hero-stats-grid"
          style={{
            padding: '1.25rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.25rem',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
            background: 'var(--bg-card-solid)'
          }}
        >
          <div>
            <div
              className="text-gradient"
              style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1, fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}
            >
              {counts.projects}+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700 }}>
              Projects Delivered
            </div>
          </div>

          <div>
            <div
              className="text-gradient"
              style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1, fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}
            >
              {counts.websites}+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700 }}>
              Web & Cloud Apps
            </div>
          </div>

          <div>
            <div
              className="text-gradient"
              style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1, fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}
            >
              {counts.businesses}+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700 }}>
              Clients & Brands
            </div>
          </div>

          <div>
            <div
              className="text-gradient"
              style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1, fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}
            >
              {counts.technologies}+
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700 }}>
              APIs & Technologies
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          /* Proof Badges - Compact, elegant inline pills side-by-side */
          .hero-proof-badges {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            align-items: center !important;
            gap: 0.45rem !important;
            margin-bottom: 0.25rem !important;
          }
          .hero-badge-pill {
            width: auto !important;
            flex: 0 0 auto !important;
            padding: 0.32rem 0.65rem !important;
            font-size: 0.74rem !important;
            border-radius: 9999px !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 0.35rem !important;
          }

          /* Action Buttons - Clean, modern 2-tier Grid */
          .hero-action-buttons {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.6rem !important;
            width: 100% !important;
            margin-top: 0.4rem !important;
          }
          .hero-btn-start {
            grid-column: 1 / 2 !important;
            width: 100% !important;
            padding: 0.75rem 0.5rem !important;
            font-size: 0.88rem !important;
            border-radius: 12px !important;
            justify-content: center !important;
            text-align: center !important;
          }
          .hero-btn-work {
            grid-column: 2 / 3 !important;
            width: 100% !important;
            padding: 0.75rem 0.5rem !important;
            font-size: 0.88rem !important;
            border-radius: 12px !important;
            justify-content: center !important;
            text-align: center !important;
          }
          .hero-btn-wa {
            grid-column: 1 / -1 !important;
            width: 100% !important;
            padding: 0.7rem 1rem !important;
            font-size: 0.88rem !important;
            border-radius: 12px !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
            padding: 1.1rem 0.85rem !important;
          }
          .hero-stats-grid .text-gradient {
            font-size: 1.7rem !important;
          }
          .hero-solutions-tabs {
            display: flex !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .hero-solutions-tabs::-webkit-scrollbar {
            display: none;
          }
          .hero-solutions-tabs button {
            flex: 0 0 auto !important;
            padding: 0.65rem 0.85rem !important;
          }

          /* Interactive Solutions Card - Mobile Perfection */
          .solution-card-body {
            padding: 1.15rem 1rem !important;
            gap: 0.85rem !important;
          }
          .solution-card-header {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
          .solution-card-header-main {
            width: 100% !important;
          }
          .solution-card-metric {
            align-self: flex-start !important;
            font-size: 0.72rem !important;
            padding: 0.22rem 0.55rem !important;
          }
          .solution-card-footer {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 0.5rem !important;
          }
          .solution-footer-link {
            font-size: 0.78rem !important;
            white-space: nowrap !important;
          }
          .solution-footer-btn {
            padding: 0.45rem 0.85rem !important;
            font-size: 0.78rem !important;
            white-space: nowrap !important;
          }
        }
        @media (max-width: 480px) {
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem !important;
          }
        }
      `}</style>
    </section>
  );
}
