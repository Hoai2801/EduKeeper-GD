package com.GDU.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@NamedNativeQuery(name = "User.getRakingUser", query = "SELECT COUNT(dl.user_id) AS total, u.id AS id, " +
        "u.user_name AS username, u.staff_code AS staffCode, u.email AS email " +
        "FROM downloads dl " +
        "JOIN users u ON u.id = dl.user_id " +
        "WHERE u.staff_code LIKE 'user' " +
        "GROUP BY dl.user_id " +
        "ORDER BY total DESC LIMIT 10", resultSetMapping = "UserRankingMapping")
@SqlResultSetMapping(name = "UserRankingMapping", classes = @ConstructorResult(targetClass = com.GDU.backend.dtos.responses.UserRakingResI.class, columns = {
        @ColumnResult(name = "total", type = Integer.class),
        @ColumnResult(name = "id", type = Long.class),
        @ColumnResult(name = "staffCode", type = String.class),
        @ColumnResult(name = "username", type = String.class),
        @ColumnResult(name = "email", type = String.class)
}))
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails, Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, name = "staff_code")
    private String staffCode;

    @Column(name = "user_name")
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role roles;

    @Column(name = "account_locked")
    private boolean accountLocked;
    
    @ManyToOne
    @JoinColumn(name = "department")
    private Department department;
    
    @ManyToOne
    @JoinColumn(name = "specialized")
    private Specialized specialized;
    
    @Column(name = "class")
    private String klass;
    
    @Column(name = "date_of_birth")
    private LocalDateTime birthDay;

    private boolean enable;
    
    private String avatar;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @Override
    public String getName() {
        return username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(roles.getName()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return staffCode;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enable;
    }
}
