package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.AuthenticationRequest;
import com.GDU.backend.dtos.requests.ChangePasswordRequest;
import com.GDU.backend.dtos.requests.RegisterRequest;
import com.GDU.backend.dtos.response.AuthenticationResponse;
import com.GDU.backend.models.Token;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.RoleRepository;
import com.GDU.backend.repositories.TokenRepository;
import com.GDU.backend.repositories.UserRepository;
import com.GDU.backend.services.Impl.enums.EmailTemplateName;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.StaleObjectStateException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        System.out.println(registerRequest.getRoles());
        // role is optional<Role>
        var role = roleRepository.findByName(registerRequest.getRoles()).orElseThrow(
                () -> new RuntimeException("Role not found"));

        // check if user exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return "Email already exists";
        }
        
        // check if staffCode exists
        if (userRepository.existsByStaffCode(registerRequest.getStaffCode())) {
            return "StaffCode already exists";
        }
        // save user
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
                .expiresDate(LocalDateTime.now().plusMinutes(5))
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
                        // use staff code to log in
                        loginRequest.getStaffCode(),
                        loginRequest.getPassword()
                )
        );
        var claims = new HashMap<String, Object>();
        var user = (User) auth.getPrincipal();
        claims.put("staff_code", user.getUsername());
        claims.put("user_name", user.getName());
        claims.put("role", user.getRoles().getName());
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
        User user = dbToken.getUser();
        if (user.isEnabled()) {
            throw new RuntimeException("User already activated");
        }
        user.setEnabled(true);
        userRepository.save(user);
        tokenRepository.delete(dbToken);
        return "activated";
    }

    public String forgotPassword(String staffCode) {
        var user = userRepository.findByStaffCode(staffCode).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        // generate token
        String generatedToken = generateActivationCode(6);
        // save token
        var newToken = Token.builder()
                .token(generatedToken)
                .createdDate(LocalDateTime.now())
                .expiresDate(LocalDateTime.now().plusMinutes(5))
                .user(user)
                .build();
        tokenRepository.save(newToken);
        // send email
        try {
            String forgotPasswordUrl = "http://localhost:3000/account/forgot-password/" + newToken.getToken();
            emailService.sendEmail(user.getEmail(), user.getName(), EmailTemplateName.FORGOT_PASSWORD,
                    forgotPasswordUrl);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return "sent";
    }

    public String resetPassword(String token, ChangePasswordRequest changePasswordRequest) {
        var dbToken = tokenRepository.findByToken(token).orElseThrow(
                () -> new RuntimeException("Invalid token")
        );
        if (dbToken.getExpiresDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }
        if (!changePasswordRequest.getPassword().equals(changePasswordRequest.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        User user = dbToken.getUser();
        System.out.println(user);
        System.out.println(changePasswordRequest.getPassword());
        user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
        userRepository.save(user);
        tokenRepository.delete(dbToken);
        return "reset";
    }
}