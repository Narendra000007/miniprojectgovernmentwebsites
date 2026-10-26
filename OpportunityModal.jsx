import React, { useState } from 'react';

export default function OpportunityModal({
  opportunity,
  onClose,
  isBookmarked,
  onToggleBookmark,
  trackingState,
  onUpdateTracking,
}) {
  if (!opportunity) return null;

  const [currentStatus, setCurrentStatus] = useState(
    trackingState ? trackingState.status : 'INTERESTED'
  );
  const [notes, setNotes] = useState(trackingState ? trackingState.notes || '' : '');
  const [isUpdatingTracking, setIsUpdatingTracking] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveTracking = async () => {
    setIsUpdatingTracking(true);
    try {
      await onUpdateTracking({
        userId: 1,
        opportunityId: opportunity.id,
        status: currentStatus,
        notes: notes,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingTracking(false);
    }
  };

  const categoryLabels = {
    RECRUITMENT: '👔 Government Recruitment',
    SCHOLARSHIP: '🎓 Scholarship Program',
    FELLOWSHIP: '🔬 Doctoral / Research Fellowship',
    INTERNSHIP: '🏛️ Government Internship',
    COMPETITIVE_EXAM: '📝 Competitive Examination',
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className={`badge-category badge-${opportunity.category.toLowerCase()}`} style={{ marginBottom: '6px' }}>
              {categoryLabels[opportunity.category] || opportunity.category}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: '#0f172a', lineHeight: 1.3 }}>
              {opportunity.title}
            </h2>
            <div style={{ fontSize: '0.88rem', color: '#2563eb', fontWeight: 600, marginTop: '4px' }}>
              {opportunity.organization}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f1f5f9', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Key Opportunity Parameters */}
          <div className="detail-meta-box">
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Required Qualification</span>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{opportunity.requiredQualification}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Eligible Disciplines</span>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{opportunity.allowedDisciplines || 'Any Discipline'}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Min Percentage / Cutoff</span>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>
                {opportunity.minPercentage && opportunity.minPercentage > 0 ? `${opportunity.minPercentage}%` : 'No minimum threshold'}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Maximum Age Limit</span>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>
                {opportunity.maxAge ? `${opportunity.maxAge} Years (General)` : 'No upper age limit'}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Location / Cadre</span>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>📍 {opportunity.location}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Application Deadline</span>
              <div style={{ fontWeight: 700, color: '#b91c1c' }}>📅 {opportunity.applicationDeadline}</div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>Opportunity Overview</h4>
            <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>{opportunity.description}</p>
          </div>

          {/* Detailed Eligibility Conditions */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>Official Eligibility Criteria</h4>
            <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.6 }}>
              {opportunity.eligibilityCriteria}
            </div>
          </div>

          {/* Application Tracking Manager (Integrated inline) */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '0.9rem' }}>🎯 My Application Tracking Status</span>
              {saveSuccess && <span style={{ color: '#059669', fontSize: '0.78rem', fontWeight: 700 }}>✓ Status Updated!</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '10px', alignItems: 'center' }}>
              <select
                className="form-input"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                style={{ background: '#ffffff', fontWeight: 600 }}
              >
                <option value="INTERESTED">Interested</option>
                <option value="PLANNING_TO_APPLY">Planning to Apply</option>
                <option value="APPLIED">Applied</option>
                <option value="NOT_APPLYING">Not Applying</option>
              </select>

              <input
                type="text"
                className="form-input"
                placeholder="Optional notes (e.g. registration ID, document checklist...)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ background: '#ffffff' }}
              />

              <button
                className="btn btn-primary"
                onClick={handleSaveTracking}
                disabled={isUpdatingTracking}
                style={{ padding: '9px 16px', whiteSpace: 'nowrap' }}
              >
                {isUpdatingTracking ? 'Saving...' : 'Save Status'}
              </button>
            </div>
          </div>

          {/* Official Verification Disclaimer */}
          <div className="official-disclaimer-box">
            <strong>⚠️ Official Notice Verification Required:</strong> While this platform aggregates opportunity details to assist students,
            official eligibility criteria, reservation relaxations, fee exemptions, and exact deadlines must always be verified directly
            from the official gazette announcement before submission.
          </div>
        </div>

        <div className="modal-footer">
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className={`btn ${isBookmarked ? 'btn-icon bookmarked' : 'btn-secondary'}`}
              onClick={() => onToggleBookmark(opportunity.id)}
            >
              <span>{isBookmarked ? '★ Saved to Bookmarks' : '☆ Save to Bookmarks'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={opportunity.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              📄 Notification PDF
            </a>

            <a
              href={opportunity.officialApplicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Apply on Official Portal &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
