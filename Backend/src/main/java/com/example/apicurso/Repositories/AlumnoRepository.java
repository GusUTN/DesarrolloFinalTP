package com.example.apicurso.Repositories;

import com.example.apicurso.Models.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
}
