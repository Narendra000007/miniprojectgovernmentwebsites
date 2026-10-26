import React from 'react';

export default function Navbar({ activeTab, setActiveTab, bookmarkCount, trackingCount }) {
  return (
    <header>

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
            <div className="brand-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="brand-title">GovOpportunity Hub</div>
              <div className="brand-subtitle">Centralized Recruitment, Scholarship & Exam Monitoring</div>
            </div>
          </div>

          <ul className="nav-links">
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'opportunities' ? 'active' : ''}`}
                onClick={() => setActiveTab('opportunities')}
              >
                Explore Opportunities
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'matching' ? 'active' : ''}`}
                onClick={() => setActiveTab('matching')}
              >
                Eligibility Matches
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'bookmarks' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookmarks')}
              >
                Saved Bookmarks
                {bookmarkCount > 0 && <span className="nav-pill-badge">{bookmarkCount}</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'tracking' ? 'active' : ''}`}
                onClick={() => setActiveTab('tracking')}
              >
                Application Tracker
                {trackingCount > 0 && <span className="nav-pill-badge" style={{ background: '#2563eb' }}>{trackingCount}</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                My Profile
              </button>
            </li>
          </ul>

          <div className="nav-user-chip" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }} title="View / Edit Profile">
            <div className="user-avatar">NY</div>
            <div>
              <div style={{ fontWeight: 700, lineHeight: 1.1 }}>Narendra Yadav</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>B.E. CSE &bull; 1SI24CS114</div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
