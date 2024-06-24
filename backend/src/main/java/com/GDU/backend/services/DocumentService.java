package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.FilterRequestDTO;
import com.GDU.backend.dtos.requests.RecommendationRequestDTO;
import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.dtos.responses.TotalResponse;
import com.GDU.backend.dtos.responses.DocumentMonthly;
import com.GDU.backend.dtos.responses.TypeDocumentRes;
import com.GDU.backend.models.Document;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    String uploadDocument(UploadRequestDTO uploadRequestDto) throws IOException;

//    String updateDownloadCount(Long id);

//    String updateViewCount(Long id);

    String updateDocumentById(Long id, UploadRequestDTO uploadRequestDTO);

    DocumentResponseDTO getDocumentBySlug(String slug);

    String deleteDocument(Long id);

//    List<DocumentResponseDTO> getMostViewedDocuments(int limit);

    List<DocumentResponseDTO> getMostDownloadedDocuments(int limit);

    List<DocumentResponseDTO> getLatestDocuments(int limit);

    List<DocumentResponseDTO> getRecommendedDocuments(RecommendationRequestDTO recommendationRequestDTO);

    List<DocumentResponseDTO> filterDocuments(FilterRequestDTO filterRequestDTO);

    TotalResponse getDocumentsThisYear();

    TotalResponse getDocumentsThisMonth();

    int countAllDocuments();

    List<DocumentResponseDTO> getDocumentsByAuthor(Long id);

    int getDocumentsCountBySpecialized(Long id);

//    int getTotalViewsByAuthor(Long authorId);

    int getTotalDownloadsByAuthor(Long authorId);

    int getDocumentsCountByAuthor(Long authorId);
    
    int countDocumentsToday();

    int countPublishedDocuments();

    int countDraftDocuments();

    List<DocumentResponseDTO> getDraftDocument();

    List<DocumentResponseDTO> getPublishedDocument();

    String AcceptDocument(Long id) throws IOException;

    String AcceptListDocument(List<Long> ids) throws IOException;

    List<DocumentMonthly> countDocumentsMonthly();

    List<TypeDocumentRes> countDocumentsByType();

    List<DocumentResponseDTO> getTop3Documents();

    List<DocumentResponseDTO> getPaginationDocs(int page);

    Document getDocumentById(Long documentId);
}
