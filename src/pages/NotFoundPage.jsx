import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import SEO from '../components/common/SEO';

export default function NotFoundPage() {
  return (
    <div style={{ padding: '8rem 0', textAlign: 'center' }}>
      <SEO title="Page Not Found (404)" description="The page you are looking for does not exist." />
      <div className="container-custom">
        <div className="glass-panel" style={{ maxWidth: '520px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div
            className="text-gradient"
            style={{ fontSize: '5rem', fontWeight: 800, lineHeight: 1, marginBottom: '1rem' }}
          >
            404
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem' }}>
            Page Not Found
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            The link you followed may be broken or the page may have been moved.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-primary">
              <Home size={16} /> Return Home
            </Link>
            <Link to="/projects" className="btn-secondary">
              <Compass size={16} /> Explore Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
