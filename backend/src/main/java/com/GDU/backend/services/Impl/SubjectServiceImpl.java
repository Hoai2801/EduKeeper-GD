package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.SubjectDTO;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.models.Subject;
import com.GDU.backend.models.SubjectSpecialized;
import com.GDU.backend.repositories.SubjectRepository;
import com.GDU.backend.repositories.SubjectSpecializedRepository;
import com.GDU.backend.services.SpecializedService;
import com.GDU.backend.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@RequiredArgsConstructor
@Service
public class SubjectServiceImpl implements SubjectService {
    private final SpecializedService specializedService;
    private final SubjectRepository subjectRepository;
    private final SubjectSpecializedRepository subjectSpecializedRepository;
    
    @Override
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @Override
    public void createSubject(SubjectDTO subject) {
        String name = subject.getName();
        Subject newSubject = new Subject();
        newSubject.setSubjectName(name);
        String normalized = Normalizer.normalize(subject.getName(), Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String slug = pattern.matcher(normalized)
                .replaceAll("")
                .toLowerCase()
                .replace(" ", "-");
        newSubject.setSubjectSlug(slug);
        Subject savedSubject = subjectRepository.save(newSubject);
        for (Integer s : subject.getSpecializedIds()) {
            
            Specialized specialized = specializedService.getSpecializedById((long) s);
            if (specialized == null) {
                continue;
            }
            SubjectSpecialized subjectSpecialized = SubjectSpecialized.builder()
                    .subject(savedSubject)
                    .specialized(specialized)
                    .build();
            List<SubjectSpecialized> exists = subjectSpecializedRepository.getSubjectSpecializedBySpecializedAndSubject(subjectSpecialized.getSubject().getId(), subjectSpecialized.getSpecialized().getSpecializedName());
            // have a same subject in database
            if (!exists.isEmpty()) {
                continue;
            }
            subjectSpecializedRepository.save(subjectSpecialized);
        }
    }

    @Override
    public List<Subject> getSubjectsBySpecializedId(String specializedId) {
        List<SubjectSpecialized> subjectSpecializeds = subjectSpecializedRepository.getSubjectsBySpecializedId(Long.parseLong(specializedId));
        List<Subject> subjects = new ArrayList<>();
        for (SubjectSpecialized subjectSpecialized : subjectSpecializeds) {
            subjects.add(subjectSpecialized.getSubject());
        }
        return subjects;
    }

    @Override
    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id).orElse(null);
    }

}
