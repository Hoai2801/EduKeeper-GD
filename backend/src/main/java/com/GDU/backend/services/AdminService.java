package com.GDU.backend.services;

import com.GDU.backend.dtos.response.DocumentResponse;

public interface AdminService {
    DocumentResponse getDocumentThisYear();

    DocumentResponse getDocumentThisMonth();
}