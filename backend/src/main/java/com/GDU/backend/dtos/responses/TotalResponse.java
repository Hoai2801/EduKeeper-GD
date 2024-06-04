package com.GDU.backend.dtos.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TotalResponse {
    int totalDocumentsCurrent;
    int totalDocumentsPrevious;
    float percentage;
}
