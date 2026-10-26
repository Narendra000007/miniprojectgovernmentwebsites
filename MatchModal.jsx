import React from 'react';

export default function MatchModal({ matchData, onClose }) {
  if (!matchData) return null;

  const { opportunity, matchScore, eligible, matchReasons, unmetCriteria, disclaimer } = matchData;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase' }}>
              Rule-Based Eligibility Evaluation
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#0f172a', marginTop: '2px' }}>
              {opportunity?.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Match Score Display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: matchScore >= 75 ? '#ecfdf5' : matchScore >= 50 ? '#fffbeb' : '#fef2f2',
              border: `1px solid ${matchScore >= 75 ? '#a7f3d0' : matchScore >= 50 ? '#fde68a' : '#fecaca'}`,
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: matchScore >= 75 ? '#059669' : matchScore >= 50 ? '#d97706' : '#dc2626',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {matchScore}%
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                {eligible ? 'Strong Eligibility Match' : matchScore >= 50 ? 'Moderate Alignment' : 'Low Profile Alignment'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>
                Evaluated against candidate qualifications, stream, graduation score, age, and location.
              </div>
            </div>
          </div>

          {/* Positive Match Reasons */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#065f46', textTransform: 'uppercase', marginBottom: '8px' }}>
              ✓ Matching Criteria
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {matchReasons && matchReasons.length > 0 ? (
                matchReasons.map((reason, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'flex-start',
                      fontSize: '0.86rem',
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                      color: '#1e293b',
                    }}
                  >
                    <span style={{ color: '#059669', fontWeight: 700 }}>✓</span>
                    <span>{reason}</span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>No direct criteria matches found.</div>
              )}
            </div>
          </div>

          {/* Unmet Criteria */}
          {unmetCriteria && unmetCriteria.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', marginBottom: '8px' }}>
                ⚠️ Missing or Unmet Requirements
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {unmetCriteria.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'flex-start',
                      fontSize: '0.86rem',
                      background: '#fff1f2',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #fecdd3',
                      color: '#9f1239',
                    }}
                  >
                    <span style={{ color: '#e11d48', fontWeight: 700 }}>&bull;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="official-disclaimer-box" style={{ marginTop: '12px' }}>
            <strong>Note:</strong> {disclaimer}
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Close Evaluation
          </button>
        </div>
      </div>
    </div>
  );
}
