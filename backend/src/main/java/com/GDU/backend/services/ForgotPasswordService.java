package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.ForgotPasswordRequest;
import com.GDU.backend.exceptions.MessagingException;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.UserRepository;
import com.GDU.backend.utils.EmailUtil;
import com.GDU.backend.utils.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {
    private final OtpUtil otpUtil;
    private final EmailUtil emailUtil;
    private final UserRepository userRepository;

    public String forgotPassword(String email) throws MessagingException {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email:" + email));
        try {
            emailUtil.sendSetPasswordEmail(email);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException("Unable to send set password email please try again");
        }
        return "Please check your email to set new passord  to your account";
    }

    public String verifyAccount(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
        ForgotPasswordRequest forgetPasswordRequest = null;
        if (forgetPasswordRequest.getOtp().equals(otp) && Duration.between(forgetPasswordRequest.getOtpGeneratedTime(),
                LocalDateTime.now()).getSeconds() < (1 * 60)) {
            userRepository.save(user);
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
        } catch (MessagingException | jakarta.mail.MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
        forgetPasswordRequest.setOtp(otp);
        forgetPasswordRequest.setOtpGeneratedTime(LocalDateTime.now());
        userRepository.save(user);
        return "Email sent... please verify account within 1 minute";
    }

}
