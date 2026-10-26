package com.govopps.platform.dto;

import com.govopps.platform.model.Opportunity;

public class MatchResultDto {
    private Opportunity opportunity;
    private int matchScore;
    private String matchReason;

    public MatchResultDto() {}
    public MatchResultDto(Opportunity opportunity, int matchScore, String matchReason) {
        this.opportunity = opportunity;
        this.matchScore = matchScore;
        this.matchReason = matchReason;
    }

    public Opportunity getOpportunity() { return opportunity; }
    public void setOpportunity(Opportunity opportunity) { this.opportunity = opportunity; }

    public int getMatchScore() { return matchScore; }
    public void setMatchScore(int matchScore) { this.matchScore = matchScore; }

    public String getMatchReason() { return matchReason; }
    public void setMatchReason(String matchReason) { this.matchReason = matchReason; }
}
