import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '', style = {} }) {
  const { theme, toggleTheme } = useSite();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
        color: isDark ? '#00f2fe' : '#f59e0b',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(8px)',
        boxShadow: isDark ? '0 0 12px rgba(0, 242, 254, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.borderColor = isDark ? '#00f2fe' : '#f59e0b';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
      }}
    >
      {isDark ? (
        <Sun size={18} style={{ transition: 'transform 0.3s ease', transform: 'rotate(0deg)' }} />
      ) : (
        <Moon size={18} style={{ transition: 'transform 0.3s ease', transform: 'rotate(0deg)' }} />
      )}
    </button>
  );
}
