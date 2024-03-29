package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.FilterDTO;
import com.GDU.backend.dtos.requests.RecommentDTO;
import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.models.Document;
import com.GDU.backend.services.Impl.DocumentServiceImpl;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
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

@RestController
@RequestMapping("api/v1/document")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentServiceImpl DocumentService;

    /**
     * Get file by slug
     *
     * @param slug - the slug of the file
     * @return ResponseEntity with the file and 200 status code if successful, or
     *         500 status code if an error occurs
     */
    @GetMapping("/{slug}/file")
    public ResponseEntity<Resource> getFileBySlug(@PathVariable("slug") String slug) {
        try {
            // Get the file by slug using DocumentService
            Document document = DocumentService.getDocumentBySlug(slug);
            File file = new File(document.getPath());
            return ResponseEntity.ok().contentType(MediaType.parseMediaType(document.getDocument_type()))
                    .body(new FileSystemResource(file));
        } catch (Exception e) {
            // Return 500 status code if an error occurs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getDocumentBySlug(@PathVariable("slug") String slug) {
        try {
            return ResponseEntity.ok(DocumentService.getDocumentBySlug(slug));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @Validated
    @Async
    @PostMapping
    public CompletableFuture<ResponseEntity<String>> uploadDocument(
            @Valid @ModelAttribute UploadDTO uploadDto) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return ResponseEntity.ok(DocumentService.uploadDocument(uploadDto));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error uploading document: " + e.getMessage());
            }
        });
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDocumentById(@PathVariable("id") Long id, @RequestBody UploadDTO uploadDTO) {
        try {
            return ResponseEntity.ok(DocumentService.updateDocumentById(id, uploadDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PutMapping("/download/{id}")
    public ResponseEntity<?> updateDownLoad(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(DocumentService.updateDownloads(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PutMapping("/views/{id}")
    public ResponseEntity<?> updateViews(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(DocumentService.updateViews(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @GetMapping("/week")
    public ResponseEntity<?> getListPopularDocumentOfWeek() {
        try {
            return ResponseEntity.ok(DocumentService.getPopularDocumentsOfThisWeek());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @GetMapping("/month")
    public ResponseEntity<?> getListPopularDocumentOfMonth() {
        try {
            return ResponseEntity.ok(DocumentService.getPopularDocumentsOfThisMonth());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @GetMapping("/author/{name}")
    public ResponseEntity<?> getDocumentsByUserId(@PathVariable("name") String authorName) {
        try {
            return ResponseEntity.ok(DocumentService.getDocumentsByAuthorName(authorName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PostMapping("/recomment")
    public ResponseEntity<?> getDocumentsSuggested(@ModelAttribute RecommentDTO recomment) {
        try {
            return ResponseEntity.ok(DocumentService.getDocumentsSuggested(recomment));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    // Specialized
    @GetMapping("/specialized/{slug}")
    public ResponseEntity<?> getDocumentsBySlugSpecialized(@PathVariable("slug") String slug) {
        try {
            return ResponseEntity.ok(DocumentService.getDocumentsBySlugSpecialized(slug));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PostMapping("/filter")
    public ResponseEntity<?> getDocumentsbyFilter(@ModelAttribute FilterDTO filter) {
        try {
            return ResponseEntity.ok(DocumentService.getDocumentsByFilter(filter));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }
}
