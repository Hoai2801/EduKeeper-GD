package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FavoriteDTO;
import com.GDU.backend.dtos.responses.BooleanResponse;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.dtos.responses.UserResponse;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Favorite;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.FavoriteRepository;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.FavoriteService;
import com.GDU.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final UserService userService;
    private final DocumentService documentService;

    @Override
    public String createFavorite(FavoriteDTO favoriteDTO) {
        try {
            User user = userService.getUserByStaffCode(favoriteDTO.getUserId().toString());
            Document document = documentService.getDocumentById(favoriteDTO.getDocumentId());
            Favorite newFavorite = Favorite.builder().userID(user).documentID(document).build();
            favoriteRepository.save(newFavorite);
            return "Create favorite success";
        } catch (Exception e) {
            return "Create fail " + e;
        }
    }

    @Override
    public List<DocumentResponseDTO> getFavoritesByUserId(String staffCode) {
        try {
            User user = userService.getUserByStaffCode(staffCode);
            List<Favorite> favorites = favoriteRepository.findAllByUserId(user.getId());
            if (favorites != null) {
                return favorites.stream().map(favorite -> {
                    return DocumentResponseDTO.builder().id(favorite.getDocumentID().getId())
                            .subject(favorite.getDocumentID().getSubject())
                            .description(favorite.getDocumentID().getDescription())
                            .category(favorite.getDocumentID().getCategory())
                            .document_size(favorite.getDocumentID().getDocumentSize())
                            .document_type(favorite.getDocumentID().getDocumentType())
                            .download(favorite.getDocumentID().getDownload())
                            .pages(favorite.getDocumentID().getPages())
                            .slug(favorite.getDocumentID().getSlug())
                            .thumbnail(favorite.getDocumentID().getThumbnail())
                            .title(favorite.getDocumentID().getTitle())
                            .upload_date(favorite.getDocumentID().getUploadDate())
                            .user_upload(UserResponse.builder()
                                    .id(favorite.getDocumentID().getUserUpload().getId())
                                    .username(favorite.getDocumentID().getUserUpload().getName())
                                    .staffCode(favorite.getDocumentID().getUserUpload().getStaffCode())
                                    .avatar(favorite.getDocumentID().getUserUpload().getAvatar())
                                    .build())
                            .views(favorite.getDocumentID().getViews())
                            .author(favorite.getDocumentID().getAuthor())
                            .build();
                }).toList();
            }
            return null;
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
    public String deleteFavoriteById(FavoriteDTO favoriteDTO) {
        try {
            User user = userService.getUserByStaffCode(favoriteDTO.getUserId().toString());
            Favorite favorite = favoriteRepository.findByUserIdAndDocumentId(user.getId(), favoriteDTO.getDocumentId());
            System.out.println("Favorite: " + favorite);
            favoriteRepository.delete(favorite);
            return "Delete favorite success";
        } catch (Exception e) {
            return "Delete failes" + e;
        }
    }

    @Override
    public int getTotalOfDocsOfUser(Long userId) {
        List<DocumentResponseDTO> documents = documentService.getDocumentsByAuthor(userId.toString());
        if (documents != null) {
            return documents.stream().map(documentResponseDTO -> {
                return getFavoriteByDocumentId(documentResponseDTO.getId());
            }).toList().stream().mapToInt(Integer::intValue).sum();
        }
        return 0;
    }

    @Override
    public BooleanResponse checkIsFavorite(FavoriteDTO favoriteDTO) {
        User user = userService.getUserByStaffCode(favoriteDTO.getUserId().toString());
        Document document = documentService.getDocumentById(favoriteDTO.getDocumentId());
        Favorite favorites = favoriteRepository.findByUserIdAndDocumentId(user.getId(), document.getId());
        if (favorites != null) {
            return BooleanResponse.builder().result(true).build();
        }
        return BooleanResponse.builder().result(false).build();
    }

    public int getFavoriteByDocumentId(Long id) {
        List<Favorite> documents = favoriteRepository.findAllByDocumentId(id);
        if (documents != null) {
            return documents.size();
        }
        return 0;
    }
}
