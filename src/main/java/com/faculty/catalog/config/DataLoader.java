package com.faculty.catalog.config;

import com.faculty.catalog.models.Admin;
import com.faculty.catalog.repositories.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            if (adminRepository.findByUsername("admin").isEmpty()) {
                Admin admin = new Admin();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("password")); // Parolă criptată
                adminRepository.save(admin);
                System.out.println("Admin created with username: admin and password: password");
            } else {
                System.out.println("Admin already exists.");
            }
        };
    }
}
