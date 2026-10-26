package com.govopps.platform.dto;

import com.govopps.platform.model.ApplicationStatus;

public class TrackingUpdateRequest {
    private ApplicationStatus status;
    private String notes;

    public TrackingUpdateRequest() {}

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
