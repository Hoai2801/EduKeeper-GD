package com.GDU.backend.controllers;

import com.GDU.backend.exceptions.ResourceNotFoundException;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {
    
    @GetMapping("/{id}")
    public ResponseEntity<?> test(@PathVariable Long id) {
        if (id > 5) {
            return ResponseEntity.ok("OK");
        }
        return ResponseEntity.badRequest().body("id < 5");
    }
    
    @GetMapping("/true/{id}")
    public String testTrue(@PathVariable Long id) {
        if (id > 5) {
            throw new ResourceNotFoundException("id > 5");
        }
        return "true";
    }
}
