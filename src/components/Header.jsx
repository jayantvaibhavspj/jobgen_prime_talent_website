import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header" id="siteHeader">
      <div className="container">
        <div className="header-capsule">
          {/* Logo */}
          <Link to="/" className="brand-logo" aria-label="Prime Talent Solutions" onClick={closeMobileMenu}>
            <img src="/assets/prime-talent-logo.png" alt="Prime Talent Solutions Logo" className="brand-logo-img" />
            <div className="brand-text">
              <span className="brand-title">PRIME TALENT</span>
              <span className="brand-subtitle">SOLUTIONS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: mobileMenuOpen ? 'flex' : undefined, ...(mobileMenuOpen ? {
            flexDirection: 'column',
            position: 'absolute',
            top: '70px',
            left: '20px',
            right: '20px',
            background: 'rgba(10, 15, 28, 0.95)',
            padding: '20px',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 1000
          } : {}) }}>
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
              About
            </NavLink>
            <NavLink to="/specialisations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
              Specialisations
            </NavLink>
            <NavLink to="/salary-calculator" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
              Salary Index
            </NavLink>
            <NavLink to="/careers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
              Careers
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
              Contact
            </NavLink>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            <Link to="/#contact" className="btn-header-cta" onClick={closeMobileMenu}>
              <span>Book Call ↗</span>
            </Link>

            <button 
              className="mobile-toggle" 
              id="mobileToggle" 
              aria-label="Toggle navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
