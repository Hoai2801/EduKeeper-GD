package com.GDU.backend.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentResponse {
    private int totalDocumentsCurrent;
    private int totalDocumentsPrev;
    private float percentage;
}
