package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.Category;
import com.GDU.backend.models.Specialized;
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

    private String path;
    
    private UserResponse author;

    private Specialized specialized;
    
    private Subject subject;
    
    private Category category;

    private int views;

    private int download;

    private int pages;
}
