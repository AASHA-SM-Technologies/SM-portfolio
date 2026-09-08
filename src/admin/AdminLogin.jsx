import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import SEO from '../components/common/SEO';
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
  const [showSetupOption, setShowSetupOption] = useState(false);
  const [shieldClicks, setShieldClicks] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const lastShieldClickRef = React.useRef(0);
  const shieldTimerRef = React.useRef(null);
  
  const { login, setupAdminAccount } = useAuth();
  const { showToast } = useSite();
  const navigate = useNavigate();

  // Secret 5-Clicks on Shield Icon to Reveal Setup Initializer
  const handleShieldClick = () => {
    const now = Date.now();
    if (now - lastShieldClickRef.current < 1200) {
      const nextCount = shieldClicks + 1;
      setShieldClicks(nextCount);

      if (nextCount >= 5) {
        setShowSetupOption(true);
        setIsFirstTimeSetup(true);
        setShieldClicks(0);
        showToast("Setup Initializer Unlocked", "info", 3000);
        return;
      }
    } else {
      setShieldClicks(1);
    }

    lastShieldClickRef.current = now;

    clearTimeout(shieldTimerRef.current);
    shieldTimerRef.current = setTimeout(() => {
      setShieldClicks(0);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setSubmitting(true);
    try {
      if (isFirstTimeSetup) {
        await setupAdminAccount(email.trim(), password);
        showToast("Admin account initialized successfully! Welcome to your CMS.", "success");
      } else {
        await login(email.trim(), password);
        showToast("Signed in as Administrator.", "success");
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="admin-login-wrapper"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        background: 'var(--bg-main)'
      }}
    >
      <SEO title="Admin CMS Login" description="Secure administrator portal for Nexvora Technologies CMS." />

      <div
        className="glass-card admin-login-card"
        style={{
          maxWidth: '450px',
          width: '100%',
          padding: '2.5rem 2.25rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card-sharp)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Card Header & Brand Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            onClick={handleShieldClick}
            title="Secure CMS Access (Tap 5x for Setup)"
            className="admin-logo-wrapper"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.15rem',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src="/Nexvora_Logo_Transparent.png"
              alt="Nexvora"
              style={{
                height: '38px',
                width: 'auto',
                maxWidth: '170px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          <div
            className="admin-login-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--accent-cyan)',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              background: 'var(--badge-tech-bg)',
              border: '1px solid var(--border-glow)',
              padding: '0.25rem 0.65rem',
              borderRadius: '6px'
            }}
          >
            <ShieldCheck size={13} /> {isFirstTimeSetup ? 'Initial Setup' : 'Secure Admin Session'}
          </div>

          <h1
            className="admin-login-title"
            style={{
              fontSize: '1.55rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              marginBottom: '0.35rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            {isFirstTimeSetup ? 'Initialize Admin Account' : 'CMS Administrator Portal'}
          </h1>
          
          <p
            className="admin-login-sub"
            style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.45, maxWidth: '340px', margin: '0 auto' }}
          >
            {isFirstTimeSetup
              ? 'Create or link your primary administrator profile in Firebase'
              : 'Sign in with authorized administrator credentials to manage your portfolio'}
          </p>
        </div>

        {/* Error Notification Banner */}
        {error && (
          <div
            style={{
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: '#fb7185',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              fontSize: '0.84rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        {/* Standard Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label className="label-custom" style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}>
              <Mail size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              Admin Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nexvora.com"
                className="input-custom"
                style={{ padding: '0.75rem 0.95rem', fontSize: '0.9rem', width: '100%' }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="label-custom" style={{ fontSize: '0.82rem', margin: 0 }}>
                <Lock size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                Password
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-custom"
                style={{ padding: '0.75rem 2.75rem 0.75rem 0.95rem', fontSize: '0.9rem', width: '100%' }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '12px',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: '10px',
              marginTop: '0.35rem',
              opacity: submitting ? 0.7 : 1,
              justifyContent: 'center'
            }}
          >
            {submitting ? (
              'Authenticating...'
            ) : isFirstTimeSetup ? (
              <>
                <KeyRound size={16} /> Create & Setup Admin
              </>
            ) : (
              <>
                Sign In to Dashboard <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Secret Setup Toggle (Only visible after clicking Shield icon 5 times) */}
        {showSetupOption && (
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => {
                setIsFirstTimeSetup(!isFirstTimeSetup);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-cyan)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <KeyRound size={14} />
              {isFirstTimeSetup
                ? '← Switch back to Admin Sign In'
                : 'Initialize primary admin profile'}
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <Link
            to="/"
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            ← Return to Public Portfolio
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-login-wrapper {
            padding: 2rem 1rem !important;
            min-height: 100vh !important;
          }
          .admin-login-card {
            padding: 1.75rem 1.25rem !important;
            border-radius: 14px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
          }
          .admin-shield-icon {
            width: 48px !important;
            height: 48px !important;
            margin-bottom: 0.85rem !important;
            border-radius: 12px !important;
          }
          .admin-shield-icon svg {
            width: 24px !important;
            height: 24px !important;
          }
          .admin-login-badge {
            font-size: 0.7rem !important;
            padding: 0.2rem 0.55rem !important;
            margin-bottom: 0.4rem !important;
          }
          .admin-login-title {
            font-size: 1.35rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.25rem !important;
          }
          .admin-login-sub {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>
    </div>
  );
}
