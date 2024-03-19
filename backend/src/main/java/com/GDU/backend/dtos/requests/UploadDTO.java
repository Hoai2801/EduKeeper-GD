package com.GDU.backend.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UploadDTO {
    private Long userId;
    private String title;
    private Long department;
    private Long subject;
    private Long category;
    private Long teacherId;

    @NotNull
    private MultipartFile document;
}
