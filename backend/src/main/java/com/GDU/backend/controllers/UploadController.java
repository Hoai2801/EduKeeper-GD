package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.UploadDto;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.parser.PdfTextExtractor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/document")
@Log4j2
public class UploadController {
    
    @PostMapping
    public String uploadDocument(@ModelAttribute UploadDto uploadDto) throws IOException {
        // convert file to byte[]
        byte[] file = uploadDto.getDocument().getBytes();
        PdfReader reader = new PdfReader(file);
        
        // get number of page if nessessary
//        int pages = reader.getNumberOfPages();
        StringBuilder text = new StringBuilder();
        
        // get content of the first page
        text.append(PdfTextExtractor.getTextFromPage(reader, 1));

        reader.close();
        return text.toString();
    }
}
    