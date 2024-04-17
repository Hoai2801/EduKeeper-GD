package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FilterDTO;
import com.GDU.backend.dtos.requests.RecommendDTO;
import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.Category;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.models.Subject;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.services.DocumentService;
import com.itextpdf.text.pdf.PdfReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private final DocumentRepository documentRepository;

    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";

    /**
     * Uploads a document based on the provided UploadDto
     *
     * @param uploadDto the data transfer object containing document information
     * @return a string indicating the success of the document upload
     */
    @Override
    public String uploadDocument(UploadDTO uploadDto) throws IOException {
        // Get the category and specialized from the UploadDto
        Category category = Category.builder().id(uploadDto.getCategory()).build();

        Specialized specialized = Specialized.builder().id(uploadDto.getSpecialized()).build();

        Subject subject = Subject.builder().id(uploadDto.getSubject()).build();

        PdfReader pdfReader = new PdfReader(uploadDto.getDocument().getInputStream());
        int numberOfPages = pdfReader.getNumberOfPages();

        // Create a new Document instance with the provided document information
        Document newDocument = Document.builder()
                .title(uploadDto.getTitle())
                .author(uploadDto.getAuthor())
                .slug(
                        uploadDto.getTitle().replace(" ", "-").toLowerCase()
                                + "-" + new Date().getTime())
                .document_type(uploadDto.getDocument().getContentType())
                // Calculate and set the document size in megabytes
                .document_size(uploadDto.getDocument().getSize() / 1_000_000)
                .subject(subject)
                .pages(numberOfPages)
                .category(category)
                .specialized(specialized)
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
        return "Document uploaded successfully";
    }

    @Override
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
    }

    @Override
    public String updateDocumentById(Long id, UploadDTO uploadDTO) {
        Document existDocument = documentRepository.findById(id).orElse(null);
        if (existDocument == null) {
            return "Document not existing";
        }

        // Update document
        existDocument
                .setCategory(uploadDTO.getCategory() != null ? Category.builder().id(uploadDTO.getCategory()).build()
                        : existDocument.getCategory());
        existDocument.setAuthor(uploadDTO.getAuthor() != null ? uploadDTO.getAuthor() : existDocument.getAuthor());
        existDocument.setTitle(uploadDTO.getTitle() != null ? uploadDTO.getTitle() : existDocument.getTitle());
        existDocument.setSlug(uploadDTO.getTitle() != null ? uploadDTO.getTitle().replace(" ", "-").toLowerCase()
                + "-" + new Date().getTime() : existDocument.getSlug());
        existDocument.setSpecialized(
                uploadDTO.getSpecialized() != null ? Specialized.builder().id(uploadDTO.getSpecialized()).build()
                        : existDocument.getSpecialized());

        // Handle Path
        if (uploadDTO.getDocument() != null) {
            existDocument.setDocument_type(uploadDTO.getDocument().getContentType());
            existDocument
                    .setDocument_size(uploadDTO.getDocument().getSize() / 1_000_000);

            String fileName = System.currentTimeMillis() + "_" + uploadDTO.getDocument().getOriginalFilename();
            File destFile = new File(UPLOAD_DIR + fileName);

            // Save the uploaded document to the file system
            MultipartFile multipartFile = uploadDTO.getDocument();
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

            existDocument.setPath(destFile.getAbsolutePath());
        }
        documentRepository.save(existDocument);
        return "Update document successfully";
    }

    @Override
    public Document getDocumentBySlug(String slug) {
        return documentRepository.getDocumentBySlug(slug);
    }

    @Override
    public List<Document> getMostViewedDocuments(int limit) {
        return documentRepository.getMostViewedDocuments(limit);
    }

    @Override
    public String deleteDocument(Long id) {
        documentRepository.deleteById(id);
        return "Document deleted successfully";
    }

    @Override
    public String increaseViewCount(Long id) {
        Document document = getDocumentById(id);
        document.setViews(document.getViews() + 1);
        documentRepository.save(document);
        return "View count increased successfully";
    }

    @Override
    public String increaseDownloadCount(Long id) {
        Document document = getDocumentById(id);
        document.setDownload(document.getDownload() + 1);
        documentRepository.save(document);
        return "Download count increased successfully";
    }

    @Override
    public List<Document> getMostDownloadedDocuments(int limit) {
        return documentRepository.getMostDownloadedDocuments(limit);
    }

    @Override
    public List<Document> getLastedDocuments(int limit) {
        return documentRepository.getLastedDocuments(limit);
    }

    public String updateDownloads(Long id) {
        Document existsDocument = documentRepository.findById(id).orElse(null);
        if (existsDocument == null) {
            return "Document is not existing";
        }

        existsDocument.setDownload(existsDocument.getDownload() + 1);
        documentRepository.save(existsDocument);
        return "Update downloads success";
    }

    @Override
    public String updateViews(Long id) {
        Document existsDocument = documentRepository.findById(id).orElse(null);
        if (existsDocument == null) {
            return "Document is not existing";
        }
        existsDocument.setViews(existsDocument.getViews() + 1);
        documentRepository.save(existsDocument);
        return "Update views success";
    }

    @Override
    public List<Document> getPopularDocumentsOfThisWeek() {
        return documentRepository.getPopularDocumentThisWeek();
    }

    @Override
    public List<Document> getPopularDocumentsOfThisMonth() {
        return documentRepository.getPopularDocumentThisMonth();
    }

    @Override
    public List<Document> getDocumentsSuggested(RecommendDTO recommendDTO) {
        // return list document which have a same specialized and category, title or
        // author
        return documentRepository.getDocumentsSuggested(recommendDTO.getSpecialized(), recommendDTO.getCategory(),
                recommendDTO.getTitle(), recommendDTO.getAuthor());
    }

    @Override
    public List<Document> getDocumentsByAuthorName(String authorName) {
        return documentRepository.getDocumentsByAuthorName(authorName);
    }

    @Override
    public List<Document> getDocumentsBySlugSpecialized(String slug) {
        return documentRepository.getDocumentsBySlugSpecialized(slug);
    }

    @Override
    public List<Document> getDocumentsByFilter(FilterDTO filterDTO) {
        List<Document> documents = documentRepository.getDocumentsByFilter(
                filterDTO.getDepartmentSlug(),
                filterDTO.getSearchTerm(),
                filterDTO.getSubjectName(),
                filterDTO.getSpecializedSlug(),
                filterDTO.getCategoryName());
        if (filterDTO.getOrder() != null) {
            if (filterDTO.getOrder().equalsIgnoreCase("mostviewed")) {
                documents.sort(Comparator.comparing(Document::getViews).reversed());
            }
            if (filterDTO.getOrder().equalsIgnoreCase("mostdownloaded")) {
                documents.sort(Comparator.comparing(Document::getDownload).reversed());
            }
        } else {
            documents.sort(Comparator.comparing(Document::getUpload_date).reversed());
        }
        return documents;
    }

}
