import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase/config';

/**
 * Safely log custom analytics events to Firebase Analytics
 */
export function trackEvent(eventName, eventParams = {}) {
  try {
    if (analytics && typeof window !== 'undefined') {
      logEvent(analytics, eventName, {
        ...eventParams,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    // Suppress analytics errors in development or if ad-blocker is present
    console.debug(`[Analytics: ${eventName}]`, eventParams);
  }
}

export const Analytics = {
  pageView: (pageName) => trackEvent('page_view', { page_name: pageName }),
  projectView: (projectId, projectTitle) => trackEvent('project_view', { project_id: projectId, project_title: projectTitle }),
  inquiryStarted: (source) => trackEvent('inquiry_started', { source }),
  inquirySubmitted: (requirementType, budget) => trackEvent('inquiry_submitted', { requirement_type: requirementType, budget }),
  whatsappClick: (location) => trackEvent('whatsapp_click', { location }),
  callClick: (location) => trackEvent('call_click', { location }),
  emailClick: (location) => trackEvent('email_click', { location }),
  liveProjectClick: (projectId, url) => trackEvent('live_project_click', { project_id: projectId, url }),
  serviceView: (serviceSlug) => trackEvent('service_view', { service_slug: serviceSlug })
};
