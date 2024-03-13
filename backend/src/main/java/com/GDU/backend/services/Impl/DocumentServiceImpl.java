package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.*;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.repositories.SubjectRepository;
import com.GDU.backend.services.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private final SubjectRepository subjectRepository;
    private final DocumentRepository documentRepository;

    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";


    /**
     * Uploads a document based on the provided UploadDto
     *
     * @param uploadDto the data transfer object containing document information
     * @return a string indicating the success of the document upload
     */
    @Override
    public String uploadDocument(UploadDTO uploadDto) {
        // Create a new User instance based on the provided userId
        User user = User.builder().id(uploadDto.getUserId()).build();

        // Retrieve the existing subject based on the provided subject id
        Subject existingSubject = subjectRepository.findById(uploadDto.getSubject())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));

        Category category = Category.builder().id(uploadDto.getCategory()).build();
        
        Department department = Department.builder().id(uploadDto.getDepartment()).build();

        // Create a new Document instance with the provided document information
        Document newDocument = Document.builder()
                .userID(user)
                .title(uploadDto.getTitle())
                .slug(
                        uploadDto.getTitle().replace(" ", "-").toLowerCase() 
                                + "-" + new Date().getTime())
                .document_type(uploadDto.getDocument().getContentType())
                // Calculate and set the document size in megabytes
                .document_size(uploadDto.getDocument().getSize() / 1_000_000)
                .subject(existingSubject)
                .teacherID(User.builder().id(1L).build())
                .category(category)
                .department(department)
                .upload_date(LocalDate.now())
                .build();
        String fileName = System.currentTimeMillis() + "_" + uploadDto.getDocument().getOriginalFilename();
        File destFile = new File(UPLOAD_DIR + fileName);

        // Save the uploaded document to the file system
        MultipartFile multipartFile = uploadDto.getDocument();
        Path uploadDir = Paths.get(UPLOAD_DIR);
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            Files.copy(multipartFile.getInputStream(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }

        newDocument.setPath(destFile.getAbsolutePath());
        // Save the new document to the document repository
        documentRepository.save(newDocument);

        // Return a success message
        return destFile.getAbsolutePath();
    }

    @Override
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
    }

    @Override
    public Document getDocumentBySlug(String slug) {
        return documentRepository.getDocumentBySlug(slug);
    }

}
