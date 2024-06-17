package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.SubjectDTO;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.models.Subject;
import com.GDU.backend.repositories.SubjectRepository;
import com.GDU.backend.services.SpecializedService;
import com.GDU.backend.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

@RequiredArgsConstructor
@Service
public class SubjectServiceImpl implements SubjectService {
    private final SpecializedService specializedService;
    private final SubjectRepository subjectRepository;
    
    @Override
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @Override
    public void createSubject(SubjectDTO subject) {
        String name = subject.getName();
        for (Integer s : subject.getSpecializedIds()) {
            System.out.println(s);
            Specialized specialized = specializedService.getSpecializedById((long) s);
            if (specialized == null) {
                continue;
            }
            Subject newSubject = new Subject();
            newSubject.setName(name);
            newSubject.setSpecialized(specialized);
            String normalized = Normalizer.normalize(subject.getName(), Normalizer.Form.NFD);
            Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
            String slug = pattern.matcher(normalized)
                    .replaceAll("")
                    .toLowerCase()
                    .replace(" ", "-");
            newSubject.setSlug(slug);
            subjectRepository.save(newSubject);
        }
    }

    @Override
    public List<Subject> getSubjectsBySpecialized(Long s) {
        return subjectRepository.findAllBySpecializedId(s);
    }
}
