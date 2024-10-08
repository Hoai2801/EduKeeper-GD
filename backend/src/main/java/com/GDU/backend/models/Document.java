package com.GDU.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @Column(nullable = false, length = 50)
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
    private String file;

    @Column(name = "is_delete", nullable = false)
    private boolean isDelete;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_upload", nullable = false)
    private User userUpload;

    private String author;
    
    private String thumbnail;

    @OneToMany(mappedBy = "document")
    private List<Download> downloads;

    @OneToMany(mappedBy = "document")
    private List<ViewHistory> views;

    @OneToMany(mappedBy = "documentID")
    private List<Favorite> favorites;

    @Column(name = "deleted_at")
    private LocalDateTime deleteDate;

    private String scope;

    private String status;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialized_id")
    private Specialized specialized;

    // Methods to get the counts of views and downloads
    public int getViewsCount() {
        return views != null ? views.size() : 0;
    }

    public int getDownloadsCount() {
        return downloads != null ? downloads.size() : 0;
    }

    public int getFavoritesCount() {
        return favorites != null ? favorites.size() : 0;
    }
    
    public int getFavorites() {
        return favorites != null ? favorites.size() : 0;
    }

    @Override
    public String toString() {
        return "Document{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                ", documentType='" + documentType + '\'' +
                ", documentSize=" + documentSize +
                ", pages=" + pages +
                ", description='" + description + '\'' +
                ", uploadDate=" + uploadDate +
                ", file='" + file + '\'' +
                ", isDelete=" + isDelete +
                ", category=" + (category != null ? category.getId() : null) +
                ", userUpload=" + (userUpload != null ? userUpload.getId() : null) +
                ", author='" + author + '\'' +
                ", deleteDate=" + deleteDate +
                ", scope='" + scope + '\'' +
                ", status='" + status + '\'' +
                ", subject=" + (subject != null ? subject.getId() : null) +
                ", specialized=" + (specialized != null ? specialized.getId() : null) +
                '}';
    }
}