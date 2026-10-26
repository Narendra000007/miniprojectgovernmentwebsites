import React from 'react';
import OpportunityCard from '../components/OpportunityCard';

export default function MatchingPage({
  matches,
  bookmarks,
  onToggleBookmark,
  onViewDetails,
  onViewMatch,
  onNavigate,
}) {
  const isBookmarked = (id) => (bookmarks || []).some((b) => b.opportunity.id === id);

  const eligibleList = (matches || []).filter((m) => m.matchScore >= 65);
  const partialList = (matches || []).filter((m) => m.matchScore < 65);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
              Rule-Based Eligibility Evaluation
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Opportunities evaluated by the backend engine comparing your stored qualification, stream, GPA, and age.
            </p>
          </div>
          <button className="btn btn-secondary" onClick={() => onNavigate('profile')}>
            ✏️ Edit Profile Parameters
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span style={{ fontSize: '1.2rem' }}>🌟</span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#047857' }}>
            High Compatibility Matches (&ge; 65%) &bull; {eligibleList.length} Found
          </h3>
        </div>

        <div className="opportunities-grid">
          {eligibleList.map((m) => (
            <OpportunityCard
              key={m.opportunity.id}
              opportunity={m.opportunity}
              isBookmarked={isBookmarked(m.opportunity.id)}
              onToggleBookmark={onToggleBookmark}
              onViewDetails={onViewDetails}
              matchData={m}
              onViewMatch={onViewMatch}
            />
          ))}
        </div>
      </div>

      {partialList.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '1.2rem' }}>🔍</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#b45309' }}>
              Partial or Specific Criteria Matches (&lt; 65%) &bull; {partialList.length} Found
            </h3>
          </div>

          <div className="opportunities-grid">
            {partialList.map((m) => (
              <OpportunityCard
                key={m.opportunity.id}
                opportunity={m.opportunity}
                isBookmarked={isBookmarked(m.opportunity.id)}
                onToggleBookmark={onToggleBookmark}
                onViewDetails={onViewDetails}
                matchData={m}
                onViewMatch={onViewMatch}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
