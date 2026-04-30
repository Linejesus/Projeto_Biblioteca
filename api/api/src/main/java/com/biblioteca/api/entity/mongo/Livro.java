package com.biblioteca.api.entity.mongo;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "Livros")
public class Livro {

    @Id
    private String id;

    private Long idBiblioteca;
    private String titulo;
    private Integer anoPublicacao;

    private List<Autor> autores;
    private List<String> generos;

    private Editora editora;
    private List<Edicao> edicoes;

    private List<String> tags;

    private Double avaliacaoMedia;
    private Integer numeroPaginas;
    private String idioma;
}