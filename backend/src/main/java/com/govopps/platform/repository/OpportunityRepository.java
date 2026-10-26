package com.govopps.platform.repository;

import com.govopps.platform.model.Category;
import com.govopps.platform.model.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

    List<Opportunity> findAllByOrderByApplicationDeadlineAsc();

    List<Opportunity> findByCategoryOrderByApplicationDeadlineAsc(Category category);

    @Query("SELECT o FROM Opportunity o WHERE " +
           "(:keyword IS NULL OR LOWER(o.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "  OR LOWER(o.organization) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "  OR LOWER(o.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "  OR LOWER(o.allowedDisciplines) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:category IS NULL OR o.category = :category) " +
           "AND (:qualification IS NULL OR LOWER(o.requiredQualification) LIKE LOWER(CONCAT('%', :qualification, '%'))) " +
           "AND (:location IS NULL OR LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
           "AND (:status IS NULL OR o.status = :status) " +
           "ORDER BY o.applicationDeadline ASC")
    List<Opportunity> searchAndFilter(
            @Param("keyword") String keyword,
            @Param("category") Category category,
            @Param("qualification") String qualification,
            @Param("location") String location,
            @Param("status") String status
    );

    long countByCategory(Category category);

    long countByStatus(String status);
}
