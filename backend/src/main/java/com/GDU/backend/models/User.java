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
@NamedNativeQuery(name = "User.getRakingUser", query = "SELECT u.id as id, u.user_name as userName, u.class as class, u.department as department, u.staff_code as staffCode, u.email as email, "
        +
        "COALESCE(dl.total_downloads, 0) AS totalDownloads, " +
        "COALESCE(v.total_views, 0) AS totalViews " +
        "FROM users u " +
        "JOIN role r ON u.role_id = r.id " +
        "LEFT JOIN ( " +
        "    SELECT user_id, COUNT(id) AS total_downloads " +
        "    FROM downloads " +
        "    GROUP BY user_id " +
        ") dl ON u.id = dl.user_id " +
        "LEFT JOIN ( " +
        "    SELECT user_id, COUNT(id) AS total_views " +
        "    FROM view_history " +
        "    GROUP BY user_id " +
        ") v ON u.id = v.user_id " +
        "WHERE r.name LIKE 'ROLE_USER' " +
        "GROUP BY u.id, u.user_name, u.class, u.department, u.staff_code, u.email " +
        "ORDER BY total_downloads DESC, total_views DESC " +
        "LIMIT 10", resultSetMapping = "UserRankingMapping")

@SqlResultSetMapping(name = "UserRankingMapping", classes = @ConstructorResult(targetClass = com.GDU.backend.dtos.responses.UserRakingResI.class, columns = {
        @ColumnResult(name = "totalDownloads", type = Integer.class),
        @ColumnResult(name = "totalViews", type = Integer.class),
        @ColumnResult(name = "id", type = Long.class),
        @ColumnResult(name = "staffCode", type = String.class),
        @ColumnResult(name = "userName", type = String.class),
        @ColumnResult(name = "email", type = String.class),
        @ColumnResult(name = "class", type = String.class),
        @ColumnResult(name = "department", type = String.class),
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
