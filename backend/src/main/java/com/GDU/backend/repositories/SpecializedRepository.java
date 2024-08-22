package com.GDU.backend.repositories;

import com.GDU.backend.dtos.responses.SpecializesWithCount;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecializedRepository extends JpaRepository<Specialized, Long> {

    @Query("SELECT s FROM Specialized s WHERE s.department.id = :id")
    List<Specialized> getSpecializedsByDepartmentId(Long id);

}
