package com.biblioteca.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

import com.biblioteca.api.entity.mongo.Autor;

@Data
@AllArgsConstructor
public class LivroDetalhesDTO {

    private String id;
    private String titulo;
    private List<Autor> autores;
    private String capa;
    private Double avaliacaoMedia;
    private Integer anoPublicacao;
    private Integer numeroPaginas;
    private String idioma;
    private List<String> generos;
    private List<String> tags;
}