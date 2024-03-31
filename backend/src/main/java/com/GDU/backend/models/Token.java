// package com.GDU.backend.models;

// import jakarta.persistence.*;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
// @Entity
// @Table(name = "token")
// public class Token {
// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// public Long id;

// @Column(unique = true)
// public String token;

// @Column(name = "token_type")
// @Enumerated(EnumType.STRING)
// private TokenType tokenType = TokenType.BEARER;

// public boolean revoked;

// public boolean expired;

// @ManyToOne(fetch = FetchType.LAZY)
// @JoinColumn(name = "user_id")
// public User user;
// }
