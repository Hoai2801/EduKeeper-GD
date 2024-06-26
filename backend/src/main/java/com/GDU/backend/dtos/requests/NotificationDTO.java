package com.GDU.backend.dtos.requests;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationDTO {
    private String sender;
    private String title;
    private String content;
    private String receiver;
    @Column(name = "is_check")
    private boolean is_check; 
    private LocalDateTime created_at;
}
