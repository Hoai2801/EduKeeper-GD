package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FilterRequestDTO;
import com.GDU.backend.dtos.requests.RecommendationRequestDTO;
import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.dtos.responses.DocumentResponseDTO;
import com.GDU.backend.dtos.responses.TotalResponse;
import com.GDU.backend.dtos.responses.UserResponse;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.*;
import com.GDU.backend.repositories.*;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.SubjectService;
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
    private final CategoryRepository categoryRepository;
    private final SpecializedRepository specializedRepository;
    private final UserServiceImpl userService;
    private final SubjectRepository subjectRepository;
    private final SubjectDocumentRepository subjectDocumentRepository;

    @Override
    public String uploadDocument(UploadRequestDTO uploadRequestDTO) throws IOException {
        // TODO: convert to service
        Category category = categoryRepository.findById(uploadRequestDTO.getCategory())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        
        Subject subject = subjectRepository.findById(uploadRequestDTO.getSubject())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        
        User userUpload = userService.getUserByStaffCode(uploadRequestDTO.getUserUpload());
        // generate file name and path
        String fileName = System.currentTimeMillis() + "_" + uploadRequestDTO.getDocument().getOriginalFilename();
        File destFile = new File(UPLOAD_DIR + fileName);

        // save file
        MultipartFile multipartFile = uploadRequestDTO.getDocument();
        Path uploadDir = Paths.get(UPLOAD_DIR);
        Files.createDirectories(uploadDir);
        Files.copy(multipartFile.getInputStream(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        
        int numberOfPages = 0;
        String thumbnail = "";

        // check file type
        if (uploadRequestDTO.getDocument().getOriginalFilename().endsWith(".pdf")) {
            numberOfPages = calculateNumberOfPages(uploadRequestDTO.getDocument().getInputStream());
            thumbnail = generateThumbnail(uploadRequestDTO.getDocument().getInputStream());
        } else if (uploadRequestDTO.getDocument().getOriginalFilename().endsWith(".docx") || uploadRequestDTO.getDocument().getOriginalFilename().endsWith(".doc")) {
            try {
                File file = new File(destFile.getAbsolutePath());
                System.out.println(file.isFile());
                PDDocument doc = PDDocument.load(file);
                numberOfPages = doc.getNumberOfPages();
            } catch (Exception e) {
                e.printStackTrace();
            }
            log.info("number of pages: " + numberOfPages);
        }

        Document newDocument = Document.builder()
                .title(uploadRequestDTO.getTitle())
                .author(uploadRequestDTO.getAuthor())
                .userUpload(userUpload)
                .slug(createSlug(uploadRequestDTO.getTitle()))
                .path(destFile.getAbsolutePath())
                .scope(uploadRequestDTO.getScope())
                .status("Draft")
                .documentType(uploadRequestDTO.getDocument().getContentType())
                .documentSize(uploadRequestDTO.getDocument().getSize() / 1_000_000)
                .description(uploadRequestDTO.getDescription())
                .pages(numberOfPages)
                .category(category)
                .thumbnail(thumbnail)
                .subject(subject)
//                .specialized(specialized)
                .uploadDate(LocalDate.now())
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
        existDocument.setUserUpload(newAuthor);

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
//        existDocument.setSpecialized(existDocument.getSpecialized());

        // I think we don't need update a document file 
        // any more because we should upload a new one instead

        // Handle Path
//        if (uploadRequestDTO.getDocument() != null) {
//            existDocument.setDocument_type(uploadRequestDTO.getDocument().getContentType());
//            existDocument.setDocument_size(uploadRequestDTO.getDocument().getSize() / 1_000_000);
//
//            String fileName = System.currentTimeMillis() + "_" + uploadRequestDTO.getDocument().getOriginalFilename();
//            File destFile = new File(UPLOAD_DIR + fileName);
//
//            // Save the uploaded document to the file system
//            MultipartFile multipartFile = uploadRequestDTO.getDocument();
//            Path uploadDir = Paths.get(UPLOAD_DIR);
//            try {
//                Files.createDirectories(uploadDir);
//            } catch (IOException e) {
//                log.error("Error creating directories: {}", e.getMessage());
//            }
//            try {
//                Files.copy(multipartFile.getInputStream(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
//            } catch (IOException e) {
//                log.error("Error copying file: {}", e.getMessage());
//            }
//
//            existDocument.setPath(destFile.getAbsolutePath());
//        }
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

        String path = document.getPath();
        File file = new File(path);
        if (file.exists()) {
            boolean deleted = file.delete();
            if (!deleted) {
                return "Delete file failed";
            } else {
                documentRepository.delete(document);
            }
        }
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
    public List<DocumentResponseDTO> filterDocuments(FilterRequestDTO filterRequestDTO) {
        List<Document> documents = documentRepository.getDocumentsByFilter(
                filterRequestDTO.getDepartmentSlug(),
                filterRequestDTO.getSearchTerm(),
                filterRequestDTO.getSubjectName(),
                filterRequestDTO.getSpecializedSlug(),
                filterRequestDTO.getCategoryName()
        );

        // Sort documents
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

    @Override
    public List<DocumentResponseDTO> getDocumentsByUserUploadId(Long id) {
        User user = userService.getUserByStaffCode(id.toString());
        List<Document> documents = documentRepository.findAllByUserUploadId(user.getId());
        return documents.stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public int getDocumentsCountBySpecialized(Long id) {
        return documentRepository.findAllBySpecializedId(id);
    }

    @Override
    public int getTotalViewsByAuthor(Long authorId) {
        User user = userService.getUserByStaffCode(authorId.toString());
        List<Document> documents = documentRepository.findAllByUserUploadId(user.getId());
        if (documents != null) {
            return documents.stream().mapToInt(Document::getViews).sum();
        }
        return 0;
    }

    @Override
    public int getTotalDownloadsByAuthor(Long authorId) {
        User user = userService.getUserByStaffCode(authorId.toString());
        List<Document> documents = documentRepository.findAllByUserUploadId(user.getId());
        if (documents != null) {
            return documents.stream().mapToInt(Document::getDownload).sum();
        }
        return 0;
    }

    @Override
    public int getDocumentsCountByAuthor(Long authorId) {
        User user = userService.getUserByStaffCode(authorId.toString());
        List<Document> documents = documentRepository.findAllByUserUploadId(user.getId());
        if (documents != null) {
            return documents.size();
        }
        return 0;
    }

    public DocumentResponseDTO convertToDocumentResponse(Document document) {
        // only need show name of user
        UserResponse userUpload = UserResponse.builder()
                .id(document.getUserUpload().getId())
                .username(document.getUserUpload().getName())
                .staffCode(document.getUserUpload().getStaffCode())
                .build();
        return DocumentResponseDTO.builder()
                .id(document.getId())
                .title(document.getTitle())
                .slug(document.getSlug())
                .views(document.getViews())
                .download(document.getDownload())
                .user_upload(userUpload)
                .author(document.getAuthor())
                .status(document.getStatus())
                .scope(document.getScope())
                .category(document.getCategory())
                .upload_date(document.getUploadDate())
                .subject(document.getSubject())
                .path(document.getPath())
                .thumbnail(document.getThumbnail())
                .pages(document.getPages())
                .description(document.getDescription())
                .document_type(document.getDocumentType())
                .document_size(document.getDocumentSize())
                .build();
    }

}
