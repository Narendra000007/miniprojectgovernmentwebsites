package com.govopps.platform.repository;

import com.govopps.platform.model.Opportunity;
import com.govopps.platform.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

    List<Opportunity> findByCategory(Category category);

    List<Opportunity> findByStatus(String status);

    @Query("SELECT o FROM Opportunity o WHERE " +
           "(:category IS NULL OR o.category = :category) AND " +
           "(:status IS NULL OR o.status = :status) AND " +
           "(:location IS NULL OR LOWER(o.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<Opportunity> findByFilters(
            @Param("category") Category category,
            @Param("status") String status,
            @Param("location") String location);

    @Query("SELECT o FROM Opportunity o WHERE LOWER(o.title) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(o.organization) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(o.description) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Opportunity> searchByKeyword(@Param("q") String keyword);
}
