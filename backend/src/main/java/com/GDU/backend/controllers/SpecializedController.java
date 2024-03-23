package com.GDU.backend.controllers;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.services.Impl.SpecializedServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/specialized")
@RequiredArgsConstructor
public class SpecializedController {
    private final SpecializedServiceImpl specializedService;
    
    @GetMapping
    public List<Specialized> getSpecializeds() {
        return specializedService.getSpecializeds();
    }
    
    @GetMapping("/department/{id}")
    public List<Specialized> getSpecializedsByDepartment(@PathVariable Long id) {
        return specializedService.getSpecializedsByDepartment(id);
    }
    
    @GetMapping("/documents/{id}")
    public List<Document> getDocumentsBySpecialized(@PathVariable("id") Long id) {
        return specializedService.getDocumentsBySpecialized(id);
    }
    
    @GetMapping("/documents/count/{id}")
    public int getDocumentsCountBySpecialized(@PathVariable("id") Long specializedId) {
        return specializedService.getDocumentsCountBySpecialized(specializedId);
    }
    
}
