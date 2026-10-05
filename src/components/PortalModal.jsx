import React, { useState } from 'react';

export default function PortalModal({ isOpen, onClose, onShowToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onShowToast) {
      onShowToast('✓ Portal authentication successful. Redirecting to workspace...');
    }
    setTimeout(() => {
      onClose();
      setEmail('');
      setPassword('');
    }, 1200);
  };

  return (
    <div className="modal-backdrop-layer open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-window-card">
        <button className="modal-close-trigger" onClick={onClose} aria-label="Close Modal">&times;</button>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-white)', marginBottom: '6px' }}>
          Prime Portal Login
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
          Access your dedicated candidate, contractor or client workspace
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-field-wrap" style={{ marginBottom: '14px' }}>
            <label htmlFor="portalEmail">Work Email Address</label>
            <input 
              type="email" 
              id="portalEmail" 
              className="form-input-styled" 
              placeholder="name@domain.com.au" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-field-wrap" style={{ marginBottom: '18px' }}>
            <label htmlFor="portalPassword">Access Code / Password</label>
            <input 
              type="password" 
              id="portalPassword" 
              className="form-input-styled" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary-hero" style={{ width: '100%', justifyContent: 'center' }}>
            <span>Sign In to Portal ↗</span>
          </button>
        </form>
      </div>
    </div>
  );
}
