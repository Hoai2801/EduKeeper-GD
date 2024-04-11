package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Favorite;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.FavoriteRepository;
import com.GDU.backend.services.FavoriteService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {
    private final FavoriteRepository favoriteRepository;

    @Override
    public String createFavorite(FavoriteDTO favoriteDTO) {
        try {
            User user = User.builder().id(favoriteDTO.getUserId()).build();
            Document document = Document.builder().id(favoriteDTO.getDocumentId()).build();
            Favorite newFavorite = Favorite.builder().userID(user).documentID(document).build();
            favoriteRepository.save(newFavorite);
            return "Create favorite success";
        } catch (Exception e) {
            return "Create fail " + e;
        }
    }

    @Override
    public List<Favorite> getAllFavorite() {
        try {
            return favoriteRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Favorite> getFavoritesByUserId(Long userId) {
        try {
            return favoriteRepository.findAllByUserId(userId);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Favorite> getFavoritesByDocsId(Long docsId) {
        try {
            return favoriteRepository.findAllByDocumentId(docsId);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public String deleteFavoriteById(Long id) {
        try {
            favoriteRepository.deleteById(id);
            return "Delete favorite success";
        } catch (Exception e) {
            return "Delete failes" + e;
        }
    }
}
