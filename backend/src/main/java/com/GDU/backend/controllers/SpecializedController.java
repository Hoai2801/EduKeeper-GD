package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.SpecializedDTO;
import com.GDU.backend.dtos.responses.SpecializesWithCount;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.services.SpecializedService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/specializes")
@RequiredArgsConstructor
public class SpecializedController {
    private final SpecializedService specializedService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSpecialize(@PathVariable("id") Long id,
                                              @RequestBody SpecializedDTO specializedDTO
    ) {
        try {
            return ResponseEntity.ok(specializedService.updateSpecializedById(id, specializedDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createSpecialize(
            @RequestBody SpecializedDTO specializedDTO) {
        try {
            return ResponseEntity.ok(specializedService.createSpecialized(specializedDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping
    public List<Specialized> getSpecializes() {
        return specializedService.getSpecializes();
    }

    @GetMapping("/count")
    public List<SpecializesWithCount> getDocumentsCountBySpecialized() {
        return specializedService.getSpecializedWithCount();
    }

    @GetMapping("/department/{id}")
    public List<Specialized> getSpecializedByDepartmentId(@PathVariable("id") Long id) {
        return specializedService.getSpecializedByDepartmentId(id);
    }
    
    @PutMapping("/lock/{id}")
    public ResponseEntity<String> lockSpecializedById(@PathVariable("id") Long id) {
        try {
            return specializedService.lockSpecializedById(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSpecializedById(@PathVariable("id") Long id) {
        try {
            return specializedService.deleteSpecializedById(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}