package com.biblioteca.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListarBibliotecaDTO {
    private String nome;
    private String rua;
    private Integer numero;
}
