package com.GDU.backend.dtos.requests;

import com.GDU.backend.models.User;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
public class ForgotPasswordRequest {
    private String email;
    private User user;
    private String otp;
    private Instant otpGeneratedTime;
}
