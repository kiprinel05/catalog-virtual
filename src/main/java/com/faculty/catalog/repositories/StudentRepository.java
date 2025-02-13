package com.faculty.catalog.repositories;

import com.faculty.catalog.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}