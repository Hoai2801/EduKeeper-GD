package com.GDU.backend.repositories;

import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    Document getDocumentBySlug(String slug);

    @Query("SELECT d FROM Document d WHERE MONTH(d.uploadDate) = MONTH(CURRENT_DATE())\n" +
            "AND YEAR(d.uploadDate) = YEAR(CURRENT_DATE()) ORDER BY d.views DESC LIMIT :limit")
    List<Document> getMostViewedDocuments(int limit);

    @Query("SELECT d FROM Document d WHERE MONTH(d.uploadDate) = MONTH(CURRENT_DATE())\n" +
            "AND YEAR(d.uploadDate) = YEAR(CURRENT_DATE()) ORDER BY d.download DESC LIMIT :limit")
    List<Document> getMostDownloadedDocuments(int limit);

    @Query("SELECT d FROM Document d ORDER BY d.id DESC LIMIT :limit")
    List<Document> getLastedDocuments(int limit);

    @Query(value = "SELECT * FROM document d where d.upload_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)  ORDER BY d.download DESC, d.views DESC ", nativeQuery = true)
    List<Document> getPopularDocumentThisWeek();

    @Query(value = "SELECT * FROM document d where d.upload_date >= DATE_SUB(NOW(), INTERVAL '30' DAY)  ORDER BY d.download DESC, d.views DESC ", nativeQuery = true)
    List<Document> getPopularDocumentThisMonth();

    @Query(value = "SELECT d.* FROM Document d JOIN Users u ON u.id = d.user_id WHERE u.role = 'teacher' AND MATCH(d.author) AGAINST (:authorName IN BOOLEAN MODE)", nativeQuery = true)
    List<Document> getDocumentsByAuthorName(@Param("authorName") String authorName);

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

    @Query(value = "SELECT d.* FROM document d JOIN specialized s ON s.id = d.specialized_id where s.specialized_slug like %:slug%", nativeQuery = true)
    List<Document> getDocumentsBySlugSpecialized(@Param("slug") String slug);

    @Query(value = "SELECT d.* FROM document d " +
            "JOIN subject_specialized ss ON ss.subject_id = d.subject_id " +
            "JOIN specialized s ON s.id = ss.specialized_id " +
            "JOIN category c ON c.id = d.category_id " +
            "JOIN subject sj ON sj.id = d.subject_id " +
            "JOIN department dm ON dm.id = s.department_id " +
            "WHERE (:departmentSlug IS NULL OR dm.department_slug LIKE CONCAT('%', COALESCE(:departmentSlug, ''), '%'))" +
            "AND (:searchTerm IS NULL OR (d.title LIKE CONCAT('%', :searchTerm, '%'))  OR (d.author LIKE CONCAT('%', :searchTerm, '%')))" +
            "AND (:categoryName IS NULL OR c.category_slug LIKE CONCAT('%', COALESCE(:categoryName, ''), '%'))" +
            "AND (:subjectName IS NULL OR sj.subject_slug LIKE CONCAT('%', COALESCE(:subjectName, ''), '%'))" +
            "AND (:specializedSlug IS NULL OR s.specialized_slug LIKE CONCAT('%', COALESCE(:specializedSlug, ''), '%')) ", nativeQuery = true)
    List<Document> getDocumentsByFilter(@Param("departmentSlug") String departmentSlug,
                                        @Param("searchTerm") String searchTerm,
                                        @Param("subjectName") String subjectName,
                                        @Param("specializedSlug") String specializedSlug,
                                        @Param("categoryName") String categoryName);


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
    Optional<Document> findBySlug(String slug);

//    @Query("SELECT d FROM Document d JOIN SubjectDocument sd JOIN SubjectSpecialized ss WHERE d.id = sd.document.id AND sd.subject.id = ss.subject.id AND ss.specialized.id = :id")
//    int countDocumentsBySpecializedId(@Param("id") Long id);

    @Query("select d from Document d where d.userUpload.id = :id")
    List<Document> findAllByAuthorId(Long id);

    @Query("SELECT COUNT(d) FROM Document d JOIN SubjectSpecialized ss ON d.subject.id = ss.subject.id WHERE ss.specialized.id = :id")
    int findAllBySpecializedId(Long id);

    @Query("SELECT d FROM Document d WHERE d.userUpload.id = :id")
    List<Document> findAllByUserId(Long id);
}
