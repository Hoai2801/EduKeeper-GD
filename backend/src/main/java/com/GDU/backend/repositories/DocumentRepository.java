package com.GDU.backend.repositories;

import com.GDU.backend.dtos.responses.Monthly;
import com.GDU.backend.dtos.responses.TypeRes;
import com.GDU.backend.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.GDU.backend.dtos.responses.DocumentMonthly;
import com.GDU.backend.dtos.responses.TypeDocumentRes;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
        Document getDocumentBySlug(@Param("slug") String slug);

        @Query("SELECT d FROM Document d WHERE MONTH(d.uploadDate) = MONTH(CURRENT_DATE())\n" +
                        "AND YEAR(d.uploadDate) = YEAR(CURRENT_DATE()) AND d.isDelete = false ORDER BY size(d.downloads) DESC LIMIT :limit")
        List<Document> getMostDownloadedDocuments(@Param("limit") int limit);

        @Query(value = "SELECT * FROM document d WHERE d.is_Delete = 0 and d.status = 'published' and (d.scope = 'student-only' or d.scope = 'public') ORDER BY d.id DESC LIMIT :limit", nativeQuery = true)
        List<Document> getLastedDocuments(@Param("limit") int limit);

        @Query(value = "SELECT * FROM document d WHERE d.is_delete = 1 ", nativeQuery = true)
        List<Document> getDeleteDocuments();

        @Query(value = "SELECT d.* FROM document d " +
                        "INNER JOIN users u ON d.author = u.id " +
                        "WHERE d.category_id = :category " +
                        "AND d.specialized_id = :specialized " +
                        "AND (MATCH (d.title) AGAINST (:title IN BOOLEAN MODE) " +
                        "OR u.user_name LIKE CONCAT('%', :author, '%')) " +
                        "ORDER BY d.upload_date DESC, d.download DESC, d.views DESC " +
                        "LIMIT 15", nativeQuery = true)
        List<Document> getDocumentsSuggested(@Param("specialized") Long specialized,
                        @Param("category") Long category,
                        @Param("title") String title,
                        @Param("author") String author);

        @Query(value = "SELECT DISTINCT d.* FROM document d " +
                        "JOIN specialized s ON s.id = d.specialized_id " +
                        "JOIN category c ON c.id = d.category_id " +
                        "LEFT JOIN subject sj ON sj.id = d.subject_id " +
                        "JOIN department dm ON dm.id = s.department_id " +
                        "WHERE d.status = 'published' " +
                        "AND d.is_delete = 0 " +
                        "OR (:subjectName IS NULL OR sj.subject_slug LIKE CONCAT('%', COALESCE(:subjectName, ''), '%') OR d.subject_id IS NULL) "
                        +
                        "AND ((:departmentSlug IS NULL OR dm.department_slug LIKE CONCAT('%', COALESCE(:departmentSlug, ''), '%')) "
                        +
                        "AND (:searchTerm IS NULL OR (d.title LIKE CONCAT('%', :searchTerm, '%') OR d.author LIKE CONCAT('%', :searchTerm, '%'))) "
                        +
                        "AND (:categoryName IS NULL OR c.category_slug LIKE CONCAT('%', COALESCE(:categoryName, ''), '%')) "
                        +
                        "AND (:specializedSlug IS NULL OR s.specialized_slug LIKE CONCAT('%', COALESCE(:specializedSlug, ''), '%')) "
                        +
                        "AND (:dateTime IS NULL OR d.upload_date LIKE CONCAT('%', COALESCE(:dateTime, ''), '%')))", nativeQuery = true)
        List<Document> getDocumentsByFilter(@Param("departmentSlug") String departmentSlug,
                        @Param("searchTerm") String searchTerm,
                        @Param("subjectName") String subjectName,
                        @Param("specializedSlug") String specializedSlug,
                        @Param("categoryName") String categoryName,
                        @Param("dateTime") String dateTime);

        // Get total number of documents this year
        @Query(value = "SELECT count(*) FROM document d WHERE d.upload_date >= DATE_FORMAT(NOW(),CONCAT( YEAR(NOW()) ,'-01-01')) AND d.upload_date < DATE_FORMAT(NOW() + INTERVAL 1 YEAR, CONCAT( YEAR(NOW()) + 1 ,'-01-01'))", nativeQuery = true)
        Integer getNumberOfDocumentsThisYear();

        // Get total number of documents from the previous year
        @Query(value = "SELECT count(*) FROM document d WHERE d.upload_date >= DATE_FORMAT(NOW(),CONCAT( YEAR(NOW()) - 1,'-01-01')) AND d.upload_date < DATE_FORMAT(NOW() + INTERVAL 1 YEAR, CONCAT( YEAR(NOW()),'-01-01'))", nativeQuery = true)
        Integer getNumberOfDocumentPreviousYear();

        // Get total number of documents this year
        @Query(value = "SELECT count(*) FROM document d WHERE d.upload_date >= DATE_FORMAT(NOW(),CONCAT( YEAR(NOW()) ,'-01-01')) AND d.upload_date < DATE_FORMAT(NOW() + INTERVAL 1 YEAR, CONCAT( YEAR(NOW()) + 1 ,'-01-01')) AND MONTH(d.upload_date) = MONTH(NOW())", nativeQuery = true)
        Integer getNumberOfDocumentsThisMonth();

        // Get total number of documents from the previous year
        @Query(value = "SELECT count(*) FROM document d WHERE d.upload_date >= DATE_FORMAT(NOW(),CONCAT( YEAR(NOW()) ,'-01-01')) AND d.upload_date < DATE_FORMAT(NOW() + INTERVAL 1 YEAR, CONCAT( YEAR(NOW()) + 1 ,'-01-01'))  AND MONTH(d.upload_date) = MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH)) ", nativeQuery = true)
        Integer getNumberOfDocumentPreviousMonth();

        @Query(value = "SELECT count(*) FROM document", nativeQuery = true)
        int countAllDocuments();

        @Query("SELECT d FROM Document d WHERE d.slug = :slug")
        Optional<Document> findBySlug(@Param("slug") String slug);

        @Query("select d from Document d where d.userUpload.id = :id and d.isDelete = false")
        List<Document> findAllByAuthorId(@Param("id") Long id);

        @Query("SELECT COUNT(d) FROM Document d JOIN Specialized s ON d.specialized.id = s.id WHERE s.id = :id and d.status = 'published' and d.isDelete = false and d.scope != 'private'")
        int findAllBySpecializedId(@Param("id") Long id);

        @Query(value = "SELECT * FROM document d WHERE d.status = 'draft' and is_delete = 0", nativeQuery = true)
        List<Document> findDraftDocuments();

        @Query(value = "SELECT * FROM document d WHERE d.status = 'published' and is_delete = 0", nativeQuery = true)
        List<Document> findPublishedDocuments();

        @Query(value = "SELECT COALESCE(SUM(d.total), 0) AS total, m.month " +
                        "FROM ( " +
                        "   SELECT 1 AS month UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 " +
                        "   UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 " +
                        "   UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 " +
                        "   UNION ALL SELECT 11 UNION ALL SELECT 12 " +
                        ") AS m " +
                        "LEFT JOIN ( " +
                        "   SELECT COUNT(id) AS total, MONTH(upload_date) AS month " +
                        "   FROM document WHERE YEAR(upload_date) = :year AND is_delete = 0" +
                        "   GROUP BY MONTH(upload_date) " +
                        ") AS d ON m.month = d.month  " +
                        "GROUP BY m.month " +
                        "ORDER BY m.month ASC", nativeQuery = true)
        List<Monthly> countDocumentsMonthly(@Param("year") int year);

        @Query(value = "SELECT COUNT(d.id) " +
                        "FROM document d " +
                        "WHERE d.upload_date >= CURRENT_DATE() AND d.upload_date < CURRENT_DATE() + INTERVAL 1 DAY", nativeQuery = true)
        int countDocumentsToday();

        @Query(value = "SELECT COUNT(d.id) as total, d.documentType as type FROM Document d WHERE d.isDelete = false AND YEAR(d.uploadDate) = :year GROUP BY d.documentType")
        List<TypeRes> countDocumentsByType(@Param("year") int year);

        @Query(value = "SELECT COUNT(d.id) FROM Document d WHERE d.status LIKE 'published'")
        int countPublishedDocuments();

        @Query(value = "SELECT COUNT(d.id) FROM Document d WHERE d.status = 'draft'")
        int countDraftDocuments();

        @Query(value = "SELECT * FROM document d ORDER BY d.download DESC LIMIT 10", nativeQuery = true)
        List<Document> getTop10Docs();

        @Query(value = "SELECT * FROM document d ORDER BY d.upload_date ASC LIMIT 10  OFFSET :offset ", nativeQuery = true)
        List<Document> getPaginationDocuments(@Param("offset") int offset);

        @Query(value = "SELECT d.*, " +
                        "COALESCE(dl.total_downloads, 0) AS totalDownloads, " +
                        "COALESCE((SELECT COUNT(*) FROM view_history vh WHERE vh.document_id = d.id), 0) AS totalViews, "
                        +
                        "COALESCE((SELECT COUNT(*) FROM favorite f WHERE f.document_id = d.id), 0) AS totalFavotites "
                        +
                        "FROM document d " +
                        "LEFT JOIN (" +
                        "    SELECT document_id, COUNT(document_id) AS total_downloads " +
                        "    FROM downloads " +
                        "    GROUP BY document_id " +
                        ") dl ON d.id = dl.document_id " +
                        "JOIN specialized spe ON d.specialized_id = spe.id " +
                        "WHERE spe.department_id = :departmentId " +
                        "ORDER BY totalDownloads DESC " +
                        "LIMIT 10", nativeQuery = true)
        List<Document> findDocumentsWithMostDownloads(@Param("departmentId") int departmentId);

        @Query(value = "SELECT count(vh) FROM Document d left join ViewHistory vh on d.id = vh.document.id WHERE d.isDelete = false AND d.userUpload.staffCode = :staffCode")
        int getTotalViewsByAuthor(@Param("staffCode") String staffCode);

        @Query(value = "SELECT d FROM Document d left join Subject s on d.subject.id = s.id")
        List<Document> getDocumentsBySubjectId(Long idSubject);
}
