package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.Specialized;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SpecializesWithCount {
    private Specialized specialized;
    int documentsCount;
}
