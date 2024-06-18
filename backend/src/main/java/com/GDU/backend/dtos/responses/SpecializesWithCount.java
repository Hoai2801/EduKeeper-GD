package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.Specialized;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SpecializesWithCount {
    private Specialized specialized;
    private int documentsCount;
}
