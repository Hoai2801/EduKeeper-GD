package com.GDU.backend.dtos.responses;

import com.GDU.backend.models.*;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;
import org.springframework.core.io.Resource;

import java.lang.reflect.Type;
import java.time.LocalDate;

@Data
@Builder
public class FileResponse {
    private String title;

    private String slug;

    private String document_type;

    private Long document_size;

    private LocalDate upload_date;

    private String path;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacherID;

    @ManyToOne
    @JoinColumn(name = "department")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "subject")
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "category")
    private Category category;

    private int views;

    private int download;

    private int helpfull;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userID;
    
    private Type file;
}
