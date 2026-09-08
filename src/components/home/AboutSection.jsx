import React from 'react';
import { useSite } from '../../context/SiteContext';
import {
  Layers,
  Cpu,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const { openInquiryModal } = useSite();

  const pillars = [
    {
      icon: Layers,
      index: "01",
      title: "Scalable Architecture",
      desc: "Engineered for speed, stability, and seamless future business growth."
    },
    {
      icon: Cpu,
      index: "02",
      title: "End-to-End Delivery",
      desc: "From UI design and database schemas to APIs, payments, and deployment."
    },
    {
      icon: ShieldCheck,
      index: "03",
      title: "Enterprise Security",
      desc: "Role-based access control, secure Firestore rules, and client-side optimization."
    },
    {
      icon: TrendingUp,
      index: "04",
      title: "Direct Partnership",
      desc: "Direct communication with the engineer, zero middlemen, and reliable post-launch support."
    }
  ];

  return (
    <section id="about" style={{ padding: '3.5rem 0', position: 'relative' }}>
      <div className="container-custom">
        <div className="about-main-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Minimal Executive Story & Value */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
              <Code2 size={14} /> About & Philosophy
            </div>
            
            <h2 className="about-heading" style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.1rem' }}>
              Engineering Scalable Systems for <span className="text-gradient">Real Business Growth</span>
            </h2>

            <p className="about-desc" style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              We are <strong style={{ color: 'var(--text-main)' }}>Nexvora Technologies</strong>, a premier full-stack engineering and digital solutions studio. We design, build, and deploy production-grade web platforms, bespoke business software, payment checkouts, and AI/WhatsApp automation infrastructure for ambitious businesses.
            </p>

            <div className="about-bullets-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {[
                "100% Complete Source Code & IP Transfer with direct developer access",
                "Full Stack: React 19, Modern CSS, Node.js, Firebase & Meta Cloud APIs",
                "Built for real business ROI: High conversions, fast load speeds & secure payments"
              ].map((item, idx) => (
                <div key={idx} className="about-bullet-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500, lineHeight: 1.45 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="about-action-group" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => openInquiryModal({ sourcePage: 'About Philosophy CTA' })}
                className="btn-primary"
                style={{ padding: '0.7rem 1.6rem', fontSize: '0.88rem' }}
              >
                Discuss Your Requirement
              </button>
              
              <Link to="/skills" className="btn-secondary" style={{ padding: '0.7rem 1.35rem', fontSize: '0.88rem' }}>
                Technical Stack <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Clean Minimal Cards */}
          <div className="about-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {pillars.map((item, index) => (
              <div
                key={index}
                className="glass-panel about-pillar-card"
                style={{
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                  transition: 'border-color 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: 'var(--badge-tech-bg)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    <item.icon size={18} />
                  </div>

                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-dim)' }}>
                    {item.index}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  {item.title}
                </h3>
                
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2.25rem !important;
          }
          .about-heading {
            font-size: 1.65rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.85rem !important;
          }
          .about-desc {
            font-size: 0.92rem !important;
            line-height: 1.6 !important;
            margin-bottom: 1.25rem !important;
          }
          .about-bullets-list {
            gap: 0.65rem !important;
            margin-bottom: 1.5rem !important;
          }
          .about-bullet-item span {
            font-size: 0.84rem !important;
          }
          .about-action-group {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.6rem !important;
            width: 100% !important;
          }
          .about-action-group > * {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 0.75rem 0.5rem !important;
            font-size: 0.86rem !important;
            border-radius: 12px !important;
          }
          .about-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 0.85rem !important;
          }
          .about-pillar-card {
            padding: 1.15rem 1rem !important;
          }
        }
        @media (min-width: 480px) and (max-width: 768px) {
          .about-pillars-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 400px) {
          .about-action-group {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
