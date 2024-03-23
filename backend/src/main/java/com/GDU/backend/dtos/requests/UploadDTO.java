package com.GDU.backend.dtos.requests;

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
    private String title;
    private Long specialized;
    private Long category;
    private String author;

//    private Long userId;
//    private Long subject;
//    private Long teacherId;

    @NotNull
    private MultipartFile document;
}
