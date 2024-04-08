package com.GDU.backend.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecommentDTO {
    private String title;
    private Long specialized;
    private Long category;
    private String author;
}
