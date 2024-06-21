package com.GDU.backend.dtos.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BooleanResponse {
    private boolean result; 
}
