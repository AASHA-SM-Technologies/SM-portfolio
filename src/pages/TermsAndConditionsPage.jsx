import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { useSite } from '../context/SiteContext';
import { Analytics } from '../services/analyticsService';
import {
  FileText,
  ShieldCheck,
  Scale,
  Building,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ArrowLeft
} from 'lucide-react';

export default function TermsAndConditionsPage() {
  const { siteConfig } = useSite();

  useEffect(() => {
    Analytics.pageView('TermsAndConditions');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const companyName = siteConfig?.name || 'AASHA-SM Technologies Private Limited';
  const companyEmail = siteConfig?.email || 'adminsmtechsolution@gmail.com';
  const companyPhone = siteConfig?.phone || siteConfig?.whatsapp || '+91 95299 98320';
  const companyLocation = siteConfig?.location || 'Sangli / Pune / Mumbai, Maharashtra, India';

  return (
    <div className="legal-page-wrapper" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <SEO
        title="Terms & Conditions"
        description={`Terms and Conditions governing the use of ${companyName}'s official portfolio website and digital services showcase.`}
      />

      <div className="container-custom" style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Breadcrumb / Back link */}
        <div style={{ marginBottom: '1.75rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--text-muted)',
              fontSize: '0.88rem',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-highlight)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <header style={{ marginBottom: '3rem', textAlign: 'left' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--accent-cyan)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.85rem',
              background: 'var(--badge-tech-bg)',
              border: '1px solid var(--border-glow)',
              padding: '0.35rem 0.85rem',
              borderRadius: '8px'
            }}
          >
            <Scale size={14} /> Legal & Compliance
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.1rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '1rem'
            }}
          >
            Terms & Conditions
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              color: 'var(--text-muted)',
              fontSize: '0.88rem',
              marginBottom: '1.5rem'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={15} /> Effective Date: October 14, 2026
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Building size={15} /> {companyName}
            </span>
          </div>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.02rem',
              lineHeight: 1.7,
              margin: 0
            }}
          >
            Please read these Terms & Conditions carefully before using or interacting with this website. By accessing or using this website, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
        </header>

        {/* Highlight Callout */}
        <aside
          aria-label="Summary Callout"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderLeft: '4px solid var(--accent-cyan)',
            borderRadius: 'var(--radius-md)',
            padding: '1.35rem 1.6rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <AlertCircle size={22} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
              Quick Summary for Prospective Clients & Visitors
            </strong>
            This website showcases our software engineering capabilities, completed projects, and technology services. Contacting us through this website initiates an inquiry and does not create an automatic contract. Commercial software engagements are governed by separate, mutually agreed project contracts.
          </div>
        </aside>

        {/* Legal Content Sections */}
        <article
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            color: 'var(--text-main)'
          }}
        >
          {/* Section 1 */}
          <section
            id="introduction"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>1.</span> Introduction
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the official website and portfolio of <strong>{companyName}</strong> (also referred to as &quot;AASHA-SM Technologies&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
              <p style={{ margin: 0 }}>
                By accessing, browsing, reviewing project case studies, or submitting inquiries through this website, you confirm your acceptance of these Terms. If you do not agree with any part of these Terms, you must discontinue your use of this website immediately.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section
            id="acceptance"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>2.</span> Acceptance of Terms
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                Your continued access and use of this website constitutes your agreement to comply with and be bound by these Terms, along with our <Link to="/privacy-policy" style={{ color: 'var(--text-highlight)', textDecoration: 'underline' }}>Privacy Policy</Link>, which is incorporated herein by reference.
              </p>
              <p style={{ margin: 0 }}>
                If you are accessing this website on behalf of a company, organization, or other legal entity, you represent and warrant that you have the requisite authority to bind such entity to these Terms.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section
            id="company-information"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>3.</span> Company Information
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '1rem' }}>
                This website is owned and operated by:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <Building size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Entity:</strong> {companyName}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <MapPin size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Operating Locations:</strong> {companyLocation}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <Mail size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Official Email:</strong> <a href={`mailto:${companyEmail}`} style={{ color: 'var(--text-highlight)', textDecoration: 'none' }}>{companyEmail}</a></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <Phone size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Phone & WhatsApp:</strong> <a href={`tel:${companyPhone.replace(/\s+/g, '')}`} style={{ color: 'var(--text-highlight)', textDecoration: 'none' }}>{companyPhone}</a></span>
                </li>
              </ul>
              <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-dim)' }}>
                We provide full-stack software development, custom web applications, Razorpay payment flows, WhatsApp Cloud API integrations, business ERP systems, and AI automation workflows to modern businesses globally.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section
            id="website-purpose"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>4.</span> Website Purpose
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ margin: 0 }}>
                The purpose of this website is to provide prospective clients, partners, and visitors with accurate information about our capabilities, technical competencies, portfolio of completed software solutions, engineering disciplines, and direct business contact channels.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section
            id="permitted-use"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>5.</span> Permitted Use & Prohibited Activities
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                You are granted a limited, revocable, non-exclusive, non-transferable license to view and navigate this website for legitimate business evaluation and direct communication purposes.
              </p>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                When using this website, you agree that you will NOT:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0 0 1rem 0' }}>
                <li>Engage in any unlawful, fraudulent, defamatory, or malicious activity.</li>
                <li>Attempt to gain unauthorized access to our server infrastructure, administrative portal (<code style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)' }}>/admin</code>), backend Firestore database, or connected network systems.</li>
                <li>Deploy automated scrapers, bots, crawlers, or data-mining utilities to extract code, design assets, or database contents without express written consent.</li>
                <li>Introduce viruses, trojans, worms, logic bombs, or other technologically harmful materials.</li>
                <li>Interfere with or disrupt the normal operation, integrity, or performance of the website or its security mechanisms.</li>
                <li>Submit fabricated, fraudulent, or unsolicited commercial messages (spam) through our inquiry forms.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section
            id="intellectual-property"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>6.</span> Intellectual Property Rights
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                All content published on this website—including but not limited to source code, website layout, graphic designs, typography configurations, interactive components, text copy, brand identity, and custom illustrations—is the proprietary property of <strong>{companyName}</strong> or its licensors, protected by applicable copyright, trademark, and intellectual property laws of India and international treaties.
              </p>
              <p style={{ marginBottom: '0.85rem' }}>
                Third-party brand names, logos, client trademarks, and technology badges (such as React, Firebase, Razorpay, or Google Cloud) featured in portfolio demonstrations or skill sets remain the property of their respective trademark holders and are referenced purely for informational and descriptive purposes.
              </p>
              <p style={{ margin: 0 }}>
                You may not copy, reproduce, duplicate, sell, republish, alter, or exploit any portion of this website or its original designs for commercial purposes without explicit, prior written authorization from {companyName}.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section
            id="third-party-links"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>7.</span> Third-Party Links & External Platforms
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                This website contains links to external websites, social media profiles (including LinkedIn, Instagram, Facebook, X, and GitHub), and live client demonstrations. These links are provided solely for your convenience and verification.
              </p>
              <p style={{ margin: 0 }}>
                We have no control over the content, security policies, privacy practices, or operations of external third-party websites. Inclusion of any external link does not imply endorsement or warranty by {companyName}. You access external sites at your own risk.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section
            id="business-inquiries"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>8.</span> Business Inquiries & Commercial Proposals
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                Visitors are encouraged to contact us regarding project inquiries, technical consulting, software architecture, and development services through our contact form, email, or WhatsApp chat.
              </p>
              <p style={{ marginBottom: '0.85rem' }}>
                Submitting a requirement or receiving an initial response, estimation, or proposal does <strong>not</strong> constitute a binding contract or establish a client-agency relationship.
              </p>
              <p style={{ margin: 0 }}>
                Any commercial software development project, deliverable schedule, intellectual property assignment, milestone payment schedule, and warranty will be governed exclusively by a separate, formal written Master Services Agreement (MSA) or Statement of Work (SOW) executed between {companyName} and the client.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section
            id="disclaimer"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>9.</span> Disclaimer of Warranties
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                The information, case studies, materials, and services presented on this website are provided on an &quot;as is&quot; and &quot;as available&quot; basis for general informational and demonstration purposes.
              </p>
              <p style={{ marginBottom: '0.85rem' }}>
                While we make reasonable efforts to maintain accurate, up-to-date, and error-free content, {companyName} makes no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or availability of the website or the information contained herein.
              </p>
              <p style={{ margin: 0 }}>
                Past performance, case study metrics, or portfolio achievements described on this website do not guarantee identical or specific business outcomes for future projects. Every software engineering project is subject to its unique specifications, scope, and technical requirements.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section
            id="limitation-of-liability"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>10.</span> Limitation of Liability
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                To the fullest extent permitted by applicable law, in no event shall {companyName}, its directors, officers, employees, agents, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages—including without limitation loss of profits, loss of data, business interruption, or system downtime—arising out of or in connection with your access to, use of, or inability to use this website.
              </p>
              <p style={{ margin: 0 }}>
                Nothing in these Terms purports to exclude or limit any statutory rights or consumer protections that cannot be lawfully excluded or limited under applicable Indian legislation.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section
            id="changes-to-terms"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>11.</span> Changes to These Terms
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                We reserve the right to revise, update, or modify these Terms & Conditions at our discretion to reflect changes in our service offerings, technical practices, or applicable laws.
              </p>
              <p style={{ margin: 0 }}>
                Whenever changes are made, the revised version will be published on this page with an updated &quot;Effective Date&quot; at the top. We encourage visitors to review this page periodically to remain informed about our governing terms.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section
            id="governing-law"
            className="glass-panel"
            style={{ padding: '2rem 2.25rem' }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>12.</span> Governing Law & Dispute Resolution
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ margin: 0 }}>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of <strong>India</strong>, without regard to conflict of law principles. Any legal inquiry, dispute, or proceeding arising under or in relation to this website shall be addressed under the applicable laws and judicial framework of India.
              </p>
            </div>
          </section>

          {/* Section 13 - Contact */}
          <section
            id="contact-information"
            className="glass-panel"
            style={{
              padding: '2.25rem',
              border: '1px solid var(--border-glow)',
              background: 'var(--bg-card)'
            }}
          >
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>13.</span> Contact Information
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '1.25rem' }}>
                If you have questions, feedback, or legal inquiries concerning these Terms & Conditions, please contact us using the verified details below:
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ background: 'var(--bg-surface)', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                    Company Name
                  </div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{companyName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Software & Digital Solutions Studio</div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                    Business Inquiries
                  </div>
                  <a href={`mailto:${companyEmail}`} style={{ color: 'var(--text-highlight)', fontWeight: 600, textDecoration: 'none' }}>
                    {companyEmail}
                  </a>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Direct inbox response</div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                    Phone & WhatsApp
                  </div>
                  <a href={`tel:${companyPhone.replace(/\s+/g, '')}`} style={{ color: 'var(--text-highlight)', fontWeight: 600, textDecoration: 'none' }}>
                    {companyPhone}
                  </a>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Monday – Saturday, Business Hours</div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                    Location
                  </div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{companyLocation}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Maharashtra, India</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                  Open Inquiry Form
                </Link>
                <Link to="/privacy-policy" className="btn-secondary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                  <ShieldCheck size={16} /> View Privacy Policy
                </Link>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
