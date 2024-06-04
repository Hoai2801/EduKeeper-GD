package com.GDU.backend.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {
    @NotBlank(message = "Not null variable")
    private String category_name;
}
