package com.GDU.backend.repositories;

import com.GDU.backend.dtos.responses.Monthly;
import com.GDU.backend.dtos.responses.TypeRes;
import com.GDU.backend.dtos.responses.UserRakingRes;
import com.GDU.backend.dtos.responses.UserRakingResI;
import com.GDU.backend.models.Token;
import com.GDU.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query(value = "SELECT COALESCE(SUM(u.total), 0) AS total, m.month " +
            "FROM ( " +
            "   SELECT 1 AS month UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 " +
            "   UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 " +
            "   UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 " +
            "   UNION ALL SELECT 11 UNION ALL SELECT 12 " +
            ") AS m " +
            "LEFT JOIN ( " +
            "   SELECT COUNT(id) AS total, MONTH(created_date) AS month " +
            "   FROM users WHERE YEAR(created_date) = :year" +
            "   GROUP BY MONTH(created_date) " +
            ") AS u ON m.month = u.month " +
            "GROUP BY m.month " +
            "ORDER BY m.month ASC", nativeQuery = true)
    List<Monthly> countUsersMonthly(@Param("year") int year);

    @Query(value = "SELECT COUNT(u.id) as total, r.name as type FROM users u JOIN role r on u.role_id = r.id WHERE YEAR(u.created_date) = :year GROUP BY r.name", nativeQuery = true)
    List<TypeRes> countUsersByRole(@Param("year") int year);
}
