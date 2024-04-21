package com.GDU.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "specialized")
public class Specialized {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "specialized_name", nullable = false, length = 200)
    private String specializedName;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonIgnore
    private Department departmentID;

    @Column(name = "specialized_slug", nullable = false, length = 200)
    private String specializedSlug;
}
