import React, { useEffect, useState } from 'react';
import { getTestimonials } from '../../services/firestoreService';
import {
  Star,
  Quote,
  CheckCircle2,
  Building2
} from 'lucide-react';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getTestimonials(true);
      setTestimonials(data);
      setLoading(false);
    }
    load();
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section style={{ padding: '3.5rem 0', background: 'var(--bg-section-alt)', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <Quote size={14} /> Client Trust & Feedback
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            What Founders & Businesses Say
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            Direct feedback from business owners, healthcare directors, and startups who rely on my technical solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          className="testimonials-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-panel skeleton" style={{ height: '240px' }} />
            ))
          ) : (
            testimonials.map((t) => (
              <div
                key={t.id}
                className="glass-panel-interactive"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {Array.from({ length: t.rating || 5 }).map((_, r) => (
                        <Star key={r} size={16} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <Quote size={24} color="var(--accent-cyan)" opacity={0.3} />
                  </div>

                  {/* Message */}
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                    "{t.message}"
                  </p>
                </div>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  {t.imageData ? (
                    <img
                      src={t.imageData}
                      alt={t.clientName}
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--accent-cyan)' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'var(--badge-tech-bg)',
                        border: '1px solid var(--border-glow)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-cyan)',
                        fontWeight: 700,
                        fontSize: '1.1rem'
                      }}
                    >
                      {t.clientName?.charAt(0) || 'C'}
                    </div>
                  )}

                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                      {t.clientName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Building2 size={12} color="var(--accent-cyan)" />
                      {t.designation ? `${t.designation}, ` : ''}{t.businessName}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
