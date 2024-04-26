package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FilterRequestDTO;
import com.GDU.backend.dtos.requests.RecommendationRequestDTO;
import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.dtos.response.DocumentResponseDTO;
import com.GDU.backend.dtos.response.TotalResponse;
import com.GDU.backend.dtos.response.UserResponse;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.*;
import com.GDU.backend.repositories.CategoryRepo;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.repositories.SpecializedRepository;
import com.GDU.backend.services.DocumentService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.text.StringEscapeUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";
    private static final Logger log = LoggerFactory.getLogger(DocumentServiceImpl.class);
    private final DocumentRepository documentRepository;
    private final CategoryRepo categoryRepository;
    private final SpecializedRepository specializedRepository;
    private final UserServiceImpl userService;

    @Override
    public String uploadDocument(UploadRequestDTO uploadRequestDTO) throws IOException {
        Category category = categoryRepository.findById((long) uploadRequestDTO.getCategory())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        Specialized specialized = specializedRepository.findById((long) uploadRequestDTO.getSpecialized())
                .orElseThrow(() -> new ResourceNotFoundException("Specialized not found"));
        
        // todo: add subject model
        Subject subject = Subject.builder()
                .id((long) uploadRequestDTO.getSubject())
                .build();
        
        // author is the user who uploads by default
        User author = userService.getUserByStaffCode(uploadRequestDTO.getAuthor());

        int numberOfPages = calculateNumberOfPages(uploadRequestDTO.getDocument().getInputStream());

        String thumbnail = generateThumbnail(uploadRequestDTO.getDocument().getInputStream());

        // generate file name and path
        String fileName = System.currentTimeMillis() + "_" + uploadRequestDTO.getDocument().getOriginalFilename();
        File destFile = new File(UPLOAD_DIR + fileName);

        // save file
        MultipartFile multipartFile = uploadRequestDTO.getDocument();
        Path uploadDir = Paths.get(UPLOAD_DIR);
        Files.createDirectories(uploadDir);
        Files.copy(multipartFile.getInputStream(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

        Document newDocument = Document.builder()
                .title(uploadRequestDTO.getTitle())
                .author(author)
                .slug(createSlug(uploadRequestDTO.getTitle()))
                .path(destFile.getAbsolutePath())
                .document_type(uploadRequestDTO.getDocument().getContentType())
                .document_size(uploadRequestDTO.getDocument().getSize() / 1_000_000)
                .subject(subject)
                .pages(numberOfPages)
                .category(category)
                .thumbnail(thumbnail)
                .specialized(specialized)
                .upload_date(LocalDate.now())
                .build();
        
        documentRepository.save(newDocument);

        return "Document uploaded successfully";
    }

    private int calculateNumberOfPages(InputStream inputStream) throws IOException {
        try (PDDocument document = PDDocument.load(inputStream)) {
            return document.getNumberOfPages();
        }
    }

    private String createSlug(String title) {
        title = StringEscapeUtils.escapeHtml4(title);
        String slug = title.replaceAll("[^a-zA-Z0-9\\s]", "");
        slug = slug.replaceAll("\\s+", "-");
        return slug.toLowerCase() + "-" + System.currentTimeMillis();
    }

    private String generateThumbnail(InputStream inputStream) throws IOException {
        try (PDDocument document = PDDocument.load(inputStream)) {
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            // Render the first page of the PDF to an image
            BufferedImage image = pdfRenderer.renderImage(0);

            String url = "src/main/resources/static/thumbnail/";
            String fileName = System.currentTimeMillis() + ".png";
            String thumbnailPath = url + fileName;
            ImageIO.write(image, "PNG", new File(thumbnailPath));

            return fileName;
        } catch (IOException e) {
            log.error("Error generating thumbnail: {}", e.getMessage());
            return null;
        }
    }

    @Override
    public String updateDocumentById(Long id, UploadRequestDTO uploadRequestDTO) {
        Document existDocument = documentRepository.findById(id).orElse(null);
        if (existDocument == null) {
            return "Document not existing";
        }
        
        User newAuthor = userService.getUserByStaffCode(uploadRequestDTO.getAuthor());
        if (newAuthor == null) {
            return "Author not existing";
        }
        existDocument.setAuthor(newAuthor);

        Category category = categoryRepository.findById((long) uploadRequestDTO.getCategory()).orElse(null);
        // Update document
        existDocument.setCategory(category);
        existDocument.setTitle(
                uploadRequestDTO.getTitle() != null ? 
                uploadRequestDTO.getTitle() : 
                existDocument.getTitle()
        );
        existDocument.setSlug(
                uploadRequestDTO.getTitle() != null ? 
                uploadRequestDTO.getTitle()
                        .replace(" ", "-")
                        .toLowerCase() + "-" + new Date().getTime() : 
                existDocument.getSlug()
        );
        existDocument.setSpecialized(existDocument.getSpecialized());

        // Handle Path
        if (uploadRequestDTO.getDocument() != null) {
            existDocument.setDocument_type(uploadRequestDTO.getDocument().getContentType());
            existDocument.setDocument_size(uploadRequestDTO.getDocument().getSize() / 1_000_000);

            String fileName = System.currentTimeMillis() + "_" + uploadRequestDTO.getDocument().getOriginalFilename();
            File destFile = new File(UPLOAD_DIR + fileName);

            // Save the uploaded document to the file system
            MultipartFile multipartFile = uploadRequestDTO.getDocument();
            Path uploadDir = Paths.get(UPLOAD_DIR);
            try {
                Files.createDirectories(uploadDir);
            } catch (IOException e) {
                log.error("Error creating directories: {}", e.getMessage());
            }
            try {
                Files.copy(multipartFile.getInputStream(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                log.error("Error copying file: {}", e.getMessage());
            }

            existDocument.setPath(destFile.getAbsolutePath());
        }
        documentRepository.save(existDocument);
        return "Update document successfully";
    }

    @Override
    public DocumentResponseDTO getDocumentBySlug(String slug) {
        Document document = documentRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        return convertToDocumentResponse(document);
    }

    @Override
    public List<DocumentResponseDTO> getMostViewedDocuments(int limit) {
        return documentRepository.getMostViewedDocuments(limit)
                .stream()
                .filter(document -> document.getViews() > 0)
                .map(this::convertToDocumentResponse)
                .toList();
    }

    @Override
    public String deleteDocument(Long id) {
        Document document = documentRepository.findById(id).orElse(null);
        if (document == null) {
            return "Document not existing";
        }
        documentRepository.deleteById(id);
        return "Document deleted successfully";
    }

    @Override
    public List<DocumentResponseDTO> getMostDownloadedDocuments(int limit) {
        // only get document has download more than 0
        return documentRepository.getMostDownloadedDocuments(limit).stream()
                .filter(document -> document.getDownload() > 0)
                .map(this::convertToDocumentResponse)
                .toList();
    }

    @Override
    public List<DocumentResponseDTO> getLatestDocuments(int limit) {
        return documentRepository.getLastedDocuments(limit)
                .stream().map(this::convertToDocumentResponse).toList();
    }

    public String updateDownloadCount(Long id) {
        Document existsDocument = documentRepository.findById(id).orElse(null);
        if (existsDocument == null) {
            return "Document is not existing";
        }

        existsDocument.setDownload(existsDocument.getDownload() + 1);
        documentRepository.save(existsDocument);
        return "Update downloads success";
    }

    @Override
    public String updateViewCount(Long id) {
        Document existsDocument = documentRepository.findById(id).orElse(null);
        if (existsDocument == null) {
            return "Document is not existing";
        }
        existsDocument.setViews(existsDocument.getViews() + 1);
        documentRepository.save(existsDocument);
        return "Update views success";
    }

    @Override
    public List<DocumentResponseDTO> getRecommendedDocuments(RecommendationRequestDTO recommendationRequestDTO) {
        // return list document which have a same specialized and category, title or
        // author
        return documentRepository.getDocumentsSuggested(
                    recommendationRequestDTO.getSpecialized(), 
                    recommendationRequestDTO.getCategory(),
                    recommendationRequestDTO.getTitle(), 
                    recommendationRequestDTO.getAuthor()
                )
                .stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponseDTO> getDocumentsByAuthorName(String authorName) {
        return documentRepository.getDocumentsByAuthorName(authorName)
                .stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponseDTO> filterDocuments(FilterRequestDTO filterRequestDTO) {
        List<Document> documents = documentRepository.getDocumentsByFilter(
                filterRequestDTO.getDepartmentSlug(),
                filterRequestDTO.getSearchTerm(),
                filterRequestDTO.getSubjectName(),
                filterRequestDTO.getSpecializedSlug(),
                filterRequestDTO.getCategoryName()
        );
        if (filterRequestDTO.getOrder() != null) {
            if (filterRequestDTO.getOrder().equalsIgnoreCase("most-viewed")) {
                documents.sort(Comparator.comparing(Document::getViews).reversed());
            }
            if (filterRequestDTO.getOrder().equalsIgnoreCase("most-downloaded")) {
                // Filter documents with download > 0 first
                // Update documents with filtered and sorted list
                documents = documents.stream()
                        .filter(document -> document.getDownload() > 0)
                        .sorted(Comparator.comparing(Document::getDownload)
                        .reversed()).collect(Collectors.toList()); 
            }
            if (filterRequestDTO.getOrder().equalsIgnoreCase("latest")) {
                documents.sort(Comparator.comparing(Document::getId).reversed());
            }
        } else {
            documents.sort(Comparator.comparing(Document::getId).reversed());
        }
        return documents.stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public TotalResponse getDocumentsThisYear() {
        try {
            Integer numberOfDocsThisYear = documentRepository.getNumberOfDocumentsThisYear();
            Integer numberOfDocsPreYear = documentRepository.getNumberOfDocumentPreviousYear();
            float percentage = ((float) ((numberOfDocsThisYear - numberOfDocsPreYear) * 100)) / numberOfDocsPreYear;
            if (numberOfDocsPreYear == 0) {
                percentage = 100;
            }
            float roundedPercentage = Math.round(percentage * 100.0f) / 100.0f;
            return TotalResponse.builder()
                    .totalDocumentsCurrent(numberOfDocsThisYear)
                    .totalDocumentsPrevious(numberOfDocsPreYear)
                    .percentage(roundedPercentage).build();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'getDocumentThisYear'" + e.getMessage());
        }
    }

    @Override
    public TotalResponse getDocumentsThisMonth() {
        try {
            Integer numberOfDocsThisMonth = documentRepository.getNumberOfDocumentsThisMonth();
            Integer numberOfDocsPreMonth = documentRepository.getNumberOfDocumentPreviousMonth();
            float percentage = ((float) ((numberOfDocsThisMonth - numberOfDocsPreMonth) * 100)) / numberOfDocsPreMonth;
            if (numberOfDocsPreMonth == 0) {
                percentage = 100;
            }
            float roundedPercentage = Math.round(percentage * 100.0f) / 100.0f;
            return TotalResponse.builder()
                    .totalDocumentsCurrent(numberOfDocsThisMonth)
                    .totalDocumentsPrevious(numberOfDocsPreMonth).percentage(roundedPercentage).build();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'getDocumentThisMonth'");
        }
    }

    @Override
    public int countAllDocuments() {
        return documentRepository.countAllDocuments();
    }

    public DocumentResponseDTO convertToDocumentResponse(Document document) {
        // only need show name of user
        UserResponse author = UserResponse.builder()
                .id(document.getAuthor().getId())
                .username(document.getAuthor().getName())
                .staffCode(document.getAuthor().getStaffCode())
                .build();
        return DocumentResponseDTO.builder()
                .title(document.getTitle())
                .slug(document.getSlug())
                .views(document.getViews())
                .download(document.getDownload())
                .author(author)
                .specialized(document.getSpecialized())
                .category(document.getCategory())
                .subject(document.getSubject())
                .upload_date(document.getUpload_date())
                .path(document.getPath())
                .thumbnail(document.getThumbnail())
                .pages(document.getPages())
                .document_type(document.getDocument_type())
                .document_size(document.getDocument_size())
                .build();
    }

}
