package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.AuthenticationRequest;
import com.GDU.backend.dtos.requests.RegisterRequest;
import com.GDU.backend.dtos.response.AuthenticationResponse;
import com.GDU.backend.services.Impl.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    
    @PostMapping("/activate/{token}")
    public ResponseEntity<String> activate(
            @PathVariable("token") String token
    ) {
        return ResponseEntity.ok().body(authenticationService.activate(token));
    }
}
