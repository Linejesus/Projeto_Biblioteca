package com.biblioteca.api.DTO;

import com.biblioteca.api.entity.mongo.Autor;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class MeusEmprestimosDTO {
    private Long idEmprestimo;
    private String titulo;
    private List<Autor> autores;
    private String capa;
    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucaoPrevista;
    private Integer renovacoes;
    private String status;
}
