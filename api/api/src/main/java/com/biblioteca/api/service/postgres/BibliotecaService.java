package com.biblioteca.api.service.postgres;

import com.biblioteca.api.DTO.BibliotecaCadastroDTO;
import com.biblioteca.api.entity.postgres.Biblioteca;
import com.biblioteca.api.repository.postgres.BibliotecaRepository;

import java.util.List;

public class BibliotecaService {
    private final BibliotecaRepository repository;

    public BibliotecaService(BibliotecaRepository repository){
        this.repository = repository;
    }

    public Biblioteca salvar(BibliotecaCadastroDTO novaBiblioteca){
        Biblioteca biblioteca = new Biblioteca();

        biblioteca.setNome(novaBiblioteca.getNome());
        biblioteca.setRua(novaBiblioteca.getRua());
        biblioteca.setNumero(novaBiblioteca.getNumero());
        biblioteca.setBairro(novaBiblioteca.getBairro());
        biblioteca.setCidade(novaBiblioteca.getEstado());
        biblioteca.setEstado(novaBiblioteca.getEstado());

        return repository.save(biblioteca);
    }

    public List<Biblioteca> listarTodos(){
        return repository.findAll();
    }

    public Biblioteca buscarBiblioteca(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Biblioteca não encontrado"));
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Biblioteca não encontrado");
        }
        repository.deleteById(id);
    }
}
