package com.example.apicurso.Services;

import com.example.apicurso.Models.Alumno;
import com.example.apicurso.Repositories.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumnoService {
    @Autowired
    private AlumnoRepository alumnoRepository;

    public List<Alumno> getAllAlumnos() {
        return alumnoRepository.findAll();
    }

    public Alumno getAlumnoById(Long id) {
        return alumnoRepository.findById(id).orElse(null);
    }

    public Alumno createAlumno(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    public Alumno updateAlumno(Long id, Alumno alumno) {
        alumno.setId(id);
        return alumnoRepository.save(alumno);
    }

    public void deleteAlumno(Long id) {
        alumnoRepository.deleteById(id);
    }
}