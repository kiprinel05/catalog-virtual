package com.faculty.catalog.repositories;

import com.faculty.catalog.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}