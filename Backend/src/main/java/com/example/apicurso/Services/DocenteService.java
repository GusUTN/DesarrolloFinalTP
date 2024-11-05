package com.example.apicurso.Services;

import com.example.apicurso.Models.Curso;
import com.example.apicurso.Models.Docente;
import com.example.apicurso.Repositories.CursoRepository;
import com.example.apicurso.Repositories.DocenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocenteService {
    @Autowired
    private DocenteRepository docenteRepository;

    @Autowired
    private CursoRepository cursoRepository;

    public List<Docente> getAllDocentes() {
        return docenteRepository.findAll();
    }

    public Docente getDocenteById(Long id) {
        return docenteRepository.findById(id).orElse(null);
    }
    public List<Curso> getCursosByDocenteId(Long docenteId) {
        return cursoRepository.findByDocenteId(docenteId); }

    public Docente createDocente(Docente docente) {
        return docenteRepository.save(docente);
    }

    public Docente updateDocente(Long id, Docente docente) {
        docente.setId(id);
        return docenteRepository.save(docente);
    }

    public void deleteDocente(Long id) {
        docenteRepository.deleteById(id);
    }
}