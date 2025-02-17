package com.faculty.catalog.controllers;

import com.faculty.catalog.models.Course;
import com.faculty.catalog.repositories.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
    @CrossOrigin(origins = "*")
public class CourseController {
    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        if (course.getName() == null || course.getCredits() <= 0) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.ok(savedCourse);
    }
}