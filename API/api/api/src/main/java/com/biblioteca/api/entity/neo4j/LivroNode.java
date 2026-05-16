package com.biblioteca.api.entity.neo4j;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Livro")
public class LivroNode {
    @Id
    private String idLivro; // ID do Mongo

    private String titulo;

    public LivroNode(String idLivro, String titulo) {
        this.idLivro = idLivro;
        this.titulo = titulo;
    }

    public LivroNode() {}
}
