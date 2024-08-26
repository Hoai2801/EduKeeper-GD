package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.SubjectDTO;
import com.GDU.backend.models.Subject;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SubjectService {
    
    List<Subject> getAllSubjects();
    ResponseEntity<String> createSubject(SubjectDTO subject);

    List<Subject> getSubjectsBySpecializedId(String specializedId);
    
    ResponseEntity<String> deleteSubject(Long id_specialized, Long id);
}
