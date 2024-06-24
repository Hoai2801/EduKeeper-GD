package com.GDU.backend.repositories;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.User;
import com.GDU.backend.models.ViewHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViewHistoryRepository extends JpaRepository<ViewHistory, Long> {

    @Query("SELECT v FROM ViewHistory v WHERE v.user.id = :existingUser AND v.document.id = :existingDocument")
    ViewHistory findByUserAndDocumentLatest(Long existingUser, Long existingDocument);

    @Query("SELECT v FROM ViewHistory v WHERE v.user.id = :id AND v.isLastest = true ORDER BY v.createdAt DESC LIMIT :limit")
    List<ViewHistory> findByUser(Long id, Integer limit);

    @Query("SELECT v FROM ViewHistory v WHERE v.document.id = :id")
    List<ViewHistory> findByDocumentId(Long id);
}
