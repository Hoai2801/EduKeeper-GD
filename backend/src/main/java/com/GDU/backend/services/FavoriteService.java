package com.GDU.backend.services;

import java.util.List;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.models.Favorite;

public interface FavoriteService {
    String createFavorite(FavoriteDTO favoriteDTO);

    List<Favorite> getAllFavorite();

    List<Favorite> getFavoritesByUserId(Long userId);

    List<Favorite> getFavoritesByDocsId(Long docsId);

    String deleteFavoriteById(Long id);
}
