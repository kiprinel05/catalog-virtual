package com.faculty.catalog.controllers;

import com.faculty.catalog.models.Teacher;
import com.faculty.catalog.repositories.TeacherRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professors")
@CrossOrigin(origins = "*")
public class ProfessorController {
    private final TeacherRepository teacherRepository;

    public ProfessorController(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @GetMapping
    public List<Teacher> getAllProfessors() {
        return teacherRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProfessor(@PathVariable Long id) {
        if (teacherRepository.existsById(id)) {
            teacherRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> addProfessor(@RequestBody Teacher professor) {
        if (professor.getName() == null || professor.getEmail() == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }
        Teacher savedProfessor = teacherRepository.save(professor);
        return ResponseEntity.ok(savedProfessor);
    }
}
