package com.GDU.backend.repositories;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.User;
import com.GDU.backend.models.ViewHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViewHistoryRepository extends JpaRepository<ViewHistory, Long> {

    @Query("SELECT v FROM ViewHistory v WHERE v.user.id = :existingUser AND v.document.id = :existingDocument and v.isLastest = true")
    ViewHistory findByUserAndDocumentLatest(@Param("existingUser") Long existingUser,
            @Param("existingDocument") Long existingDocument);

    @Query("SELECT v FROM ViewHistory v WHERE v.user.id = :id AND v.isLastest = true ORDER BY v.createdAt DESC LIMIT :limit")
    List<ViewHistory> findByUser(@Param("id") Long id, @Param("limit") Integer limit);

    @Query("SELECT v FROM ViewHistory v WHERE v.document.id = :id")
    List<ViewHistory> findByDocumentId(@Param("id") Long id);

    // find the document have the most view-history by count the view-history
    @Query("SELECT vh.document FROM ViewHistory vh left join Document d on vh.document.id = d.id WHERE d.isDelete = false AND d.status = 'published' AND (d.scope = 'student-only' or d.scope = 'public') GROUP BY vh.document ORDER BY COUNT(vh) DESC LIMIT :limit")
    List<Document> findTopDocuments(@Param("limit") Integer limit);
}
