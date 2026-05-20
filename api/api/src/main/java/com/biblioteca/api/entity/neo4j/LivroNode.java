package com.biblioteca.api.entity.neo4j;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Getter
@Setter
@Node("Livro")
public class LivroNode {

    @Id
    private String idLivro;

    private String titulo;

    public LivroNode(String idLivro, String titulo) {
        this.idLivro = idLivro;
        this.titulo = titulo;
    }

    public LivroNode() {}
}