package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.AuthenticationRequest;
import com.GDU.backend.dtos.requests.RegisterRequest;
import com.GDU.backend.dtos.response.AuthenticationResponse;
import com.GDU.backend.models.Token;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.RoleRepository;
import com.GDU.backend.repositories.TokenRepository;
import com.GDU.backend.repositories.UserRepository;
import com.GDU.backend.services.Impl.enums.EmailTemplateName;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${spring.application.mailing.frontend.activation-url}")
    private String activationUrl;

    public String register(RegisterRequest registerRequest) throws MessagingException {
        // role is optional<Role>
        var role = roleRepository.findByName("USER").orElseThrow(
                () -> new RuntimeException("Role not found"));
        var user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .staffCode(registerRequest.getStaffCode())
                .roles(role)
                .accountLocked(false)
                .enabled(false)
                .build();

        userRepository.save(user);
        sendValidationEmail(user);
        return "registered";
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = GenerateToken(user);
        // send email
        emailService.sendEmail(user.getEmail(), user.getName(), EmailTemplateName.ACTIVATION,
                activationUrl + "/" + newToken);
    }

    private String GenerateToken(User user) {
        // generate token
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdDate(LocalDateTime.now())
                .expiresDate(LocalDateTime.now().plusDays(1))
                .user(user)
                .build();
        tokenRepository.save(token);
        return token.getToken();
    }

    private String generateActivationCode(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * characters.length());
            sb.append(characters.charAt(index));
        }
        return sb.toString();
    }


    public AuthenticationResponse login(AuthenticationRequest loginRequest) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        // use staff code to login
                        loginRequest.getStaffCode(),
                        loginRequest.getPassword()
                )
        );
        System.out.println("hi loo");
        var claims = new HashMap<String, Object>();
        var user = (User) auth.getPrincipal();
        claims.put("staff_code", user.getUsername());
        var jwt = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }

    public String activate(String token) {
        var dbToken = tokenRepository.findByToken(token).orElseThrow(
                () -> new RuntimeException("Invalid token")
        );
        if (dbToken.getExpiresDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }
        var user = dbToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        dbToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(dbToken);
        return "activated";
    }
}