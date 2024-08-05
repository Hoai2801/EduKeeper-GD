package com.GDU.backend.dtos.requests;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private Long documentId;
    private String staffCode;
    private String content;
    private Long parentId; 
}
