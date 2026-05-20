package com.biblioteca.api.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BibliotecaCadastroDTO {
    private String nome;
    private String estado;
    private String cidade;
    private String bairro;
    private String rua;
    private Integer numero;
}
