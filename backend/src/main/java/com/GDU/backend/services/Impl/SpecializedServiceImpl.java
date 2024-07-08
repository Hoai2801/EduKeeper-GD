package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.SpecializedDTO;
import com.GDU.backend.dtos.responses.SpecializesWithCount;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.Department;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.repositories.DepartmentRepository;
import com.GDU.backend.repositories.SpecializedRepository;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.SpecializedService;
import jakarta.persistence.NonUniqueResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecializedServiceImpl implements SpecializedService {
    private final SpecializedRepository specializedRepository;
    private final DocumentService documentService;
    private final DepartmentRepository departmentRepository;

    @Override
    public List<Specialized> getSpecializes() {
        return specializedRepository.findAll();
    }

    @Override
    public Specialized getSpecializedById(Long s) {
        return specializedRepository.findById(s).orElse(null);
    }

    @Override
    public List<SpecializesWithCount> getSpecializedWithCount() {
        try {
            List<SpecializesWithCount> result = new ArrayList<>();
            List<Specialized> specializedList = specializedRepository.findAll();
            if (specializedList.isEmpty()) {
                System.out.println("specializedList is empty");
                return result;
            }
            specializedList.sort(Comparator.comparing(Specialized::getId));
            for (Specialized specialized : specializedList) {
                SpecializesWithCount specializesWithCount = new SpecializesWithCount();
                specializesWithCount.setSpecialized(specialized);
                int count = documentService.getDocumentsCountBySpecialized(specialized.getId());
                // specializesWithCount.setDocumentsCount(documentService.getDocumentsCountBySpecialized(specialized.getId()));
                specializesWithCount.setDocumentsCount(count);
                result.add(specializesWithCount);
            }
            return result;
        } catch (NonUniqueResultException e) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Specialized> getSpecializedByDepartmentId(Long id) {
        return specializedRepository.getSpecializedsByDepartmentId(id);
    }

    @Override
    public String updateSpecializedById(Long id, SpecializedDTO specializedDTO) {
        try {
            Specialized existSpecialized = specializedRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Specialized not found"));
            Department existDepartment = departmentRepository.findById(specializedDTO.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
            existSpecialized.setSpecializedName(specializedDTO.getSpecializedName());
            existSpecialized.setSpecializedSlug(createSlug(specializedDTO.getSpecializedName()));
            existSpecialized.setDepartment(existDepartment);
            specializedRepository.save(existSpecialized);
            return "Update specialized successfully";
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'updateSpecializedById'" + e.getMessage());
        }
    }

    @Override
    public String createSpecialized(SpecializedDTO specializedDTO) {
        try {
            String slug = createSlug(specializedDTO.getSpecializedName());
            Department existDepartment = departmentRepository.findById(specializedDTO.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
            Specialized newSpecialized = Specialized.builder().specializedName(specializedDTO.getSpecializedName())
                    .department(existDepartment).specializedSlug(slug)
                    .build();
            specializedRepository.save(newSpecialized);
            return "Create new specialized successfully";
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'updateSpecializedById'" + e.getMessage());
        }
    }

    private String createSlug(String title) {

        // Normalize and remove diacritics
        String normalizedTitle = Normalizer.normalize(title, Normalizer.Form.NFD);
        String slug = normalizedTitle.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");

        // Remove all non-alphanumeric characters except spaces
        slug = slug.replaceAll("[^a-zA-Z0-9\\s]", "");

        // Replace spaces with hyphens
        slug = slug.replaceAll("\\s+", "-");

        // Convert to lowercase
        return slug.toLowerCase();
    }
}