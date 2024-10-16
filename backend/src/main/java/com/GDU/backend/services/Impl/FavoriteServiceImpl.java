package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Favorite;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.repositories.FavoriteRepository;
import com.GDU.backend.repositories.UserRepository;
import com.GDU.backend.services.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    @Override
    public String createFavorite(FavoriteDTO favoriteDTO) {
        try {
            User user = userRepository.findByStaffCode(favoriteDTO.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
            Document document = documentRepository.findById(Long.parseLong(favoriteDTO.getDocumentId())).orElseThrow(() -> new ResourceNotFoundException("Document not found"));
            Favorite existsed = favoriteRepository.existsByUserIDAndDocumentID(user.getId(), document.getId());
            if (existsed != null) {
                return "Already favorite";
            }
            Favorite newFavorite = Favorite.builder().userID(user).documentID(document).build();
            favoriteRepository.save(newFavorite);
            return "Create favorite success";
        } catch (Exception e) {
            return "Create fail " + e;
        }
    }

    @Override
    public List<DocumentResponseDTO> getDocumentsFavoritesByUserId(Long userId) {
        try {
            User existUser = userRepository.findByStaffCode(userId.toString()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
            List<Favorite> favorites = favoriteRepository.findAllByUserID(existUser.getId());

            return favorites.stream().map(favorite -> {
                Document document = documentRepository.findById(favorite.getDocumentID().getId()).isPresent() ? documentRepository.findById(favorite.getDocumentID().getId()).get() : null;
                return DocumentResponseDTO.from(document);
            }).collect(Collectors.toList());
        } catch (Exception e) {
            return List.of();
        }
    }

    @Override
    public String deleteFavoriteById(FavoriteDTO favoriteDTO) {
        try {
            User user = userRepository.findByStaffCode(favoriteDTO.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
            Document document = documentRepository.findById(Long.parseLong(favoriteDTO.getDocumentId())).orElseThrow(() -> new ResourceNotFoundException("Document not found"));
            Favorite isExist = favoriteRepository.existsByUserIDAndDocumentID(user.getId(), document.getId());

            if (isExist != null) {
                favoriteRepository.delete(isExist);
            }
            return "Delete favorite success";
        } catch (Exception e) {
            return "Delete failes" + e;
        }
    }

    @Override
    public boolean isFavorite(FavoriteDTO favoriteDTO) {
        User user = userRepository.findByStaffCode(favoriteDTO.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Document document = documentRepository.findById(Long.parseLong(favoriteDTO.getDocumentId())).orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        Favorite isExist = favoriteRepository.existsByUserIDAndDocumentID(user.getId(), document.getId());
        return isExist != null;
    }

    @Override
    public int getTotalFavoritesCountByAuthor(Long authorId) {
        User user = userRepository.findByStaffCode(authorId.toString()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<Favorite> favorites = favoriteRepository.findAllByUserID(user.getId());
        if (favorites != null) {
            return favorites.size();
        }
        return 0;
    }
}
