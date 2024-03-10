package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.UploadDto;
import com.GDU.backend.services.DocumentService;
import org.springframework.stereotype.Service;

@Service
public class DocumentServiceImpl implements DocumentService {
    @Override
    public String uploadDocument(UploadDto uploadDto) {
        // TODO: implement upload document
        // TODO: convert name of document to slug
        // TODO: calculate document size
        // TODO: get document type
        // TODO: get upload now
        // TODO: save document
        return "Success";
    }
}
