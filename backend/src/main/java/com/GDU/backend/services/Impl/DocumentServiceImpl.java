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
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.text.StringEscapeUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import java.text.Normalizer;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
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
    private final SpecializedRepository specializedRepository;
    private final SettingRepository settingRepository;
    @Autowired
    private EntityManager entityManager;

    @Override
    public ResponseEntity<String> uploadDocument(UploadRequestDTO uploadRequestDTO) throws IOException {
        Category category = categoryRepository.findById(uploadRequestDTO.getCategory())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Specialized specialized = specializedRepository.findById(uploadRequestDTO.getSpecialized())
                .orElseThrow(() -> new ResourceNotFoundException("Specialized not found"));

        Subject subject = subjectRepository.findById(uploadRequestDTO.getSubject())
                .orElse(null);

        User userUpload = userService.getUserByStaffCode(uploadRequestDTO.getUserUpload());
        // generate file name and path
        String fileName = System.currentTimeMillis() + "_" + uploadRequestDTO.getDocument().getOriginalFilename();
        File destFile = new File(UPLOAD_DIR + fileName);

        // save file
        MultipartFile multipartFile = uploadRequestDTO.getDocument();
        Path uploadDir = Paths.get(UPLOAD_DIR);
        Files.createDirectories(uploadDir);
        Files.copy(multipartFile.getInputStream(), destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

        int numberOfPages = calculateNumberOfPages(uploadRequestDTO.getDocument().getInputStream());
        String thumbnail = generateThumbnail(uploadRequestDTO.getDocument().getInputStream());
        System.out.println(thumbnail);
        String downloadFileName = null;
        // file download
        if (!Objects.equals(uploadRequestDTO.getDocument().getOriginalFilename(),
                uploadRequestDTO.getDocumentDownload().getOriginalFilename())
                && !Objects.equals(uploadRequestDTO.getDocument().getContentType(),
                        uploadRequestDTO.getDocumentDownload().getContentType())) {
            // save file
            downloadFileName = System.currentTimeMillis() + "_"
                    + uploadRequestDTO.getDocumentDownload().getOriginalFilename();
            File downloadFile = new File(UPLOAD_DIR + downloadFileName);
            MultipartFile downloadFileMultipart = uploadRequestDTO.getDocumentDownload();
            Files.createDirectories(uploadDir);
            Files.copy(downloadFileMultipart.getInputStream(), downloadFile.toPath(),
                    StandardCopyOption.REPLACE_EXISTING);
        } else {
            downloadFileName = fileName;
        }

        Document newDocument = Document.builder()
                .title(uploadRequestDTO.getTitle())
                .author(uploadRequestDTO.getAuthor())
                .userUpload(userUpload)
                .slug(createSlug(uploadRequestDTO.getTitle()))
                .path(fileName)
                .documentType(uploadRequestDTO.getDocument().getContentType())
                .documentDownload(downloadFileName)
                .scope(uploadRequestDTO.getScope())
                .downloadFileType(uploadRequestDTO.getDocumentDownload().getContentType())
                .documentSize(uploadRequestDTO.getDocument().getSize() / 1_000_000)
                .description(uploadRequestDTO.getDescription())
                .specialized(specialized)
                .pages(numberOfPages)
                .category(category)
                .thumbnail(thumbnail)
                .subject(subject)
                .uploadDate(LocalDate.now())
                .build();

        // get auto accept document setting
        settingRepository.findById(1L).ifPresent(setting -> {
            if (setting.getValue().equals("true")) {
                newDocument.setStatus("published");
            } else {
                newDocument.setStatus("draft");
            }
        });

        documentRepository.save(newDocument);

        // create notification
        NotificationDTO notificationDTO = NotificationDTO.builder()
                .sender(userUpload.getStaffCode())
                .receiver("22140044")
                .content("Một tài liệu đã được đăng bởi " + userUpload.getStaffCode())
                .document(newDocument.getSlug())
                .title("Tài liệu mới")
                .build();
        notificationService.send(notificationDTO);
        return ResponseEntity.ok("Đăng tài liệu thành công");
    }

    private int calculateNumberOfPages(InputStream inputStream) throws IOException {
        try (PDDocument document = PDDocument.load(inputStream)) {
            return document.getNumberOfPages();
        }
    }

    // private String createSlug(String title) {
    // title = StringEscapeUtils.escapeHtml4(title);
    // String slug = title.replaceAll("[^a-zA-Z0-9\\s]", "");
    // slug = slug.replaceAll("\\s+", "-");
    // return slug.toLowerCase() + "-" + System.currentTimeMillis();
    // }

    private String createSlug(String title) {

        // Normalize and remove diacritics
        String normalizedTitle = Normalizer.normalize(title, Normalizer.Form.NFD);
        String slug = normalizedTitle.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");

        // Remove all non-alphanumeric characters except spaces
        slug = slug.replaceAll("[^a-zA-Z0-9\\s]", "");

        // Replace spaces with hyphens
        slug = slug.replaceAll("\\s+", "-");

        // Convert to lowercase
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

            // Ensure the directory exists
            File directory = new File(url);
            if (!directory.exists()) {
                boolean dirsCreated = directory.mkdirs();
                if (!dirsCreated) {
                    throw new IOException("Failed to create directories: " + url);
                }
            }

            // Write the image to the file
            File thumbnailFile = new File(thumbnailPath);
            boolean result = ImageIO.write(image, "PNG", thumbnailFile);
            if (!result) {
                throw new IOException("Failed to write image to file: " + thumbnailPath);
            }

            return fileName;
        } catch (IOException e) {
            log.error("Error generating thumbnail: {}", e.getMessage());
            throw e; // Rethrow the exception to handle it in the calling method
        }
    }

    @Override
    public String updateDocumentById(Long id, UploadRequestDTO uploadRequestDTO) throws IOException {
        Document existDocument = documentRepository.findById(id).orElse(null);
        if (existDocument == null) {
            return "Document not existing";
        }

        User userUpload = userService.getUserByStaffCode(uploadRequestDTO.getUserUpload());
        if (userUpload == null) {
            return "User not existing";
        }
        if (!existDocument.getDocumentDownload().equals(uploadRequestDTO.getDocumentDownload().getOriginalFilename())) {
            if (!existDocument.getPath().equals(uploadRequestDTO.getDocumentDownload().getOriginalFilename())) {
                if (Files.exists(Paths.get(UPLOAD_DIR + existDocument.getDocumentDownload()))) {
                    Files.delete(Paths.get(UPLOAD_DIR + existDocument.getDocumentDownload()));
                }
            }
            Path uploadDir = Paths.get(UPLOAD_DIR);
            String downloadFileName = System.currentTimeMillis() + "_"
                    + uploadRequestDTO.getDocumentDownload().getOriginalFilename();
            File downloadFile = new File(UPLOAD_DIR + downloadFileName);
            MultipartFile downloadFileMultipart = uploadRequestDTO.getDocumentDownload();
            Files.createDirectories(uploadDir);
            Files.copy(downloadFileMultipart.getInputStream(), downloadFile.toPath(),
                    StandardCopyOption.REPLACE_EXISTING);

            existDocument.setDocumentDownload(downloadFileName);
            existDocument.setDownloadFileType(uploadRequestDTO.getDocumentDownload().getContentType());
            existDocument.setDocumentSize(uploadRequestDTO.getDocumentDownload().getSize() / 1_000_000);
        }
        existDocument.setUserUpload(userUpload);

        Category category = categoryRepository.findById(uploadRequestDTO.getCategory()).orElse(null);
        existDocument.setCategory(category);
        existDocument.setAuthor(uploadRequestDTO.getAuthor());
        existDocument.setDescription(uploadRequestDTO.getDescription());
        existDocument.setScope(uploadRequestDTO.getScope());
        existDocument.setTitle(uploadRequestDTO.getTitle());
        existDocument.setSlug(createSlug(uploadRequestDTO.getTitle()));
        // get auto accept document setting
        settingRepository.findById(2L).ifPresent(setting -> {
            if (setting.getValue().equals("true")) {
                existDocument.setStatus("published");
            } else {
                existDocument.setStatus("draft");
            }
        });
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
        return documents.stream()
                .map(this::convertToDocumentResponse)
                .toList();
    }

    @Override
    public List<DocumentResponseDTO> getRecommendedDocuments(RecommendationRequestDTO recommendationRequestDTO) {
        return documentRepository.getDocumentsSuggested(
                recommendationRequestDTO.getSpecialized(),
                recommendationRequestDTO.getCategory(),
                recommendationRequestDTO.getTitle(),
                recommendationRequestDTO.getAuthor())
                .stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponseDTO> filterDocuments(FilterRequestDTO filterRequestDTO) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Document> cq = cb.createQuery(Document.class);
        Root<Document> document = cq.from(Document.class);
        List<Predicate> predicates = new ArrayList<>();
        System.out.println(filterRequestDTO);
        if (filterRequestDTO.getSubjectName() != null && !filterRequestDTO.getSubjectName().isEmpty()) {
            Join<Document, Subject> subject = document.join("subject");
            predicates.add(cb.equal(subject.get("subjectSlug"), filterRequestDTO.getSubjectName()));
        } else if (filterRequestDTO.getSpecializedSlug() != null && !filterRequestDTO.getSpecializedSlug().isEmpty()) {
            Join<Document, Specialized> specialized = document.join("specialized");
            predicates.add(cb.equal(specialized.get("specializedSlug"), filterRequestDTO.getSpecializedSlug()));
        } else if (filterRequestDTO.getDepartmentSlug() != null && !filterRequestDTO.getDepartmentSlug().isEmpty()) {
            Join<Document, Specialized> specialized = document.join("specialized");
            Join<Specialized, Department> department = specialized.join("department");
            predicates.add(cb.equal(department.get("departmentSlug"), filterRequestDTO.getDepartmentSlug()));
        }

        if (filterRequestDTO.getSearchTerm() != null && !filterRequestDTO.getSearchTerm().isEmpty()) {
            Predicate searchTermPredicate = cb.or(
                    cb.like(document.get("title"), "%" + filterRequestDTO.getSearchTerm() + "%"),
                    cb.like(document.get("description"), "%" + filterRequestDTO.getSearchTerm() + "%"));
            predicates.add(searchTermPredicate);
        }

        if (filterRequestDTO.getCategoryName() != null && !filterRequestDTO.getCategoryName().isEmpty()) {
            Join<Document, Category> category = document.join("category");
            predicates.add(cb.equal(category.get("categorySlug"), filterRequestDTO.getCategoryName()));
        }

        if (filterRequestDTO.getPublishYear() != null && !filterRequestDTO.getPublishYear().isEmpty()) {
            int year = Integer.parseInt(filterRequestDTO.getPublishYear());
            LocalDate startOfYear = LocalDate.of(year, 1, 1);
            LocalDate endOfYear = LocalDate.of(year, 12, 31);
            predicates.add(cb.between(document.get("uploadDate"), startOfYear, endOfYear));
        }

        cq.where(predicates.toArray(new Predicate[0]));
        TypedQuery<Document> query = entityManager.createQuery(cq);
        List<Document> documents = query.getResultList();
        System.out.println(documents);

        // Sort documents
        if (filterRequestDTO.getOrder() != null) {
            documents = switch (filterRequestDTO.getOrder().toLowerCase()) {
                case "most-downloaded" -> documents.stream()
                        .filter(aDocument -> aDocument.getDownloadsCount() > 0 && (aDocument.getScope().equals("public")
                                || aDocument.getScope().equals("student-only")) && !aDocument.isDelete())
                        .sorted(Comparator.comparing(Document::getDownloadsCount).reversed())
                        .collect(Collectors.toList());
                case "most-viewed" -> documents.stream()
                        .filter(aDocument -> aDocument.getViewsCount() > 0 && (aDocument.getScope().equals("public")
                                || aDocument.getScope().equals("student-only")) && !aDocument.isDelete())
                        .sorted(Comparator.comparing(Document::getViewsCount).reversed())
                        .collect(Collectors.toList());
                default -> documents
                        .stream()
                        .filter(aDocument -> (aDocument.getScope().equals("public")
                                || aDocument.getScope().equals("student-only")) && !aDocument.isDelete())
                        .sorted(Comparator.comparing(Document::getId).reversed())
                        .collect(Collectors.toList());
            };
        } else {
            documents = documents
                    .stream()
                    .filter(aDocument -> aDocument.getScope().equals("public")
                            || aDocument.getScope().equals("student-only") && !aDocument.isDelete())
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
    public int getDocumentsCountByAuthor(String staffCode) {
        User existingUser = userService.getUserByStaffCode(staffCode);
        List<Document> documents = documentRepository.findAllByAuthorId(existingUser.getId());
        return documents.size();
    }

    public DocumentResponseDTO convertToDocumentResponse(Document document) {
        // only need show name of user
        UserResponse userUpload = UserResponse.builder()
                .id(document.getUserUpload().getId())
                .username(document.getUserUpload().getName())
                .staffCode(document.getUserUpload().getStaffCode())
                .avatar(document.getUserUpload().getAvatar())
                .build();
        return DocumentResponseDTO.builder()
                .id(document.getId())
                .title(document.getTitle())
                .slug(document.getSlug())
                .download(document.getDownloadsCount())
                .views(document.getViewsCount())
                .user_upload(userUpload)
                .author(document.getAuthor())
                .status(document.getStatus())
                .scope(document.getScope())
                .file_download(document.getDocumentDownload())
                .download_file_type(document.getDownloadFileType())
                .specialized(document.getSpecialized())
                .department(document.getSpecialized().getDepartment())
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
        return documentRepository.findDraftDocuments()
                .stream()
                .map(this::convertToDocumentResponse)
                .toList();
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
                NotificationDTO notification = NotificationDTO.builder()
                        .receiver(document.getUserUpload().getStaffCode())
                        .sender("22140044")
                        .created_at(LocalDateTime.now())
                        .document(document.getSlug())
                        .title("Tài liệu của bạn đã được duyệt")
                        .content("Tài liệu " + document.getTitle() + " đã được duyệt")
                        .build();
                notificationService.send(notification);
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
    public List<DocumentResponseDTO> getTop10Documents() {
        try {
            return documentRepository.getTop10Docs()
                    .stream()
                    .map(this::convertToDocumentResponse)
                    .toList();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Docs: " + e.getMessage());
        }
    }

    @Override
    public List<DocumentResponseDTO> getPaginationDocs(int page) {
        try {
            int pageSize = 10;
            int offset = (page - 1) * pageSize;
            return documentRepository.getPaginationDocuments(offset)
                    .stream()
                    .map(this::convertToDocumentResponse)
                    .toList();

        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method pagination Docs: " + e.getMessage());
        }
    }

    @Override
    public Document getDocumentById(Long documentId) {
        return documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
    }

    @Override
    public List<Document> getTop10DocumentsWithMostDownloadsByDepartment(int departmentId) {
        return documentRepository.findDocumentsWithMostDownloads(departmentId);
    }

    @Override
    public boolean deleteDocumentById(Long id) {
        try {
            Document document = documentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Document not found"));

            String path = document.getPath();
            File file = new File(path);

            if (file.isFile() && !document.isDelete()) {
                document.setDeleteDate(LocalDateTime.now());
                document.setDelete(true);
                NotificationDTO notification = NotificationDTO.builder()
                        .receiver(document.getUserUpload().getStaffCode())
                        .sender("22140044")
                        .created_at(LocalDateTime.now())
                        .document(null)
                        .title("Tài liệu của bạn đã bị gỡ bởi hệ thống")
                        .content("Tài liệu " + document.getTitle() + " đã bị gỡ")
                        .build();
                notificationService.send(notification);
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
                document.setDeleteDate(null);
                documentRepository.save(document);

            }
            return "Recovered Document successfully";
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method Recovered Docs: " + e.getMessage());
        }
    }

    @Override
    public int getTotalViewsByAuthor(String staffCode) {
        return documentRepository.getTotalViewsByAuthor(staffCode);
    }
}
