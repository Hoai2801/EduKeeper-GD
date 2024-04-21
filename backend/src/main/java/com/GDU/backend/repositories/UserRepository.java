package com.GDU.backend.repositories;

import com.GDU.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String userName);

    Optional<User> findByStaffCode(String staffCode);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByStaffCode(String staffCode);
}
