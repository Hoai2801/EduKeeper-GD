package com.GDU.backend.controllers;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.services.Impl.SpecializedServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/specialized")
@RequiredArgsConstructor
public class SpecializedController {
    private final SpecializedServiceImpl specializedService;

    @GetMapping
    public List<Specialized> getSpecializes() {
        return specializedService.getSpecializeds();
    }

    @GetMapping("/department/{id}")
    public List<Specialized> getSpecializesByDepartmentId(@PathVariable Long id) {
        return specializedService.getSpecializedsByDepartment(id);
    }

//    @GetMapping("/department/{slug}")
//    public List<Specialized> getSpecializesByDepartmentSlug(@PathVariable String slug) {
//        return specializedService.getSpecializedsByDepartmentSlug(slug);
//    }

    @GetMapping("/documents/{slug}")
    public List<Document> getDocumentsBySpecializedSlug(@PathVariable("slug") String slug) {
        return specializedService.getDocumentsBySpecialized(slug);
    }

    @GetMapping("/documents/count/{slug}")
    public int getDocumentsCountBySpecialized(@PathVariable("slug") String slug) {
        return specializedService.getDocumentsCountBySpecialized(slug);
    }

//    @GetMapping("/{slug}")
//    public Specialized getSpecializedBySlug(@PathVariable("slug") String slug) {
//        return specializedService.getSpecializedBySlug(slug);
//    }
}
