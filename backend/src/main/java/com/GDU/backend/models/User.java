package com.GDU.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
    
    private String password;
    
    private Role role;
    
}
