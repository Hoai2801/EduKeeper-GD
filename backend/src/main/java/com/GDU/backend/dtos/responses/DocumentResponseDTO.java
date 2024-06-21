package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.Category;
import com.GDU.backend.models.Subject;
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
    private String status;
    private String path;

    private String description;

    private UserResponse user_upload;

    private String author;

    private Subject subject;

    private Category category;

    private int views;

    private int download;

    private int pages;
}
