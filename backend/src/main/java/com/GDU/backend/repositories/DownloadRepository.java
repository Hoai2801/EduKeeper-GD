package com.GDU.backend.repositories;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.GDU.backend.models.Download;

import java.util.List;

@Repository
public interface DownloadRepository extends JpaRepository<Download, Long> {

    @Query("SELECT d FROM Download d WHERE d.user = :user AND d.document = :document")
    Download findByUserAndDocument(@Param("user") User user, @Param("document") Document document);

    @Query(value = "SELECT * FROM document d ORDER BY d.download DESC LIMIT :limit", nativeQuery = true)
    List<Document> getTopDocuments(@Param("limit") int limit);
}
