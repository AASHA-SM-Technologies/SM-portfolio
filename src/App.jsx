import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';

// Public Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ServicesPage from './pages/ServicesPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

// Admin CMS Pages
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import DashboardOverview from './admin/DashboardOverview';
import ProjectsManager from './admin/ProjectsManager';
import ProjectEditor from './admin/ProjectEditor';
import ServicesManager from './admin/ServicesManager';
import SkillsManager from './admin/SkillsManager';
import TestimonialsManager from './admin/TestimonialsManager';
import InquiriesCRM from './admin/InquiriesCRM';
import SiteSettingsManager from './admin/SiteSettingsManager';

export default function App() {
  return (
    <Routes>
      {/* Public Client Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/case-studies" element={<Navigate to="/projects?featured=true" replace />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/terms-of-use" element={<Navigate to="/terms-and-conditions" replace />} />
        <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy-notice" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin CMS Dashboard */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="projects/new" element={<ProjectEditor />} />
        <Route path="projects/edit/:id" element={<ProjectEditor />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="inquiries" element={<InquiriesCRM />} />
        <Route path="settings" element={<SiteSettingsManager />} />
      </Route>
    </Routes>
  );
}
