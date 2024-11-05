package com.example.apicurso.Repositories;

import com.example.apicurso.Models.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByFechaFin(LocalDate fechaFin);
    List<Curso> findByDocenteId(Long docenteId);
}