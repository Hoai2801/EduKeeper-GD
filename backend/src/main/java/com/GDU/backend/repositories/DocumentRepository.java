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

//    @Query(value = "SELECT d.* FROM document d JOIN Users u ON u.user_id = d.teacher_id WHERE u.role = 'teacher' AND u.user_name LIKE %:teacherName%", nativeQuery = true)
//    List<Document> getDocumentsByTeacherName(@Param("teacherName") String teacherName);
//
//    @Query(value = "SELECT d.* FROM document d JOIN Users u ON u.user_id = d.teacher_id WHERE u.role = 'teacher' AND u.user_id = :teacherId", nativeQuery = true)
//    List<Document> getDocumentsByTeacherId(@Param("teacherId") Long teacherId);

    @Query(value = "SELECT d.* FROM document d JOIN Users u ON u.user_id = d.user_id WHERE u.role = 'user' AND u.user_id = :userId", nativeQuery = true)
    List<Document> getDocumentsByUserId(@Param("userId") Long userId);
    
    @Query//something here
    List<Document> getDocumentsSuggested(Long specialized, Long category, String title, String author);


//    @Query(value = "SELECT d.* FROM document d WHERE d.category_id = :categoryId AND d.department_id = :departmentId AND subject_id = :subjectId AND d.document_type LIKE %:type% ORDER BY d.upload_date DESC, d.download DESC, d.views DESC LIMIT 5", nativeQuery = true)
//    List<Document> getDocumentsSuggested(Long categoryId);
}
