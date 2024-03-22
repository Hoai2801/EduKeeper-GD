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
    String title;
    String categoryName;
    String departmentSlug;
    String specializedSlug;
    String authorName;
    String order;
}
