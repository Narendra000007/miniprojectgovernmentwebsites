import React from 'react';

export default function OpportunityCard({
  opportunity,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
  matchData,
  onViewMatch,
}) {
  const {
    id,
    title,
    category,
    organization,
    description,
    requiredQualification,
    allowedDisciplines,
    location,
    applicationDeadline,
    status,
    isSampleData,
  } = opportunity;

  // Format Category
  const categoryClass = `badge-category badge-${category.toLowerCase()}`;
  const categoryLabels = {
    RECRUITMENT: '👔 Recruitment',
    SCHOLARSHIP: '🎓 Scholarship',
    FELLOWSHIP: '🔬 Fellowship',
    INTERNSHIP: '🏛️ Internship',
    COMPETITIVE_EXAM: '📝 Examination',
  };

  // Format Status
  let statusClass = 'badge-status badge-status-active';
  let statusText = '🟢 Open';
  if (status === 'CLOSING_SOON') {
    statusClass = 'badge-status badge-status-closing';
    statusText = '⏳ Closing Soon';
  } else if (status === 'CLOSED') {
    statusClass = 'badge-status badge-status-closed';
    statusText = '⚪ Closed';
  }

  // Days left calculation
  const deadlineDate = new Date(applicationDeadline);
  const now = new Date();
  const diffTime = deadlineDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let deadlineLabel = `${applicationDeadline} (${diffDays > 0 ? diffDays + 'd left' : 'Expired'})`;

  return (
    <div className="opp-card">
      <div className="opp-card-top">
        <span className={categoryClass}>
          {categoryLabels[category] || category}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className={statusClass}>{statusText}</span>
          {isSampleData && (
            <span
              style={{
                fontSize: '0.65rem',
                padding: '2px 6px',
                background: '#f1f5f9',
                color: '#64748b',
                borderRadius: '4px',
                fontWeight: 600,
              }}
              title="Demonstration record with verified portal URLs"
            >
              Demo Data
            </span>
          )}
        </div>
      </div>

      <h3 className="opp-card-title" title={title}>
        {title}
      </h3>

      <div className="opp-org-name">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 7v14M21 7v14M6 11h2M6 15h2M10 11h2M10 15h2M14 11h2M14 15h2M18 11h2M18 15h2M3 7l9-4 9 4" />
        </svg>
        <span>{organization}</span>
      </div>

      <p className="opp-desc-snippet">{description}</p>

      <div className="opp-meta-list">
        <div className="opp-meta-item">
          <span className="opp-meta-label">Qualification:</span>
          <strong>{requiredQualification}</strong>
        </div>
        <div className="opp-meta-item">
          <span className="opp-meta-label">Disciplines:</span>
          <span>{allowedDisciplines || 'Any Discipline'}</span>
        </div>
        <div className="opp-meta-item">
          <span className="opp-meta-label">Location:</span>
          <span>📍 {location}</span>
        </div>
      </div>

      {matchData && (
        <div
          style={{
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f8fafc',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Profile Fit:</span>
            <span
              className={`match-score-pill ${
                matchData.matchScore >= 75
                  ? 'match-high'
                  : matchData.matchScore >= 50
                  ? 'match-mid'
                  : 'match-low'
              }`}
            >
              {matchData.matchScore}% Match
            </span>
          </div>
          <button
            onClick={() => onViewMatch(matchData)}
            style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}
          >
            Why this score?
          </button>
        </div>
      )}

      <div className="opp-card-footer">
        <div className={`deadline-pill ${diffDays <= 7 && diffDays >= 0 ? 'urgent' : ''}`}>
          <span>📅</span>
          <span>{deadlineLabel}</span>
        </div>

        <div className="card-actions-row">
          <button
            className={`btn-icon ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={() => onToggleBookmark(id)}
            title={isBookmarked ? 'Remove from Saved Bookmarks' : 'Bookmark this Opportunity'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.82rem' }} onClick={() => onViewDetails(opportunity)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
