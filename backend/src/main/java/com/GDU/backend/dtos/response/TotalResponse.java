package com.GDU.backend.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TotalResponse {
    int totalDocumentsCurrent;

    int totalDocumentsPrevious;
    
    float percentage;
}
