package com.GDU.backend.services.Impl;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.repositories.SpecializedRepository;
import com.GDU.backend.services.SpecializedService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecializedServiceImpl implements SpecializedService {
    private final SpecializedRepository specializedRepository;

    @Override
    public List<Specialized> getSpecializeds() {
        return specializedRepository.findAll();
    }

    @Override
    public List<Specialized> getSpecializedsByDepartment(Long departmentID) {
        return specializedRepository.findAllFromDepartment(departmentID);
    }

    @Override
    public List<Document> getDocumentsBySpecialized(String specializedId) {
        return specializedRepository.getLastestDocumentsBySpecializedSlug(specializedId);
    }

    @Override
    public int getDocumentsCountBySpecialized(String specializedSlug) {
        return specializedRepository.getLastestDocumentsBySpecializedSlug(specializedSlug).size();
    }

}
