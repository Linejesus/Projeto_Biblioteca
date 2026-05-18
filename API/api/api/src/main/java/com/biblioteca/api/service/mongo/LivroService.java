package com.biblioteca.api.service.mongo;

import com.biblioteca.api.DTO.ListarBibliotecaDTO;
import com.biblioteca.api.DTO.LivroDetalhesDTO;
import com.biblioteca.api.DTO.LivroHomeDTO;
import com.biblioteca.api.DTO.LivroResumoDTO;
import com.biblioteca.api.DTO.LivrosCadastroDTO;
import com.biblioteca.api.entity.mongo.Livro;
import com.biblioteca.api.entity.neo4j.LivroNode;
import com.biblioteca.api.entity.postgres.Biblioteca;
import com.biblioteca.api.repository.mongo.LivroRepository;
import com.biblioteca.api.repository.neo4j.BibliotecaNodeRepository;
import com.biblioteca.api.repository.neo4j.LivroNodeRepository;
import com.biblioteca.api.repository.postgres.BibliotecaRepository;
import org.springframework.transaction.annotation.Transactional;
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
    private final BibliotecaNodeRepository bibliotecaNodeRepository;
    private final LivroNodeRepository livroNodeRepository;

    @Transactional("neo4jTransactionManager")
    public Livro salvar(LivrosCadastroDTO dto){

        // 1️⃣ valida biblioteca
        bibliotecaRepository.findById(dto.getIdBiblioteca())
                .orElseThrow(() -> new RuntimeException("Biblioteca não encontrada"));

        // 2️⃣ salva no Mongo
        Livro livro = Livro.builder()
                .idBiblioteca(dto.getIdBiblioteca())
                .titulo(dto.getTitulo())
                .anoPublicacao(dto.getAnoPublicacao())
                .autores(dto.getAutores())
                .generos(dto.getGeneros())
                .editoras(dto.getEditoras())
                .edicoes(dto.getEdicoes())
                .tags(dto.getTags())
                .avaliacaoMedia(dto.getAvaliacaoMedia())
                .numeroPaginas(dto.getNumeroPaginas())
                .idioma(dto.getIdioma())
                .capa(dto.getCapa())
                .build();

        Livro salvo = livroRepository.save(livro);

        // 3️⃣ cria node no Neo4j
        LivroNode livroNode = new LivroNode(
                salvo.getId(),
                salvo.getTitulo()
        );

        livroNodeRepository.save(livroNode);

        // 4️⃣ relacionamento com biblioteca
        bibliotecaNodeRepository.relacionarComLivro(
                dto.getIdBiblioteca(),
                salvo.getId()
        );

        // 5️⃣ 🔥 RELAÇÃO DE SEQUÊNCIA
        if (dto.getIdLivroAnterior() != null) {

            // valida se o livro anterior existe no Mongo
            Livro livroAnterior = livroRepository.findById(String.valueOf(dto.getIdLivroAnterior()))
                    .orElseThrow(() -> new RuntimeException("Livro anterior não encontrado"));

            // garante que ele existe no Neo4j
            livroNodeRepository.save(
                    new LivroNode(livroAnterior.getId(), livroAnterior.getTitulo())
            );

            // cria relação
            livroNodeRepository.criarSequencia(
                    salvo.getId(),
                    livroAnterior.getId()
            );
        }

        return salvo;
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
                l.getId(),
                l.getTitulo(),
                l.getAnoPublicacao(),
                l.getAutores(),
                l.getGeneros(),
                l.getEditoras(),
                l.getEdicoes(),
                l.getCapa()
        ))
        .collect(Collectors.toList());
    }

    public List<LivroResumoDTO> buscarLivrosAutor(String autor){
        List<Livro> livros = livroRepository
                .findByAutoresNome(autor);

        return livros.stream()
        .map(l -> new LivroResumoDTO(
                l.getId(),
                l.getTitulo(),
                l.getAnoPublicacao(),
                l.getAutores(),
                l.getGeneros(),
                l.getEditoras(),
                l.getEdicoes(),
                l.getCapa()
        ))
        .collect(Collectors.toList());
    }

    public List<LivroResumoDTO> buscarLivrosTitulo(String titulo){
        List<Livro> livros = livroRepository
                .findByTitulo(titulo);

        return livros.stream()
        .map(l -> new LivroResumoDTO(
                l.getId(),
                l.getTitulo(),
                l.getAnoPublicacao(),
                l.getAutores(),
                l.getGeneros(),
                l.getEditoras(),
                l.getEdicoes(),
                l.getCapa()
        ))
        .collect(Collectors.toList());
    }

    public List<LivroResumoDTO> listarTodos(){
        List<Livro> livros = livroRepository
                .findAll();

        return livros.stream()
                .map(l -> new LivroResumoDTO(
                        l.getId(),
                        l.getTitulo(),
                        l.getAnoPublicacao(),
                        l.getAutores(),
                        l.getGeneros(),
                        l.getEditoras(),
                        l.getEdicoes(),
                        l.getCapa()
                )).collect(Collectors.toList());
    }


        public List<LivroHomeDTO> buscarLivrosHome() {

                List<Livro> livros =
                        livroRepository.findTop10ByOrderByIdDesc();

                return livros.stream()
                        .map(l -> new LivroHomeDTO(
                                l.getId(),
                                l.getTitulo(),
                                l.getAutores(),
                                l.getCapa(),
                                l.getAvaliacaoMedia()
                        ))
                        .toList();
        }


        public List<LivroHomeDTO> buscarMelhorAvaliados() {

                List<Livro> livros =
                        livroRepository.findTop10ByOrderByAvaliacaoMediaDesc();

                return livros.stream()
                        .map(l -> new LivroHomeDTO(
                                l.getId(),
                                l.getTitulo(),
                                l.getAutores(),
                                l.getCapa(),
                                l.getAvaliacaoMedia()
                        ))
                        .toList();
        }


        public LivroDetalhesDTO buscarDetalhesLivro(String id){

                Livro livro = livroRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Livro não encontrado"));

                return new LivroDetalhesDTO(
                        livro.getId(),
                        livro.getTitulo(),
                        livro.getAutores(),
                        livro.getCapa(),
                        livro.getAvaliacaoMedia(),
                        livro.getAnoPublicacao(),
                        livro.getNumeroPaginas(),
                        livro.getIdioma(),
                        livro.getGeneros(),
                        livro.getTags()
                );
        }
}
