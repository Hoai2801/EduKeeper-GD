package com.GDU.backend.dtos;

import jakarta.persistence.Entity;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectDto {
    private String subject_name;
}
