package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.FilterRequestDTO;
import com.GDU.backend.dtos.requests.RecommendationRequestDTO;
import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.services.DocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final String UPLOAD_DIR = "src/main/resources/static/uploads/";

    @GetMapping("/{slug}/file")
    public ResponseEntity<Resource> getFileBySlug(@PathVariable("slug") String slug) {
        try {
            DocumentResponseDTO document = documentService.getDocumentBySlug(slug);
            File file = new File(UPLOAD_DIR + document.getPath());
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(document.getDocument_type()))
                    .body(new FileSystemResource(file));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{slug}/download")
    public ResponseEntity<Resource> getDownloadFileBySlug(@PathVariable("slug") String slug) {
        try {
            DocumentResponseDTO document = documentService.getDocumentBySlug(slug);
            // null because the raw file is pdf
            if (document.getFile_download() == null) {
                File file = new File(UPLOAD_DIR + document.getPath());
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(document.getDocument_type()))
                        .body(new FileSystemResource(file));
            }
            File file = new File(UPLOAD_DIR + document.getFile_download());
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(document.getDownload_file_type()))
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

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(
            @ModelAttribute UploadRequestDTO uploadRequestDTO) {
        try {
            return documentService.uploadDocument(uploadRequestDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading document: " + e.getMessage());
        }
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
            boolean isDelete = documentService.deleteDocumentById(id);
            if (!isDelete) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Delete document failed");
            }
            return ResponseEntity.ok("Delete document successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting document: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDocumentById(

            @PathVariable("id") Long id,
            @ModelAttribute UploadRequestDTO uploadRequestDTO) {
        try {
            System.out.println(uploadRequestDTO);
            System.out.println(id);
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

    @GetMapping("/today")
    public ResponseEntity<?> countDocumentsToday() {
        try {
            return ResponseEntity.ok(documentService.countDocumentsToday());
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
            @ModelAttribute RecommendationRequestDTO recommendationRequestDTO) {
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

    @GetMapping("/total-views/{staffCode}")
    public ResponseEntity<?> getTotalViewsByAuthor(@PathVariable("staffCode") String staffCode) {
        try {
            return ResponseEntity.ok(documentService.getTotalViewsByAuthor(staffCode));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/total-downloads/{authorId}")
    public ResponseEntity<?> getTotalDownloadsByAuthor(@PathVariable("authorId") Long authorId) {
        try {
            return ResponseEntity.ok(documentService.getTotalDownloadsByAuthor(authorId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/total-documents/{staffCode}")
    public ResponseEntity<?> getDocumentsCountByAuthor(@PathVariable("staffCode") String staffCode) {
        try {
            return ResponseEntity.ok(documentService.getDocumentsCountByAuthor(staffCode));
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
    public ResponseEntity<?> getPublishedDocuments() {
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

    @GetMapping("/monthly/{year}")
    public ResponseEntity<?> countDocumentMonthLy(@PathVariable("year") int year) {
        try {
            return ResponseEntity.ok(documentService.countDocumentsMonthly(year));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/type/{year}")
    public ResponseEntity<?> getCountDocumentByType(@PathVariable("year") int year) {
        try {
            return ResponseEntity.ok(documentService.countDocumentsByType(year));
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

    @GetMapping("/top10")
    public ResponseEntity<?> getTop10Documents() {
        try {
            return ResponseEntity.ok(documentService.getTop10Documents());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/page/{page}")
    public ResponseEntity<?> getPaginationDocs(@PathVariable("page") int page) {
        try {
            return ResponseEntity.ok(documentService.getPaginationDocs(page));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/deleted")
    public ResponseEntity<?> getDeletedDocuments() {
        try {
            return ResponseEntity.ok(documentService.getDeletedDocument());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/recovery")
    public ResponseEntity<?> recoveryDocumentById(@RequestBody List<Long> ids) {
        try {
            if (ids.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("List id is empty");
            }
            return ResponseEntity.ok(documentService.recoveryDocument(ids));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
