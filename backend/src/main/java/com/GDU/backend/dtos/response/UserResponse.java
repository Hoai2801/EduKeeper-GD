package com.GDU.backend.dtos.response;

import com.GDU.backend.models.Role;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Long id;

    private String staffCode;

    private String username;

    private String email;

    private Role roles;
    
    private boolean accountLocked;

    private LocalDateTime createdDate;
    
    private LocalDateTime lastModifiedDate;
}
