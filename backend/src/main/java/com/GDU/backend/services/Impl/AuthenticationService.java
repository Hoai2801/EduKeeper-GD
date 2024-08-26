package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.AuthenticationRequest;
import com.GDU.backend.dtos.requests.ChangePasswordRequest;
import com.GDU.backend.dtos.requests.RegisterRequest;
import com.GDU.backend.dtos.responses.AuthenticationResponse;
import com.GDU.backend.exceptions.InvalidTokenException;
import com.GDU.backend.exceptions.PasswordsDoNotMatchException;
import com.GDU.backend.exceptions.TokenExpiredException;
import com.GDU.backend.exceptions.UserNotFoundException;
import com.GDU.backend.models.Token;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.*;
import com.GDU.backend.services.Impl.enums.EmailTemplateName;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Log4j2
public class AuthenticationService {
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final DepartmentRepository departmentRepository;
    private final SpecializedRepository specializedRepository;
    private final EmailService emailService;
    private final UserServiceImpl userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${spring.application.mailing.frontend.activation-url}")
    private String activationUrl;

    public ResponseEntity<String> register(RegisterRequest registerRequest) throws MessagingException {
        User user = new User();
        var role = roleRepository.findByName(registerRequest.getRoles()).orElseThrow(
                () -> new RuntimeException("Role not found"));
        // if user is student, we need to check the information
        if (role.getName().equals("ROLE_USER")) {
            if (!registerRequest.isAdminCreate()) {
                var department = departmentRepository.findById(Long.parseLong(registerRequest.getDepartment())).orElseThrow(
                        () -> new RuntimeException("Department not found")
                );
    
                var specialized = specializedRepository.findById(Long.parseLong(registerRequest.getSpecialized())).orElseThrow(
                        () -> new RuntimeException("Specialized not found")
                );
                user.setDepartment(department);
                user.setSpecialized(specialized);
                user.setKlass(registerRequest.getClassroom());
                user.setEnable(false);
            } else {
                user.setDepartment(null);
                user.setSpecialized(null);
                user.setKlass(null);
                user.setEnable(true);
            }
        // if user is teacher, we don't need to check the information
        // because the information is not required
        // teacher do not belong to any department
        } else {
            user.setDepartment(null);
            user.setSpecialized(null);
            user.setKlass(null);
            // admin create the account
            // so we don't want to access the email
            // to get the access token
            user.setEnable(true);
        }
        // check if user exists
        User existingUser = userRepository.findByEmail(registerRequest.getEmail()).orElse(null);
        if (existingUser != null && existingUser.isEnable()) {
            return ResponseEntity.badRequest().body("Email đã được sử dụng bởi tài khoản khác");
        } else if (existingUser != null) {
            userRepository.delete(existingUser);
        }

        // check if staffCode exists
        existingUser = userRepository.findByStaffCode(registerRequest.getStaffCode()).orElse(null);
        if (existingUser != null && existingUser.isEnable()) {
            return ResponseEntity.badRequest().body("Mã sinh viên đã được sử dụng bởi tài khoản khác");
        } else if (existingUser != null) {
            userRepository.delete(existingUser);
        }

        // save user
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setStaffCode(registerRequest.getStaffCode());
        user.setRoles(role);

        userRepository.save(user);

        // send email for student
        if (role.getName().equals("ROLE_USER") && !registerRequest.isAdminCreate()) {
            sendValidationEmail(user);
        }
        return ResponseEntity.ok("success");
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateToken(user);
        // send email
        emailService.sendEmail(user.getEmail(), user.getName(),
                EmailTemplateName.ACTIVATION,
                activationUrl + "/" + newToken);
    }

    private String generateToken(User user) {
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

    public ResponseEntity<?> login(AuthenticationRequest loginRequest) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        // use staff code to log in
                        loginRequest.getStaffCode(),
                        loginRequest.getPassword())
        );

        if (auth == null) {
            return ResponseEntity.badRequest().body("Sai mật khẩu");
        }
        var claims = new HashMap<String, Object>();
        var user = (User) auth.getPrincipal();
        if (!user.isEnabled()) {
            throw new RuntimeException("User not activated");
        }
        if (user.isAccountLocked()) {
            throw new RuntimeException("User account locked");
        }
        claims.put("staff_code", user.getUsername());
        claims.put("user_name", user.getName());
        claims.put("role", user.getRoles().getName());
        claims.put("email", user.getEmail());
        var jwt = jwtService.generateToken(claims, user);
        return ResponseEntity.ok(
                AuthenticationResponse.builder()
                    .token(jwt)
                    .build()
        );
    }

    public String activate(String token) {
        var dbToken = tokenRepository.findByToken(token).orElseThrow(
                () -> new RuntimeException("Invalid token"));
        if (dbToken.getExpiresDate().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(dbToken);
            throw new RuntimeException("Token expired");
        }
        User user = dbToken.getUser();
        if (user.isEnabled()) {
            throw new RuntimeException("User already activated");
        }
        user.setEnable(true);
        userRepository.save(user);
        tokenRepository.delete(dbToken);
        return "activated";
    }

    public ResponseEntity<String> forgotPassword(String staffCode) {
        try {
            var user = userRepository.findByStaffCode(staffCode).orElseThrow(
                    () -> new UserNotFoundException("User not found")
            );
            String newToken = generateToken(user);
            // send email
            String forgotPasswordUrl = "http://localhost:3000/account/forgot-password/" + newToken;
            emailService.sendEmail(user.getEmail(),
                    user.getName(), 
                    EmailTemplateName.FORGOT_PASSWORD,
                    forgotPasswordUrl);
            return ResponseEntity.ok("success");
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException("User not found");
        } catch (MessagingException e) {
            log.error("Error sending forgot password email", e);
            return ResponseEntity.badRequest().body("Lỗi hệ thống không thể gửi email");
        }
    }

    public ResponseEntity<String> resetPassword(String token, ChangePasswordRequest changePasswordRequest) {
        var dbToken = tokenRepository.findByToken(token).orElseThrow(
                () -> new InvalidTokenException("Invalid token"));
        if (dbToken.getExpiresDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expired");
        }
        if (!changePasswordRequest.getPassword().equals(changePasswordRequest.getConfirmPassword())) {
            throw new PasswordsDoNotMatchException("Passwords do not match");
        }
        User user = dbToken.getUser();
        userService.changePassword(user, changePasswordRequest.getPassword());
        tokenRepository.delete(dbToken);
        return ResponseEntity.ok("success");
    }
}