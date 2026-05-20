package com.biblioteca.api.entity.neo4j;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Biblioteca")
public class BibliotecaNode {
    @Id
    private Long idBiblioteca;

    private String nome;

    public BibliotecaNode(Long idBiblioteca, String nome) {
        this.idBiblioteca = idBiblioteca;
        this.nome = nome;
    }

    public BibliotecaNode() {}
}
