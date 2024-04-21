package com.GDU.backend.services;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;

import java.util.List;

public interface SpecializedService {
    List<Specialized> getSpecializeds();

    List<Specialized> getSpecializedsByDepartment(Long departmentID);

    List<Document> getDocumentsBySpecialized(String specializedSlug);

    int getDocumentsCountBySpecialized(String specializedSlug);
}
