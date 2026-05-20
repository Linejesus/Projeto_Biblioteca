package com.biblioteca.api.service.postgres;

import com.biblioteca.api.DTO.AtualizarBibliotecaDTO;
import com.biblioteca.api.DTO.BibliotecaCadastroDTO;
import com.biblioteca.api.entity.neo4j.BibliotecaNode;
import com.biblioteca.api.entity.postgres.Biblioteca;
import com.biblioteca.api.repository.neo4j.BibliotecaNodeRepository;
import com.biblioteca.api.repository.postgres.BibliotecaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BibliotecaService {
    private final BibliotecaRepository repository;
    private final BibliotecaNodeRepository bibliotecaNoderepository;

    public BibliotecaService(BibliotecaRepository repository, BibliotecaNodeRepository bibliotecaNoderepository){
        this.repository = repository;
        this.bibliotecaNoderepository = bibliotecaNoderepository;
    }
    @Transactional("transactionManager")
    public Biblioteca salvar(BibliotecaCadastroDTO novaBiblioteca){
        Biblioteca biblioteca = new Biblioteca();

        biblioteca.setNome(novaBiblioteca.getNome());
        biblioteca.setRua(novaBiblioteca.getRua());
        biblioteca.setNumero(novaBiblioteca.getNumero());
        biblioteca.setBairro(novaBiblioteca.getBairro());
        biblioteca.setCidade(novaBiblioteca.getCidade());
        biblioteca.setEstado(novaBiblioteca.getEstado());

        Biblioteca salvo = repository.save(biblioteca);

        BibliotecaNode bibliotecaNode1 = new BibliotecaNode(salvo.getIdBiblioteca(), salvo.getNome());

        bibliotecaNoderepository.save(bibliotecaNode1);

        return salvo;
    }

    public List<Biblioteca> listarTodos(){
        return repository.findAll();
    }

    public Biblioteca buscarBiblioteca(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Biblioteca não encontrado"));
    }

    @Transactional
    public void deletar(Long id) {

        Biblioteca biblioteca = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Biblioteca não encontrada"));

        // remove do Neo4j
        bibliotecaNoderepository
                .deletarBibliotecaNode(id);

        // remove do Postgres
        repository.delete(biblioteca);
    }

    public Biblioteca atualizar(Long id, AtualizarBibliotecaDTO dadosAtualizados){

        Biblioteca biblioteca = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Biblioteca não encontrada"));

        biblioteca.setNome(dadosAtualizados.getNome());
        biblioteca.setEstado(dadosAtualizados.getEstado());
        biblioteca.setCidade(dadosAtualizados.getCidade());
        biblioteca.setBairro(dadosAtualizados.getBairro());
        biblioteca.setRua(dadosAtualizados.getRua());
        biblioteca.setNumero(dadosAtualizados.getNumero());

        return repository.save(biblioteca);

    }
}
