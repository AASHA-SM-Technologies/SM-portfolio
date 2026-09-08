import React from 'react';
import { useSite } from '../../context/SiteContext';
import {
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Code2,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function LeadCTABanner() {
  const { openInquiryModal, siteConfig } = useSite();

  const whatsappClean = siteConfig?.whatsapp?.replace(/[^0-9]/g, '') || '919022410301';
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent("Hello Nexvora Technologies, I'm reaching out from your website to discuss a new software & web project for my business.")}`;

  return (
    <section style={{ padding: '3.5rem 0', position: 'relative' }}>
      <div className="container-custom">
        <div
          className="glass-card-glow lead-cta-card"
          style={{
            padding: '3rem 1.75rem',
            textAlign: 'center',
            position: 'relative',
            background: 'var(--bg-card-solid)',
            border: '1px solid var(--border-glow)',
            boxShadow: 'var(--shadow-glow)',
            borderRadius: '16px'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--accent-cyan)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            <Code2 size={14} /> Direct Technical Collaboration
          </div>

          <h2
            className="lead-cta-title"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              maxWidth: '750px',
              margin: '0 auto 1.25rem',
              lineHeight: 1.15
            }}
          >
            Ready to Build or Scale Your <span className="text-gradient">Digital Systems?</span>
          </h2>

          <p
            className="lead-cta-desc"
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.05rem',
              maxWidth: '620px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6
            }}
          >
            From high-converting web platforms to custom ERPs, payment gateways, and WhatsApp automations — let's review your requirements and outline a concrete solution.
          </p>

          <div
            className="lead-cta-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={() => openInquiryModal({ sourcePage: 'Lead CTA Banner' })}
              className="btn-primary lead-cta-btn"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1rem', borderRadius: '10px' }}
            >
              Start Your Project
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp lead-cta-btn"
              style={{ padding: '0.9rem 2rem', fontSize: '1rem', borderRadius: '10px' }}
            >
              <MessageSquare size={18} /> Fast-Track on WhatsApp
            </a>
          </div>

          <div
            className="lead-cta-guarantees"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              marginTop: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              color: 'var(--text-dim)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={14} color="var(--accent-cyan)" /> Rapid Delivery Timelines
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} color="#10b981" /> 100% Code Ownership
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={14} color="var(--accent-cyan)" /> Direct Developer Access
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lead-cta-card {
            padding: 1.75rem 1.15rem !important;
            border-radius: 14px !important;
          }
          .lead-cta-title {
            font-size: 1.65rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.85rem !important;
          }
          .lead-cta-desc {
            font-size: 0.92rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1.5rem !important;
          }
          .lead-cta-actions {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.65rem !important;
          }
          .lead-cta-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            border-radius: 10px !important;
            padding: 0.85rem 1.25rem !important;
            font-size: 0.95rem !important;
          }
          .lead-cta-guarantees {
            flex-direction: column !important;
            align-items: center !important;
            gap: 0.55rem !important;
            margin-top: 1.5rem !important;
            padding-top: 1.25rem !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
