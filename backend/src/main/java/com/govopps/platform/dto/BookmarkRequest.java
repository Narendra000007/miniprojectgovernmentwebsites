package com.govopps.platform.dto;

public class BookmarkRequest {
    private Long userId;
    private Long opportunityId;

    public BookmarkRequest() {}
    public BookmarkRequest(Long userId, Long opportunityId) {
        this.userId = userId;
        this.opportunityId = opportunityId;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getOpportunityId() { return opportunityId; }
    public void setOpportunityId(Long opportunityId) { this.opportunityId = opportunityId; }
}
