import React, { useEffect } from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import AIAutomationSection from '../components/home/AIAutomationSection';
import PaymentWhatsAppSection from '../components/home/PaymentWhatsAppSection';
import TechSupportSection from '../components/home/TechSupportSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import LeadCTABanner from '../components/home/LeadCTABanner';
import { Analytics } from '../services/analyticsService';

export default function HomePage() {
  useEffect(() => {
    Analytics.pageView('Home');
  }, []);

  return (
    <div>
      <SEO
        title="AASHA-SM Technologies Pvt Ltd | Full-Stack Software & Digital Solutions"
        description="AASHA-SM Technologies Pvt Ltd engineers custom websites, enterprise software, web applications, Razorpay payment flows, WhatsApp Cloud APIs, and AI automations for modern businesses."
      />

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturedProjects />
      <AIAutomationSection />
      <PaymentWhatsAppSection />
      <TechSupportSection />
      <TestimonialsSection />
      <LeadCTABanner />
    </div>
  );
}
