import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { getServices } from '../../services/firestoreService';
import { ServiceCardSkeleton } from '../common/SkeletonLoader';
import ServiceCardMedia from '../common/ServiceCardMedia';
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
  CheckCircle2
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

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { openInquiryModal } = useSite();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await getServices(true);
      // Strictly show top 3 on home page
      setServices(data.slice(0, 3));
      setLoading(false);
    }
    load();
  }, []);

  const handleServiceClick = (categorySlug) => {
    navigate(`/projects?category=${categorySlug || 'all'}`);
  };

  return (
    <section id="services" style={{ padding: '3.5rem 0', background: 'var(--bg-section-alt)', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <Layers size={14} /> End-to-End Capabilities
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Specialized Digital & Technical Solutions
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            Every solution is engineered for stability, speed, and real business results.<span className="desktop-only-text"> Hover on any service card to reveal key deliverables.</span>
          </p>
        </div>

        {/* 3-Column Clean Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
          className="home-services-grid"
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-panel skeleton" style={{ height: '480px', borderRadius: '16px' }} />
            ))
          ) : (
            services.map((service, idx) => {
              const Icon = ICON_MAP[service.icon] || Code2;
              const serviceIndex = (idx + 1).toString().padStart(2, '0');
              const highlights = service.highlights && service.highlights.length > 0 ? service.highlights : DEFAULT_HIGHLIGHTS;
              const isHovered = hoveredCard === service.id;
              const fallbackBg = FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length];
              const mediaImages = Array.isArray(service.images) && service.images.length > 0
                ? service.images
                : (service.imageData ? [service.imageData] : []);

              return (
                <div
                  key={service.id}
                  className="home-service-card"
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
                    className="service-card-media-wrapper"
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
                    className="service-card-top-badges"
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
                      {service.category || 'Digital'}
                    </span>
                  </div>

                  {/* RESTING STATE: Compact Fit-Width Service Name Pill */}
                  <div
                    className="service-card-resting-pill"
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
                    className="service-card-details-layer"
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
                      className="custom-card-scrollbar service-card-scroll-body"
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
                      <h3 className="service-card-title" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.25, margin: 0 }}>
                        {service.title}
                      </h3>

                      <p className="service-card-desc" style={{ color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                        {service.description}
                      </p>

                      {/* Checklist */}
                      <div
                        className="service-card-checklist"
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          padding: '0.85rem 0.95rem'
                        }}
                      >
                        <div className="service-card-checklist-title" style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                          WHAT'S INCLUDED:
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {highlights.map((hl, hIdx) => (
                            <li key={hIdx} className="service-card-checklist-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.78rem', color: '#f8fafc', lineHeight: 1.35 }}>
                              <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* FIXED BOTTOM ACTION BAR */}
                    <div
                      className="service-card-action-bar"
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
                      <button
                        onClick={() => handleServiceClick(service.category)}
                        className="service-card-casestudy-link"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#94a3b8',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: 0
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#00f2fe')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                      >
                        Case Studies <ArrowRight size={13} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInquiryModal({
                            requirementType: service.title,
                            sourcePage: `Services Section: ${service.title}`
                          });
                        }}
                        className="service-card-quote-btn"
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

        {/* BOTTOM EXPLORE SERVICES ACTION */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={() => navigate('/services')}
            className="btn-secondary services-bottom-btn"
            style={{
              padding: '0.9rem 2.5rem',
              fontSize: '0.95rem',
              borderRadius: '10px'
            }}
          >
            Explore All Detailed Services <ArrowRight size={16} />
          </button>
        </div>

      </div>

      <style>{`
        @media (min-width: 1024px) {
          .home-services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-only-text {
            display: none !important;
          }
          .services-bottom-btn {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0.85rem 1.15rem !important;
            font-size: 0.9rem !important;
            border-radius: 10px !important;
            justify-content: center !important;
            text-align: center !important;
            display: inline-flex !important;
          }
          .home-services-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .home-service-card {
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .service-card-media-wrapper {
            position: relative !important;
            height: 180px !important;
            inset: auto !important;
            flex-shrink: 0 !important;
          }
          .service-card-resting-pill {
            display: none !important;
          }
          .service-card-details-layer {
            position: relative !important;
            inset: auto !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            pointer-events: auto !important;
            background: var(--bg-card-solid) !important;
            border-top: 1px solid var(--border-card-sharp) !important;
          }
          .service-card-scroll-body {
            padding: 1.15rem 1.15rem 0.85rem !important;
            overflow-y: visible !important;
          }
          .service-card-title {
            font-size: 1.15rem !important;
            color: var(--text-main) !important;
          }
          .service-card-desc {
            color: var(--text-muted) !important;
          }
          .service-card-checklist {
            background: var(--btn-secondary-bg) !important;
            border: 1px solid var(--border-subtle) !important;
          }
          .service-card-checklist-title {
            color: var(--accent-cyan) !important;
          }
          .service-card-checklist-item {
            color: var(--text-main) !important;
          }
          .service-card-action-bar {
            padding: 0.75rem 1.15rem 1rem !important;
            background: transparent !important;
            border-top: 1px solid var(--border-subtle) !important;
          }
          .service-card-casestudy-link {
            color: var(--text-muted) !important;
          }
        }
      `}</style>
    </section>
  );
}
