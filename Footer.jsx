import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div className="brand-icon-wrap" style={{ width: '32px', height: '32px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              GovOpportunity Hub
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '480px' }}>
            A centralized platform designed to help students and job seekers discover government recruitments, scholarships,
            fellowships, internships, and competitive examinations from one trustworthy portal.
          </p>
          <div style={{ marginTop: '14px', fontSize: '0.78rem', color: '#cbd5e1' }}>
            <strong>Guidance:</strong> Dr. Anupama T A, Assistant Professor
          </div>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '14px', fontWeight: 700 }}>5 Opportunity Categories</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#94a3b8' }}>
            <li>&bull; Government Recruitment (UPSC, SSC, ISRO)</li>
            <li>&bull; Merit & Post-Matric Scholarships (NSP, AICTE)</li>
            <li>&bull; Research Fellowships (PMRF, CSIR-NET)</li>
            <li>&bull; Policy & Technical Internships (NITI, NIC)</li>
            <li>&bull; Competitive Examinations (GATE, CAT, CDS)</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '14px', fontWeight: 700 }}>Project Team (SIT CSE)</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#94a3b8' }}>
            <li>&bull; Narendra Kumar Yadav (1SI24CS114)</li>
            <li>&bull; Nongthombam Sanathoi Singh (1SI24CS120)</li>
            <li>&bull; Rahul Dadimana Kshetri (1SI24CS136)</li>
            <li>&bull; Tomthilnganba Soraisham (1SI24CS194)</li>
          </ul>
          <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#64748b' }}>
            Siddaganga Institute of Technology, Tumakuru-3
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          &copy; 2026-27 SIT Tumakuru CSE Department &bull; Phase 2 Mini Project Submission.
        </div>
        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
          Disclaimer: Demonstration portal. Users must verify all requirements with official government gazette publications.
        </div>
      </div>
    </footer>
  );
}
