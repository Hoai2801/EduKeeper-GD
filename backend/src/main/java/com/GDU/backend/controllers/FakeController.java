package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.services.DocumentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Slf4j
@RestController
@RequestMapping("api/v1/fake")
@RequiredArgsConstructor
public class FakeController {

    private final DocumentService documentService;

    @GetMapping("/{amount}")
    public String fake(@PathVariable("amount") int amount) throws IOException {
        for (int i = 0; i < amount; i++) {
            createFakeDocument();
        }
        return "faking";
    }
    
    @GetMapping("/mail")
    public String fakeMail() throws IOException {
        createFakeDocument();
        return "faking";
    }

    private void createFakeDocument() throws IOException {
        Faker faker = new Faker();

        // create fake dto for testing
        String pathUrl = "src/main/resources/static/uploads/";
        String[] files = {"1713791537559_Packt.ASP.NET.8.Best.Practices.183763212X.pdf", "1713792927454_Algorithmic Thinking, 2nd Edition_ Unlock Your Programming Potential by Daniel Zingaro.pdf", "1715004861451_mongodb-the-definitive-guide-powerful-and-scalable-data-storage-3rd-edition-3nbsped-9781491954461_compress.pdf"};
        Path path = Paths.get(pathUrl + files[(int) Math.round(Math.random())]);
        String name = faker.book().title() + LocalDateTime.now();
        String originalFileName = "file.pdf";
        String contentType = "application/pdf";
        byte[] content = null;
        try {
            content = Files.readAllBytes(path);
        } catch (final IOException e) {
            log.error("Error reading file: {}", e.getMessage());
        }
        MultipartFile result = new MockMultipartFile(name, originalFileName, contentType, content);

        UploadRequestDTO uploadRequestDTO = UploadRequestDTO.builder()
                .title(faker.book().title())
                .author("Adam hoai")
                .userUpload("22140044")
                .subject(1L)
                .scope("public")

                .category(faker.number().numberBetween(1, 5))
                .description(faker.chuckNorris().fact())
                .document(result)
                .build();

        documentService.uploadDocument(uploadRequestDTO);
    }
}
