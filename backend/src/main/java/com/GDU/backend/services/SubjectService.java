package com.GDU.backend.services;

import com.GDU.backend.dtos.SubjectDto;
import com.GDU.backend.models.Subject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SubjectService {
    Subject createSubject(SubjectDto subjectDto);

    void deleteSubject(long id);

    Subject getSubjectByName(String name);

    List<Subject> getAllSubjects();

    Subject updateSubject(SubjectDto subjectDto, String name);
}
