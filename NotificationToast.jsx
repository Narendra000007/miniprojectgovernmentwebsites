import React from 'react';

export default function NotificationToast({ message, type = 'info', onClose }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast" style={{ borderLeft: type === 'success' ? '4px solid #10b981' : '4px solid #3b82f6' }}>
        <span>{type === 'success' ? '✓' : 'ℹ'}</span>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{ marginLeft: '12px', color: '#94a3b8', fontSize: '1rem', background: 'none', border: 'none' }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
