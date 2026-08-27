import React, { useEffect, useState } from 'react';
import { getSiteConfig, updateSiteConfig, seedDefaultPortfolioData } from '../services/firestoreService';
import { useSite } from '../context/SiteContext';
import {
  Settings,
  Save,
  Database,
  Shield,
  CheckCircle2,
  Globe,
  Share2,
  Lock,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';

export default function SiteSettingsManager() {
  const { siteConfig, refreshSiteConfig, showToast } = useSite();
  const [formData, setFormData] = useState({
    name: "Aditya Jamdade",
    title: "Full-Stack Developer & Digital Solutions Specialist",
    tagline: "Websites • Software • Applications • APIs • Payments • AI Automation • Digital Solutions",
    bio: "I build high-performance websites, custom business software, scalable applications, Razorpay payment systems, WhatsApp API integrations, AI automations and custom digital solutions for businesses.",
    email: "adityajamdade2124@gmail.com",
    phone: "+91 90224 10301",
    whatsapp: "+91 90224 10301",
    location: "Sangli / Pune / Mumbai, India (Available Worldwide)",
    resumeUrl: "#",
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    calendlyUrl: "https://cal.com",
    seoTitle: "Aditya Jamdade | Full-Stack Developer & Digital Solutions Specialist",
    seoDescription: "Professional full-stack web developer and digital solutions consultant. Custom websites, web applications, Razorpay payment integrations, WhatsApp APIs, AI automations & technical support.",
    watermark: {
      enabled: true,
      text: "Aditya Jamdade",
      position: "bottom-right",
      opacity: 0.25,
      fontSize: 14
    }
  });

  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    if (siteConfig) {
      setFormData({
        ...formData,
        ...siteConfig,
        watermark: {
          ...formData.watermark,
          ...(siteConfig.watermark || {})
        }
      });
    }
  }, [siteConfig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWatermarkChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      watermark: {
        ...prev.watermark,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteConfig(formData);
      await refreshSiteConfig();
      showToast("Site configuration and watermark settings saved!", "success");
    } catch (err) {
      showToast("Failed to save site settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSeedData = async () => {
    if (!window.confirm("This will populate Firestore with sample showcase projects, services, skills, and testimonials. Proceed?")) return;
    setSeeding(true);
    try {
      showToast("Seeding sample portfolio data...", "info");
      await seedDefaultPortfolioData();
      await refreshSiteConfig();
      showToast("Sample portfolio data seeded successfully into Firestore!", "success", 5000);
    } catch (err) {
      console.error("Seed error:", err);
      showToast("Failed to seed data. Verify Firestore permissions.", "error");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '5rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Site Settings & Watermark Configuration
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Configure branding, direct contact links, SEO defaults, media watermark, and database utilities.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary"
          style={{ padding: '0.75rem 1.75rem', opacity: saving ? 0.7 : 1 }}
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Section 1: Developer Profile & Positioning */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            1. Professional Branding & Positioning
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label className="label-custom">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-custom"
                required
              />
            </div>

            <div>
              <label className="label-custom">Primary Professional Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-custom"
                required
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label-custom">Supporting Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="input-custom"
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label-custom">Hero Bio / Value Proposition</label>
              <textarea
                rows={3}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="input-custom"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Channels */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            2. Direct Client Contact Channels
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label className="label-custom">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-custom"
                required
              />
            </div>

            <div>
              <label className="label-custom">WhatsApp Number (with country code)</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="input-custom"
                required
              />
            </div>

            <div>
              <label className="label-custom">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Location / Availability</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-custom"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Social & Meeting Links */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            3. Social Profiles & Schedule Links
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label className="label-custom">LinkedIn URL</label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Calendly / Cal.com URL</label>
              <input
                type="url"
                name="calendlyUrl"
                value={formData.calendlyUrl}
                onChange={handleChange}
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Resume / CV Link</label>
              <input
                type="text"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                className="input-custom"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Watermark System Configuration */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={18} color="#00f2fe" /> 4. Media Watermark Overlay
            </h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#00f2fe', fontWeight: 600, fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                name="enabled"
                checked={formData.watermark?.enabled}
                onChange={handleWatermarkChange}
                style={{ width: '16px', height: '16px', accentColor: '#00f2fe' }}
              />
              Enable Watermarking
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label className="label-custom">Watermark Text</label>
              <input
                type="text"
                name="text"
                value={formData.watermark?.text}
                onChange={handleWatermarkChange}
                placeholder="Aditya Jamdade"
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Overlay Position</label>
              <select
                name="position"
                value={formData.watermark?.position}
                onChange={handleWatermarkChange}
                className="input-custom"
              >
                <option value="bottom-right" style={{ background: '#161616' }}>Bottom Right (Default)</option>
                <option value="bottom-left" style={{ background: '#161616' }}>Bottom Left</option>
                <option value="top-right" style={{ background: '#161616' }}>Top Right</option>
                <option value="top-left" style={{ background: '#161616' }}>Top Left</option>
                <option value="center" style={{ background: '#161616' }}>Center</option>
              </select>
            </div>

            <div>
              <label className="label-custom">Opacity (0.1 to 0.8)</label>
              <input
                type="number"
                step="0.05"
                min="0.05"
                max="0.9"
                name="opacity"
                value={formData.watermark?.opacity}
                onChange={handleWatermarkChange}
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Font Size (px)</label>
              <input
                type="number"
                name="fontSize"
                value={formData.watermark?.fontSize}
                onChange={handleWatermarkChange}
                className="input-custom"
              />
            </div>
          </div>
        </div>

        {/* Section 5: SEO Defaults */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            5. Search Engine Optimization (SEO)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="label-custom">Default Page Title Tag</label>
              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Default Meta Description</label>
              <textarea
                rows={2}
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
                className="input-custom"
              />
            </div>
          </div>
        </div>

        {/* Section 6: Sample Data Seeder Tool */}
        <div
          className="glass-card-glow"
          style={{
            padding: '2rem',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(0, 242, 254, 0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Database size={18} color="#00f2fe" /> Initialize / Seed Default Portfolio Showcase
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', maxWidth: '600px', lineHeight: 1.5 }}>
                Click below to populate Firestore with complete showcase projects across all 11 categories (Razorpay, AI Workflows, WhatsApp Bots, Web Apps, GMB, SaaS), services, skills matrix, and testimonials.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSeedData}
              disabled={seeding}
              style={{
                background: 'rgba(0, 242, 254, 0.15)',
                border: '1px solid #00f2fe',
                color: '#00f2fe',
                padding: '0.75rem 1.4rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: seeding ? 0.6 : 1
              }}
            >
              <RefreshCw size={16} className={seeding ? "animate-spin" : ""} />
              {seeding ? 'Populating Firestore...' : 'Seed Sample Data'}
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ padding: '0.85rem 2.5rem', opacity: saving ? 0.7 : 1 }}
          >
            <Save size={16} /> {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>

      </form>
    </div>
  );
}
