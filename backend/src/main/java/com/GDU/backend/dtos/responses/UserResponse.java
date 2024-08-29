package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.Role;
import com.GDU.backend.models.User;
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
    

    public static UserResponse convertToResponse(User user) {
        if (user == null) {
            return null;
        }

        return UserResponse.builder()
                .id(user.getId())
                .staffCode(user.getStaffCode())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .email(user.getEmail())
                .roles(user.getRoles())
                .accountLocked(user.isAccountLocked())
                .createdDate(user.getCreatedDate())
                .lastModifiedDate(user.getLastModifiedDate())
                .build();
    }
}
