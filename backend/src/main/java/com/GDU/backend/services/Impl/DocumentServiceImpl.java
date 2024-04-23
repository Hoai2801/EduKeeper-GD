package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FilterDTO;
import com.GDU.backend.dtos.requests.RecommendDTO;
import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.dtos.response.DocumentResponse;
import com.GDU.backend.dtos.response.TotalResponse;
import com.GDU.backend.dtos.response.UserResponse;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.*;
import com.GDU.backend.repositories.CategoryRepo;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.services.DocumentService;
import com.itextpdf.text.pdf.PdfReader;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
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
    private final DocumentRepository documentRepository;
    private final CategoryRepo categoryRepo;
    private final UserServiceImpl userService;

    @Override
    public String uploadDocument(UploadDTO uploadDto) throws IOException {
        // Get the category and specialized from the UploadDto
        Category category = Category.builder().id((long) uploadDto.getCategory()).build();
        Specialized specialized = Specialized.builder().id((long) uploadDto.getSpecialized()).build();

        Subject subject = Subject.builder().id((long) uploadDto.getSubject()).build();

        User author = userService.getUserByStaffCode(uploadDto.getAuthor());

        // get number of pages
        PdfReader pdfReader = new PdfReader(uploadDto.getDocument().getInputStream());
        int numberOfPages = pdfReader.getNumberOfPages();
        
        String thumbnail = generateThumbnail(uploadDto.getDocument().getInputStream());

        // Create a new Document instance with the provided document information
        Document newDocument = Document.builder()
                .title(uploadDto.getTitle())
                .author(author)
                .slug(createSlug(uploadDto.getTitle()))
                .document_type(uploadDto.getDocument().getContentType())
                // Calculate and set the document size in megabytes
                .document_size(uploadDto.getDocument().getSize() / 1_000_000)
                .subject(subject)
                .pages(numberOfPages)
                .category(category)
                .thumbnail(thumbnail)
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

    public static String createSlug(String title) {
        title = StringEscapeUtils.escapeHtml4(title);
        String slug = title.replaceAll("[^a-zA-Z0-9\\s]", "");
        slug = slug.replaceAll("\\s+", "-");
        slug = slug.toLowerCase();

        return slug + "-" + System.currentTimeMillis();
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
            e.printStackTrace();
            return null;
        }
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
        
        var newAuthor = userService.getUserByStaffCode(uploadDTO.getAuthor());
        if (newAuthor == null) {
            return "Author not existing";
        }
        existDocument.setAuthor(newAuthor);

        Category category = categoryRepo.findById((long) uploadDTO.getCategory()).orElse(null);
        // Update document
        existDocument.setCategory(category);
        existDocument.setTitle(uploadDTO.getTitle() != null ? uploadDTO.getTitle() : existDocument.getTitle());
        existDocument.setSlug(uploadDTO.getTitle() != null ? uploadDTO.getTitle().replace(" ", "-").toLowerCase()
                + "-" + new Date().getTime() : existDocument.getSlug());
        existDocument.setSpecialized(existDocument.getSpecialized());

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
    public DocumentResponse getDocumentBySlug(String slug) {
        return convertToDocumentResponse(documentRepository.getDocumentBySlug(slug));
    }

    @Override
    public List<DocumentResponse> getMostViewedDocuments(int limit) {
        return documentRepository.getMostViewedDocuments(limit)
                .stream()
                .filter(document -> document.getViews() > 0)
                .map(this::convertToDocumentResponse)
                .toList();
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
    public List<DocumentResponse> getMostDownloadedDocuments(int limit) {
        // only get document has download more than 0
        return documentRepository.getMostDownloadedDocuments(limit).stream()
                .filter(document -> document.getDownload() > 0)
                .map(this::convertToDocumentResponse)
                .toList();
    }

    @Override
    public List<DocumentResponse> getLastedDocuments(int limit) {
        return documentRepository.getLastedDocuments(limit)
                .stream().map(this::convertToDocumentResponse).toList();
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
    public List<DocumentResponse> getPopularDocumentsOfThisWeek() {
        return documentRepository.getPopularDocumentThisWeek()
                .stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponse> getPopularDocumentsOfThisMonth() {
        return documentRepository.getPopularDocumentThisMonth()
                .stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponse> getDocumentsSuggested(RecommendDTO recommendDTO) {
        // return list document which have a same specialized and category, title or
        // author
        return documentRepository.getDocumentsSuggested(
                recommendDTO.getSpecialized(), 
                recommendDTO.getCategory(),
                recommendDTO.getTitle(), 
                recommendDTO.getAuthor())
                .stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponse> getDocumentsByAuthorName(String authorName) {
        return documentRepository.getDocumentsByAuthorName(authorName)
                .stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponse> getDocumentsBySlugSpecialized(String slug) {
        return documentRepository.getDocumentsBySlugSpecialized(slug)
                .stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public List<DocumentResponse> getDocumentsByFilter(FilterDTO filterDTO) {
        List<Document> documents = documentRepository.getDocumentsByFilter(
                filterDTO.getDepartmentSlug(),
                filterDTO.getSearchTerm(),
                filterDTO.getSubjectName(),
                filterDTO.getSpecializedSlug(),
                filterDTO.getCategoryName()
        );
        if (filterDTO.getOrder() != null) {
            if (filterDTO.getOrder().equalsIgnoreCase("mostviewed")) {
                documents.sort(Comparator.comparing(Document::getViews).reversed());
            }
            if (filterDTO.getOrder().equalsIgnoreCase("mostdownloaded")) {
                // Filter documents with download > 0 first
                // Sort the filtered documents
                documents = documents.stream()
                        .filter(document -> document.getDownload() > 0).sorted(Comparator.comparing(Document::getDownload).reversed()).collect(Collectors.toList()); // Update documents with filtered and sorted list
            }
            if (filterDTO.getOrder().equalsIgnoreCase("lastest")) {
                documents.sort(Comparator.comparing(Document::getId).reversed());
            }
        } else {
            documents.sort(Comparator.comparing(Document::getId).reversed());
        }
        return documents.stream().map(this::convertToDocumentResponse).toList();
    }

    @Override
    public TotalResponse getDocumentThisYear() {
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
    public TotalResponse getDocumentThisMonth() {
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

    public DocumentResponse convertToDocumentResponse(Document document) {
        // only need show name of user
        UserResponse author = UserResponse.builder()
                .id(document.getAuthor().getId())
                .username(document.getAuthor().getName())
                .staffCode(document.getAuthor().getStaffCode())
                .build();
        return DocumentResponse.builder()
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
