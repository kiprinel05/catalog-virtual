package com.faculty.catalog.controllers;

import com.faculty.catalog.models.Class;
import com.faculty.catalog.repositories.ClassRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {
    private final ClassRepository classRepository;

    public CourseController(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    @GetMapping
    public List<Class> getAllCourses() {
        return classRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        if (classRepository.existsById(id)) {
            classRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> addCourse(@RequestBody Class course) {
        if (course.getname() == null || course.getCredits() <= 0) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        Class savedCourse = classRepository.save(course);
        return ResponseEntity.ok(savedCourse);
    }
}