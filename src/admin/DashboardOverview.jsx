import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getInquiries, getSiteConfig } from '../services/firestoreService';
import {
  FolderGit2,
  Inbox,
  Star,
  Users,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Plus,
  Clock,
  MessageSquare,
  Eye,
  Settings
} from 'lucide-react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalInquiries: 0,
    newInquiries: 0,
    qualifiedLeads: 0,
    convertedLeads: 0
  });

  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [projects, inquiries] = await Promise.all([
          getProjects({ publishedOnly: false, maxResults: 100 }),
          getInquiries('all')
        ]);

        const totalProjects = projects.length;
        const featuredProjects = projects.filter(p => p.featured).length;
        const totalInquiries = inquiries.length;
        const newInquiries = inquiries.filter(i => i.status === 'new').length;
        const qualifiedLeads = inquiries.filter(i => i.status === 'qualified' || i.status === 'proposal').length;
        const convertedLeads = inquiries.filter(i => i.status === 'won').length;

        setStats({
          totalProjects,
          featuredProjects,
          totalInquiries,
          newInquiries,
          qualifiedLeads,
          convertedLeads
        });

        setRecentInquiries(inquiries.slice(0, 6));
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const metricCards = [
    { title: "Total Projects", value: stats.totalProjects, icon: FolderGit2, color: "#00f2fe", link: "/admin/projects" },
    { title: "Featured Case Studies", value: stats.featuredProjects, icon: Star, color: "#f59e0b", link: "/admin/projects" },
    { title: "Total Client Inquiries", value: stats.totalInquiries, icon: Inbox, color: "#818cf8", link: "/admin/inquiries" },
    { title: "New / Uncontacted Leads", value: stats.newInquiries, icon: Clock, color: "#f43f5e", link: "/admin/inquiries?status=new", highlight: stats.newInquiries > 0 },
    { title: "Qualified Proposals", value: stats.qualifiedLeads, icon: TrendingUp, color: "#38bdf8", link: "/admin/inquiries?status=qualified" },
    { title: "Won / Converted Deals", value: stats.convertedLeads, icon: CheckCircle2, color: "#10b981", link: "/admin/inquiries?status=won" }
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Welcome to AASHA-SM Technologies CMS
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Here is a live summary of your projects, lead generation inquiries, and digital solution stats.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/admin/projects/new" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
            <Plus size={15} /> New Project
          </Link>
          <Link to="/admin/settings" className="btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
            <Settings size={15} /> CMS Settings
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}
      >
        {metricCards.map((card, i) => (
          <Link
            key={i}
            to={card.link}
            className="glass-panel-interactive"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textDecoration: 'none',
              border: card.highlight ? '1px solid #f43f5e' : '1px solid var(--border-subtle)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {card.title}
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: `rgba(${parseInt(card.color.slice(1, 3), 16) || 2}, ${parseInt(card.color.slice(3, 5), 16) || 132}, ${parseInt(card.color.slice(5, 7), 16) || 199}, 0.15)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color
                }}
              >
                <card.icon size={16} />
              </div>
            </div>

            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
              {loading ? '...' : card.value}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries Feed */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              Recent Client Lead Inquiries
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Incoming project requirements submitted directly via the portfolio
            </p>
          </div>

          <Link
            to="/admin/inquiries"
            style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            View All Inquiries <ArrowRight size={14} />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Inbox size={36} color="var(--accent-cyan)" style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
            <p>No inquiries yet. Test the contact form or inquiry modal on the public site to see submissions appear here!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--btn-secondary-bg)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Client Name</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Requirement Type</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Budget</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Contact</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => {
                  let statusColor = 'var(--text-muted)';
                  let statusBg = 'var(--btn-secondary-bg)';
                  if (inq.status === 'new') {
                    statusColor = '#f43f5e';
                    statusBg = 'rgba(244, 63, 94, 0.15)';
                  } else if (inq.status === 'qualified') {
                    statusColor = 'var(--accent-cyan)';
                    statusBg = 'rgba(2, 132, 199, 0.15)';
                  } else if (inq.status === 'won') {
                    statusColor = '#10b981';
                    statusBg = 'rgba(16, 185, 129, 0.15)';
                  }

                  return (
                    <tr key={inq.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        <div>{inq.name}</div>
                        {inq.businessName && <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{inq.businessName}</div>}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-main)' }}>
                        {inq.requirementType}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                        {inq.budget}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-main)' }}>
                        <div>{inq.email}</div>
                        {inq.whatsapp && (
                          <div style={{ fontSize: '0.78rem', color: '#25d366' }}>{inq.whatsapp}</div>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: statusColor,
                            background: statusBg,
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            textTransform: 'uppercase'
                          }}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <Link
                          to={`/admin/inquiries?id=${inq.id}`}
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
