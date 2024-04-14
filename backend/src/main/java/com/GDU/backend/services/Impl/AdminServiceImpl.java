package com.GDU.backend.services.Impl;

import org.springframework.stereotype.Service;

import com.GDU.backend.dtos.response.DocumentResponse;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.services.AdminService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final DocumentRepository documentRepository;

    @Override
    public DocumentResponse getDocumentThisYear() {
        try {
            Integer numberOfDocsThisYear = documentRepository.getNumberOfDocumentsThisYear();
            Integer numberOfDocsPreYear = documentRepository.getNumberOfDocumentPreviousYear();
            float percentage = ((float) ((numberOfDocsThisYear - numberOfDocsPreYear) * 100)) / numberOfDocsPreYear;
            float roundedPercentage = Math.round(percentage * 100.0f) / 100.0f;
            DocumentResponse res = DocumentResponse.builder()
                    .totalDocumentsCurrent(numberOfDocsThisYear)
                    .totalDocumentsPrev(numberOfDocsPreYear).percentage(roundedPercentage).build();
            return res;
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'getDocumentThisYear'" + e.getMessage());
        }
    }

    @Override
    public DocumentResponse getDocumentThisMonth() {
        try {
            Integer numberOfDocsThisMonth = documentRepository.getNumberOfDocumentsThisMonth();
            Integer numberOfDocsPreMonth = documentRepository.getNumberOfDocumentPreviousMonth();
            float percentage = ((float) ((numberOfDocsThisMonth - numberOfDocsPreMonth) * 100)) / numberOfDocsPreMonth;
            float roundedPercentage = Math.round(percentage * 100.0f) / 100.0f;
            DocumentResponse res = DocumentResponse.builder()
                    .totalDocumentsCurrent(numberOfDocsThisMonth)
                    .totalDocumentsPrev(numberOfDocsPreMonth).percentage(roundedPercentage).build();
            return res;
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'getDocumentThisMonth'");
        }
    }

}