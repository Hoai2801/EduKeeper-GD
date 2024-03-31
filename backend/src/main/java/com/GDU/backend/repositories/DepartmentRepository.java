package com.GDU.backend.repositories;

import com.GDU.backend.models.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // find all department from id to the end
    @Query("SELECT d FROM Department d WHERE d.id > :id")
    List<Department> findAllFromDepartment(Long id);

    Department findByDepartmentName(String name);
}
