package com.GDU.backend.controllers;

import com.GDU.backend.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/subjects")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    @PostMapping("")
    public ResponseEntity<?> insertSubject() {
        return null;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllSubject() {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubject() {
        return null;
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteSubject() {
        return null;
    }
}
