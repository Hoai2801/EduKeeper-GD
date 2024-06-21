package com.GDU.backend.repositories;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.Favorite;
import com.GDU.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query(value = "SELECT * FROM favorite WHERE user_id = :userId", nativeQuery = true)
    List<Favorite> findAllByUserID(long userId);

    @Query("SELECT f FROM Favorite f WHERE f.userID.id = :userId AND f.documentID.id = :documentId")
    Favorite existsByUserIDAndDocumentID(Long userId, Long documentId);
}
