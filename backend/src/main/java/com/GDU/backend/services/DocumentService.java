package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.UploadDto;

public interface DocumentService {
    String uploadDocument(UploadDto uploadDto);
}
