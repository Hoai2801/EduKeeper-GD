package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.CategoryDto;
import com.GDU.backend.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/categories")
public class CategoryController {
    
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<?> insertCategory(
            @Valid @RequestBody CategoryDto categoryDto
    ) {
        try {
            return ResponseEntity.ok(categoryService.insertCategory(categoryDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok().body(categoryService.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryDto categoryDto
    ) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.deleteCategory(id));
    }
}
