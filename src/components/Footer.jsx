import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenPortal }) {
  return (
    <footer className="site-footer section-dark" id="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand & Contact Authority */}
          <div className="footer-col-brand">
            <Link to="/" className="brand-logo" title="Prime Talent Solutions">
              <img src="/assets/prime-talent-logo.png" alt="Prime Talent Solutions" className="brand-logo-img" />
              <div className="brand-text">
                <span className="brand-title">PRIME TALENT</span>
                <span className="brand-subtitle">SOLUTIONS</span>
              </div>
            </Link>

            <p className="footer-desc">
              Specialized <strong>Cloud, Data &amp; AI, and Cybersecurity</strong> for Australian enterprises. <br />
              Led personally by <strong>Ashwin Shiv</strong> with 18+ years market authority.
            </p>

            <div className="footer-hq-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Level 49, 8 Parramatta Square, Sydney NSW 2150</span>
            </div>

            {/* Direct Contact Info */}
            <div className="footer-contact-cluster">
              <a href="tel:+610450173053" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Direct: <strong>+61 0450 173 053</strong></span>
              </a>
              <a href="mailto:info@primetalent.com.au" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>Email: <strong>info@primetalent.com.au</strong></span>
              </a>
            </div>

            {/* Official Company Social Channels */}
            <div className="footer-social-wrap">
              <span className="footer-social-label">Official Social Channels</span>
              <div className="footer-social-links">
                {/* Prime Talent Solutions LinkedIn Page */}
                <a 
                  href="https://www.linkedin.com/company/prime-talent-solutions/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-pill-btn" 
                  aria-label="Prime Talent Solutions on LinkedIn" 
                  title="Prime Talent Solutions on LinkedIn"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                  </svg>
                  <span>Prime Talent LinkedIn ↗</span>
                </a>

                {/* Prime Talent Solutions Instagram Page */}
                <a 
                  href="https://www.instagram.com/primetalentsolutions/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-pill-btn insta" 
                  aria-label="Prime Talent Solutions on Instagram" 
                  title="Prime Talent Solutions on Instagram"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>Prime Talent Instagram ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Practice Verticals */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Practice Verticals</h4>
            <ul className="footer-link-list">
              <li><Link to="/specialisations">Cloud &amp; Platform Engineering ↗</Link></li>
              <li><Link to="/specialisations">Data Engineering &amp; GenAI ↗</Link></li>
              <li><Link to="/specialisations">Cybersecurity &amp; Zero-Trust ↗</Link></li>
              <li><Link to="/specialisations">Digital &amp; Tech Leadership ↗</Link></li>
              <li><Link to="/salary-calculator">2026 Tech Salary Index ↗</Link></li>
            </ul>
          </div>

          {/* Col 3: Corporate & Engagement */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Corporate Access</h4>
            <ul className="footer-link-list">
              <li><Link to="/about">About Ashwin Shiv (18+ Yrs) ↗</Link></li>
              <li><Link to="/specialisations#journey">Our 4-Step Placement Journey ↗</Link></li>
              <li><Link to="/contact">Book Strategy Consultation ↗</Link></li>
              <li><a href="/#action-hub">Deploy 48h Hiring Mandate ↗</a></li>
              <li>
                <button 
                  type="button" 
                  onClick={onOpenPortal} 
                  title="Open Client & Candidate Portal"
                >
                  Client &amp; Candidate Portal ↗
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Strategic AI Co-Pilot */}
          <div className="footer-col-tech">
            <div className="jobgen-footer-card">
              <div className="jobgen-card-badge">STRATEGIC AI CO-PILOT</div>
              <div className="jobgen-brand-lockup">
                <img src="/assets/jobgen-logo.png" alt="JobGen.ai Logo" className="jobgen-logo-img" />
                <div className="jobgen-title-group">
                  <span className="jobgen-main-name">JobGen.ai</span>
                  <span className="jobgen-tagline">Autonomous Tech Sourcing Engine</span>
                </div>
              </div>
              <p className="jobgen-desc-text">
                Every Prime mandate is accelerated by JobGen.ai’s algorithmic candidate benchmarking and Ashwin Shiv’s 18+ years of Australian enterprise industry authority.
              </p>
              <div className="jobgen-feature-pills">
                <span className="jobgen-pill">✓ 48-Hour Shortlist</span>
                <span className="jobgen-pill">✓ APRA CPS 234 Aligned</span>
                <span className="jobgen-pill">✓ 100-Day Replacement Shield</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Custodians Acknowledgement */}
        <div className="indigenous-acknowledgement">
          <strong>Acknowledgment of Country</strong>
          Prime Talent Solutions acknowledges the Traditional Custodians of the lands across Australia upon which we operate, and specifically the Dharug people of the Eora Nation where our Sydney headquarters is located. We pay our respect to Elders past, present, and emerging.
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-info">
            <p className="footer-copyright">
              © 2026 Prime Talent Solutions Pty Ltd. ABN 89 678 123 456. Level 49, 8 Parramatta Square, Sydney NSW 2150. All rights reserved.
            </p>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Engagement</a>
              <a href="#security">APRA CPS 234 Compliance</a>
              <a href="#governance">Modern Slavery Statement</a>
            </div>
          </div>

          {/* Right Corner: Powered by JobGen */}
          <div className="footer-powered-by">
            <span className="footer-powered-text">Powered by</span>
            <a 
              href="https://jobgen.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-powered-link"
              title="JobGen.ai - Autonomous Tech Sourcing Engine"
            >
              <img 
                src="/assets/jobgen-logo.png" 
                alt="JobGen Logo" 
                className="footer-powered-logo" 
              />
              <span className="footer-powered-brand">JobGen<strong>.ai</strong></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
