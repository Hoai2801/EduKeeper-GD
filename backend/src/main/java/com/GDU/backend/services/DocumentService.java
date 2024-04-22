package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.FilterDTO;
import com.GDU.backend.dtos.requests.RecommendDTO;
import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.dtos.response.DocumentResponse;
import com.GDU.backend.dtos.response.TotalResponse;
import com.GDU.backend.models.Document;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    String uploadDocument(UploadDTO uploadDto) throws IOException;

    String updateDownloads(Long id);

    String updateViews(Long id);

    String updateDocumentById(Long id, UploadDTO uploadDTO);

    Document getDocumentById(Long id);

    DocumentResponse getDocumentBySlug(String slug);

    String deleteDocument(Long id);

    String increaseViewCount(Long id);

    String increaseDownloadCount(Long id);

    List<DocumentResponse> getMostViewedDocuments(int limit);

    List<DocumentResponse> getMostDownloadedDocuments(int limit);

    List<DocumentResponse> getLastedDocuments(int limit);

    List<DocumentResponse> getPopularDocumentsOfThisWeek();

    List<DocumentResponse> getPopularDocumentsOfThisMonth();

    List<DocumentResponse> getDocumentsByAuthorName(String authorName);

    List<DocumentResponse> getDocumentsSuggested(RecommendDTO recommendDTO);

    List<DocumentResponse> getDocumentsBySlugSpecialized(String slug);

    List<DocumentResponse> getDocumentsByFilter(FilterDTO filterDTO);

    TotalResponse getDocumentThisYear();

    TotalResponse getDocumentThisMonth();

    int countAllDocuments();
}
