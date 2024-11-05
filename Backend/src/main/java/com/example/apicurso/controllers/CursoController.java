package com.example.apicurso.controllers;

import com.example.apicurso.Models.Alumno;
import com.example.apicurso.Models.Curso;
import com.example.apicurso.Services.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/cursos")
public class CursoController {
    @Autowired
    private CursoService cursoService;

    @GetMapping
    public List<Curso> getAllCursos() {
        return cursoService.getAllCursos();
    }

    @GetMapping("/{id}")
    public Curso getCursoById(@PathVariable Long id) {
        return cursoService.getCursoById(id);
    }

    @GetMapping("/fecha-fin/{fechaFin}")
    public List<Curso> getCursosPorFechaFin(@PathVariable LocalDate fechaFin) {
        return cursoService.getCursosPorFechaFin(fechaFin);
    }

    @PostMapping
    public Curso createCurso(@RequestBody Curso curso) {
        return cursoService.createCurso(curso);
    }

    @PutMapping("/{id}")
    public Curso updateCurso(@PathVariable Long id, @RequestBody Curso curso) {
        return cursoService.updateCurso(id, curso);
    }

    @DeleteMapping("/{id}")
    public void deleteCurso(@PathVariable Long id) {
        cursoService.deleteCurso(id);
    }
}
