package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.ViewHistoryDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.services.ViewHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/view-history")
@RequiredArgsConstructor
public class ViewHistoryController {
    private final ViewHistoryService viewHistoryService;
    
    @PostMapping
    void createViewHistory(@RequestBody ViewHistoryDTO viewHistoryDTO) {
        viewHistoryService.createViewHistory(viewHistoryDTO);
    }
    
    @GetMapping("/{staffCode}/{limit}")
    List<DocumentResponseDTO> getUserViewHistory(@PathVariable("staffCode") String staffCode, @PathVariable("limit") Integer limit) {
        return viewHistoryService.getUserViewHistory(staffCode, limit);
    }
    
    @GetMapping("/top-documents/{limit}")
    List<DocumentResponseDTO> getTopDocuments(@PathVariable("limit") Integer limit) {
        return viewHistoryService.getTopDocuments(limit);
    }
}
