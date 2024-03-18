package com.GDU.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "document")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    private String slug;

    private String document_type;

    private Long document_size;

    private LocalDate upload_date;

    private String path;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userID;
    
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacherID;
    
    @ManyToOne
    @JoinColumn(name = "specialized_id")
    private Specialized specialized;
    
    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    private int views;
    
    private int download;
    
}
