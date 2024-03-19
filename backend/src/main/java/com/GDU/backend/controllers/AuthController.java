package com.GDU.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login/oauth2/code/google")
public class AuthController {

    String helloAuth() {
        return "Hello user";
    }
}
