package com.GDU.backend.repositories;

import com.GDU.backend.models.Subject;
import com.GDU.backend.models.SubjectSpecialized;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectSpecializedRepository extends JpaRepository<SubjectSpecialized, Long> {

    @Query("SELECT s FROM SubjectSpecialized s WHERE s.specialized.id = :specializedId")
    List<SubjectSpecialized> getSubjectsBySpecializedId(Long specializedId);
}