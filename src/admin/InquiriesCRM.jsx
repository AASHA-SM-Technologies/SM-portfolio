import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../services/firestoreService';
import { useSite } from '../context/SiteContext';
import {
  Inbox,
  Search,
  MessageSquare,
  Phone,
  Mail,
  Building,
  User,
  Clock,
  DollarSign,
  Tag,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Edit3,
  Archive,
  X,
  FileText,
  AlertCircle
} from 'lucide-react';

const STATUS_CONFIG = {
  new: { label: 'New Lead', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)' },
  contacted: { label: 'Contacted', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  qualified: { label: 'Qualified', color: '#00f2fe', bg: 'rgba(0, 242, 254, 0.15)' },
  proposal: { label: 'Proposal Sent', color: '#818cf8', bg: 'rgba(129, 140, 248, 0.15)' },
  won: { label: 'Deal Won', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  lost: { label: 'Lost / Closed', color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)' },
  archived: { label: 'Archived', color: '#475569', bg: 'rgba(71, 85, 105, 0.15)' }
};

export default function InquiriesCRM() {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('id');

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const { showToast } = useSite();

  const loadInquiries = async () => {
    setLoading(true);
    const data = await getInquiries('all');
    setInquiries(data);
    setLoading(false);

    if (highlightId && data.length > 0) {
      const found = data.find(i => i.id === highlightId);
      if (found) {
        setSelectedInquiry(found);
        setInternalNotes(found.internalNotes || '');
      }
    }
  };

  useEffect(() => {
    loadInquiries();
  }, [highlightId]);

  const handleSelectInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setInternalNotes(inquiry.internalNotes || '');
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedInquiry) return;
    setUpdating(true);
    try {
      await updateInquiryStatus(selectedInquiry.id, newStatus, internalNotes);
      setInquiries(prev => prev.map(i => i.id === selectedInquiry.id ? { ...i, status: newStatus, internalNotes } : i));
      setSelectedInquiry(prev => ({ ...prev, status: newStatus, internalNotes }));
      showToast(`Inquiry status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}.`, 'success');
    } catch (err) {
      showToast("Failed to update inquiry status.", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setUpdating(true);
    try {
      await updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, internalNotes);
      setInquiries(prev => prev.map(i => i.id === selectedInquiry.id ? { ...i, internalNotes } : i));
      showToast("Internal notes saved successfully.", "success");
    } catch (err) {
      showToast("Failed to save notes.", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteInquiry(id);
      setInquiries(prev => prev.filter(i => i.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      showToast("Inquiry deleted.", "success");
    } catch (err) {
      showToast("Failed to delete inquiry.", "error");
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        i.name?.toLowerCase().includes(q) ||
        i.businessName?.toLowerCase().includes(q) ||
        i.email?.toLowerCase().includes(q) ||
        i.requirementType?.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getWhatsAppLink = (inquiry) => {
    const rawNumber = inquiry.whatsapp || inquiry.phone;
    if (!rawNumber) return null;
    const cleanNum = rawNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hi ${inquiry.name}, thank you for reaching out on my portfolio regarding your ${inquiry.requirementType} requirement. When would be a good time for a quick 10-minute discovery discussion?`
    );
    return `https://wa.me/${cleanNum}?text=${text}`;
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Client Leads & Inquiries CRM
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Track incoming project requirements, manage pipeline stages, and initiate direct communication.
          </p>
        </div>
      </div>

      {/* Pipeline Status Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          marginBottom: '1.5rem',
          scrollbarWidth: 'none'
        }}
      >
        <button
          onClick={() => setStatusFilter('all')}
          style={{
            background: statusFilter === 'all' ? 'var(--gradient-primary)' : 'var(--btn-secondary-bg)',
            color: statusFilter === 'all' ? '#ffffff' : 'var(--text-muted)',
            border: '1px solid var(--border-subtle)',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          All Inquiries ({inquiries.length})
        </button>

        {Object.entries(STATUS_CONFIG).map(([key, config]) => {
          const count = inquiries.filter(i => i.status === key).length;
          const isSelected = statusFilter === key;
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              style={{
                background: isSelected ? config.bg : 'var(--btn-secondary-bg)',
                color: isSelected ? config.color : 'var(--text-muted)',
                border: `1px solid ${isSelected ? config.color : 'var(--border-subtle)'}`,
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{config.label}</span>
              <span style={{ opacity: 0.8 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, company, email, or requirement..."
            className="input-custom"
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>
      </div>

      {/* Main Inquiries Split View (Table + Detail Drawer) */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedInquiry ? '1fr 420px' : '1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Table View */}
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading inquiries from Firestore...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Inbox size={40} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Inquiries Match Filter</h3>
              <p>Try clearing your search query or selecting "All Inquiries".</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--btn-secondary-bg)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem' }}>Client & Business</th>
                    <th style={{ padding: '1rem' }}>Requirement</th>
                    <th style={{ padding: '1rem' }}>Budget / Timeline</th>
                    <th style={{ padding: '1rem' }}>Contact Info</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inq) => {
                    const st = STATUS_CONFIG[inq.status] || STATUS_CONFIG.new;
                    const isSelected = selectedInquiry?.id === inq.id;
                    return (
                      <tr
                        key={inq.id}
                        onClick={() => handleSelectInquiry(inq)}
                        style={{
                          borderBottom: '1px solid var(--border-subtle)',
                          background: isSelected ? 'rgba(2, 132, 199, 0.08)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background 0.15s'
                        }}
                      >
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                            {inq.name}
                          </div>
                          {inq.businessName && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{inq.businessName}</div>
                          )}
                        </td>

                        <td style={{ padding: '1rem', color: 'var(--text-main)' }}>
                          <span className="badge-tech" style={{ fontSize: '0.72rem' }}>
                            {inq.requirementType}
                          </span>
                        </td>

                        <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <div>{inq.budget}</div>
                          <div style={{ color: 'var(--text-dim)' }}>{inq.timeline}</div>
                        </td>

                        <td style={{ padding: '1rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          <div>{inq.email}</div>
                          {(inq.whatsapp || inq.phone) && (
                            <div style={{ color: '#25d366' }}>{inq.whatsapp || inq.phone}</div>
                          )}
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              color: st.color,
                              background: st.bg,
                              padding: '0.25rem 0.6rem',
                              borderRadius: '4px',
                              textTransform: 'uppercase'
                            }}
                          >
                            {st.label}
                          </span>
                        </td>

                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectInquiry(inq);
                            }}
                            className="btn-secondary"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail View Drawer */}
        {selectedInquiry && (
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              position: 'sticky',
              top: '5.5rem',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: STATUS_CONFIG[selectedInquiry.status]?.color || 'var(--accent-cyan)',
                    background: STATUS_CONFIG[selectedInquiry.status]?.bg || 'rgba(2, 132, 199, 0.15)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    marginBottom: '0.4rem'
                  }}
                >
                  {STATUS_CONFIG[selectedInquiry.status]?.label || selectedInquiry.status}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {selectedInquiry.name}
                </h3>
                {selectedInquiry.businessName && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                    {selectedInquiry.businessName}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Direct Connect Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {getWhatsAppLink(selectedInquiry) ? (
                <a
                  href={getWhatsAppLink(selectedInquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ padding: '0.55rem', fontSize: '0.8rem', borderRadius: '8px', justifyContent: 'center' }}
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
              ) : (
                <button disabled className="btn-secondary" style={{ padding: '0.55rem', fontSize: '0.8rem', opacity: 0.5 }}>
                  No WhatsApp
                </button>
              )}

              {selectedInquiry.email ? (
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(`Project Proposal: ${selectedInquiry.requirementType}`)}`}
                  className="btn-secondary"
                  style={{ padding: '0.55rem', fontSize: '0.8rem', borderRadius: '8px', justifyContent: 'center' }}
                >
                  <Mail size={14} /> Send Email
                </a>
              ) : null}
            </div>

            {/* Pipeline Stage Updater */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label-custom">Update Pipeline Status</label>
              <select
                value={selectedInquiry.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className="input-custom"
                style={{ cursor: 'pointer' }}
              >
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Details Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', marginBottom: '1.5rem', background: 'var(--btn-secondary-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Requirement: </span>
                <strong style={{ color: 'var(--text-main)' }}>{selectedInquiry.requirementType}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Budget: </span>
                <span style={{ color: 'var(--text-main)' }}>{selectedInquiry.budget}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Timeline: </span>
                <span style={{ color: 'var(--text-main)' }}>{selectedInquiry.timeline}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Preferred Contact: </span>
                <span style={{ color: 'var(--text-main)' }}>{selectedInquiry.preferredContact}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Source Page: </span>
                <span style={{ color: 'var(--accent-cyan)' }}>{selectedInquiry.sourcePage || 'Contact Page'}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Submitted: </span>
                <span style={{ color: 'var(--text-muted)' }}>{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {/* Project Requirement Description */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label-custom">Client Project Description</label>
              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6, maxHeight: '180px', overflowY: 'auto' }}>
                {selectedInquiry.description}
              </div>
            </div>

            {/* Internal Notes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label className="label-custom" style={{ margin: 0 }}>Internal Admin Notes</label>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={updating}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Save Notes
                </button>
              </div>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add private notes on budget discussions, calls, or proposal links..."
                className="input-custom"
                style={{ fontSize: '0.85rem' }}
              />
            </div>

            {/* Delete Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleDelete(selectedInquiry.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fb7185',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Trash2 size={14} /> Delete Inquiry Record
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
