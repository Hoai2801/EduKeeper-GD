package com.GDU.backend.repositories;

import com.GDU.backend.models.Department;
import com.GDU.backend.models.Specialized;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    @Query("SELECT d FROM Department d WHERE d.departmentName = :departmentName")
    Department getDepartmentByName(@Param("departmentName") String departmentName);

    @Query("SELECT s FROM Specialized s WHERE s.department.id = :id")
    List<Specialized> getSpecializedByDepartmentId(@Param("id") Long id);
}
