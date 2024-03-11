package com.GDU.backend.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/document")
@Log4j2

/** @deprecated */
@Deprecated
public class UploadController {
    
    // <-- example how to get document content -->
//    @PostMapping
//    public String uploadDocument(@ModelAttribute UploadDto uploadDto) throws IOException {
//        // convert file to byte[]
//        byte[] file = uploadDto.getDocument().getBytes();
//        PdfReader reader = new PdfReader(file);
//
//        // get number of page if necessary
////        int pages = reader.getNumberOfPages();
//        StringBuilder text = new StringBuilder();
//
//        // get content of the first page
//        text.append(PdfTextExtractor.getTextFromPage(reader, 1));
//
//        reader.close();
//        return text.toString();
//    }
//    
}
    