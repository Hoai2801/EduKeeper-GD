package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.ForgotPasswordRequest;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.UserRepository;
import com.GDU.backend.utils.EmailUtil;
import com.GDU.backend.utils.ForgotPasswordCache;
import com.GDU.backend.utils.OtpUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {
    private final OtpUtil otpUtil;
    private final EmailUtil emailUtil;
    private final UserRepository userRepository;
    private final ForgotPasswordCache forgotPasswordCache;

    public String forgotPassword(String email) throws MessagingException {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email:" + email));
        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendSetPasswordEmail(email);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException("Unable to send set password email please try again");
        }
        ForgotPasswordRequest forgotPasswordRequest = ForgotPasswordRequest.builder()
                .email(email)
                .otp(otp)
                .otpGeneratedTime(Instant.now())
                .build();
        forgotPasswordCache.put(email, forgotPasswordRequest);

        return "Please check your email to set new passord  to your account";
    }

    public String verifyAccount(String email, String otp) {
        ForgotPasswordRequest forgotPasswordRequest = forgotPasswordCache.get(email);

        if (forgotPasswordRequest == null) {
            return "Request not found. Please resend OTP.";
        }
        ForgotPasswordRequest forgetPasswordRequest = null;
        if (forgetPasswordRequest.getOtp().equals(otp) && Duration.between(forgetPasswordRequest.getOtpGeneratedTime(),
                LocalDateTime.now()).getSeconds() < (1 * 60)) {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
            userRepository.save(user);
            forgotPasswordCache.remove(email);
            return "OTP verified you can login";
        }
        return "Please regenerate otp and try again";
    }

    public String regenerateOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
        ForgotPasswordRequest forgetPasswordRequest = null;
        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendOtpEmail(email, otp);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
        forgetPasswordRequest.setOtp(otp);
        forgetPasswordRequest.setOtpGeneratedTime(Instant.now());
        userRepository.save(user);
        return "Email sent... please verify account within 1 minute";
    }

}
