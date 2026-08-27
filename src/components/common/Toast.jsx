import React from 'react';
import { useSite } from '../../context/SiteContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useSite();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '420px',
      width: 'calc(100% - 3rem)'
    }}>
      {toasts.map((toast) => {
        let bgColor = '#161616';
        let borderColor = 'rgba(255, 255, 255, 0.15)';
        let Icon = Info;
        let iconColor = '#00f2fe';

        if (toast.type === 'success') {
          borderColor = 'rgba(16, 185, 129, 0.4)';
          Icon = CheckCircle2;
          iconColor = '#10b981';
        } else if (toast.type === 'error') {
          borderColor = 'rgba(244, 63, 94, 0.4)';
          Icon = AlertTriangle;
          iconColor = '#f43f5e';
        }

        return (
          <div
            key={toast.id}
            style={{
              background: bgColor,
              border: `1px solid ${borderColor}`,
              borderRadius: '12px',
              padding: '0.85rem 1.1rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 242, 254, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.85rem',
              color: '#f8fafc',
              fontSize: '0.9rem',
              backdropFilter: 'blur(12px)',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
