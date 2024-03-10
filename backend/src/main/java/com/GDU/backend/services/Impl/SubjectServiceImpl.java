package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.SubjectDto;
import com.GDU.backend.models.Subject;
import com.GDU.backend.repositories.SubjectRepo;
import com.GDU.backend.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepo subjectRepo;
    @Override
    public Subject createSubject(SubjectDto subjectDto) {
        Subject newSubject = Subject
                .builder()
                .subject_name(subjectDto.getSubject_name())
                .build();
        return subjectRepo.save(newSubject);
    }

    @Override
    public void deleteSubject(long id) {
        subjectRepo.deleteById(id);
    }

    @Override
    public Subject getSubjectByName(String name) {
        return subjectRepo.findBySubject_name(name)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
    }

    @Override
    public List<Subject> getAllSubjects() {
        return subjectRepo.findAll();
    }

    @Override
    public Subject updateSubject(SubjectDto subjectDto, String name) {
        Subject existingSubject = getSubjectByName(name);
        existingSubject.setSubject_name(subjectDto.getSubject_name());
        subjectRepo.save(existingSubject);
        return existingSubject;
    }
}
