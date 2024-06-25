package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.AuthenticationRequest;
import com.GDU.backend.dtos.requests.ChangePasswordRequest;
import com.GDU.backend.dtos.requests.RegisterRequest;
import com.GDU.backend.dtos.responses.AuthenticationResponse;
import com.GDU.backend.services.Impl.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Auth API")
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest registerRequest
    ) throws MessagingException {
        return ResponseEntity.ok().body(authenticationService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @Valid @RequestBody AuthenticationRequest loginRequest
    ) {
        return ResponseEntity.ok().body(authenticationService.login(loginRequest));
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        if (authentication != null) {
            System.out.println("logout: " + authentication.getName());
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @PostMapping("/activate/{token}")
    public ResponseEntity<String> activate(
            @PathVariable("token") String token
    ) {
        return ResponseEntity.ok().body(authenticationService.activate(token));
    }

    @PostMapping("/forgot-password/{staffCode}")
    public ResponseEntity<String> forgotPassword(
            @PathVariable("staffCode") String staffCode
    ) {
        return ResponseEntity.ok().body(authenticationService.forgotPassword(staffCode));
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<String> resetPassword(
            @PathVariable("token") String token,
            @RequestBody ChangePasswordRequest changePasswordRequest
    ) {
        return ResponseEntity.ok().body(
                authenticationService.resetPassword(token, changePasswordRequest)
        );
    }
}
