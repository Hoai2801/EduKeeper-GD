package com.GDU.backend.repositories;

import com.GDU.backend.dtos.responses.UserRakingRes;
import com.GDU.backend.dtos.responses.UserRakingResI;
import com.GDU.backend.models.Token;
import com.GDU.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByStaffCode(String staffCode);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByStaffCode(String staffCode);

    @Query(name = "User.getRakingUser", nativeQuery = true)
    List<UserRakingResI> getRakingUser();
}
