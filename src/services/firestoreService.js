import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

// -------------------------------------------------------------
// DEFAULT CATEGORIES (11 Main Portfolio Categories)
// -------------------------------------------------------------
export const PORTFOLIO_CATEGORIES = [
  { id: 'all', name: 'All Categories', slug: 'all' },
  { id: 'websites', name: 'Websites', slug: 'websites' },
  { id: 'software', name: 'Software', slug: 'software' },
  { id: 'applications', name: 'Applications', slug: 'applications' },
  { id: 'payment', name: 'Payment Gateway Integrations', slug: 'payment' },
  { id: 'whatsapp-api', name: 'WhatsApp API / Business API', slug: 'whatsapp-api' },
  { id: 'technical-support', name: 'Technical Support', slug: 'technical-support' },
  { id: 'gmb', name: 'Google Business Profile / GMB', slug: 'gmb' },
  { id: 'ai-automations', name: 'AI Automations', slug: 'ai-automations' },
  { id: 'technical-knowledge', name: 'Technical Knowledge', slug: 'technical-knowledge' },
  { id: 'subscription-products', name: 'Subscription-Based Products', slug: 'subscription-products' },
  { id: 'custom-solutions', name: 'Other Custom Digital Solutions', slug: 'custom-solutions' }
];

// -------------------------------------------------------------
// SITE SETTINGS SERVICE
// -------------------------------------------------------------
const DEFAULT_SITE_CONFIG = {
  name: "AASHA-SM Technologies Pvt Ltd",
  title: "Software & Digital Solutions Studio",
  tagline: "Websites • Software • Applications • APIs • Payments • AI Automation • Digital Solutions",
  bio: "At AASHA-SM Technologies Pvt Ltd, we design, engineer, deploy, and scale high-performance digital solutions for modern businesses. From modern conversion-focused websites and bespoke ERP software to AI automations, Razorpay payment pipelines, WhatsApp Cloud APIs, and reliable technical infrastructure.",
  email: "adminsmtechsolution@gmail.com",
  phone: "+91 95299 98320",
  whatsapp: "+91 95299 98320",
  location: "Sangli / Pune / Mumbai, India (Serving Clients Globally)",
  profileImage: "",
  resumeUrl: "#",
  linkedinUrl: "https://linkedin.com",
  githubUrl: "https://github.com",
  calendlyUrl: "https://cal.com",
  seoTitle: "AASHA-SM Technologies Pvt Ltd | Full-Stack Software & Digital Solutions",
  seoDescription: "AASHA-SM Technologies Pvt Ltd is a premier software development studio delivering custom websites, web applications, Razorpay payment integrations, WhatsApp APIs, AI automations & technical support.",
  watermark: {
    enabled: true,
    text: "AASHA-SM Technologies Pvt Ltd",
    position: "bottom-right",
    opacity: 0.25,
    fontSize: 16
  }
};

export async function getSiteConfig() {
  try {
    const configDoc = await getDoc(doc(db, 'settings', 'siteConfig'));
    if (configDoc.exists()) {
      return { id: configDoc.id, ...configDoc.data() };
    }
    return DEFAULT_SITE_CONFIG;
  } catch (error) {
    console.error('Error fetching site config:', error);
    return DEFAULT_SITE_CONFIG;
  }
}

