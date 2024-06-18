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
public class UploadRequestDTO {
    @NotEmpty
    @NotBlank
    private String title;

    @NotEmpty
    @NotBlank
    private String description;

    @NotEmpty
    @NotBlank
    private int department;

    @NotEmpty
    @NotBlank
    private int specialized;

    @NotEmpty
    @NotBlank
    private int category;

    @NotEmpty
    @NotBlank
    private int subject;

    @NotEmpty
    @NotBlank
    private Long userUpload;

    private String author;

    @NotNull
    private MultipartFile document;
}
