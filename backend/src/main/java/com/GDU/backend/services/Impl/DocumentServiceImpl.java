package com.GDU.backend.services.Impl;

import com.GDU.backend.dtos.requests.FilterDTO;
import com.GDU.backend.dtos.requests.RecommendDTO;
import com.GDU.backend.dtos.requests.UploadDTO;
import com.GDU.backend.dtos.response.DocumentResponse;
import com.GDU.backend.exceptions.ResourceNotFoundException;
import com.GDU.backend.models.Category;
import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.models.Subject;
import com.GDU.backend.repositories.CategoryRepo;
import com.GDU.backend.repositories.DocumentRepository;
import com.GDU.backend.services.DocumentService;
import com.ironsoftware.ironpdf.PdfDocument;
import com.ironsoftware.ironpdf.edit.PageSelection;
import com.ironsoftware.ironpdf.image.ToImageOptions;
import com.itextpdf.text.pdf.PdfReader;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";
    private final DocumentRepository documentRepository;
    private final CategoryRepo categoryRepo;

    @Override
    public String uploadDocument(UploadDTO uploadDto) throws IOException {
        // Get the category and specialized from the UploadDto
        Category category = Category.builder().id((long) uploadDto.getCategory()).build();

        Specialized specialized = Specialized.builder().id((long) uploadDto.getSpecialized()).build();

        Subject subject = Subject.builder().id((long) uploadDto.getSubject()).build();

        PdfReader pdfReader = new PdfReader(uploadDto.getDocument().getInputStream());
        int numberOfPages = pdfReader.getNumberOfPages();
        String thumbnail = generateThumbnail(uploadDto.getDocument().getInputStream());

        // Create a new Document instance with the provided document information
        Document newDocument = Document.builder()
                .title(uploadDto.getTitle())
                .author(uploadDto.getAuthor())
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

        Category category = categoryRepo.findById((long) uploadDTO.getCategory()).orElse(null);
        // Update document
        existDocument
                .setCategory(category);
        existDocument.setAuthor(uploadDTO.getAuthor() != null ? uploadDTO.getAuthor() : existDocument.getAuthor());
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
                filterDTO.getCategoryName()
        );
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

    @Override
    public DocumentResponse getDocumentThisYear() {
        try {
            Integer numberOfDocsThisYear = documentRepository.getNumberOfDocumentsThisYear();
            Integer numberOfDocsPreYear = documentRepository.getNumberOfDocumentPreviousYear();
            float percentage = ((float) ((numberOfDocsThisYear - numberOfDocsPreYear) * 100)) / numberOfDocsPreYear;
            if (numberOfDocsPreYear == 0) {
                percentage = 100;
            }
            float roundedPercentage = Math.round(percentage * 100.0f) / 100.0f;
            return DocumentResponse.builder()
                    .totalDocumentsCurrent(numberOfDocsThisYear)
                    .totalDocumentsPrev(numberOfDocsPreYear).percentage(roundedPercentage).build();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Unimplemented method 'getDocumentThisYear'" + e.getMessage());
        }
    }

//    @Override
//    public DocumentResponse getDocumentThisMonth() {
//        try {
//            Integer numberOfDocsThisMonth = documentRepository.getNumberOfDocumentsThisMonth();
//            Integer numberOfDocsPreMonth = documentRepository.getNumberOfDocumentPreviousMonth();
//            float percentage = ((float) ((numberOfDocsThisMonth - numberOfDocsPreMonth) * 100)) / numberOfDocsPreMonth;
//            if (numberOfDocsPreMonth == 0) {
//                percentage = 100;
//            }
//            float roundedPercentage = Math.round(percentage * 100.0f) / 100.0f;
//            return DocumentResponse.builder()
//                    .totalDocumentsCurrent(numberOfDocsThisMonth)
//                    .totalDocumentsPrev(numberOfDocsPreMonth).percentage(roundedPercentage).build();
//        } catch (Exception e) {
//            throw new UnsupportedOperationException("Unimplemented method 'getDocumentThisMonth'");
//        }
//    }

}
