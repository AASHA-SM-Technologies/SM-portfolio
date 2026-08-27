import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../services/firestoreService';
import { useSite } from '../../context/SiteContext';
import { ProjectCardSkeleton } from '../common/SkeletonLoader';
import WatermarkImage from '../common/WatermarkImage';
import ProjectCardMedia from '../common/ProjectCardMedia';
import {
  ExternalLink,
  ArrowRight,
  Code2,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { stats } = useSite();

  useEffect(() => {
    async function load() {
      const data = await getProjects({ featuredOnly: true, publishedOnly: true, maxResults: 10 });
      // Strictly show top 3 on home page
      setProjects(data.slice(0, 3));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section id="featured-projects" style={{ padding: '3.5rem 0', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="featured-projects-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <FolderGit2 size={14} /> Proven Track Record
            </div>
            <h2 className="featured-projects-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Featured Case Studies & Work
            </h2>
            <p className="featured-projects-desc" style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem', maxWidth: '600px' }}>
              Real-world systems, automated pipelines, payment gateways, and custom business applications built from concept to production.
            </p>
          </div>

          <Link to="/projects" className="btn-secondary featured-header-btn" style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', borderRadius: '10px' }}>
            View All Projects {stats?.projectsCompleted ? `(${stats.projectsCompleted}+)` : ''} <ArrowRight size={16} />
          </Link>
        </div>

        {/* Projects Grid */}
        <div
          className="home-projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          ) : projects.length === 0 ? (
            <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <FolderGit2 size={40} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Featured Projects Yet</h3>
              <p>Projects marked as featured in the Admin CMS will automatically show here.</p>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="glass-panel-interactive featured-project-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-card-sharp)',
                  background: 'var(--bg-card)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Multi-Image Auto-Rotating Showcase with Stage Dots */}
                <ProjectCardMedia
                  images={[project.imageData, ...(project.galleryImages || []), ...(project.images || [])].filter(Boolean)}
                  title={project.title}
                  projectId={project.id}
                  featured={project.featured}
                  aspectRatio="16/10"
                />

                {/* Project Details */}
                <div className="featured-project-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  
                  {/* Category & Industry Metadata Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span
                      style={{
                        background: 'var(--badge-tech-bg)',
                        border: '1px solid var(--border-glow)',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '5px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em'
                      }}
                    >
                      {project.category || 'Web Application'}
                    </span>
                    {project.industry && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        • {project.industry}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                    <Link
                      to={`/projects/${project.id}`}
                      style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.target.style.color = 'var(--accent-cyan)')}
                      onMouseLeave={(e) => (e.target.style.color = 'var(--text-main)')}
                    >
                      {project.title}
                    </Link>
                  </h3>

                  {/* Short Description (Cleanly Clamped to 3 lines) */}
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flex: 1
                    }}
                  >
                    {project.shortDescription || project.description}
                  </p>

                  {/* Technology Tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: 'var(--btn-secondary-bg)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-muted)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '5px'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span
                          style={{
                            background: 'var(--btn-secondary-bg)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-muted)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.45rem',
                            borderRadius: '5px'
                          }}
                        >
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Card Actions */}
                  <div
                    className="featured-project-actions"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.9rem',
                      borderTop: '1px solid var(--border-subtle)',
                      marginTop: 'auto'
                    }}
                  >
                    <Link
                      to={`/projects/${project.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'gap 0.2s'
                      }}
                    >
                      View Case Study <ArrowRight size={14} />
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          color: 'var(--text-muted)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '6px',
                          background: 'var(--btn-secondary-bg)',
                          border: '1px solid var(--border-subtle)',
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
                        Live Demo <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-projects-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.15rem !important;
            margin-bottom: 2rem !important;
          }
          .featured-projects-title {
            font-size: 1.65rem !important;
            line-height: 1.25 !important;
          }
          .featured-projects-desc {
            font-size: 0.92rem !important;
            line-height: 1.6 !important;
          }
          .featured-header-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 0.75rem 1rem !important;
            border-radius: 10px !important;
            font-size: 0.88rem !important;
          }
          .home-projects-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .featured-project-card {
            border-radius: 14px !important;
          }
          .featured-project-body {
            padding: 1.15rem 1rem !important;
          }
          .featured-project-body h3 {
            font-size: 1.15rem !important;
          }
          .featured-project-actions {
            padding-top: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
