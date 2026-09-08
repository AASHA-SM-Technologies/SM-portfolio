import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import Toast from '../components/common/Toast';
import ThemeToggle from '../components/common/ThemeToggle';
import {
  LayoutDashboard,
  FolderGit2,
  Layers,
  Cpu,
  Quote,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  Plus
} from 'lucide-react';

export default function AdminLayout() {
  const { currentUser, isAdmin, loading, logout } = useAuth();
  const { showToast } = useSite();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111111', color: '#00f2fe' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 1rem' }} />
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Verifying Administrator Permissions...</div>
        </div>
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Projects CMS', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Services', path: '/admin/services', icon: Layers },
    { name: 'Skills & Tech', path: '/admin/skills', icon: Cpu },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Quote },
    { name: 'Inquiries CRM', path: '/admin/inquiries', icon: Inbox },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      showToast("Logged out successfully.", "info");
      navigate('/admin/login');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      
      {/* Desktop Sidebar */}
      <aside
        style={{
          width: '260px',
          background: 'var(--bg-card-solid)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 50
        }}
        className="admin-sidebar"
      >
        <div>
          {/* Brand Header */}
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img
              src="/Nexvora_Logo_Transparent.png"
              alt="Nexvora Logo"
              style={{
                height: '28px',
                width: 'auto',
                maxWidth: '135px',
                objectFit: 'contain'
              }}
            />
            <span style={{ fontSize: '0.68rem', background: 'var(--badge-tech-bg)', border: '1px solid var(--border-glow)', color: 'var(--accent-cyan)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
              CMS
            </span>
          </div>

          {/* Quick Action Button */}
          <div style={{ padding: '1rem 1.25rem 0.5rem' }}>
            <Link
              to="/admin/projects/new"
              className="btn-primary"
              style={{ width: '100%', padding: '0.6rem 1rem', fontSize: '0.82rem', borderRadius: '8px', textDecoration: 'none' }}
            >
              <Plus size={15} /> Add New Project
            </Link>
          </div>

          {/* Nav List */}
          <nav style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.7rem 1rem',
                    borderRadius: '8px',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    background: isActive ? 'var(--gradient-primary)' : 'transparent',
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    transition: 'all 0.15s'
                  }}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Current Admin */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--badge-tech-bg)', border: '1px solid var(--border-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.9rem' }}>
              {currentUser?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {currentUser?.displayName || 'Nexvora Admin'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {currentUser?.email}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.6rem',
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              color: '#fb7185',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.82rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)')}
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Navbar */}
        <header
          style={{
            height: '64px',
            background: 'var(--bg-navbar)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            backdropFilter: 'blur(12px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="admin-mobile-toggle"
              style={{
                background: 'var(--btn-secondary-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                padding: '6px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'none'
              }}
            >
              {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
              Management Console
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ThemeToggle />

            <Link
              to="/"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--accent-cyan)',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Live Portfolio <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Page View Body */}
        <main style={{ flex: 1, padding: '2rem 1.5rem', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>

      <Toast />

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            display: ${mobileSidebarOpen ? 'flex' : 'none'} !important;
            position: fixed !important;
            left: 0;
            top: 0;
            bottom: 0;
            width: 260px;
            z-index: 1000;
          }
          .admin-mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
