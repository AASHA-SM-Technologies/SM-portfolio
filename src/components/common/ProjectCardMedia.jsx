import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCardMedia({
  images = [],
  title = '',
  projectId = '',
  featured = false,
  aspectRatio = '16/10'
}) {
  const mediaList = Array.isArray(images) ? images.filter(Boolean) : [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mediaList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaList.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [mediaList.length]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxHeight: '220px',
        aspectRatio: aspectRatio,
        background: 'var(--bg-main)',
        overflow: 'hidden'
      }}
    >
      {/* Clickable Image Layer Linking to Case Study */}
      <Link
        to={`/projects/${projectId}`}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          textDecoration: 'none',
          position: 'relative'
        }}
      >
        {mediaList.length === 0 ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(0, 196, 214, 0.1) 0%, rgba(59, 130, 246, 0.15) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-dim)',
              fontSize: '0.82rem'
            }}
          >
            No Preview Available
          </div>
        ) : (
          mediaList.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`${title} - slide ${idx + 1}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                opacity: idx === activeIndex ? 1 : 0,
                transition: 'opacity 0.75s ease-in-out',
                pointerEvents: 'none'
              }}
            />
          ))
        )}
      </Link>

      {/* Top-Right: Featured Badge */}
      {featured && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 6,
            background: 'rgba(245, 158, 11, 0.95)',
            color: '#ffffff',
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            pointerEvents: 'none'
          }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
          FEATURED
        </div>
      )}

      {/* Stage Dots for Multiple Project Images (Vertically Centered on Right Side) */}
      {mediaList.length > 1 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            zIndex: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(8px)',
            padding: '6px 4px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {mediaList.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveIndex(dotIdx);
              }}
              style={{
                width: '5px',
                height: dotIdx === activeIndex ? '14px' : '5px',
                borderRadius: dotIdx === activeIndex ? '3px' : '50%',
                background: dotIdx === activeIndex ? '#ef4444' : 'rgba(255, 255, 255, 0.45)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: dotIdx === activeIndex ? '0 0 8px rgba(239, 68, 68, 0.85)' : 'none'
              }}
              title={`Switch to image ${dotIdx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
