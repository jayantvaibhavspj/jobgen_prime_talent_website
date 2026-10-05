import React from 'react';
import { Link } from 'react-router-dom';
import LiveWatermark from '../components/LiveWatermark';

export default function Specialisations() {
  return (
    <div className="specialisations-page">
      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <LiveWatermark variant="wm-cloud" />
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Practice Areas</span>
          </div>
          <h1 className="page-hero-title">Specialized IT Practice Areas</h1>
          <p className="page-hero-subtitle">
            High-conviction vertical expertise across Cloud, Data &amp; AI, Cybersecurity, and Digital Delivery for Australian enterprise and government.
          </p>
        </div>
      </div>

      {/* Core Practice Areas Bento Grid (Light) */}
      <section className="section section-light" id="specialisations">
        <LiveWatermark variant="wm-ai" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">CORE PRACTICE AREAS</span>
            <h2 className="section-title">Specialized IT Practice Areas</h2>
            <p className="section-subtitle">Deep vertical expertise across Australia's highest-demand enterprise technologies.</p>
          </div>

          <div className="bento-grid">
            {/* Cloud & Infrastructure */}
            <div className="bento-card card-cloud">
              <div className="bento-top-row">
                <div className="domain-icon-box icon-cloud">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                  </svg>
                </div>
                <span className="bento-turnaround-badge">48h Shortlist</span>
              </div>
              <h3 className="bento-heading">Cloud &amp; Infrastructure</h3>
              <p className="bento-summary">Architects, DevOps leads, and SRE specialists for enterprise AWS, Azure, and multi-cloud modernization.</p>
              <div className="bento-tags-cluster">
                <span className="bento-tag">AWS Pro</span>
                <span className="bento-tag">Azure Cloud</span>
                <span className="bento-tag">Kubernetes</span>
                <span className="bento-tag">Terraform</span>
                <span className="bento-tag">SRE Leads</span>
              </div>
              <div className="bento-footer-strip">
                <div className="bento-rate-bracket">
                  Market Rate: <strong>$1,100 – $1,650 / day</strong>
                </div>
                <Link to="/contact" className="bento-cta-link">Hire Cloud Talent ↗</Link>
              </div>
            </div>

            {/* BI, Data & AI */}
            <div className="bento-card card-data">
              <div className="bento-top-row">
                <div className="domain-icon-box icon-data">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <span className="bento-turnaround-badge">High Demand</span>
              </div>
              <h3 className="bento-heading">BI, Data &amp; AI</h3>
              <p className="bento-summary">Specialized data engineers and architects building modern lakehouses, Snowflake pipelines, and GenAI applications.</p>
              <div className="bento-tags-cluster">
                <span className="bento-tag">Snowflake</span>
                <span className="bento-tag">Databricks</span>
                <span className="bento-tag">PySpark</span>
                <span className="bento-tag">dbt</span>
                <span className="bento-tag">GenAI &amp; LLMs</span>
              </div>
              <div className="bento-footer-strip">
                <div className="bento-rate-bracket">
                  Market Rate: <strong>$1,050 – $1,550 / day</strong>
                </div>
                <Link to="/contact" className="bento-cta-link">Hire Data Talent ↗</Link>
              </div>
            </div>

            {/* Cybersecurity */}
            <div className="bento-card card-cyber">
              <div className="bento-top-row">
                <div className="domain-icon-box icon-cyber">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <span className="bento-turnaround-badge">APRA CPS 234</span>
              </div>
              <h3 className="bento-heading">Cybersecurity</h3>
              <p className="bento-summary">Zero-trust architects, SecOps leads, and GRC consultants ensuring compliance with APRA CPS 234 and Essential 8.</p>
              <div className="bento-tags-cluster">
                <span className="bento-tag">Zero Trust</span>
                <span className="bento-tag">SecOps &amp; SOC</span>
                <span className="bento-tag">ISO 27001</span>
                <span className="bento-tag">Federal Cleared</span>
                <span className="bento-tag">IAM / Okta</span>
              </div>
              <div className="bento-footer-strip">
                <div className="bento-rate-bracket">
                  Market Rate: <strong>$1,200 – $1,800 / day</strong>
                </div>
                <Link to="/contact" className="bento-cta-link">Hire Cyber Talent ↗</Link>
              </div>
            </div>

            {/* Digital & Delivery */}
            <div className="bento-card card-digital">
              <div className="bento-top-row">
                <div className="domain-icon-box icon-digital">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <span className="bento-turnaround-badge">Enterprise</span>
              </div>
              <h3 className="bento-heading">Digital &amp; Delivery</h3>
              <p className="bento-summary">Enterprise agile coaches, program directors, and lead business analysts driving major organizational transformation.</p>
              <div className="bento-tags-cluster">
                <span className="bento-tag">Program Directors</span>
                <span className="bento-tag">SAFe Agile</span>
                <span className="bento-tag">Lead BAs</span>
                <span className="bento-tag">Scrum Masters</span>
                <span className="bento-tag">Product Leads</span>
              </div>
              <div className="bento-footer-strip">
                <div className="bento-rate-bracket">
                  Market Rate: <strong>$1,000 – $1,500 / day</strong>
                </div>
                <Link to="/contact" className="bento-cta-link">Hire Delivery Leads ↗</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Placement Journey */}
      <section className="section section-dark" id="journey">
        <LiveWatermark variant="wm-cyber" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">DELIVERY FRAMEWORK</span>
            <h2 className="section-title">Our 4-Step Placement Journey</h2>
            <p className="section-subtitle">Structured, frictionless hiring delivering top 1% engineering talent without project delay.</p>
          </div>

          <div className="journey-grid-row">
            <div className="journey-step-box">
              <div className="journey-step-tag">STEP 01</div>
              <span className="journey-time-tag">2 Hours</span>
              <h4>Calibration</h4>
              <p>Ashwin Shiv personally analyzes your architectural stack, day rate bounds, security clearances, and delivery milestones.</p>
            </div>

            <div className="journey-step-box">
              <div className="journey-step-tag">STEP 02</div>
              <span className="journey-time-tag">48h Guaranteed</span>
              <h4>Curated Shortlist</h4>
              <p>JobGen.ai intelligence screens our 500+ pre-vetted Australian tech network, delivering 3 top-tier candidates with detailed rubrics.</p>
            </div>

            <div className="journey-step-box">
              <div className="journey-step-tag">STEP 03</div>
              <span className="journey-time-tag">5-7 Days</span>
              <h4>Interview Panel</h4>
              <p>We coordinate structured technical interviews, manage rate negotiation, and handle reference validation without friction.</p>
            </div>

            <div className="journey-step-box">
              <div className="journey-step-tag">STEP 04</div>
              <span className="journey-time-tag">100-Day Shield</span>
              <h4>Guaranteed Onboarding</h4>
              <p>Automated Australian payroll, Super, and insurances. Backed by our 96% retention rate and 100-day replacement shield.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rapid Engagement Callout (Light) */}
      <section className="section section-light" id="specialisations-cta">
        <LiveWatermark variant="wm-aus" />
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span className="section-tag">IMMEDIATE 48-HOUR ACCESS</span>
          <h2 className="section-title">Ready to Fill an Urgent Technical Gap?</h2>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            Bypass junior agency screeners. Speak directly with Ashwin Shiv to calibrate your requirements and receive 3 pre-vetted Australian candidates within 48 hours.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary-hero">
              <span>Book Calibration Call with Ashwin ↗</span>
            </Link>
            <Link to="/salary-calculator" className="btn-glass-hero">
              <span>Benchmark Day Rates ↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
