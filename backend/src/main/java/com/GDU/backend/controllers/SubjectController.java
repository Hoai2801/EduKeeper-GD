package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.SubjectDTO;
import com.GDU.backend.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("api/v1/subjects")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    @GetMapping
    ResponseEntity<?> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @GetMapping("/specialized/{specializedId}")
    ResponseEntity<?> getSubjectsBySpecializedId(@PathVariable("specializedId") String specializedId) {
        return ResponseEntity.ok(subjectService.getSubjectsBySpecializedId(specializedId));
    }

    @PostMapping
    ResponseEntity<?> createSubject(@RequestBody SubjectDTO subject) {
        return subjectService.createSubject(subject);
    }
    
    @DeleteMapping("/specialized/{id_specialized}/{id_subject}")
    ResponseEntity<String> removeSubjects(@PathVariable("id_specialized") Long id_specialized, @PathVariable("id_subject") Long id) {
        return subjectService.deleteSubject(id_specialized, id);
    }
}