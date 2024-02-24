package com.GDU.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "document")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "document")
    private List<Access> access;

    private String slug;

    private String document_type;

    private String document_size;

    private Date upload_date;

    private String content;

    private String subject_name;
}
