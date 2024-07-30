package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.FilterRequestDTO;
import com.GDU.backend.dtos.requests.RecommendationRequestDTO;
import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.dtos.responses.*;
import com.GDU.backend.models.Document;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    ResponseEntity<String> uploadDocument(UploadRequestDTO uploadRequestDto) throws IOException;

    String updateDocumentById(Long id, UploadRequestDTO uploadRequestDTO);

    DocumentResponseDTO getDocumentBySlug(String slug);

    List<DocumentResponseDTO> getMostDownloadedDocuments(int limit);

    List<DocumentResponseDTO> getLatestDocuments(int limit);

    List<DocumentResponseDTO> getRecommendedDocuments(RecommendationRequestDTO recommendationRequestDTO);

    List<DocumentResponseDTO> filterDocuments(FilterRequestDTO filterRequestDTO);

    TotalResponse getDocumentsThisYear();

    TotalResponse getDocumentsThisMonth();

    int countAllDocuments();

    List<DocumentResponseDTO> getDocumentsByAuthor(Long id);

    int getDocumentsCountBySpecialized(Long id);

    int getTotalDownloadsByAuthor(Long authorId);

    int getDocumentsCountByAuthor(String authorId);
    
    int countDocumentsToday();

    int countPublishedDocuments();

    int countDraftDocuments();

    List<DocumentResponseDTO> getDraftDocument();

    List<DocumentResponseDTO> getPublishedDocument();

    String AcceptDocument(Long id) throws IOException;

    String AcceptListDocument(List<Long> ids) throws IOException;

    List<Monthly> countDocumentsMonthly(int year);


    List<TypeRes> countDocumentsByType(int year);

    List<DocumentResponseDTO> getTop3Documents();

    List<DocumentResponseDTO> getPaginationDocs(int page);

    Document getDocumentById(Long documentId);

    List<Document> findDocumentsWithMostDownloads(int limit);


    List<DocumentResponseDTO> getDeletedDocument();
    
    boolean deleteDocumentById(Long id);

    String recoveryDocument(List<Long> ids) throws IOException;

    int getTotalViewsByAuthor(String staffCode);
}
