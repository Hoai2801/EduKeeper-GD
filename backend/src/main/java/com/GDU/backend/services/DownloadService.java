package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.DownloadDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;

import java.util.List;

public interface DownloadService {
    String createDownload(DownloadDTO downloadDTO);

    List<DocumentResponseDTO> getTopDocuments(int departmentId);
}
