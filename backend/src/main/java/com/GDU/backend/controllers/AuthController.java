package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.AuthenticationRequest;
import com.GDU.backend.dtos.requests.ChangePasswordRequest;
import com.GDU.backend.dtos.requests.RegisterRequest;
import com.GDU.backend.services.Impl.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@CrossOrigin
@Tag(name = "Authentication", description = "Auth API")
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest registerRequest) {
        try {
            return authenticationService.register(registerRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody AuthenticationRequest loginRequest) {
        try {
            System.out.println("Login");
            return authenticationService.login(loginRequest);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @PostMapping("/activate/{token}")
    public ResponseEntity<String> activate(
            @PathVariable("token") String token) {
        return ResponseEntity.ok().body(authenticationService.activate(token));
    }

    @PostMapping("/forgot-password/{mail}")
    public ResponseEntity<?> forgotPassword(
            @PathVariable("mail") String mail
    ) {
        return authenticationService.forgotPassword(mail);
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPassword(
            @PathVariable("token") String token,
            @RequestBody ChangePasswordRequest changePasswordRequest) {
        return authenticationService.resetPassword(token, changePasswordRequest);
    }
    
    @PutMapping("/change-password/{staffCode}")
    public ResponseEntity<String> changePassword(
            @Valid @RequestBody ChangePasswordRequest changePasswordRequest,
            @PathVariable("staffCode") String staffCode
    ) {
        return authenticationService.changePassword(changePasswordRequest, staffCode);
    }
}
