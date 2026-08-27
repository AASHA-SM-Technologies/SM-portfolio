import React from 'react';

export function ProjectCardSkeleton() {
  return (
    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="skeleton" style={{ width: '100%', aspectRatio: '16/10', borderRadius: '10px' }} />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div className="skeleton" style={{ width: '80px', height: '22px', borderRadius: '6px' }} />
        <div className="skeleton" style={{ width: '60px', height: '22px', borderRadius: '6px' }} />
      </div>
      <div className="skeleton" style={{ width: '90%', height: '24px', borderRadius: '4px' }} />
      <div className="skeleton" style={{ width: '100%', height: '40px', borderRadius: '4px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem' }}>
        <div className="skeleton" style={{ width: '100px', height: '18px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ width: '90px', height: '32px', borderRadius: '20px' }} />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
      <div className="skeleton" style={{ width: '70%', height: '24px', borderRadius: '4px' }} />
      <div className="skeleton" style={{ width: '100%', height: '50px', borderRadius: '4px' }} />
      <div className="skeleton" style={{ width: '120px', height: '20px', borderRadius: '4px', marginTop: '0.5rem' }} />
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="skeleton" style={{ flex: 1, height: '24px', borderRadius: '4px' }} />
      ))}
    </div>
  );
}
