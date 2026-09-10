import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { getProjects, PORTFOLIO_CATEGORIES } from '../services/firestoreService';
import { ProjectCardSkeleton } from '../components/common/SkeletonLoader';
import WatermarkImage from '../components/common/WatermarkImage';
import ProjectCardMedia from '../components/common/ProjectCardMedia';
import { Analytics } from '../services/analyticsService';
import {
  Search,
  Filter,
  ExternalLink,
  ArrowRight,
  FolderGit2,
  CheckCircle2,
  SlidersHorizontal,
  X
} from 'lucide-react';

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialFeatured = searchParams.get('featured') === 'true';

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('all');
  const [featuredOnly, setFeaturedOnly] = useState(initialFeatured);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    Analytics.pageView('All Projects Gallery');
  }, []);

  // Update filter when query param changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const feat = searchParams.get('featured') === 'true';
    setSelectedCategory(cat);
    setFeaturedOnly(feat);
  }, [searchParams]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getProjects({ publishedOnly: true, maxResults: 100 });
      setProjects(data);
      setLoading(false);
    }
    load();
  }, []);

  // Extract all unique technologies from loaded projects for filter dropdown
  const allTechnologies = useMemo(() => {
    const set = new Set();
    projects.forEach(p => {
      if (Array.isArray(p.technologies)) {
        p.technologies.forEach(t => set.add(t));
      }
    });
    return Array.from(set).sort();
  }, [projects]);

  // Filter projects based on category, search, tech, and featured
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Featured match
      if (featuredOnly && !p.featured) {
        return false;
      }
      // Technology match
      if (selectedTech !== 'all' && (!p.technologies || !p.technologies.includes(selectedTech))) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = p.title?.toLowerCase().includes(query);
        const inDesc = p.shortDescription?.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query);
        const inTech = p.technologies?.some(t => t.toLowerCase().includes(query));
        const inIndustry = p.industry?.toLowerCase().includes(query);
        if (!inTitle && !inDesc && !inTech && !inIndustry) {
          return false;
        }
      }
      return true;
    });
  }, [projects, selectedCategory, featuredOnly, selectedTech, searchQuery]);

  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    if (catSlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catSlug);
    }
    setSearchParams(searchParams);
  };

  const handleFeaturedToggle = () => {
    const nextVal = !featuredOnly;
    setFeaturedOnly(nextVal);
    if (nextVal) {
      searchParams.set('featured', 'true');
    } else {
      searchParams.delete('featured');
    }
    setSearchParams(searchParams);
  };

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <div style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <SEO
        title="Project Showcase & Case Studies"
        description="Explore technical case studies of custom business software, websites, Razorpay payment integrations, WhatsApp APIs, and AI automations engineered by AASHA-SM Technologies Pvt Ltd."
      />

      <div className="container-custom">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <FolderGit2 size={14} /> Comprehensive Portfolio
          </div>
          <h1 className="projects-page-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Work & Digital Case Studies
          </h1>
          <p className="projects-page-desc" style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Browse through production systems, business portals, payment architectures, and automation pipelines engineered for real-world impact.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          className="glass-panel projects-filter-box"
          style={{
            padding: '1.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            borderRadius: '16px'
          }}
        >
          {/* Top Row: Search & Dropdowns */}
          <div className="projects-filter-top" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Live Search Input */}
            <div className="projects-search-wrapper" style={{ position: 'relative', flex: '1 1 280px' }}>
              <Search
                size={18}
                color="#64748b"
                style={{ position: 'absolute', top: '50%', left: '14px', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, technology, industry..."
                className="input-custom projects-search-input"
                style={{ paddingLeft: '2.6rem', width: '100%' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '12px',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Secondary Row on Mobile (Tech dropdown + Featured toggle) */}
            <div className="projects-filter-controls" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Technology Filter Dropdown */}
              <div style={{ minWidth: '160px', flex: '1 1 auto' }}>
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="input-custom projects-tech-select"
                  style={{ cursor: 'pointer', width: '100%' }}
                >
                  <option value="all">All Technologies ({allTechnologies.length})</option>
                  {allTechnologies.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Featured Only Toggle Button */}
              <button
                onClick={() => setFeaturedOnly(!featuredOnly)}
                className="projects-featured-toggle"
                style={{
                  background: featuredOnly ? 'var(--badge-tech-bg)' : 'transparent',
                  border: `1px solid ${featuredOnly ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                  color: featuredOnly ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: featuredOnly ? 'var(--accent-cyan)' : 'var(--text-dim)' }} />
                Featured Only
              </button>
            </div>
          </div>

          {/* Bottom Row: Dynamic Category Pills */}
          <div
            className="projects-category-bar"
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.25rem',
              scrollbarWidth: 'none'
            }}
          >
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className="projects-cat-pill"
                  style={{
                    whiteSpace: 'nowrap',
                    background: isSelected ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#111111' : '#9ca3af',
                    border: `1px solid ${isSelected ? 'transparent' : 'rgba(255, 255, 255, 0.08)'}`,
                    padding: '0.45rem 0.95rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <div>
            Showing <strong style={{ color: 'var(--text-main)' }}>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'solution' : 'solutions'}
          </div>
          {(selectedCategory !== 'all' || featuredOnly || selectedTech !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setFeaturedOnly(false);
                setSelectedTech('all');
                setSearchQuery('');
                setSearchParams({});
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-cyan)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div
          className="projects-gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          ) : displayedProjects.length === 0 ? (
            <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <FolderGit2 size={48} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem', opacity: 0.6 }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                No Projects Found
              </h3>
              <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                Try adjusting your search terms, changing the category filter, or resetting all filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setFeaturedOnly(false);
                  setSelectedTech('all');
                  setSearchQuery('');
                  setSearchParams({});
                }}
                className="btn-secondary"
                style={{ borderRadius: '10px' }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            displayedProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel-interactive projects-gallery-card"
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
                <div className="projects-gallery-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  
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
                    className="projects-gallery-actions"
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

        {/* Load More Button */}
        {filteredProjects.length > visibleCount && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="btn-secondary projects-load-more-btn"
              style={{ padding: '0.85rem 2rem', borderRadius: '10px' }}
            >
              Load More Projects ({filteredProjects.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-page-title {
            font-size: 1.85rem !important;
            line-height: 1.2 !important;
            margin-bottom: 0.75rem !important;
          }
          .projects-page-desc {
            font-size: 0.92rem !important;
            line-height: 1.55 !important;
          }
          .projects-filter-box {
            padding: 1.1rem 0.95rem !important;
            border-radius: 14px !important;
            gap: 0.85rem !important;
            margin-bottom: 2rem !important;
          }
          .projects-filter-top {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
          }
          .projects-search-wrapper {
            flex: 1 1 auto !important;
            width: 100% !important;
            position: relative !important;
            display: flex !important;
            align-items: center !important;
          }
          .projects-search-input {
            width: 100% !important;
            font-size: 0.88rem !important;
            padding-left: 2.6rem !important;
          }
          .projects-filter-controls {
            display: flex !important;
            width: 100% !important;
            gap: 0.5rem !important;
            align-items: center !important;
          }
          .projects-tech-select {
            font-size: 0.82rem !important;
            width: 100% !important;
            flex: 1 !important;
          }
          .projects-featured-toggle {
            font-size: 0.8rem !important;
            padding: 0.55rem 0.8rem !important;
            border-radius: 8px !important;
            flex-shrink: 0 !important;
          }
          .projects-category-bar {
            gap: 0.4rem !important;
            padding-bottom: 2px !important;
          }
          .projects-cat-pill {
            padding: 0.45rem 0.85rem !important;
            font-size: 0.78rem !important;
            border-radius: 8px !important;
          }
          .projects-gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            margin-bottom: 2.5rem !important;
          }
          .projects-gallery-card {
            border-radius: 14px !important;
          }
          .projects-gallery-body {
            padding: 1.15rem 1rem !important;
          }
          .projects-gallery-body h3 {
            font-size: 1.15rem !important;
          }
          .projects-gallery-actions {
            padding-top: 0.75rem !important;
          }
          .projects-load-more-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            border-radius: 10px !important;
            padding: 0.85rem 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
