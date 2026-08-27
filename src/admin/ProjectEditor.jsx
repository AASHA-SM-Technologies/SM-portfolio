import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjectById, createProject, updateProject, PORTFOLIO_CATEGORIES } from '../services/firestoreService';
import { compressImage, validateAndProcessVideo, formatBytes, getBase64SizeInBytes, MAX_SAFE_IMAGE_BYTES, MAX_SAFE_VIDEO_BYTES } from '../utils/mediaCompressor';
import { useSite } from '../context/SiteContext';
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Video,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Layers,
  Tag,
  Globe,
  UploadCloud,
  X
} from 'lucide-react';

export default function ProjectEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { showToast, siteConfig } = useSite();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'websites',
    subCategory: '',
    industry: '',
    shortDescription: '',
    description: '',
    problem: '',
    solution: '',
    features: [''],
    technologies: [],
    contribution: [''],
    challenges: '',
    technicalImplementation: '',
    results: '',
    imageData: '',
    videoData: '',
    galleryImages: [],
    liveUrl: '',
    demoUrl: '',
    githubUrl: '',
    featured: false,
    published: true,
    sortOrder: 0
  });

  const [techInput, setTechInput] = useState('');
  const [imageMetrics, setImageMetrics] = useState(null); // { originalSize, compressedSize }
  const [videoMetrics, setVideoMetrics] = useState(null); // { size, duration }
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [mediaError, setMediaError] = useState('');

  useEffect(() => {
    if (isEditing) {
      async function load() {
        try {
          const data = await getProjectById(id);
          if (data) {
            setFormData({
              title: data.title || '',
              slug: data.slug || '',
              category: data.category || 'websites',
              subCategory: data.subCategory || '',
              industry: data.industry || '',
              shortDescription: data.shortDescription || '',
              description: data.description || '',
              problem: data.problem || '',
              solution: data.solution || '',
              features: data.features && data.features.length > 0 ? data.features : [''],
              technologies: data.technologies || [],
              contribution: data.contribution && data.contribution.length > 0 ? data.contribution : [''],
              challenges: data.challenges || '',
              technicalImplementation: data.technicalImplementation || '',
              results: data.results || '',
              imageData: data.imageData || '',
              videoData: data.videoData || '',
              galleryImages: data.galleryImages || [],
              liveUrl: data.liveUrl || '',
              demoUrl: data.demoUrl || '',
              githubUrl: data.githubUrl || '',
              featured: Boolean(data.featured),
              published: data.published !== undefined ? Boolean(data.published) : true,
              sortOrder: data.sortOrder || 0
            });

            if (data.imageData) {
              const byteSize = getBase64SizeInBytes(data.imageData);
              setImageMetrics({ originalSize: byteSize, compressedSize: byteSize });
            }
          }
        } catch (err) {
          showToast("Failed to load project details.", "error");
        } finally {
          setLoading(false);
        }
      }
      load();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from title if new project
    if (name === 'title' && !isEditing) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug: autoSlug }));
    }
  };

  // Technologies Tag Input
  const handleAddTech = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && techInput.trim()) {
      e.preventDefault();
      const newTech = techInput.trim();
      if (!formData.technologies.includes(newTech)) {
        setFormData(prev => ({
          ...prev,
          technologies: [...prev.technologies, newTech]
        }));
      }
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== techToRemove)
    }));
  };

  // Array Fields (Features & Contribution)
  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const handleAddArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Main Cover Image Compressor (Zero Firebase Storage)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaError('');

    try {
      showToast("Compressing image to optimized WebP format...", "info", 2000);
      const result = await compressImage(file, {
        maxWidth: 1280,
        maxHeight: 1280,
        quality: 0.78,
        watermark: siteConfig?.watermark
      });

      setFormData(prev => ({ ...prev, imageData: result.dataUrl }));
      setImageMetrics({
        originalSize: result.originalSize,
        compressedSize: result.compressedSize
      });
      showToast(`Image compressed: ${formatBytes(result.originalSize)} → ${formatBytes(result.compressedSize)}`, "success");
    } catch (err) {
      setMediaError(err.message || 'Failed to compress image.');
      showToast(err.message || 'Image processing failed.', 'error');
    }
  };

  // Gallery Screenshot Upload
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setMediaError('');

    try {
      const compressedList = [];
      for (const file of files.slice(0, 4)) {
        const result = await compressImage(file, { maxWidth: 1080, quality: 0.75 });
        compressedList.push(result.dataUrl);
      }
      setFormData(prev => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...compressedList]
      }));
      showToast(`Added ${compressedList.length} screenshots to gallery.`, "success");
    } catch (err) {
      setMediaError(err.message);
      showToast(err.message, "error");
    }
  };

  // Short Video Upload & Validation
  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaError('');

    try {
      showToast("Validating video clip duration and Firestore size...", "info", 2000);
      const result = await validateAndProcessVideo(file);
      setFormData(prev => ({ ...prev, videoData: result.dataUrl }));
      setVideoMetrics({ size: result.size, duration: result.duration });
      showToast(`Video processed successfully (${formatBytes(result.size)}, ${result.duration}s)`, "success");
    } catch (err) {
      setMediaError(err.message);
      showToast(err.message, "error", 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast("Please enter a project title.", "error");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        contribution: formData.contribution.filter(c => c.trim() !== ''),
        sortOrder: Number(formData.sortOrder) || 0
      };

      if (isEditing) {
        await updateProject(id, payload);
        showToast("Project updated successfully!", "success");
      } else {
        await createProject(payload);
        showToast("New project created successfully!", "success");
      }
      navigate('/admin/projects');
    } catch (err) {
      console.error("Save project error:", err);
      showToast("Failed to save project. Check field data sizes.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
        Loading project data...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/admin/projects"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc' }}>
              {isEditing ? `Edit: ${formData.title || 'Project'}` : 'Create New Project Case Study'}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Build a complete, conversion-focused project showcase with compressed Base64 media.
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="btn-primary"
          style={{ padding: '0.75rem 1.75rem', opacity: saving ? 0.7 : 1 }}
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Project'}
        </button>
      </div>

      {mediaError && (
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fb7185',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{mediaError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Section 1: Basic Information */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            1. Basic Project Identity
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label-custom">Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. ApexPay: Enterprise Razorpay Gateway & Dynamic QR Engine"
                className="input-custom"
                required
              />
            </div>

            <div>
              <label className="label-custom">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. apexpay-razorpay-gateway"
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Primary Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-custom"
              >
                {PORTFOLIO_CATEGORIES.filter(c => c.slug !== 'all').map(c => (
                  <option key={c.slug} value={c.slug} style={{ background: '#161616' }}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-custom">Sub-Category / Badge</label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                placeholder="e.g. AI Automation & WhatsApp Bot"
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Target Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g. Fintech & E-Commerce"
                className="input-custom"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Media Management (Zero Firebase Storage) */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              2. Media Management (Compressed WebP Base64)
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#00f2fe', background: 'rgba(0, 242, 254, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
              Max {formatBytes(MAX_SAFE_IMAGE_BYTES)} per item
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Primary Cover Image */}
            <div>
              <label className="label-custom">Primary Cover Image (WebP Auto-Compress)</label>
              <div
                style={{
                  border: '2px dashed rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  background: 'rgba(15, 23, 42, 0.5)',
                  position: 'relative'
                }}
              >
                {formData.imageData ? (
                  <div>
                    <img
                      src={formData.imageData}
                      alt="Cover Preview"
                      style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }}
                    />
                    {imageMetrics && (
                      <div style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: '0.75rem' }}>
                        Compressed: {formatBytes(imageMetrics.compressedSize)} (from {formatBytes(imageMetrics.originalSize)})
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, imageData: '' }));
                        setImageMetrics(null);
                      }}
                      style={{
                        background: 'rgba(244, 63, 94, 0.15)',
                        border: '1px solid #f43f5e',
                        color: '#fb7185',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      Remove Cover
                    </button>
                  </div>
                ) : (
                  <div>
                    <UploadCloud size={36} color="#00f2fe" style={{ margin: '0 auto 0.5rem', opacity: 0.8 }} />
                    <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600, marginBottom: '0.25rem' }}>
                      Click to upload cover image
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>
                      PNG, JPG, WEBP (Auto-resized to max 1280px WebP)
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Short Preview Video */}
            <div>
              <label className="label-custom">Short Promotional Video (Optional, max 30s / 700KB)</label>
              <div
                style={{
                  border: '2px dashed rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  background: 'rgba(15, 23, 42, 0.5)',
                  position: 'relative'
                }}
              >
                {formData.videoData ? (
                  <div>
                    <video
                      src={formData.videoData}
                      controls
                      style={{ width: '100%', maxHeight: '160px', borderRadius: '8px', marginBottom: '0.75rem' }}
                    />
                    {videoMetrics && (
                      <div style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: '0.75rem' }}>
                        Size: {formatBytes(videoMetrics.size)} | Duration: {videoMetrics.duration}s
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, videoData: '' }));
                        setVideoMetrics(null);
                      }}
                      style={{
                        background: 'rgba(244, 63, 94, 0.15)',
                        border: '1px solid #f43f5e',
                        color: '#fb7185',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      Remove Video
                    </button>
                  </div>
                ) : (
                  <div>
                    <Video size={36} color="#818cf8" style={{ margin: '0 auto 0.5rem', opacity: 0.8 }} />
                    <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600, marginBottom: '0.25rem' }}>
                      Attach short promo clip
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>
                      MP4 / WEBM under 700 KB (Strict limit)
                    </div>
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      onChange={handleVideoUpload}
                      style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Screenshots Gallery */}
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <label className="label-custom" style={{ margin: 0 }}>Gallery Screenshots</label>
              <label
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  color: '#00f2fe',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Plus size={14} /> Add Screenshots
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {formData.galleryImages.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '0.85rem', fontStyle: 'italic' }}>
                No extra screenshots added.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                {formData.galleryImages.map((img, idx) => (
                  <div key={idx} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <img src={img} alt={`Gallery ${idx}`} style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, galleryImages: prev.galleryImages.filter((_, i) => i !== idx) }))}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: '#fb7185',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Deep Dive Case Study Content */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            3. Case Study & Architecture Narrative
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className="label-custom">Short Summary (Featured card description) *</label>
              <textarea
                name="shortDescription"
                rows={2}
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="1-2 sentences summarizing the project impact and technology..."
                className="input-custom"
                required
              />
            </div>

            <div>
              <label className="label-custom">The Problem (Client Friction & Pain Points)</label>
              <textarea
                name="problem"
                rows={3}
                value={formData.problem}
                onChange={handleChange}
                placeholder="What challenges or manual bottlenecks was the client facing before this project?"
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">The Engineered Solution</label>
              <textarea
                name="solution"
                rows={3}
                value={formData.solution}
                onChange={handleChange}
                placeholder="How did you architect and implement the technical solution?"
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Technical Implementation & Architecture</label>
              <textarea
                name="technicalImplementation"
                rows={4}
                value={formData.technicalImplementation}
                onChange={handleChange}
                placeholder="Key technical decisions, database schema, webhook flows, security rules..."
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Engineering Challenges Overcome</label>
              <textarea
                name="challenges"
                rows={3}
                value={formData.challenges}
                onChange={handleChange}
                placeholder="What complex technical hurdles did you solve during execution?"
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Business Results & Measurable Outcome</label>
              <textarea
                name="results"
                rows={3}
                value={formData.results}
                onChange={handleChange}
                placeholder="e.g. 280% increase in qualified leads, 0.7s page load time, ₹40L+ monthly processed..."
                className="input-custom"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Technologies, Features & Contribution */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            4. Stack, Features & Contributions
          </h2>

          {/* Technology Tags */}
          <div style={{ marginBottom: '2rem' }}>
            <label className="label-custom">Technology Stack Tags</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                placeholder="Type tech name and press Enter (e.g. React.js, Razorpay, OpenAI)"
                className="input-custom"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="btn-secondary"
                style={{ padding: '0.75rem 1.25rem', flexShrink: 0 }}
              >
                Add Tag
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {formData.technologies.map(tech => (
                <span
                  key={tech}
                  className="badge-tech"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.65rem' }}
                >
                  {tech}
                  <X
                    size={13}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveTech(tech)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Key Features Array */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <label className="label-custom" style={{ margin: 0 }}>Core Features Checklist</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('features')}
                style={{ background: 'none', border: 'none', color: '#00f2fe', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Plus size={14} /> Add Feature Bullet
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {formData.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleArrayChange('features', idx, e.target.value)}
                    placeholder={`Feature item #${idx + 1}`}
                    className="input-custom"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('features', idx)}
                      style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer', padding: '0 0.5rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contribution Array */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <label className="label-custom" style={{ margin: 0 }}>My Specific Contribution</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('contribution')}
                style={{ background: 'none', border: 'none', color: '#00f2fe', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Plus size={14} /> Add Contribution
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {formData.contribution.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('contribution', idx, e.target.value)}
                    placeholder={`Contribution item #${idx + 1}`}
                    className="input-custom"
                  />
                  {formData.contribution.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('contribution', idx)}
                      style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer', padding: '0 0.5rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section 5: URLs, Publishing & Sort Order */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            5. Links, Visibility & Sorting
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
            <div>
              <label className="label-custom">Live Website URL</label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://clientwebsite.com"
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Demo URL</label>
              <input
                type="url"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                placeholder="https://demo.adityajamdade.com"
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">GitHub / Source URL (Optional)</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="input-custom"
              />
            </div>

            <div>
              <label className="label-custom">Sort Order (Lower numbers show first)</label>
              <input
                type="number"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleChange}
                className="input-custom"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', color: '#f8fafc', fontWeight: 600 }}>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', accentColor: '#00f2fe' }}
              />
              Show in Featured Section on Homepage
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', color: '#f8fafc', fontWeight: 600 }}>
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', accentColor: '#10b981' }}
              />
              Published (Visible to Public Visitors)
            </label>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Link to="/admin/projects" className="btn-secondary" style={{ padding: '0.85rem 1.8rem' }}>
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ padding: '0.85rem 2.2rem', opacity: saving ? 0.7 : 1 }}
          >
            <Save size={16} /> {saving ? 'Saving Project...' : isEditing ? 'Update Project' : 'Create Project'}
          </button>
        </div>

      </form>
    </div>
  );
}
