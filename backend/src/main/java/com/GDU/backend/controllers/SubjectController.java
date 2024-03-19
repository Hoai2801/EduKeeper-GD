package com.GDU.backend.controllers;

import com.GDU.backend.services.Impl.SubjectServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectServiceImpl subjectService;

    @PostMapping("/new/{name}")
    public String createSubject(@PathVariable("name") String subjectName) {
        System.out.println(subjectName);
        return subjectService.createSubject(subjectName);
    }
}
