package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.models.Favorite;

import java.util.List;

public interface FavoriteService {
    String createFavorite(FavoriteDTO favoriteDTO);

    List<DocumentResponseDTO> getDocumentsFavoritesByUserId(Long userId);

    String deleteFavoriteById(FavoriteDTO favoriteDTO);

    boolean isFavorite(FavoriteDTO favoriteDTO);

    int getTotalFavoritesCountByAuthor(Long authorId);
}
