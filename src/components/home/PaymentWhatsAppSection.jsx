import React from 'react';
import { useSite } from '../../context/SiteContext';
import {
  CreditCard,
  MessageSquare,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  FileCheck2,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PaymentWhatsAppSection() {
  const { openInquiryModal } = useSite();

  return (
    <section style={{ padding: '3.5rem 0', position: 'relative' }}>
      <div className="container-custom">
        
        <div className="payment-wa-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
          
          {/* Box 1: Razorpay & Payment Solutions */}
          <div
            className="glass-panel payment-wa-card"
            style={{
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#00f2fe', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <CreditCard size={14} /> Fintech & Gateway Integrations
              </div>

              <h3 className="payment-card-title" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.2 }}>
                Razorpay & Seamless Payment Architecture
              </h3>

              <p className="payment-card-desc" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Frictionless payment flows with 99.8% checkout success rates. Custom dynamic UPI QR codes, instant webhook verification, automated retries, and automated receipt generation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {[
                  { title: "Dynamic UPI QR Code Engine", desc: "Real-time on-screen QR with countdown timer and instant auto-verify." },
                  { title: "Cryptographic Webhook Handlers", desc: "HMAC-SHA256 signature verification preventing race conditions." },
                  { title: "Automated Digital Receipts", desc: "Instant PDF invoice creation and WhatsApp order confirmation." },
                  { title: "Subscriptions & Recurring Billing", desc: "Automated monthly/annual recurring subscription charge pipelines." }
                ].map((f, i) => (
                  <div key={i} className="payment-feature-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={16} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)', fontSize: '0.88rem' }}>{f.title}: </strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="payment-card-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => openInquiryModal({
                  requirementType: 'Payment Gateway Integration (Razorpay/UPI)',
                  sourcePage: 'Payment Solutions Showcase'
                })}
                className="btn-primary payment-card-btn"
                style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem', borderRadius: '10px' }}
              >
                Integrate Payments
              </button>

              <Link
                to="/projects?category=payment"
                className="payment-card-link"
                style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--accent-cyan)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
              >
                View Payment Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Box 2: WhatsApp Cloud API & Automations */}
          <div
            className="glass-panel payment-wa-card"
            style={{
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#25d366', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <MessageSquare size={14} /> Meta WhatsApp Business Platform
              </div>

              <h3 className="payment-card-title" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.2 }}>
                WhatsApp Cloud API & Business Bots
              </h3>

              <p className="payment-card-desc" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Engage clients where they are. Official Meta API integration with verified templates, automated lead capture, interactive button menus, and instant CRM synchronization.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {[
                  { title: "Official Cloud API Setup", desc: "Direct integration without expensive third-party markup platforms." },
                  { title: "Real-Time Lead Alerts", desc: "Instant WhatsApp message to your phone the second a user submits a form." },
                  { title: "Interactive Chatbot Menus", desc: "Quick-reply buttons, PDF catalogs, and automated meeting booking links." },
                  { title: "Order & Payment Notifications", desc: "Automated dispatch of invoices, tracking links, and confirmation messages." }
                ].map((f, i) => (
                  <div key={i} className="payment-feature-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={16} color="#25d366" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)', fontSize: '0.88rem' }}>{f.title}: </strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="payment-card-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => openInquiryModal({
                  requirementType: 'WhatsApp Cloud API & Chatbot',
                  sourcePage: 'WhatsApp API Showcase'
                })}
                className="btn-whatsapp payment-card-btn"
                style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem', borderRadius: '10px' }}
              >
                Launch WhatsApp Bot
              </button>

              <Link
                to="/projects?category=whatsapp-api"
                className="payment-card-link"
                style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                onMouseEnter={(e) => (e.target.style.color = '#25d366')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
              >
                View WhatsApp Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .payment-wa-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .payment-wa-card {
            padding: 1.35rem 1.15rem !important;
            border-radius: 14px !important;
          }
          .payment-card-title {
            font-size: 1.4rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.75rem !important;
          }
          .payment-card-desc {
            font-size: 0.88rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1.25rem !important;
          }
          .payment-feature-item strong {
            font-size: 0.85rem !important;
          }
          .payment-feature-item span {
            font-size: 0.8rem !important;
          }
          .payment-card-actions {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.65rem !important;
            padding-top: 1.15rem !important;
          }
          .payment-card-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            border-radius: 10px !important;
            padding: 0.75rem 1rem !important;
          }
          .payment-card-link {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 0.35rem 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
