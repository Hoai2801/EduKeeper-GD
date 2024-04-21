package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.FilterDTO;
import com.GDU.backend.dtos.requests.RecommendDTO;
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

@CrossOrigin
@RestController
@RequestMapping("api/v1/document")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentServiceImpl documentService;

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
            // Get the file by slug using document service
            Document document = documentService.getDocumentBySlug(slug);
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
            return ResponseEntity.ok(documentService.getDocumentBySlug(slug));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/most-viewed")
    public ResponseEntity<?> getMostViewedDocumentsInCurrentMonth(@RequestParam("limit") int limit) {
        try {
            return ResponseEntity.ok(documentService.getMostViewedDocuments(limit));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/most-downloaded")
    public ResponseEntity<?> getMostDownloadedDocumentsInCurrentMonth(@RequestParam("limit") int limit) {
        try {
            return ResponseEntity.ok(documentService.getMostDownloadedDocuments(limit));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // get the list of lasted documents
    @GetMapping("/lasted")
    public ResponseEntity<?> lastedDocument(@RequestParam("limit") int limit) {
        try {
            return ResponseEntity.ok().body(documentService.getLastedDocuments(limit));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @Validated
    @Async
    @PostMapping
    public CompletableFuture<ResponseEntity<String>> uploadDocument(
            @ModelAttribute UploadDTO uploadDto) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.println("Uploading document: " + uploadDto.toString());
            try {
                return ResponseEntity.ok(documentService.uploadDocument(uploadDto));
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting document: " + e.getMessage());
        }
    }
    
    @GetMapping("/increase-view/{id}")
    public ResponseEntity<String> increaseViewCountDocument(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok().body(documentService.increaseViewCount(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/increase-download/{id}")
    public ResponseEntity<String> increaseDownloadDocument(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok().body(documentService.increaseDownloadCount(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDocumentById(@PathVariable("id") Long id, @RequestBody UploadDTO uploadDTO) {
        try {
            return ResponseEntity.ok(documentService.updateDocumentById(id, uploadDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PutMapping("/download/{id}")
    public ResponseEntity<?> updateDownLoad(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(documentService.updateDownloads(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PutMapping("/views/{id}")
    public ResponseEntity<?> updateViews(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(documentService.updateViews(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @GetMapping("/week")
    public ResponseEntity<?> getListPopularDocumentOfWeek() {
        try {
            return ResponseEntity.ok(documentService.getPopularDocumentsOfThisWeek());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @GetMapping("/month")
    public ResponseEntity<?> getListPopularDocumentOfMonth() {
        try {
            return ResponseEntity.ok(documentService.getPopularDocumentsOfThisMonth());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    // Author
    @GetMapping("/author/{authorName}")
    public ResponseEntity<?> getDocumentsByAuthorName(@PathVariable("authorName") String authorName) {
        try {
            return ResponseEntity.ok(documentService.getDocumentsByAuthorName(authorName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PostMapping("/recommend")
    public ResponseEntity<?> getDocumentsSuggested(@ModelAttribute RecommendDTO recommend) {
        try {
            return ResponseEntity.ok(documentService.getDocumentsSuggested(recommend));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    // Specialized
    @GetMapping("/specialized/{slug}")
    public ResponseEntity<?> getDocumentsBySlugSpecialized(@PathVariable("slug") String slug) {
        try {
            return ResponseEntity.ok(documentService.getDocumentsBySlugSpecialized(slug));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PostMapping("/filter")
    public ResponseEntity<?> getDocumentsByFilter(
            @RequestBody String searchTerm,
            @RequestParam(required = false, name = "category") String categoryName,
            @RequestParam(required = false, name = "subject") String subjectName,
            @RequestParam(required = false, name = "department") String departmentSlug,
            @RequestParam(required = false, name = "specialized") String specializedSlug,
            @RequestParam(required = false, name = "order") String order) {
        try {
            System.out.println(searchTerm);
            FilterDTO req = FilterDTO.builder()
                    .searchTerm(searchTerm)
                    .categoryName(categoryName)
                    .subjectName(subjectName)
                    .departmentSlug(departmentSlug)
                    .specializedSlug(specializedSlug)
                    .order(order)
                    .build();
            return ResponseEntity.ok(documentService.getDocumentsByFilter(req));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}

