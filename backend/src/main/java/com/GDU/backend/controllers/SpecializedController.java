package com.GDU.backend.controllers;

import com.GDU.backend.dtos.responses.SpecializesWithCount;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.services.SpecializedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/specializes")
@RequiredArgsConstructor
public class SpecializedController {
    private final SpecializedService specializedService;

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
}
