package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.SubjectDTO;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.models.Subject;
import com.GDU.backend.models.SubjectSpecialized;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.repositories.SubjectRepository;
import com.GDU.backend.repositories.SubjectSpecializedRepository;
import com.GDU.backend.services.SpecializedService;
import com.GDU.backend.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
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
    private final DocumentRepository documentRepository;
    
    @Override
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @Override
    public ResponseEntity<String> createSubject(SubjectDTO subject) {
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
            SubjectSpecialized exists = 
                    subjectSpecializedRepository.getSubjectSpecializedBySpecializedAndSubject(
                                                subjectSpecialized.getSubject().getId(), 
                                                subjectSpecialized.getSpecialized().getId()
                    );
            // have a same subject in database
            if (exists != null) {
                continue;
            }
            subjectSpecializedRepository.save(subjectSpecialized);
        }
        return ResponseEntity.ok("Thêm môn học thành công");
    }

    @Override
    public List<Subject> getSubjectsBySpecializedId(String specializedId) {
        List<SubjectSpecialized> subjectSpecializeds = subjectSpecializedRepository.getSubjectsBySpecializedId(Long.parseLong(specializedId));
        List<SubjectSpecialized> subjectsOfAllSpecialized = subjectSpecializedRepository.getSubjectsBySpecializedId(40L);
        List<Subject> subjects = new ArrayList<>();
        for (SubjectSpecialized subjectSpecialized : subjectSpecializeds) {
            subjects.add(subjectSpecialized.getSubject());
        }
        for (SubjectSpecialized subjectSpecialized : subjectsOfAllSpecialized) {
            if (!subjects.contains(subjectSpecialized.getSubject())) {
                subjects.add(subjectSpecialized.getSubject());
            }
        }
        return subjects;
    }

    @Override
    public ResponseEntity<String> deleteSubject(Long id_specialized, Long id_subject) {
        SubjectSpecialized subjectSpecialized = 
                subjectSpecializedRepository.getSubjectSpecializedBySpecializedAndSubject(id_specialized, id_subject);
        if (subjectSpecialized == null) {
            return ResponseEntity.badRequest().body("Môn học không tìm thấy");
        }
        // check if subject is used in subject_specialized
        if (subjectSpecializedRepository.getSubjectSpecializedBySubjectId(id_subject) == null) {
            List<Document> documents = documentRepository.getDocumentsBySubjectId(id_subject);
            // if subject of specialized is deleted, 
            // so we don't need the document of this subject anymore
            documentRepository.deleteAll(documents);
        }
        subjectRepository.deleteById(id_subject);
        subjectSpecializedRepository.delete(subjectSpecialized);
        return ResponseEntity.ok("Xóa môn học thành công");
    }

}
