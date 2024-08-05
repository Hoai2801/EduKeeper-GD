package com.GDU.backend.dtos.requests;

import com.GDU.backend.models.Document;
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
    private String document;
    @Column(name = "is_check")
    private boolean is_check; 
    private LocalDateTime created_at;
}
