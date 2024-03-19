package com.GDU.backend.services.Impl;

import com.GDU.backend.models.Subject;
import com.GDU.backend.repositories.SubjectRepository;
import com.GDU.backend.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Deprecated
public class SubjectServiceImpl implements SubjectService {
    
    private final SubjectRepository subjectRepository;
    
    @Override
    public String createSubject(String subjectName) {
        Subject newSubject = Subject.builder()
                .subject_name(subjectName)
                .build();
        subjectRepository.save(newSubject);
        return "Subject created successfully";
    }
}
