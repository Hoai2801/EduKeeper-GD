package com.GDU.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Year;
import java.util.Calendar;
import java.util.Date;

@RestController
@RequestMapping("api/v1/home")
public class HomeController {

    // for benmarking 
    @GetMapping
    public String home() {
        return String.format("Today is " + Calendar.DATE + "/" + Calendar.MONTH + "/" + Year.now().getValue());
    }
}
