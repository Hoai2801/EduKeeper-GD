package com.GDU.backend.dtos.requests;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class UploadDto {
    private Long studentId;
    private String documentName;
    private String department;
    private MultipartFile document;
}
