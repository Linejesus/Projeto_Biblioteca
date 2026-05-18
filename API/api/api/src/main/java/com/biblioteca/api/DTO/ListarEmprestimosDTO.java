package com.biblioteca.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListarEmprestimosDTO {

    private Long idEmprestimo;
    private Long idUsuario;
    private String idLivro;
    private Long idBiblioteca;
    private String nomeUsuario;
    private String tituloLivro;
    private String nomeBiblioteca;
    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucaoPrevista;
    private String status;
}