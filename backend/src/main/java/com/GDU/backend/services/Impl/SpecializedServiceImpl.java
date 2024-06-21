package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.responses.SpecializesWithCount;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.repositories.SpecializedRepository;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.SpecializedService;
import jakarta.persistence.NonUniqueResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecializedServiceImpl implements SpecializedService {
    private final SpecializedRepository specializedRepository;
    private final DocumentService documentService;

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
}
