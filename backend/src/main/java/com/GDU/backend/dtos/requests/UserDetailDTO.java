package com.GDU.backend.dtos.requests;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserDetailDTO {
    private String staffCode;

    private String username;

    private String email;

    private long department;

    private long specialized;

    private String klass;

    private LocalDateTime birthDay;

    private boolean enable;
    
    private String role;
}
