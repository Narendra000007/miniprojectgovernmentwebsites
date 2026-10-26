import React, { useState, useEffect } from 'react';
import OpportunityCard from '../components/OpportunityCard';

export default function ProfilePage({
  profile,
  onSaveProfile,
  matches,
  bookmarks,
  onToggleBookmark,
  onViewDetails,
  onViewMatch,
}) {
  const [formData, setFormData] = useState({
    highestQualification: 'B.E./B.Tech',
    discipline: 'Computer Science and Engineering',
    graduationYear: 2027,
    percentageOrCgpa: 8.45,
    age: 21,
    category: 'General',
    stateOfResidence: 'Karnataka',
    preferredLocation: 'All India',
    preferredCategories: 'RECRUITMENT,INTERNSHIP,FELLOWSHIP,COMPETITIVE_EXAM',
    skillsAndInterests: 'Java, Full Stack Web Development, Cloud Computing, Algorithms, Public Policy',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        highestQualification: profile.highestQualification || 'B.E./B.Tech',
        discipline: profile.discipline || 'Computer Science and Engineering',
        graduationYear: profile.graduationYear || 2027,
        percentageOrCgpa: profile.percentageOrCgpa || 8.45,
        age: profile.age || 21,
        category: profile.category || 'General',
        stateOfResidence: profile.stateOfResidence || 'Karnataka',
        preferredLocation: profile.preferredLocation || 'All India',
        preferredCategories: profile.preferredCategories || '',
        skillsAndInterests: profile.skillsAndInterests || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'graduationYear' || name === 'age' ? parseInt(value) || '' : name === 'percentageOrCgpa' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const isBookmarked = (id) => (bookmarks || []).some((b) => b.opportunity.id === id);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Candidate Profile & Eligibility Matcher
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Maintain your academic qualifications, location preferences, and background to drive the rule-based recommendation engine.
        </p>
      </div>

      <div className="form-card" style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
              Academic & Demographic Information
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Used by the backend Eligibility Matching Engine to calculate percentage fit and eligibility criteria.
            </span>
          </div>
          {saveSuccess && (
            <div style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700 }}>
              ✓ Profile saved & matching re-evaluated!
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Highest Qualification</label>
              <select
                className="form-input"
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
                required
              >
                <option value="B.E./B.Tech">B.E. / B.Tech (Engineering)</option>
                <option value="Any Graduate">Any Graduate (B.A. / B.Sc. / B.Com / BCA)</option>
                <option value="Post Graduate">Post Graduate (M.Tech / M.Sc / MCA / MBA)</option>
                <option value="12th Pass">12th Pass / Higher Secondary</option>
                <option value="Diploma">Diploma (Polytechnic)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Discipline / Branch of Study</label>
              <input
                type="text"
                className="form-input"
                name="discipline"
                value={formData.discipline}
                onChange={handleChange}
                placeholder="e.g. Computer Science and Engineering"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Academic Score (CGPA or Percentage %)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                name="percentageOrCgpa"
                value={formData.percentageOrCgpa}
                onChange={handleChange}
                placeholder="e.g. 8.45 (out of 10) or 82.5 (%)"
                required
              />
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>If &le; 10, engine calculates percentage as CGPA &times; 9.5</span>
            </div>

            <div className="form-group">
              <label className="form-label">Graduation Year</label>
              <input
                type="number"
                className="form-input"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="e.g. 2027"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Age (Years)</label>
              <input
                type="number"
                className="form-input"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 21"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Social Reservation Category</label>
              <select
                className="form-input"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="General">General / Unreserved (UR)</option>
                <option value="OBC">Other Backward Class (OBC)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">State of Domicile / Residence</label>
              <input
                type="text"
                className="form-input"
                name="stateOfResidence"
                value={formData.stateOfResidence}
                onChange={handleChange}
                placeholder="e.g. Karnataka"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Posting Location</label>
              <select
                className="form-input"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
              >
                <option value="All India">All India</option>
                <option value="Karnataka">Karnataka State Only</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="New Delhi">New Delhi / NCR</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Technical Skills & Career Interests</label>
              <textarea
                className="form-input"
                rows="3"
                name="skillsAndInterests"
                value={formData.skillsAndInterests}
                onChange={handleChange}
                placeholder="e.g. Java, Python, Web Development, Cloud Computing, Civil Services Preparation, Space Science"
              />
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
              style={{ padding: '10px 24px' }}
            >
              {isSaving ? 'Saving & Re-Evaluating...' : '💾 Save Profile & Re-Evaluate Matches'}
            </button>
          </div>
        </form>
      </div>

      <div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
          Live Match Results for Updated Profile
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
          Sorted in descending order of rule-based eligibility compatibility score.
        </p>

        <div className="opportunities-grid">
          {(matches || []).slice(0, 6).map((m) => (
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
    </div>
  );
}
