package com.biblioteca.api.service.mongo;

import com.biblioteca.api.DTO.ListarBibliotecaDTO;
import com.biblioteca.api.DTO.LivroResumoDTO;
import com.biblioteca.api.DTO.LivrosCadastroDTO;
import com.biblioteca.api.entity.mongo.Livro;
import com.biblioteca.api.entity.postgres.Biblioteca;
import com.biblioteca.api.repository.mongo.LivroRepository;
import com.biblioteca.api.repository.postgres.BibliotecaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final BibliotecaRepository bibliotecaRepository;
    private final LivroRepository livroRepository;

    public Livro salvar(LivrosCadastroDTO dto){
        bibliotecaRepository.findById(dto.getIdBiblioteca())
                .orElseThrow(() -> new RuntimeException("Biblioteca não encontrada"));

        Livro livro = Livro.builder()
                .idBiblioteca(dto.getIdBiblioteca())
                .titulo(dto.getTitulo())
                .anoPublicacao(dto.getAnoPublicacao())
                .autores(dto.getAutores())
                .generos(dto.getGeneros())
                .editora(dto.getEditora())
                .edicoes(dto.getEdicoes())
                .tags(dto.getTags())
                .avaliacaoMedia(dto.getAvaliacaoMedia())
                .numeroPaginas(dto.getNumeroPaginas())
                .idioma(dto.getIdioma())
                .build();

        return livroRepository.save(livro);
    }

    public List<ListarBibliotecaDTO> buscarBibliotecaDisponivel(String titulo) {

        List<Livro> livros = livroRepository.findByTitulo(titulo);

        if (livros.isEmpty()) {
            throw new RuntimeException("Livro não encontrado");
        }

        Set<Long> idsBibliotecas = livros.stream()
                .map(Livro::getIdBiblioteca)
                .collect(Collectors.toSet());

        List<Biblioteca> bibliotecas = bibliotecaRepository.findAllById(idsBibliotecas);

        return bibliotecas.stream()
                .map(b -> new ListarBibliotecaDTO(
                        b.getNome(),
                        b.getRua(),
                        b.getNumero()
                ))
                .collect(Collectors.toList());
    }

    public Livro buscarLivro(String Id){
        Livro livro = livroRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        return livro;
    }

    public List<LivroResumoDTO> buscarLivrosCategoria(String categoria){
        List<Livro> livros = livroRepository
                .findTop7ByTagsContaining(categoria);

        return livros.stream()
        .map(l -> new LivroResumoDTO(
                l.getTitulo(),
                l.getAutores()
        ))
        .collect(Collectors.toList());
    }

    public List<LivroResumoDTO> buscarLivrosAutor(String autor){
        List<Livro> livros = livroRepository
                .findByAutoresNome(autor);

        return livros.stream()
        .map(l -> new LivroResumoDTO(
                l.getTitulo(),
                l.getAutores()
        ))
        .collect(Collectors.toList());
    }

    public List<LivroResumoDTO> buscarLivrosTitulo(String titulo){
        List<Livro> livros = livroRepository
                .findByTitulo(titulo);

        return livros.stream()
        .map(l -> new LivroResumoDTO(
                l.getTitulo(),
                l.getAutores()
        ))
        .collect(Collectors.toList());
    }

    public List<LivroResumoDTO> listarTodos(){
        List<Livro> livros = livroRepository
                .findAll();

        return livros.stream()
                .map(l -> new LivroResumoDTO(
                        l.getTitulo(),
                        l.getAutores()
                )).collect(Collectors.toList());
    }
}
