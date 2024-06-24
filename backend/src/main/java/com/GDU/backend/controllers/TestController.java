package com.GDU.backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {
    
    @GetMapping
    public String test(HttpServletRequest request) {
        System.out.println(request.getHeader("Authorization"));
        System.out.println(request);
        return "test";
    }
}