package com.GDU.backend.dtos.requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ViewHistoryDTO {
    private String staffCode;
    private Long documentId;
}
