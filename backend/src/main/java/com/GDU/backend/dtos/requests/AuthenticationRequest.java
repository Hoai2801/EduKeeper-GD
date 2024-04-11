package com.GDU.backend.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    @Size(min = 8, message = "wrong staff code")
    @NotEmpty
    @NotBlank
    private String staffCode;

    @Size(min = 8, message = "wrong password")
    @NotEmpty
    @NotBlank
    private String password;
}
