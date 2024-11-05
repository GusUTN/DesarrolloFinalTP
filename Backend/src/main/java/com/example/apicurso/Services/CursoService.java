package com.example.apicurso.Services;

import com.example.apicurso.Models.Alumno;
import com.example.apicurso.Models.Curso;
import com.example.apicurso.Repositories.AlumnoRepository;
import com.example.apicurso.Repositories.CursoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CursoService {
    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    public List<Curso> getAllCursos() {
        return cursoRepository.findAll();
    }

    public Curso getCursoById(Long id) {
        return cursoRepository.findById(id).orElse(null);
    }

    public List<Curso> getCursosPorFechaFin(LocalDate fechaFin) {
        return cursoRepository.findByFechaFin(fechaFin);
    }

    @Transactional
    public Curso createCurso(Curso curso) {
        if (curso.getAlumnos() != null && !curso.getAlumnos().isEmpty()) {
            List<Alumno> alumnos = curso.getAlumnos().stream()
                    .map(alumno -> alumnoRepository.findById(alumno.getId())
                            .orElseThrow(() -> new RuntimeException("Alumno no encontrado")))
                    .collect(Collectors.toList());
            curso.setAlumnos(alumnos);
        }
        return cursoRepository.save(curso);
    }

    public Curso updateCurso(Long id, Curso curso) {
        curso.setId(id);
        curso.setPrecio(curso.getPrecio());
        curso.setTema(curso.getTema());
        curso.setFechaFin(curso.getFechaFin());
        curso.setFechaInicio(curso.getFechaInicio());
        curso.setDocente(curso.getDocente());
        curso.setAlumnos(curso.getAlumnos());

        return cursoRepository.save(curso);
    }

    public void deleteCurso(Long id) {
        cursoRepository.deleteById(id);
    }
}