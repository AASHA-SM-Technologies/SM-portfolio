import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, updateProject, deleteProject, PORTFOLIO_CATEGORIES } from '../services/firestoreService';
import { useSite } from '../context/SiteContext';
import WatermarkImage from '../components/common/WatermarkImage';
import {
  FolderGit2,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Star,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowUpDown
} from 'lucide-react';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteModal, setDeleteModal] = useState(null); // project object to delete
  const { showToast } = useSite();

  const loadProjects = async () => {
    setLoading(true);
    const data = await getProjects({ publishedOnly: false, maxResults: 200 });
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleToggleFeatured = async (project) => {
    const nextVal = !project.featured;
    try {
      await updateProject(project.id, { featured: nextVal });
      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, featured: nextVal } : p));
      showToast(`Project marked as ${nextVal ? 'Featured' : 'Unfeatured'}.`, 'success');
    } catch (err) {
      showToast("Failed to update project status.", "error");
    }
  };

  const handleTogglePublished = async (project) => {
    const nextVal = !project.published;
    try {
      await updateProject(project.id, { published: nextVal });
      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, published: nextVal } : p));
      showToast(`Project is now ${nextVal ? 'Published' : 'Hidden/Draft'}.`, 'success');
    } catch (err) {
      showToast("Failed to update publication status.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      await deleteProject(deleteModal.id);
      setProjects(prev => prev.filter(p => p.id !== deleteModal.id));
      showToast(`Project "${deleteModal.title}" deleted.`, 'success');
      setDeleteModal(null);
    } catch (err) {
      showToast("Failed to delete project.", "error");
    }
  };

  const filteredProjects = projects.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title?.toLowerCase().includes(q) || p.shortDescription?.toLowerCase().includes(q) || p.industry?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Projects & Case Studies Manager
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Manage portfolio showcases, compressed Base64 media, case studies, and live links.
          </p>
        </div>

        <Link to="/admin/projects/new" className="btn-primary" style={{ padding: '0.7rem 1.4rem' }}>
          <Plus size={16} /> Create New Project
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: '1 1 260px' }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="input-custom"
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        <div style={{ minWidth: '200px' }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-custom"
            style={{ cursor: 'pointer' }}
          >
            {PORTFOLIO_CATEGORIES.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            Loading projects from Firestore...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#94a3b8' }}>
            <FolderGit2 size={40} color="#00f2fe" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '0.5rem' }}>No Projects Found</h3>
            <p style={{ marginBottom: '1.5rem' }}>Create your first project case study to showcase on your portfolio.</p>
            <Link to="/admin/projects/new" className="btn-primary">
              <Plus size={16} /> Add First Project
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left', color: '#94a3b8' }}>
                  <th style={{ padding: '1rem', width: '80px' }}>Media</th>
                  <th style={{ padding: '1rem' }}>Project Title & Industry</th>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Featured</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Published</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Order</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ width: '60px', height: '40px', borderRadius: '6px', overflow: 'hidden' }}>
                        <WatermarkImage src={p.imageData} alt={p.title} aspectRatio="3/2" showWatermark={false} />
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>
                        {p.industry || 'General Solution'}
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', color: '#cbd5e1' }}>
                      <span className="badge-tech" style={{ fontSize: '0.72rem' }}>
                        {p.subCategory || p.category}
                      </span>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        style={{
                          background: p.featured ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          border: `1px solid ${p.featured ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)'}`,
                          color: p.featured ? '#f59e0b' : '#64748b',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <Star size={12} fill={p.featured ? 'currentColor' : 'none'} /> {p.featured ? 'Yes' : 'No'}
                      </button>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => handleTogglePublished(p)}
                        style={{
                          background: p.published ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                          border: `1px solid ${p.published ? '#10b981' : '#f43f5e'}`,
                          color: p.published ? '#10b981' : '#fb7185',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        {p.published ? 'Public' : 'Draft'}
                      </button>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>
                      {p.sortOrder || 0}
                    </td>

                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <Link
                          to={`/projects/${p.id}`}
                          target="_blank"
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.6rem', borderRadius: '6px' }}
                          title="Preview Public Page"
                        >
                          <Eye size={14} />
                        </Link>

                        <Link
                          to={`/admin/projects/edit/${p.id}`}
                          style={{
                            background: 'rgba(0, 242, 254, 0.12)',
                            border: '1px solid rgba(0, 242, 254, 0.3)',
                            color: '#00f2fe',
                            padding: '0.35rem 0.6rem',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none'
                          }}
                          title="Edit Case Study"
                        >
                          <Edit2 size={14} />
                        </Link>

                        <button
                          onClick={() => setDeleteModal(p)}
                          style={{
                            background: 'rgba(244, 63, 94, 0.1)',
                            border: '1px solid rgba(244, 63, 94, 0.3)',
                            color: '#fb7185',
                            padding: '0.35rem 0.6rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <AlertTriangle size={26} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
                Delete Project?
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                Are you sure you want to permanently delete <strong>"{deleteModal.title}"</strong>? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setDeleteModal(null)}
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1.25rem' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    background: '#f43f5e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '0.6rem 1.4rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
