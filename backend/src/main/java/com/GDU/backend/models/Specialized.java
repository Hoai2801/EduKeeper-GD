package com.GDU.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "specialized")
public class Specialized {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "specialized_name", nullable = false, length = 50)
    private String specializedName;

    @Column(name = "specialized_slug", nullable = false, length = 100)
    private String specializedSlug;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
    
}
