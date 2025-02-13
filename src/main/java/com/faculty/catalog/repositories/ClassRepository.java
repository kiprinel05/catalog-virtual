package com.faculty.catalog.repositories;

import com.faculty.catalog.models.Class;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<Class, Long> {
}