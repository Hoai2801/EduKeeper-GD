package com.GDU.backend.repositories;

import com.GDU.backend.models.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Query(value = "SELECT f FROM Favorite f join User u on u.id = f.userID.id where f.userID.id=:userId")
    List<Favorite> findAllByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT f FROM Favorite f join Document d on d.id =f.documentID.id where f.documentID.id=:documentId")
    List<Favorite> findAllByDocumentId(@Param("documentId") Long id);

    @Query(value = "SELECT f FROM Favorite f join User u on u.id = f.userID.id where f.userID.id=:userId and f.documentID.id=:documentId")
    Favorite findByUserIdAndDocumentId(Long userId, Long documentId);
}
