package com.GDU.backend.dtos.requests;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotEmpty(message = "Student code must not be null")
    @NotBlank(message = "Student code must not be blank")
    @NotNull
    private String staffCode;

    @NotEmpty
    @NotBlank
    @NotNull
    private String username;

    @Email
    @NotBlank
    @NotNull
    private String email;

    @NotEmpty
    @NotBlank
    @NotNull
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    private String department;

    private String specialized;
    
    private String classroom;
    
    // if data type is boolean, it always return false
    private String isAdminCreate;

    @NotEmpty
    @NotBlank
    @NotNull
    private String roles;
}
