package com.biblioteca.api.repository.neo4j;

import com.biblioteca.api.entity.neo4j.Pessoa;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface PessoaRepository extends Neo4jRepository<Pessoa, Long> {
    @Query("""
    MATCH (p:Pessoa {idUsuario: $idUsuario})
    MATCH (l:Livro {idLivro: $idLivro})
    MERGE (p)-[:PEGOU]->(l)
""")
    void relacionarPessoaLivro(Long idUsuario, String idLivro);

    @Query("""
    MATCH (p:Pessoa {idUsuario: $idUsuario})
    MATCH (b:Biblioteca {idBiblioteca: $idBiblioteca})
    MERGE (p)-[:FREQUENTA]->(b)
""")
    void relacionarPessoaBiblioteca(Long idUsuario, Long idBiblioteca);
}
