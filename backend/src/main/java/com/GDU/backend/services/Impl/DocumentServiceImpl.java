package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FilterRequestDTO;
import com.GDU.backend.dtos.requests.NotificationDTO;
import com.GDU.backend.dtos.requests.RecommendationRequestDTO;
import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.dtos.responses.*;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.*;
import com.GDU.backend.repositories.*;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.NotificationService;
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
import java.time.LocalDateTime;
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
    private final UserServiceImpl userService;
    private final SubjectRepository subjectRepository;
    private final NotificationService notificationService;

    @Override
    public String uploadDocument(UploadRequestDTO uploadRequestDTO) throws IOException {
        // TODO: convert to service
        Category category = categoryRepository.findById(uploadRequestDTO.getCategory())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
//        Specialized specialized = specializedRepository.findById(uploadRequestDTO.getSpecialized())
//                .orElseThrow(() -> new ResourceNotFoundException("Specialized not found"));

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
        }

        Document newDocument = Document.builder()
                .title(uploadRequestDTO.getTitle())
                .author(uploadRequestDTO.getAuthor())
                .userUpload(userUpload)
                .slug(createSlug(uploadRequestDTO.getTitle()))
                .path(destFile.getAbsolutePath())
                .documentType(uploadRequestDTO.getDocument().getContentType())
                .status("Draft")
                .scope(uploadRequestDTO.getScope())
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
        NotificationDTO notificationDTO = NotificationDTO.builder()
                .sender(userUpload.getStaffCode())
                .receiver("22140044")
                .content("New document uploaded by " + userUpload.getStaffCode())
                .title("New document uploaded")
                .build();
        notificationService.send(notificationDTO);
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

        User userUpload = userService.getUserByStaffCode(uploadRequestDTO.getUserUpload());
        if (userUpload == null) {
            return "User not existing";
        }
        existDocument.setUserUpload(userUpload);

        Category category = categoryRepository.findById(uploadRequestDTO.getCategory()).orElse(null);
        existDocument.setCategory(category);
        existDocument.setAuthor(uploadRequestDTO.getAuthor());
        existDocument.setDescription(uploadRequestDTO.getDescription());
        existDocument.setScope(uploadRequestDTO.getScope());
        existDocument.setTitle(uploadRequestDTO.getTitle());
        existDocument.setSlug(createSlug(uploadRequestDTO.getTitle()));
        existDocument.setStatus("Draft");
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
    public List<DocumentResponseDTO> getMostDownloadedDocuments(int limit) {
        // only get document has download more than 0
        return documentRepository.getMostDownloadedDocuments(limit).stream()
                .filter(document -> !document.getDownloads().isEmpty())
                .map(this::convertToDocumentResponse)
                .toList();
    }

    @Override
    public List<DocumentResponseDTO> getLatestDocuments(int limit) {
               List<Document> documents = documentRepository.getLastedDocuments(limit);
        return documents
                .stream().map(this::convertToDocumentResponse).toList();
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
            documents = switch (filterRequestDTO.getOrder().toLowerCase()) {
//                case "most-viewed" -> documents.stream()
//                        .filter(document -> document.getViewsCount() > 0 && document.getScope().equals("public"))
//                        .sorted(Comparator.comparing(Document::getViewsCount).reversed())
//                        .collect(Collectors.toList());
                case "most-downloaded" -> documents.stream()
                        .filter(document -> document.getDownloadsCount() > 0 && document.getScope().equals("public"))
                        .sorted(Comparator.comparing(Document::getDownloadsCount).reversed())
                        .collect(Collectors.toList());
                default -> documents
                        .stream()
                        .filter(document -> document.getScope().equals("public"))
                        .sorted(Comparator.comparing(Document::getId).reversed())
                        .collect(Collectors.toList());
            };
        } else {
            documents = documents
                    .stream()
                    .filter(document -> document.getScope().equals("public"))
                    .sorted(Comparator.comparing(Document::getId).reversed())
                    .collect(Collectors.toList());
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
    public List<DocumentResponseDTO> getDocumentsByAuthor(Long id) {
        User existingUser = userService.getUserByStaffCode(id.toString());
        List<Document> documents = documentRepository.findAllByAuthorId(existingUser.getId());
        return documents.stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public int getDocumentsCountBySpecialized(Long id) {
        return documentRepository.findAllBySpecializedId(id);
    }

//    @Override
//    public int getTotalViewsByAuthor(Long authorId) {
//        User existingUser = userService.getUserByStaffCode(authorId.toString());
//        List<Document> documents = documentRepository.findAllByAuthorId(existingUser.getId());
//        if (documents.isEmpty()) {
//            return 0;
//        }
//        return documents.stream().mapToInt(Document::getViewsCount).sum();
//    }

    @Override
    public int getTotalDownloadsByAuthor(Long authorId) {
        User existingUser = userService.getUserByStaffCode(authorId.toString());
        List<Document> documents = documentRepository.findAllByAuthorId(existingUser.getId());
        if (documents.isEmpty()) {
            return 0;
        }
        return documents.stream().mapToInt(Document::getDownloadsCount).sum();
    }

    @Override
    public int getDocumentsCountByAuthor(Long authorId) {
        User existingUser = userService.getUserByStaffCode(authorId.toString());
        List<Document> documents = documentRepository.findAllByAuthorId(existingUser.getId());
        return documents.size();
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
//                .views(document.getViewsCount())
                .download(document.getDownloadsCount())
                .user_upload(userUpload)
                .author(document.getAuthor())
                .status(document.getStatus())
                .scope(document.getScope())
                .category(document.getCategory())
                .upload_date(document.getUploadDate())
                .is_delete(document.isDelete())
                .deleted_at(document.getDeleteDate())
                .subject(document.getSubject())
                .path(document.getPath())
                .thumbnail(document.getThumbnail())
                .pages(document.getPages())
                .description(document.getDescription())
                .document_type(document.getDocumentType())
                .document_size(document.getDocumentSize())
                .build();
    }

    @Override
    public List<DocumentResponseDTO> getDraftDocument() {
        return documentRepository.findDraftDocuments().stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponseDTO> getPublishedDocument() {
        // filter the document is not deleted
        return documentRepository.findPublishedDocuments()
                .stream()
                .map(this::convertToDocumentResponse)
                .toList();
    }

    @Override
    public String AcceptDocument(Long id) throws IOException {
        try {
            Document document = documentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
            if (document.getStatus().equalsIgnoreCase("published")) {
                throw new ResourceNotFoundException("Document has published");
            }
            document.setStatus("published");
            documentRepository.save(document);
            return "Accept Document with id: " + id + " success";
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method Accept Docs: " + e.getMessage());
        }
    }

    @Override
    public String AcceptListDocument(List<Long> ids) throws IOException {
        try {
            for (Long id : ids) {
                Document document = documentRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));
                if (document.getStatus().equalsIgnoreCase("published")) {
                    throw new ResourceNotFoundException("Document has published");
                }
                document.setStatus("published");
                documentRepository.save(document);

            }
            return "Accept Document with id: " + ids + " success";
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method Accept Docs: " + e.getMessage());
        }
    }

    @Override
    public List<Monthly> countDocumentsMonthly(int year) {
        try {
            return documentRepository.countDocumentsMonthly(year);
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Docs: " + e.getMessage());
        }
    }

    @Override
    public int countDocumentsToday() {
        try {
            return documentRepository.countDocumentsToday();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Docs: " + e.getMessage());
        }
    }

    @Override
    public int countPublishedDocuments() {
        try {
            return documentRepository.countPublishedDocuments();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Docs: " + e.getMessage());
        }
    }

    @Override
    public int countDraftDocuments() {
        try {
            return documentRepository.countDraftDocuments();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Docs: " + e.getMessage());
        }
    }

    @Override
    public List<TypeRes> countDocumentsByType(int year) {
        try {
            return documentRepository.countDocumentsByType(year);
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Docs: " + e.getMessage());
        }
    }

    @Override
    public List<DocumentResponseDTO> getTop3Documents() {
        try {
            return documentRepository.getTop3Docs()
                    .stream()
                    .map(this::convertToDocumentResponse).toList();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Docs: " + e.getMessage());
        }
    }

    @Override
    public List<DocumentResponseDTO> getPaginationDocs(int page) {
        try {
            int pageSize = 10;
            int offset = (page - 1) * pageSize;
            return documentRepository.getPaginationDocuments(offset).stream().map(this::convertToDocumentResponse)
                    .toList();

        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method pagination Docs: " + e.getMessage());
        }
    }

    @Override
    public Document getDocumentById(Long documentId) {
        return documentRepository.findById(documentId).orElseThrow(() -> new ResourceNotFoundException("Document not found"));
    }

    @Override
    public List<Document> findDocumentsWithMostDownloads(int limit) {
        return documentRepository.findDocumentsWithMostDownloads(limit);
    }

    @Override
    public boolean deleteDocumentById(Long id) {
        try {
            Document document = documentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Document not found"));

            String path = document.getPath();
            File file = new File(path);

            if (file.isFile() && !document.isDelete()) {
                // boolean deleted = file.delete();
                // if (!deleted) {
                // return "Delete file failed";
                // } else {
                // }
                document.setDeleteDate(LocalDateTime.now());
                document.setDelete(true);
                documentRepository.save(document);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method delete document " + e.getMessage());

        }
    }

    @Override
    public List<DocumentResponseDTO> getDeletedDocument() {
        try {
            return documentRepository.getDeleteDocuments()
                    .stream()
                    .map(this::convertToDocumentResponse)
                    .toList();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method pagination Docs: " + e.getMessage());
        }
    }

    @Override
    public String recoveryDocument(List<Long> ids) throws IOException {
        try {
            for (Long id : ids) {
                Document document = documentRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));
                if (!document.isDelete()) {
                    throw new ResourceNotFoundException("Document has recovered");
                }
                document.setDelete(false);
                ;
                documentRepository.save(document);

            }
            return "Recovered Document successfully";
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method Recovered Docs: " + e.getMessage());
        }
    }
}
