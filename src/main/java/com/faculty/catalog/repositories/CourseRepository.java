package com.faculty.catalog.repositories;

import com.faculty.catalog.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}