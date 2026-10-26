import React from 'react';
import HeroStats from '../components/HeroStats';
import OpportunityCard from '../components/OpportunityCard';

export default function DashboardPage({
  stats,
  opportunities,
  matches,
  bookmarks,
  onToggleBookmark,
  onViewDetails,
  onViewMatch,
  onNavigate,
  onSelectCategory,
  onSelectStatus,
}) {
  const topMatches = (matches || [])
    .filter((m) => m.matchScore >= 70)
    .slice(0, 3);

  const closingSoon = (opportunities || [])
    .filter((o) => o.status === 'CLOSING_SOON')
    .slice(0, 3);

  const isBookmarked = (id) => (bookmarks || []).some((b) => b.opportunity.id === id);

  return (
    <div>
      <HeroStats
        stats={stats}
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          onNavigate('opportunities');
        }}
        onSelectStatus={(status) => {
          onSelectStatus(status);
          onNavigate('opportunities');
        }}
      />

      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              🎯 Recommended for Your Profile
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
              Opportunities evaluated by the rule-based engine against your B.E. Computer Science profile (8.45 CGPA, Karnataka).
            </p>
          </div>
          <button
            className="btn btn-outline-primary"
            onClick={() => onNavigate('matching')}
            style={{ fontSize: '0.82rem' }}
          >
            View All Evaluated Matches &rarr;
          </button>
        </div>

        {topMatches.length > 0 ? (
          <div className="opportunities-grid">
            {topMatches.map((m) => (
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
        ) : (
          <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
            No recommended matches computed yet. Ensure your profile is updated!
          </div>
        )}
      </div>

      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              ⏳ Approaching Deadlines
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
              Time-sensitive opportunities closing within the next few days. Review and apply promptly.
            </p>
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              onSelectStatus('CLOSING_SOON');
              onNavigate('opportunities');
            }}
            style={{ fontSize: '0.82rem' }}
          >
            View All Closing Soon &rarr;
          </button>
        </div>

        <div className="opportunities-grid">
          {closingSoon.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              isBookmarked={isBookmarked(opp.id)}
              onToggleBookmark={onToggleBookmark}
              onViewDetails={onViewDetails}
              matchData={(matches || []).find((m) => m.opportunity.id === opp.id)}
              onViewMatch={onViewMatch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
