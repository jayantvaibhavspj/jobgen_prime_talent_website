import React from 'react';
import { Link } from 'react-router-dom';
import LiveWatermark from '../components/LiveWatermark';

export default function About() {
  return (
    <div className="about-page">
      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <LiveWatermark variant="wm-aus" />
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Leadership</span>
          </div>
          <h1 className="page-hero-title">Leadership &amp; Industry Authority</h1>
          <p className="page-hero-subtitle">
            18+ years identifying pivotal technical talent for Fortune 500 enterprises, ANZ Tier-1 banks, and federal agencies.
          </p>
        </div>
      </div>

      {/* Leadership & Story Section (Light) */}
      <section className="section section-light" id="about-us">
        <LiveWatermark variant="wm-cyber" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">LEADERSHIP &amp; AUTHORITY</span>
            <h2 className="section-title">The Strategic Bridge to Elite Australian Tech Talent</h2>
            <p className="section-subtitle">
              Founded and directed personally by Ashwin Shiv. 18+ years identifying pivotal technical talent for Fortune 500s, top ANZ banks, and federal agencies.
            </p>
          </div>

          <div className="founder-card-box">
            <div className="founder-grid-layout">
              {/* Portrait Column */}
              <div className="founder-portrait-column">
                <div className="founder-frame">
                  <img src="/assets/ashwin-shiv.jpg" alt="Ashwin Shiv - Founder & Director" className="founder-photo" />
                  <div className="founder-tech-hologram">
                    <span className="hologram-dot"></span>
                    <span>VERIFIED TECH DIRECTOR</span>
                  </div>
                </div>
                <div className="founder-loc-chip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Level 49, 8 Parramatta Square, Sydney NSW</span>
                </div>
              </div>

              {/* Content Column */}
              <div className="founder-content-column">
                <div className="founder-kicker">Founder Spotlight • My Story</div>
                <h2 className="founder-name-title">Ashwin Shiv</h2>
                <div className="founder-headline">18+ Years IT Recruitment Across Australia, APAC &amp; US</div>

                <div className="founder-quote-banner">
                  &ldquo;Throughout my career as an internal recruiter for Fortune 500s and top ANZ financial institutions, I learned that true talent acquisition is a strategic investment in organizational success — never a numbers game.&rdquo;
                </div>

                {/* Milestones */}
                <div className="founder-milestones">
                  <div className="milestone-item">
                    <div className="milestone-index">01</div>
                    <div className="milestone-text">
                      <strong>Fortune 500 &amp; ANZ Banking Recruiter</strong>
                      <p>Scaled enterprise talent teams and led complex talent mapping for leading financial institutions across Australia and APAC.</p>
                    </div>
                  </div>

                  <div className="milestone-item">
                    <div className="milestone-index">02</div>
                    <div className="milestone-text">
                      <strong>Consulting &amp; Federal Agency Delivery Partner</strong>
                      <p>Successfully steered technical recruitment for major management consulting firms and federal government agencies.</p>
                    </div>
                  </div>

                  <div className="milestone-item">
                    <div className="milestone-index">03</div>
                    <div className="milestone-text">
                      <strong>Pioneer of 'Solution-Focused Hiring'</strong>
                      <p>Founded Prime Talent Solutions with a pledge of personalized service, niche IT expertise, and verified 96% retention.</p>
                    </div>
                  </div>
                </div>

                <div className="founder-ctas">
                  <Link to="/contact" className="btn-primary-hero">
                    <span>Book 1-on-1 Call with Ashwin ↗</span>
                  </Link>
                  <a 
                    href="https://www.linkedin.com/in/ashwinshiv/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-pill-btn"
                    title="Connect with Ashwin Shiv on LinkedIn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                    </svg>
                    <span>Ashwin Shiv on LinkedIn ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Section */}
      <section className="section section-dark" id="why-us">
        <LiveWatermark variant="wm-circuit" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">QUALITY STANDARDS</span>
            <h2 className="section-title">Why Australian Tech Leaders Choose Prime Talent</h2>
            <p className="section-subtitle">How our founder-led, high-conviction model outperforms traditional agency recruitment.</p>
          </div>

          <div className="matrix-container-card">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Evaluation Criteria</th>
                  <th>Typical Generalist Agency</th>
                  <th className="col-prime">
                    <span style={{ color: 'var(--gold-text)', fontWeight: 800 }}>Prime Talent Solutions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Shortlist Turnaround</strong></td>
                  <td><span className="matrix-fail">✕</span> 4 to 6 weeks average delay</td>
                  <td className="col-prime"><span className="matrix-pass">✓</span> <strong>48 Hours Guaranteed</strong></td>
                </tr>
                <tr>
                  <td><strong>Recruiter Seniority</strong></td>
                  <td><span className="matrix-fail">✕</span> Junior recruiters with high turnover</td>
                  <td className="col-prime"><span className="matrix-pass">✓</span> <strong>18+ Yrs Founder-Led (Ashwin Shiv)</strong></td>
                </tr>
                <tr>
                  <td><strong>Technical Quality &amp; Vetting</strong></td>
                  <td><span className="matrix-fail">✕</span> Unvetted keyword resume dumps</td>
                  <td className="col-prime"><span className="matrix-pass">✓</span> <strong>Objective Blind Rubric &amp; Tech Screen</strong></td>
                </tr>
                <tr>
                  <td><strong>12-Month Retention Rate</strong></td>
                  <td><span className="matrix-fail">✕</span> 71% Industry Average (High churn)</td>
                  <td className="col-prime"><span className="matrix-pass">✓</span> <strong>96% Verified Retention Guarantee</strong></td>
                </tr>
                <tr>
                  <td><strong>Pricing Transparency</strong></td>
                  <td><span className="matrix-fail">✕</span> Opaque contractor markups</td>
                  <td className="col-prime"><span className="matrix-pass">✓</span> <strong>100% Transparent Rates + Compliance</strong></td>
                </tr>
                <tr>
                  <td><strong>Sourcing Intelligence</strong></td>
                  <td><span className="matrix-fail">✕</span> Standard job boards &amp; InMail</td>
                  <td className="col-prime"><span className="matrix-pass">✓</span> <strong>JobGen.ai Proprietary Sourcing</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Light) */}
      <section className="section section-light" id="testimonials">
        <LiveWatermark variant="wm-ai" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">VERIFIED FEEDBACK</span>
            <h2 className="section-title">Verified Executive Testimonials</h2>
            <p className="section-subtitle">Real experiences from engineering leaders and placed candidates across Australia.</p>
          </div>

          <div className="testimonials-row">
            <div className="testi-card-box">
              <div className="testi-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" style={{ marginRight: '3px' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="testi-quote-text">&ldquo;Prime Talent scaled our Data &amp; Cloud team with outstanding speed and quality. Their turnaround time in presenting vetted candidates exceeded our expectations.&rdquo;</p>
              <div className="testi-profile">
                <div className="testi-avatar-init">PU</div>
                <div>
                  <div className="testi-name">Priyanka U.</div>
                  <div className="testi-title">Talent Acquisition Manager, Enterprise Tech</div>
                </div>
              </div>
            </div>

            <div className="testi-card-box">
              <div className="testi-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" style={{ marginRight: '3px' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="testi-quote-text">&ldquo;Exceptional candidate support. From interview coaching to securing a top offer, Ashwin's team ensured a seamless transition into my new role.&rdquo;</p>
              <div className="testi-profile">
                <div className="testi-avatar-init">AS</div>
                <div>
                  <div className="testi-name">Aditya Singh</div>
                  <div className="testi-title">Senior Business Analyst, Banking</div>
                </div>
              </div>
            </div>

            <div className="testi-card-box">
              <div className="testi-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" style={{ marginRight: '3px' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="testi-quote-text">&ldquo;Ashwin's domain expertise in Data &amp; Cloud is unmatched in Australia. They coached me through interviews and landed me an ideal contract within 3 days.&rdquo;</p>
              <div className="testi-profile">
                <div className="testi-avatar-init">PM</div>
                <div>
                  <div className="testi-name">Peter M.</div>
                  <div className="testi-title">Senior Data Architect, FinTech</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
