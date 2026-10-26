import React, { useState } from 'react';

export default function TrackingPage({
  trackingList,
  onUpdateTracking,
  onViewDetails,
  onNavigate,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const columns = [
    { id: 'INTERESTED', title: '💡 Interested', class: 'col-interested', desc: 'Identified opportunities of interest' },
    { id: 'PLANNING_TO_APPLY', title: '📋 Planning to Apply', class: 'col-planning', desc: 'Preparing documents & eligibility proofs' },
    { id: 'APPLIED', title: '✅ Applied', class: 'col-applied', desc: 'Application submitted on official portal' },
    { id: 'NOT_APPLYING', title: '🚫 Not Applying', class: 'col-not-applying', desc: 'Decided not to proceed' },
  ];

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditNotes(item.notes || '');
    setEditStatus(item.status);
  };

  const handleSaveEdit = async (item) => {
    await onUpdateTracking({
      userId: 1,
      opportunityId: item.opportunity.id,
      status: editStatus,
      notes: editNotes,
    });
    setEditingId(null);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Application Tracking Board
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Manage your progress across application lifecycles from initial interest to final submission.
        </p>
      </div>

      <div className="tracking-board">
        {columns.map((col) => {
          const items = (trackingList || []).filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="tracking-column">
              <div className={`tracking-col-header ${col.class}`}>
                <div>
                  <div className="tracking-col-title">{col.title}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>{col.desc}</div>
                </div>
                <span className="tracking-col-count">{items.length}</span>
              </div>

              <div>
                {items.length > 0 ? (
                  items.map((item) => {
                    const isEditing = editingId === item.id;
                    return (
                      <div key={item.id} className="tracking-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <span
                            className={`badge-category badge-${item.opportunity.category.toLowerCase()}`}
                            style={{ fontSize: '0.68rem', padding: '2px 6px' }}
                          >
                            {item.opportunity.category}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            📅 {item.opportunity.applicationDeadline}
                          </span>
                        </div>

                        <h4
                          style={{
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            marginBottom: '4px',
                            cursor: 'pointer',
                          }}
                          onClick={() => onViewDetails(item.opportunity)}
                          title="Click to view complete details"
                        >
                          {item.opportunity.title}
                        </h4>

                        <div style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 600, marginBottom: '8px' }}>
                          {item.opportunity.organization}
                        </div>

                        {item.appliedDate && (
                          <div style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 600, marginBottom: '8px' }}>
                            Applied Date: {item.appliedDate}
                          </div>
                        )}

                        {isEditing ? (
                          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                            <div style={{ marginBottom: '8px' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>Change Status</label>
                              <select
                                className="form-input"
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                                style={{ width: '100%', padding: '6px', fontSize: '0.82rem' }}
                              >
                                <option value="INTERESTED">Interested</option>
                                <option value="PLANNING_TO_APPLY">Planning to Apply</option>
                                <option value="APPLIED">Applied</option>
                                <option value="NOT_APPLYING">Not Applying</option>
                              </select>
                            </div>

                            <div style={{ marginBottom: '8px' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>Notes</label>
                              <textarea
                                className="form-input"
                                rows="2"
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                style={{ width: '100%', fontSize: '0.8rem', padding: '6px' }}
                                placeholder="Registration number, exam venue..."
                              />
                            </div>

                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              <button
                                className="btn btn-secondary"
                                onClick={() => setEditingId(null)}
                                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                              >
                                Cancel
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleSaveEdit(item)}
                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {item.notes && (
                              <div
                                style={{
                                  background: '#f8fafc',
                                  padding: '6px 8px',
                                  borderRadius: '4px',
                                  fontSize: '0.78rem',
                                  color: '#334155',
                                  fontStyle: 'italic',
                                  marginBottom: '10px',
                                  border: '1px solid #e2e8f0',
                                }}
                              >
                                "{item.notes}"
                              </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                              <button
                                onClick={() => handleStartEdit(item)}
                                style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}
                              >
                                ✏️ Update Status
                              </button>

                              <button
                                className="btn btn-primary"
                                style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                                onClick={() => onViewDetails(item.opportunity)}
                              >
                                Details
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      border: '1px dashed #cbd5e1',
                      borderRadius: '6px',
                      padding: '24px 12px',
                      textAlign: 'center',
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                    }}
                  >
                    No items in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
