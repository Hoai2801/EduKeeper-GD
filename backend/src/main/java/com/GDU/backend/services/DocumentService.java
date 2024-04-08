package com.GDU.backend.services;

import java.util.List;

import com.GDU.backend.dtos.requests.FilterDTO;
import com.GDU.backend.dtos.requests.RecommentDTO;
import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.models.Document;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    String uploadDocument(UploadDTO uploadDto) throws IOException;

    String updateDownloads(Long id);

    String updateViews(Long id);

    String updateDocumentById(Long id, UploadDTO uploadDTO);

    Document getDocumentById(Long id);

    Document getDocumentBySlug(String slug);

    String deleteDocument(Long id);
    
    String increaseViewCount(Long id);

    String increaseDownloadCount(Long id);
    
    List<Document> getMostViewedDocuments(int limit);

    List<Document> getMostDownloadedDocuments(int limit);

    List<Document> getLastedDocuments(int limit);
    List<Document> getPopularDocumentsOfThisWeek();

    List<Document> getPopularDocumentsOfThisMonth();

    List<Document> getDocumentsByAuthorName(String authorName);
    //
    // List<Document> getDocumentsByTeacherId(Long teacherId);

    List<Document> getDocumentsSuggested(RecommentDTO recommentDTO);

    List<Document> getDocumentsBySlugSpecialized(String slug);

    List<Document> getDocumentsByFilter(FilterDTO filterDTO);
}
