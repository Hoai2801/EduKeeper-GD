package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.AuthenticationRequest;
import com.GDU.backend.dtos.requests.RegisterRequest;
import com.GDU.backend.dtos.response.AuthenticationResponse;
import com.GDU.backend.services.AuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) throws Exception{
        return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.refreshToken(request, response);
    }

    @PutMapping("/verify-account")
    public ResponseEntity<String> verifyAccount(
            @RequestParam String email,
            @RequestParam String otp) {
        return ResponseEntity.ok(authenticationService.verifyAccount(email, otp));
    }
    @PutMapping("/regenerate-otp")
    public ResponseEntity<String> regenerateOtp(
            @RequestParam String email) {
        return ResponseEntity.ok(authenticationService.regenerateOtp(email));
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestParam String email) {
        return ResponseEntity.ok(authenticationService.forgotPassword(email));
    }

    @PutMapping("/set-password")
    public ResponseEntity<String> setPassword(
            @RequestParam String email,
            @RequestParam String newPassword) {
        return ResponseEntity.ok(authenticationService.setPassword(email, newPassword));
    }
}
