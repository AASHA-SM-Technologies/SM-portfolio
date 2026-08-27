import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { getServices } from '../services/firestoreService';
import { useSite } from '../context/SiteContext';
import { Analytics } from '../services/analyticsService';
import ServiceCardMedia from '../components/common/ServiceCardMedia';
import {
  Globe,
  Layers,
  CreditCard,
  MessageSquare,
  Cpu,
  MapPin,
  LifeBuoy,
  Package,
  Zap,
  Code2,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Globe: Globe,
  Layers: Layers,
  CreditCard: CreditCard,
  MessageSquare: MessageSquare,
  Cpu: Cpu,
  MapPin: MapPin,
  LifeBuoy: LifeBuoy,
  Package: Package,
  Zap: Zap,
  Code2: Code2
};

const DEFAULT_HIGHLIGHTS = [
  "100% full source code ownership & complete IP transfer",
  "Direct developer communication with zero middlemen",
  "Production deployment, DNS/SSL setup & warranty"
];

const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
  "linear-gradient(135deg, #093028 0%, #237a57 100%)",
  "linear-gradient(135deg, #1e130c 0%, #9a8478 100%)",
  "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
  "linear-gradient(135deg, #0b486b 0%, #f56217 100%)"
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { openInquiryModal } = useSite();
  const navigate = useNavigate();

  useEffect(() => {
    Analytics.pageView('Services');
    async function load() {
      const data = await getServices(true);
      setServices(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      <SEO
        title="Services & Digital Capabilities"
        description="Comprehensive technical services: High-performance Websites, Custom Business Software, Razorpay Payment Integrations, WhatsApp Cloud APIs, AI Automation, and Technical Support."
      />

      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <Layers size={14} /> Full-Stack Technical Consulting
          </div>
          <h1 className="services-page-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Services & Solutions Directory
          </h1>
          <p className="services-page-desc" style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Every solution is engineered for stability, rapid time-to-market, and measurable business outcomes.
          </p>
        </div>

        {/* 3-Column Clean Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
            marginBottom: '4.5rem'
          }}
          className="services-3col-grid"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-panel skeleton" style={{ height: '480px', borderRadius: '16px' }} />
            ))
          ) : services.length === 0 ? (
            <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Layers size={48} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Services Configured</h3>
              <p>Services will appear here once added in the Admin CMS.</p>
            </div>
          ) : (
            services.map((service, idx) => {
              const Icon = ICON_MAP[service.icon] || Code2;
              const highlights = service.highlights && service.highlights.length > 0 ? service.highlights : DEFAULT_HIGHLIGHTS;
              const serviceIndex = (idx + 1).toString().padStart(2, '0');
              const isHovered = hoveredCard === service.id;
              const fallbackBg = FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length];
              const mediaImages = Array.isArray(service.images) && service.images.length > 0
                ? service.images
                : (service.imageData ? [service.imageData] : []);

              return (
                <div
                  key={service.id || idx}
                  className="service-page-card"
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setHoveredCard(prev => (prev === service.id ? null : service.id))}
                  style={{
                    height: '480px',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#0d131f',
                    border: isHovered ? '1px solid var(--accent-cyan)' : '1px solid var(--border-card-sharp)',
                    boxShadow: isHovered ? '0 10px 30px rgba(0, 0, 0, 0.25)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* AUTO-ROTATING IMAGE CAROUSEL WITH STAGE DOTS */}
                  <div
                    className="service-page-media"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 0,
                      overflow: 'hidden',
                      background: '#0d131f'
                    }}
                  >
                    <ServiceCardMedia
                      images={mediaImages}
                      fallbackBg={fallbackBg}
                      icon={Icon}
                      isHovered={isHovered}
                    />
                  </div>

                  {/* TOP BADGES */}
                  <div
                    className="service-page-top-badges"
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      right: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      zIndex: 5
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: '#ffffff',
                        background: 'rgba(0, 0, 0, 0.78)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      SERVICE • {serviceIndex}
                    </span>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#00f2fe',
                        background: 'rgba(0, 0, 0, 0.78)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(0, 242, 254, 0.4)',
                        textTransform: 'capitalize'
                      }}
                    >
                      {service.category || 'Custom'}
                    </span>
                  </div>

                  {/* RESTING STATE: Compact Fit-Width Service Name Pill */}
                  <div
                    className="service-page-resting-pill"
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      left: '14px',
                      zIndex: 3,
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      background: 'rgba(10, 15, 26, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      opacity: isHovered ? 0 : 1,
                      visibility: isHovered ? 'hidden' : 'visible',
                      transform: isHovered ? 'translateY(6px)' : 'translateY(0)',
                      transition: 'all 0.25s ease',
                      pointerEvents: isHovered ? 'none' : 'auto',
                      maxWidth: 'calc(100% - 28px)'
                    }}
                  >
                    <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {service.title}
                    </span>

                    <ArrowRight size={13} color="#00f2fe" style={{ flexShrink: 0 }} />
                  </div>

                  {/* HOVER DETAILS LAYER: Clean Scrollable Panel with Zero Ghost Text */}
                  <div
                    className="service-page-details-layer"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 4,
                      background: 'rgba(10, 15, 26, 0.98)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      display: 'flex',
                      flexDirection: 'column',
                      opacity: isHovered ? 1 : 0,
                      visibility: isHovered ? 'visible' : 'hidden',
                      transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                      pointerEvents: isHovered ? 'auto' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      overflow: 'hidden'
                    }}
                  >
                    {/* SCROLLABLE CONTENT BODY */}
                    <div
                      className="custom-card-scrollbar service-page-scroll-body"
                      style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '3.8rem 1.4rem 1rem 1.4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem'
                      }}
                    >
                      {/* Title Header */}
                      <h2 className="service-page-card-title" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.25, margin: 0 }}>
                        {service.title}
                      </h2>

                      {/* Detailed Description */}
                      <p className="service-page-card-desc" style={{ color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                        {service.description}
                      </p>

                      {/* What You Get Checklist */}
                      <div
                        className="service-page-checklist"
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          padding: '0.85rem 0.95rem'
                        }}
                      >
                        <div className="service-page-checklist-title" style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                          WHAT'S INCLUDED:
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {highlights.map((hl, hIdx) => (
                            <li key={hIdx} className="service-page-checklist-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.78rem', color: '#f8fafc', lineHeight: 1.35 }}>
                              <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* FIXED BOTTOM ACTION BAR */}
                    <div
                      className="service-page-actions"
                      style={{
                        padding: '0.85rem 1.4rem',
                        background: '#070b14',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        flexShrink: 0
                      }}
                    >
                      <Link
                        to={`/projects?category=${service.category || 'all'}`}
                        onClick={(e) => e.stopPropagation()}
                        className="service-page-casestudy-link"
                        style={{
                          color: '#94a3b8',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          transition: 'color 0.15s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#00f2fe')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                      >
                        Case Studies <ArrowRight size={13} />
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInquiryModal({
                            requirementType: service.title,
                            sourcePage: `Services Directory: ${service.title}`
                          });
                        }}
                        className="service-page-quote-btn"
                        style={{
                          background: '#fde047',
                          color: '#0f172a',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.55rem 1.15rem',
                          fontSize: '0.82rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#facc15';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fde047';
                        }}
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Banner */}
        <div
          className="glass-panel services-bottom-banner"
          style={{
            padding: '2.5rem',
            textAlign: 'center',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-surface) 100%)',
            border: '1px solid var(--border-medium)'
          }}
        >
          <Layers size={28} color="var(--accent-cyan)" style={{ margin: '0 auto 0.75rem' }} />
          <h2 className="services-banner-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Need a Custom Architecture or Tailored System?
          </h2>
          <p className="services-banner-desc" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '620px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Every business has unique operational needs. Let's design a custom software solution, payment flow, or automation pipeline tailored specifically for you.
          </p>
          <button
            onClick={() => openInquiryModal({ requirementType: 'Custom Business Software', sourcePage: 'Services Bottom CTA' })}
            className="btn-primary services-banner-btn"
            style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', borderRadius: '10px' }}
          >
            Start a Custom Discussion
          </button>
        </div>

      </div>

      <style>{`
        @media (min-width: 1024px) {
          .services-3col-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .services-page-title {
            font-size: 1.85rem !important;
            line-height: 1.2 !important;
            margin-bottom: 0.75rem !important;
          }
          .services-page-desc {
            font-size: 0.92rem !important;
            line-height: 1.55 !important;
          }
          .services-3col-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            margin-bottom: 3rem !important;
          }
          .service-page-card {
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .service-page-media {
            position: relative !important;
            height: 180px !important;
            inset: auto !important;
            flex-shrink: 0 !important;
          }
          .service-page-resting-pill {
            display: none !important;
          }
          .service-page-details-layer {
            position: relative !important;
            inset: auto !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            pointer-events: auto !important;
            background: var(--bg-card-solid) !important;
            border-top: 1px solid var(--border-card-sharp) !important;
          }
          .service-page-scroll-body {
            padding: 1.15rem 1.15rem 0.85rem !important;
            overflow-y: visible !important;
          }
          .service-page-card-title {
            font-size: 1.2rem !important;
            color: var(--text-main) !important;
          }
          .service-page-card-desc {
            color: var(--text-muted) !important;
          }
          .service-page-checklist {
            background: var(--btn-secondary-bg) !important;
            border: 1px solid var(--border-subtle) !important;
          }
          .service-page-checklist-title {
            color: var(--accent-cyan) !important;
          }
          .service-page-checklist-item {
            color: var(--text-main) !important;
          }
          .service-page-actions {
            padding: 0.75rem 1.15rem 1rem !important;
            background: transparent !important;
            border-top: 1px solid var(--border-subtle) !important;
          }
          .service-page-casestudy-link {
            color: var(--text-muted) !important;
          }
          .services-bottom-banner {
            padding: 1.5rem 1.15rem !important;
            border-radius: 14px !important;
          }
          .services-banner-title {
            font-size: 1.35rem !important;
            line-height: 1.25 !important;
          }
          .services-banner-desc {
            font-size: 0.88rem !important;
            line-height: 1.55 !important;
          }
          .services-banner-btn {
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
