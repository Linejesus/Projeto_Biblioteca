package com.biblioteca.api.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioCadastroDTO {

    private String nome;
    private String email;
    private String senha;
    private String cpf;
}