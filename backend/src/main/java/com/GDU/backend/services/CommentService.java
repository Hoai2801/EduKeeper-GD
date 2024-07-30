package com.GDU.backend.services;

import com.GDU.backend.dtos.requests.CommentDTO;
import com.GDU.backend.models.Comment;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommentService {
    ResponseEntity<String> insertComment(CommentDTO commentDTO, Long documentId);

    List<Comment> getComments(Long documentId);
}
