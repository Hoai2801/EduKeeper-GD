package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FilterRequestDTO;
import com.GDU.backend.dtos.requests.NotificationDTO;
import com.GDU.backend.dtos.requests.RecommendationRequestDTO;
import com.GDU.backend.dtos.requests.UploadRequestDTO;
import com.GDU.backend.dtos.responses.*;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.*;
import com.GDU.backend.models.Document;
import com.GDU.backend.repositories.*;
import com.GDU.backend.services.DocumentService;
import com.GDU.backend.services.NotificationService;
import fr.opensagres.poi.xwpf.converter.xhtml.Base64EmbedImgManager;
import fr.opensagres.poi.xwpf.converter.xhtml.XHTMLConverter;
import fr.opensagres.poi.xwpf.converter.xhtml.XHTMLOptions;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.poi.hpsf.SummaryInformation;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.awt.*;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.*;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";
    private final DocumentRepository documentRepository;
    private final CategoryRepository categoryRepository;
    private final UserServiceImpl userService;
    private final SubjectRepository subjectRepository;
    private final NotificationService notificationService;
    private final SpecializedRepository specializedRepository;
    private final SettingRepository settingRepository;
    @Autowired
    private EntityManager entityManager;
    @Value("${admin-staff-code}")
    private String adminStaffCode;
    @Autowired
    private CacheManager cacheManager;

    private static final Logger logger = LoggerFactory.getLogger(DocumentService.class);
    
    @Override
    @CacheEvict(value = {
            "documentBySlug", 
            "mostDownloadedDocuments", 
            "latestDocuments", 
            "totalDocuments", 
            "totalDocumentsThisMonth",
            "totalDocumentsThisYear",
            "documentsBySpecialized",
            "documentsByAuthor",
            "totalDownloadsByAuthor",
            "documentToday",
            "publicDocument",
            "draftDocument"
    }, allEntries = true)
    public ResponseEntity<String> uploadDocument(UploadRequestDTO uploadRequestDTO) throws IOException {
        Category category = categoryRepository.findById(uploadRequestDTO.getCategory())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Specialized specialized = specializedRepository.findById(uploadRequestDTO.getSpecialized())
                .orElseThrow(() -> new ResourceNotFoundException("Specialized not found"));

        Subject subject = subjectRepository.findById(uploadRequestDTO.getSubject())
                .orElse(null);

        User userUpload = userService.getUserByStaffCode(uploadRequestDTO.getUserUpload());
        // save file
        String fileName = System.currentTimeMillis() + "_" + uploadRequestDTO.getDocument().getOriginalFilename();
        File destFile = new File(UPLOAD_DIR + fileName);
        MultipartFile multipartFile = uploadRequestDTO.getDocument();
        Path uploadDir = Paths.get(UPLOAD_DIR);
        Files.createDirectories(uploadDir);
        try (InputStream inputStream = multipartFile.getInputStream()) {
            Files.copy(inputStream, destFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        }
        Document newDocument = Document.builder()
                .title(uploadRequestDTO.getTitle())
                .author(uploadRequestDTO.getAuthor())
                .userUpload(userUpload)
                .slug(createSlug(uploadRequestDTO.getTitle()))
                .file(fileName)
                .status("draft")
                .documentType(uploadRequestDTO.getDocument().getContentType())
                .scope(uploadRequestDTO.getScope())
                .documentSize(uploadRequestDTO.getDocument().getSize() / 1_000_000)
                .description(uploadRequestDTO.getDescription())
                .specialized(specialized)
                .pages(0)
                .category(category)
                .isDelete(false)
                .subject(subject)
                .uploadDate(LocalDate.now())
                .build();
        System.out.println(uploadRequestDTO.getDocument().getContentType());
        // get auto accept document setting
        settingRepository.findById(1L).ifPresent(setting -> {
            if (setting.getValue().equals("true")) {
                newDocument.setStatus("published");
            } else {
                newDocument.setStatus("draft");
            }
        });

        documentRepository.save(newDocument);

        // use thread to convert document to html, because it takes time
        new Thread(() -> {
            try {
                processDocumentConversion(destFile, fileName, newDocument.getId());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).start();

        // create notification to admin
        NotificationDTO notificationDTO = NotificationDTO.builder()
                .sender(userUpload.getStaffCode())
                .receiver(adminStaffCode)
                .content("Một tài liệu đã được đăng bởi " + userUpload.getStaffCode())
                .document(newDocument.getSlug())
                .title("Tài liệu mới")
                .build();
        notificationService.send(notificationDTO);
        return ResponseEntity.ok("Đăng tài liệu thành công");
    }

    public void processDocumentConversion(File destFile, String fileName, Long documentId) throws IOException {
        int totalPages = 0;
        String thumbnail = "";
        String dir = "src/main/resources/static/convert/";
        if (!Files.exists(Paths.get(dir))) {
            Files.createDirectories(Paths.get(dir));
        }
        try {
            String originalFilename = destFile.getName();
            String outputDirPathOfHtml = "src/main/resources/static/convert/";
            String outputDirPathOfImage = "src/main/resources/static/images/";
            if (originalFilename.endsWith(".pdf")) {
                try (PDDocument document = PDDocument.load(destFile)) {
                    PDFRenderer pdfRenderer = new PDFRenderer(document);
                    StringBuilder htmlContent = new StringBuilder();
                    htmlContent.append("<html><body>");

                    for (int page = 0; page < document.getNumberOfPages(); page++) {
                        BufferedImage bim = pdfRenderer.renderImageWithDPI(page, 100); // Higher DPI for better quality
                        // set size of image
                        String slideName = fileName + "_page_" + (page + 1) + ".png";
                        String imagePath = outputDirPathOfImage + slideName;
                        ImageIO.write(bim, "png", new File(imagePath));
                        if (page == 0) {
                            thumbnail = slideName;
                        }
                        htmlContent.append("<img src='http://localhost:8080/api/v1/images/").append(slideName)
                                .append("' style=\"width: 100%; max-width: 100%;\" loading=\"lazy\" /><br/>");
                    }

                    htmlContent.append("</body></html>");

                    // Save the HTML content to a file
                    try (BufferedWriter writer = new BufferedWriter(
                            new FileWriter(outputDirPathOfHtml + fileName + ".html"))) {
                        writer.write(htmlContent.toString());
                    }

                    totalPages = document.getNumberOfPages();
                    System.out.println("PDF pages converted to images and HTML successfully!");

                } catch (IOException e) {
                    System.err.println("An error occurred while converting PDF to images and HTML: " + e.getMessage());
                }
            } else if (originalFilename.endsWith(".docx")) {
                XWPFDocument document = new XWPFDocument(new FileInputStream(destFile));
                XWPFWordExtractor extractor = new XWPFWordExtractor(document);
                totalPages = extractor.getExtendedProperties().getUnderlyingProperties().getPages();
                XHTMLOptions options = XHTMLOptions.create().setImageManager(new Base64EmbedImgManager());
                try (FileOutputStream out = new FileOutputStream(
                        "src/main/resources/static/convert/" + fileName + ".html")) {
                    XHTMLConverter.getInstance().convert(document, out, options);
                }
                document.close();
                injectFontStyle("src/main/resources/static/convert/" + fileName + ".html");
                System.out.println("Converted DOCX to HTML");
            } else if (originalFilename.endsWith(".doc")) {
                HWPFDocument doc = new HWPFDocument(new FileInputStream(destFile));
                SummaryInformation summaryInfo = doc.getSummaryInformation();
                totalPages = summaryInfo.getPageCount();
                WordToHtmlConverter wordToHtmlConverter = new WordToHtmlConverter(
                        DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument());
                wordToHtmlConverter.processDocument(doc);
                Transformer serializer = TransformerFactory.newInstance().newTransformer();
                serializer.setOutputProperty(OutputKeys.INDENT, "yes");
                serializer.setOutputProperty(OutputKeys.METHOD, "html");
                serializer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
                serializer.setOutputProperty(OutputKeys.DOCTYPE_PUBLIC, "-//W3C//DTD XHTML 1.0 Transitional//EN");
                serializer.setOutputProperty(OutputKeys.DOCTYPE_SYSTEM,
                        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd");
                serializer.transform(new DOMSource(wordToHtmlConverter.getDocument()),
                        new StreamResult(
                                new FileOutputStream("src/main/resources/static/convert/" + fileName + ".html")));
                System.out.println("Converted DOC to HTML");
            } else if (originalFilename.endsWith(".pptx") || originalFilename.endsWith(".ppt")) {
                XMLSlideShow ppt = new XMLSlideShow(new FileInputStream(destFile));
                Dimension pgsize = ppt.getPageSize();
                List<XSLFSlide> slides = ppt.getSlides();
                totalPages = slides.size();
                double scale = 0.5;
                int scaledWidth = (int) (pgsize.width * scale);
                int scaledHeight = (int) (pgsize.height * scale);
                StringBuilder htmlContent = new StringBuilder("<html><body>");
                for (XSLFSlide slide : slides) {
                    BufferedImage img = new BufferedImage(scaledWidth, scaledHeight, BufferedImage.TYPE_INT_RGB);
                    Graphics2D graphics = img.createGraphics();
                    graphics.scale(scale, scale);
                    graphics.setPaint(Color.white);
                    graphics.fill(new Rectangle2D.Float(0, 0, pgsize.width, pgsize.height));
                    slide.draw(graphics);
                    String imgFileName = fileName + "_slide_" + System.currentTimeMillis() + ".png";
                    thumbnail = imgFileName;
                    ImageIO.write(img, "png", new File("src/main/resources/static/images/" + imgFileName));
                    htmlContent.append("<img src='http://localhost:8080/api/v1/images/").append(imgFileName)
                            .append("' style='width:100%; height:auto;' loading='lazy'/><br>");
                }
                htmlContent.append("</body></html>");
                try (FileWriter htmlFile = new FileWriter("src/main/resources/static/convert/" + fileName + ".html")) {
                    htmlFile.write(htmlContent.toString());
                }
                ppt.close();
                System.out.println("Converted PPT to HTML");
            }
            System.out.println("Document conversion completed.");
        } catch (IOException | ParserConfigurationException | TransformerException e) {
            e.printStackTrace();
        }

        // Update the Document's totalPages and save to the database
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        document.setPages(totalPages);
        document.setThumbnail(thumbnail);
        documentRepository.save(document);
    }

    private static void injectFontStyle(String htmlFilePath) {
        try {
            // Load the HTML content
            String htmlContent = Files.readString(Paths.get(htmlFilePath));

            // Inject CSS style for Times New Roman font
            String style = "<meta charset=\"UTF-8\">";

            // Insert the style tag before the closing </head> tag
            htmlContent = htmlContent.replace("</head>", style + "</head>");

            // Write the modified HTML content back to the file
            java.nio.file.Files.writeString(java.nio.file.Paths.get(htmlFilePath), htmlContent);

            System.out.println("Font style injected successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

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

    @Override
    @CacheEvict(value = {
            "documentBySlug",
            "mostDownloadedDocuments",
            "latestDocuments",
            "totalDocuments",
            "totalDocumentsThisMonth",
            "totalDocumentsThisYear",
            "documentsBySpecialized",
            "documentsByAuthor",
            "totalDownloadsByAuthor",
            "documentToday",
            "publicDocument",
            "draftDocument"
    }, allEntries = true)
    public String updateDocumentById(Long id, UploadRequestDTO uploadRequestDTO) throws IOException {
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
    @Cacheable(value = "documentBySlug", key = "#slug", condition = "#slug != null")
    public DocumentResponseDTO getDocumentBySlug(String slug) {
        Document document = documentRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        return convertToDocumentResponse(document);
    }

    @Override
    @Cacheable(value = "mostDownloadedDocuments", key = "#limit")
    public List<DocumentResponseDTO> getMostDownloadedDocuments(int limit) {
        
        // only get document has download more than 0
        return documentRepository.getMostDownloadedDocuments(limit).stream()
                .filter(document -> !document.getDownloads().isEmpty())
                .map(this::convertToDocumentResponse)
                .toList();
    }

    @Override
    @Cacheable(value = "latestDocuments", key = "#limit")
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
                    recommendationRequestDTO.getAuthor()
                ).stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponseDTO> filterDocuments(FilterRequestDTO filterRequestDTO) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Document> cq = cb.createQuery(Document.class);
        Root<Document> document = cq.from(Document.class);
        List<Predicate> predicates = new ArrayList<>();
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
    @Cacheable("totalDocumentsThisYear")
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
    @Cacheable("totalDocumentsThisMonth")
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
    @Cacheable("totalDocuments")
    public int countAllDocuments() {
        return documentRepository.countAllDocuments();
    }

    @Override
    @Cacheable("documentsByAuthor")
    public List<DocumentResponseDTO> getDocumentsByAuthor(Long id) {
        User existingUser = userService.getUserByStaffCode(id.toString());
        List<Document> documents = documentRepository.findAllByAuthorId(existingUser.getId());
        return documents.stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    @Cacheable("documentsBySpecialized")
    public int getDocumentsCountBySpecialized(Long id) {
        return documentRepository.findAllBySpecializedId(id);
    }

    @Override
    @Cacheable("totalDownloadsByAuthor")
    public int getTotalDownloadsByAuthor(Long authorId) {
        User existingUser = userService.getUserByStaffCode(authorId.toString());
        List<Document> documents = documentRepository.findAllByAuthorId(existingUser.getId());
        if (documents.isEmpty()) {
            return 0;
        }
        return documents.stream().mapToInt(Document::getDownloadsCount).sum();
    }

    @Override
    @Cacheable("documentsByAuthor")
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
                .thumbnail(document.getThumbnail())
                .scope(document.getScope())
                .specialized(document.getSpecialized())
                .department(document.getSpecialized().getDepartment())
                .category(document.getCategory())
                .upload_date(document.getUploadDate())
                .is_delete(document.isDelete())
                .deleted_at(document.getDeleteDate())
                .subject(document.getSubject())
                .file(document.getFile())
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
    @CacheEvict(value = {
            "documentBySlug",
            "mostDownloadedDocuments",
            "latestDocuments",
            "totalDocuments",
            "totalDocumentsThisMonth",
            "totalDocumentsThisYear",
            "documentsBySpecialized",
            "documentsByAuthor",
            "totalDownloadsByAuthor",
            "documentToday",
            "publicDocument",
            "draftDocument"
    }, allEntries = true)
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
    @CacheEvict(value = {
            "documentBySlug",
            "mostDownloadedDocuments",
            "latestDocuments",
            "totalDocuments",
            "totalDocumentsThisMonth",
            "totalDocumentsThisYear",
            "documentsBySpecialized",
            "documentsByAuthor",
            "totalDownloadsByAuthor",
            "documentToday",
            "publicDocument",
            "draftDocument"
    }, allEntries = true)
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
    @Cacheable("documentToday")
    public int countDocumentsToday() {
        try {
            return documentRepository.countDocumentsToday();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Docs: " + e.getMessage());
        }
    }

    @Override
    @Cacheable("publicDocument")
    public int countPublishedDocuments() {
        try {
            return documentRepository.countPublishedDocuments();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method count Docs: " + e.getMessage());
        }
    }

    @Override
    @Cacheable("draftDocument")
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

            document.setDeleteDate(LocalDateTime.now());
            document.setDelete(true);
            NotificationDTO notification = NotificationDTO.builder()
                    .receiver(document.getUserUpload().getStaffCode())
                    .sender("22140044")
                    .created_at(LocalDateTime.now())
                    .document(document.getSlug())
                    .title("Tài liệu của bạn đã bị gỡ bởi hệ thống")
                    .content("Tài liệu " + document.getTitle() + " đã bị gỡ")
                    .build();
            notificationService.send(notification);
            documentRepository.save(document);
            return true;
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method delete document " + e.getMessage());

        }
    }

    @Override
    public List<DocumentResponseDTO> getDeletedDocument() {
        try {
            List<Document> list = documentRepository.getDeleteDocuments()
                    .stream()
                    .toList();
            // delete documents which be deleted more than 30 days
            LocalDateTime now = LocalDateTime.now();
            for (Document document : list) {
                if (document.getDeleteDate().plusDays(30).isBefore(now)) {
                    documentRepository.delete(document);
                }
            }

            return list
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