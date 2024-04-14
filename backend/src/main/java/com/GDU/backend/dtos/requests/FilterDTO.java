package com.GDU.backend.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FilterDTO {
    private String searchTerm;
    private String categoryName;
    private String subjectName;
    private String departmentSlug;
    private String specializedSlug;
    private String order;
}
