import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { ArrowUp, MessageSquare } from 'lucide-react';

export default function Footer() {
  const { siteConfig, openInquiryModal } = useSite();
  const navigate = useNavigate();
  const [footerClicks, setFooterClicks] = useState(0);
  const lastClickRef = useRef(0);
  const clickTimerRef = useRef(null);

  const currentYear = new Date().getFullYear();

  // Secret 5-Clicks Admin Trigger on "Stay connected"
  const handleSecretAdminTrigger = (e) => {
    const now = Date.now();
    if (now - lastClickRef.current < 1200) {
      const count = footerClicks + 1;
      setFooterClicks(count);
      if (count >= 5) {
        e.preventDefault();
        setFooterClicks(0);
        navigate('/admin/login');
        return;
      }
    } else {
      setFooterClicks(1);
    }
    lastClickRef.current = now;
    clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      setFooterClicks(0);
    }, 2000);
  };

  const whatsappClean = siteConfig?.whatsapp?.replace(/[^0-9]/g, '') || '919022410301';
  const whatsappLink = `https://wa.me/${whatsappClean}?text=${encodeURIComponent("Hello Nexvora Technologies, I'm reaching out from your website to discuss a new digital solution for my business.")}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="site-footer"
      style={{
        background: '#111111',
        color: '#9ca3af',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        position: 'relative',
        fontFamily: 'var(--font-sans)'
      }}
    >
      <div className="container-custom footer-container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Main Upper Grid */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '3.5rem',
            flexWrap: 'wrap',
            marginBottom: '4.5rem'
          }}
          className="footer-main-flex"
        >
          {/* Top Row Wrapper for Mobile (Heading + Scroll to top) */}
          <div className="footer-top-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 'auto', gap: '1.5rem' }}>
            {/* 1. Large Heading (Single Horizontal Line with Secret 5-Click Trigger) */}
            <div className="footer-heading-col" style={{ flex: '0 0 auto' }}>
              <h2
                onClick={handleSecretAdminTrigger}
                title="Nexvora Technologies"
                style={{
                  fontSize: 'clamp(2.2rem, 3.6vw, 3.4rem)',
                  color: '#ffffff',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  cursor: 'pointer',
                  userSelect: 'none',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ fontWeight: 300 }}>Stay </span>
                <span style={{ fontWeight: 800 }}>connected</span>
              </h2>
            </div>

            {/* Mobile Scroll-to-Top Button (visible on mobile next to title) */}
            <button
              onClick={scrollToTop}
              title="Scroll to top"
              aria-label="Scroll to top"
              className="footer-scroll-top-mobile"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ArrowUp size={16} />
            </button>
          </div>

          {/* 2. Contact Section */}
          <div className="footer-contact-block" style={{ flex: '1 1 auto', minWidth: '320px' }}>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '1.4rem',
                letterSpacing: '0.01em'
              }}
            >
              Contact
            </h4>

            <div
              className="footer-contact-items"
              style={{
                display: 'flex',
                gap: '3rem',
                flexWrap: 'wrap'
              }}
            >
              {/* Contact Us */}
              <div className="footer-contact-card-item" style={{ whiteSpace: 'nowrap' }}>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  Contact Us
                </div>
                <a
                  href={`tel:${siteConfig?.whatsapp || '+919022410301'}`}
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    transition: 'color 0.2s ease',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  {siteConfig?.whatsapp || '+91 90224 10301'}
                </a>
              </div>

              {/* New Business Inquiries */}
              <div className="footer-contact-card-item" style={{ whiteSpace: 'nowrap' }}>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  New Business Inquiries
                </div>
                <a
                  href={`mailto:${siteConfig?.email || 'adityajamdade2124@gmail.com'}`}
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    transition: 'color 0.2s ease',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  {siteConfig?.email || 'adityajamdade2124@gmail.com'}
                </a>
              </div>
            </div>
          </div>

          {/* 3. Follow Us Section */}
          <div className="footer-social-block" style={{ flex: '0 0 auto', minWidth: '220px' }}>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '1.4rem',
                letterSpacing: '0.01em'
              }}
            >
              Follow Us
            </h4>

            <div
              className="footer-social-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                gap: '0.75rem 2.5rem',
                fontSize: '0.88rem'
              }}
            >
              <a
                href={siteConfig?.instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
                style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
              >
                Instagram
              </a>

              <a
                href={siteConfig?.facebookUrl || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
                style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
              >
                Facebook
              </a>

              <a
                href={siteConfig?.linkedinUrl || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
                style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
              >
                LinkedIn
              </a>

              <a
                href={siteConfig?.twitterUrl || 'https://x.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
                style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
              >
                X
              </a>
            </div>
          </div>

          {/* 4. Desktop Scroll to Top Round Button */}
          <div className="footer-scroll-top-col" style={{ flex: '0 0 auto', alignSelf: 'flex-start' }}>
            <button
              onClick={scrollToTop}
              title="Scroll to top"
              aria-label="Scroll to top"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Crisp Divider */}
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '2rem' }} />

        {/* Bottom Bar: Copyright & Legal Navigation */}
        <div
          className="footer-bottom-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            fontSize: '0.85rem',
            color: '#6b7280'
          }}
        >
          <div>
            © {currentYear} {siteConfig?.name || 'Nexvora Technologies'}. All rights reserved.
          </div>

          <div className="footer-legal-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
            >
              Privacy Notice
            </Link>
            <Link
              to="/contact"
              style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
            >
              Terms of Use
            </Link>
            <Link
              to="/contact"
              style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
            >
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>

      {/* Realistic Floating WhatsApp Live Chat Widget */}
      <div
        className="floating-wa-widget"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {/* "Online Now • Chat with us" interactive pill */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-wa-pill"
          style={{
            background: 'var(--bg-card-solid)',
            border: '1px solid var(--border-card-sharp)',
            color: 'var(--text-main)',
            padding: '0.45rem 0.85rem',
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: 'var(--shadow-md)',
            lineHeight: 1.25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2px',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span style={{ color: '#10b981', fontSize: '0.68rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px', letterSpacing: '0.02em' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 6px #10b981' }} />
            Online Now
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Chat on WhatsApp
          </span>
        </a>

        {/* Ultra-Realistic Official WhatsApp Round Floating Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Nexvora Technologies on WhatsApp"
          className="floating-wa-button"
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0, 0, 0, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 211, 102, 0.6), 0 4px 10px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0, 0, 0, 0.25)';
          }}
        >
          {/* Official HD WhatsApp Icon Vector */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.403 5.638A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.09h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.342zM12.053 19.442h-.003a7.464 7.464 0 0 1-3.805-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.968c.002-4.114 3.349-7.461 7.467-7.461a7.417 7.417 0 0 1 5.279 2.188 7.42 7.42 0 0 1 2.183 5.28c-.002 4.114-3.349 7.462-7.462 7.462zm4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58 0.729-.711.879-.262.168-.486.056-.948-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.182-.439-.367-.379-.504-.385l-.43-.008c-.149 0-.392.056-.597.28-.205.225-.784.767-.784 1.872 0 1.104.803 2.17 0.915 2.32.112.15 1.58 2.412 3.828 3.382.535.231.952.369 1.277.473.537.171 1.025.147 1.411.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.066-.056-.093-.205-.15-.43-.262z"
              fill="#ffffff"
            />
          </svg>
        </a>
      </div>

      <style>{`
        /* Desktop Layout Rules - 100% Strictly Preserved */
        @media (min-width: 769px) {
          .footer-scroll-top-mobile {
            display: none !important;
          }
          .footer-scroll-top-col {
            display: block !important;
          }
        }

        /* Mobile Layout Rules - Polished, Balanced & Structured */
        @media (max-width: 768px) {
          .site-footer {
            padding-top: 3rem !important;
            padding-bottom: 2rem !important;
          }
          .footer-container {
            padding: 0 1.15rem !important;
          }
          .footer-main-flex {
            flex-direction: column !important;
            gap: 1.75rem !important;
            margin-bottom: 2rem !important;
          }
          .footer-top-header {
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          .footer-heading-col h2 {
            font-size: 1.85rem !important;
            white-space: normal !important;
            line-height: 1.15 !important;
          }
          .footer-scroll-top-mobile {
            display: inline-flex !important;
            flex-shrink: 0 !important;
          }
          .footer-scroll-top-col {
            display: none !important;
          }
          .footer-contact-block {
            min-width: 100% !important;
            background: rgba(255, 255, 255, 0.03) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-radius: 14px !important;
            padding: 1.25rem !important;
          }
          .footer-contact-block h4 {
            margin-bottom: 1rem !important;
            color: #ffffff !important;
            font-size: 0.88rem !important;
            text-transform: uppercase !important;
            letter-spacing: 0.06em !important;
          }
          .footer-contact-items {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .footer-contact-card-item {
            white-space: normal !important;
            word-break: break-word !important;
          }
          .footer-contact-card-item a {
            font-size: 0.95rem !important;
            color: #d1d5db !important;
          }
          .footer-social-block {
            min-width: 100% !important;
            background: rgba(255, 255, 255, 0.03) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-radius: 14px !important;
            padding: 1.25rem !important;
          }
          .footer-social-block h4 {
            margin-bottom: 1rem !important;
            color: #ffffff !important;
            font-size: 0.88rem !important;
            text-transform: uppercase !important;
            letter-spacing: 0.06em !important;
          }
          .footer-social-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem !important;
          }
          .footer-social-pill {
            background: rgba(255, 255, 255, 0.04) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-radius: 8px !important;
            padding: 0.65rem 0.5rem !important;
            text-align: center !important;
            color: #ffffff !important;
            font-weight: 600 !important;
            font-size: 0.85rem !important;
            display: block !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.85rem !important;
            font-size: 0.8rem !important;
          }
          .footer-legal-links {
            gap: 1rem !important;
            flex-wrap: wrap !important;
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 600px) {
          .floating-wa-widget {
            bottom: 18px !important;
            right: 18px !important;
          }
          .floating-wa-pill {
            display: none !important;
          }
          .floating-wa-button {
            width: 50px !important;
            height: 50px !important;
          }
        }
      `}</style>
    </footer>
  );
}
