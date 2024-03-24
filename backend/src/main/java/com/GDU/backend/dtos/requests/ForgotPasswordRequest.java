package com.GDU.backend.dtos.requests;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
public class ForgotPasswordRequest {
    private String email;
    private String otp;
    private LocalDateTime otpGeneratedTime;
}
