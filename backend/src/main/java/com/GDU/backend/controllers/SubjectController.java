package com.GDU.backend.controllers;

import com.GDU.backend.services.Impl.SubjectServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/subject")
@RequiredArgsConstructor
@Deprecated
public class SubjectController {
    private final SubjectServiceImpl subjectService;

    @PostMapping("/{name}")
    @ResponseStatus(HttpStatus.CREATED)
    public String createSubject(@PathVariable("name") String subjectName) {
        return subjectService.createSubject(subjectName);
    }
}
