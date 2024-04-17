package com.GDU.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "subject")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "subject_name", nullable = false, length = 50)
    private String name;
    
    @Column(name = "subject_slug", nullable = false, length = 50)
    private String slug;
    
    @ManyToOne()
    @JoinColumn(name = "specialized_id")
    private Specialized specialized;
}
