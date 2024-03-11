package com.GDU.backend.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class UploadDTO {
    private Long userId;
    @NotNull(message = "Title cannot be null")
    private String title;
    private Long department;
    private Long subject;
    private Long category;
    private Long teacherId;
    
//    @NotNull
    private MultipartFile document;
}
