import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { getProjectById, getProjectBySlug } from '../services/firestoreService';
import WatermarkImage from '../components/common/WatermarkImage';
import { useSite } from '../context/SiteContext';
import { Analytics } from '../services/analyticsService';
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Award,
  TrendingUp,
  Clock,
  Building,
  Tag,
  MessageSquare,
  Play,
  Share2,
  ChevronRight,
  ShieldCheck,
  Globe,
  Maximize2,
  X,
  Lock
} from 'lucide-react';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const { openInquiryModal, siteConfig, showToast } = useSite();
  const navigate = useNavigate();

  const showcaseImages = [
    project?.imageData,
    ...(project?.galleryImages || []),
    ...(project?.images || [])
  ].filter(Boolean);

  useEffect(() => {
    if (showcaseImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveHeroSlide(prev => (prev + 1) % showcaseImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [showcaseImages.length]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        let data = await getProjectById(projectId);
        if (!data) {
          data = await getProjectBySlug(projectId);
        }
        setProject(data);
        if (data) {
          Analytics.projectView(data.id, data.title);
        }
      } catch (err) {
        console.error("Failed to load project detail:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [projectId]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project?.title || 'Case Study',
        text: project?.shortDescription || 'Check out this technical case study by Nexvora Technologies',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Case study link copied to clipboard!", "success");
    }
  };

  const whatsappInquiryUrl = () => {
    const phone = siteConfig?.whatsapp?.replace(/[^0-9]/g, '') || '919022410301';
    const text = encodeURIComponent(
      `Hello Nexvora Technologies, I was reviewing your case study "${project?.title || 'Project'}" on your website and would like to discuss a similar solution for my business.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  if (loading) {
    return (
      <div className="container-custom" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
        <div className="skeleton" style={{ width: '120px', height: '32px', borderRadius: '8px', marginBottom: '2rem' }} />
        <div className="skeleton" style={{ width: '70%', height: '48px', borderRadius: '8px', marginBottom: '1rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '420px', borderRadius: '16px', marginBottom: '2rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div className="skeleton" style={{ height: '300px', borderRadius: '12px' }} />
          <div className="skeleton" style={{ height: '300px', borderRadius: '12px' }} />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-custom" style={{ paddingTop: '6rem', paddingBottom: '8rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '540px', margin: '0 auto', padding: '3.5rem 2rem' }}>
          <AlertCircle size={48} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Case Study Not Found
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            The requested project or case study could not be located. It may have been updated or moved.
          </p>
          <Link to="/projects" className="btn-primary">
            <ArrowLeft size={16} /> Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  const cleanProjectDomain = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `preview.${project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.app`;

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
      <SEO
        title={`${project.title} - Technical Case Study`}
        description={project.shortDescription || project.description}
        image={project.imageData}
      />

      <div className="container-custom">
        
        {/* Navigation Breadcrumb Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <ArrowLeft size={16} /> Back to Projects Directory
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--btn-secondary-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.borderColor = 'var(--border-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              <Share2 size={14} /> Share Case Study
            </button>
          </div>
        </div>

        {/* Hero Header Presentation */}
        <div style={{ marginBottom: '2.5rem' }}>
          
          {/* Metadata Badges */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span
              style={{
                background: 'var(--badge-tech-bg)',
                border: '1px solid var(--border-glow)',
                color: 'var(--accent-cyan)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              {project.subCategory || project.category}
            </span>

            {project.industry && (
              <span
                style={{
                  background: 'var(--btn-secondary-bg)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Building size={13} color="var(--accent-cyan)" /> {project.industry}
              </span>
            )}

            {project.featured && (
              <span
                style={{
                  background: 'var(--badge-tech-bg)',
                  border: '1px solid var(--border-glow)',
                  color: 'var(--accent-cyan)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
                Featured Case Study
              </span>
            )}
          </div>

          {/* Project Title */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              fontWeight: 900,
              color: 'var(--text-main)',
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem'
            }}
          >
            {project.title}
          </h1>

          {/* Executive Subtitle */}
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '920px' }}>
            {project.shortDescription || project.description}
          </p>

          {/* Quick Action Buttons & Access Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}
              >
                <Globe size={16} /> Launch Live Project <ExternalLink size={14} />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem' }}
              >
                <Play size={16} /> Interactive Demo
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem' }}
              >
                <GithubIcon size={16} /> Source Repository
              </a>
            )}
          </div>
        </div>

        {/* 💻 macOS / Modern Browser Showcase Frame with Standard Compact Dimensions */}
        <div
          style={{
            maxWidth: '880px',
            margin: '0 auto 3.5rem',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1px solid var(--border-glow)',
            boxShadow: 'var(--shadow-glow), var(--shadow-md)',
            background: 'var(--bg-card-solid)',
            position: 'relative'
          }}
        >
          {/* macOS Browser Top Bar */}
          <div
            style={{
              padding: '0.7rem 1.1rem',
              background: 'var(--bg-card)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              userSelect: 'none'
            }}
          >
            {/* Window Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            </div>

            {/* Address Bar Pill */}
            <div
              style={{
                flex: '0 1 400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: 'var(--btn-secondary-bg)',
                border: '1px solid var(--border-subtle)',
                padding: '0.3rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              <Lock size={11} color="var(--accent-cyan)" />
              <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>https://{cleanProjectDomain}</span>
            </div>

            {/* Inspect / Zoom Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setLightboxImage(showcaseImages[activeHeroSlide] || project.imageData)}
                style={{
                  background: 'var(--btn-secondary-bg)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-main)';
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
                title="Open High-Resolution Fullscreen View"
              >
                <Maximize2 size={12} /> Zoom
              </button>
            </div>
          </div>

          {/* Multi-Image Auto-Rotating Showcase Area with Stage Dots */}
          <div
            style={{
              position: 'relative',
              background: 'var(--bg-main)',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '440px',
              overflow: 'hidden'
            }}
          >
            {showcaseImages.length === 0 ? (
              <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                No Preview Available
              </div>
            ) : (
              showcaseImages.map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(imgSrc)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    cursor: 'zoom-in',
                    opacity: idx === activeHeroSlide ? 1 : 0,
                    transition: 'opacity 0.75s ease-in-out',
                    pointerEvents: idx === activeHeroSlide ? 'auto' : 'none'
                  }}
                >
                  <WatermarkImage
                    src={imgSrc}
                    alt={`${project.title} - view ${idx + 1}`}
                    aspectRatio="16/9"
                    objectFit="contain"
                    ambientBackdrop={true}
                    showZoom={true}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 0
                    }}
                  />
                </div>
              ))
            )}

            {/* Vertical Red Stage Dots Indicator on Right Side */}
            {showcaseImages.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '14px',
                  transform: 'translateY(-50%)',
                  zIndex: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(8px)',
                  padding: '7px 5px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {showcaseImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHeroSlide(dotIdx);
                    }}
                    style={{
                      width: '6px',
                      height: dotIdx === activeHeroSlide ? '16px' : '6px',
                      borderRadius: dotIdx === activeHeroSlide ? '3px' : '50%',
                      background: dotIdx === activeHeroSlide ? '#ef4444' : 'rgba(255, 255, 255, 0.45)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: dotIdx === activeHeroSlide ? '0 0 8px rgba(239, 68, 68, 0.85)' : 'none'
                    }}
                    title={`Switch to image ${dotIdx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Executive Highlights KPI Banner */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem'
          }}
        >
          {[
            { label: "Deployment Architecture", val: project.category || "Full-Stack Web App", icon: Cpu, color: "var(--accent-cyan)" },
            { label: "Client Industry", val: project.industry || "Enterprise / Tech", icon: Building, color: "#38bdf8" },
            { label: "Direct Developer Role", val: "Lead Architecture & Build", icon: Award, color: "#f59e0b" },
            { label: "Source Code Ownership", val: "100% Client IP Transfer", icon: ShieldCheck, color: "#10b981" }
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-panel"
              style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'var(--badge-tech-bg)',
                  border: '1px solid var(--border-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                  flexShrink: 0
                }}
              >
                <stat.icon size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                  {stat.val}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive Case Study Content Grid (2 Columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start', marginBottom: '4.5rem' }}>
          
          {/* Left Column: Full Technical Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* The Problem / Challenge */}
            {project.problem && (
              <div className="glass-panel" style={{ padding: '2.25rem', borderLeft: '4px solid #f43f5e' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <AlertCircle size={22} /> The Business Challenge & Problem
                </h3>
                <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.75 }}>
                  {project.problem}
                </p>
              </div>
            )}

            {/* The Engineered Solution */}
            {project.solution && (
              <div className="glass-panel" style={{ padding: '2.25rem', borderLeft: '4px solid var(--accent-cyan)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <Layers size={22} /> The Engineered Solution & Architecture
                </h3>
                <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.75 }}>
                  {project.solution}
                </p>
              </div>
            )}

            {/* Technical Implementation Breakdown */}
            {project.technicalImplementation && (
              <div className="glass-panel" style={{ padding: '2.25rem', borderLeft: '4px solid #818cf8' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <Cpu size={22} /> Deep Technical Implementation
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {project.technicalImplementation}
                </p>
              </div>
            )}

            {/* Engineering Challenges Overcome */}
            {project.challenges && (
              <div className="glass-panel" style={{ padding: '2.25rem', borderLeft: '4px solid #f59e0b' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <Award size={22} /> Engineering Challenges Overcome
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.75 }}>
                  {project.challenges}
                </p>
              </div>
            )}

            {/* Measurable Results & Outcome */}
            {project.results && (
              <div className="glass-card-glow" style={{ padding: '2.25rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.35)', borderLeft: '4px solid #10b981' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <CheckCircle2 size={22} /> Quantifiable Business Outcome
                </h3>
                <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.75, fontWeight: 600 }}>
                  {project.results}
                </p>
              </div>
            )}

            {/* Video Walkthrough (if attached) */}
            {project.videoData && (
              <div className="glass-panel" style={{ padding: '2rem', overflow: 'hidden' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Play size={20} color="var(--accent-cyan)" /> Live Platform Video Walkthrough
                </h3>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-glow)', background: '#000' }}>
                  <video
                    src={project.videoData}
                    controls
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ width: '100%', maxHeight: '420px', display: 'block' }}
                  />
                </div>
              </div>
            )}

            {/* Gallery Screenshots Grid */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Project UI & System Screenshots
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Click any screenshot to zoom
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {project.galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.2s, border-color 0.2s'
                      }}
                      onClick={() => setLightboxImage(img)}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-cyan)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                    >
                      <WatermarkImage
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        aspectRatio="16/10"
                        objectFit="cover"
                        showZoom={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Specifications Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'sticky', top: '90px' }}>
            
            {/* Project Specifications Card */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <Tag size={18} color="var(--accent-cyan)" /> Project Specifications
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Primary Category</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{project.category || 'Web Application'}</span>
                </div>

                {project.subCategory && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Platform Type</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{project.subCategory}</span>
                  </div>
                )}

                {project.industry && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Target Industry</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{project.industry}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Deployment State</span>
                  <span style={{ fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} /> Production Ready
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Source Code Rights</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>100% Client IP</span>
                </div>
              </div>
            </div>

            {/* Core Features Checklist */}
            {project.features && project.features.length > 0 && (
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={18} color="var(--accent-cyan)" /> Key Features & Modules
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {project.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <CheckCircle2 size={16} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Used Grid */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Cpu size={18} color="var(--text-highlight)" /> Technology Stack
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="badge-tech" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nexvora Engineering Scope */}
            {project.contribution && project.contribution.length > 0 && (
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={18} color="#f59e0b" /> Nexvora Engineering Scope
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {project.contribution.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <ChevronRight size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* High-Converting Pre-Footer Banner */}
        <div
          className="glass-card-glow"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-card-solid)',
            border: '1px solid var(--border-glow)',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <TrendingUp size={14} /> Ready For Measurable Results?
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Have a Similar Business Requirement?
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            From high-conversion websites and custom ERP software to payment integrations and WhatsApp automations — let's build your digital competitive edge.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => openInquiryModal({
                projectId: project.id,
                projectTitle: project.title,
                requirementType: project.category || 'Website Development',
                sourcePage: `Project Bottom CTA: ${project.title}`
              })}
              className="btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
            >
              Start a Similar Project
            </button>

            <a
              href={whatsappInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
            >
              <MessageSquare size={16} /> Discuss on WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* 🔍 High-Resolution Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Close Lightbox Button */}
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10000,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
          >
            <X size={24} />
          </button>

          {/* Lightbox Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '85vh',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
            }}
          >
            <img
              src={lightboxImage}
              alt="Fullscreen Showcase Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
