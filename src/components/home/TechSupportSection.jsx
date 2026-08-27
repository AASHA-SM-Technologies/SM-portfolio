import React from 'react';
import { useSite } from '../../context/SiteContext';
import {
  LifeBuoy,
  Globe2,
  ShieldAlert,
  Server,
  Database,
  Lock,
  Bug,
  Share2,
  Cpu,
  Clock,
  ArrowRight,
  Headphones
} from 'lucide-react';

export default function TechSupportSection() {
  const { openInquiryModal, siteConfig } = useSite();

  const supportAreas = [
    { icon: Globe2, label: "Domain & DNS Routing", desc: "DNS record configuration, Cloudflare proxy, propagation fix & CNAME alignment." },
    { icon: Lock, label: "SSL / HTTPS Certificates", desc: "SSL handshake errors, auto-renewal scripts & mixed content warnings." },
    { icon: ShieldAlert, label: "Emergency Outage Triage", desc: "Sub-30m rapid investigation for production crashes and 500/502 errors." },
    { icon: Database, label: "Firebase & NoSQL Fixes", desc: "Index building, security rules debugging & document structure optimization." },
    { icon: Server, label: "Payment Callback Debugging", desc: "Razorpay webhook failures, duplicate charges & status reconciliation." },
    { icon: Bug, label: "Application Bug Fixing", desc: "React state memory leaks, UI render bugs & responsive layout fixes." },
    { icon: Share2, label: "Third-Party API Breakages", desc: "Meta WhatsApp Cloud API token renewals, OpenAI errors & webhook patches." },
    { icon: Clock, label: "Continuous Site Maintenance", desc: "Monthly dependency updates, security auditing & backup management." }
  ];

  return (
    <section style={{ padding: '3.5rem 0', position: 'relative' }}>
      <div className="container-custom">
        
        <div
          className="glass-card-glow support-main-card"
          style={{
            padding: '2.5rem 1.75rem',
            background: 'var(--bg-card-solid)',
            border: '1px solid var(--border-glow)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              <LifeBuoy size={14} /> Mission-Critical Reliability
            </div>
            <h2 className="support-heading" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              24/7 Technical Support & Troubleshooting
            </h2>
            <p className="support-desc" style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              Don't let technical glitches halt your revenue. I provide fast, reliable emergency debugging and long-term infrastructure upkeep for businesses worldwide.
            </p>
          </div>

          {/* Grid of Support Areas */}
          <div
            className="support-areas-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2.5rem'
            }}
          >
            {supportAreas.map((area, i) => (
              <div
                key={i}
                className="support-area-card"
                style={{
                  background: 'var(--btn-secondary-bg)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-glow)';
                  e.currentTarget.style.background = 'var(--bg-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.background = 'var(--btn-secondary-bg)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)' }}>
                  <area.icon size={18} />
                  <strong className="support-area-title" style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>{area.label}</strong>
                </div>
                <p className="support-area-desc" style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                  {area.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div
            className="support-actions-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <button
              onClick={() => openInquiryModal({
                requirementType: 'Technical Support & Troubleshooting',
                sourcePage: 'Technical Support Section'
              })}
              className="btn-primary"
              style={{ padding: '0.8rem 1.8rem', borderRadius: '10px' }}
            >
              <Headphones size={16} /> Request Technical Support
            </button>

            <a
              href={`https://wa.me/${siteConfig?.whatsapp?.replace(/[^0-9]/g, '') || '919022410301'}?text=${encodeURIComponent("Hello Aditya, I have an urgent technical support & troubleshooting requirement for my project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.8rem 1.8rem', borderRadius: '10px' }}
            >
              Urgent WhatsApp Support
            </a>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .support-main-card {
            padding: 1.35rem 1rem !important;
            border-radius: 14px !important;
          }
          .support-heading {
            font-size: 1.55rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.75rem !important;
          }
          .support-desc {
            font-size: 0.9rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1.5rem !important;
          }
          .support-areas-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem !important;
            margin-bottom: 1.5rem !important;
          }
          .support-area-card {
            padding: 0.85rem 0.75rem !important;
            border-radius: 10px !important;
            gap: 0.35rem !important;
          }
          .support-area-title {
            font-size: 0.82rem !important;
            line-height: 1.25 !important;
          }
          .support-area-desc {
            font-size: 0.72rem !important;
            line-height: 1.4 !important;
          }
          .support-actions-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.65rem !important;
            padding-top: 1.25rem !important;
          }
          .support-actions-row > * {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            border-radius: 10px !important;
            padding: 0.75rem 1rem !important;
            font-size: 0.88rem !important;
          }
        }
        @media (max-width: 360px) {
          .support-areas-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
