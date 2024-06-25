package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.FilterRequestDTO;
import com.GDU.backend.dtos.requests.RecommendationRequestDTO;
import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.services.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;
import java.util.concurrent.CompletableFuture;

//@CrossOrigin
@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping("/{slug}/file")
    public ResponseEntity<Resource> getFileBySlug(@PathVariable("slug") String slug) {
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

    // get most views in 30 days
//    @GetMapping("/most-viewed")
//    public ResponseEntity<?> getMostViewedDocuments(@RequestParam("limit") int limit) {
//        try {
//            return ResponseEntity.ok(documentService.getMostViewedDocuments(limit));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }

    // get most downloaded in 30 days
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

    @Async
    @PostMapping("/upload")
    public CompletableFuture<ResponseEntity<String>> uploadDocument(
            @ModelAttribute UploadRequestDTO uploadRequestDTO
    ) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                System.out.println(uploadRequestDTO.toString());
                return ResponseEntity.ok(documentService.uploadDocument(uploadRequestDTO));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error uploading document: " + e.getMessage());
            }
        });
    }
    
    @GetMapping("/author/{id}")
    public ResponseEntity<?> getDocumentsByAuthor(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(documentService.getDocumentsByAuthor(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
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
            @ModelAttribute UploadRequestDTO uploadRequestDTO
    ) {
        try {
            return ResponseEntity.ok(documentService.updateDocumentById(id, uploadRequestDTO));
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
    public ResponseEntity<?> getDocumentsByFilter(
            @RequestBody FilterRequestDTO filterRequestDTO) {
        try {
            return ResponseEntity.ok(documentService.filterDocuments(filterRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
//    @GetMapping("/total-views/{authorId}")
//    public ResponseEntity<?> getTotalViewsByAuthor(@PathVariable("authorId") Long authorId) {
//        try {
//            return ResponseEntity.ok(documentService.getTotalViewsByAuthor(authorId));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }
    
    @GetMapping("/total-downloads/{authorId}")
    public ResponseEntity<?> getTotalDownloadsByAuthor(@PathVariable("authorId") Long authorId) {
        try {
            return ResponseEntity.ok(documentService.getTotalDownloadsByAuthor(authorId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    @GetMapping("/total-documents/{authorId}")
    public ResponseEntity<?> getDocumentsCountByAuthor(@PathVariable("authorId") Long authorId) {
        try {
            return ResponseEntity.ok(documentService.getDocumentsCountByAuthor(authorId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/draft")
    public ResponseEntity<?> getDraftDocuments() {
        try {
            return ResponseEntity.ok(documentService.getDraftDocument());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/count-draft")
    public ResponseEntity<?> getTotalDraftDocument() {
        try {
            return ResponseEntity.ok(documentService.countDraftDocuments());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/public")
    public ResponseEntity<?> getPubledDocuments() {
        try {
            return ResponseEntity.ok(documentService.getPublishedDocument());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/count-published")
    public ResponseEntity<?> getTotalPublishedDocument() {
        try {
            return ResponseEntity.ok(documentService.countPublishedDocuments());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/monthly")
    public ResponseEntity<?> countDocumentMonthLy() {
        try {
            return ResponseEntity.ok(documentService.countDocumentsMonthly());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/type")
    public ResponseEntity<?> getCountDocumentByType() {
        try {
            return ResponseEntity.ok(documentService.countDocumentsByType());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/accept/{id}")
    public ResponseEntity<?> acceptDocumentById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(documentService.AcceptDocument(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/accept")
    public ResponseEntity<?> acceptListDocumentById(@RequestBody List<Long> id) {
        try {
            if (id.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("List id is empty");
            }
            return ResponseEntity.ok(documentService.AcceptListDocument(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

//    @GetMapping("/top3")
//    public ResponseEntity<?> getTop3Documents() {
//        try {
//            return ResponseEntity.ok(documentService.getTop3Documents());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }

    @GetMapping("/page/{page}")
    public ResponseEntity<?> getPaginationDocs(@PathVariable("page") int page) {
        try {
            return ResponseEntity.ok(documentService.getPaginationDocs(page));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
}
