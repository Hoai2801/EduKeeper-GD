package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.DepartmentDTO;
import com.GDU.backend.services.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v1/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<String> createDepartment(@RequestBody DepartmentDTO departmentDTO) {
        try {
            return departmentService.createDepartment(departmentDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getDepartments() {
        try {
            return ResponseEntity.ok(departmentService.getDepartments());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateDepartmentById(@PathVariable("id") Long id,
                                                       @RequestBody DepartmentDTO departmentDTO
    ) {
        try {
            return departmentService.updateDepartmentById(id, departmentDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    @PutMapping("/lock/{id}")
    public ResponseEntity<?> lockDepartmentById(@PathVariable("id") Long id) {
        try {
            return departmentService.lockDepartmentById(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartmentById(@PathVariable("id") Long id) {
        try {
            return departmentService.deleteDepartmentById(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
