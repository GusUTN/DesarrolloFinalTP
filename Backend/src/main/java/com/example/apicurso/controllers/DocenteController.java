package com.example.apicurso.controllers;

import com.example.apicurso.Models.Curso;
import com.example.apicurso.Models.Docente;
import com.example.apicurso.Services.DocenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/docentes")
public class DocenteController {
    @Autowired
    private DocenteService docenteService;

    @GetMapping
    public List<Docente> getAllDocentes() {
        return docenteService.getAllDocentes();
    }

    @GetMapping("/{id}")
    public Docente getDocenteById(@PathVariable Long id) {
        return docenteService.getDocenteById(id);
    }
    @GetMapping("/{id}/cursos")
    public List<Curso> getCursosByDocenteId(@PathVariable Long id) {
        return docenteService.getCursosByDocenteId(id);
    }

    @PostMapping
    public Docente createDocente(@RequestBody Docente docente) {
        return docenteService.createDocente(docente);
    }

    @PutMapping("/{id}")
    public Docente updateDocente(@PathVariable Long id, @RequestBody Docente docente) {
        return docenteService.updateDocente(id, docente);
    }

    @DeleteMapping("/{id}")
    public void deleteDocente(@PathVariable Long id) {
        docenteService.deleteDocente(id);
    }
}
