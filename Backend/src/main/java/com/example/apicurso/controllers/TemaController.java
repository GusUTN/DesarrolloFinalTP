package com.example.apicurso.controllers;

import com.example.apicurso.Models.Tema;
import com.example.apicurso.Services.TemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/temas")
public class TemaController {
    @Autowired
    private TemaService temaService;

    @GetMapping
    public List<Tema> getAllTemas() {
        return temaService.getAllTemas();
    }

    @GetMapping("/{id}")
    public Tema getTemaById(@PathVariable Long id) {
        return temaService.getTemaById(id);
    }

    @PostMapping
    public Tema createTema(@RequestBody Tema tema) {
        return temaService.createTema(tema);
    }

    @PutMapping("/{id}")
    public Tema updateTema(@PathVariable Long id, @RequestBody Tema tema) {
        return temaService.updateTema(id, tema);
    }

    @DeleteMapping("/{id}")
    public void deleteTema(@PathVariable Long id) {
        temaService.deleteTema(id);
    }
}
