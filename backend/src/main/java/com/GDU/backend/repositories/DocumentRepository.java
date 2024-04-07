package com.GDU.backend.repositories;

import com.GDU.backend.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    Document getDocumentBySlug(String slug);

    @Query("SELECT d FROM Document d WHERE MONTH(d.upload_date) = MONTH(CURRENT_DATE())\n" +
            "AND YEAR(d.upload_date) = YEAR(CURRENT_DATE()) ORDER BY d.views DESC LIMIT :limit")
    List<Document> getMostViewedDocuments(int limit);

    @Query("SELECT d FROM Document d WHERE MONTH(d.upload_date) = MONTH(CURRENT_DATE())\n" +
            "AND YEAR(d.upload_date) = YEAR(CURRENT_DATE()) ORDER BY d.download DESC LIMIT :limit")
    List<Document> getMostDownloadedDocuments(int limit);

    @Query("SELECT d FROM Document d ORDER BY d.upload_date DESC LIMIT :limit")
    List<Document> getLastedDocuments(int limit);
}
