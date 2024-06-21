package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Long id;

    private String staffCode;

    private String username;
    
    private String avatar;

    private String email;

    private Role roles;

    private boolean accountLocked;

    private LocalDateTime createdDate;

    private LocalDateTime lastModifiedDate;
}
