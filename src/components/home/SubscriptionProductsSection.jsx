import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import {
  Package,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function SubscriptionProductsSection() {
  const { openInquiryModal } = useSite();
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly, quarterly, yearly

  const plans = [
    {
      name: "Starter / Single Branch",
      monthly: "₹2,499",
      quarterly: "₹6,499",
      yearly: "₹23,999",
      desc: "Ideal for individual clinics, boutique retailers, or emerging consulting practices.",
      features: [
        "Up to 3 Admin / Staff Accounts",
        "Automated WhatsApp Lead Notifications",
        "Razorpay Dynamic UPI QR Checkout",
        "Firestore Cloud Database with Auto-backup",
        "Standard Email & WhatsApp Support"
      ]
    },
    {
      name: "Professional / Multi-User",
      monthly: "₹4,999",
      quarterly: "₹12,999",
      yearly: "₹47,999",
      popular: true,
      desc: "For growing businesses requiring multi-branch scheduling, inventory, and role permissions.",
      features: [
        "Unlimited Staff & Manager Accounts",
        "AI WhatsApp Conversational Bot",
        "Multi-Branch ERP & Inventory Sync",
        "Custom Domain & Whitelabel Branding",
        "Priority 24/7 Incident Support",
        "Automated PDF Invoicing & GST Accounting"
      ]
    },
    {
      name: "Custom Enterprise SaaS",
      monthly: "Custom",
      quarterly: "Custom",
      yearly: "Custom",
      desc: "Tailor-made software built specifically to match your exact internal business workflows.",
      features: [
        "100% Dedicated Custom Architecture",
        "Complete Source Code Ownership",
        "Custom LLM / OpenAI Model Fine-Tuning",
        "Direct Slack / WhatsApp Support Channel",
        "SLA Guarantee & Infrastructure Maintenance"
      ]
    }
  ];

  return (
    <section style={{ padding: '6rem 0', background: 'var(--bg-section-alt)', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <Package size={14} /> SaaS & Subscription Platforms
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Turnkey Subscription Software & Products
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            Ready-to-deploy business software modules with automated recurring billing, customer self-service portals, and full technical maintenance included.
          </p>
        </div>

        {/* Billing Cycle Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-medium)',
              borderRadius: '9999px',
              padding: '0.35rem'
            }}
          >
            {[
              { key: 'monthly', label: 'Monthly' },
              { key: 'quarterly', label: 'Quarterly (Save 15%)' },
              { key: 'yearly', label: 'Yearly (Save 25%)' }
            ].map((cycle) => (
              <button
                key={cycle.key}
                onClick={() => setBillingCycle(cycle.key)}
                style={{
                  background: billingCycle === cycle.key ? 'var(--gradient-primary)' : 'transparent',
                  color: billingCycle === cycle.key ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cycle.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch'
          }}
        >
          {plans.map((plan, idx) => {
            const price = plan[billingCycle];
            return (
              <div
                key={idx}
                className={plan.popular ? 'glass-card-glow' : 'glass-panel'}
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: plan.popular ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)',
                  boxShadow: plan.popular ? 'var(--shadow-glow)' : 'none'
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'var(--gradient-primary)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    {plan.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem', minHeight: '40px' }}>
                    {plan.desc}
                  </p>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '1.75rem' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {price}
                    </span>
                    {price !== 'Custom' && (
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                        /{billingCycle === 'monthly' ? 'mo' : billingCycle === 'quarterly' ? 'quarter' : 'year'}
                      </span>
                    )}
                  </div>

                  {/* Feature Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    {plan.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        <CheckCircle2 size={16} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openInquiryModal({
                    requirementType: `Subscription Product (${plan.name})`,
                    sourcePage: `Pricing Tier: ${plan.name}`
                  })}
                  className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', padding: '0.8rem' }}
                >
                  {plan.name.includes('Custom') ? 'Discuss Custom Build' : 'Deploy This Solution'}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
