package com.biblioteca.api.entity.postgres;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bibliotecas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Biblioteca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBiblioteca;

    @Column(length = 150, nullable = false)
    private String nome;

    @Column(length = 150, nullable = false)
    private String estado;

    @Column(length = 150, nullable = false)
    private String cidade;

    @Column(length = 150, nullable = false)
    private String bairro;

    @Column(length = 150, nullable = false)
    private String rua;

    @Column(nullable = false)
    private Integer numero;

}
