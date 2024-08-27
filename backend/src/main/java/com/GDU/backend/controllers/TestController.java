package com.GDU.backend.controllers;

import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.repositories.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class TestController {
    private final DocumentRepository documentRepository;
    
    @GetMapping("/document")
    public ResponseEntity<?> testDocument() {
        return ResponseEntity.ok(documentRepository.findAll());
    }
}
