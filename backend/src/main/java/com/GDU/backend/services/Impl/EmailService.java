package com.GDU.backend.services.Impl;

import com.GDU.backend.services.Impl.enums.EmailTemplateName;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendEmail(
            String to,
            String username,
            EmailTemplateName emailTemplateName,
            String url
    ) throws MessagingException {
        String templateName;
        if (emailTemplateName == null) {
            templateName = "confirm-email";
        } else {
            templateName = emailTemplateName.getName();
        }
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                message,
                MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );
        LocalDate today = LocalDate.now();
        String formattedDate = today.format(DateTimeFormatter.ofPattern("dd-MM-yyyy (EEEE)"));
        Map<String, Object> properties = Map.of(
                "username", username,
                "url", url,
                "today", formattedDate
        );

        Context context = new Context();

        context.setVariables(properties);
        helper.setFrom("dreamhoaihack@gmail.com");
        helper.setTo(to);
        helper.setSubject(emailTemplateName.name());

        String template = templateEngine.process(templateName, context);
        helper.setText(template, true);
        javaMailSender.send(message);
    }
}

