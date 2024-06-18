package com.GDU.backend.repositories;

import com.GDU.backend.models.Subject;
import com.GDU.backend.models.SubjectDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubjectDocumentRepository extends JpaRepository<SubjectDocument, Long> {

}
