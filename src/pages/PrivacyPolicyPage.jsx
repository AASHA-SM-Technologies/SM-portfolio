import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { useSite } from '../context/SiteContext';
import { Analytics } from '../services/analyticsService';
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Server,
  Globe,
  Cookie,
  UserCheck,
  Building,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Calendar,
  ArrowLeft,
  FileText
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { siteConfig } = useSite();

  useEffect(() => {
    Analytics.pageView('PrivacyPolicy');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const companyName = siteConfig?.name || 'AASHA-SM Technologies Private Limited';
  const companyEmail = siteConfig?.email || 'adminsmtechsolution@gmail.com';
  const companyPhone = siteConfig?.phone || siteConfig?.whatsapp || '+91 95299 98320';
  const companyLocation = siteConfig?.location || 'Sangli / Pune / Mumbai, Maharashtra, India';

  return (
    <div className="legal-page-wrapper" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <SEO
        title="Privacy Policy"
        description={`Privacy Policy of ${companyName}. Learn how we collect, use, and protect your information when visiting our portfolio website or submitting project inquiries.`}
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
            <ShieldCheck size={14} /> Privacy & Data Protection
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
            Privacy Policy
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
            <strong>{companyName}</strong> values your privacy. This Privacy Policy outlines our transparent data practices when you visit our website, review our software portfolio, or communicate with our engineering and business development team.
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
          <Lock size={22} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
              Our Commitment to Data Privacy
            </strong>
            We do not sell, rent, or trade your personal information. Any details you provide through our contact forms or email are used strictly to evaluate your software requirements, respond to inquiries, and deliver professional technology services.
          </div>
        </aside>

        {/* Policy Content Sections */}
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>1.</span> Introduction & Scope
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                This Privacy Policy explains how <strong>{companyName}</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, processes, stores, and protects personal information when you access our official portfolio website, communicate with us via phone, email, or WhatsApp, or submit business inquiry forms.
              </p>
              <p style={{ margin: 0 }}>
                This policy applies to data collected through this website and direct communications initiated from it. It does not apply to third-party software products, client applications, or external services that may be linked or referenced on our pages.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section
            id="information-we-collect"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>2.</span> Information We May Collect
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '1rem' }}>
                We collect only the information necessary to fulfill your requests, answer inquiries, and ensure the reliable performance of our website. This includes:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
                    A. Voluntarily Submitted Information
                  </strong>
                  When you submit our project inquiry form or contact form, you may provide:
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
                    <li>Full Name and Company or Organization name</li>
                    <li>Email address and Telephone/WhatsApp number</li>
                    <li>Selected requirement categories (e.g., Website, ERP, Payments, AI Automations)</li>
                    <li>Project budget range, estimated delivery timeline, and project description</li>
                  </ul>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
                    B. Direct Communications
                  </strong>
                  When you reach out directly via email (<a href={`mailto:${companyEmail}`} style={{ color: 'var(--text-highlight)' }}>{companyEmail}</a>) or WhatsApp (<a href={`tel:${companyPhone.replace(/\s+/g, '')}`} style={{ color: 'var(--text-highlight)' }}>{companyPhone}</a>), we collect the contact identifiers, message content, and attachments you choose to share with us.
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
                    C. Technical & Diagnostic Information
                  </strong>
                  When you browse our website, our hosting provider (Vercel) and backend infrastructure (Google Firebase) automatically collect standard technical logs, such as your IP address, browser type, operating system, referrer URL, and access timestamps for diagnostic and security purposes.
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.25rem' }}>
                    D. Aggregated Analytics & Usage Metrics
                  </strong>
                  Where supported by your browser and not blocked by tracking protection, we utilize Firebase Analytics (Google Analytics measurement) to collect aggregated, de-identified usage metrics (such as page views, section views, and button clicks) to help us improve user experience and interface performance.
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                We do not collect sensitive personal data such as financial account credentials, biometric information, government IDs, or health information through this website.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section
            id="how-we-use-information"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>3.</span> How We Use Your Information
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                We process your personal information exclusively for lawful, specified business purposes, including:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0 0 1rem 0' }}>
                <li><strong>Responding to Inquiries:</strong> Reviewing your business requirements and providing technical consultation, project roadmaps, and pricing proposals.</li>
                <li><strong>Direct Client Communication:</strong> Coordinating project meetings, clarifying technical specifications, and following up on submitted messages.</li>
                <li><strong>Website Functionality & Security:</strong> Detecting, preventing, and addressing technical glitches, cyber threats, malicious requests, or unauthorized system access.</li>
                <li><strong>Service Improvement:</strong> Evaluating aggregated usage patterns to enhance website responsiveness, optimize design layouts, and maintain mobile accessibility.</li>
                <li><strong>Legal Compliance:</strong> Complying with applicable statutory records retention and regulatory obligations under Indian law.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section
            id="legal-basis"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>4.</span> Legal Basis for Processing
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                Under applicable Indian laws—including the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023 (DPDPA)—our processing of your personal information is grounded in the following lawful bases:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0 }}>
                <li><strong>Consent:</strong> Provided when you freely choose to submit your contact details and project details through our website inquiry forms or contact mechanisms.</li>
                <li><strong>Legitimate Uses / Pre-Contractual Steps:</strong> Taking necessary preliminary steps at your request prior to entering into a formal software development contract or service agreement.</li>
                <li><strong>Compliance with Legal Obligations:</strong> When processing is necessary to meet statutory recordkeeping or lawful government requests under Indian legislation.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section
            id="cookies"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>5.</span> Cookies, Local Storage & Similar Technologies
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                We believe in transparency regarding client-side storage technologies used on our website:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1.15rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Browser Local Storage (<code style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>portfolio_theme</code>):</strong>
                  <div style={{ marginTop: '0.25rem', fontSize: '0.92rem' }}>
                    We store your selected visual theme preference (Light or Dark mode) locally in your browser. This data remains on your device and is not transmitted to our servers.
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1.15rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Analytics Identifiers (Firebase Analytics):</strong>
                  <div style={{ marginTop: '0.25rem', fontSize: '0.92rem' }}>
                    Firebase Analytics may place first-party diagnostic cookies or pseudonymous identifiers to distinguish unique browser sessions and compute aggregated website visit statistics.
                  </div>
                </div>
              </div>
              <p style={{ margin: 0 }}>
                You can manage, restrict, or clear cookies and local storage through your browser settings at any time. Disabling cookies will not affect your ability to browse our portfolio or submit business inquiries.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section
            id="sharing-of-information"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>6.</span> Sharing & Disclosure of Information
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                <strong>We do not sell, rent, lease, or commercially trade your personal data to any third parties for advertising or marketing purposes.</strong>
              </p>
              <p style={{ marginBottom: '0.85rem' }}>
                We share information strictly on a need-to-know basis with trusted service providers who help us operate our website:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0 0 1rem 0' }}>
                <li><strong>Cloud Infrastructure Providers:</strong> Google Cloud / Firebase (database storage and serverless APIs) and Vercel Inc. (web application hosting and content delivery).</li>
                <li><strong>Form Dispatch Utilities:</strong> FormSubmit API for direct notification delivery of inquiries to our administrative inbox.</li>
                <li><strong>Legal & Regulatory Authorities:</strong> We may disclose information if required to do so by applicable law, court order, or official governmental request under Indian jurisdiction.</li>
              </ul>
              <p style={{ margin: 0 }}>
                All technical providers are bound by strict data confidentiality agreements and are prohibited from using your data for any unauthorized purpose.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section
            id="data-retention"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>7.</span> Data Retention
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                We retain personal information only for as long as is reasonably necessary to fulfill the purposes for which it was collected, including:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0 0 1rem 0' }}>
                <li>Evaluating project inquiries, communicating proposals, and conducting follow-up discussions.</li>
                <li>Managing active contractual engagements and post-launch technical warranty periods.</li>
                <li>Satisfying legal, accounting, tax, or regulatory recordkeeping requirements under applicable Indian law.</li>
              </ul>
              <p style={{ margin: 0 }}>
                When personal information is no longer required for legitimate business or legal purposes, it is securely deleted or anonymized.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section
            id="data-security"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>8.</span> Data Security Safeguards
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                We implement industry-standard administrative, physical, and technical safeguards to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These safeguards include:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0 0 1rem 0' }}>
                <li>Full HTTPS / TLS encryption across all website pages and form submissions.</li>
                <li>Granular Firestore Security Rules restricting database read/write permissions to authenticated administrators.</li>
                <li>Security headers including X-Content-Type-Options, X-Frame-Options, and XSS Protection.</li>
                <li>Multi-factor authentication (MFA) and strict access controls for administrative portals.</li>
              </ul>
              <p style={{ margin: 0 }}>
                While we employ robust security measures, please note that no method of electronic storage or transmission over the Internet can be guaranteed to be 100% infallible.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section
            id="external-websites"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>9.</span> External Websites & Social Media
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ margin: 0 }}>
                Our website includes links to third-party platforms such as LinkedIn, Instagram, Facebook, X, GitHub, and client production sites. We also offer a direct WhatsApp chat trigger. When you interact with these external services, their respective privacy policies and terms of service apply. We encourage you to review their policies prior to sharing personal information on those platforms.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section
            id="user-rights"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>10.</span> Your Rights & Privacy Requests
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '0.85rem' }}>
                Under applicable data protection legislation (including the Digital Personal Data Protection Act, 2023), you have rights regarding your personal information:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0 0 1rem 0' }}>
                <li><strong>Right to Access / Summary:</strong> You may request a summary of the personal data we hold about you and how it has been processed.</li>
                <li><strong>Right to Correction / Updating:</strong> You may request correction or updating of any inaccurate, incomplete, or outdated information.</li>
                <li><strong>Right to Erasure:</strong> You may request deletion of your personal data when it is no longer required for the purpose for which it was collected, subject to statutory recordkeeping requirements.</li>
                <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw your consent at any time without affecting the lawfulness of processing undertaken prior to withdrawal.</li>
              </ul>
              <p style={{ margin: 0 }}>
                To exercise any of these rights, please email us at <a href={`mailto:${companyEmail}`} style={{ color: 'var(--text-highlight)', textDecoration: 'none' }}>{companyEmail}</a> with the subject line &quot;Data Privacy Request&quot;. We will review and respond to verified requests within a reasonable timeframe.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section
            id="childrens-privacy"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>11.</span> Children&apos;s Privacy
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ margin: 0 }}>
                Our website is designed for general business, commercial, and professional audiences. We do not knowingly solicit or collect personal information from individuals under the age of 18. If you believe that a minor has submitted personal information through our contact channels, please contact us immediately, and we will take prompt steps to delete such data.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section
            id="international-transfers"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>12.</span> International Data Transfers
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ margin: 0 }}>
                Our website is hosted using global cloud services (including Vercel edge networks and Google Cloud infrastructure). When you access our website, technical server logs and website assets may be transmitted through secure data centers located in regions outside India in compliance with recognized international data transfer safeguards and applicable Indian regulations.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section
            id="changes-to-policy"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>13.</span> Changes to This Privacy Policy
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ margin: 0 }}>
                We may revise this Privacy Policy periodically to reflect enhancements to our technical stack, service offerings, or evolving data privacy regulations. Any updates will be published directly on this page with a revised &quot;Effective Date&quot; at the top. We encourage you to review this policy periodically.
              </p>
            </div>
          </section>

          {/* Section 14 - Contact */}
          <section
            id="privacy-contact"
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
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>14.</span> Privacy Contact Information
            </h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.75 }}>
              <p style={{ marginBottom: '1.25rem' }}>
                For any questions, clarifications, or requests concerning this Privacy Policy or our data protection practices, please contact us at:
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
                    Entity
                  </div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{companyName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Software & Digital Solutions Studio</div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                    Privacy Inquiries Email
                  </div>
                  <a href={`mailto:${companyEmail}`} style={{ color: 'var(--text-highlight)', fontWeight: 600, textDecoration: 'none' }}>
                    {companyEmail}
                  </a>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Responses within 2 business days</div>
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
                    Locations
                  </div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{companyLocation}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Maharashtra, India</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                  Contact Us
                </Link>
                <Link to="/terms-and-conditions" className="btn-secondary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                  <FileText size={16} /> View Terms & Conditions
                </Link>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
