package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.models.Document;

public interface DocumentService {
    String uploadDocument(UploadDTO uploadDto);
    Document getDocumentById(Long id);
    
}
