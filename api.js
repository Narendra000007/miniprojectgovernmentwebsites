// API Client for Centralized Government Opportunity Platform

const API_BASE_URL = 'http://localhost:8080/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || `Request failed with status ${res.status}`);
    }
    return json.data;
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Stats
  async getDashboardStats() {
    return request('/stats/dashboard');
  },

  // Opportunities
  async getOpportunities(filters = {}) {
    const params = new URLSearchParams();
    if (filters.keyword) params.append('keyword', filters.keyword);
    if (filters.category && filters.category !== 'ALL') params.append('category', filters.category);
    if (filters.qualification && filters.qualification !== 'ALL') params.append('qualification', filters.qualification);
    if (filters.location && filters.location !== 'ALL') params.append('location', filters.location);
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);

    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/opportunities${query}`);
  },

  async getOpportunityById(id) {
    return request(`/opportunities/${id}`);
  },

  // User Profile
  async getUserProfile(userId = 1) {
    return request(`/users/${userId}/profile`);
  },

  async updateUserProfile(userId = 1, profileData) {
    return request(`/users/${userId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Rule-based Eligibility Matching
  async getMatches(userId = 1) {
    return request(`/matching/${userId}`);
  },

  async getOpportunityMatch(userId = 1, opportunityId) {
    return request(`/matching/${userId}/opportunity/${opportunityId}`);
  },

  // Bookmarks
  async getBookmarks(userId = 1) {
    return request(`/bookmarks/${userId}`);
  },

  async addBookmark(userId = 1, opportunityId) {
    return request('/bookmarks', {
      method: 'POST',
      body: JSON.stringify({ userId, opportunityId }),
    });
  },

  async removeBookmark(userId = 1, opportunityId) {
    return request(`/bookmarks/${userId}/${opportunityId}`, {
      method: 'DELETE',
    });
  },

  // Application Tracking
  async getTracking(userId = 1) {
    return request(`/tracking/${userId}`);
  },

  async updateTracking(payload) {
    return request('/tracking', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
