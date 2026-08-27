import React, { useEffect, useState } from 'react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../services/firestoreService';
import { compressImage } from '../utils/mediaCompressor';
import { useSite } from '../context/SiteContext';
import {
  Quote,
  Plus,
  Edit2,
  Trash2,
  Star,
  X,
  Save,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    businessName: '',
    designation: '',
    message: '',
    rating: 5,
    imageData: '',
    sortOrder: 0,
    published: true
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useSite();

  const loadData = async () => {
    setLoading(true);
    const data = await getTestimonials(false);
    setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      clientName: '',
      businessName: '',
      designation: '',
      message: '',
      rating: 5,
      imageData: '',
      sortOrder: testimonials.length + 1,
      published: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    setFormData({
      clientName: t.clientName || '',
      businessName: t.businessName || '',
      designation: t.designation || '',
      message: t.message || '',
      rating: t.rating || 5,
      imageData: t.imageData || '',
      sortOrder: t.sortOrder || 0,
      published: t.published !== undefined ? t.published : true
    });
    setModalOpen(true);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await compressImage(file, { maxWidth: 300, maxHeight: 300, quality: 0.75 });
      setFormData(prev => ({ ...prev, imageData: result.dataUrl }));
      showToast("Avatar image compressed.", "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
      showToast("Testimonial removed.", "success");
    } catch (err) {
      showToast("Failed to delete testimonial.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.message.trim()) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        rating: Number(formData.rating) || 5,
        sortOrder: Number(formData.sortOrder) || 0
      };

      if (editingItem) {
        await updateTestimonial(editingItem.id, payload);
        showToast("Testimonial updated.", "success");
      } else {
        await createTestimonial(payload);
        showToast("New testimonial added.", "success");
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      showToast("Failed to save testimonial.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Client Testimonials CMS
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Manage client reviews, ratings, and quotes showcased across the portfolio.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ padding: '0.7rem 1.4rem' }}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            Loading testimonials from Firestore...
          </div>
        ) : testimonials.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#94a3b8' }}>
            <Quote size={40} color="#00f2fe" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '0.5rem' }}>No Testimonials Found</h3>
            <p style={{ marginBottom: '1.5rem' }}>Add your first client quote to build trust and social proof.</p>
            <button onClick={handleOpenAdd} className="btn-primary">
              <Plus size={16} /> Add First Testimonial
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left', color: '#94a3b8' }}>
                  <th style={{ padding: '1rem' }}>Client Name</th>
                  <th style={{ padding: '1rem' }}>Business & Role</th>
                  <th style={{ padding: '1rem' }}>Rating</th>
                  <th style={{ padding: '1rem' }}>Quote Message</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Published</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        {t.imageData ? (
                          <img src={t.imageData} alt={t.clientName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                            {t.clientName?.charAt(0) || 'C'}
                          </div>
                        )}
                        <span>{t.clientName}</span>
                      </div>
                    </td>

                    <td style={{ padding: '1rem', color: '#cbd5e1' }}>
                      <div>{t.businessName}</div>
                      {t.designation && <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.designation}</div>}
                    </td>

                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.15rem' }}>
                        {Array.from({ length: t.rating || 5 }).map((_, r) => (
                          <Star key={r} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </td>

                    <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.82rem', maxWidth: '320px' }}>
                      "{t.message}"
                    </td>

                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: t.published ? '#10b981' : '#f43f5e',
                          background: t.published ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px'
                        }}
                      >
                        {t.published ? 'Public' : 'Hidden'}
                      </span>
                    </td>

                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => handleOpenEdit(t)}
                          style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: '#00f2fe', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fb7185', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
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

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
                {editingItem ? 'Edit Testimonial' : 'Add Client Testimonial'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label-custom">Client Full Name *</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Rajesh Kulkarni"
                    className="input-custom"
                    required
                  />
                </div>

                <div>
                  <label className="label-custom">Company / Business</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Kulkarni Diagnostics"
                    className="input-custom"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label-custom">Designation / Role</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Managing Director"
                    className="input-custom"
                  />
                </div>

                <div>
                  <label className="label-custom">Rating (1 to 5 Stars)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="input-custom"
                  >
                    {[5, 4, 3, 2, 1].map(r => (
                      <option key={r} value={r} style={{ background: '#161616' }}>{r} Stars</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="label-custom">Testimonial Quote *</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What did the client say about the solution, communication, and results?"
                  className="input-custom"
                  required
                />
              </div>

              {/* Optional Avatar */}
              <div>
                <label className="label-custom">Client Photo / Avatar (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="input-custom"
                />
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
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#f8fafc', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      style={{ width: '16px', height: '16px', accentColor: '#10b981' }}
                    />
                    Published on Website
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary">
                  <Save size={16} /> {saving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
