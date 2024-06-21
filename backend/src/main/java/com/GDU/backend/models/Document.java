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

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 300)
    private String slug;

    @Column(nullable = false, length = 30)
    private String status;
    @Column(name = "document_type", nullable = false, length = 30)
    private String documentType;

    @Column(name = "document_size", nullable = false)
    private Long documentSize;

    @Column(nullable = false)
    private Integer pages;

    @Column
    private String description;

    @Column(nullable = false)
    private LocalDate uploadDate;

    @Column(nullable = false, length = 500)
    private String path;

    @Column(nullable = false, length = 500)
    private String thumbnail;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_upload", nullable = false)
    private User userUpload;

    private String author;

    @Column(nullable = false)
    private int download;

    @Column(nullable = false)
    private int views;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;
}
