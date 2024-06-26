package com.GDU.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "sender")
    private User sender;
    
    @ManyToOne
    @JoinColumn(name = "receiver")
    private User receiver;
    
    private String title;
    
    private String content;
    
    private boolean is_check;
    
    @Column(name = "created_at")
    private LocalDateTime created_at;
}
