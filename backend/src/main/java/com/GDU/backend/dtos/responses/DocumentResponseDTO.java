package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.*;
import com.GDU.backend.services.ViewHistoryService;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentResponseDTO {

    private Long id;
    
    private String title;

    private String slug;

    private String document_type;

    private Long document_size;

    private LocalDate upload_date;

    private String thumbnail;

    private String path;
    
    private String description;
    
    private String status;
    
    private String scope;
    
    @Column(name = "user_upload")
    private UserResponse user_upload;
    
    private String author;

    private Subject subject;
    
    private Category category;

    private int views;

    private int download;

    private int pages;

    public static DocumentResponseDTO from(Document document) {
        UserResponse userUpload = UserResponse.builder()
                .id(document.getUserUpload().getId())
                .username(document.getUserUpload().getName())
                .staffCode(document.getUserUpload().getStaffCode())
                .build();
        return DocumentResponseDTO.builder()
                .id(document.getId())
                .title(document.getTitle())
                .slug(document.getSlug())
                .views(document.getViewsCount())
                .download(document.getDownloadsCount())
                .user_upload(userUpload)
                .author(document.getAuthor())
                .category(document.getCategory())
                .upload_date(document.getUploadDate())
                .scope(document.getScope())
                .status(document.getStatus())
                .subject(document.getSubject())
                .path(document.getPath())
                .thumbnail(document.getThumbnail())
                .pages(document.getPages())
                .description(document.getDescription())
                .document_type(document.getDocumentType())
                .document_size(document.getDocumentSize())
                .build();
    }
}
