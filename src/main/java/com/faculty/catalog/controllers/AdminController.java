package com.faculty.catalog.controllers;

import com.faculty.catalog.models.Admin;
import com.faculty.catalog.models.Course;
import com.faculty.catalog.repositories.AdminRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminRepository adminRepository;

    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        if (admin.getUsername() == null || admin.getPassword() == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        Admin savedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }


}
