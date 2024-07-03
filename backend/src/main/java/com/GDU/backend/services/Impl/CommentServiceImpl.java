package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.CommentDTO;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.Comment;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.User;
import com.GDU.backend.repositories.CommentRepository;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.repositories.UserRepository;
import com.GDU.backend.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository; 
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    @Override
    public String insertComment(CommentDTO commentDTO, Long documentId) {
        Document existDocument = documentRepository.findById(documentId).orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        User existUser = userRepository.findByStaffCode(commentDTO.getStaffCode()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if(existDocument != null) {
            commentRepository.save(
                    Comment.builder()
                            .document(existDocument)
                            .user(existUser)
                            .content(commentDTO.getContent())
                            .createdAt(LocalDateTime.now())
                            .build()
            );
            return "success";
        }
        return "fail";
    }

    @Override
    public List<Comment> getComments(Long documentId) {
        return commentRepository.findAllByDocumentId(documentId);
    }
}