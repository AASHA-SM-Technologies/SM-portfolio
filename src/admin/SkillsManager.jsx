import React, { useEffect, useState } from 'react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../services/firestoreService';
import { useSite } from '../context/SiteContext';
import {
  Cpu,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  CheckCircle2,
  Tag
} from 'lucide-react';

const SKILL_CATEGORIES = [
  "Frontend",
  "Database / Firebase",
  "Integrations",
  "Automation",
  "Deployment / Support",
  "Other Technical Skills"
];

const SKILL_LEVELS = ["Expert", "Advanced", "Proficient", "Familiar"];

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 'Expert',
    sortOrder: 0,
    enabled: true
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useSite();

  const loadData = async () => {
    setLoading(true);
    const data = await getSkills(false);
    setSkills(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      level: 'Expert',
      sortOrder: skills.length + 1,
      enabled: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'Frontend',
      level: skill.level || 'Expert',
      sortOrder: skill.sortOrder || 0,
      enabled: skill.enabled !== undefined ? skill.enabled : true
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill entry?")) return;
    try {
      await deleteSkill(id);
      setSkills(prev => prev.filter(s => s.id !== id));
      showToast("Skill removed.", "success");
    } catch (err) {
      showToast("Failed to delete skill.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        sortOrder: Number(formData.sortOrder) || 0
      };

      if (editingSkill) {
        await updateSkill(editingSkill.id, payload);
        showToast("Skill updated successfully.", "success");
      } else {
        await createSkill(payload);
        showToast("New skill added successfully.", "success");
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      showToast("Failed to save skill.", "error");
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
            Technical Skills & Tooling CMS
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Manage the categorized technical abilities, frameworks, and APIs displayed on the public skills matrix.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ padding: '0.7rem 1.4rem' }}>
          <Plus size={16} /> Add New Skill
        </button>
      </div>

      {/* Skills Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            Loading skills from Firestore...
          </div>
        ) : skills.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#94a3b8' }}>
            <Cpu size={40} color="#00f2fe" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '0.5rem' }}>No Skills Found</h3>
            <p style={{ marginBottom: '1.5rem' }}>Add your technical proficiency items or seed sample portfolio data.</p>
            <button onClick={handleOpenAdd} className="btn-primary">
              <Plus size={16} /> Add First Skill
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left', color: '#94a3b8' }}>
                  <th style={{ padding: '1rem' }}>Technology / Skill Name</th>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem' }}>Proficiency Level</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Sort Order</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                      {s.name}
                    </td>
                    <td style={{ padding: '1rem', color: '#38bdf8' }}>
                      {s.category}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge-tech" style={{ fontSize: '0.72rem' }}>
                        {s.level || 'Expert'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>
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
                        {s.enabled ? 'Enabled' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => handleOpenEdit(s)}
                          style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: '#00f2fe', padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
                {editingSkill ? 'Edit Skill Entry' : 'Add Technical Skill'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label className="label-custom">Technology / Tool Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. React.js, Razorpay, OpenAI API"
                  className="input-custom"
                  required
                />
              </div>

              <div>
                <label className="label-custom">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-custom"
                >
                  {SKILL_CATEGORIES.map(c => (
                    <option key={c} value={c} style={{ background: '#161616' }}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-custom">Proficiency Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="input-custom"
                >
                  {SKILL_LEVELS.map(l => (
                    <option key={l} value={l} style={{ background: '#161616' }}>{l}</option>
                  ))}
                </select>
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
                      checked={formData.enabled}
                      onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                      style={{ width: '16px', height: '16px', accentColor: '#00f2fe' }}
                    />
                    Enabled
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary">
                  <Save size={16} /> {saving ? 'Saving...' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
