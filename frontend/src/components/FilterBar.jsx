import React from 'react';

export default function FilterBar({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults,
}) {
  const categories = [
    { id: 'ALL', label: 'All Opportunities' },
    { id: 'RECRUITMENT', label: '👔 Recruitments' },
    { id: 'SCHOLARSHIP', label: '🎓 Scholarships' },
    { id: 'FELLOWSHIP', label: '🔬 Fellowships' },
    { id: 'INTERNSHIP', label: '🏛️ Internships' },
    { id: 'COMPETITIVE_EXAM', label: '📝 Exams' },
  ];

  const qualifications = [
    { value: 'ALL', label: 'All Qualifications' },
    { value: 'B.E./B.Tech', label: 'B.E. / B.Tech' },
    { value: 'Any Graduate', label: 'Any Graduate' },
    { value: 'Post Graduate', label: 'Post Graduate (M.Tech/M.Sc)' },
    { value: '12th Pass', label: '12th Pass / Intermediate' },
  ];

  const locations = [
    { value: 'ALL', label: 'All Locations' },
    { value: 'All India', label: 'All India' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Bengaluru', label: 'Bengaluru' },
    { value: 'New Delhi', label: 'New Delhi' },
  ];

  const statuses = [
    { value: 'ALL', label: 'All Statuses' },
    { value: 'ACTIVE', label: '🟢 Active & Open' },
    { value: 'CLOSING_SOON', label: '⏳ Closing Soon' },
    { value: 'CLOSED', label: '⚪ Closed' },
  ];

  const isFiltered =
    filters.keyword ||
    (filters.category && filters.category !== 'ALL') ||
    (filters.qualification && filters.qualification !== 'ALL') ||
    (filters.location && filters.location !== 'ALL') ||
    (filters.status && filters.status !== 'ALL');

  return (
    <div className="filter-container">
      {/* Search Input Row */}
      <div className="search-box-row">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search government opportunities by title, organization, discipline, or keyword..."
            value={filters.keyword || ''}
            onChange={(e) => onFilterChange('keyword', e.target.value)}
          />
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-tab-btn ${filters.category === cat.id ? 'active' : ''}`}
            onClick={() => onFilterChange('category', cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Dropdown Filters Row */}
      <div className="filter-dropdowns-row">
        <div>
          <select
            className="filter-select"
            value={filters.qualification || 'ALL'}
            onChange={(e) => onFilterChange('qualification', e.target.value)}
          >
            {qualifications.map((q) => (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            className="filter-select"
            value={filters.location || 'ALL'}
            onChange={(e) => onFilterChange('location', e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            className="filter-select"
            value={filters.status || 'ALL'}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {isFiltered && (
          <button className="clear-filters-btn" onClick={onClearFilters}>
            &times; Reset All Filters
          </button>
        )}

        <div style={{ marginLeft: 'auto', fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>
          Showing <strong>{totalResults}</strong> opportunities
        </div>
      </div>
    </div>
  );
}
