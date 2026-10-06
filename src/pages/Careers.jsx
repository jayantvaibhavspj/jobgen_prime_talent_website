import React from 'react';
import { Link } from 'react-router-dom';
import LiveWatermark from '../components/LiveWatermark';
import { sampleJobs } from '../data/salaryData';

export default function Careers() {
  return (
    <div className="careers-page">
      <div className="page-hero-banner">
        <LiveWatermark variant="wm-aus" />
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Careers</span>
          </div>
          <h1 className="page-hero-title">Find Your Next Tech Opportunity</h1>
          <p className="page-hero-subtitle">
            Explore specialist technology roles with Australian organisations and get confidential support from our recruitment team.
          </p>
          <Link to="/contact?type=candidate#action-hub" className="btn-primary-hero">
            <span>Share Your Profile ↗</span>
          </Link>
        </div>
      </div>

      <section className="section section-light" id="career-opportunities">
        <LiveWatermark variant="wm-ai" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">CAREER OPPORTUNITIES</span>
            <h2 className="section-title">Explore Technology Roles</h2>
            <p className="section-subtitle">
              Browse current opportunities across cloud, data, cybersecurity and digital delivery. Select a role to send your profile for confidential consideration.
            </p>
          </div>

          <div className="jobs-grid-layout">
            {sampleJobs.map((job) => (
              <article key={job.id} className={`job-card-item card-${job.domain}`}>
                <div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '12px' }}>
                  <span className={`job-type-badge ${job.domain === 'cyber' ? 'perm' : 'contract'}`}>
                    {job.type}
                  </span>
                  <span className="job-rate-highlight">{job.rate}</span>
                </div>
                <h3 className="job-card-title">{job.title}</h3>
                <div className="job-location-sub">{job.location}</div>
                <p className="job-card-desc">{job.summary}</p>
                <div className="bento-tags-cluster" style={{ marginBottom: '18px' }}>
                  {job.tags.map((tag) => <span key={tag} className="bento-tag">{tag}</span>)}
                </div>
                <div className="job-card-footer">
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Confidential application</span>
                  <Link
                    className="btn-quick-apply"
                    to={`/contact?type=candidate&role=${encodeURIComponent(job.title)}#action-hub`}
                  >
                    Apply for role ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: '56px' }}>
            <h2 className="section-title">Can’t see the right role?</h2>
            <p className="section-subtitle">
              Share your experience and areas of interest. We’ll keep your details confidential and contact you when a suitable opportunity arises.
            </p>
            <Link to="/contact?type=candidate#action-hub" className="btn-primary-hero">
              <span>Submit Your Profile ↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
