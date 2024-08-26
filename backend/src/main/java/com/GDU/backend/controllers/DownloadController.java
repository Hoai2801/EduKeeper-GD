package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.DownloadDTO;
import com.GDU.backend.services.DownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/downloads")
@RequiredArgsConstructor
public class DownloadController {
    private final DownloadService downloadService;

    @PostMapping
    public ResponseEntity<?> createDownload(@RequestBody DownloadDTO downloadDTO) {
        return ResponseEntity.ok().body(downloadService.createDownload(downloadDTO));
    }

    @GetMapping("/top-documents/{department}")
    public ResponseEntity<?> getTopDocuments(@PathVariable("department") int departmentId) {
        return ResponseEntity.ok().body(downloadService.getTopDocuments(departmentId));
    }
}
