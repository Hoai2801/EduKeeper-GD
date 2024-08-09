package com.GDU.backend.repositories;

import com.GDU.backend.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "SELECT * FROM comment WHERE document_id = :documentId", nativeQuery = true)
    List<Comment> findAllByDocumentId(@Param("documentId") Long documentId);
}
