package com.biblioteca.api.repository.neo4j;

import com.biblioteca.api.entity.neo4j.LivroNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface LivroNodeRepository extends Neo4jRepository<LivroNode, String> {
    @Query("""
        MATCH (l1:Livro {idLivro: $idAtual})
        MATCH (l2:Livro {idLivro: $idAnterior})
        MERGE (l1)-[:SEQUENCIA_DE]->(l2)
    """)
    void criarSequencia(String idAtual, String idAnterior);
}
