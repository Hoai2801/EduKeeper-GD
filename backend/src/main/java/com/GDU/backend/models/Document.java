package com.GDU.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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
    
    private String thumbnail;

    private String path;

    @Column(name = "author_name", nullable = false, length = 100)
    private String author;

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

    private int pages;
}
