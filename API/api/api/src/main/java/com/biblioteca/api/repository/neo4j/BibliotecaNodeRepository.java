package com.biblioteca.api.repository.neo4j;

import com.biblioteca.api.entity.neo4j.BibliotecaNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

public interface BibliotecaNodeRepository extends Neo4jRepository<BibliotecaNode, Long> {
    @Query("""
        MATCH (b:Biblioteca {idBiblioteca: $idBiblioteca})
        MATCH (l:Livro {idLivro: $idLivro})
        MERGE (b)-[:POSSUI]->(l)
    """)
    void relacionarComLivro(@Param("idBiblioteca") Long idBiblioteca,
                            @Param("idLivro") String idLivro);
}
