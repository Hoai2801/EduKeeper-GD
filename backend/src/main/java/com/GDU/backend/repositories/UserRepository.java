package com.GDU.backend.repositories;

import com.GDU.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String userName);

    boolean existsByEmail(String email);
    Optional<User> findByUsername(String userName);

    Optional<User> findByEmail(String email);

}
