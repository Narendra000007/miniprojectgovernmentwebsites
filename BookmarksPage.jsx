import React from 'react';
import OpportunityCard from '../components/OpportunityCard';

export default function BookmarksPage({
  bookmarks,
  onToggleBookmark,
  onViewDetails,
  matches,
  onViewMatch,
  onNavigate,
}) {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Saved Government Opportunities ({bookmarks.length})
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Quick access to bookmarked recruitments, scholarships, and fellowships saved to your account.
        </p>
      </div>

      {bookmarks.length > 0 ? (
        <div className="opportunities-grid">
          {bookmarks.map((b) => (
            <OpportunityCard
              key={b.opportunity.id}
              opportunity={b.opportunity}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              onViewDetails={onViewDetails}
              matchData={(matches || []).find((m) => m.opportunity.id === b.opportunity.id)}
              onViewMatch={onViewMatch}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '48px 20px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⭐</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
            No Saved Opportunities Yet
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px' }}>
            Click the bookmark icon on any opportunity card while browsing to save it here for quick reference.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate('opportunities')}>
            Explore Opportunities Catalog
          </button>
        </div>
      )}
    </div>
  );
}
