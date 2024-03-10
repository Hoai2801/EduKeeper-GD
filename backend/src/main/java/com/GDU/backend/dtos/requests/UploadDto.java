package com.GDU.backend.dtos.requests;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class UploadDto {
    private Long userId;
    private String documentName;
    private String department;
    private String subject;
    private String category;
    private String teacherId;
    private List<MultipartFile> helloFile;
}
