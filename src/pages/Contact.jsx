import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LiveWatermark from '../components/LiveWatermark';

export default function Contact({ onShowToast }) {
  const [bookSlot, setBookSlot] = useState('Tomorrow 10:00 AM');
  const [hubTab, setHubTab] = useState('employer');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    onShowToast('✓ Strategy Call confirmed with Ashwin Shiv. Calendar invite sent.');
    e.target.reset();
  };

  const handleEmployerSubmit = (e) => {
    e.preventDefault();
    onShowToast('✓ Role brief received. Ashwin Shiv will respond within 2 hours.');
    e.target.reset();
  };

  const handleCandidateSubmit = (e) => {
    e.preventDefault();
    onShowToast('✓ Profile submitted confidentially to Ashwin Shiv.');
    e.target.reset();
  };

  return (
    <div className="contact-page">
      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <LiveWatermark variant="wm-cloud" />
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Contact</span>
          </div>
          <h1 className="page-hero-title">Direct Strategy Access</h1>
          <p className="page-hero-subtitle">
            Speak directly with Ashwin Shiv to solve an urgent hiring gap, benchmark day rates, or book a 15-minute strategy consultation.
          </p>
        </div>
      </div>

      {/* Contact & Booking Section (Light) */}
      <section className="section section-light" id="contact-details">
        <LiveWatermark variant="wm-aus" />
        <div className="container">
          <div className="contact-layout-grid">
            {/* Direct Contact Info */}
            <div className="contact-card-info">
              <span className="section-tag">SYDNEY HEADQUARTERS</span>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Speak Directly with Ashwin Shiv</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Ready to solve an urgent tech hiring gap or benchmark your team's day rates? Our desk is active today.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-white)', fontSize: '0.95rem' }}>National Headquarters:</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Level 49, 8 Parramatta Square, Sydney NSW 2150</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-white)', fontSize: '0.95rem' }}>Mobile (Direct):</strong>
                    <p><a href="tel:+610450173053" style={{ color: 'var(--gold-text)', textDecoration: 'none', fontWeight: 700 }}>+61 0450 173 053</a></p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-white)', fontSize: '0.95rem' }}>Direct Email:</strong>
                    <p><a href="mailto:info@primetalent.com.au" style={{ color: 'var(--cyan-primary)', textDecoration: 'none' }}>info@primetalent.com.au</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* 15-Minute Strategy Booking */}
            <div className="contact-booking-box">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-white)', marginBottom: '8px' }}>
                Book a 15-Minute Strategy Call
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '22px' }}>
                Direct calendar booking with Ashwin Shiv.
              </p>

              <form onSubmit={handleBookingSubmit}>
                <div className="input-field-wrap" style={{ marginBottom: '14px' }}>
                  <label htmlFor="bookName">Your Name</label>
                  <input type="text" id="bookName" className="form-input-styled" placeholder="First & Last Name" required />
                </div>
                <div className="input-field-wrap" style={{ marginBottom: '14px' }}>
                  <label htmlFor="bookEmail">Work Email</label>
                  <input type="email" id="bookEmail" className="form-input-styled" placeholder="name@company.com.au" required />
                </div>
                <div className="input-field-wrap" style={{ marginBottom: '18px' }}>
                  <label htmlFor="bookSlot">Available Strategy Slot</label>
                  <select 
                    id="bookSlot" 
                    className="calc-select-styled" 
                    style={{ padding: '11px 16px' }}
                    value={bookSlot}
                    onChange={(e) => setBookSlot(e.target.value)}
                  >
                    <option value="Tomorrow 10:00 AM">Tomorrow • 10:00 AM AEST</option>
                    <option value="Tomorrow 2:00 PM">Tomorrow • 2:00 PM AEST</option>
                    <option value="Thursday 11:30 AM">This Thursday • 11:30 AM AEST</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary-hero" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Confirm Strategy Booking ↗</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Mandate / CV Drop Section */}
      <section className="section section-dark" id="action-hub">
        <LiveWatermark variant="wm-cyber" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">DIRECT ENGAGEMENT</span>
            <h2 className="section-title">Submit Brief or Profile</h2>
            <p className="section-subtitle">Confidential submission directly reviewed by Ashwin Shiv.</p>
          </div>

          <div className="hub-wrapper-card">
            <div className="hub-tabs-row">
              <button 
                className={`hub-tab-btn ${hubTab === 'employer' ? 'active' : ''}`}
                onClick={() => setHubTab('employer')}
              >
                For Employers: Submit Role Brief
              </button>
              <button 
                className={`hub-tab-btn ${hubTab === 'candidate' ? 'active' : ''}`}
                onClick={() => setHubTab('candidate')}
              >
                For Candidates: Confidential CV Drop
              </button>
            </div>

            {hubTab === 'employer' ? (
              <form className="hub-form-content" onSubmit={handleEmployerSubmit}>
                <div className="hub-form-grid">
                  <div className="input-field-wrap">
                    <label>Hiring Manager Name</label>
                    <input type="text" className="form-input-styled" placeholder="Jane Smith" required />
                  </div>
                  <div className="input-field-wrap">
                    <label>Work Email</label>
                    <input type="email" className="form-input-styled" placeholder="j.smith@enterprise.com.au" required />
                  </div>
                  <div className="input-field-wrap">
                    <label>Role to Fill</label>
                    <input type="text" className="form-input-styled" placeholder="e.g. Lead Cloud Architect" required />
                  </div>
                  <div className="input-field-wrap">
                    <label>Engagement Type</label>
                    <select className="calc-select-styled">
                      <option>Contract (Immediate Day-Rate)</option>
                      <option>Permanent Executive Search</option>
                      <option>Project Statement of Work (SOW)</option>
                    </select>
                  </div>
                </div>
                <div className="hub-submit-row">
                  <button type="submit" className="hub-submit-btn">Deploy 48h Shortlist Mandate ↗</button>
                  <span className="hub-trust-note">Ashwin Shiv personally handles your requirement</span>
                </div>
              </form>
            ) : (
              <form className="hub-form-content" onSubmit={handleCandidateSubmit}>
                <div className="hub-form-grid">
                  <div className="input-field-wrap">
                    <label>Full Name</label>
                    <input type="text" className="form-input-styled" placeholder="John Doe" required />
                  </div>
                  <div className="input-field-wrap">
                    <label>Mobile Number</label>
                    <input type="tel" className="form-input-styled" placeholder="+61 400 000 000" required />
                  </div>
                  <div className="input-field-wrap">
                    <label>Role / Target Discipline</label>
                    <input type="text" className="form-input-styled" placeholder="e.g. Senior Data Engineer" required />
                  </div>
                  <div className="input-field-wrap">
                    <label>LinkedIn Profile URL</label>
                    <input type="url" className="form-input-styled" placeholder="https://linkedin.com/in/yourname" />
                  </div>
                </div>
                <div className="hub-submit-row">
                  <button type="submit" className="hub-submit-btn">Submit Profile ↗</button>
                  <span className="hub-trust-note">Confidential Representation • Direct to Ashwin Shiv</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
