import React from 'react';
import FilterBar from '../components/FilterBar';
import OpportunityCard from '../components/OpportunityCard';

export default function OpportunitiesPage({
  opportunities,
  filters,
  onFilterChange,
  onClearFilters,
  matches,
  bookmarks,
  onToggleBookmark,
  onViewDetails,
  onViewMatch,
}) {
  const isBookmarked = (id) => (bookmarks || []).some((b) => b.opportunity.id === id);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Explore Government Opportunities
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Centralized directory covering public recruitment, scholarships, research fellowships, internships, and entrance examinations.
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        onClearFilters={onClearFilters}
        totalResults={opportunities.length}
      />

      {opportunities.length > 0 ? (
        <div className="opportunities-grid">
          {opportunities.map((opp) => (
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
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
            No opportunities match your filter criteria
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px' }}>
            Try broadening your search keywords or clearing the category and qualification filters.
          </p>
          <button className="btn btn-primary" onClick={onClearFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
