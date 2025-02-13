package com.faculty.catalog.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cursuri")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nume;
    private int credite;

    @ManyToOne
    @JoinColumn(name = "profesor_id")
    private Teacher teacher;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNume() { return nume; }
    public void setNume(String nume) { this.nume = nume; }

    public int getCredite() { return credite; }
    public void setCredite(int credite) { this.credite = credite; }

    public Teacher getTeacher() { return teacher; }
    public void setProfesor(Teacher teacher) { this.teacher = teacher; }
}
