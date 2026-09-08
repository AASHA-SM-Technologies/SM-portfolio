import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSiteConfig, getPortfolioStats } from '../services/firestoreService';
import { initializeAntiCopyDeterrents } from '../utils/antiCopy';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [siteConfig, setSiteConfig] = useState(null);
  const [stats, setStats] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Theme Management (Light by default for first-time visitors / Dark mode support)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Global Inquiry Modal State
  const [inquiryModal, setInquiryModal] = useState({
    isOpen: false,
    requirementType: 'Website',
    projectId: null,
    projectTitle: null,
    sourcePage: 'Direct'
  });

  // Global Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Load site config & stats
  const fetchConfig = async () => {
    try {
      const [configData, statsData] = await Promise.all([
        getSiteConfig(),
        getPortfolioStats()
      ]);
      setSiteConfig(configData);
      setStats(statsData);
    } catch (err) {
      console.error("Failed to load initial site config:", err);
    } finally {
      setLoadingConfig(false);
    }
  };

  useEffect(() => {
    fetchConfig();
    // Initialize non-intrusive anti-copy deterrents
    const cleanupAntiCopy = initializeAntiCopyDeterrents();
    return () => {
      if (cleanupAntiCopy) cleanupAntiCopy();
    };
  }, []);

  const openInquiryModal = (options = {}) => {
    setInquiryModal({
      isOpen: true,
      requirementType: options.requirementType || 'Website',
      projectId: options.projectId || null,
      projectTitle: options.projectTitle || null,
      sourcePage: options.sourcePage || window.location.pathname
    });
  };

  const closeInquiryModal = () => {
    setInquiryModal(prev => ({ ...prev, isOpen: false }));
  };

  const showToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <SiteContext.Provider
      value={{
        siteConfig,
        stats,
        loadingConfig,
        refreshSiteConfig: fetchConfig,
        theme,
        toggleTheme,
        inquiryModal,
        openInquiryModal,
        closeInquiryModal,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
