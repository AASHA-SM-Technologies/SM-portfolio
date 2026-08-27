import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';

export default function WatermarkImage({
  src,
  alt = 'Portfolio Project',
  className = '',
  aspectRatio = '16/9',
  objectFit = 'cover',
  ambientBackdrop = false,
  style = {},
  showWatermark = false,
  showZoom = false,
  onClick = null
}) {
  const { siteConfig } = useSite();
  const watermarkConfig = siteConfig?.watermark || {
    enabled: true,
    text: 'Aditya Jamdade',
    position: 'bottom-right',
    opacity: 0.3,
    fontSize: 13
  };

  const getPositionStyles = (pos) => {
    switch (pos) {
      case 'top-left':
        return { top: '12px', left: '12px' };
      case 'top-right':
        return { top: '12px', right: '12px' };
      case 'bottom-left':
        return { bottom: '12px', left: '12px' };
      case 'center':
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      case 'bottom-right':
      default:
        return { bottom: '12px', right: '12px' };
    }
  };

  if (!src) {
    return (
      <div
        className={className}
        style={{
          aspectRatio,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          userSelect: 'none',
          ...style
        }}
      >
        <ImageIcon size={32} opacity={0.6} />
        <span style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>PREVIEW COMING SOON</span>
      </div>
    );
  }

  return (
    <div
      className={`watermark-img-wrapper ${className}`}
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: aspectRatio || 'auto',
        borderRadius: '12px',
        userSelect: 'none',
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: 'var(--bg-card-solid)',
        ...style
      }}
    >
      {/* Optional Ambient Blurred Background for Contain mode */}
      {ambientBackdrop && (
        <div
          style={{
            position: 'absolute',
            inset: '-10px',
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px) brightness(0.4)',
            opacity: 0.6,
            transform: 'scale(1.1)',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          objectPosition: 'center',
          display: 'block',
          position: 'relative',
          zIndex: 2,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />

      {/* Zoom Hover Indicator */}
      {showZoom && (
        <div
          className="zoom-hover-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid var(--border-glow)',
              backdropFilter: 'blur(8px)',
              color: 'var(--accent-cyan)',
              padding: '0.45rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
            }}
          >
            <ZoomIn size={14} /> Click to View High-Res
          </div>
        </div>
      )}

      {/* Watermark Overlay (Only if explicitly enabled and not pre-watermarked) */}
      {showWatermark && watermarkConfig.enabled && watermarkConfig.showDomOverlay && (
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            userSelect: 'none',
            fontSize: `${watermarkConfig.fontSize || 13}px`,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: `rgba(255, 255, 255, ${watermarkConfig.opacity || 0.35})`,
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
            zIndex: 5,
            ...getPositionStyles(watermarkConfig.position)
          }}
        >
          {watermarkConfig.text || 'Aditya Jamdade'}
        </div>
      )}

      {/* Subtle Gradient Shadow (only in cover mode) */}
      {objectFit === 'cover' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7, 9, 14, 0.4) 0%, transparent 40%)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />
      )}

      <style>{`
        .watermark-img-wrapper:hover .zoom-hover-overlay {
          opacity: 1 !important;
        }
        .watermark-img-wrapper:hover img {
          transform: ${onClick ? 'scale(1.02)' : 'none'};
        }
      `}</style>
    </div>
  );
}
