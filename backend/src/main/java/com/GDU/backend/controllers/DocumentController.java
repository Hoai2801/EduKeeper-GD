package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.FilterRequestDTO;
import com.GDU.backend.dtos.requests.RecommendationRequestDTO;
import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.dtos.response.DocumentResponseDTO;
import com.GDU.backend.models.Document;
import com.GDU.backend.services.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping("/{slug}/file")
    public ResponseEntity<Resource> downloadFileBySlug(@PathVariable("slug") String slug) {
        try {
            DocumentResponseDTO document = documentService.getDocumentBySlug(slug);
            File file = new File(document.getPath());
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(document.getDocument_type()))
                    .body(new FileSystemResource(file));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getDocumentBySlug(@PathVariable("slug") String slug) {
        try {
            return ResponseEntity.ok(documentService.getDocumentBySlug(slug));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Document not found");
        }
    }

    @GetMapping("/most-viewed")
    public ResponseEntity<?> getMostViewedDocuments(@RequestParam("limit") int limit) {
        try {
            return ResponseEntity.ok(documentService.getMostViewedDocuments(limit));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/most-downloaded")
    public ResponseEntity<?> getMostDownloadedDocuments(@RequestParam("limit") int limit) {
        try {
            return ResponseEntity.ok(documentService.getMostDownloadedDocuments(limit));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<?> getLatestDocuments(@RequestParam("limit") int limit) {
        try {
            return ResponseEntity.ok().body(documentService.getLatestDocuments(limit));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @Validated
    @Async
    @PostMapping("/upload")
    public CompletableFuture<ResponseEntity<String>> uploadDocument(
            @ModelAttribute UploadRequestDTO uploadRequestDTO
    ) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return ResponseEntity.ok(documentService.uploadDocument(uploadRequestDTO));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error uploading document: " + e.getMessage());
            }
        });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocumentById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(documentService.deleteDocument(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting document: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDocumentById(
            @PathVariable("id") Long id, 
            @RequestBody UploadRequestDTO uploadRequestDTO
    ) {
        try {
            return ResponseEntity.ok(documentService.updateDocumentById(id, uploadRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PutMapping("/download/{id}")
    public ResponseEntity<?> updateDownloadCount(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(documentService.updateDownloadCount(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PutMapping("/views/{id}")
    public ResponseEntity<?> updateViewCount(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(documentService.updateViewCount(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<?> countAllDocuments() {
        try {
            return ResponseEntity.ok(documentService.countAllDocuments());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @GetMapping("/this-year")
    public ResponseEntity<?> getDocumentsThisYear() {
        try {
            return ResponseEntity.ok(documentService.getDocumentsThisYear());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/this-month")
    public ResponseEntity<?> getDocumentsThisMonth() {
        try {
            return ResponseEntity.ok(documentService.getDocumentsThisMonth());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/author/{authorName}")
    public ResponseEntity<?> getDocumentsByAuthorName(@PathVariable("authorName") String authorName) {
        try {
            return ResponseEntity.ok(documentService.getDocumentsByAuthorName(authorName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PostMapping("/recommend")
    public ResponseEntity<?> getRecommendedDocuments(
            @ModelAttribute RecommendationRequestDTO recommendationRequestDTO
    ) {
        try {
            return ResponseEntity.ok(documentService.getRecommendedDocuments(recommendationRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PostMapping("/filter")
    public ResponseEntity<?> filterDocuments(
            @RequestBody FilterRequestDTO filterRequestDTO,
            @RequestParam(required = false, name = "order") String order
    ) {
        try {
            filterRequestDTO.setOrder(order);
            return ResponseEntity.ok(documentService.filterDocuments(filterRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
