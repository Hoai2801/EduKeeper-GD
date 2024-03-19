package com.GDU.backend.controllers;

import com.GDU.backend.models.Department;
import com.GDU.backend.services.Impl.DepartmentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/department")
@RequiredArgsConstructor
public class DepartmentController {
    
    private final DepartmentServiceImpl departmentService;
    
    @GetMapping
    public List<Department> getDepartments() {
        return departmentService.getDepartments();
    }
}
