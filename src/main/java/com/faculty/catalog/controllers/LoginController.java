package com.faculty.catalog.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/custom-login") // Evităm conflictul cu Spring Security
    public String showLoginPage() {
        return "login"; // Se referă la login.html
    }
}
