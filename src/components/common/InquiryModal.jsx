import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../../context/SiteContext';
import { createInquiry } from '../../services/firestoreService';
import { Analytics } from '../../services/analyticsService';
import confetti from 'canvas-confetti';
import {
  X,
  Send,
  CheckCircle2,
  MessageSquare,
  Phone,
  Mail,
  Building,
  User,
  Clock,
  IndianRupee,
  Check,
  ChevronDown
} from 'lucide-react';

const REQUIREMENT_OPTIONS = [
  "Website Development",
  "Business Software & ERP",
  "Web Applications",
  "Payment Gateway (Razorpay/UPI)",
  "WhatsApp Cloud API & Chatbot",
  "AI Automation & Workflows",
  "Google Business Profile (GMB)",
  "Custom API & Integration",
  "Technical Support & Fixes"
];

const BUDGET_OPTIONS = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "₹2,50,000+",
  "Flexible / Discussion"
];

const TIMELINE_OPTIONS = [
  "Urgent / Immediate (Within 7 Days)",
  "Within 2–4 Weeks",
  "1–2 Months",
  "Flexible Timeline"
];

export default function InquiryModal() {
  const { inquiryModal, closeInquiryModal, siteConfig, showToast } = useSite();
  
  const [selectedRequirements, setSelectedRequirements] = useState([
    inquiryModal.requirementType || 'Website Development'
  ]);
  const [reqDropdownOpen, setReqDropdownOpen] = useState(false);
  const reqDropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    whatsapp: '',
    description: '',
    budget: '₹25,000 – ₹50,000',
    timeline: 'Within 2–4 Weeks',
    preferredContact: 'WhatsApp'
  });

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reqDropdownRef.current && !reqDropdownRef.current.contains(event.target)) {
        setReqDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleRequirement = (req) => {
    setSelectedRequirements((prev) => {
      if (prev.includes(req)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== req);
      } else {
        return [...prev, req];
      }
    });
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!inquiryModal.isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg('Please briefly describe your project or requirement.');
      return;
    }

    setSubmitting(true);
    try {
      await createInquiry({
        ...formData,
        requirements: selectedRequirements,
        requirementType: selectedRequirements.join(', '),
        sourcePage: inquiryModal.sourcePage || window.location.pathname,
        projectId: inquiryModal.projectId || null,
        projectTitle: inquiryModal.projectTitle || null
      });

      // Track analytics
      Analytics.inquirySubmitted(selectedRequirements.join(', '), formData.budget);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (confettiErr) {
        // Safe fallback
      }

      setSubmitted(true);
      showToast("Inquiry submitted successfully! I will contact you shortly.", "success");
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
      setErrorMsg("Failed to submit inquiry. Please check your internet connection or reach out on WhatsApp directly.");
      showToast("Submission failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const directWhatsAppUrl = () => {
    const phone = siteConfig?.whatsapp?.replace(/[^0-9]/g, '') || '919022410301';
    const reqText = selectedRequirements && selectedRequirements.length > 0
      ? selectedRequirements.join(', ')
      : 'a digital solution / project';
    const text = encodeURIComponent(
      `Hello Aditya, I'm reaching out from your portfolio to discuss ${reqText} for my business.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div
      className="modal-backdrop-wrap"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeInquiryModal();
      }}
    >
      <div
        className="glass-card modal-container inquiry-modal-box"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          borderRadius: '20px',
          padding: '2rem',
          position: 'relative',
          background: 'var(--bg-modal)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeInquiryModal}
          className="inquiry-close-btn"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--btn-secondary-bg)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-main)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'var(--btn-secondary-bg)';
          }}
          aria-label="Close Modal"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: '#10b981'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Requirement Received, {formData.name}!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 1.75rem' }}>
              Thank you for sharing your project details. I will review your requirements and reach out within 24 hours with an actionable roadmap.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={directWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <MessageSquare size={16} /> Fast-Track on WhatsApp
              </a>

              <button
                onClick={closeInquiryModal}
                className="btn-secondary"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="inquiry-header" style={{ marginBottom: '1.25rem', paddingRight: '2rem' }}>
              <div
                className="inquiry-tag"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem'
                }}
              >
                <Send size={13} /> Project Inquiry & Consultation
              </div>
              <h2
                className="inquiry-title"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.25rem',
                  lineHeight: 1.25
                }}
              >
                Let's Discuss Your Project Requirements
              </h2>
              <p
                className="inquiry-subtitle"
                style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.45 }}
              >
                Fill out the quick form below. I will personally review your requirements and respond within 24 hours.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div
                style={{
                  background: 'rgba(244, 63, 94, 0.12)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#fb7185',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  marginBottom: '1rem'
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              
              {/* Row 1: Name & Business Name */}
              <div className="inquiry-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                    <User size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    Full Name <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="input-custom"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.88rem' }}
                    required
                  />
                </div>

                <div>
                  <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                    <Building size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    Company / Business
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Enter Business Name"
                    className="input-custom"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="inquiry-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                    <Mail size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    Email Address <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email ID"
                    className="input-custom"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.88rem' }}
                    required
                  />
                </div>

                <div>
                  <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                    <MessageSquare size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    Phone / WhatsApp <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="input-custom"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.88rem' }}
                    required
                  />
                </div>
              </div>

              {/* Row 3: Multi-Select Service / Requirement Dropdown */}
              <div style={{ position: 'relative' }} ref={reqDropdownRef}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="label-custom" style={{ fontSize: '0.8rem', margin: 0 }}>
                    Services & Requirements (Multi-Select) <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                  </label>
                  <span style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    {selectedRequirements.length} selected
                  </span>
                </div>

                {/* Dropdown Trigger Button */}
                <button
                  type="button"
                  onClick={() => setReqDropdownOpen(!reqDropdownOpen)}
                  className="input-custom"
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '0.5rem' }}>
                    {selectedRequirements.length === 1
                      ? selectedRequirements[0]
                      : `${selectedRequirements[0]} (+${selectedRequirements.length - 1} more)`}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: 'var(--text-muted)',
                      transform: reqDropdownOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </button>

                {/* Dropdown Options Popover */}
                {reqDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      right: 0,
                      zIndex: 50,
                      background: 'var(--bg-modal)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '0.4rem',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                      maxHeight: '220px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem'
                    }}
                  >
                    {REQUIREMENT_OPTIONS.map((opt) => {
                      const isChecked = selectedRequirements.includes(opt);
                      return (
                        <div
                          key={opt}
                          onClick={() => toggleRequirement(opt)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.82rem',
                            background: isChecked ? 'var(--badge-tech-bg)' : 'transparent',
                            color: isChecked ? 'var(--accent-cyan)' : 'var(--text-main)',
                            fontWeight: isChecked ? 700 : 500,
                            transition: 'background 0.15s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                          />
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Row 4: Budget */}
              <div>
                <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                  <IndianRupee size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  Estimated Budget (INR - ₹)
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="input-custom"
                  style={{ padding: '0.6rem 0.85rem', fontSize: '0.86rem', cursor: 'pointer' }}
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b} style={{ background: 'var(--bg-modal)', color: 'var(--text-main)' }}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 5: Description */}
              <div>
                <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                  Project Description & Requirements <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly explain what you want to build or what technical problem you need solved..."
                  className="input-custom"
                  style={{ padding: '0.6rem 0.85rem', fontSize: '0.88rem', resize: 'vertical' }}
                  required
                />
              </div>

              {/* Submit Action Buttons */}
              <div
                className="inquiry-actions-bar"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '0.35rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <a
                  href={directWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inquiry-whatsapp-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#25d366',
                    fontSize: '0.84rem',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  <MessageSquare size={14} /> Prefer WhatsApp chat?
                </a>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary inquiry-submit-btn"
                  style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem', borderRadius: '10px', opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Submitting...' : (
                    <>
                      <Send size={15} /> Submit Requirement
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .modal-container {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .modal-container::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        @media (max-width: 768px) {
          .modal-backdrop-wrap {
            padding: 0.65rem !important;
          }
          .inquiry-modal-box {
            padding: 1.35rem 1.1rem !important;
            border-radius: 16px !important;
            max-height: 94vh !important;
          }
          .inquiry-close-btn {
            top: 0.85rem !important;
            right: 0.85rem !important;
            width: 32px !important;
            height: 32px !important;
          }
          .inquiry-header {
            padding-right: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          .inquiry-tag {
            font-size: 0.72rem !important;
            margin-bottom: 0.25rem !important;
          }
          .inquiry-title {
            font-size: 1.2rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.2rem !important;
          }
          .inquiry-subtitle {
            font-size: 0.78rem !important;
            line-height: 1.4 !important;
          }
          .inquiry-form-row {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .inquiry-actions-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.65rem !important;
          }
          .inquiry-submit-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            border-radius: 10px !important;
            padding: 0.85rem !important;
            order: 1 !important;
          }
          .inquiry-whatsapp-link {
            justify-content: center !important;
            text-align: center !important;
            order: 2 !important;
            padding: 0.25rem 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
