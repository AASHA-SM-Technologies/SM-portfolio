import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import ThemeToggle from '../common/ThemeToggle';
import {
  Menu,
  X,
  Code2,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const lastClickTimeRef = React.useRef(0);
  const clickTimeoutRef = React.useRef(null);
  
  const { siteConfig, openInquiryModal } = useSite();
  const location = useLocation();
  const navigate = useNavigate();

  // Secret 5-Clicks on Logo to access Admin CMS
  const handleLogoClick = (e) => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 1200) {
      const newCount = logoClicks + 1;
      setLogoClicks(newCount);

      if (newCount >= 5) {
        e.preventDefault();
        setLogoClicks(0);
        navigate('/admin/login');
        return;
      }
    } else {
      setLogoClicks(1);
    }

    lastClickTimeRef.current = now;

    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      setLogoClicks(0);
    }, 2000);

    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'About', path: '/#about', isAnchor: true },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (link, e) => {
    if (link.isAnchor && location.pathname === '/') {
      e.preventDefault();
      const target = document.querySelector(link.path.replace('/', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className="navbar-header"
      style={{
        position: 'sticky',
        top: '1.25rem',
        zIndex: 1000,
        width: '100%',
        padding: '0 1rem',
        marginBottom: '2.5rem',
        pointerEvents: 'none'
      }}
    >
      {/* Floating Capsule Container with Theme Support & Sharp Border Line */}
      <div
        className="navbar-capsule"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'var(--bg-card-solid)',
          borderRadius: '12px',
          border: '1px solid var(--border-card-sharp)',
          boxShadow: 'var(--shadow-md)',
          padding: '0.55rem 0.95rem',
          minHeight: '66px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'auto',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Left: AASHA-SM Technologies Pvt Ltd Brand Logo Badge */}
        <Link
          to="/"
          onClick={handleLogoClick}
          title="AASHA-SM Technologies Pvt Ltd - Home"
          className="navbar-logo-badge"
          style={{
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-card-solid)',
            border: '1px solid var(--border-card-sharp)',
            borderRadius: '12px',
            padding: '0.35rem 0.85rem',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'all 0.2s ease',
            height: '46px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-card-sharp)';
          }}
        >
          <img
            src="/Asha%20SM%20Technologies.png"
            alt="Asha SM Technologies Logo"
            style={{
              height: '32px',
              width: 'auto',
              maxHeight: '34px',
              maxWidth: '150px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </Link>

        {/* Center: Desktop Navigation Links (Theme-Aware Typography) */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.45rem',
            padding: '0 0.5rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(link, e)}
                style={{
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-main)',
                  fontSize: '0.93rem',
                  fontWeight: isActive ? 700 : 600,
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  padding: '0.35rem 0'
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--accent-cyan)')}
                onMouseLeave={(e) => (e.target.style.color = isActive ? 'var(--accent-cyan)' : 'var(--text-main)')}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Theme Toggle + Start a Project CTA) */}
        <div className="navbar-right-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggle
            className="navbar-theme-toggle"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-card-sharp)',
              color: 'var(--text-main)',
              boxShadow: 'none'
            }}
          />

          <button
            onClick={() => openInquiryModal({ sourcePage: 'Capsule Navbar' })}
            className="desktop-start-btn"
            style={{
              background: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9px',
              padding: '0.62rem 1.35rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease',
              boxShadow: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#b91c1c';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#dc2626';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start Project
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-card-sharp)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
            className="mobile-toggle-btn"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            maxWidth: '900px',
            margin: '0.75rem auto 0',
            background: 'var(--bg-card-solid)',
            borderRadius: '16px',
            border: '1px solid var(--border-card-sharp)',
            padding: '1.25rem',
            pointerEvents: 'auto',
            animation: 'fadeIn 0.2s ease-out'
          }}
          className="mobile-menu-drawer"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  handleNavClick(link, e);
                  setMobileMenuOpen(false);
                }}
                style={{
                  color: location.pathname === link.path ? 'var(--accent-cyan)' : 'var(--text-main)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '0.5rem 0.5rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {link.name}
                <ArrowRight size={15} opacity={0.5} />
              </Link>
            ))}

            <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openInquiryModal({ sourcePage: 'Mobile Menu' });
                }}
                style={{
                  width: '100%',
                  background: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#b91c1c')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#dc2626')}
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Desktop Layout Rules - Strictly preserved */
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
          .mobile-menu-drawer {
            display: none !important;
          }
        }

        /* Mobile Layout Rules - Fluid, clean, square layout */
        @media (max-width: 959px) {
          .navbar-header {
            top: 0.75rem !important;
            padding: 0 0.75rem !important;
            margin-bottom: 1.5rem !important;
          }
          .navbar-capsule {
            min-height: 56px !important;
            padding: 0.35rem 0.65rem !important;
            border-radius: 12px !important;
          }
          .desktop-start-btn {
            display: none !important;
          }
          .navbar-right-actions {
            gap: 0.45rem !important;
          }
          .mobile-toggle-btn {
            width: 38px !important;
            height: 38px !important;
            border-radius: 8px !important;
          }
          .navbar-theme-toggle {
            border-radius: 8px !important;
          }
        }

        @media (max-width: 480px) {
          .navbar-header {
            padding: 0 0.5rem !important;
          }
          .navbar-logo-badge {
            padding: 0.35rem 0.65rem !important;
            gap: 0.45rem !important;
          }
          .navbar-logo-badge .logo-title {
            font-size: 0.82rem !important;
          }
          .navbar-logo-badge .logo-subtitle {
            font-size: 0.55rem !important;
          }
          .navbar-logo-icon {
            width: 26px !important;
            height: 26px !important;
          }
          .navbar-logo-icon svg {
            width: 14px !important;
            height: 14px !important;
          }
        }
      `}</style>
    </header>
  );
}
