package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.Comment;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "document_id")
    @JsonIgnore
    private Document document;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserResponse user;

    private String content;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonBackReference
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment")
    @JsonManagedReference
    private List<CommentResponse> replies;

    private LocalDateTime createdAt;

    // Conversion method to convert Comment entity to CommentResponse DTO
    public static CommentResponse convertToResponse(Comment comment) {
        if (comment == null) {
            return null;
        }

        // Convert nested user to UserResponse
        UserResponse userResponse = UserResponse.convertToResponse(comment.getUser());

        // Recursively convert replies if there are any
        List<CommentResponse> replies = comment.getReplies().stream()
                .map(CommentResponse::convertToResponse)
                .collect(Collectors.toList());

        return CommentResponse.builder()
                .id(comment.getId())
                .document(comment.getDocument()) // Assuming you want to include the document object as is
                .user(userResponse)
                .content(comment.getContent())
                .parentComment(comment.getParentComment()) // Assuming you want to include the parent comment as is
                .replies(replies)
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
