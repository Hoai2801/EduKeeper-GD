package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.models.Document;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    String uploadDocument(UploadDTO uploadDto) throws IOException;
    Document getDocumentById(Long id);

    Document getDocumentBySlug(String slug);

    String deleteDocument(Long id);
    
    String increaseViewCount(Long id);

    String increaseDownloadCount(Long id);
    
    List<Document> getMostViewedDocuments(int limit);

    List<Document> getMostDownloadedDocuments(int limit);

    List<Document> getLastedDocuments(int limit);
}
