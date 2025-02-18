package com.faculty.catalog.controllers;

import com.faculty.catalog.models.Grade;
import com.faculty.catalog.repositories.GradeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "origins = \"http://localhost:8080\"")
public class GradeController {
    private final GradeRepository gradeRepository;

    public GradeController(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    @GetMapping("/{courseId}")
    public List<Grade> getGradesByCourse(@PathVariable Long courseId) {
        return gradeRepository.findByCourseId(courseId);
    }

    @PostMapping
    public ResponseEntity<Grade> addGrade(@RequestBody Grade grade) {
        return ResponseEntity.ok(gradeRepository.save(grade));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grade> updateGrade(@PathVariable Long id, @RequestBody Grade newGrade) {
        return gradeRepository.findById(id).map(grade -> {
            grade.setGrade(newGrade.getGrade());
            return ResponseEntity.ok(gradeRepository.save(grade));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
        if (gradeRepository.existsById(id)) {
            gradeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


}
