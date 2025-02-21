package com.faculty.catalog.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @GetMapping("/custom-login")
    public String showLoginPage() {
        logger.info("Accessing /custom-login");
        return "login";
    }
}