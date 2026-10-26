package com.govopps.platform.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "highest_qualification", nullable = false, length = 100)
    private String highestQualification;

    @Column(nullable = false, length = 150)
    private String discipline;

    @Column(name = "graduation_year")
    private Integer graduationYear;

    @Column(name = "percentage_or_cgpa")
    private Double percentageOrCgpa;

    private Integer age;

    @Column(length = 50)
    private String category = "General";

    @Column(name = "state_of_residence", length = 100)
    private String stateOfResidence = "Karnataka";

    @Column(name = "preferred_location", length = 100)
    private String preferredLocation = "All India";

    @Column(name = "preferred_categories", length = 255)
    private String preferredCategories;

    @Column(name = "skills_and_interests", columnDefinition = "TEXT")
    private String skillsAndInterests;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public UserProfile() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getHighestQualification() { return highestQualification; }
    public void setHighestQualification(String highestQualification) { this.highestQualification = highestQualification; }

    public String getDiscipline() { return discipline; }
    public void setDiscipline(String discipline) { this.discipline = discipline; }

    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }

    public Double getPercentageOrCgpa() { return percentageOrCgpa; }
    public void setPercentageOrCgpa(Double percentageOrCgpa) { this.percentageOrCgpa = percentageOrCgpa; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getStateOfResidence() { return stateOfResidence; }
    public void setStateOfResidence(String stateOfResidence) { this.stateOfResidence = stateOfResidence; }

    public String getPreferredLocation() { return preferredLocation; }
    public void setPreferredLocation(String preferredLocation) { this.preferredLocation = preferredLocation; }

    public String getPreferredCategories() { return preferredCategories; }
    public void setPreferredCategories(String preferredCategories) { this.preferredCategories = preferredCategories; }

    public String getSkillsAndInterests() { return skillsAndInterests; }
    public void setSkillsAndInterests(String skillsAndInterests) { this.skillsAndInterests = skillsAndInterests; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