export async function updateSiteConfig(configData) {
  const configRef = doc(db, 'settings', 'siteConfig');
  await setDoc(configRef, {
    ...configData,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

// -------------------------------------------------------------
// DEFAULT SHOWCASE PROJECTS (Fallback & Seed Data)
// -------------------------------------------------------------
export const DEFAULT_PROJECTS = [
  {
    id: "omniflow-ai-lead-automation",
    title: "OmniFlow AI: Automated Lead Routing & WhatsApp Qualification",
    slug: "omniflow-ai-lead-automation",
    category: "ai-automations",
    subCategory: "AI Automation & WhatsApp Bot",
    industry: "Real Estate & High-Ticket Consulting",
    shortDescription: "End-to-end intelligent automation pipeline that captures web inquiries, qualifies prospects via WhatsApp AI, and alerts sales teams with instant summaries.",
    description: "Built a fully autonomous lead capture and qualification system. When a prospect submits an inquiry, an AI agent engages them over WhatsApp within 60 seconds, qualifies their budget, timeline, and requirement, updates Firestore CRM, and triggers instant SMS/WhatsApp alerts to the consultant.",
    problem: "The client was losing 45% of incoming prospective leads due to slow response times (often 4-12 hours) and manual qualification overhead.",
    solution: "Engineered an event-driven webhook pipeline connecting web forms, OpenAI API, and WhatsApp Cloud API. Automated real-time conversational qualification and instant CRM updates.",
    features: [
      "Sub-60s automated WhatsApp first-touch response",
      "Context-aware AI conversational qualification",
      "Real-time budget & timeline scoring",
      "Instant admin dashboard notification with conversation summary",
      "Automated calendar booking link dispatch"
    ],
    technologies: ["React.js", "Firebase Firestore", "WhatsApp Cloud API", "OpenAI API", "Webhooks", "Node.js"],
    contribution: [
      "Architected conversational state machine",
      "Integrated Meta WhatsApp Cloud API webhooks",
      "Developed live consultant monitoring dashboard",
      "Deployed bulletproof Firestore security rules"
    ],
    challenges: "Handling sporadic message delays and ensuring natural conversational flow while strictly maintaining qualification scoring parameters.",
    technicalImplementation: "Leveraged Firestore real-time listeners for live conversation updates and asynchronous webhook handlers for sub-second message dispatching.",
    results: "Lead qualification rate increased by 280%, while average response time plummeted from 6 hours to 42 seconds.",
    featured: true,
    published: true,
    sortOrder: 1,
    liveUrl: "https://example.com/demo/omniflow",
    demoUrl: "https://example.com/demo/omniflow"
  },
  {
    id: "apexpay-payment-gateway-solution",
    title: "ApexPay: Enterprise Razorpay Gateway & Dynamic QR Engine",
    slug: "apexpay-payment-gateway-solution",
    category: "payment",
    subCategory: "Payment Solutions",
    industry: "Fintech & E-Commerce",
    shortDescription: "Complete custom checkout, dynamic UPI QR generation, automated webhook signature verification, and instant digital receipt dispatch.",
    description: "Architected a high-reliability payment integration suite handling credit cards, net banking, UPI intent, and dynamically generated UPI QR codes for instant point-of-sale and online transactions.",
    problem: "Client experienced 18% dropped transactions due to clunky redirects and frequent webhook synchronization failures during network blips.",
    solution: "Implemented an inline modal checkout with cryptographic HMAC-SHA256 webhook validation, idempotency keys, and automated fallback verification checks.",
    features: [
      "Dynamic on-screen UPI QR Code generation with countdown timer",
      "Cryptographic webhook signature verification",
      "Automated failed transaction recovery and retry logic",
      "Instant PDF invoice generation and WhatsApp receipt dispatch",
      "Admin analytics dashboard for revenue & refund tracking"
    ],
    technologies: ["React.js", "Razorpay API", "Firebase Firestore", "CryptoJS", "Tailwind CSS", "PDFKit"],
    contribution: [
      "Engineered end-to-end checkout frontend & backend webhook endpoints",
      "Designed real-time payment status polling engine",
      "Built admin refund and transaction lookup portal"
    ],
    challenges: "Eliminating edge-case race conditions where customers closed browser tabs before client-side redirect completed.",
    technicalImplementation: "Configured resilient serverless webhook listeners that guarantee state consistency regardless of client browser lifecycle.",
    results: "Payment drop-off reduced to under 2.1%, processing over ₹40L+ monthly transaction volume flawlessly.",
    featured: true,
    published: true,
    sortOrder: 2,
    liveUrl: "https://example.com/demo/apexpay"
  },
  {
    id: "medixpro-clinic-management-software",
    title: "MedixPro: Clinic Management ERP & Patient Portal",
    slug: "medixpro-clinic-management-software",
    category: "software",
    subCategory: "Business Software",
    industry: "Healthcare & Clinics",
    shortDescription: "Comprehensive web application for multi-branch clinics with doctor scheduling, digital prescriptions, patient history, and automated SMS reminders.",
    description: "A centralized, multi-role clinical management suite streamlining doctor appointments, electronic health records (EHR), inventory tracking, and billing.",
    problem: "Paper-based record keeping led to scheduling conflicts, missed follow-ups, and disorganized billing across 3 clinic locations.",
    solution: "Designed and built a modular, ultra-responsive cloud ERP with role-based access for Receptionists, Doctors, Pharmacists, and Clinic Owners.",
    features: [
      "Interactive doctor appointment scheduling grid",
      "Digital prescription builder with drug database auto-suggest",
      "Automated appointment reminder notifications via SMS & WhatsApp",
      "Pharmacy inventory tracking with low-stock alerts",
      "Role-based permission security (RBAC)"
    ],
    technologies: ["React.js", "Firebase Firestore", "Firebase Auth", "Tailwind CSS", "Lucide React", "Chart.js"],
    contribution: [
      "Full-stack architecture from UI wireframes to production deployment",
      "Engineered offline-tolerant appointment syncing",
      "Implemented strict HIPAA/data security compliant access rules"
    ],
    challenges: "Ensuring near-instant search across 25,000+ patient records with complex filtering without degrading client-side performance.",
    technicalImplementation: "Utilized indexed Firestore query paths with normalized sub-collections and debounced memory caching.",
    results: "Patient wait times decreased by 40%, and missed appointments dropped from 22% to under 4%.",
    featured: true,
    published: true,
    sortOrder: 3,
    liveUrl: "https://example.com/demo/medixpro"
  },
  {
    id: "zenith-real-estate-portal",
    title: "Zenith Real Estate: Ultra-Fast High-Converting Web Platform",
    slug: "zenith-real-estate-portal",
    category: "websites",
    subCategory: "Website Development",
    industry: "Real Estate & Property Development",
    shortDescription: "Modern luxury property showcase with interactive map filtering, 360 virtual tour embeds, instant WhatsApp brochure download, and 98+ PageSpeed score.",
    description: "Developed a luxury real estate digital storefront designed specifically to generate high-intent buyer inquiries for residential developments.",
    problem: "Previous WordPress theme was sluggish (4.5s load time), non-responsive on mobile, and generated virtually zero direct inquiries.",
    solution: "Rebuilt from scratch with React, sub-second asset bundling, WebP image pipelines, and high-converting sticky lead capture widgets.",
    features: [
      "Dynamic property search with price, BHK, and location filters",
      "One-click WhatsApp brochure delivery gate",
      "Interactive floor plan viewer and video walkthrough integration",
      "Optimized Schema.org RealEstateAgent metadata for top SEO rankings",
      "Direct inquiry lead forwarding to CRM"
    ],
    technologies: ["React.js", "Firebase Firestore", "Vanilla CSS", "SEO Schema", "Vite"],
    contribution: [
      "Complete UI/UX design and responsive development",
      "Lighthouse performance optimization achieving 99/100 score",
      "Integrated dynamic lead-capture modal with source tracking"
    ],
    challenges: "Compressing high-resolution 4K architectural renders without visible quality loss to maintain instant page load times.",
    technicalImplementation: "Custom responsive image pipeline with lazy loading, WebP modern formats, and CSS content-visibility tags.",
    results: "Page load time decreased to 0.7s, leading to a 340% surge in monthly brochure downloads and direct WhatsApp inquiries.",
    featured: true,
    published: true,
    sortOrder: 4,
    liveUrl: "https://example.com/demo/zenith"
  },
  {
    id: "localrank-gmb-growth-case-study",
    title: "LocalRank Pro: Google Business Profile Optimization & Recovery",
    slug: "localrank-gmb-growth-case-study",
    category: "gmb",
    subCategory: "GMB & Local SEO",
    industry: "Local Services & Retail",
    shortDescription: "Comprehensive GMB audit, category optimization, local citation buildup, and suspension recovery strategy yielding 4.2x local map visibility.",
    description: "Engineered a localized visibility campaign for a chain of diagnostic centers whose listings were shadow-banned and underperforming against local competitors.",
    problem: "Suspended primary listing and poor map ranking (beyond page 3 for key terms like 'blood test near me').",
    solution: "Executed official Google verification appeal, reinstated profile, optimized categories, deployed geocoded image updates, and structured FAQ schema.",
    features: [
      "Official GMB suspension reinstatement appeal execution",
      "Primary & secondary category precision targeting",
      "Optimized local services menu and product catalog",
      "Automated customer review request workflow",
      "Local citation consistency cleanup"
    ],
    technologies: ["Google Business Profile API", "Local SEO Schema", "Geo-tagging", "Review Automation"],
    contribution: [
      "Direct communication and submission to Google Support",
      "Complete overhaul of business profile content and keywords",
      "Designed local landing pages with matching schema"
    ],
    challenges: "Navigating strict Google guidelines to guarantee swift reinstatement without risk of secondary suspension.",
    technicalImplementation: "Built consistency between official registered business certificates, on-page microdata, and GMB location coordinates.",
    results: "Listing reinstated in 72 hours; direct phone calls increased by 210% and direction requests grew by 320% in 60 days.",
    featured: false,
    published: true,
    sortOrder: 5
  },
  {
    id: "cloudguard-technical-support-remediation",
    title: "CloudGuard: Critical Infrastructure & 24/7 Technical Support",
    slug: "cloudguard-technical-support-remediation",
    category: "technical-support",
    subCategory: "Technical Support",
    industry: "E-Commerce & SaaS",
    shortDescription: "Emergency SSL/DNS outage resolution, database query optimization, and ongoing maintenance architecture for a high-traffic e-commerce brand.",
    description: "Resolved critical SSL certificate handshake breakdowns and DNS routing loops during Black Friday traffic spikes, establishing long-term uptime monitoring.",
    problem: "Client's production website suffered intermittent 502 Bad Gateway errors and broken payment callbacks during peak campaign hours.",
    solution: "Diagnosed root-cause DNS TTL propagation lag, reconfigured Cloudflare edge routing, patched memory leaks in Firestore queries, and deployed uptime monitors.",
    features: [
      "Sub-15 minute emergency incident triage and fix",
      "Cloudflare SSL edge rules and DNS propagation fix",
      "Firestore index optimization reducing query reads by 65%",
      "Automated uptime heartbeat monitoring and error alerting",
      "Regular database security rules audits and backups"
    ],
    technologies: ["Cloudflare DNS", "SSL/TLS", "Firebase Security Rules", "Uptime Monitoring", "Performance Profiling"],
    contribution: [
      "Performed live emergency server triage",
      "Re-architected DNS record structure with zero downtime",
      "Configured automated alerts for database query latency"
    ],
    challenges: "Executing critical DNS and SSL certificate cutovers with active customer traffic on the website.",
    technicalImplementation: "Used staged zero-downtime DNS failover with Cloudflare proxied SSL mode.",
    results: "100% uptime maintained over the last 12 months with sub-100ms API response latency.",
    featured: false,
    published: true,
    sortOrder: 6
  },
  {
    id: "subscripto-saas-billing-system",
    title: "Subscripto: Multi-Tier SaaS Billing & License Manager",
    slug: "subscripto-saas-billing-system",
    category: "subscription-products",
    subCategory: "Subscription-Based Products",
    industry: "Software as a Service (SaaS)",
    shortDescription: "Complete subscription management system with monthly/quarterly/yearly plans, automated renewal webhooks, and self-serve user license keys.",
    description: "Developed a standalone recurring billing and license key activation suite for desktop & web software creators looking to transition to subscription models.",
    problem: "Software vendor was manually generating license keys and tracking monthly renewals via spreadsheets, causing lost recurring revenue.",
    solution: "Created an automated billing engine with customer self-service billing portal, automated license key provisioning, and automated expiry grace periods.",
    features: [
      "Flexible pricing plans (Monthly, Quarterly, Annual with discount)",
      "Automated recurring invoice generation and email receipt",
      "Cryptographic license key generator and validation API",
      "Self-serve customer portal for upgrades, downgrades, and cancellations",
      "Dunning management for failed renewal notifications"
    ],
    technologies: ["React.js", "Firebase Firestore", "Razorpay Subscriptions", "Webhooks", "Crypto API"],
    contribution: [
      "Architected multi-tier subscription engine",
      "Designed customer billing self-service portal",
      "Built developer API for license verification"
    ],
    challenges: "Ensuring zero-friction downgrade and prorated plan change calculations.",
    technicalImplementation: "Managed subscription lifecycle states via automated webhook listeners and Firestore timestamp triggers.",
    results: "Saved 20+ hours of manual billing per week and boosted subscription renewal rate by 34%.",
    featured: true,
    published: true,
    sortOrder: 7,
    liveUrl: "https://example.com/demo/subscripto"
  }
];

// -------------------------------------------------------------
// PROJECTS SERVICE
// -------------------------------------------------------------
export async function getProjects(options = {}) {
  const { category, featuredOnly = false, publishedOnly = true, maxResults = 50 } = options;
  
  const filterDefaults = () => {
    return DEFAULT_PROJECTS.filter(p => {
      if (publishedOnly && !p.published) return false;
      if (featuredOnly && !p.featured) return false;
      if (category && category !== 'all' && p.category !== category) return false;
      return true;
    }).slice(0, maxResults);
  };

  try {
    const colRef = collection(db, 'projects');
    const constraints = [];

    if (publishedOnly) {
      constraints.push(where('published', '==', true));
    }
    if (featuredOnly) {
      constraints.push(where('featured', '==', true));
    }
    if (category && category !== 'all') {
      constraints.push(where('category', '==', category));
    }

    let items = [];
    try {
      const q = query(colRef, ...constraints, orderBy('sortOrder', 'asc'), limit(maxResults));
      const snapshot = await getDocs(q);
      items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (orderErr) {
      const q = query(colRef, ...constraints, limit(maxResults));
      const snapshot = await getDocs(q);
      items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }

    if (items.length > 0) {
      return items;
    }
    return filterDefaults();
  } catch (error) {
    console.error('Error fetching projects, falling back to defaults:', error);
    return filterDefaults();
  }
}

export async function getProjectById(projectId) {
  try {
    const docRef = doc(db, 'projects', projectId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    const fallback = DEFAULT_PROJECTS.find(p => p.id === projectId || p.slug === projectId);
    return fallback || null;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    const fallback = DEFAULT_PROJECTS.find(p => p.id === projectId || p.slug === projectId);
    return fallback || null;
  }
}

export async function getProjectBySlug(slug) {
  try {
    const colRef = collection(db, 'projects');
    const q = query(colRef, where('slug', '==', slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docData = snap.docs[0];
      return { id: docData.id, ...docData.data() };
    }
    const fallback = DEFAULT_PROJECTS.find(p => p.slug === slug || p.id === slug);
    return fallback || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    const fallback = DEFAULT_PROJECTS.find(p => p.slug === slug || p.id === slug);
    return fallback || null;
  }
}

export async function createProject(projectData) {
  const colRef = collection(db, 'projects');
  const now = new Date().toISOString();
  const docRef = await addDoc(colRef, {
    ...projectData,
    sortOrder: Number(projectData.sortOrder) || 0,
    featured: Boolean(projectData.featured),
    published: projectData.published !== undefined ? Boolean(projectData.published) : true,
    createdAt: now,
    updatedAt: now
  });
  return docRef.id;
}

export async function updateProject(projectId, projectData) {
  const docRef = doc(db, 'projects', projectId);
  await updateDoc(docRef, {
    ...projectData,
    sortOrder: Number(projectData.sortOrder) || 0,
    featured: Boolean(projectData.featured),
    published: Boolean(projectData.published),
    updatedAt: new Date().toISOString()
  });
}

export async function deleteProject(projectId) {
  const docRef = doc(db, 'projects', projectId);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// SERVICES SERVICE
// -------------------------------------------------------------
export async function getServices(enabledOnly = true) {
  try {
    const colRef = collection(db, 'services');
    let q;
    if (enabledOnly) {
      q = query(colRef, where('enabled', '==', true));
    } else {
      q = query(colRef);
    }
    const snap = await getDocs(q);
    const services = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return services.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function createService(serviceData) {
  const colRef = collection(db, 'services');
  const docRef = await addDoc(colRef, {
    ...serviceData,
    enabled: serviceData.enabled !== undefined ? Boolean(serviceData.enabled) : true,
    sortOrder: Number(serviceData.sortOrder) || 0,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function updateService(serviceId, serviceData) {
  const docRef = doc(db, 'services', serviceId);
  await updateDoc(docRef, {
    ...serviceData,
    sortOrder: Number(serviceData.sortOrder) || 0,
    enabled: Boolean(serviceData.enabled),
    updatedAt: new Date().toISOString()
  });
}

export async function deleteService(serviceId) {
  await deleteDoc(doc(db, 'services', serviceId));
}

// -------------------------------------------------------------
// SKILLS SERVICE
// -------------------------------------------------------------
export async function getSkills(enabledOnly = true) {
  try {
    const colRef = collection(db, 'skills');
    let q = enabledOnly ? query(colRef, where('enabled', '==', true)) : query(colRef);
    const snap = await getDocs(q);
    const skills = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return skills.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function createSkill(skillData) {
  const colRef = collection(db, 'skills');
  const docRef = await addDoc(colRef, {
    ...skillData,
    enabled: skillData.enabled !== undefined ? Boolean(skillData.enabled) : true,
    sortOrder: Number(skillData.sortOrder) || 0,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function updateSkill(skillId, skillData) {
  const docRef = doc(db, 'skills', skillId);
  await updateDoc(docRef, {
    ...skillData,
    sortOrder: Number(skillData.sortOrder) || 0,
    enabled: Boolean(skillData.enabled),
    updatedAt: new Date().toISOString()
  });
}

export async function deleteSkill(skillId) {
  await deleteDoc(doc(db, 'skills', skillId));
}

// -------------------------------------------------------------
// TESTIMONIALS SERVICE
// -------------------------------------------------------------
export async function getTestimonials(publishedOnly = true) {
  try {
    const colRef = collection(db, 'testimonials');
    let q = publishedOnly ? query(colRef, where('published', '==', true)) : query(colRef);
    const snap = await getDocs(q);
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function createTestimonial(testimonialData) {
  const colRef = collection(db, 'testimonials');
  const docRef = await addDoc(colRef, {
    ...testimonialData,
    rating: Number(testimonialData.rating) || 5,
    published: testimonialData.published !== undefined ? Boolean(testimonialData.published) : true,
    sortOrder: Number(testimonialData.sortOrder) || 0,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function updateTestimonial(testimonialId, testimonialData) {
  const docRef = doc(db, 'testimonials', testimonialId);
  await updateDoc(docRef, {
    ...testimonialData,
    rating: Number(testimonialData.rating) || 5,
    published: Boolean(testimonialData.published),
    sortOrder: Number(testimonialData.sortOrder) || 0,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteTestimonial(testimonialId) {
  await deleteDoc(doc(db, 'testimonials', testimonialId));
}

// -------------------------------------------------------------
// CLIENT INQUIRIES SERVICE (Firestore + FormSubmit Email Notification)
// -------------------------------------------------------------
export async function createInquiry(inquiryData) {
  const colRef = collection(db, 'inquiries');
  const payload = {
    name: inquiryData.name || '',
    businessName: inquiryData.businessName || '',
    email: inquiryData.email || '',
    phone: inquiryData.phone || '',
    whatsapp: inquiryData.whatsapp || '',
    requirementType: inquiryData.requirementType || 'Website',
    requirements: inquiryData.requirements || [],
    description: inquiryData.description || '',
    budget: inquiryData.budget || 'Flexible / To Discuss',
    timeline: inquiryData.timeline || 'Within 2-4 Weeks',
    preferredContact: inquiryData.preferredContact || 'WhatsApp',
    status: 'new', // new, contacted, qualified, proposal, won, lost, archived
    internalNotes: '',
    sourcePage: inquiryData.sourcePage || 'Contact Page',
    projectId: inquiryData.projectId || null,
    projectTitle: inquiryData.projectTitle || null,
    createdAt: new Date().toISOString()
  };

  // 1. Save to Firestore for Admin Panel CRM
  const docRef = await addDoc(colRef, payload);

  // 2. Email Forwarding via FormSubmit API to adminsmtechsolution@gmail.com
  try {
    fetch('https://formsubmit.co/ajax/adminsmtechsolution@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `🚀 New Project Inquiry: ${payload.name || 'Client'} (${payload.requirementType || 'Website'})`,
        _template: 'table',
        _captcha: 'false',
        Name: payload.name || 'Not provided',
        Company_or_Business: payload.businessName || 'Individual / Not specified',
        Email: payload.email || 'Not provided',
        Phone: payload.phone || 'Not provided',
        WhatsApp: payload.whatsapp || payload.phone || 'Not provided',
        Requirement_Type: payload.requirementType || 'Custom Project',
        Project_Description: payload.description || 'No description provided',
        Budget: payload.budget || 'Flexible / To Discuss',
        Timeline: payload.timeline || 'Within 2-4 Weeks',
        Preferred_Channel: payload.preferredContact || 'WhatsApp',
        Source_Page: payload.sourcePage || 'Website Form',
        Submitted_At: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }).catch(err => console.warn('FormSubmit notification dispatch background note:', err));
  } catch (emailErr) {
    console.warn('FormSubmit trigger error (ignoring to prevent user interruption):', emailErr);
  }

  return docRef.id;
}

export async function getInquiries(statusFilter = 'all') {
  try {
    const colRef = collection(db, 'inquiries');
    let q;
    if (statusFilter && statusFilter !== 'all') {
      q = query(colRef, where('status', '==', statusFilter));
    } else {
      q = query(colRef);
    }
    const snap = await getDocs(q);
    const inquiries = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return inquiries.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
}

export async function updateInquiryStatus(inquiryId, status, internalNotes = null) {
  const docRef = doc(db, 'inquiries', inquiryId);
  const payload = {
    status,
    updatedAt: new Date().toISOString()
  };
  if (internalNotes !== null) {
    payload.internalNotes = internalNotes;
  }
  await updateDoc(docRef, payload);
}

export async function deleteInquiry(inquiryId) {
  await deleteDoc(doc(db, 'inquiries', inquiryId));
}

// -------------------------------------------------------------
// USER & ADMIN AUTHORIZATION
// -------------------------------------------------------------
export async function getUserProfile(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { uid, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

export async function setUserAdminRole(uid, email) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    email,
    role: 'admin',
    active: true,
    initializedAt: new Date().toISOString()
  }, { merge: true });
}

// -------------------------------------------------------------
// STATS HELPER
// -------------------------------------------------------------
export async function getPortfolioStats() {
  try {
    const [projectsSnap, inquiriesSnap] = await Promise.all([
      getDocs(query(collection(db, 'projects'), where('published', '==', true))),
      getDocs(collection(db, 'inquiries'))
    ]);

    const totalProjects = projectsSnap.size;
    const websitesBuilt = projectsSnap.docs.filter(d => d.data().category === 'websites' || d.data().category === 'applications').length || 18;
    const businessesSupported = 24 + Math.floor(totalProjects * 1.5);
    const technologiesCount = 32;

    return {
      projectsCompleted: totalProjects > 0 ? totalProjects : 28,
      websitesBuilt: websitesBuilt > 0 ? websitesBuilt : 18,
      businessesSupported: businessesSupported,
      technologiesCount: technologiesCount
    };
  } catch (error) {
    return {
      projectsCompleted: 28,
      websitesBuilt: 18,
      businessesSupported: 42,
      technologiesCount: 32
    };
  }
}

// -------------------------------------------------------------
// SEED DEFAULT PORTFOLIO DATA (Initial bootstrap with rich content)
// -------------------------------------------------------------
export async function seedDefaultPortfolioData() {
  // 1. Initial Site Config
  await updateSiteConfig(DEFAULT_SITE_CONFIG);

  // 2. Initial Services
  const defaultServices = [
    {
      title: "Website Development",
      slug: "website-development",
      category: "websites",
      description: "High-performance, modern business websites engineered for maximum conversion, ultra-fast loading speed, responsive layout across all devices, and enterprise SEO.",
      icon: "Globe",
      sortOrder: 1,
      enabled: true
    },
    {
      title: "Business Software & Web Apps",
      slug: "business-software",
      category: "software",
      description: "Custom ERPs, internal portals, order management dashboards, and operational web apps tailored to eliminate manual bottlenecks and scale daily operations.",
      icon: "Layers",
      sortOrder: 2,
      enabled: true
    },
    {
      title: "Payment Gateway Integrations",
      slug: "payment-integrations",
      category: "payment",
      description: "Secure, battle-tested Razorpay, Stripe & dynamic UPI/QR payment flows with instant webhooks, automated order status verification, and receipt generation.",
      icon: "CreditCard",
      sortOrder: 3,
      enabled: true
    },
    {
      title: "WhatsApp Cloud API & Chatbots",
      slug: "whatsapp-api",
      category: "whatsapp-api",
      description: "Official Meta WhatsApp Business API setups, automated lead qualifiers, automated payment link delivery, customer support bots, and real-time alerts.",
      icon: "MessageSquare",
      sortOrder: 4,
      enabled: true
    },
    {
      title: "AI Automations & Workflows",
      slug: "ai-automations",
      category: "ai-automations",
      description: "Intelligent lead routing, AI voice & chat qualification workflows, automated proposal generators, and CRM synchronization using modern LLM APIs.",
      icon: "Cpu",
      sortOrder: 5,
      enabled: true
    },
    {
      title: "Google Business Profile (GMB) Growth",
      slug: "gmb-optimization",
      category: "gmb",
      description: "Comprehensive GMB setup, local ranking optimization, high-converting service listings, review growth strategy, suspension recovery, and technical verification.",
      icon: "MapPin",
      sortOrder: 6,
      enabled: true
    },
    {
      title: "Long-Term Technical Support",
      slug: "technical-support",
      category: "technical-support",
      description: "Mission-critical troubleshooting, DNS & SSL management, database migrations, API debugging, server maintenance, bug fixing, and continuous upkeep.",
      icon: "LifeBuoy",
      sortOrder: 7,
      enabled: true
    },
    {
      title: "Subscription-Based Products (SaaS)",
      slug: "subscription-products",
      category: "subscription-products",
      description: "End-to-end SaaS products, recurring billing architectures, user authentication tiers, multi-tenant database models, and self-serve client portals.",
      icon: "Package",
      sortOrder: 8,
      enabled: true
    }
  ];

  for (const s of defaultServices) {
    await addDoc(collection(db, 'services'), { ...s, createdAt: new Date().toISOString() });
  }

  // 3. Initial Skills Matrix
  const defaultSkills = [
    // Frontend
    { name: "React.js & Modern JSX", category: "Frontend", level: "Expert", sortOrder: 1, enabled: true },
    { name: "JavaScript (ES6+) & TypeScript", category: "Frontend", level: "Expert", sortOrder: 2, enabled: true },
    { name: "HTML5, Semantic UI & Microdata", category: "Frontend", level: "Expert", sortOrder: 3, enabled: true },
    { name: "Vanilla CSS & Responsive Design", category: "Frontend", level: "Expert", sortOrder: 4, enabled: true },
    { name: "State Management & React Hooks", category: "Frontend", level: "Expert", sortOrder: 5, enabled: true },
    
    // Database / Firebase
    { name: "Firebase Firestore (NoSQL)", category: "Database / Firebase", level: "Expert", sortOrder: 1, enabled: true },
    { name: "Firebase Authentication & RBAC", category: "Database / Firebase", level: "Expert", sortOrder: 2, enabled: true },
    { name: "Firebase Security Rules", category: "Database / Firebase", level: "Expert", sortOrder: 3, enabled: true },
    { name: "Relational SQL & PostgreSQL", category: "Database / Firebase", level: "Advanced", sortOrder: 4, enabled: true },
    
    // Integrations & APIs
    { name: "Razorpay & Payment Gateways", category: "Integrations", level: "Expert", sortOrder: 1, enabled: true },
    { name: "WhatsApp Business / Cloud API", category: "Integrations", level: "Expert", sortOrder: 2, enabled: true },
    { name: "RESTful APIs & Webhooks", category: "Integrations", level: "Expert", sortOrder: 3, enabled: true },
    { name: "Third-Party CRM & Email APIs", category: "Integrations", level: "Advanced", sortOrder: 4, enabled: true },
    
    // Automation & AI
    { name: "AI Workflow Engineering", category: "Automation", level: "Advanced", sortOrder: 1, enabled: true },
    { name: "OpenAI & Claude LLM Integrations", category: "Automation", level: "Advanced", sortOrder: 2, enabled: true },
    { name: "Automated Lead Routing & Zapier/Make", category: "Automation", level: "Expert", sortOrder: 3, enabled: true },
    
    // Deployment & Support
    { name: "Domain, DNS & SSL Configuration", category: "Deployment / Support", level: "Expert", sortOrder: 1, enabled: true },
    { name: "Production Deployment & CDN", category: "Deployment / Support", level: "Expert", sortOrder: 2, enabled: true },
    { name: "Performance Optimization & SEO", category: "Deployment / Support", level: "Expert", sortOrder: 3, enabled: true },
    { name: "Critical Bug Troubleshooting", category: "Deployment / Support", level: "Expert", sortOrder: 4, enabled: true }
  ];

  for (const sk of defaultSkills) {
    await addDoc(collection(db, 'skills'), { ...sk, createdAt: new Date().toISOString() });
  }

  // 4. Initial Showcase Projects across all categories
  const defaultProjects = [
    {
      title: "OmniFlow AI: Automated Lead Routing & WhatsApp Qualification",
      slug: "omniflow-ai-lead-automation",
      category: "ai-automations",
      subCategory: "AI Automation & WhatsApp Bot",
      industry: "Real Estate & High-Ticket Consulting",
      shortDescription: "End-to-end intelligent automation pipeline that captures web inquiries, qualifies prospects via WhatsApp AI, and alerts sales teams with instant summaries.",
      description: "Built a fully autonomous lead capture and qualification system. When a prospect submits an inquiry, an AI agent engages them over WhatsApp within 60 seconds, qualifies their budget, timeline, and requirement, updates Firestore CRM, and triggers instant SMS/WhatsApp alerts to the consultant.",
      problem: "The client was losing 45% of incoming prospective leads due to slow response times (often 4-12 hours) and manual qualification overhead.",
      solution: "Engineered an event-driven webhook pipeline connecting web forms, OpenAI API, and WhatsApp Cloud API. Automated real-time conversational qualification and instant CRM updates.",
      features: [
        "Sub-60s automated WhatsApp first-touch response",
        "Context-aware AI conversational qualification",
        "Real-time budget & timeline scoring",
        "Instant admin dashboard notification with conversation summary",
        "Automated calendar booking link dispatch"
      ],
      technologies: ["React.js", "Firebase Firestore", "WhatsApp Cloud API", "OpenAI API", "Webhooks", "Node.js"],
      contribution: [
        "Architected conversational state machine",
        "Integrated Meta WhatsApp Cloud API webhooks",
        "Developed live consultant monitoring dashboard",
        "Deployed bulletproof Firestore security rules"
      ],
      challenges: "Handling sporadic message delays and ensuring natural conversational flow while strictly maintaining qualification scoring parameters.",
      technicalImplementation: "Leveraged Firestore real-time listeners for live conversation updates and asynchronous webhook handlers for sub-second message dispatching.",
      results: "Lead qualification rate increased by 280%, while average response time plummeted from 6 hours to 42 seconds.",
      featured: true,
      published: true,
      sortOrder: 1,
      liveUrl: "https://example.com/demo/omniflow",
      demoUrl: "https://example.com/demo/omniflow"
    },
    {
      title: "ApexPay: Enterprise Razorpay Gateway & Dynamic QR Engine",
      slug: "apexpay-payment-gateway-solution",
      category: "payment",
      subCategory: "Payment Solutions",
      industry: "Fintech & E-Commerce",
      shortDescription: "Complete custom checkout, dynamic UPI QR generation, automated webhook signature verification, and instant digital receipt dispatch.",
      description: "Architected a high-reliability payment integration suite handling credit cards, net banking, UPI intent, and dynamically generated UPI QR codes for instant point-of-sale and online transactions.",
      problem: "Client experienced 18% dropped transactions due to clunky redirects and frequent webhook synchronization failures during network blips.",
      solution: "Implemented an inline modal checkout with cryptographic HMAC-SHA256 webhook validation, idempotency keys, and automated fallback verification checks.",
      features: [
        "Dynamic on-screen UPI QR Code generation with countdown timer",
        "Cryptographic webhook signature verification",
        "Automated failed transaction recovery and retry logic",
        "Instant PDF invoice generation and WhatsApp receipt dispatch",
        "Admin analytics dashboard for revenue & refund tracking"
      ],
      technologies: ["React.js", "Razorpay API", "Firebase Firestore", "CryptoJS", "Tailwind CSS", "PDFKit"],
      contribution: [
        "Engineered end-to-end checkout frontend & backend webhook endpoints",
        "Designed real-time payment status polling engine",
        "Built admin refund and transaction lookup portal"
      ],
      challenges: "Eliminating edge-case race conditions where customers closed browser tabs before client-side redirect completed.",
      technicalImplementation: "Configured resilient serverless webhook listeners that guarantee state consistency regardless of client browser lifecycle.",
      results: "Payment drop-off reduced to under 2.1%, processing over ₹40L+ monthly transaction volume flawlessly.",
      featured: true,
      published: true,
      sortOrder: 2,
      liveUrl: "https://example.com/demo/apexpay"
    },
    {
      title: "MedixPro: Clinic Management ERP & Patient Portal",
      slug: "medixpro-clinic-management-software",
      category: "software",
      subCategory: "Business Software",
      industry: "Healthcare & Clinics",
      shortDescription: "Comprehensive web application for multi-branch clinics with doctor scheduling, digital prescriptions, patient history, and automated SMS reminders.",
      description: "A centralized, multi-role clinical management suite streamlining doctor appointments, electronic health records (EHR), inventory tracking, and billing.",
      problem: "Paper-based record keeping led to scheduling conflicts, missed follow-ups, and disorganized billing across 3 clinic locations.",
      solution: "Designed and built a modular, ultra-responsive cloud ERP with role-based access for Receptionists, Doctors, Pharmacists, and Clinic Owners.",
      features: [
        "Interactive doctor appointment scheduling grid",
        "Digital prescription builder with drug database auto-suggest",
        "Automated appointment reminder notifications via SMS & WhatsApp",
        "Pharmacy inventory tracking with low-stock alerts",
        "Role-based permission security (RBAC)"
      ],
      technologies: ["React.js", "Firebase Firestore", "Firebase Auth", "Tailwind CSS", "Lucide React", "Chart.js"],
      contribution: [
        "Full-stack architecture from UI wireframes to production deployment",
        "Engineered offline-tolerant appointment syncing",
        "Implemented strict HIPAA/data security compliant access rules"
      ],
      challenges: "Ensuring near-instant search across 25,000+ patient records with complex filtering without degrading client-side performance.",
      technicalImplementation: "Utilized indexed Firestore query paths with normalized sub-collections and debounced memory caching.",
      results: "Patient wait times decreased by 40%, and missed appointments dropped from 22% to under 4%.",
      featured: true,
      published: true,
      sortOrder: 3,
      liveUrl: "https://example.com/demo/medixpro"
    },
    {
      title: "Zenith Real Estate: Ultra-Fast High-Converting Web Platform",
      slug: "zenith-real-estate-portal",
      category: "websites",
      subCategory: "Website Development",
      industry: "Real Estate & Property Development",
      shortDescription: "Modern luxury property showcase with interactive map filtering, 360 virtual tour embeds, instant WhatsApp brochure download, and 98+ PageSpeed score.",
      description: "Developed a luxury real estate digital storefront designed specifically to generate high-intent buyer inquiries for residential developments.",
      problem: "Previous WordPress theme was sluggish (4.5s load time), non-responsive on mobile, and generated virtually zero direct inquiries.",
      solution: "Rebuilt from scratch with React, sub-second asset bundling, WebP image pipelines, and high-converting sticky lead capture widgets.",
      features: [
        "Dynamic property search with price, BHK, and location filters",
        "One-click WhatsApp brochure delivery gate",
        "Interactive floor plan viewer and video walkthrough integration",
        "Optimized Schema.org RealEstateAgent metadata for top SEO rankings",
        "Direct inquiry lead forwarding to CRM"
      ],
      technologies: ["React.js", "Firebase Firestore", "Vanilla CSS", "SEO Schema", "Vite"],
      contribution: [
        "Complete UI/UX design and responsive development",
        "Lighthouse performance optimization achieving 99/100 score",
        "Integrated dynamic lead-capture modal with source tracking"
      ],
      challenges: "Compressing high-resolution 4K architectural renders without visible quality loss to maintain instant page load times.",
      technicalImplementation: "Custom responsive image pipeline with lazy loading, WebP modern formats, and CSS content-visibility tags.",
      results: "Page load time decreased to 0.7s, leading to a 340% surge in monthly brochure downloads and direct WhatsApp inquiries.",
      featured: true,
      published: true,
      sortOrder: 4,
      liveUrl: "https://example.com/demo/zenith"
    },
    {
      title: "LocalRank Pro: Google Business Profile Optimization & Recovery",
      slug: "localrank-gmb-growth-case-study",
      category: "gmb",
      subCategory: "GMB & Local SEO",
      industry: "Local Services & Retail",
      shortDescription: "Comprehensive GMB audit, category optimization, local citation buildup, and suspension recovery strategy yielding 4.2x local map visibility.",
      description: "Engineered a localized visibility campaign for a chain of diagnostic centers whose listings were shadow-banned and underperforming against local competitors.",
      problem: "Suspended primary listing and poor map ranking (beyond page 3 for key terms like 'blood test near me').",
      solution: "Executed official Google verification appeal, reinstated profile, optimized categories, deployed geocoded image updates, and structured FAQ schema.",
      features: [
        "Official GMB suspension reinstatement appeal execution",
        "Primary & secondary category precision targeting",
        "Optimized local services menu and product catalog",
        "Automated customer review request workflow",
        "Local citation consistency cleanup"
      ],
      technologies: ["Google Business Profile API", "Local SEO Schema", "Geo-tagging", "Review Automation"],
      contribution: [
        "Direct communication and submission to Google Support",
        "Complete overhaul of business profile content and keywords",
        "Designed local landing pages with matching schema"
      ],
      challenges: "Navigating strict Google guidelines to guarantee swift reinstatement without risk of secondary suspension.",
      technicalImplementation: "Built consistency between official registered business certificates, on-page microdata, and GMB location coordinates.",
      results: "Listing reinstated in 72 hours; direct phone calls increased by 210% and direction requests grew by 320% in 60 days.",
      featured: false,
      published: true,
      sortOrder: 5
    },
    {
      title: "CloudGuard: Critical Infrastructure & 24/7 Technical Support",
      slug: "cloudguard-technical-support-remediation",
      category: "technical-support",
      subCategory: "Technical Support",
      industry: "E-Commerce & SaaS",
      shortDescription: "Emergency SSL/DNS outage resolution, database query optimization, and ongoing maintenance architecture for a high-traffic e-commerce brand.",
      description: "Resolved critical SSL certificate handshake breakdowns and DNS routing loops during Black Friday traffic spikes, establishing long-term uptime monitoring.",
      problem: "Client's production website suffered intermittent 502 Bad Gateway errors and broken payment callbacks during peak campaign hours.",
      solution: "Diagnosed root-cause DNS TTL propagation lag, reconfigured Cloudflare edge routing, patched memory leaks in Firestore queries, and deployed uptime monitors.",
      features: [
        "Sub-15 minute emergency incident triage and fix",
        "Cloudflare SSL edge rules and DNS propagation fix",
        "Firestore index optimization reducing query reads by 65%",
        "Automated uptime heartbeat monitoring and error alerting",
        "Regular database security rules audits and backups"
      ],
      technologies: ["Cloudflare DNS", "SSL/TLS", "Firebase Security Rules", "Uptime Monitoring", "Performance Profiling"],
      contribution: [
        "Performed live emergency server triage",
        "Re-architected DNS record structure with zero downtime",
        "Configured automated alerts for database query latency"
      ],
      challenges: "Executing critical DNS and SSL certificate cutovers with active customer traffic on the website.",
      technicalImplementation: "Used staged zero-downtime DNS failover with Cloudflare proxied SSL mode.",
      results: "100% uptime maintained over the last 12 months with sub-100ms API response latency.",
      featured: false,
      published: true,
      sortOrder: 6
    },
    {
      title: "Subscripto: Multi-Tier SaaS Billing & License Manager",
      slug: "subscripto-saas-billing-system",
      category: "subscription-products",
      subCategory: "Subscription-Based Products",
      industry: "Software as a Service (SaaS)",
      shortDescription: "Complete subscription management system with monthly/quarterly/yearly plans, automated renewal webhooks, and self-serve user license keys.",
      description: "Developed a standalone recurring billing and license key activation suite for desktop & web software creators looking to transition to subscription models.",
      problem: "Software vendor was manually generating license keys and tracking monthly renewals via spreadsheets, causing lost recurring revenue.",
      solution: "Created an automated billing engine with customer self-service billing portal, automated license key provisioning, and automated expiry grace periods.",
      features: [
        "Flexible pricing plans (Monthly, Quarterly, Annual with discount)",
        "Automated recurring invoice generation and email receipt",
        "Cryptographic license key generator and validation API",
        "Self-serve customer portal for upgrades, downgrades, and cancellations",
        "Dunning management for failed renewal notifications"
      ],
      technologies: ["React.js", "Firebase Firestore", "Razorpay Subscriptions", "Webhooks", "Crypto API"],
      contribution: [
        "Architected multi-tier subscription engine",
        "Designed customer billing self-service portal",
        "Built developer API for license verification"
      ],
      challenges: "Ensuring zero-friction downgrade and prorated plan change calculations.",
      technicalImplementation: "Managed subscription lifecycle states via automated webhook listeners and Firestore timestamp triggers.",
      results: "Saved 20+ hours of manual billing per week and boosted subscription renewal rate by 34%.",
      featured: true,
      published: true,
      sortOrder: 7,
      liveUrl: "https://example.com/demo/subscripto"
    }
  ];

  for (const p of defaultProjects) {
    await addDoc(collection(db, 'projects'), { ...p, createdAt: new Date().toISOString() });
  }

  // 5. Initial Testimonials
  const defaultTestimonials = [
    {
      clientName: "Rajesh Kulkarni",
      businessName: "Kulkarni Diagnostics & Health",
      designation: "Managing Director",
      message: "AASHA-SM Technologies Pvt Ltd completely transformed our online presence and local Google ranking. Our patient inquiries on WhatsApp increased three-fold within weeks. They handle everything from development to technical support seamlessly.",
      rating: 5,
      sortOrder: 1,
      published: true
    },
    {
      clientName: "Vikram Mehta",
      businessName: "Apex Retail Solutions",
      designation: "Founder & CEO",
      message: "The Razorpay integration and automated WhatsApp order alerts AASHA-SM Technologies Pvt Ltd built for us worked flawlessly from day one. They are not just developers, but true technical partners who understand business goals.",
      rating: 5,
      sortOrder: 2,
      published: true
    },
    {
      clientName: "Pooja Sharma",
      businessName: "Zenith Properties",
      designation: "Head of Digital Marketing",
      message: "Our luxury property website loads in under a second and generates high-ticket buyer leads every single day. AASHA-SM Technologies Pvt Ltd's attention to speed, clean UI, and lead capture is truly exceptional.",
      rating: 5,
      sortOrder: 3,
      published: true
    }
  ];

  for (const t of defaultTestimonials) {
    await addDoc(collection(db, 'testimonials'), { ...t, createdAt: new Date().toISOString() });
  }

  return { success: true, message: "Sample portfolio data seeded successfully!" };
}
