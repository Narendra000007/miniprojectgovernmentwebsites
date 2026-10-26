import React from 'react';

export default function HeroStats({ stats, onSelectCategory, onSelectStatus }) {
  const s = stats || {
    totalOpportunities: 16,
    recruitmentCount: 5,
    scholarshipCount: 3,
    fellowshipCount: 2,
    internshipCount: 3,
    examCount: 3,
    closingSoonCount: 3,
    activeCount: 12,
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-tag">
          <span>🇮🇳</span>
          <span>National Opportunity Monitoring Platform &bull; Phase 2</span>
        </div>
        <h1 className="hero-title">
          Discover, Match & Track Government Opportunities
        </h1>
        <p className="hero-description">
          A centralized, normalized repository bringing together central & state recruitments, fellowships, scholarships,
          internships, and competitive examinations with rule-based eligibility evaluation and deadline tracking.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onSelectCategory('ALL')}>
            Browse All Opportunities ({s.totalOpportunities})
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onSelectStatus('CLOSING_SOON')}
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            ⏰ Closing Soon ({s.closingSoonCount})
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => onSelectCategory('RECRUITMENT')} style={{ cursor: 'pointer' }}>
          <div className="stat-header">
            <span className="stat-label">Recruitments</span>
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#3730a3' }}>👔</div>
          </div>
          <div className="stat-value">{s.recruitmentCount}</div>
          <div className="stat-subtext">UPSC, ISRO, DRDO, State PSCs</div>
        </div>

        <div className="stat-card" onClick={() => onSelectCategory('SCHOLARSHIP')} style={{ cursor: 'pointer' }}>
          <div className="stat-header">
            <span className="stat-label">Scholarships</span>
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#92400e' }}>🎓</div>
          </div>
          <div className="stat-value">{s.scholarshipCount}</div>
          <div className="stat-subtext">NSP, AICTE Pragati, Post-Matric</div>
        </div>

        <div className="stat-card" onClick={() => onSelectCategory('FELLOWSHIP')} style={{ cursor: 'pointer' }}>
          <div className="stat-header">
            <span className="stat-label">Fellowships</span>
            <div className="stat-icon" style={{ background: '#ede9fe', color: '#5b21b6' }}>🔬</div>
          </div>
          <div className="stat-value">{s.fellowshipCount}</div>
          <div className="stat-subtext">PMRF, CSIR-JRF, SERB</div>
        </div>

        <div className="stat-card" onClick={() => onSelectCategory('INTERNSHIP')} style={{ cursor: 'pointer' }}>
          <div className="stat-header">
            <span className="stat-label">Internships</span>
            <div className="stat-icon" style={{ background: '#d1fae5', color: '#065f46' }}>🏛️</div>
          </div>
          <div className="stat-value">{s.internshipCount}</div>
          <div className="stat-subtext">NITI Aayog, NIC, MEA</div>
        </div>

        <div className="stat-card" onClick={() => onSelectCategory('COMPETITIVE_EXAM')} style={{ cursor: 'pointer' }}>
          <div className="stat-header">
            <span className="stat-label">Competitive Exams</span>
            <div className="stat-icon" style={{ background: '#ffe4e6', color: '#9f1239' }}>📝</div>
          </div>
          <div className="stat-value">{s.examCount}</div>
          <div className="stat-subtext">GATE 2027, CDS, UGC NET</div>
        </div>

        <div className="stat-card" onClick={() => onSelectStatus('CLOSING_SOON')} style={{ cursor: 'pointer', borderLeft: '4px solid #f59e0b' }}>
          <div className="stat-header">
            <span className="stat-label" style={{ color: '#b45309' }}>Deadline Alert</span>
            <div className="stat-icon" style={{ background: '#fffbeb', color: '#b45309' }}>⏳</div>
          </div>
          <div className="stat-value" style={{ color: '#b45309' }}>{s.closingSoonCount}</div>
          <div className="stat-subtext">Expiring within 7 days</div>
        </div>
      </div>
    </div>
  );
}
