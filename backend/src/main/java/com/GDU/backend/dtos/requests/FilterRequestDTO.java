package com.GDU.backend.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FilterRequestDTO {
    private String searchTerm;
    private String categoryName;
    private String subjectName;
    private String departmentSlug;
    private String specializedSlug;
    private String publishYear;
    private String order;
}
