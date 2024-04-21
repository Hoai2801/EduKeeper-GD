package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.models.Favorite;

import java.util.List;

public interface FavoriteService {
    String createFavorite(FavoriteDTO favoriteDTO);

    List<Favorite> getAllFavorite();

    List<Favorite> getFavoritesByUserId(Long userId);

    List<Favorite> getFavoritesByDocsId(Long docsId);

    String deleteFavoriteById(Long id);
}
