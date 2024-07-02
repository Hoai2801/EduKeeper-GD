package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.ViewHistoryDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.User;
import com.GDU.backend.models.ViewHistory;
import com.GDU.backend.repositories.ViewHistoryRepository;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.UserService;
import com.GDU.backend.services.ViewHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ViewHistoryServiceImpl implements ViewHistoryService {
    private final ViewHistoryRepository viewHistoryRepository;
    private final UserService userService; 
    private final DocumentService documentService;

    @Override
    public int getCountViewHistoryByDocumentId(Long id) {
        List<ViewHistory> viewHistories = viewHistoryRepository.findByDocumentId(id); // <List<ViewHistory>>
        return viewHistories.size();
    }

    @Override
    public void createViewHistory(ViewHistoryDTO viewHistoryDTO) {
        User existingUser = userService.getUserByStaffCode(viewHistoryDTO.getStaffCode());
        Document existingDocument = documentService.getDocumentById(viewHistoryDTO.getDocumentId());
        ViewHistory existingViewHistory = viewHistoryRepository.findByUserAndDocumentLatest(existingUser.getId(), existingDocument.getId());
        if (existingViewHistory != null) {
            existingViewHistory.setIsLastest(false);
        }
        ViewHistory viewHistory = ViewHistory.builder()
                .user(existingUser)
                .document(existingDocument)
                .createdAt(LocalDate.now())
                .isLastest(true)
                .build();
        viewHistoryRepository.save(viewHistory);
    }

    @Override
    public List<DocumentResponseDTO> getUserViewHistory(String userId, Integer limit) {
        User existingUser = userService.getUserByStaffCode(userId);
        List<ViewHistory> viewHistories = viewHistoryRepository.findByUser(existingUser.getId(), limit);
        if (!viewHistories.isEmpty()) {
            return viewHistories.stream()
                    .map(ViewHistory::getDocument)
                    .map(DocumentResponseDTO::from)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    @Override
    public List<DocumentResponseDTO> getTopDocuments(Integer limit) {
        List<ViewHistory> viewHistories = viewHistoryRepository.findTopDocuments(limit);
        if (!viewHistories.isEmpty()) {
            return viewHistories.stream()
                    .map(ViewHistory::getDocument)
                    .map(DocumentResponseDTO::from)
                    .collect(Collectors.toList());
        }
        return List.of();
    }
}
