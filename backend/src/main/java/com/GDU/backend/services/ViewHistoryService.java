package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.ViewHistoryDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;

import java.util.List;

public interface ViewHistoryService {
   int getCountViewHistoryByDocumentId(Long id); 

    void createViewHistory(ViewHistoryDTO viewHistoryDTO);

    List<DocumentResponseDTO> getUserViewHistory(String staffCode, Integer limit);
}
