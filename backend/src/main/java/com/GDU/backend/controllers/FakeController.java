package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.services.Impl.DocumentServiceImpl;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("api/v1/fake")
@RequiredArgsConstructor
public class FakeController {
    
    private final DocumentServiceImpl documentService;
    
    @GetMapping
    public String fake() throws DocumentException, IOException {
        // fake document for testing
        int amount = 10;
        for (int i = 0; i < amount; i++) {
            createFakeDocument();
            System.out.println("Fake document created: " + i);
        }
        return "fake";
    }
    
    private void createFakeDocument() throws IOException, DocumentException {
        Faker faker = new Faker();
        
        // create fake dto for testing
        Path path = Paths.get("src/main/resources/static/uploads/1712404687275_Java.Professional.Interview.Guide.939103005X.pdf");
        String name = faker.book().title();
        String originalFileName = name + ".pdf";
        String contentType = "application/pdf";
        byte[] content = null;
        try {
            content = Files.readAllBytes(path);
        } catch (final IOException e) {
        }
        MultipartFile result = new MockMultipartFile(name,
                originalFileName, contentType, content);
        
        UploadDTO uploadDTO = UploadDTO.builder()
                .title(faker.book().title())
                .author(faker.name().fullName())
                // we have 39 specialized
                .specialized((long) faker.number().numberBetween(1, 39))
                // 1. book, 2. essay, 3. science research, 4. curriculum
                .category((long) faker.number().numberBetween(1, 4))
                .description(faker.chuckNorris().fact())
                .document(result)
                .build();
        // save fake document
        documentService.uploadDocument(uploadDTO);
    }
}
