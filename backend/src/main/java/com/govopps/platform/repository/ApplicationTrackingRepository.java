package com.govopps.platform.repository;

import com.govopps.platform.model.ApplicationTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationTrackingRepository extends JpaRepository<ApplicationTracking, Long> {
    List<ApplicationTracking> findByUserId(Long userId);
    Optional<ApplicationTracking> findByUserIdAndOpportunityId(Long userId, Long opportunityId);
    boolean existsByUserIdAndOpportunityId(Long userId, Long opportunityId);
}
