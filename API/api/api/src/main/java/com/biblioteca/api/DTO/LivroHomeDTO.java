package com.biblioteca.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

import com.biblioteca.api.entity.mongo.Autor;

@Data
@AllArgsConstructor
public class LivroHomeDTO {

    private String id;
    private String titulo;
    private List<Autor> autores;
    private String capa;
    private Double avaliacaoMedia;
}