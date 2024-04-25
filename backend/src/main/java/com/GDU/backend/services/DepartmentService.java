package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.DepartmentDTO;
import com.GDU.backend.models.Department;

import java.util.List;

public interface DepartmentService {
    String createDepartment(DepartmentDTO departmentDTO);

    List<Department> getDepartments();

    Department getDepartmentById(Long id);
    
    String updateDepartmentById(Long id, DepartmentDTO departmentDTO);

    String deleteDepartmentById(Long id);
}
