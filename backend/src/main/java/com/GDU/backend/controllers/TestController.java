package com.GDU.backend.controllers;

import com.GDU.backend.exceptions.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
