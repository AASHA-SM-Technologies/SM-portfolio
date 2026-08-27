import React, { useEffect, useState } from 'react';
import { getServices, createService, updateService, deleteService, PORTFOLIO_CATEGORIES } from '../services/firestoreService';
import { compressImage, formatBytes, getBase64SizeInBytes } from '../utils/mediaCompressor';
import { useSite } from '../context/SiteContext';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Globe,
  CreditCard,
  MessageSquare,
  Cpu,
  MapPin,
  LifeBuoy,
  Package,
  Zap,
  Code2,
  X,
  Save,
  CheckCircle2,
  UploadCloud,
  Image as ImageIcon
} from 'lucide-react';

const AVAILABLE_ICONS = ['Globe', 'Layers', 'CreditCard', 'MessageSquare', 'Cpu', 'MapPin', 'LifeBuoy', 'Package', 'Zap', 'Code2'];

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'websites',
    description: '',
    images: [],
    imageData: '',
    highlights: ['', '', ''],
    icon: 'Globe',
    sortOrder: 0,
    enabled: true
  });
  const [saving, setSaving] = useState(false);
  const { showToast, siteConfig } = useSite();

  const loadData = async () => {
    setLoading(true);
    const data = await getServices(false);
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      category: 'websites',
      description: '',
      images: [],
      imageData: '',
      highlights: [
        'Direct developer communication with zero middlemen',
        '100% full source code ownership & complete IP transfer',
        'Production deployment, DNS/SSL setup & warranty'
      ],
      icon: 'Globe',
      sortOrder: services.length + 1,
      enabled: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingService(s);
    const existingImages = Array.isArray(s.images) && s.images.length > 0
      ? s.images
      : (s.imageData ? [s.imageData] : []);

    setFormData({
      title: s.title || '',
      slug: s.slug || '',
      category: s.category || 'websites',
      description: s.description || '',
      images: existingImages,
      imageData: existingImages[0] || '',
      highlights: s.highlights && s.highlights.length > 0 ? s.highlights : [
        'Direct developer communication with zero middlemen',
        '100% full source code ownership & complete IP transfer',
        'Production deployment, DNS/SSL setup & warranty'
      ],
      icon: s.icon || 'Globe',
      sortOrder: s.sortOrder || 0,
      enabled: s.enabled !== undefined ? s.enabled : true
    });

    setModalOpen(true);
  };

  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    showToast(`Optimizing ${files.length} image(s) to WebP...`, "info", 2000);
    try {
      const compressedList = [];
      for (const file of files) {
        const result = await compressImage(file, {
          maxWidth: 1000,
          maxHeight: 1200,
          quality: 0.82,
          watermark: siteConfig?.watermark
        });
        compressedList.push(result.dataUrl);
      }

      setFormData(prev => {
        const nextImages = [...(prev.images || []), ...compressedList];
        return {
          ...prev,
          images: nextImages,
          imageData: nextImages[0] || ''
        };
      });
      showToast(`Added ${files.length} image(s) successfully.`, "success");
    } catch (err) {
      showToast(err.message || 'Image processing failed.', 'error');
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => {
      const updated = prev.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated,
        imageData: updated[0] || ''
      };
    });
  };

  const handleHighlightChange = (index, value) => {
    setFormData(prev => {
      const arr = [...prev.highlights];
      arr[index] = value;
      return { ...prev, highlights: arr };
    });
  };

  const handleAddHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const handleRemoveHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
      showToast("Service deleted.", "success");
    } catch (err) {
      showToast("Failed to delete service.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    try {
      const cleanHighlights = formData.highlights.filter(h => h.trim().length > 0);
      const imagesList = Array.isArray(formData.images) ? formData.images : [];
      const payload = {
        ...formData,
        images: imagesList,
        imageData: imagesList[0] || '',
        highlights: cleanHighlights,
        sortOrder: Number(formData.sortOrder) || 0
      };

      if (editingService) {
        await updateService(editingService.id, payload);
        showToast("Service updated successfully.", "success");
      } else {
        await createService(payload);
        showToast("New service created successfully.", "success");
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      showToast("Failed to save service.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Services & Solutions CMS
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage the digital capabilities, multiple rotating cover images, and solution offerings displayed across the portfolio.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ padding: '0.7rem 1.4rem' }}>
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {/* Services Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading services from Firestore...
          </div>
        ) : services.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Layers size={40} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Services Configured</h3>
            <p style={{ marginBottom: '1.5rem' }}>Click the button below to add your first service offering.</p>
            <button onClick={handleOpenAdd} className="btn-primary">
              <Plus size={16} /> Add First Service
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--btn-secondary-bg)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem' }}>Images</th>
                  <th style={{ padding: '1rem' }}>Service Title</th>
                  <th style={{ padding: '1rem' }}>Linked Category</th>
                  <th style={{ padding: '1rem' }}>Description</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Sort Order</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => {
                  const imageCount = (s.images && s.images.length > 0) ? s.images.length : (s.imageData ? 1 : 0);
                  const firstImg = (s.images && s.images[0]) || s.imageData;

                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1rem' }}>
                        {firstImg ? (
                          <div style={{ position: 'relative', width: '64px', height: '44px' }}>
                            <img
                              src={firstImg}
                              alt={s.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}
                            />
                            {imageCount > 1 && (
                              <span
                                style={{
                                  position: 'absolute',
                                  bottom: '-4px',
                                  right: '-4px',
                                  background: 'var(--accent-cyan)',
                                  color: '#000',
                                  fontSize: '0.62rem',
                                  fontWeight: 800,
                                  padding: '1px 5px',
                                  borderRadius: '10px'
                                }}
                              >
                                +{imageCount}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div style={{ width: '64px', height: '44px', borderRadius: '6px', background: 'var(--btn-secondary-bg)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                            No Img
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        <div>{s.title}</div>
                        <span className="badge-tech" style={{ fontSize: '0.68rem', marginTop: '0.25rem' }}>{s.icon || 'Globe'}</span>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--accent-cyan)' }}>
                        {s.category}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.82rem', maxWidth: '260px' }}>
                        {s.description}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {s.sortOrder || 0}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: s.enabled ? '#10b981' : '#f43f5e',
                            background: s.enabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '4px'
                          }}
                        >
                          {s.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleOpenEdit(s)}
                            style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--accent-cyan)', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
                            style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fb7185', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '660px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {editingService ? 'Edit Service Offering' : 'Add New Service Offering'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label className="label-custom">Service Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Website Development"
                  className="input-custom"
                  required
                />
              </div>

              {/* Multiple Images Upload & Gallery */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label className="label-custom" style={{ margin: 0 }}>
                    Card Cover Images (Multiple Supported • Auto-Slides)
                  </label>
                  {formData.images && formData.images.length > 0 && (
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                      {formData.images.length} Image(s) Attached
                    </span>
                  )}
                </div>

                {/* Uploaded Thumbnails Grid */}
                {formData.images && formData.images.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.65rem', marginBottom: '0.75rem' }}>
                    {formData.images.map((imgUrl, imgIdx) => (
                      <div key={imgIdx} style={{ position: 'relative', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                        <img src={imgUrl} alt={`Thumb ${imgIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '4px', left: '4px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.65rem', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>
                          #{imgIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(imgIdx)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: 'rgba(244, 63, 94, 0.85)',
                            border: 'none',
                            color: '#ffffff',
                            borderRadius: '4px',
                            padding: '3px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button Tile */}
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '1.4rem',
                    border: '2px dashed var(--border-medium)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: 'var(--btn-secondary-bg)',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s'
                  }}
                >
                  <UploadCloud size={22} color="var(--accent-cyan)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>
                    {formData.images && formData.images.length > 0 ? '+ Upload More Images' : 'Click to select 1 or multiple images'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Auto-compressed to WebP format</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label-custom">Linked Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-custom"
                  >
                    {PORTFOLIO_CATEGORIES.filter(c => c.slug !== 'all').map(c => (
                      <option key={c.slug} value={c.slug} style={{ background: 'var(--bg-card)' }}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-custom">Visual Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="input-custom"
                  >
                    {AVAILABLE_ICONS.map((ic) => (
                      <option key={ic} value={ic} style={{ background: 'var(--bg-card)' }}>{ic}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="label-custom">Short Description *</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Clear description of the service deliverables and business value..."
                  className="input-custom"
                  required
                />
              </div>

              {/* What You Get / Key Highlights */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label className="label-custom" style={{ margin: 0 }}>Deliverables & Key Highlights (Bullet Points)</label>
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    + Add Bullet
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {formData.highlights.map((hl, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={hl}
                        onChange={(e) => handleHighlightChange(idx, e.target.value)}
                        placeholder={`e.g. 100% full source code ownership`}
                        className="input-custom"
                        style={{ fontSize: '0.85rem', padding: '0.6rem 0.75rem' }}
                      />
                      {formData.highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer', padding: '4px' }}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                <div>
                  <label className="label-custom">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                    className="input-custom"
                  />
                </div>

                <div style={{ paddingTop: '1.2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.enabled}
                      onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--accent-cyan)' }}
                    />
                    Enabled on Portfolio
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary">
                  <Save size={16} /> {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
