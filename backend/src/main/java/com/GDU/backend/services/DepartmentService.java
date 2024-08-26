package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.DepartmentDTO;
import com.GDU.backend.models.Department;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DepartmentService {
    ResponseEntity<String> createDepartment(DepartmentDTO departmentDTO);

    List<Department> getDepartments();

    ResponseEntity<String> updateDepartmentById(Long id, DepartmentDTO departmentDTO);

    ResponseEntity<String> deleteDepartmentById(Long id);

    ResponseEntity<String> lockDepartmentById(Long id);
}
