package com.biblioteca.api.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmprestimoCadastroDTO {
    @NotNull (message = "Usuário é obrigatório")
    Long idUsuario;

    @NotNull(message = "Livro é obrigatório")
    String idLivro;

    @NotNull(message = "Biblioteca é obrigatória")
    Long idBiblioteca;
}
