import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LiveWatermark from '../components/LiveWatermark';
import HeroParticles from '../components/HeroParticles';
import { sampleJobs } from '../data/salaryData';

export default function Home({ onShowToast, onOpenBot }) {
  // Video state
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Stats Counters
  const [counters, setCounters] = useState({
    exp: 0,
    speed: 0,
    retention: 0,
    placed: 0
  });
  const [isPulsing, setIsPulsing] = useState(false);

  // Jobs filter
  const [jobFilter, setJobFilter] = useState('all');

  // Hub tabs
  const [hubTab, setHubTab] = useState('employer');
  const [candRole, setCandRole] = useState('');

  // Strategy booking
  const [bookSlot, setBookSlot] = useState('Tomorrow 10:00 AM');

  // Animate counters periodically: count up from 0 -> hold at high -> repeat
  useEffect(() => {
    let animId = null;
    let loopTimeout = null;
    let pulseTimeout = null;
    const duration = 1500;
    const targets = { exp: 18, speed: 4, retention: 96, placed: 500 };

    const runCountUp = () => {
      if (animId) cancelAnimationFrame(animId);
      clearTimeout(loopTimeout);
      clearTimeout(pulseTimeout);

      let startTime = null;
      setCounters({ exp: 0, speed: 0, retention: 0, placed: 0 });
      setIsPulsing(false);

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Smooth cubic ease-out

        setCounters({
          exp: Math.floor(ease * targets.exp),
          speed: Math.floor(ease * targets.speed),
          retention: Math.floor(ease * targets.retention),
          placed: Math.floor(ease * targets.placed)
        });

        if (progress < 1) {
          animId = requestAnimationFrame(animate);
        } else {
          setCounters(targets);
          setIsPulsing(true);
          pulseTimeout = setTimeout(() => setIsPulsing(false), 600);
          // Hold high numbers for ~4.2 seconds before counting up from 0 again
          loopTimeout = setTimeout(runCountUp, 4200);
        }
      };

      animId = requestAnimationFrame(animate);
    };

    // Trigger on mount & observe visibility when scrolled into view
    const metricsEl = document.getElementById('metrics-strip');
    let observer = null;
    if (metricsEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCountUp();
            } else {
              clearTimeout(loopTimeout);
              if (animId) cancelAnimationFrame(animId);
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(metricsEl);
    } else {
      runCountUp();
    }

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(loopTimeout);
      clearTimeout(pulseTimeout);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleQuickApply = (roleTitle) => {
    setHubTab('candidate');
    setCandRole(roleTitle);
    const el = document.getElementById('action-hub');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    onShowToast(`Applying for: ${roleTitle}`);
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
    setCandRole('');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    onShowToast('✓ Strategy Call confirmed with Ashwin Shiv. Calendar invite sent.');
    e.target.reset();
  };

  const filteredJobs = sampleJobs.filter(j => jobFilter === 'all' || j.domain === jobFilter);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section section-dark" id="hero">
        <div className="hero-backdrop-container">
          <video
            ref={videoRef}
            id="heroBgVideo"
            className={`hero-bg-video ${videoLoaded ? 'video-ready' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/parramatta-skyline.jpg"
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoLoaded(false)}
          >
            <source src="/assets/hero-bg.mp4" type="video/mp4" />
          </video>

          <div className={`hero-bg-fallback ${videoLoaded ? 'hidden' : ''}`} id="heroBgFallback" />

          {/* Full-bleed dark overlay over entire video for perfect text visibility */}
          <div className="hero-overlay-gradient" />

          {/* Interactive Network Particles */}
          <HeroParticles />

        </div>

        <div className="container hero-content-container">
          <div className="hero-content">
            <h1 className="hero-main-title">
              Top 1% Australian Tech Talent. <br />
              <span className="hero-highlight-phrase">
                Curated for Your Enterprise.
                <svg className="curved-arrow-accent" viewBox="0 0 250 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10.5C65 2.5 185 2.5 247 10.5" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="hero-lead-text">
              Specialized <strong>Cloud, Data &amp; AI, and Cybersecurity</strong> for Australian enterprises. <br />
              Led personally by <strong>Ashwin Shiv</strong> with 18+ years of market authority.
            </p>

            <div className="hero-actions-cluster">
              <a href="#action-hub" className="btn-primary-hero">
                <span>Hire Tech Leaders ↗</span>
              </a>
              <Link to="/salary-calculator" className="btn-glass-hero">
                <span>Explore 2026 Salary Index ↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Metrics Dock - Directly Below Hero Video */}
      <section className="hero-metrics-dock" id="metrics-strip">
        <div className="container">
          <div className="metrics-dock-grid">
            <div className="dock-metric-col metric-cloud">
              <div className="dock-number">
                <span className={`stat-counter ${isPulsing ? 'count-pulse' : ''}`}>{counters.exp}</span>
                <span className="accent-unit">+</span>
              </div>
              <div className="dock-label">Years Experience</div>
              <div className="dock-subtext">ANZ Banking &amp; Fortune 500</div>
            </div>

            <div className="dock-metric-col metric-data">
              <div className="dock-number">
                <span className={`stat-counter ${isPulsing ? 'count-pulse' : ''}`}>{counters.speed}</span>
              </div>
              <div className="dock-label">Specialist Verticals</div>
              <div className="dock-subtext">Cloud, Data &amp; AI, Cyber &amp; Digital</div>
            </div>

            <div className="dock-metric-col metric-cyber">
              <div className="dock-number">
                <span className={`stat-counter ${isPulsing ? 'count-pulse' : ''}`}>{counters.retention}</span>
                <span className="accent-unit">%</span>
              </div>
              <div className="dock-label">Retention Rate</div>
              <div className="dock-subtext">12-Month placement guarantee</div>
            </div>

            <div className="dock-metric-col metric-digital">
              <div className="dock-number">
                <span className={`stat-counter ${isPulsing ? 'count-pulse' : ''}`}>{counters.placed}</span>
                <span className="accent-unit">+</span>
              </div>
              <div className="dock-label">Leaders Placed</div>
              <div className="dock-subtext">Enterprise &amp; Federal Government</div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars of High-Conviction Tech Delivery (Light) */}
      <section className="section section-light" id="practice-areas">
        <LiveWatermark variant="wm-cloud" />
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Four Pillars of High-Conviction Tech Delivery</h2>
            <p className="section-subtitle">
              We do not generalize. Prime Talent focuses exclusively on four high-impact verticals shaping Australian enterprise capability, matching organisations with carefully vetted specialists.
            </p>
          </div>

          <div className="bento-grid">
            {/* Pillar 1: Cloud & Infrastructure */}
            <div className="bento-card card-cloud">
              <div className="bento-top-row">
                <div className="domain-icon-box icon-cloud">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                  </svg>
                </div>
                <span className="bento-turnaround-badge">Vetted Talent Network</span>
              </div>
              <h3 className="bento-heading">Cloud &amp; Platform Engineering</h3>
              <p className="bento-summary">
                Multi-cloud enterprise architects, Kubernetes platform engineers, Terraform GitOps automation, and APRA-aligned SRE operational risk resilience.
              </p>
              <div className="bento-tags-cluster">
                <span className="bento-tag">AWS Solutions Architect</span>
                <span className="bento-tag">Azure Multi-Region</span>
                <span className="bento-tag">Kubernetes (EKS/AKS)</span>
                <span className="bento-tag">Terraform &amp; GitOps</span>
                <span className="bento-tag">SRE Resilience</span>
              </div>
              <div className="bento-footer-strip">
                <div className="bento-rate-bracket">
                  Market Benchmark: <strong>$1,200 – $1,550 / day</strong>
                </div>
                <Link to="/specialisations" className="bento-cta-link">Explore Practice Details ↗</Link>
              </div>
            </div>

            {/* Pillar 2: Data Engineering & GenAI */}
            <div className="bento-card card-data">
              <div className="bento-top-row">
                <div className="domain-icon-box icon-data">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <span className="bento-turnaround-badge">High Enterprise Demand</span>
              </div>
              <h3 className="bento-heading">Data Engineering &amp; GenAI</h3>
              <p className="bento-summary">
                Enterprise Databricks lakehouses, Snowflake data mesh architectures, real-time PySpark streaming, and private enterprise LLM / GenAI deployments with governance.
              </p>
              <div className="bento-tags-cluster">
                <span className="bento-tag">Snowflake Data Mesh</span>
                <span className="bento-tag">Databricks Lakehouse</span>
                <span className="bento-tag">PySpark &amp; dbt</span>
                <span className="bento-tag">Enterprise GenAI / LLM</span>
                <span className="bento-tag">Data Governance</span>
              </div>
              <div className="bento-footer-strip">
                <div className="bento-rate-bracket">
                  Market Benchmark: <strong>$1,250 – $1,650 / day</strong>
                </div>
                <Link to="/specialisations" className="bento-cta-link">Explore Practice Details ↗</Link>
              </div>
            </div>

            {/* Pillar 3: Cybersecurity & Zero-Trust */}
            <div className="bento-card card-cyber">
              <div className="bento-top-row">
                <div className="domain-icon-box icon-cyber">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <span className="bento-turnaround-badge">APRA CPS 234</span>
              </div>
              <h3 className="bento-heading">Cybersecurity &amp; Zero-Trust</h3>
              <p className="bento-summary">
                Zero-trust network architecture, APRA CPS 234 compliance mandates, ASD Essential 8 maturity uplift, 24/7 SecOps incident response, and GRC advisory.
              </p>
              <div className="bento-tags-cluster">
                <span className="bento-tag">Zero-Trust Architecture</span>
                <span className="bento-tag">APRA CPS 234 Mandate</span>
                <span className="bento-tag">ASD Essential 8</span>
                <span className="bento-tag">SecOps &amp; SOC Leads</span>
                <span className="bento-tag">IAM / Identity</span>
              </div>
              <div className="bento-footer-strip">
                <div className="bento-rate-bracket">
                  Market Benchmark: <strong>$1,300 – $1,650 / day</strong>
                </div>
                <Link to="/specialisations" className="bento-cta-link">Explore Practice Details ↗</Link>
              </div>
            </div>

            {/* Pillar 4: Digital & Tech Delivery Leadership */}
            <div className="bento-card card-digital">
              <div className="bento-top-row">
                <div className="domain-icon-box icon-digital">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <span className="bento-turnaround-badge">Mission-Critical</span>
              </div>
              <h3 className="bento-heading">Digital &amp; Tech Delivery Leadership</h3>
              <p className="bento-summary">
                Enterprise agile program directors, SAFe transformation leads, technical business analysts, and heads of engineering executing mission-critical transformations.
              </p>
              <div className="bento-tags-cluster">
                <span className="bento-tag">Program Directors</span>
                <span className="bento-tag">SAFe 6.0 Agile</span>
                <span className="bento-tag">Technical BAs</span>
                <span className="bento-tag">Core Banking Delivery</span>
                <span className="bento-tag">Engineering Leads</span>
              </div>
              <div className="bento-footer-strip">
                <div className="bento-rate-bracket">
                  Market Benchmark: <strong>$1,350 – $1,750 / day</strong>
                </div>
                <Link to="/specialisations" className="bento-cta-link">Explore Practice Details ↗</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Founder Advantage - Direct Engagement with Ashwin Shiv (Dark) */}
      <section className="section section-dark" id="founder-advantage">
        <LiveWatermark variant="wm-cyber" />
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Direct Engagement with Ashwin Shiv</h2>
            <p className="section-subtitle">
              When you partner with Prime Talent Solutions, your hiring brief is never delegated down to junior screeners. You work directly with 18+ years of Australian IT recruitment authority.
            </p>
          </div>

          <div className="founder-card-box">
            <div className="founder-grid-layout">
              {/* Portrait Column */}
              <div className="founder-portrait-column">
                <div className="founder-frame">
                  <img 
                    src="/assets/ashwin-shiv.jpg" 
                    alt="Ashwin Shiv - Founder & Managing Director" 
                    className="founder-photo" 
                  />
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
                <div className="founder-kicker">Founder Spotlight • Australian Tech Leadership</div>
                <h2 className="founder-name-title">Ashwin Shiv</h2>
                <div className="founder-headline">Director &amp; Principal Recruiter • 18+ Years Across Australia, APAC &amp; US</div>

                <div className="founder-quote-banner">
                  &ldquo;Throughout my career as an internal talent leader for Fortune 500s and top ANZ financial institutions, I learned that true talent acquisition is a strategic investment in organizational success — never a numbers game.&rdquo;
                </div>

                {/* 3 Pillars of Conviction */}
                <div className="founder-milestones">
                  <div className="milestone-item">
                    <div className="milestone-index">01</div>
                    <div className="milestone-text">
                      <strong>Zero Junior Delegation</strong>
                      <p>Ashwin Shiv conducts technical calibration personally to ensure zero CV spam, precise rate alignment, and immediate project fit.</p>
                    </div>
                  </div>

                  <div className="milestone-item">
                    <div className="milestone-index">02</div>
                    <div className="milestone-text">
                      <strong>JobGen.ai AI Sourcing Intelligence</strong>
                      <p>Advanced algorithmic skills scoring matches active Australian engineering talent with enterprise culture and compliance mandates.</p>
                    </div>
                  </div>

                  <div className="milestone-item">
                    <div className="milestone-index">03</div>
                    <div className="milestone-text">
                      <strong>100-Day Replacement Shield &amp; 96% Retention</strong>
                      <p>Unmatched confidence backed by our 12-month placement track record and unconditional 100-day full replacement guarantee.</p>
                    </div>
                  </div>
                </div>

                <div className="founder-ctas">
                  <Link to="/about" className="btn-primary-hero">
                    <span>Read Full Leadership Story ↗</span>
                  </Link>
                  <a href="#contact" className="btn-glass-hero">
                    <span>Book 1-on-1 Call with Ashwin ↗</span>
                  </a>
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

      {/* Live Jobs Board (Light) */}
      <section className="section section-light" id="jobs">
        <LiveWatermark variant="wm-ai" />
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Active Australian Enterprise Roles</h2>
            <p className="section-subtitle">Pre-qualified contract and permanent positions currently available across Sydney, Melbourne &amp; Canberra.</p>
          </div>

          <div className="filter-chips-row" id="jobFilterChips">
            <button className={`filter-chip-btn ${jobFilter === 'all' ? 'active' : ''}`} onClick={() => setJobFilter('all')}>All Roles</button>
            <button className={`filter-chip-btn ${jobFilter === 'cloud' ? 'active' : ''}`} onClick={() => setJobFilter('cloud')}>Cloud &amp; Platform</button>
            <button className={`filter-chip-btn ${jobFilter === 'data' ? 'active' : ''}`} onClick={() => setJobFilter('data')}>Data &amp; AI</button>
            <button className={`filter-chip-btn ${jobFilter === 'cyber' ? 'active' : ''}`} onClick={() => setJobFilter('cyber')}>Cybersecurity</button>
            <button className={`filter-chip-btn ${jobFilter === 'digital' ? 'active' : ''}`} onClick={() => setJobFilter('digital')}>Digital Leadership</button>
          </div>

          <div className="jobs-grid-layout" id="jobsGrid">
            {filteredJobs.map(job => (
              <div key={job.id} className={`job-card-item card-${job.domain}`}>
                <div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className={`job-type-badge ${job.domain === 'cyber' ? 'perm' : 'contract'}`}>
                    {job.type}
                  </span>
                  <span className="job-rate-highlight">{job.rate}</span>
                </div>
                <h3 className="job-card-title">{job.title}</h3>
                <div className="job-location-sub">{job.location}</div>
                <p className="job-card-desc">{job.summary}</p>
                <div className="bento-tags-cluster" style={{ marginBottom: '18px' }}>
                  {job.tags.map((t, idx) => <span key={idx} className="bento-tag">{t}</span>)}
                </div>
                <div className="job-card-footer">
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified Active Mandate</span>
                  <button className="btn-quick-apply" onClick={() => handleQuickApply(job.title)}>Quick Apply (30s) ↗</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 60-Second Action Hub */}
      <section className="section section-dark" id="action-hub">
        <LiveWatermark variant="wm-circuit" />
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">60-Second Action Hub</h2>
            <p className="section-subtitle">Whether you are hiring or exploring discreet leadership opportunities, initiate direct engagement below.</p>
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
                    <input type="text" className="form-input-styled" placeholder="e.g. Lead Snowflake Data Engineer" required />
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
                  <button type="submit" className="hub-submit-btn">Submit Hiring Mandate ↗</button>
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
                    <input 
                      type="text" 
                      className="form-input-styled" 
                      placeholder="e.g. Senior Cloud Architect" 
                      value={candRole}
                      onChange={(e) => setCandRole(e.target.value)}
                      required 
                    />
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

      {/* Direct Strategy Booking (Light) */}
      <section className="section section-light" id="contact">
        <LiveWatermark variant="wm-aus" />
        <div className="container">
          <div className="contact-layout-grid">
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
    </div>
  );
}
