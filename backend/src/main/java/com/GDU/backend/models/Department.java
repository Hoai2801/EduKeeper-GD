package com.GDU.backend.models;

import jakarta.persistence.*;
import lombok.*;

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
<<<<<<< HEAD
    
=======

>>>>>>> 8633cccc05c3023d8df067af56d618e06cc06e9a
    @Column(name = "department_slug", nullable = false, length = 200)
    private String departmentSlug;
}
