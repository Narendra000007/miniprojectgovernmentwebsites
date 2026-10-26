import React, { useState, useEffect, useCallback } from 'react';
import { api } from './api/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OpportunityModal from './components/OpportunityModal';
import MatchModal from './components/MatchModal';
import NotificationToast from './components/NotificationToast';

import DashboardPage from './pages/DashboardPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import MatchingPage from './pages/MatchingPage';
import BookmarksPage from './pages/BookmarksPage';
import TrackingPage from './pages/TrackingPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Core Data
  const [stats, setStats] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [matches, setMatches] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [trackingList, setTrackingList] = useState([]);
  const [profile, setProfile] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    keyword: '',
    category: 'ALL',
    qualification: 'ALL',
    location: 'ALL',
    status: 'ALL',
  });

  // Modals
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsData, oppsData, matchData, bmData, trkData, profData] = await Promise.all([
        api.getDashboardStats(),
        api.getOpportunities(filters),
        api.getMatches(1),
        api.getBookmarks(1),
        api.getTracking(1),
        api.getUserProfile(1),
      ]);

      setStats(statsData);
      setOpportunities(oppsData);
      setMatches(matchData);
      setBookmarks(bmData);
      setTrackingList(trkData);
      setProfile(profData);
    } catch (err) {
      console.error('Failed to load portal data:', err);
      showToast('Could not reach backend API. Ensure Spring Boot is running on port 8080.', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleFilterChange = async (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    try {
      const opps = await api.getOpportunities(updated);
      setOpportunities(opps);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearFilters = async () => {
    const reset = {
      keyword: '',
      category: 'ALL',
      qualification: 'ALL',
      location: 'ALL',
      status: 'ALL',
    };
    setFilters(reset);
    try {
      const opps = await api.getOpportunities(reset);
      setOpportunities(opps);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleBookmark = async (opportunityId) => {
    const exists = bookmarks.some((b) => b.opportunity.id === opportunityId);
    try {
      if (exists) {
        await api.removeBookmark(1, opportunityId);
        setBookmarks((prev) => prev.filter((b) => b.opportunity.id !== opportunityId));
        showToast('Opportunity removed from saved bookmarks');
      } else {
        const newBm = await api.addBookmark(1, opportunityId);
        setBookmarks((prev) => [newBm, ...prev]);
        showToast('Opportunity saved to bookmarks!');
      }
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Bookmark action failed', 'error');
    }
  };

  const handleUpdateTracking = async (payload) => {
    try {
      const updated = await api.updateTracking(payload);
      setTrackingList((prev) => {
        const filtered = prev.filter((t) => t.opportunity.id !== payload.opportunityId);
        return [updated, ...filtered];
      });
      showToast(`Application status set to: ${payload.status}`);
      return updated;
    } catch (err) {
      console.error(err);
      showToast('Failed to update application status', 'error');
      throw err;
    }
  };

  const handleSaveProfile = async (profileData) => {
    try {
      const updated = await api.updateUserProfile(1, profileData);
      setProfile(updated);
      const recomputedMatches = await api.getMatches(1);
      setMatches(recomputedMatches);
      showToast('Profile saved! Eligibility matches updated.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to save profile', 'error');
    }
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarks.length}
        trackingCount={trackingList.length}
      />

      <main className="main-content">
        {loading && !stats ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔄</div>
            <div style={{ fontWeight: 600 }}>Connecting to Spring Boot Backend on http://localhost:8080...</div>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardPage
                stats={stats}
                opportunities={opportunities}
                matches={matches}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onViewDetails={setSelectedOpportunity}
                onViewMatch={setSelectedMatch}
                onNavigate={setActiveTab}
                onSelectCategory={(cat) => handleFilterChange('category', cat)}
                onSelectStatus={(st) => handleFilterChange('status', st)}
              />
            )}

            {activeTab === 'opportunities' && (
              <OpportunitiesPage
                opportunities={opportunities}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                matches={matches}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onViewDetails={setSelectedOpportunity}
                onViewMatch={setSelectedMatch}
              />
            )}

            {activeTab === 'matching' && (
              <MatchingPage
                matches={matches}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onViewDetails={setSelectedOpportunity}
                onViewMatch={setSelectedMatch}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'bookmarks' && (
              <BookmarksPage
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onViewDetails={setSelectedOpportunity}
                matches={matches}
                onViewMatch={setSelectedMatch}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'tracking' && (
              <TrackingPage
                trackingList={trackingList}
                onUpdateTracking={handleUpdateTracking}
                onViewDetails={setSelectedOpportunity}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'profile' && (
              <ProfilePage
                profile={profile}
                onSaveProfile={handleSaveProfile}
                matches={matches}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onViewDetails={setSelectedOpportunity}
                onViewMatch={setSelectedMatch}
              />
            )}
          </>
        )}
      </main>

      {selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          isBookmarked={bookmarks.some((b) => b.opportunity.id === selectedOpportunity.id)}
          onToggleBookmark={handleToggleBookmark}
          trackingState={trackingList.find((t) => t.opportunity.id === selectedOpportunity.id)}
          onUpdateTracking={handleUpdateTracking}
        />
      )}

      {selectedMatch && (
        <MatchModal
          matchData={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}

      {toast && (
        <NotificationToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Footer />
    </div>
  );
}
