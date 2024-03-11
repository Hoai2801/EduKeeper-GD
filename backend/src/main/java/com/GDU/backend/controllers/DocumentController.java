package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.dtos.responses.FileResponse;
import com.GDU.backend.models.Document;
import com.GDU.backend.services.Impl.DocumentServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("api/v1/document")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentServiceImpl DocumentService;

    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";
    

//    @GetMapping("/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public ResponseEntity<Document> getDocumentById(@PathVariable("id") Long id) {
//        try {
//            return ResponseEntity.ok(DocumentService.getDocumentById(id));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
    
    @GetMapping("/{slug}/file")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getFileBySlug(@PathVariable("slug") String slug) {
        try {
            Document document = DocumentService.getDocumentBySlug(slug);
            File file = new File(document.getPath());
            Resource resource = new FileSystemResource(file);
            
            
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF)
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + document.getTitle())
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{slug}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getDocumentBySlug(@PathVariable("slug") String slug) {
        try {
            Document document = DocumentService.getDocumentBySlug(slug);
//            File file = new File(document.getPath());
//            Resource resource = new FileSystemResource(file);
//
//            var fileResponse = FileResponse.builder()
//                    .file(Base64.getMimeDecoder().decode(resource.getBytes(StandardCharsets.UTF_8)))
//                    .document_size(document.getDocument_size())
//                    .document_type(document.getDocument_type())
//                    .category(document.getCategory())
//                    .department(document.getDepartment())
//                    .title(document.getTitle())
//                    .subject(document.getSubject())
//                    .download(document.getDownload())
//                    .views(document.getViews())
//                    .helpfull(document.getHelpfull())
//                    .teacherID(document.getTeacherID())
//                    .userID(document.getUserID())
//                    .upload_date(document.getUpload_date())
//                    .build();
//            return ResponseEntity.ok()
////                    .contentType(MediaType.APPLICATION_PDF)
////                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + document.getTitle())
//                    .body(fileResponse);

            return ResponseEntity.ok(document);
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
