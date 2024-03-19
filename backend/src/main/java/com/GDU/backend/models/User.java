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
    @Column(name = "user_name")
    private String username;
    @Column(name = "user_id")
    private String userId;
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

}
