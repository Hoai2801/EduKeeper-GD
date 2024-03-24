package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.DepartmentDTO;
import com.GDU.backend.models.Department;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.Impl.DepartmentServiceImpl;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/department")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentServiceImpl departmentService;

    @PostMapping("")
    public ResponseEntity<?> createDepartment(@RequestBody DepartmentDTO departmentDTO) {
        try {
            return ResponseEntity.ok(departmentService.createDepartment(departmentDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getDepartments() {
        try {
            return ResponseEntity.ok(departmentService.getDepartments());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDepartmentById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(departmentService.getDepartmentById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getDepartmentByName(@PathVariable("name") String name) {
        try {
            return ResponseEntity.ok(departmentService.getDepartmentByName(name));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateDepartmentById(@PathVariable("id") Long id,
            @RequestBody DepartmentDTO departmentDTO) {
        try {
            return ResponseEntity.ok(departmentService.updateDepartmentById(id, departmentDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteDepartmentById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(departmentService.deleteDepartmentById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
