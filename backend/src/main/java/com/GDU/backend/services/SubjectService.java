package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.SubjectDTO;
import com.GDU.backend.models.Subject;

import java.util.List;

public interface SubjectService {
    
    List<Subject> getAllSubjects();
    void createSubject(SubjectDTO subject);

    List<Subject> getSubjectsBySpecializedId(String specializedId);

    Subject getSubjectById(Long id);

    void deleteSubject(Long id);
}
