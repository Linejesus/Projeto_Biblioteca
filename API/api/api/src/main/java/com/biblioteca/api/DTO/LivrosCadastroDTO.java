package com.biblioteca.api.DTO;

import com.biblioteca.api.entity.mongo.Autor;
import com.biblioteca.api.entity.mongo.Edicao;
import com.biblioteca.api.entity.mongo.Editora;
import lombok.Data;

import java.util.List;

@Data
public class LivrosCadastroDTO {

        private Long idBiblioteca;
        private Long idLivroAnterior;
        private String titulo;
        private Integer anoPublicacao;

        private String capa;

        private List<Autor> autores;
        private List<String> generos;

        private List<Editora> editoras;
        private List<Edicao> edicoes;

        private List<String> tags;

        private Double avaliacaoMedia;
        private Integer numeroPaginas;
        private String idioma;
}
