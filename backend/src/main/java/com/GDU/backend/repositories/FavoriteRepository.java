package com.GDU.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.GDU.backend.models.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Query(value = "SELECT f.* FROM Favorite f join Users u on u.id = f.user_id where f.user_id = :userId", nativeQuery = true)
    List<Favorite> findAllByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT f.* FROM Favorite f join Document d on d.id = f.document_id where f.document_id = :documentId", nativeQuery = true)
    List<Favorite> findAllByDocumentId(@Param("documentId") Long id);
}
