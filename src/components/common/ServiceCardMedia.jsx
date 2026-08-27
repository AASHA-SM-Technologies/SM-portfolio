import React, { useState, useEffect } from 'react';

export default function ServiceCardMedia({ images = [], fallbackBg, icon: Icon, isHovered }) {
  const mediaList = Array.isArray(images) ? images.filter(Boolean) : [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mediaList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaList.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [mediaList.length]);

  if (mediaList.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: fallbackBg || '#0d131f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ opacity: 0.2, transform: 'scale(2)' }}>
          {Icon && <Icon size={96} color="#ffffff" />}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0d131f' }}>
      {/* Images with Smooth Cross-fade */}
      {mediaList.map((imgSrc, idx) => (
        <img
          key={idx}
          src={imgSrc}
          alt={`Slide ${idx + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            opacity: idx === activeIndex ? 1 : 0,
            transition: 'opacity 0.75s ease-in-out',
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Stage Dots for Multiple Images (Vertically Centered on the Side) */}
      {mediaList.length > 1 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '12px',
            transform: 'translateY(-50%)',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(8px)',
            padding: '6px 4px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            opacity: isHovered ? 0 : 1,
            visibility: isHovered ? 'hidden' : 'visible',
            transition: 'opacity 0.2s ease'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {mediaList.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setActiveIndex(dotIdx)}
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
