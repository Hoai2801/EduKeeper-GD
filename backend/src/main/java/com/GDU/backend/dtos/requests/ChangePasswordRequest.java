package com.GDU.backend.dtos.requests;

import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChangePasswordRequest {
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
    
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String confirmPassword;
}
