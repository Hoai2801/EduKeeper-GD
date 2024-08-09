package com.GDU.backend.repositories;

import com.GDU.backend.models.Comment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
<<<<<<< HEAD
    @Query(value = "SELECT * FROM comment WHERE document_id = :documentId", nativeQuery = true)
    List<Comment> findAllByDocumentId(@Param("documentId") Long documentId);
=======
    @Query(value = "SELECT * FROM comment WHERE document_id = :documentId AND parent_id IS NULL", nativeQuery = true)
    List<Comment> findByDocumentId(Long documentId);

    @Query(value = "SELECT * FROM comment WHERE parent_id = :id", nativeQuery = true)
    List<Comment> findByParentCommentId(Long id);
>>>>>>> 857f3cd23cccdad73188e82016ffec4026385302
}
