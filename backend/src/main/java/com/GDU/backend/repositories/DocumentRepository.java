package com.GDU.backend.repositories;

import com.GDU.backend.models.Document;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
        Document getDocumentBySlug(String slug);

        @Query(value = "SELECT * FROM document d where d.upload_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)  ORDER BY d.download DESC, d.views DESC ", nativeQuery = true)
        List<Document> getPopularDocumentThisWeek();

        @Query(value = "SELECT * FROM document d where d.upload_date >= DATE_SUB(NOW(), INTERVAL '30' DAY)  ORDER BY d.download DESC, d.views DESC ", nativeQuery = true)
        List<Document> getPopularDocumentThisMonth();

        @Query(value = "SELECT d.* FROM document d JOIN Users u ON u.id = d.user_id WHERE u.role = 'teacher' AND u.user_name LIKE %:authorName%", nativeQuery = true)
        List<Document> getDocumentsByAuthorName(@Param("authorName") String authorName);

        // @Query(value = "SELECT d.* FROM document d JOIN Users u ON u.user_id =
        // d.user_id WHERE u.role = 'user' AND u.user_id = :userId", nativeQuery = true)
        // List<Document> getDocumentsByUserId(@Param("userId") Long userId);

        @Query(value = "SELECT d.* FROM document d WHERE d.category_id = :category AND d.specialized_id = :specialized  AND d.title LIKE %:title% AND d.author_name LIKE %:author%  ORDER BY d.upload_date DESC, d.download DESC, d.views DESC LIMIT 5", nativeQuery = true)
        List<Document> getDocumentsSuggested(@Param("specialized") Long specialized, @Param("category") Long category,
                        @Param("title") String title, @Param("author") String author);

        @Query(value = "SELECT d.* FROM document d JOIN specialized s ON s.id = d.specialized_id where s.specialized_slug like %:slug%", nativeQuery = true)
        List<Document> getDocumentsBySlugSpecialized(@Param("slug") String slug);

        // @Query(value = "SELECT d.* FROM document d JOIN specialized s ON s.id =
        // d.specialized_id JOIN category c ON c.id = d.category_id JOIN department dm
        // ON dm.id = s.department_id WHERE dm.department_slug LIKE %:departmentSlug%
        // AND s.specialized_slug LIKE %:specializedSlug% AND c.category_name LIKE
        // %:categoryName% AND d.author_name LIKE %:authorName%", nativeQuery = true)
        // List<Document> getDocumentsByFilter(@Param("departmentSlug") String
        // departmentSlug,
        // @Param("specializedSlug") String spicializedSlug, @Param("categoryName")
        // String categoryName,
        // @Param("authorName") String authorName);

        @Query(value = "SELECT d.* FROM document d " +
                        "JOIN specialized s ON s.id = d.specialized_id " +
                        "JOIN category c ON c.id = d.category_id " +
                        "JOIN department dm ON dm.id = s.department_id " +
                        "WHERE (:departmentSlug IS NULL OR dm.departmentSlug LIKE %:departmentSlug%) " +
                        "AND (:title IS NULL OR d.title LIKE %:title%) " +
                        "AND (:specializedSlug IS NULL OR s.specializedSlug LIKE %:specializedSlug%) " +
                        "AND (:categoryName IS NULL OR c.categoryName LIKE %:categoryName%) " +
                        "AND (:authorName IS NULL OR d.authorName LIKE %:authorName%)", nativeQuery = true)
        List<Document> getDocumentsByFilter(@Param("departmentSlug") String departmentSlug,
                        @Param("title") String title,
                        @Param("specializedSlug") String spicializedSlug, @Param("categoryName") String categoryName,
                        @Param("authorName") String authorName);
}
