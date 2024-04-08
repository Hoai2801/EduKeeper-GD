package com.GDU.backend.repositories;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecializedRepository extends JpaRepository<Specialized, Long> {
    @Query("SELECT s FROM Specialized s WHERE s.id > :id")
    List<Specialized> findAllFromId(Long id);

    @Query("SELECT s FROM Specialized s WHERE s.departmentID.id = :departmentID")
    List<Specialized> findAllFromDepartment(Long departmentID);
<<<<<<< HEAD
    
    @Query("SELECT d FROM Document d WHERE d.specialized.specializedSlug = :specializedSlug ORDER BY d.id DESC")
    List<Document> getLastestDocumentsBySpecialized(String specializedSlug);
=======

    @Query("SELECT d FROM Document d WHERE d.specialized.id = :specializedId ORDER BY d.id DESC")
    List<Document> getLastestDocumentsBySpecialized(Long specializedId);
>>>>>>> 8633cccc05c3023d8df067af56d618e06cc06e9a

    // @Query("SELECT d FROM Document d WHERE d.specialized.id = :specializedId AND
    // d.upload_date >= :time")
    // List<Document> getDocumentsByDate(Long specializedId, Date time);
}
