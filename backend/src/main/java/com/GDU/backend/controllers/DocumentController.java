package com.GDU.backend.controllers;

import com.GDU.backend.dtos.requests.UploadDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController("api/v1/document")
public class DocumentController {
    
    @PostMapping("")
    @ResponseStatus(HttpStatus.OK)
    public String uploadDocument(@RequestBody UploadDto uploadDto) {
        return null;
    }
}
