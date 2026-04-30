package com.biblioteca.api.DTO;

import com.biblioteca.api.entity.mongo.Autor;
import com.biblioteca.api.entity.mongo.Edicao;
import com.biblioteca.api.entity.mongo.Editora;
import lombok.Data;

import java.util.List;

@Data
public class LivrosCadastroDTO {

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
