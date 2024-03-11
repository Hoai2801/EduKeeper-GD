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

//    private String description;
    
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacherID;
    
    @ManyToOne
    @JoinColumn(name = "department")
    private Department department;
    
    @ManyToOne
    @JoinColumn(name = "subject")
    private Subject subject;
    
    @ManyToOne
    @JoinColumn(name = "category")
    private Category category;
    
    private int views;
    
    private int download;
    
    private int helpfull;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userID;
}
