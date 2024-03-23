package com.GDU.backend.services;

import com.GDU.backend.models.Department;

import java.util.List;

public interface DepartmentService {

    List<Department> getDepartments();

    Department getDepartmentById(Long id);

    Department getDepartmentByName(String name);
}
