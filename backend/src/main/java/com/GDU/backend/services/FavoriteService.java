package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.dtos.responses.BooleanResponse;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Favorite;

import java.util.List;

public interface FavoriteService {
    String createFavorite(FavoriteDTO favoriteDTO);

    List<DocumentResponseDTO> getFavoritesByUserId(String userId);

    List<Favorite> getFavoritesByDocsId(Long docsId);

    String deleteFavoriteById(FavoriteDTO id);

    int getTotalOfDocsOfUser(Long userId);

    BooleanResponse checkIsFavorite(FavoriteDTO favoriteDTO);
}
