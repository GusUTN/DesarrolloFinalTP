package com.example.apicurso.Services;

import com.example.apicurso.Models.Tema;
import com.example.apicurso.Repositories.TemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemaService {
    @Autowired
    private TemaRepository temaRepository;

    public List<Tema> getAllTemas() {
        return temaRepository.findAll();
    }

    public Tema getTemaById(Long id) {
        return temaRepository.findById(id).orElse(null);
    }

    public Tema createTema(Tema tema) {
        return temaRepository.save(tema);
    }

    public Tema updateTema(Long id, Tema tema) {
        tema.setId(id);
        return temaRepository.save(tema);
    }

    public void deleteTema(Long id) {
        temaRepository.deleteById(id);
    }
}