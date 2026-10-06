import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LiveWatermark from '../components/LiveWatermark';
import { roleDatasets } from '../data/salaryData';

export default function SalaryCalculator() {
  const [domain, setDomain] = useState('cloud');
  const [roleIndex, setRoleIndex] = useState(0);
  const [seniority, setSeniority] = useState('senior');
  const [engagement, setEngagement] = useState('contract');

  const currentRoles = roleDatasets[domain] || [];
  const currentRole = currentRoles[roleIndex] || currentRoles[0] || {};

  const baseRate = engagement === 'contract' ? (currentRole.contract || 1350) : (currentRole.perm || 200000);
  let multiplier = 1.0;
  if (seniority === 'mid') multiplier = 0.85;
  if (seniority === 'lead') multiplier = 1.18;

  const finalVal = Math.round(baseRate * multiplier);
  const lowSpread = engagement === 'contract' ? Math.round(finalVal * 0.9) : Math.round(finalVal * 0.92);
  const highSpread = engagement === 'contract' ? Math.round(finalVal * 1.12) : Math.round(finalVal * 1.1);

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
    setRoleIndex(0);
  };

  return (
    <div className="salary-calculator-page">
      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <LiveWatermark variant="wm-aus" />
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Salary Index</span>
          </div>
          <h1 className="page-hero-title">Australian Tech Salary &amp; Day Rate Index 2026</h1>
          <p className="page-hero-subtitle">
            Real-time enterprise contract rates and permanent salary intelligence across Sydney, Melbourne, Brisbane &amp; Canberra.
          </p>
        </div>
      </div>

      {/* Calculator Section (Light) */}
      <section className="section section-light" id="calculator">
        <LiveWatermark variant="wm-ai" />
        <div className="container">
          <div className="calc-container-card">
            <div className="calc-header-strip">
              <div>
                  <span className="calc-live-indicator">
                  <span className="live-dot-ping"></span>
                    <span>2026 MARKET ESTIMATE</span>
                </span>
                <h2 className="calc-title">Tech Salary Calculator</h2>
              </div>
              <div className="calc-updated-tag">Sydney · March 2026</div>
            </div>

            <div className="calc-grid-layout">
              {/* Form Controls Column */}
              <div className="calc-controls-col">
                <div className="calc-field-group">
                  <label htmlFor="calcDomain">1. Select Domain Vertical</label>
                  <select 
                    id="calcDomain" 
                    className="calc-select-styled"
                    value={domain}
                    onChange={handleDomainChange}
                  >
                    <option value="cloud">Cloud Architecture &amp; DevOps / SRE</option>
                    <option value="data">Data Engineering, Snowflake &amp; GenAI</option>
                    <option value="cyber">Cybersecurity &amp; Zero-Trust / GRC</option>
                    <option value="digital">Digital Transformation &amp; Delivery</option>
                  </select>
                </div>

                <div className="calc-field-group">
                  <label htmlFor="calcRole">2. Select Benchmark Role</label>
                  <select 
                    id="calcRole" 
                    className="calc-select-styled"
                    value={roleIndex}
                    onChange={(e) => setRoleIndex(parseInt(e.target.value, 10))}
                  >
                    {currentRoles.map((r, idx) => (
                      <option key={idx} value={idx}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div className="calc-field-group">
                  <label>3. Experience &amp; Seniority Level</label>
                  <div className="calc-tab-group" id="seniorityGroup">
                    <button 
                      type="button" 
                      className={`calc-tab-btn ${seniority === 'mid' ? 'active' : ''}`}
                      onClick={() => setSeniority('mid')}
                    >
                      Mid-Weight (3-5 Yrs)
                    </button>
                    <button 
                      type="button" 
                      className={`calc-tab-btn ${seniority === 'senior' ? 'active' : ''}`}
                      onClick={() => setSeniority('senior')}
                    >
                      Senior Specialist (5-9 Yrs)
                    </button>
                    <button 
                      type="button" 
                      className={`calc-tab-btn ${seniority === 'lead' ? 'active' : ''}`}
                      onClick={() => setSeniority('lead')}
                    >
                      Lead / Principal (10+ Yrs)
                    </button>
                  </div>
                </div>

                <div className="calc-field-group">
                  <label>4. Engagement Structure</label>
                  <div className="calc-tab-group" id="engagementGroup">
                    <button 
                      type="button" 
                      className={`calc-tab-btn ${engagement === 'contract' ? 'active' : ''}`}
                      onClick={() => setEngagement('contract')}
                    >
                      Contract (Daily Rate)
                    </button>
                    <button 
                      type="button" 
                      className={`calc-tab-btn ${engagement === 'perm' ? 'active' : ''}`}
                      onClick={() => setEngagement('perm')}
                    >
                      Permanent (Annual Base)
                    </button>
                  </div>
                </div>
              </div>

              {/* Display Result Column */}
              <div className="calc-display-col">
                <div className="calc-result-box">
                  <div className="calc-result-kicker">ESTIMATED RATE (AUD)</div>
                  <div className="calc-big-number">
                    <span className="currency-sym">$</span>
                    <span id="rateValue" className="rate-value-num">{finalVal.toLocaleString()}</span>
                  </div>
                  <div id="ratePeriod" className="rate-period-label">
                    {engagement === 'contract' ? 'AUD / day' : 'AUD / year + Super'}
                  </div>

                  <div className="calc-spread-bar">
                    <span className="spread-label">Market range</span>
                    <strong id="rateSpread" className="spread-val">
                      ${lowSpread.toLocaleString()} – ${highSpread.toLocaleString()} AUD{engagement === 'perm' ? ' + Super' : ''}
                    </strong>
                  </div>

                  <div id="calcInsight" className="calc-insight-card">
                    <strong>Market Insight:</strong> {currentRole.insight}
                  </div>

                  <div className="calc-cta-row">
                    <Link to="/contact" className="btn-primary-hero" style={{ width: '100%', justifyContent: 'center' }}>
                      <span>Discuss this benchmark ↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Market Dynamics & Trends (Dark) */}
      <section className="section section-dark" id="salary-insights">
        <LiveWatermark variant="wm-cloud" />
        <div className="container">
          <div className="section-header">
            <span className="section-tag">2026 MARKET DYNAMICS</span>
            <h2 className="section-title">Australian Enterprise Compensation Drivers</h2>
            <p className="section-subtitle">Key factors dictating tech day rates and permanent packages across Sydney, Melbourne &amp; Canberra.</p>
          </div>

          <div className="bento-grid">
            <div className="bento-card card-cloud">
              <span className="bento-turnaround-badge">+8.4% YoY</span>
              <h3 className="bento-heading">Multi-Cloud Resilience &amp; APRA</h3>
              <p className="bento-summary">Financial services face strict regulatory deadlines for operational resilience, driving day rates for senior AWS and Azure platform architects above $1,450/day.</p>
            </div>

            <div className="bento-card card-data">
              <span className="bento-turnaround-badge">Acute Talent Scarcity</span>
              <h3 className="bento-heading">Modern Data Stack &amp; Private GenAI</h3>
              <p className="bento-summary">Snowflake data mesh and Databricks lakehouse engineers with Python/dbt command 15-20% premiums over legacy ETL specialists.</p>
            </div>

            <div className="bento-card card-cyber">
              <span className="bento-turnaround-badge">Mandatory Compliance</span>
              <h3 className="bento-heading">APRA CPS 234 &amp; Zero-Trust</h3>
              <p className="bento-summary">Zero-trust architects and ISO 27001 / ASD Essential 8 specialists are in critical demand across federal government and Tier-1 banking desks.</p>
            </div>

            <div className="bento-card card-digital">
              <span className="bento-turnaround-badge">Delivery Execution</span>
              <h3 className="bento-heading">Core Modernization Programs</h3>
              <p className="bento-summary">Senior Program Directors and SAFe agile delivery coaches are leading complex legacy core migration initiatives with 12+ month contracts.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
