package com.biblioteca.api.DTO;

import com.biblioteca.api.entity.mongo.Autor;
import com.biblioteca.api.entity.mongo.Edicao;
import com.biblioteca.api.entity.mongo.Editora;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LivroResumoDTO {

    private String id;
    private String titulo;
    private Integer anoPublicacao;
    private List<Autor> autores;
    private List<String> generos;
    private List<Editora> editoras;
    private List<Edicao> edicoes;
    private String capa;
}