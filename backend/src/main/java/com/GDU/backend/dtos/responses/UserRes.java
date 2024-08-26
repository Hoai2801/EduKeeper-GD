package com.GDU.backend.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserRes {
    private Long id;

    private String staffCode;

    private String username;

    private String email;

    private String klass;

    private String department;
}
