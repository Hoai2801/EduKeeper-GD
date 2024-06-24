package com.GDU.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

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
    private String documentType;

    @Column(nullable = false)
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

    @OneToMany(mappedBy = "document")
    private List<Download> downloads;

    @OneToMany(mappedBy = "document", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ViewHistory> views;
    
    private String scope;
    
    private String status; 

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    // Methods to get the counts of views and downloads
    public int getViewsCount() {
        return views != null ? views.size() : 0;
    }

    public int getDownloadsCount() {
        return downloads != null ? downloads.size() : 0;
    }
}
