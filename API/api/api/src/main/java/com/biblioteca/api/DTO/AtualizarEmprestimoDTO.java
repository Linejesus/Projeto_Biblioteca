package com.biblioteca.api.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AtualizarEmprestimoDTO {

    private Long idEmprestimo;
    private Long idUsuario;
    private String idLivro;
    private Long idBiblioteca;
    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucaoPrevista;
    private String status;
}