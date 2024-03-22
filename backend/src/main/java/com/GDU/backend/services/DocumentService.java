package com.GDU.backend.services;

import java.util.List;

import com.GDU.backend.dtos.requests.FilterDTO;
import com.GDU.backend.dtos.requests.RecommentDTO;
import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.models.Document;

public interface DocumentService {
    String uploadDocument(UploadDTO uploadDto);

    String updateDownloads(Long id);

    String updateViews(Long id);

    String updateDocumentById(Long id, UploadDTO uploadDTO);

    Document getDocumentById(Long id);

    Document getDocumentBySlug(String slug);

    List<Document> getPopularDocumentsOfThisWeek();

    List<Document> getPopularDocumentsOfThisMonth();

    List<Document> getDocumentsByAuthorName(String authorName);
    //
    // List<Document> getDocumentsByTeacherId(Long teacherId);

    List<Document> getDocumentsSuggested(RecommentDTO recommentDTO);

    List<Document> getDocumentsBySlugSpecialized(String slug);

    List<Document> getDocumentsByFilter(FilterDTO filterDTO);
}
