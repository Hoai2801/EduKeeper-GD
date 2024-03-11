package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.models.Document;
import com.GDU.backend.services.Impl.DocumentServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("api/v1/document")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentServiceImpl DocumentService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Document> getDocumentById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(DocumentService.getDocumentById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @PostMapping("")
    @Validated
    @Async
    public CompletableFuture<ResponseEntity<String>> uploadDocument(
            @Valid @ModelAttribute UploadDTO uploadDto
    ) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return ResponseEntity.ok(DocumentService.uploadDocument(uploadDto));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading document: " + e.getMessage());
            }
        });
    }
}
