package com.GDU.backend.services.Impl;

import com.GDU.backend.models.Department;
import com.GDU.backend.repositories.DepartmentRepository;
import com.GDU.backend.services.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    
    private final DepartmentRepository departmentRepository;
    
    @Override
    public List<Department> getDepartments() {
        return departmentRepository.findAllFromDepartment(1L);
    }
}
