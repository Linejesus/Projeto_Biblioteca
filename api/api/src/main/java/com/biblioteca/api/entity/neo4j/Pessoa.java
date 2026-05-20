package com.biblioteca.api.entity.neo4j;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Pessoa")
public class Pessoa {
    @Id
    private Long idUsuario;

    private String nome;

    public Pessoa(Long idUsuario, String nome) {
        this.idUsuario = idUsuario;
        this.nome = nome;
    }

    public Pessoa() {}
}
