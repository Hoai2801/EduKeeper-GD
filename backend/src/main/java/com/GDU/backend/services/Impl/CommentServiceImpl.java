package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.CommentDTO;
import com.GDU.backend.dtos.responses.CommentResponse;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.*;
import com.GDU.backend.repositories.*;
import com.GDU.backend.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
//    private final SubCommentRepository subCommentRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public ResponseEntity<String> insertComment(CommentDTO commentDTO, Long documentId) {
        Document existDocument = documentRepository.findById(documentId).orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        User existUser = userRepository.findByStaffCode(commentDTO.getStaffCode()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (existDocument != null) {
            commentRepository.save(
                    Comment.builder()
                            .document(existDocument)
                            .user(existUser)
                            .content(commentDTO.getContent())
                            .createdAt(LocalDateTime.now())
                            .build()
            );
            if (!existUser.getStaffCode().equals(existDocument.getUserUpload().getStaffCode())) {
                Notification notification = Notification.builder()
                        .title("Bình luận mới")
                        .content(existUser.getName() + " đã bình luận về tài liệu " + existDocument.getTitle() + " của bạn")
                        .created_at(LocalDateTime.now())
                        .document(existDocument)
                        .sender(existUser)
                        .receiver(existDocument.getUserUpload())
                        .build();
                notificationRepository.save(notification);
            }
            return ResponseEntity.ok("success");
        }
        return ResponseEntity.badRequest().body("Không tìm thấy tài liệu");
    }

    @Override
    public List<CommentResponse> getComments(Long documentId) {
        List<Comment> parentComments = commentRepository.findByDocumentId(documentId);
        for (Comment parentComment : parentComments) {
            List<Comment> subComments = commentRepository.findByParentCommentId(parentComment.getId());
            parentComment.setReplies(subComments);
        }
        return parentComments.stream().map(CommentResponse::convertToResponse).toList();
    }

    @Override
    public ResponseEntity<String> insertReply(CommentDTO commentDTO, Long commentId) {
        Comment existComment = commentRepository.findById(commentId).orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        User existUser = userRepository.findByStaffCode(commentDTO.getStaffCode()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (existComment != null) {
            commentRepository.save(
                    Comment.builder()
                            .document(null)
                            .user(existUser)
                            .content(commentDTO.getContent())
                            .createdAt(LocalDateTime.now())
                            .parentComment(existComment)
                            .build()
            );
            Notification notification = Notification.builder()
                    .title("Bình luận mới")
                    .content(existUser.getName() + " đã trả lời về 1 bình luận của bạn")
                    .created_at(LocalDateTime.now())
                    .document(existComment.getDocument())
                    .sender(existUser)
                    .receiver(existComment.getUser())
                    .build();
            notificationRepository.save(notification);
            return null;
        }
        return ResponseEntity.badRequest().body("Không tìm thấy comment");
    }
}
