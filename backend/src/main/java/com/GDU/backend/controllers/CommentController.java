package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.CommentDTO;
import com.GDU.backend.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/comments")
public class CommentController {
    private final CommentService commentService; 
    
    @PostMapping("/{documentId}")
    public ResponseEntity<String> insertComment(
            @RequestBody CommentDTO commentDTO,
            @PathVariable Long documentId
    ) {
        return ResponseEntity.ok(commentService.insertComment(commentDTO, documentId));
    }
    
    @GetMapping("/{documentId}")
    public ResponseEntity<?> getComments(@PathVariable Long documentId) {
        return ResponseEntity.ok(commentService.getComments(documentId));
    }
}
