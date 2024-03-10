package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.UploadDto;
import com.GDU.backend.services.Impl.DocumentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController("api/v1/document")
@RequiredArgsConstructor
public class DocumentController {
    
    private final DocumentServiceImpl DocumentService;
    
    @PostMapping("")
    @ResponseStatus(HttpStatus.OK)
    public String uploadDocument(@ModelAttribute UploadDto uploadDto) {
        return DocumentService.uploadDocument(uploadDto);
    }
}
