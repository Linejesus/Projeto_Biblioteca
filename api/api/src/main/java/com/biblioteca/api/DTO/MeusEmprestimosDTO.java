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
    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucaoReal;
    private Integer renovacoes;
    private String status;
}
