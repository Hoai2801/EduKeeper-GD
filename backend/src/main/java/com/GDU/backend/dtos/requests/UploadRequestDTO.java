package com.GDU.backend.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UploadRequestDTO {
    private String title;
    
    private String description;
    
    private long specialized;
    
    private long category;
    
    private long subject;
    
    private String scope; 
    
    private String userUpload;

    private String author;
    
    private MultipartFile document;
    
    private MultipartFile documentDownload;
}
