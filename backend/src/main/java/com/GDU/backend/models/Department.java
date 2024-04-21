package com.GDU.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_name", nullable = false, length = 200)
    private String departmentName;

    @Column(name = "department_slug", nullable = false, length = 200)
    private String departmentSlug;

    @OneToMany
    @JoinColumn(name = "department_id")
//    @JsonIgnore
    private List<Specialized> specializeds;
}
