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
    public List<SpecializesWithCount> getSpecializedWithCount() {
        List<Specialized> specializes = getSpecializes();
        List<SpecializesWithCount> specializedWithCounts = new ArrayList<>();

        for (Specialized specialized : specializes) {
            try {
                int documentsCount = documentService.countAllDocumentsBySpecialized(specialized.getId());
                specializedWithCounts.add(SpecializesWithCount.builder()
                        .specialized(specialized)
                        .documentsCount(documentsCount)
                        .build());
            } catch (NonUniqueResultException e) {
                // Handle the situation where multiple documents are associated with the same specialized entity
                // Log the error or handle it in another way, such as skipping this specialized entity
                // You can also modify the logic to aggregate the count from multiple documents
                // For example, summing up the counts from all associated documents
                System.err.println("Error: Multiple documents associated with specialized ID " + specialized.getId());
                // Alternatively, you can skip this specialized entity
                // continue;
            } catch (Exception e) {
                // Handle other exceptions
                e.printStackTrace();
            }
        }

        return specializedWithCounts;
    }
}
