package com.GDU.backend.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UploadDTO {
    @NotEmpty
    @NotBlank
    private String title;

    @NotEmpty
    @NotBlank
    private String description;

    @NotEmpty
    @NotBlank
    private Long specialized;

    @NotEmpty
    @NotBlank
    private Long category;
    
    private Long subject;
    
    @NotEmpty
    @NotBlank
    private String department;
    
    private String author;

    @NotNull
    private MultipartFile document;
}
