package com.govopps.platform.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "opportunities")
public class Opportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 300)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Category category;

    @Column(nullable = false, length = 250)
    private String organization;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "eligibility_criteria", nullable = false, columnDefinition = "TEXT")
    private String eligibilityCriteria;

    @Column(name = "required_qualification", nullable = false, length = 150)
    private String requiredQualification;

    @Column(name = "allowed_disciplines", length = 255)
    private String allowedDisciplines = "Any Discipline";

    @Column(name = "min_percentage")
    private Double minPercentage = 0.0;

    @Column(name = "max_age")
    private Integer maxAge;

    @Column(nullable = false, length = 150)
    private String location = "All India";

    @Column(name = "application_start_date")
    private LocalDate applicationStartDate;

    @Column(name = "application_deadline", nullable = false)
    private LocalDate applicationDeadline;

    @Column(name = "official_application_url", nullable = false, length = 500)
    private String officialApplicationUrl;

    @Column(name = "source_url", nullable = false, length = 500)
    private String sourceUrl;

    @Column(nullable = false, length = 50)
    private String status = "ACTIVE"; // ACTIVE, CLOSING_SOON, CLOSED

    @Column(name = "is_verified")
    private Boolean isVerified = true;

    @Column(name = "is_sample_data")
    private Boolean isSampleData = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Opportunity() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getEligibilityCriteria() { return eligibilityCriteria; }
    public void setEligibilityCriteria(String eligibilityCriteria) { this.eligibilityCriteria = eligibilityCriteria; }

    public String getRequiredQualification() { return requiredQualification; }
    public void setRequiredQualification(String requiredQualification) { this.requiredQualification = requiredQualification; }

    public String getAllowedDisciplines() { return allowedDisciplines; }
    public void setAllowedDisciplines(String allowedDisciplines) { this.allowedDisciplines = allowedDisciplines; }

    public Double getMinPercentage() { return minPercentage; }
    public void setMinPercentage(Double minPercentage) { this.minPercentage = minPercentage; }

    public Integer getMaxAge() { return maxAge; }
    public void setMaxAge(Integer maxAge) { this.maxAge = maxAge; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDate getApplicationStartDate() { return applicationStartDate; }
    public void setApplicationStartDate(LocalDate applicationStartDate) { this.applicationStartDate = applicationStartDate; }

    public LocalDate getApplicationDeadline() { return applicationDeadline; }
    public void setApplicationDeadline(LocalDate applicationDeadline) { this.applicationDeadline = applicationDeadline; }

    public String getOfficialApplicationUrl() { return officialApplicationUrl; }
    public void setOfficialApplicationUrl(String officialApplicationUrl) { this.officialApplicationUrl = officialApplicationUrl; }

    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }

    public Boolean getIsSampleData() { return isSampleData; }
    public void setIsSampleData(Boolean isSampleData) { this.isSampleData = isSampleData; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
