package com.GDU.backend.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteDTO {
    @NotBlank(message = "userId not null")
    private Long userId;
    @NotBlank(message = "documentId not null")
    private Long documentId;
}
