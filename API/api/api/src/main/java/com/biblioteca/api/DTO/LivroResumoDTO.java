package com.biblioteca.api.DTO;

import com.biblioteca.api.entity.mongo.Autor;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LivroResumoDTO {

    private String titulo;
    private List<Autor> autores;
}