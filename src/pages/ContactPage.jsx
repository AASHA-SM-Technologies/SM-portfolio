import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/common/SEO';
import { createInquiry } from '../services/firestoreService';
import { useSite } from '../context/SiteContext';
import { Analytics } from '../services/analyticsService';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Building2,
  Building,
  User,
  Clock,
  IndianRupee,
  Calendar,
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

export default function ContactPage() {
  const { siteConfig, showToast } = useSite();

  const [selectedRequirements, setSelectedRequirements] = useState(["Website Development"]);
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

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((item) => item !== req);
      } else {
        return [...prev, req];
      }
    });
  };

  useEffect(() => {
    Analytics.pageView('Contact');
  }, []);

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
      setErrorMsg('Please describe your project or requirement.');
      return;
    }

    setSubmitting(true);
    try {
      await createInquiry({
        ...formData,
        requirements: selectedRequirements,
        requirementType: selectedRequirements.join(', '),
        sourcePage: 'Contact Page (/contact)'
      });

      Analytics.inquirySubmitted(selectedRequirements.join(', '), formData.budget);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) { }

      setSubmitted(true);
      showToast("Requirement submitted successfully!", "success");
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
      `Hello Nexvora Technologies, I'm reaching out to discuss ${reqText} for my business.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="contact-page-wrapper" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <SEO
        title="Contact & Project Consultation"
        description="Submit your digital solution requirement or book a technical consultation with Nexvora Technologies for websites, business software, payments, and AI automations."
      />

      <div className="container-custom">

        {/* Page Header */}
        <div className="contact-header-box" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
          <div
            className="contact-tag-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--accent-cyan)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              background: 'var(--badge-tech-bg)',
              border: '1px solid var(--border-glow)',
              padding: '0.3rem 0.8rem',
              borderRadius: '8px'
            }}
          >
            <MessageSquare size={14} /> Start a Project
          </div>
          <h1
            className="contact-page-title"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              lineHeight: 1.15
            }}
          >
            Let's Discuss Your Project Requirements
          </h1>
          <p
            className="contact-page-desc"
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              maxWidth: '640px',
              margin: '0 auto'
            }}
          >
            Share your goals below and receive an architectural roadmap, delivery timeline, and transparent pricing.
          </p>
        </div>

        <div className="contact-main-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>

          {/* Left Column: Direct Contact Hub Card */}
          <div
            className="glass-panel contact-channels-card"
            style={{
              padding: '1.75rem 1.75rem',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}
          >
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 className="contact-channels-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  Direct Channels
                </h2>
                <p className="contact-channels-sub" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Prefer to connect immediately? Reach me directly through any of these communication channels.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* WhatsApp Card */}
                <a
                  href={directWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel contact-channel-item"
                  style={{
                    padding: '0.9rem 1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(37, 211, 102, 0.3)',
                    borderRadius: '12px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#25d366')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.3)')}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: 'rgba(37, 211, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25d366', flexShrink: 0 }}>
                    <MessageSquare size={18} />
                  </div>
                  <div style={{ minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ color: '#25d366', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Instant Messaging
                    </div>
                    <div className="contact-item-val" style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem' }}>
                      {siteConfig?.whatsapp || '+91 90224 10301'}
                    </div>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${siteConfig?.email || 'adityajamdade2124@gmail.com'}`}
                  className="glass-panel contact-channel-item"
                  style={{
                    padding: '0.9rem 1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    textDecoration: 'none',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-cyan)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: 'var(--badge-tech-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div style={{ minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ color: 'var(--accent-cyan)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Email Inquiries
                    </div>
                    <div className="contact-item-val" style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem', wordBreak: 'break-all' }}>
                      {siteConfig?.email || 'adityajamdade2124@gmail.com'}
                    </div>
                  </div>
                </a>

                {/* Location Card */}
                <div
                  className="glass-panel contact-channel-item"
                  style={{
                    padding: '0.9rem 1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: 'var(--btn-secondary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexShrink: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <div style={{ minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Location & Availability
                    </div>
                    <div className="contact-item-val" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.88rem' }}>
                      {siteConfig?.location || 'Sangli / Pune / Mumbai, India (Available Worldwide)'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div
              className="contact-guarantees-box"
              style={{
                padding: '1.1rem',
                borderRadius: '12px',
                background: 'var(--btn-secondary-bg)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
                Why Work Directly With Me?
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0 }} /> No middle-layer management or communication gaps
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0 }} /> Sub-24 hour initial review and technical proposal
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0 }} /> Complete code ownership and deployment support
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Compact Lead Form */}
          <div
            className="glass-panel contact-form-card"
            style={{
              padding: '1.75rem 1.75rem',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              background: 'var(--bg-card)'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: '#10b981'
                }}>
                  <CheckCircle2 size={30} />
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  Thank you, {formData.name}!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 1.75rem' }}>
                  Your requirement has been received. I'll review your project details and get back to you within 24 hours.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={directWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                  >
                    <MessageSquare size={16} /> Fast-Track on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        businessName: '',
                        email: '',
                        phone: '',
                        whatsapp: '',
                        requirementType: 'Website Development',
                        description: '',
                        budget: '₹25,000 – ₹50,000',
                        timeline: 'Within 2–4 Weeks',
                        preferredContact: 'WhatsApp'
                      });
                    }}
                    className="btn-secondary"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div style={{ marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                    Project Inquiry Form
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    Fill out the quick details below for an architectural roadmap and estimate.
                  </p>
                </div>

                {errorMsg && (
                  <div style={{ background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fb7185', padding: '0.6rem 0.85rem', borderRadius: '8px', fontSize: '0.82rem' }}>
                    {errorMsg}
                  </div>
                )}

                {/* Name & Business */}
                <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                  <div>
                    <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                      <User size={12} style={{ display: 'inline', marginRight: '4px' }} />
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
                      <Building2 size={12} style={{ display: 'inline', marginRight: '4px' }} />
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

                {/* Email & Phone */}
                <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                  <div>
                    <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                      <Mail size={12} style={{ display: 'inline', marginRight: '4px' }} />
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
                      <Phone size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Phone / WhatsApp <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="input-custom"
                      style={{ padding: '0.6rem 0.85rem', fontSize: '0.88rem' }}
                      required
                    />
                  </div>
                </div>

                {/* Multi-Select Service / Requirement Dropdown */}
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
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
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

                {/* Estimated Budget (INR - ₹) */}
                <div>
                  <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                    <IndianRupee size={12} style={{ display: 'inline', marginRight: '4px' }} />
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

                {/* Project Description (Compact Textarea) */}
                <div>
                  <label className="label-custom" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                    Project Overview / Goals <span style={{ color: 'var(--accent-cyan)' }}>*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly describe what you want to build, key features, or problems you need solved..."
                    className="input-custom"
                    style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem', resize: 'vertical', minHeight: '75px' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary contact-submit-btn"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', marginTop: '0.35rem', borderRadius: '10px', opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Submitting Requirement...' : (
                    <>
                      <Send size={16} /> Submit Requirement
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-page-wrapper {
            padding-top: 5.5rem !important;
            padding-bottom: 4rem !important;
          }
          .contact-header-box {
            margin-bottom: 2rem !important;
          }
          .contact-tag-badge {
            font-size: 0.72rem !important;
            padding: 0.25rem 0.65rem !important;
            border-radius: 6px !important;
            margin-bottom: 0.65rem !important;
          }
          .contact-page-title {
            font-size: 1.55rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.65rem !important;
          }
          .contact-page-desc {
            font-size: 0.88rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1.5rem !important;
          }
          .contact-main-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .contact-form-card {
            order: 1 !important;
            padding: 1.25rem 1rem !important;
            border-radius: 14px !important;
          }
          .contact-channels-card {
            order: 2 !important;
            padding: 1.25rem 1rem !important;
            border-radius: 14px !important;
            gap: 1.15rem !important;
          }
          .contact-channel-item {
            padding: 0.75rem 0.85rem !important;
            border-radius: 10px !important;
          }
          .contact-item-val {
            font-size: 0.86rem !important;
          }
          .contact-guarantees-box {
            padding: 0.85rem 0.95rem !important;
            border-radius: 10px !important;
          }
          .contact-form-row {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .contact-submit-btn {
            padding: 0.85rem 1.25rem !important;
            font-size: 0.92rem !important;
            border-radius: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
