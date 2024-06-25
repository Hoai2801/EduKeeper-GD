package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.DownloadDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Download;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.DownloadRepository;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.DownloadService;
import com.GDU.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DownloadServiceImpl implements DownloadService {
    private final UserService userService;
    private final DocumentService documentService; 
    private final DownloadRepository downloadRepository;
    
    @Override
    public String createDownload(DownloadDTO downloadDTO) {
        User user = userService.getUserByStaffCode(downloadDTO.getStaffCode());
        Document document = documentService.getDocumentById(downloadDTO.getDocumentId());
        Download existingDownload = downloadRepository.findByUserAndDocument(user, document);
        if (existingDownload == null) {
            Download download = new Download();
            download.setUser(user);
            download.setDocument(document);
            downloadRepository.save(download);
            return "download successfully";
        }
        return "user downloaded this document before";
    }

    @Override
    public List<DocumentResponseDTO> getTopDocuments(int limit) {
        List<Document> mostDownloadDocuments = documentService.findDocumentsWithMostDownloads(limit);
        return mostDownloadDocuments.stream().map(DocumentResponseDTO::from).collect(Collectors.toList());
    }
}
