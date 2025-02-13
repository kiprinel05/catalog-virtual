package com.faculty.catalog.models;

import jakarta.persistence.*;

@Entity
@Table(name = "teachers")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNume() { return name; }
    public void setNume(String nume) { this.name = nume; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
