package com.faculty.catalog.models;

import jakarta.persistence.*;

@Entity
@Table(name = "cursuri")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int credits;

    @ManyToOne
    @JoinColumn(name = "profesor_id")
    private Teacher teacher;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getname() { return name; }
    public void setname(String name) { this.name = name; }

    public int getCredits() { return credits; }
    public void setCredits(int credits) { this.credits = credits; }

    public Teacher getTeacher() { return teacher; }
    public void setProfesor(Teacher teacher) { this.teacher = teacher; }
}
